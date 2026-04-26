export const chatWidgetScript = String.raw`(() => {
  if (window.__esimCnChatLoaded) return;
  window.__esimCnChatLoaded = true;

  const storageKey = 'esimcn_chat_session_id';
  let MIN_TYPING_MS = 900;
  let REVEAL_STEP_MS = 420;
  const state = {
    open: false,
    loading: false,
    sessionId: '',
    messages: [],
    quickReplies: [],
    pendingUserMessage: '',
    typing: false,
    actions: [],
  };

  const style = document.createElement('style');
  style.textContent = [
    '.ecn-chat-launcher{position:fixed;right:18px;bottom:18px;z-index:90;border:none;border-radius:999px;background:linear-gradient(135deg,#d04e28 0%,#b83c1b 100%);color:#fff;padding:0 18px;height:56px;display:inline-flex;align-items:center;gap:10px;box-shadow:0 18px 38px rgba(197,65,28,.28);font:700 14px/1.1 Manrope,sans-serif;cursor:pointer}',
    '.ecn-chat-launcher__dot{width:10px;height:10px;border-radius:999px;background:#fff3;box-shadow:0 0 0 4px rgba(255,255,255,.18)}',
    '.ecn-chat-panel{position:fixed;right:18px;bottom:86px;width:min(390px,calc(100vw - 24px));height:min(640px,calc(100vh - 110px));z-index:91;display:none;flex-direction:column;border-radius:24px;overflow:hidden;background:#fff;box-shadow:0 26px 80px rgba(17,17,17,.18);border:1px solid rgba(0,0,0,.06)}',
    '.ecn-chat-panel.is-open{display:flex}',
    '.ecn-chat-head{padding:16px 18px;background:linear-gradient(135deg,#d04e28 0%,#b83c1b 100%);color:#fff;display:flex;align-items:flex-start;justify-content:space-between;gap:12px}',
    '.ecn-chat-head h3{margin:0;font:800 18px/1.2 "Plus Jakarta Sans",Manrope,sans-serif}',
    '.ecn-chat-head p{margin:6px 0 0;font:500 13px/1.5 Manrope,sans-serif;color:rgba(255,255,255,.86)}',
    '.ecn-chat-close{appearance:none;border:none;background:rgba(255,255,255,.16);color:#fff;width:34px;height:34px;border-radius:12px;cursor:pointer;font-size:20px;line-height:1}',
    '.ecn-chat-body{flex:1;padding:14px;background:linear-gradient(180deg,#fffaf6 0%,#fff 100%);overflow:auto;display:flex;flex-direction:column;gap:10px}',
    '.ecn-chat-bubble{max-width:86%;padding:11px 13px;border-radius:16px;font:500 14px/1.5 Manrope,sans-serif;white-space:pre-wrap;word-break:break-word;position:relative}',
    '.ecn-chat-bubble.bot{align-self:flex-start;background:#fff;border:1px solid rgba(197,65,28,.14);color:#1d1d1d;border-bottom-left-radius:6px}',
    '.ecn-chat-bubble.user{align-self:flex-end;background:#c5411c;color:#fff;border-bottom-right-radius:6px}',
    '.ecn-chat-bubble.is-pending{opacity:.82}',
    '.ecn-chat-meta{margin-top:6px;font-size:11px;opacity:.68}',
    '.ecn-chat-typing{display:inline-flex;align-items:center;gap:5px;min-width:42px;min-height:16px}',
    '.ecn-chat-typing span{width:7px;height:7px;border-radius:999px;background:#d28166;display:inline-block;animation:ecnChatTyping 1.15s infinite ease-in-out}',
    '.ecn-chat-typing span:nth-child(2){animation-delay:.15s}',
    '.ecn-chat-typing span:nth-child(3){animation-delay:.3s}',
    '@keyframes ecnChatTyping{0%,80%,100%{transform:translateY(0);opacity:.45}40%{transform:translateY(-3px);opacity:1}}',
    '.ecn-chat-actions-list{display:none;grid-template-columns:1fr;gap:8px;padding:0 14px 12px;background:#fff}',
    '.ecn-chat-actions-list.has-items{display:grid}',
    '.ecn-chat-action{display:flex;align-items:center;justify-content:center;min-height:44px;padding:0 14px;border-radius:14px;text-decoration:none;font:800 14px/1.2 Manrope,sans-serif}',
    '.ecn-chat-action.primary{background:#c5411c;color:#fff;box-shadow:0 12px 24px rgba(197,65,28,.18)}',
    '.ecn-chat-action.secondary{background:#fff;color:#a13818;border:1px solid rgba(197,65,28,.24)}',
    '.ecn-chat-quick{display:none}',
    '.ecn-chat-quick.has-items{display:flex;flex-wrap:wrap;gap:8px;padding:0 14px 12px;background:#fff}',
    '.ecn-chat-chip{appearance:none;border:1px solid rgba(197,65,28,.16);background:#fff8f2;color:#922f13;border-radius:999px;padding:10px 12px;font:700 12px/1.2 Manrope,sans-serif;cursor:pointer}',
    '.ecn-chat-form{padding:12px 14px 14px;background:#fff;border-top:1px solid rgba(0,0,0,.06);display:grid;gap:10px}',
    '.ecn-chat-textarea{width:100%;min-height:58px;height:58px;max-height:140px;resize:none;border:1px solid rgba(0,0,0,.1);border-radius:16px;padding:16px 14px 12px;font:500 16px/1.4 Manrope,sans-serif;outline:none}',
    '.ecn-chat-actions{display:flex;align-items:center;justify-content:flex-end;gap:10px}',
    '.ecn-chat-send{appearance:none;border:none;border-radius:14px;height:44px;padding:0 16px;background:#c5411c;color:#fff;font:800 14px/1 Manrope,sans-serif;cursor:pointer;box-shadow:0 12px 24px rgba(197,65,28,.22)}',
    '.ecn-chat-send[disabled],.ecn-chat-chip[disabled]{opacity:.55;cursor:not-allowed}',
    '.ecn-chat-status{padding:0 14px 10px;font:600 12px/1.4 Manrope,sans-serif;color:#7d5a4f;background:#fff}',
    '@media (max-width:640px){.ecn-chat-launcher{right:12px;bottom:12px;height:52px;padding:0 16px}.ecn-chat-panel{right:12px;bottom:74px;width:calc(100vw - 16px);height:min(72vh,620px)}.ecn-chat-action{min-height:48px}}'
  ].join('');
  document.head.appendChild(style);

  const launcher = document.createElement('button');
  launcher.type = 'button';
  launcher.className = 'ecn-chat-launcher';
  launcher.innerHTML = '<span class="ecn-chat-launcher__dot"></span><span>Hỗ trợ EsimCN</span>';

  const panel = document.createElement('section');
  panel.className = 'ecn-chat-panel';
  panel.innerHTML = [
    '<div class="ecn-chat-head">',
      '<div><h3>Hỗ trợ EsimCN</h3><p>Anh/chị cần hỗ trợ tư vấn gói eSIM nào?</p></div>',
      '<button type="button" class="ecn-chat-close" aria-label="Đóng chat">×</button>',
    '</div>',
    '<div class="ecn-chat-body" data-chat-body></div>',
    '<div class="ecn-chat-actions-list" data-chat-cta></div>',
    '<div class="ecn-chat-quick" data-chat-quick></div>',
    '<div class="ecn-chat-status" data-chat-status hidden></div>',
    '<form class="ecn-chat-form" data-chat-form>',
      '<textarea class="ecn-chat-textarea" name="message" placeholder="Nhập nội dung cần hỗ trợ..."></textarea>',
      '<div class="ecn-chat-actions">',
        '<button class="ecn-chat-send" type="submit">Gửi</button>',
      '</div>',
    '</form>'
  ].join('');

  document.body.appendChild(panel);
  document.body.appendChild(launcher);

  const bodyEl = panel.querySelector('[data-chat-body]');
  const ctaEl = panel.querySelector('[data-chat-cta]');
  const quickEl = panel.querySelector('[data-chat-quick]');
  const statusEl = panel.querySelector('[data-chat-status]');
  const formEl = panel.querySelector('[data-chat-form]');
  const textarea = formEl.querySelector('textarea');
  const sendButton = formEl.querySelector('button[type="submit"]');
  const closeButton = panel.querySelector('.ecn-chat-close');

  const autoResize = () => {
    textarea.style.height = '58px';
    textarea.style.height = Math.min(textarea.scrollHeight, 140) + 'px';
  };

  const formatTime = (value) => {
    try {
      return new Date(value).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  const setStatus = (text) => {
    if (!text) {
      statusEl.hidden = true;
      statusEl.textContent = '';
      return;
    }
    statusEl.hidden = false;
    statusEl.textContent = text;
  };

  const buildVisibleMessages = () => {
    const messages = [...state.messages];
    if (state.pendingUserMessage) {
      messages.push({ id: 'pending-user', role: 'user', body: state.pendingUserMessage, createdAt: new Date().toISOString(), pending: true });
    }
    if (state.typing) {
      messages.push({ id: 'typing-bot', role: 'bot', body: '', createdAt: new Date().toISOString(), typing: true });
    }
    return messages;
  };

  const renderMessages = () => {
    bodyEl.innerHTML = '';
    buildVisibleMessages().forEach((message) => {
      const item = document.createElement('article');
      item.className = 'ecn-chat-bubble ' + (message.role === 'user' ? 'user' : 'bot') + (message.pending ? ' is-pending' : '');
      if (message.typing) {
        item.innerHTML = '<div class="ecn-chat-typing"><span></span><span></span><span></span></div>';
      } else {
        item.textContent = message.body;
      }
      const meta = document.createElement('div');
      meta.className = 'ecn-chat-meta';
      meta.textContent = message.typing ? 'Đang soạn phản hồi…' : formatTime(message.createdAt || new Date().toISOString());
      item.appendChild(meta);
      bodyEl.appendChild(item);
    });
    bodyEl.scrollTop = bodyEl.scrollHeight;
  };

  const renderActions = () => {
    ctaEl.innerHTML = '';
    const items = (state.actions || []).slice(0, 3);
    ctaEl.classList.toggle('has-items', items.length > 0);
    items.forEach((action) => {
      const link = document.createElement('a');
      link.className = 'ecn-chat-action ' + (action.kind === 'secondary' ? 'secondary' : 'primary');
      link.href = action.href;
      link.textContent = action.label;
      ctaEl.appendChild(link);
    });
  };

  const renderQuickReplies = () => {
    quickEl.innerHTML = '';
    const items = (state.quickReplies || []).slice(0, 3);
    quickEl.classList.toggle('has-items', items.length > 0);
    items.forEach((label) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'ecn-chat-chip';
      button.textContent = label;
      button.disabled = state.loading;
      button.addEventListener('click', () => submitMessage(label));
      quickEl.appendChild(button);
    });
  };

  const setLoading = (next) => {
    state.loading = next;
    sendButton.disabled = next;
    renderActions();
    renderQuickReplies();
    renderMessages();
    setStatus(next ? 'EsimCN đang xử lý nội dung…' : '');
  };

  const fetchJson = async (url, options) => {
    const response = await fetch(url, Object.assign({ headers: { 'content-type': 'application/json' } }, options || {}));
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.ok === false) {
      throw new Error(data.error || 'Có lỗi xảy ra, vui lòng thử lại.');
    }
    return data;
  };

  const applyChatSettings = (settings) => {
    if (!settings) return;
    if (typeof settings.typingMinMs === 'number') MIN_TYPING_MS = settings.typingMinMs;
    if (typeof settings.revealStepMs === 'number') REVEAL_STEP_MS = settings.revealStepMs;
    const title = settings.welcomeTitle || settings.brandTitle;
    const subtitle = settings.welcomeSubtitle;
    const placeholder = settings.inputPlaceholder;
    const sendLabel = settings.sendLabel;
    if (title) {
      launcher.innerHTML = '<span class="ecn-chat-launcher__dot"></span><span>' + title + '</span>';
      const heading = panel.querySelector('.ecn-chat-head h3');
      if (heading) heading.textContent = title;
    }
    if (subtitle) {
      const p = panel.querySelector('.ecn-chat-head p');
      if (p) p.textContent = subtitle;
    }
    if (placeholder) textarea.setAttribute('placeholder', placeholder);
    if (sendLabel) sendButton.textContent = sendLabel;
  };

  const ensureSession = async () => {
    if (state.sessionId) return state.sessionId;
    const stored = window.localStorage.getItem(storageKey) || '';
    const data = await fetchJson('/api/chat/session', {
      method: 'POST',
      body: JSON.stringify({ sessionId: stored, pageUrl: window.location.href, source: 'widget' }),
    });
    state.sessionId = data.session.id;
    window.localStorage.setItem(storageKey, state.sessionId);
    applyChatSettings(data.chatSettings);
    state.messages = data.messages || [];
    state.quickReplies = data.quickReplies || [];
    state.actions = data.actions || [];
    renderMessages();
    renderActions();
    renderQuickReplies();
    return state.sessionId;
  };

  const revealBotReply = async (serverMessages) => {
    const baseMessages = serverMessages.slice(0, -1);
    const finalBotMessage = serverMessages[serverMessages.length - 1];
    if (!finalBotMessage || finalBotMessage.role !== 'bot') {
      state.messages = serverMessages;
      renderMessages();
      return;
    }

    const parts = finalBotMessage.body.split(/\n+/).map((item) => item.trim()).filter(Boolean);
    state.messages = baseMessages;
    renderMessages();

    if (parts.length <= 1) {
      state.messages = serverMessages;
      renderMessages();
      return;
    }

    const progressive = { ...finalBotMessage, body: '' };
    state.messages = [...baseMessages, progressive];
    for (const part of parts) {
      progressive.body = progressive.body ? progressive.body + '\n' + part : part;
      renderMessages();
      await new Promise((resolve) => window.setTimeout(resolve, REVEAL_STEP_MS));
    }
    state.messages = serverMessages;
    renderMessages();
  };

  const submitMessage = async (text) => {
    const message = (text || textarea.value || '').trim();
    if (!message) return;
    await ensureSession();
    textarea.value = '';
    autoResize();
    state.pendingUserMessage = message;
    state.typing = true;
    state.actions = [];
    setLoading(true);
    const startedAt = Date.now();
    try {
      const data = await fetchJson('/api/chat/message', {
        method: 'POST',
        body: JSON.stringify({ sessionId: state.sessionId, message, pageUrl: window.location.href }),
      });
      const elapsed = Date.now() - startedAt;
      if (elapsed < MIN_TYPING_MS) {
        await new Promise((resolve) => window.setTimeout(resolve, MIN_TYPING_MS - elapsed));
      }
      state.pendingUserMessage = '';
      state.typing = false;
      applyChatSettings(data.chatSettings);
      state.quickReplies = data.quickReplies || [];
      state.actions = data.actions || [];
      await revealBotReply(data.messages || state.messages);
      renderActions();
      setStatus(data.handoffRequested ? 'Đã ghi nhận yêu cầu hỗ trợ thêm.' : '');
    } catch (error) {
      state.pendingUserMessage = '';
      state.typing = false;
      renderMessages();
      renderActions();
      setStatus(error instanceof Error ? error.message : 'Không thể gửi tin nhắn.');
    } finally {
      setLoading(false);
      textarea.focus();
    }
  };

  const toggle = async (nextOpen) => {
    state.open = typeof nextOpen === 'boolean' ? nextOpen : !state.open;
    panel.classList.toggle('is-open', state.open);
    if (state.open) {
      await ensureSession();
      textarea.focus();
      autoResize();
    }
  };

  launcher.addEventListener('click', () => toggle());
  closeButton.addEventListener('click', () => toggle(false));
  formEl.addEventListener('submit', async (event) => {
    event.preventDefault();
    await submitMessage();
  });
  textarea.addEventListener('input', autoResize);
  textarea.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      await submitMessage();
    }
  });
})();`;
