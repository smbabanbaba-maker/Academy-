/* Optional YouTube IFrame Player API — automatic watched-chapter activity.
   The embedded video remains playable if tracking is blocked.
   Progress represents local observed playback, not independently verified viewing. */
(function(){
'use strict';
const V=window.SYLUTION_VIDEO;
const STORAGE='sylution-playback-v1';
let player=null,poll=null,sequence=0,lastTime=null,activeId=null;
const saved=()=>{try{const v=JSON.parse(localStorage.getItem(STORAGE));return v&&typeof v==='object'?v:{}}catch(e){return{}}};
const data=saved();
const persist=()=>{try{localStorage.setItem(STORAGE,JSON.stringify(data))}catch(e){}};
const valid=id=>/^[A-Za-z0-9_-]{11}$/.test(String(id||''));
function unload(){
 ++sequence;
 if(poll){clearInterval(poll);poll=null}
 if(player){try{player.destroy?.()}catch(e){}player=null}
 lastTime=null;activeId=null;
}
function getBounds(chapters,duration,index){
 const cur=chapters[index],next=chapters[index+1];
 if(!cur)return null;
 const start=Math.max(0,Number(cur.seconds)||0);
 const end=Math.min(duration, next?Math.max(start,Number(next.seconds)||0):duration);
 if(start>=duration||end<=start)return null;
 return{start,end,length:end-start};
}
function attach(){
 const node=document.getElementById('yt-lesson-frame'),c=V.state.selected;
 if(!node||!c||!valid(c.id)||c.type!=='video')return;
 // The new standard embed does not opt in to the YouTube JS API. Never replace or reinitialize it.
 // Preserve uninterrupted playback; learners can still mark completed chapters manually.
 if(!String(node.getAttribute('src')||'').includes('enablejsapi=1'))return;
 unload();const tick=sequence,video=c.id;
 const scriptLoad=()=>new Promise((resolve,reject)=>{
  if(window.YT&&window.YT.Player)return resolve();
  if(!window.__sylutionYTPromise){
   window.__sylutionYTPromise=new Promise((yes,no)=>{
    const script=document.createElement('script');script.async=true;script.src='https://www.youtube.com/iframe_api';
    const prior=window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady=function(){if(typeof prior==='function')try{prior()}catch(e){};yes()};
    script.onerror=()=>no(Error('YouTube API unavailable'));
    document.head.appendChild(script);
    setTimeout(()=>no(Error('YouTube player API did not load')),10000);
   });
  }
  window.__sylutionYTPromise.then(resolve,reject);
 });
 scriptLoad().then(()=>{
  if(tick!==sequence||!document.getElementById('yt-lesson-frame'))return;
  try{
   player=new window.YT.Player(node,{events:{onReady:()=>{
     if(tick!==sequence)return;
     const view=()=>document.getElementById('yt-lesson-frame');
     poll=setInterval(()=>{
       if(tick!==sequence||!view()||V.state.selected?.id!==video){unload();return}
       try{
         const playing=player?.getPlayerState?.()===window.YT.PlayerState.PLAYING;
         const t=Number(player?.getCurrentTime?.()),duration=Number(player?.getDuration?.());
         if(!playing||!Number.isFinite(t)||!Number.isFinite(duration)||duration<=0){lastTime=null;return}
         if(lastTime===null){lastTime=t;return}
         const delta=t-lastTime;lastTime=t;
         if(delta<0.3||delta>2.5)return; // skips and seeks are not counted
         const chapters=V.lessons();
         const idx=chapters.findIndex((chapter,i)=>{const b=getBounds(chapters,duration,i);return b&&t>=b.start&&t<b.end});
         if(idx<0)return;
         const b=getBounds(chapters,duration,idx);if(!b)return;
         const bucket=Math.floor(t/10),key='video:'+video+':'+idx;
         const entry=data[key]||{buckets:[]};if(!entry.buckets.includes(bucket))entry.buckets.push(bucket);
         data[key]=entry;
         if(entry.buckets.length%3===0)persist();
         const coverage=Math.min(100,entry.buckets.length*10/b.length*100);
         if(coverage>=85){
           V.markChapter(idx,'Observed playback (approximate)');
           persist();
           const badge=document.getElementById('yt-study-activity');
           if(badge)badge.textContent='Chapter study recorded automatically · '+V.progress(c)+'%';
         }
         const el=document.getElementById('yt-study-activity');
         if(el&&!V.state.courseProgress['video:'+video]?.includes(idx))el.textContent='Observed playback in this chapter: '+Math.min(100,Math.round(coverage))+'%';
       }catch(e){}
     },1000);
   }}})
  }catch(e){}
 }).catch(()=>{}); // player still works with its original iframe
}
window.SYLUTION_PLAYER={attach,unload};
})();