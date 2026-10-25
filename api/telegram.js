/* SYLearn Telegram bot webhook for Vercel.
 * Secrets belong ONLY in Vercel environment variables, never in GitHub.
 * Required: TELEGRAM_BOT_TOKEN and TELEGRAM_WEBHOOK_SECRET.
 * Optional: SYLEARN_COMMUNITY_URL (a real https://t.me/... link).
 */
'use strict';
const crypto = require('node:crypto');

const APP_URL = 'https://sylutionacademy.vercel.app';
const WEBHOOK_URL = APP_URL + '/api/telegram';
const TITLE = 'SYLearn';

function equal(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

function credentials() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!token || !secret || !/^[A-Za-z0-9_-]{16,256}$/.test(secret)) return null;
  return { token, secret };
}

function bodyValue(req) {
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch (_) { return {}; }
  }
  return req.body && typeof req.body === 'object' ? req.body : {};
}

async function telegramApi(token, method, payload) {
  const response = await fetch('https://api.telegram.org/bot' + token + '/' + method, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(8000)
  });
  const result = await response.json().catch(() => ({ ok: false }));
  if (!response.ok || !result.ok) throw new Error('Telegram API call failed: ' + method);
  return result;
}

function keyboard() {
  const rows = [[{ text: '🚀 Launch SYLearn', web_app: { url: APP_URL } }]];
  const community = String(process.env.SYLEARN_COMMUNITY_URL || '').trim();
  if (/^https:\/\/t\.me\/[A-Za-z0-9_+/.-]+$/i.test(community)) {
    rows.push([{ text: '👥 Join Community', url: community }]);
  }
  return { inline_keyboard: rows };
}

function welcome() {
  return [
    '👋 <b>Hey there! Welcome to SYLearn!</b>',
    '',
    'Your journey to practical digital skills starts here. 🚀',
    '',
    'Explore courses, build knowledge, take quizzes, and grow at your own pace.',
    '',
    '<b>Ready to begin?</b>',
    '',
    '📚 <b>Learn. Build. Grow.</b>',
    'Powered by SYLUTION LTD.'
  ].join('\n');
}

const SETUP_PAGE = `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="referrer" content="no-referrer"><title>SYLearn Telegram Setup</title>
<style>body{font-family:system-ui,-apple-system,sans-serif;background:#fafafc;color:#171923;margin:0;display:grid;min-height:100vh;place-items:center}
main{max-width:410px;margin:18px;padding:26px;background:white;border:1px solid #e5e7eb;border-radius:20px;box-shadow:0 10px 40px #17192312}
h1{margin:0 0 8px}p{color:#505763;line-height:1.55}input,button{box-sizing:border-box;width:100%;font:inherit;padding:14px;border-radius:12px}
input{border:1px solid #cbd5e1;margin:10px 0}button{border:0;background:#e51b3d;color:#fff;font-weight:700}
#status{white-space:pre-wrap;font-size:14px}</style></head><body><main>
<h1>SYLearn · Telegram</h1>
<p>First set <code>TELEGRAM_BOT_TOKEN</code> and <code>TELEGRAM_WEBHOOK_SECRET</code> in Vercel production settings and redeploy. Enter only the webhook secret below; <b>never paste your bot token here</b>.</p>
<form id="setup"><input id="secret" type="password" autocomplete="off" minlength="16" placeholder="Webhook secret" required>
<button type="submit">Activate /start replies</button></form><p id="status" role="status"></p>
</main><script>
document.querySelector('#setup').addEventListener('submit',async e=>{
e.preventDefault();const el=document.querySelector('#status');el.textContent='Connecting…';
try{const r=await fetch('/api/telegram?setup=1',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({setup_secret:document.querySelector('#secret').value})});
const d=await r.json();el.textContent=d.message||'Unexpected server response';
}catch(_){el.textContent='Could not connect to the server.'}
});</script></body></html>`;

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');

  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-Frame-Options', 'DENY');
    return res.status(200).send(SETUP_PAGE);
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const creds = credentials();
  if (!creds) {
    return res.status(503).json({ message: 'Bot is not configured. Set TELEGRAM_BOT_TOKEN and a strong TELEGRAM_WEBHOOK_SECRET in Vercel, then redeploy.' });
  }

  if (String(req.query && req.query.setup || '') === '1') {
    const supplied = bodyValue(req).setup_secret;
    if (!equal(supplied, creds.secret)) {
      return res.status(403).json({ message: 'Incorrect webhook secret.' });
    }
    try {
      await telegramApi(creds.token, 'setWebhook', {
        url: WEBHOOK_URL,
        secret_token: creds.secret,
        allowed_updates: ['message'],
        drop_pending_updates: false
      });
      return res.status(200).json({ message: '✅ Connected! Open @SylutionLearnBot in Telegram and send /start.' });
    } catch (_) {
      return res.status(502).json({ message: 'Telegram setup failed. Confirm the bot token, public HTTPS app access and deployment settings.' });
    }
  }

  const supplied = req.headers['x-telegram-bot-api-secret-token'];
  if (!equal(supplied, creds.secret)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const update = bodyValue(req), msg = update.message;
  if (!msg || msg.chat?.type !== 'private' || typeof msg.text !== 'string') {
    return res.status(200).json({ ok: true });
  }

  const cmd = msg.text.trim();
  const isStart = /^\/start(?:@SylutionLearnBot)?(?:\s|$)/i.test(cmd);
  const isHelp = /^\/help(?:@SylutionLearnBot)?(?:\s|$)/i.test(cmd);
  if (!isStart && !isHelp) {
    return res.status(200).json({ ok: true });
  }

  try {
    await telegramApi(creds.token, 'sendMessage', {
      chat_id: msg.chat.id,
      text: isStart ? welcome() : '📚 SYLearn — Learn. Build. Grow.\nTap the button below to start learning.',
      parse_mode: 'HTML',
      reply_markup: keyboard(),
      link_preview_options: { is_disabled: true }
    });
    return res.status(200).json({ ok: true });
  } catch (_) {
    return res.status(502).json({ message: 'Unable to send reply' });
  }
};
