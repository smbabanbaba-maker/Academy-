/* SYLearn Telegram bot webhook for Vercel.
 * Secrets belong ONLY in Vercel environment variables, never in GitHub.
 * Required: TELEGRAM_BOT_TOKEN and TELEGRAM_WEBHOOK_SECRET.
 * Optional: SYLEARN_COMMUNITY_URL and SYLEARN_CHANNEL_URL (real https://t.me/... links).
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

function telegramLink(value) {
  const link = String(value || '').trim();
  // Telegram public usernames and private invitation URLs only.
  return /^https:\/\/t\.me\/(?:[A-Za-z][A-Za-z0-9_]{4,31}|\+[A-Za-z0-9_-]{8,}|joinchat\/[A-Za-z0-9_-]{8,})\/?$/i.test(link)
    ? link : null;
}

function keyboard() {
  const rows = [[{ text: '🚀 Launch SYLearn', web_app: { url: APP_URL } }]];
  const community = telegramLink(process.env.SYLEARN_COMMUNITY_URL);
  const channel = telegramLink(process.env.SYLEARN_CHANNEL_URL);
  if (community) rows.push([{ text: '👥 Join Community', url: community }]);
  if (channel) rows.push([{ text: '📢 Join Channel', url: channel }]);
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
    'Powered by SYLUTION.'
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
      const identity = await telegramApi(creds.token, 'getMe', {});
      const description = [
        'Learn practical digital skills with SYLearn. 🚀',
        '',
        'Explore courses, watch lessons, take quizzes, and track your progress — all in one learning app.',
        '',
        'Learn. Build. Grow. 🎓',
        '',
        'Powered by SYLUTION.'
      ].join('\n');
      const setupResults = await Promise.allSettled([
        telegramApi(creds.token, 'setMyName', { name: 'SYLearn' }),
        telegramApi(creds.token, 'setMyDescription', { description }),
        telegramApi(creds.token, 'setMyShortDescription', {
          short_description: '🎓 SYLearn — Learn. Build. Grow.\nGain practical digital skills through engaging lessons and quizzes. 🚀 By SYLUTION.'
        }),
        telegramApi(creds.token, 'setChatMenuButton', {
          menu_button: { type: 'web_app', text: '📚 Learn', web_app: { url: APP_URL } }
        }),
        telegramApi(creds.token, 'setMyCommands', {
          commands: [
            { command: 'start', description: 'Start learning with SYLearn' },
            { command: 'help', description: 'Help and learning options' },
            { command: 'courses', description: 'Explore courses in the Mini App' },
            { command: 'community', description: 'Join our learning community' },
            { command: 'channel', description: 'Join the official SYLearn channel' },
            { command: 'about', description: 'About SYLearn and SYLUTION' }
          ]
        })
      ]);
      const failed = setupResults.filter(result => result.status === 'rejected').length;
      const botName = identity.result?.username ? '@' + identity.result.username : 'your bot';
      return res.status(200).json({
        message: '✅ Connected to ' + botName + '! Send /start in Telegram. ' +
          (failed ? failed + ' optional profile/menu settings could not be applied; check them in BotFather.' :
          'Name, description, About, menu and commands were configured automatically. Add the profile logo and animated description picture in BotFather.')
      });
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
  const command = cmd.split(/\s+/)[0].split('@')[0].toLowerCase();
  const known = ['/start', '/help', '/courses', '/community', '/channel', '/about'];
  if (!known.includes(command)) {
    return res.status(200).json({ ok: true });
  }

  let text, replyMarkup;
  if (command === '/community') {
    const link = telegramLink(process.env.SYLEARN_COMMUNITY_URL);
    text = link
      ? '👥 <b>SYLearn Community</b>\n\nConnect with other learners, share your projects and learn together. Tap below to join!'
      : '👥 The SYLearn Community link is not configured yet. Please check back soon.';
    replyMarkup = link ? { inline_keyboard: [[{ text: '👥 Join Community', url: link }], [{ text: '🚀 Launch SYLearn', web_app: { url: APP_URL } }]] } : keyboard();
  } else if (command === '/channel') {
    const link = telegramLink(process.env.SYLEARN_CHANNEL_URL);
    text = link
      ? '📢 <b>SYLearn Channel</b>\n\nFollow our official channel for learning news, tutorials and course announcements. Tap below to join!'
      : '📢 The SYLearn Channel link is not configured yet. Please check back soon.';
    replyMarkup = link ? { inline_keyboard: [[{ text: '📢 Join Channel', url: link }], [{ text: '🚀 Launch SYLearn', web_app: { url: APP_URL } }]] } : keyboard();
  } else if (command === '/courses') {
    text = '📚 <b>Explore SYLearn Courses</b>\n\nOpen our Mini App to browse lessons, take quizzes and build practical digital skills.';
    replyMarkup = keyboard();
  } else if (command === '/about') {
    text = '🎓 <b>SYLearn by SYLUTION</b>\n\nPractical digital learning, step by step. Explore courses, watch lessons and test your knowledge with quizzes.\n\n<b>Learn. Build. Grow.</b>';
    replyMarkup = keyboard();
  } else if (command === '/help') {
    text = '👋 <b>How can we help?</b>\n\n/start — Welcome & quick links\n/courses — Browse courses\n/community — Join our learners\n/channel — Official updates\n/about — About SYLearn\n\nOr use 📚 Learn to launch the app.';
    replyMarkup = keyboard();
  } else {
    text = welcome();
    replyMarkup = keyboard();
  }

  try {
    await telegramApi(creds.token, 'sendMessage', {
      chat_id: msg.chat.id,
      text,
      parse_mode: 'HTML',
      reply_markup: replyMarkup,
      link_preview_options: { is_disabled: true }
    });
    return res.status(200).json({ ok: true });
  } catch (_) {
    return res.status(502).json({ message: 'Unable to send reply' });
  }
};
