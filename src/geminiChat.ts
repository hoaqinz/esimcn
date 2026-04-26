import type { ChatSettings } from './chatConfig';
import type { Plan } from './data';

export type ChatTurn = {
  role: 'user' | 'bot' | 'system';
  body: string;
};

export type GeminiChatResult = {
  reply: string;
  messages: string[];
  handoffRequested: boolean;
  intent: string;
  quickReplies: string[];
};

const GEMINI_MODEL = 'gemini-2.0-flash-lite';
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

const buildSystemPrompt = (settings: ChatSettings) => {
  const parts = [
    settings.prompt.role,
    `Giọng điệu: ${settings.prompt.tone}`,
    `Mục tiêu: ${settings.prompt.goals.join('; ')}`,
    `Thông tin cần lấy nếu thiếu: ${settings.prompt.collectFields.join(', ')}`,
    `Quy tắc: ${settings.prompt.rules.join('; ')}`,
    'Chỉ tư vấn eSIM Trung Quốc của EsimCN.',
    'Chỉ được giới thiệu các gói có trong catalog được cung cấp.',
    'Không bịa giá, không bịa data, không bịa số ngày, không bịa tên gói.',
    'Ưu tiên trả lời theo kiểu tư vấn bán hàng tự nhiên, ngắn, dễ chốt.',
    'Nếu đã có đủ thông tin số ngày đi, đừng hỏi lại y nguyên cùng một ý.',
    'Khi có 2 lựa chọn hợp lý, hãy nêu gói chính trước và gói dự phòng sau.',
    'Luôn trả JSON hợp lệ theo schema yêu cầu.',
  ];
  return parts.join('\n');
};

const extractText = (data: any): string => {
  const candidate = data?.candidates?.[0];
  const parts = candidate?.content?.parts;
  if (!Array.isArray(parts)) return '';
  return parts.map((part) => (typeof part?.text === 'string' ? part.text : '')).join('').trim();
};

const buildCatalogText = (plans: Plan[]) => {
  return plans
    .filter((plan) => !plan.hiddenFromCatalog)
    .map((plan) => {
      const attrs = [
        `slug=${plan.slug}`,
        `name=${plan.name}`,
        `price=${plan.priceVnd}`,
        `validity=${plan.validity}`,
        `data=${plan.dataAllowance}`,
        `coverage=${plan.coverage}`,
        `ip=${plan.ipExport || 'n/a'}`,
        `googleAccess=${plan.googleAccess ? 'yes' : 'no'}`,
        `idealFor=${plan.idealFor}`,
      ];
      return `- ${attrs.join(' | ')}`;
    })
    .join('\n');
};

const parseVnd = (value?: string | null) => Number(String(value || '').replace(/[^(\d)]/g, '')) || 0;
const formatVnd = (value: number) => `${new Intl.NumberFormat('vi-VN').format(value)}đ`;

const extractTripDays = (message: string, history: ChatTurn[]) => {
  const haystack = [message, ...history.slice(-4).map((item) => item.body)].join(' \n ').toLowerCase();
  const patterns = [
    /(\d+)\s*n\s*(\d+)\s*dem/g,
    /(\d+)\s*ngay/g,
    /(\d+)\s*day/g,
  ];
  for (const pattern of patterns) {
    const match = pattern.exec(haystack);
    if (!match) continue;
    if (match.length >= 3 && match[2]) {
      const nights = Number(match[2]);
      const days = Number(match[1]);
      if (days > 0) return days;
      if (nights > 0) return nights + 1;
    }
    const days = Number(match[1]);
    if (days > 0) return days;
  }
  return null;
};

const pickSalesOptions = (plans: Plan[], tripDays: number | null) => {
  const visible = plans.filter((plan) => !plan.hiddenFromCatalog);
  const dailyCandidates = visible.filter((plan) => /\/ngay/i.test(plan.dataAllowance) || /theo ngay/i.test(plan.validity.toLowerCase()));
  const standardCandidates = visible.filter((plan) => !dailyCandidates.includes(plan));

  const cheapestDaily = [...dailyCandidates].sort((a, b) => parseVnd(a.priceVnd) - parseVnd(b.priceVnd))[0] || null;
  const bestShort = [...standardCandidates]
    .sort((a, b) => {
      const aDays = a.durationDays || Number(a.validity.match(/\d+/)?.[0] || 999);
      const bDays = b.durationDays || Number(b.validity.match(/\d+/)?.[0] || 999);
      const target = tripDays || 7;
      const diffA = Math.abs(aDays - target);
      const diffB = Math.abs(bDays - target);
      if (diffA !== diffB) return diffA - diffB;
      return parseVnd(a.priceVnd) - parseVnd(b.priceVnd);
    })[0] || null;

  const options: string[] = [];
  if (tripDays && cheapestDaily) {
    const total = parseVnd(cheapestDaily.priceVnd) * tripDays;
    options.push(`Gói theo ngày ưu tiên: ${cheapestDaily.name} · ${cheapestDaily.priceVnd}/ngày · khoảng ${formatVnd(total)} cho ${tripDays} ngày.`);
  }
  if (bestShort) {
    options.push(`Gói dự phòng trọn gói: ${bestShort.name} · ${bestShort.priceVnd} · ${bestShort.validity} · ${bestShort.dataAllowance}.`);
  }
  return options;
};

