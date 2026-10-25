/* SYLearn: YouTube course discovery, curriculum, and lessons UI.
   Never obscures YouTube player or original creator attribution. */
(function(){
'use strict';
const V=window.SYLUTION_VIDEO;
const esc=x=>String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icons={star:'<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8l-6.2 3.3L7 14.2 2 9.3l6.9-1z"/>',play:'<path d="m7 4 13 8-13 8z"/>',back:'<path d="m15 18-6-6 6-6"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',check:'<path d="m4 12 5 5L20 6"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8v1"/>',book:'<path d="M12 7v14M3 18V5a2 2 0 0 1 2-2h3a4 4 0 0 1 4 4 4 4 0 0 1 4-4h3a2 2 0 0 1 2 2v13a1 1 0 0 1-1 1h-4a4 4 0 0 0-4 2 4 4 0 0 0-4-2H4a1 1 0 0 1-1-1z"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',brain:'<rect x="3" y="7" width="18" height="14" rx="5"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/><path d="M12 3v4"/>',file:'<path d="M6 2h8l4 4v16H6zM14 2v5h5"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>'};
const icon=k=>'<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+(icons[k]||icons.book)+'</svg>';
const btn=(title,action,id)=>'<button class="btn btn-primary" data-action="'+esc(action)+'"'+(id?' data-id="'+esc(id)+'"':'')+'>'+title+' '+icon('arrow')+'</button>';
const card=c=>'<article class="yt-course-card"><button class="yt-card-image" data-action="yt-open" data-id="'+esc(c.id)+'" aria-label="Explore '+esc(c.title)+'"><img src="'+esc(c.image)+'" alt="" loading="lazy"/><span class="yt-play-round">'+icon('play')+'</span>'+(c.badge?'<span class="yt-card-badge">'+esc(c.badge)+'</span>':'')+'</button><button class="yt-save '+(V.state.saved.includes(c.id)?'on':'')+'" data-action="yt-save" data-id="'+esc(c.id)+'" aria-label="'+(V.state.saved.includes(c.id)?'Remove saved course':'Save course')+'">'+(V.state.saved.includes(c.id)?'♥':'♡')+'</button><div class="yt-card-body"><span class="yt-card-type">'+esc(c.category||'Digital Skills')+' · '+esc(c.level||'Beginner')+'</span><button class="yt-card-name" data-action="yt-open" data-id="'+esc(c.id)+'">'+esc(c.title)+'</button><p class="yt-author">'+esc(c.hours||'Self-paced')+' · '+esc(c.creator)+'</p><div class="yt-card-bottom"><button class="yt-view" data-action="yt-open" data-id="'+esc(c.id)+'">Explore course '+icon('arrow')+'</button></div></div></article>';
const catalogCard=c=>{
 const amount=Number(c.price),paid=Number.isFinite(amount)&&amount>0;
 const free=!paid&&(c.access==='free'||c.price===0||c.source==='YouTube'||c.type==='video'||c.type==='playlist');
 const access=paid?'₦'+Math.round(amount).toLocaleString('en-NG'):free?'FREE':'View price';
 const rating=Number(c.rating),reviews=Number(c.reviewCount||0);
 const reviewed=Number.isFinite(rating)&&rating>0&&rating<=5&&Number.isInteger(reviews)&&reviews>0;
 const chapterCount=Array.isArray(c.chapters)?c.chapters.length:0;
 const progress=Math.min(100,Math.max(0,V.progress(c)||0));
 const selectedTopics=(Array.isArray(c.chapters)?c.chapters:[])
   .map(row=>Array.isArray(row)?String(row[0]||'').trim():'')
   .filter(title=>title&&!/^(introduction|welcome|getting started|setup|installation|bootcamp introduction|complete .* workshop|what is)/i.test(title))
   .slice(0,2);
 const saved=V.state.saved.includes(c.id);
 return '<article class="yt-course-card syl-catalog-card-v2 syl-catalog-card-v3">'+
  '<div class="syl-catalog-media"><button class="yt-card-image" data-action="yt-open" data-id="'+esc(c.id)+'" aria-label="View '+esc(c.title)+' details"><img src="'+esc(c.image)+'" alt="" loading="lazy"/><span class="yt-play-round">'+icon('play')+'</span></button>'+
  '<span class="syl-card-price '+(paid?'syl-is-paid':'syl-is-free')+'">'+esc(access)+'</span>'+
  '<button class="yt-save '+(saved?'on':'')+'" data-action="yt-save" data-id="'+esc(c.id)+'" aria-label="'+(saved?'Remove saved course':'Save course')+'" aria-pressed="'+(saved?'true':'false')+'">'+(saved?'♥':'♡')+'</button></div>'+
  '<div class="yt-card-body">'+
  '<span class="yt-card-type">'+esc(c.category||'Digital Skills')+' · '+esc(c.level||'All levels')+'</span>'+
  '<button class="yt-card-name" data-action="yt-open" data-id="'+esc(c.id)+'">'+esc(c.title)+'</button>'+
  '<p class="syl-catalog-blurb">'+esc(c.description||'Practical skills for real-world learning.')+'</p>'+
  (selectedTopics.length?'<div class="syl-v3-topics" aria-label="Topics covered">'+selectedTopics.map(t=>'<span>'+esc(t)+'</span>').join('')+'</div>':'')+
  '<div class="syl-catalog-facts"><span>'+icon('clock')+' '+esc(c.hours||'Self-paced')+'</span>'+(chapterCount?'<span>'+icon('book')+' '+chapterCount+' chapters</span>':'')+'</div>'+
  (reviewed?'<div class="syl-catalog-rating">'+icon('star')+' '+esc(rating.toFixed(1))+' <small>('+reviews+' reviews)</small></div>':'')+
  (progress>0?'<div class="syl-v3-progress"><span><strong>Study progress</strong><em>'+progress+'%</em></span><span class="syl-v3-meter"><span style="width:'+progress+'%"></span></span></div>':'')+
  '<div class="yt-card-bottom"><button class="yt-view" data-action="yt-open" data-id="'+esc(c.id)+'">View course '+icon('arrow')+'</button></div></div></article>';
};
const catalogCategories=()=>['All',...new Set(V.curated.map(x=>x.category||'Digital Skills'))];
const visibleCourses=()=>{
 let list=V.state.items.slice();
 if(V.state.category&&V.state.category!=='All')list=list.filter(c=>(c.category||'YouTube Courses')===V.state.category);
 if(V.state.sort==='az')list.sort((a,b)=>a.title.localeCompare(b.title));
 else if(V.state.sort==='beginner')list.sort((a,b)=>(a.level==='Beginner'?0:1)-(b.level==='Beginner'?0:1)||a.title.localeCompare(b.title));
 else if(V.state.sort==='saved')list=list.filter(c=>V.state.saved.includes(c.id));
 else if(V.state.sort==='featured')list.sort((a,b)=>Number(Boolean(b.featured))-Number(Boolean(a.featured)));
 return list;
};
function library(){
 const s=V.state,displayed=visibleCourses(),groups=catalogCategories();
 return '<section class="screen yt-library elite-catalog syl-clean-catalog">'+
 '<div class="elite-catalog-intro"><span class="elite-section-eyebrow">SYLearn · COURSES</span><h1>Find your <span>next skill.</span></h1><p>Practical courses to help you learn, build and grow at your own pace.</p></div>'+
 '<form id="yt-search-form" class="yt-search-form elite-catalog-search" role="search"><div class="searchbar">'+icon('search')+'<input type="search" name="query" minlength="2" aria-label="Search courses" placeholder="Search courses, topics or skills..." value="'+esc(s.query||'')+'"/><button type="submit" class="btn btn-primary">Search '+icon('arrow')+'</button></div></form>'+
 '<div class="elite-catalog-filters"><div class="elite-catalog-filterhead"><h2>Explore categories</h2></div><div class="yt-category-filters" role="group" aria-label="Filter courses">'+groups.map(group=>'<button class="yt-filter '+(s.category===group?'active':'')+'" data-action="yt-filter" data-value="'+esc(group)+'" aria-pressed="'+(s.category===group?'true':'false')+'">'+esc(group)+'</button>').join('')+'</div></div>'+
 '<div class="yt-sort-bar elite-catalog-sort"><div class="syl-catalog-results"><strong>'+(s.query?'Search results':s.category&&s.category!=='All'?esc(s.category):'All courses')+'</strong><span>'+displayed.length+' '+(displayed.length===1?'course':'courses')+'</span></div><div class="yt-sort-buttons"><button class="'+(s.sort==='featured'?'active':'')+'" data-action="yt-sort" data-value="featured">Recommended</button><button class="'+(s.sort==='az'?'active':'')+'" data-action="yt-sort" data-value="az">A–Z</button><button class="'+(s.sort==='beginner'?'active':'')+'" data-action="yt-sort" data-value="beginner">Beginner</button><button class="'+(s.sort==='saved'?'active':'')+'" data-action="yt-sort" data-value="saved">Saved ('+s.saved.length+')</button></div></div>'+
 (s.query?'<button class="syl-clear-search" data-action="yt-reset" type="button">Clear search</button>':'')+
 (displayed.length?'<div class="yt-course-grid">'+displayed.map(catalogCard).join('')+'</div>':'<div class="empty">'+icon('search')+'<h3>No matching courses</h3><p>Try another skill or explore all courses.</p><button class="btn btn-primary" data-action="yt-reset">See all courses</button></div>')+
 '</section>';
}
function course(){
const c=V.state.selected;if(!c)return library();
const assessment=window.SYLUTION_ASSESS;
const check=assessment?.record(c.id)||{};
const p=V.progress(c);
const ready=!!assessment?.questions(c.id).length;
const ls=V.lessons(),loading=c.type==='playlist'&&!ls.length;
return '<section class="screen yt-detail"><button class="back-btn" data-go="courses">'+icon('back')+' All courses</button>'+
'<div class="yt-detail-hero"><img src="'+esc(c.image)+'" alt="" loading="lazy"/><div class="yt-detail-content"><h1>'+esc(c.title)+'</h1><p>'+esc(c.description)+'</p><div class="yt-credit">By <strong>'+esc(c.creator)+'</strong></div><button class="btn btn-primary" data-action="yt-start" '+(loading?'disabled':'')+'>'+icon('play')+' '+(loading?'Loading lessons':'Start watching')+'</button></div></div>'+
'<div class="yt-facts"><span>'+icon('book')+' '+ls.length+' '+(c.type==='video'?'chapter segments':'lessons')+'</span><span>'+icon('clock')+' '+esc(c.hours)+'</span><span>'+icon('globe')+' Self-paced learning</span></div>'+
'<div class="yt-curriculum-head"><div><h2>Course Curriculum</h2><p class="muted small">'+(c.type==='video'?'Follow each chapter and build your skills step by step.':'Follow each lesson in order and track your progress.')+'</p></div><span class="badge muted-badge">'+V.progress(c)+'% in study log</span></div>'+
(ls.length?'<div class="yt-lessons">'+ls.map((l,i)=>'<button class="yt-lesson-row" data-action="yt-lesson" data-index="'+i+'"><span class="yt-lesson-number">'+(i+1)+'</span><span class="yt-lesson-copy"><strong>'+esc(l.title)+'</strong><small>'+esc(c.creator)+' · '+(c.type==='video'?'From '+Math.floor(l.seconds/60)+'m '+String(l.seconds%60).padStart(2,'0')+'s':'Lesson')+'</small></span>'+icon('play')+'</button>').join('')+'</div>':'<div class="yt-loading">'+icon('clock')+' '+esc(V.state.message||'Loading playlist lessons…')+'</div>')+
'<div class="course-check-panel"><div><span class="learning-kicker">KNOWLEDGE CHECK</span><h2>Test what you learned.</h2><p>Take a short course-specific assessment. Pass with 80% and complete the study chapters to create a personal learning record.</p><small>'+ (check.latest?'Your previous result: '+check.latest.score+'% · ':'')+'Chapter progress: '+p+'% · Saved on this device</small></div><button class="btn btn-primary" data-action="qa-open" '+(!ready?'disabled':'')+'>'+ (ready?'Start knowledge check':'Assessment coming soon')+' →</button></div>'+
'</section>';
}
function watch(){
const c=V.state.selected,l=V.currentLesson();if(!c||!l)return course();
if(!V.validVideo(l.id))return '<section class="screen"><h1>Video unavailable</h1><button class="btn btn-primary" data-go="ytlibrary">Back to courses</button></section>';
const ls=V.lessons(),secs=Math.max(0,Number(l.seconds)||0),src='https://www.youtube-nocookie.com/embed/'+l.id+'?start='+secs+'&playsinline=1&rel=0&enablejsapi=1'+(location.origin?'&origin='+encodeURIComponent(location.origin):'');
return '<section class="screen yt-watch"><button class="back-btn" data-action="yt-back">'+icon('back')+' Back to curriculum</button>'+
'<div class="yt-watch-layout"><div class="yt-video-column"><div class="yt-video-ratio"><iframe id="yt-lesson-frame" title="'+esc(l.title)+' — YouTube video by '+esc(c.creator)+'" src="'+src+'" loading="eager" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>'+
'<div class="yt-video-meta"><h1>'+esc(l.title)+'</h1><p class="muted">'+esc(c.title)+'</p><p class="yt-credit">Course by <strong>'+esc(c.creator)+'</strong></p><div class="yt-watch-tools"><button class="btn btn-primary" data-action="yt-complete">'+icon('check')+' Mark chapter studied</button><a class="btn btn-outline" href="https://www.youtube.com/watch?v='+l.id+(secs?'&t='+secs+'s':'')+'" target="_blank" rel="noopener noreferrer">Open original video '+icon('arrow')+'</a></div><p id="yt-study-activity" class="yt-activity" role="status">Mark each chapter as studied when you finish learning.</p><p class="fine-print">Study progress is stored on this device. If the player is unavailable, open the original video.</p></div>'+
'<div class="yt-under-player"><h3>Learning tools</h3><div class="yt-study-actions"><button data-go="ai">'+icon('brain')+' AI Tutor</button><button data-action="qa-open">'+icon('file')+' Course assessment</button><button data-go="progress">'+icon('book')+' Your progress</button></div></div></div>'+
'<aside class="yt-watch-sidebar"><div class="yt-sidebar-head"><h3>All chapters</h3><span>'+(V.state.lesson+1)+' / '+ls.length+'</span></div><div class="yt-sidebar-list">'+ls.map((x,i)=>'<button class="yt-sidebar-lesson '+(i===V.state.lesson?'active':'')+'" data-action="yt-lesson" data-index="'+i+'"><span class="yt-side-play">'+icon(i===V.state.lesson?'play':'book')+'</span><span><strong>'+(i+1)+'. '+esc(x.title)+'</strong><small>'+esc(c.creator)+'</small></span></button>').join('')+'</div><div class="yt-sidebar-bottom"><p>Your manually logged study progress</p><div class="progress-track"><div class="progress-fill" style="width:'+V.progress(c)+'%"></div></div><strong>'+V.progress(c)+'%</strong></div></aside></div></section>';
}
function startSearch(form,done){
 const data=new FormData(form),q=String(data.get('query')||'').trim().slice(0,80),needle=q.toLowerCase();
 V.state.query=q;V.state.kind='video';V.state.category='All';V.state.sort='featured';
 V.state.items=q?V.curated.filter(c=>(c.title+' '+c.category+' '+c.description+' '+c.creator).toLowerCase().includes(needle)):V.curated.slice();
 V.state.status=q?'filtered':'curated';V.state.message='';
 if(typeof done==='function')done();
 return Promise.resolve(V.state);
}
function open(id,nav,render,toast){
if(!V.select(id)){toast('Course is unavailable. Please choose another.');return}
nav('ytcourse',id);
if(V.state.selected.type==='playlist')V.getLessons().then(()=>{if(location.hash.startsWith('#/ytcourse'))render()});
}
function action(name,data,tools){
if(name==='yt-save'){const yes=V.toggleSaved(data.id);tools.render();tools.toast(yes?'Saved to your learning list.':'Removed from saved.');return true}
if(name==='yt-filter'){V.state.category=String(data.value||'All');tools.render();return true}
if(name==='yt-sort'){V.state.sort=['featured','az','beginner','saved'].includes(data.value)?data.value:'featured';tools.render();return true}
if(name==='yt-open'){open(data.id,tools.nav,tools.render,tools.toast);return true}
if(name==='yt-start'){V.setLesson(0);tools.nav('ytwatch',V.state.selected.id);return true}
if(name==='yt-lesson'){V.setLesson(Number(data.index));tools.nav('ytwatch',V.state.selected.id);return true}
if(name==='yt-back'){tools.nav('ytcourse',V.state.selected.id);return true}
if(name==='yt-complete'){let p=V.finish();tools.render();tools.toast('Lesson added to your study log: '+p+'%');return true}
if(name==='yt-reset'){V.state.items=V.curated.slice();V.state.status='curated';V.state.query='';V.state.category='All';V.state.sort='featured';V.state.kind='video';V.state.message='Explore available courses.';tools.render();return true}
return false
}
window.SYLUTION_VIDEO_UI={library,course,watch,card,action,startSearch,open};
})();