/* SYLUTION Learn: YouTube course discovery, curriculum, and lessons UI.
   Never obscures YouTube player or original creator attribution. */
(function(){
'use strict';
const V=window.SYLUTION_VIDEO;
const esc=x=>String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icons={play:'<path d="m7 4 13 8-13 8z"/>',back:'<path d="m15 18-6-6 6-6"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',check:'<path d="m4 12 5 5L20 6"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8v1"/>',book:'<path d="M12 7v14M3 18V5a2 2 0 0 1 2-2h3a4 4 0 0 1 4 4 4 4 0 0 1 4-4h3a2 2 0 0 1 2 2v13a1 1 0 0 1-1 1h-4a4 4 0 0 0-4 2 4 4 0 0 0-4-2H4a1 1 0 0 1-1-1z"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',brain:'<rect x="3" y="7" width="18" height="14" rx="5"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/><path d="M12 3v4"/>',file:'<path d="M6 2h8l4 4v16H6zM14 2v5h5"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>'};
const icon=k=>'<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+(icons[k]||icons.book)+'</svg>';
const source=()=>'<span class="yt-source-tag">'+icon('play')+' YouTube</span>';
const btn=(title,action,id)=>'<button class="btn btn-primary" data-action="'+esc(action)+'"'+(id?' data-id="'+esc(id)+'"':'')+'>'+title+' '+icon('arrow')+'</button>';
const card=c=>'<article class="yt-course-card"><button class="yt-card-image" data-action="yt-open" data-id="'+esc(c.id)+'" aria-label="View '+esc(c.title)+'"><img src="'+esc(c.image)+'" alt="" loading="lazy"/><span class="yt-play-round">'+icon('play')+'</span>'+(c.badge?'<span class="yt-card-badge">'+esc(c.badge)+'</span>':'')+'</button><button class="yt-save '+(V.state.saved.includes(c.id)?'on':'')+'" data-action="yt-save" data-id="'+esc(c.id)+'" aria-label="'+(V.state.saved.includes(c.id)?'Remove saved course':'Save course')+'">'+(V.state.saved.includes(c.id)?'♥':'♡')+'</button><div class="yt-card-body"><span class="yt-card-type">'+icon('play')+' '+esc(c.category||'Course')+' · '+esc(c.level||'Beginner')+'</span><button class="yt-card-name" data-action="yt-open" data-id="'+esc(c.id)+'">'+esc(c.title)+'</button><p class="yt-author">'+esc(c.hours||'Watch lesson')+' · By '+esc(c.creator)+'</p><div class="yt-card-bottom"><span class="yt-free-label">Free viewing</span><button class="yt-view" data-action="yt-open" data-id="'+esc(c.id)+'">View course '+icon('arrow')+'</button></div></div></article>';
const catalogCategories=()=>['All',...new Set(V.state.items.map(x=>x.category||'YouTube Courses'))];
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
const s=V.state,displayed=visibleCourses(),groups=catalogCategories(),featured=V.curated.filter(c=>c.featured).slice(0,4);
return '<section class="screen yt-library"><div class="yt-title-row"><div><div class="page-eyebrow">FREE EDUCATIONAL VIDEO COURSES</div><h1>Learn with complete <span class="red">video courses.</span></h1><p class="muted">Discover original educators through SYLUTION Learn.</p></div>'+source()+'</div>'+
'<div class="yt-feature yt-feature-premium"><div><span class="yt-feature-kicker">FREE · SELF-PACED · FLEXIBLE</span><h2>Discover skills that matter.</h2><p>Selected courses in programming, design, electronics and analytics, from their original YouTube educators.</p></div><div class="yt-feature-art">'+icon('play')+'</div></div>'+
'<div class="yt-premium-headline"><span class="yt-eyebrow">DISCOVER GREAT COURSES</span><h2>Start learning. Keep growing.</h2><p>A carefully reduced selection of identified educational videos, with original source credit.</p><div class="yt-premium-metrics"><span>'+V.curated.length+' handpicked courses</span><span>'+new Set(V.curated.map(c=>c.category)).size+' subject areas</span><span>100% free video viewing</span></div></div>'+
(s.category==='All'&&s.status==='curated'?'<div class="yt-featured-shelf">'+featured.map(c=>'<button class="yt-shelf-card" data-action="yt-open" data-id="'+esc(c.id)+'"><span class="yt-shelf-picture"><img src="'+esc(c.image)+'" alt="" loading="lazy"/></span><span class="yt-shelf-copy"><small>'+esc(c.category)+'</small><strong>'+esc(c.title)+'</strong><em>Start learning →</em></span></button>').join('')+'</div>':'')+
'<form id="yt-search-form" class="yt-search-form"><div class="searchbar">'+icon('search')+'<input type="search" required minlength="2" name="query" aria-label="Search YouTube courses" placeholder="Try: robotics, agriculture, French, AI..." value="'+esc(s.query)+'"/><button type="submit" class="btn btn-primary">Search '+icon('arrow')+'</button></div><div class="yt-search-types"><label><input type="radio" name="kind" value="video" '+(s.kind!=='playlist'?'checked':'')+'/> Full-length videos</label><label><input type="radio" name="kind" value="playlist" '+(s.kind==='playlist'?'checked':'')+'/> Course playlists</label><button type="button" data-action="yt-reset">Curated courses</button></div></form>'+
'<div class="yt-premium-subhead"><span class="yt-eyebrow">EXPLORE SUBJECTS</span><h2>Browse by interest</h2><p>Find a course that matches your next goal.</p></div>'+
'<div class="yt-category-filters" role="group" aria-label="Filter courses">'+groups.map(group=>'<button class="yt-filter '+(s.category===group?'active':'')+'" data-action="yt-filter" data-value="'+esc(group)+'" aria-pressed="'+(s.category===group?'true':'false')+'">'+esc(group)+'</button>').join('')+'</div>'+
'<div class="yt-source-note" role="status">'+icon('info')+' <span>'+esc(s.message)+'</span></div>'+
'<div class="yt-sort-bar"><span class="yt-eyebrow">COURSE DIRECTORY</span><div class="yt-sort-buttons"><button class="'+(s.sort==='featured'?'active':'')+'" data-action="yt-sort" data-value="featured">Recommended</button><button class="'+(s.sort==='az'?'active':'')+'" data-action="yt-sort" data-value="az">A–Z</button><button class="'+(s.sort==='beginner'?'active':'')+'" data-action="yt-sort" data-value="beginner">Beginner</button><button class="'+(s.sort==='saved'?'active':'')+'" data-action="yt-sort" data-value="saved">♥ Saved ('+s.saved.length+')</button></div></div>'+ '<div class="yt-grid-head"><h2>'+(s.category&&s.category!=='All'?esc(s.category):s.status==='curated'?'All curated courses':'Course search results')+'</h2><span>'+displayed.length+' courses</span></div>'+
(displayed.length?'<div class="yt-course-grid">'+displayed.map(card).join('')+'</div>':'<div class="empty">'+icon('search')+'<h3>No courses found</h3><p>Try another subject or browse the curated video library.</p><button class="btn btn-primary" data-action="yt-reset">Show starter courses</button></div>')+
'<div class="yt-ethical"><strong>Source and permissions</strong><p>These videos are created by the original YouTube channels, not by SYLUTION. They play through the official embedded YouTube player with creator attribution. YouTube may display its normal controls and ads. Availability can change.</p></div></section>';
}
function course(){
const c=V.state.selected;if(!c)return library();
const assessment=window.SYLUTION_ASSESS;
const check=assessment?.record(c.id)||{};
const p=V.progress(c);
const ready=!!assessment?.questions(c.id).length;
const ls=V.lessons(),loading=c.type==='playlist'&&!ls.length;
return '<section class="screen yt-detail"><button class="back-btn" data-go="courses">'+icon('back')+' All courses</button>'+
'<div class="yt-detail-hero"><img src="'+esc(c.image)+'" alt="" loading="lazy"/><div class="yt-detail-content">'+source()+'<h1>'+esc(c.title)+'</h1><p>'+esc(c.description)+'</p><div class="yt-credit">By <strong>'+esc(c.creator)+'</strong></div><button class="btn btn-primary" data-action="yt-start" '+(loading?'disabled':'')+'>'+icon('play')+' '+(loading?'Loading lessons':'Start watching')+'</button></div></div>'+
'<div class="yt-facts"><span>'+icon('book')+' '+ls.length+' '+(c.type==='video'?'chapter segments':'lessons')+'</span><span>'+icon('clock')+' '+esc(c.hours)+'</span><span>'+icon('globe')+' Free on YouTube</span></div>'+
'<div class="yt-curriculum-head"><div><h2>Course Curriculum</h2><p class="muted small">'+(c.type==='video'?'Chapters are timestamp positions in the same original video.':'Each lesson comes from the original creator’s playlist.')+'</p></div><span class="badge muted-badge">'+V.progress(c)+'% in study log</span></div>'+
(ls.length?'<div class="yt-lessons">'+ls.map((l,i)=>'<button class="yt-lesson-row" data-action="yt-lesson" data-index="'+i+'"><span class="yt-lesson-number">'+(i+1)+'</span><span class="yt-lesson-copy"><strong>'+esc(l.title)+'</strong><small>'+esc(c.creator)+' · '+(c.type==='video'?'From '+Math.floor(l.seconds/60)+'m '+String(l.seconds%60).padStart(2,'0')+'s':'YouTube video')+'</small></span>'+icon('play')+'</button>').join('')+'</div>':'<div class="yt-loading">'+icon('clock')+' '+esc(V.state.message||'Loading playlist lessons…')+'</div>')+
'<div class="course-check-panel"><div><span class="learning-kicker">KNOWLEDGE CHECK</span><h2>Test what you learned.</h2><p>Take a short course-specific assessment. Pass with 80% and complete the study chapters to create a personal learning record.</p><small>'+ (check.latest?'Your previous result: '+check.latest.score+'% · ':'')+'Chapter progress: '+p+'% · Saved on this device</small></div><button class="btn btn-primary" data-action="qa-open" '+(!ready?'disabled':'')+'>'+ (ready?'Start knowledge check':'Assessment coming soon')+' →</button></div>'+
'<div class="yt-ethical"><strong>Original content</strong><p>SYLUTION Learn curates and organizes the learning journey. The video belongs to its named YouTube creator. There is no fee to view the embedded YouTube video. Independent quizzes and local study records are created by SYLUTION, not the original creator.</p></div></section>';
}
function watch(){
const c=V.state.selected,l=V.currentLesson();if(!c||!l)return course();
if(!V.validVideo(l.id))return '<section class="screen"><h1>Video unavailable</h1><button class="btn btn-primary" data-go="ytlibrary">Back to courses</button></section>';
const ls=V.lessons(),secs=Math.max(0,Number(l.seconds)||0),src='https://www.youtube-nocookie.com/embed/'+l.id+'?start='+secs+'&playsinline=1&rel=0&enablejsapi=1'+(location.origin?'&origin='+encodeURIComponent(location.origin):'');
return '<section class="screen yt-watch"><button class="back-btn" data-action="yt-back">'+icon('back')+' Back to curriculum</button>'+
'<div class="yt-watch-layout"><div class="yt-video-column"><div class="yt-video-ratio"><iframe id="yt-lesson-frame" title="'+esc(l.title)+' — YouTube video by '+esc(c.creator)+'" src="'+src+'" loading="eager" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>'+
'<div class="yt-video-meta">'+source()+'<h1>'+esc(l.title)+'</h1><p class="muted">'+esc(c.title)+'</p><p class="yt-credit">Original educator: <strong>'+esc(c.creator)+'</strong></p><div class="yt-watch-tools"><button class="btn btn-primary" data-action="yt-complete">'+icon('check')+' Mark chapter studied</button><a class="btn btn-outline" href="https://www.youtube.com/watch?v='+l.id+(secs?'&t='+secs+'s':'')+'" target="_blank" rel="noopener noreferrer">Watch on YouTube '+icon('arrow')+'</a></div><p id="yt-study-activity" class="yt-activity" role="status">Automatic playback activity tracking is available when supported by YouTube. You may also mark the chapter studied manually.</p><p class="fine-print">Observed playback is only an approximate local study indicator, not proctored proof. If embedding is restricted, use “Watch on YouTube”.</p></div>'+
'<div class="yt-under-player"><h3>Learning tools</h3><div class="yt-study-actions"><button data-go="ai">'+icon('brain')+' AI Tutor</button><button data-action="qa-open">'+icon('file')+' Course assessment</button><button data-go="progress">'+icon('book')+' Your progress</button></div></div></div>'+
'<aside class="yt-watch-sidebar"><div class="yt-sidebar-head"><h3>All chapters</h3><span>'+(V.state.lesson+1)+' / '+ls.length+'</span></div><div class="yt-sidebar-list">'+ls.map((x,i)=>'<button class="yt-sidebar-lesson '+(i===V.state.lesson?'active':'')+'" data-action="yt-lesson" data-index="'+i+'"><span class="yt-side-play">'+icon(i===V.state.lesson?'play':'book')+'</span><span><strong>'+(i+1)+'. '+esc(x.title)+'</strong><small>'+esc(c.creator)+'</small></span></button>').join('')+'</div><div class="yt-sidebar-bottom"><p>Your manually logged study progress</p><div class="progress-track"><div class="progress-fill" style="width:'+V.progress(c)+'%"></div></div><strong>'+V.progress(c)+'%</strong></div></aside></div></section>';
}
function startSearch(form,done){
const data=new FormData(form);const q=String(data.get('query')||'').trim(),kind=String(data.get('kind')||'video');
V.state.category='All';V.state.sort='featured';return V.search(q,kind).then(done);
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
if(name==='yt-reset'){V.state.items=V.curated.slice();V.state.status='curated';V.state.query='';V.state.category='All';V.state.sort='featured';V.state.kind='video';V.state.message='Browse '+V.curated.length+' curated video courses. Live search requires a configured server API key.';tools.render();return true}
return false
}
window.SYLUTION_VIDEO_UI={library,course,watch,card,action,startSearch,open};
})();