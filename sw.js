/* SYLearn Digital Academy PWA: network-first updates, no API response caching. */
const VERSION='sylution-learn-techsignature1-20261026';
const ASSETS=['./','./index.html','./styles.css','./premium.css','./palette.css','./responsive.css','./youtube.css','./home-premium.css','./learning.css','./academy-elite.css','./profile-v3.css','./sylearn-tech.css','./youtube.js','./learning.js','./learning-ui.js','./learning-player.js','./youtube-ui.js','./live-sessions.js','./app.js','./icon.svg','./manifest.webmanifest'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(VERSION).then(cache=>cache.addAll(ASSETS)));
 self.skipWaiting();
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==VERSION&&/^(sylution-learn|sylution-video|sylution-courses)/.test(key)).map(key=>caches.delete(key)))));
 self.clients.claim();
});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET')return;
 const url=new URL(req.url);
 if(url.origin!==self.location.origin || url.pathname.startsWith('/api/'))return;
 event.respondWith(
   fetch(req).then(resp=>{
     if(resp.ok){
       const copy=resp.clone();
       event.waitUntil(caches.open(VERSION).then(cache=>cache.put(req,copy)).catch(()=>{}));
     }
     return resp;
   }).catch(async()=>{
     const cached=await caches.match(req);
     if(cached)return cached;
     if(req.mode==='navigate')return await caches.match('./index.html')||Response.error();
     return Response.error();
   })
 );
});
