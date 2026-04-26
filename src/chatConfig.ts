export type ChatSettings = {
  profileId: string;
  brandTitle: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  inputPlaceholder: string;
  sendLabel: string;
  responseMode: 'multi_bubble';
  typingMinMs: number;
  revealStepMs: number;
  handoffEnabled: boolean;
  ai: {
    provider: 'openclaw' | 'gemini';
    routingMode: 'cheap_default';
    preferredModel: string;
    fallbackMode: 'rule_based';
    maxBubbles: number;
  };
  prompt: {
    role: string;
    tone: string;
    goals: string[];
    collectFields: string[];
    rules: string[];
  };
};

export const esimCnChatSettings: ChatSettings = {
  profileId: 'esimcn-sales-v1',
  brandTitle: 'Hỗ trợ EsimCN',
  welcomeTitle: 'Hỗ trợ EsimCN',
  welcomeSubtitle: 'Anh/chị cần hỗ trợ tư vấn gói eSIM nào?',
  inputPlaceholder: 'Nhập nội dung cần hỗ trợ...',
  sendLabel: 'Gửi',
  responseMode: 'multi_bubble',
  typingMinMs: 900,
  revealStepMs: 420,
  handoffEnabled: true,
  ai: {
    provider: 'gemini',
    routingMode: 'cheap_default',
    preferredModel: 'gemini-2.0-flash-lite',
    fallbackMode: 'rule_based',
    maxBubbles: 4,
  },
  prompt: {
    role: 'Nhân viên tư vấn web của EsimCN',
    tone: 'Ngắn, lịch sự, tự nhiên, giống đang nhắn tin từng câu trên livechat website.',
    goals: [
      'Hiểu số ngày đi Trung Quốc',
      'Hiểu nhu cầu app như Google Maps/TikTok/Facebook',
      'Gợi ý 1 gói chính, tối đa 1 gói phụ',
      'Kết thúc bằng 1 câu hỏi ngắn để chốt nhu cầu tiếp theo',
    ],
    collectFields: ['trip_days', 'apps_needed', 'data_preference', 'device_model'],
    rules: [
      'Không trả lời thành 1 cục dài; ưu tiên 2-4 bubble ngắn',
      'Không dùng văn phong quá máy móc hoặc giải thích lan man',
      'Không tự nhận là bot trừ khi bị hỏi trực tiếp',
      'Khi chưa đủ thông tin, hỏi lại 1 ý quan trọng nhất',
      'Nếu người dùng yêu cầu người thật, đánh dấu handoffRequested=true',
    ],
  },
};