const groundMessagesWithCatalog = (plans: Plan[], rawMessages: string[]) => {
  const visiblePlans = plans.filter((plan) => !plan.hiddenFromCatalog);
  return rawMessages.map((message) => {
    let next = message.trim();
    for (const plan of visiblePlans) {
      const escaped = plan.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      next = next.replace(new RegExp(`${escaped}(?:\s*\([^)]*\))?`, 'g'), `${plan.name} (${plan.priceVnd})`);
    }
    return next;
  }).filter(Boolean).slice(0, 4);
};

export const callGeminiChat = async (
  apiKey: string,
  settings: ChatSettings,
  input: {
    message: string;
    history: ChatTurn[];
    plans: Plan[];
  },
): Promise<GeminiChatResult | null> => {
  if (!apiKey) return null;

  const historyText = input.history
    .slice(-8)
    .map((turn) => `${turn.role.toUpperCase()}: ${turn.body}`)
    .join('\n');

  const catalogText = buildCatalogText(input.plans);
  const tripDays = extractTripDays(input.message, input.history);
  const salesOptions = pickSalesOptions(input.plans, tripDays).join('\n');

  const schema = {
    type: 'OBJECT',
    properties: {
      intent: { type: 'STRING' },
      handoffRequested: { type: 'BOOLEAN' },
      messages: {
        type: 'ARRAY',
        items: { type: 'STRING' },
      },
    },
    required: ['intent', 'handoffRequested', 'messages'],
  };

  const response = await fetch(`${GEMINI_API_BASE}/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: buildSystemPrompt(settings) }],
      },
      generationConfig: {
        temperature: 0.45,
        maxOutputTokens: 420,
        responseMimeType: 'application/json',
        responseSchema: schema,
      },
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: [
                'CATALOG GÓI ESIMCN (nguồn sự thật, chỉ dùng thông tin trong đây):',
                catalogText || '(không có catalog)',
                '',
                `Số ngày đi suy ra từ hội thoại: ${tripDays ?? 'chưa rõ'}`,
                salesOptions ? `2 lựa chọn nên ưu tiên nêu ra:\n${salesOptions}` : 'Chưa đủ dữ liệu để xếp 2 lựa chọn ưu tiên.',
                '',
                'Lịch sử chat gần đây:',
                historyText || '(trống)',
                '',
                `Tin nhắn mới của khách: ${input.message}`,
                '',
                `Hãy trả về tối đa ${settings.ai.maxBubbles} messages, mỗi message 1-2 câu ngắn kiểu livechat.`,
                'Nếu đã biết số ngày đi thì trả lời trực tiếp, không hỏi lại cùng câu đó.',
                'Khi có 2 lựa chọn hợp lý, message 1 nêu gói chính sát lịch trình; message 2 nêu gói dự phòng dài ngày hơn.',
                'Có thể nhắc ngắn lợi ích như dùng TikTok/Google ổn, data thoải mái, tiện khỏi canh dung lượng.',
                'Nếu khách muốn người thật hoặc gọi lại, đặt handoffRequested=true.',
              ].join('\n'),
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`Gemini error ${response.status}: ${errorText.slice(0, 200)}`);
  }

  const data = await response.json();
  const text = extractText(data);
  if (!text) return null;

  let parsed: any;
  try {
    parsed = JSON.parse(text);
  } catch {
    return null;
  }

  const rawMessages = Array.isArray(parsed?.messages)
    ? parsed.messages.filter((item: unknown): item is string => typeof item === 'string' && item.trim().length > 0)
    : [];
  if (!rawMessages.length) return null;

  const messages = groundMessagesWithCatalog(input.plans, rawMessages).slice(0, settings.ai.maxBubbles);
  if (!messages.length) return null;

  return {
    reply: messages.join('\n'),
    messages,
    handoffRequested: Boolean(parsed?.handoffRequested),
    intent: typeof parsed?.intent === 'string' ? parsed.intent : 'gemini-chat',
    quickReplies: [],
  };
};
