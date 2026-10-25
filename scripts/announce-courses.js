/* SYLearn: announce newly added curated courses on a main-branch push.
   Secrets are stored in GitHub Actions, never in source control. */
'use strict';
const { execFileSync } = require('node:child_process');
const APP_URL = 'https://sylutionacademy.vercel.app';
const SHA = /^[a-f0-9]{40}$/i, VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

function catalog(source) {
  const found = source.match(/const\s+curate\s*=\s*(\[[\s\S]*?\])\s*;\s*const\s+photo\s*=/);
  if (!found) throw new Error('Cannot find curated courses in youtube.js');
  const list = JSON.parse(found[1]);
  if (!Array.isArray(list)) throw new Error('Curated courses should be an array');
  const result = new Map();
  for (const item of list) {
    if (!item || !VIDEO_ID.test(item.id) || typeof item.title !== 'string')
      throw new Error('Invalid curated course entry');
    if (result.has(item.id)) throw new Error('Duplicate course ID: ' + item.id);
    result.set(item.id, item);
  }
  return result;
}
function atCommit(sha) {
  return execFileSync('git', ['show', sha + ':youtube.js'], {
    encoding: 'utf8', maxBuffer: 2097152, stdio: ['ignore', 'pipe', 'ignore']
  });
}
function escapeHtml(value) {
  return String(value ?? '').replace(/&/g, '&amp;')
    .replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function announcePayload(course, channel) {
  const title = escapeHtml(course.title.slice(0, 160));
  const category = escapeHtml(String(course.category || 'Digital skills').slice(0, 70));
  const creator = escapeHtml(String(course.creator || 'Original YouTube educator').slice(0, 90));
  const description = escapeHtml(String(course.description || '').slice(0, 280));
  return {
    chat_id: channel,
    text: [
      '🎉 <b>NEW COURSE ON SYLearn!</b>',
      '',
      '📚 <b>' + title + '</b>',
      '🏷 ' + category,
      '🎓 Original educator: ' + creator,
      description ? '\n' + description : '',
      '',
      '🚀 Start learning at your own pace.',
      '<b>Learn. Build. Grow.</b>',
      'Powered by SYLUTION.'
    ].filter(Boolean).join('\n'),
    parse_mode: 'HTML',
    link_preview_options: { is_disabled: true },
    reply_markup: { inline_keyboard: [[
      { text: '🚀 Explore on SYLearn', url: APP_URL },
      { text: '▶️ Original Video', url: 'https://www.youtube.com/watch?v=' + course.id }
    ]] }
  };
}
async function send(token, payload) {
  const response = await fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15000)
  });
  const data = await response.json().catch(() => ({ ok: false }));
  if (!response.ok || !data.ok) {
    throw new Error('Telegram rejected announcement (HTTP ' + response.status +
      '). Verify bot Post Messages permission and GitHub Actions secrets.');
  }
}
async function main() {
  const beforeSha = process.env.BEFORE_SHA || '';
  const afterSha = process.env.AFTER_SHA || '';
  if (!SHA.test(beforeSha) || /^0+$/.test(beforeSha) || !SHA.test(afterSha)) {
    console.log('No safe before/after commit pair; skipping to avoid old course broadcasts.');
    return;
  }
  const oldCatalog = catalog(atCommit(beforeSha));
  const newCatalog = catalog(atCommit(afterSha));
  const additions = [...newCatalog].filter(([id]) => !oldCatalog.has(id))
    .map(([, course]) => course);
  if (!additions.length) {
    console.log('No newly added course IDs; nothing to post.');
    return;
  }
  if (additions.length > 15)
    throw new Error('More than 15 new courses: review before announcing a large batch.');
  const token = process.env.SYLEARN_TELEGRAM_BOT_TOKEN || '';
  const channel = process.env.SYLEARN_CHANNEL_CHAT_ID || '';
  if (!/^\d{6,}:[A-Za-z0-9_-]{30,}$/.test(token))
    throw new Error('Missing SYLEARN_TELEGRAM_BOT_TOKEN GitHub Actions secret.');
  if (!/^@[A-Za-z][A-Za-z0-9_]{4,31}$/.test(channel) && !/^-100\d{6,}$/.test(channel))
    throw new Error('SYLEARN_CHANNEL_CHAT_ID must be @channelusername or -100... channel ID.');
  console.log('New curated courses to announce: ' + additions.length);
  for (const [index, course] of additions.entries()) {
    await send(token, announcePayload(course, channel));
    console.log('Announced course ID: ' + course.id);
    if (index !== additions.length - 1)
      await new Promise(resolve => setTimeout(resolve, 1100));
  }
}
if (require.main === module) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
module.exports = { catalog, announcePayload };
