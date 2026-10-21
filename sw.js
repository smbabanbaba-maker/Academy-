const VERSION='sylution-learn-color-system-2026-10-21-v4';
const ASSETS=['./','./index.html','./styles.css','./premium.css','./palette.css','./app.js','./icon.svg','./manifest.webmanifest'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(VERSION).then(cache=>cache.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==VERSION).map(key=>caches.delete(key)))));self.clients.claim()});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET'||new URL(req.url).origin!==location.origin)return;event.respondWith(fetch(req).then(resp=>{if(resp.ok){const copy=resp.clone();caches.open(VERSION).then(cache=>cache.put(req,copy))}return resp}).catch(()=>caches.match(req).then(hit=>hit||caches.match('./index.html'))))});
