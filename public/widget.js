(function () {
  'use strict';

  var script = document.currentScript ||
    (function () {
      var scripts = document.getElementsByTagName('script');
      return scripts[scripts.length - 1];
    })();

  var src = script.src || '';
  var urlParams = src.split('?')[1] || '';
  var params = {};
  urlParams.split('&').forEach(function (pair) {
    var kv = pair.split('=');
    if (kv[0]) params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || '');
  });

  var BOT_ID = params.id || (window.REPLIQ_CONFIG && window.REPLIQ_CONFIG.botId) || '';
  var CONFIG = window.REPLIQ_CONFIG || {};
  var BOT_NAME = CONFIG.botName || 'AI Assistant';
  var WELCOME = CONFIG.welcomeMessage || ('Hi! I\'m ' + BOT_NAME + '. How can I help you today? \uD83D\uDC4B');
  var COLOR = CONFIG.color || '#00F5A0';
  var API_URL = CONFIG.apiUrl || (src.split('/widget.js')[0] || '');
  var TEXT_COLOR = '#0A0A0F';
  var SESSION_KEY = 'repliq_session_' + BOT_ID;

  function loadHistory() {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || '[]'); } catch (e) { return []; }
  }
  function saveHistory(msgs) {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(msgs)); } catch (e) {}
  }

  var messages = loadHistory();
  var isOpen = false;

  var css = [
    '#repliq-btn{position:fixed;bottom:24px;right:24px;width:56px;height:56px;border-radius:50%;background:' + COLOR + ';border:none;cursor:pointer;box-shadow:0 4px 20px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;z-index:2147483646;transition:transform .2s,box-shadow .2s;}',
    '#repliq-btn:hover{transform:scale(1.1);box-shadow:0 6px 28px rgba(0,0,0,.4);}',
    '#repliq-btn svg{width:26px;height:26px;fill:' + TEXT_COLOR + ';}',
    '#repliq-panel{position:fixed;bottom:92px;right:24px;width:320px;height:480px;border-radius:16px;background:#fff;box-shadow:0 8px 40px rgba(0,0,0,.25);display:none;flex-direction:column;overflow:hidden;z-index:2147483645;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;}',
    '#repliq-panel.open{display:flex;}',
    '#repliq-header{background:' + COLOR + ';padding:14px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0;}',
    '#repliq-avatar{width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,.15);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:15px;color:' + TEXT_COLOR + ';flex-shrink:0;}',
    '#repliq-botname{font-weight:700;font-size:14px;color:' + TEXT_COLOR + ';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '#repliq-status{font-size:11px;color:' + TEXT_COLOR + ';opacity:.7;}',
    '#repliq-close{background:none;border:none;cursor:pointer;padding:4px;color:' + TEXT_COLOR + ';opacity:.7;font-size:20px;line-height:1;flex-shrink:0;}',
    '#repliq-close:hover{opacity:1;}',
    '#repliq-messages{flex:1;overflow-y:auto;padding:12px 14px;display:flex;flex-direction:column;gap:8px;background:#F9FAFB;}',
    '.rq-msg{max-width:82%;display:flex;flex-direction:column;gap:2px;}',
    '.rq-msg.bot{align-self:flex-start;}',
    '.rq-msg.user{align-self:flex-end;}',
    '.rq-bubble{padding:9px 12px;border-radius:14px;font-size:13px;line-height:1.5;word-break:break-word;}',
    '.rq-msg.bot .rq-bubble{background:#fff;color:#1a1a1a;border-radius:4px 14px 14px 14px;box-shadow:0 1px 3px rgba(0,0,0,.08);}',
    '.rq-msg.user .rq-bubble{background:' + COLOR + ';color:' + TEXT_COLOR + ';border-radius:14px 4px 14px 14px;}',
    '.rq-time{font-size:10px;color:#aaa;margin:0 4px;}',
    '.rq-msg.user .rq-time{text-align:right;}',
    '#repliq-typing{align-self:flex-start;display:none;padding:10px 12px;background:#fff;border-radius:4px 14px 14px 14px;box-shadow:0 1px 3px rgba(0,0,0,.08);}',
    '#repliq-typing span{display:inline-block;width:7px;height:7px;border-radius:50%;background:#bbb;margin:0 2px;animation:repliq-bounce 1.2s infinite;}',
    '#repliq-typing span:nth-child(2){animation-delay:.2s;}',
    '#repliq-typing span:nth-child(3){animation-delay:.4s;}',
    '@keyframes repliq-bounce{0%,60%,100%{transform:translateY(0);}30%{transform:translateY(-6px);}}',
    '#repliq-footer{padding:10px 12px;background:#fff;border-top:1px solid #f0f0f0;display:flex;gap:8px;flex-shrink:0;}',
    '#repliq-input{flex:1;border:1.5px solid #e5e7eb;border-radius:20px;padding:9px 14px;font-size:13px;outline:none;resize:none;font-family:inherit;line-height:1.4;max-height:90px;overflow-y:auto;}',
    '#repliq-input:focus{border-color:' + COLOR + ';}',
    '#repliq-send{width:36px;height:36px;border-radius:50%;background:' + COLOR + ';border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;align-self:flex-end;transition:transform .15s;}',
    '#repliq-send:hover{transform:scale(1.08);}',
    '#repliq-send svg{width:16px;height:16px;fill:' + TEXT_COLOR + ';}',
    '@media(max-width:420px){#repliq-panel{width:calc(100vw - 16px);right:8px;bottom:80px;height:70vh;}}',
  ].join('');

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var INITIAL = BOT_NAME.charAt(0).toUpperCase();

  var btn = document.createElement('button');
  btn.id = 'repliq-btn';
  btn.setAttribute('aria-label', 'Open chat');
  btn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>';

  var panel = document.createElement('div');
  panel.id = 'repliq-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', BOT_NAME + ' chat');
  panel.innerHTML = [
    '<div id="repliq-header">',
    '  <div id="repliq-avatar">' + INITIAL + '</div>',
    '  <div id="repliq-info">',
    '    <div id="repliq-botname">' + BOT_NAME.replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</div>',
    '    <div id="repliq-status">&#9679; Online</div>',
    '  </div>',
    '  <button id="repliq-close" aria-label="Close chat">&#10005;</button>',
    '</div>',
    '<div id="repliq-messages"></div>',
    '<div id="repliq-footer">',
    '  <textarea id="repliq-input" placeholder="Type a message..." rows="1" aria-label="Message"></textarea>',
    '  <button id="repliq-send" aria-label="Send">',
    '    <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',
    '  </button>',
    '</div>',
  ].join('');

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  var msgContainer = document.getElementById('repliq-messages');
  var input = document.getElementById('repliq-input');
  var sendBtn = document.getElementById('repliq-send');
  var closeBtn = document.getElementById('repliq-close');

  var typingEl = document.createElement('div');
  typingEl.id = 'repliq-typing';
  typingEl.innerHTML = '<span></span><span></span><span></span>';
  msgContainer.appendChild(typingEl);

  function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function fmtTime(d) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function scrollBottom() {
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  function appendMessage(role, text, ts) {
    var wrapper = document.createElement('div');
    wrapper.className = 'rq-msg ' + role;
    var bubble = document.createElement('div');
    bubble.className = 'rq-bubble';
    bubble.textContent = text;
    var time = document.createElement('div');
    time.className = 'rq-time';
    time.textContent = fmtTime(ts || new Date());
    wrapper.appendChild(bubble);
    wrapper.appendChild(time);
    msgContainer.insertBefore(wrapper, typingEl);
    scrollBottom();
  }

  function renderHistory() {
    while (msgContainer.firstChild && msgContainer.firstChild !== typingEl) {
      msgContainer.removeChild(msgContainer.firstChild);
    }
    messages.forEach(function (m) {
      appendMessage(m.role, m.content, new Date(m.ts));
    });
  }

  function showTyping() { typingEl.style.display = 'flex'; scrollBottom(); }
  function hideTyping() { typingEl.style.display = 'none'; }

  function openPanel() {
    isOpen = true;
    panel.classList.add('open');
    if (messages.length === 0) {
      var welcomeMsg = { role: 'bot', content: WELCOME, ts: new Date().toISOString() };
      messages.push(welcomeMsg);
      saveHistory(messages);
      appendMessage('bot', WELCOME);
    } else {
      renderHistory();
    }
    input.focus();
  }

  function closePanel() {
    isOpen = false;
    panel.classList.remove('open');
  }

  btn.addEventListener('click', function () { isOpen ? closePanel() : openPanel(); });
  closeBtn.addEventListener('click', closePanel);

  function sendMessage() {
    var text = input.value.trim();
    if (!text || !BOT_ID) return;
    input.value = '';
    input.style.height = 'auto';
    var userMsg = { role: 'user', content: text, ts: new Date().toISOString() };
    messages.push(userMsg);
    saveHistory(messages);
    appendMessage('user', text);
    showTyping();
    sendBtn.disabled = true;
    var apiMessages = messages.slice(0, -1)
      .filter(function (m) { return m.role === 'user' || m.role === 'assistant'; })
      .map(function (m) { return { role: m.role === 'bot' ? 'assistant' : m.role, content: m.content }; });
    fetch(API_URL + '/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ botId: BOT_ID, message: text, history: apiMessages }),
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        hideTyping();
        sendBtn.disabled = false;
        var reply = (data && data.reply) ? data.reply : 'Sorry, I had trouble responding. Please try again.';
        var botMsg = { role: 'bot', content: reply, ts: new Date().toISOString() };
        messages.push(botMsg);
        saveHistory(messages);
        appendMessage('bot', reply);
      })
      .catch(function () {
        hideTyping();
        sendBtn.disabled = false;
        var errMsg = { role: 'bot', content: 'Something went wrong. Please try again later.', ts: new Date().toISOString() };
        messages.push(errMsg);
        saveHistory(messages);
        appendMessage('bot', errMsg.content);
      });
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });
  input.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 90) + 'px';
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) closePanel();
  });
})();
