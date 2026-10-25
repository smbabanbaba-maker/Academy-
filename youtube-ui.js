/* SYLearn: YouTube course discovery, curriculum, and lessons UI.
   Never obscures YouTube player or original creator attribution. */
(function(){
'use strict';
const V=window.SYLUTION_VIDEO;
const esc=x=>String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icons={share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.7 10.6 6.6-3.8m-6.6 6.6 6.6 3.8"/>',bookmark:'<path d="M6 3h12v18l-6-4-6 4V3z"/>',star:'<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8l-6.2 3.3L7 14.2 2 9.3l6.9-1z"/>',play:'<path d="m7 4 13 8-13 8z"/>',back:'<path d="m15 18-6-6 6-6"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',check:'<path d="m4 12 5 5L20 6"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8v1"/>',book:'<path d="M12 7v14M3 18V5a2 2 0 0 1 2-2h3a4 4 0 0 1 4 4 4 4 0 0 1 4-4h3a2 2 0 0 1 2 2v13a1 1 0 0 1-1 1h-4a4 4 0 0 0-4 2 4 4 0 0 0-4-2H4a1 1 0 0 1-1-1z"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',brain:'<rect x="3" y="7" width="18" height="14" rx="5"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/><path d="M12 3v4"/>',file:'<path d="M6 2h8l4 4v16H6zM14 2v5h5"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>'};
const icon=k=>'<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+(icons[k]||icons.book)+'</svg>';
const btn=(title,action,id)=>'<button class="btn btn-primary" data-action="'+esc(action)+'"'+(id?' data-id="'+esc(id)+'"':'')+'>'+title+' '+icon('arrow')+'</button>';
const card=c=>'<article class="yt-course-card"><button class="yt-card-image" data-action="yt-open" data-id="'+esc(c.id)+'" aria-label="Explore '+esc(c.title)+'"><img src="'+esc(c.image)+'" alt="" loading="lazy"/><span class="yt-play-round">'+icon('play')+'</span>'+(c.badge?'<span class="yt-card-badge">'+esc(c.badge)+'</span>':'')+'</button><button class="yt-save '+(V.state.saved.includes(c.id)?'on':'')+'" data-action="yt-save" data-id="'+esc(c.id)+'" aria-label="'+(V.state.saved.includes(c.id)?'Remove saved course':'Save course')+'">'+(V.state.saved.includes(c.id)?'♥':'♡')+'</button><div class="yt-card-body"><span class="yt-card-type">'+esc(c.category||'Digital Skills')+' · '+esc(c.level||'Beginner')+'</span><button class="yt-card-name" data-action="yt-open" data-id="'+esc(c.id)+'">'+esc(c.title)+'</button><p class="yt-author">'+esc(c.hours||'Self-paced')+' · '+esc(c.creator)+'</p><div class="yt-card-bottom"><button class="yt-view" data-action="yt-open" data-id="'+esc(c.id)+'">Explore course '+icon('arrow')+'</button></div></div></article>';
const catalogCard=c=>{
 const amount=Number(c.price),paid=Number.isFinite(amount)&&amount>0;
 const free=!paid&&(c.access==='free'||c.price===0||c.source==='YouTube'||c.type==='video'||c.type==='playlist');
 const access=paid?'₦'+Math.round(amount).toLocaleString('en-NG'):free?'FREE':'View price';
 const rating=Number(c.rating),reviews=Number(c.reviewCount||0);
 const reviewed=Number.isFinite(rating)&&rating>0&&rating<=5&&Number.isInteger(reviews)&&reviews>0;
 const chapters=Array.isArray(c.chapters)?c.chapters.length:0;
 const progress=Math.min(100,Math.max(0,V.progress(c)||0));
 const saved=V.state.saved.includes(c.id);
 return '<article class="elite-course-card elite-featured-card syl-course-v2 syl-course-v3 syl-catalog-card-v2 syl-catalog-card-v3 syl-catalog-home-card">'+
   '<button type="button" class="elite-course-open" data-action="yt-open" data-id="'+esc(c.id)+'" aria-label="View details for '+esc(c.title)+'">'+
   '<span class="elite-course-thumb syl-home-video-thumb"><img src="'+esc(c.image)+'" alt="'+esc(c.title)+'" loading="lazy"/>'+
   '<span class="elite-card-play" aria-hidden="true">'+icon('play')+'</span>'+
   '<span class="syl-card-price '+(paid?'syl-is-paid':'syl-is-free')+'">'+esc(access)+'</span></span>'+
   '<span class="elite-course-body"><span class="elite-course-category">'+esc(c.category||'Digital Skills')+' <b>·</b> '+esc(c.level||'All levels')+'</span>'+
   '<strong class="elite-featured-name">'+esc(c.title)+'</strong>'+
   '<span class="elite-course-description">'+esc(c.description||'Learn practical digital skills, step by step.')+'</span>'+
   '<span class="syl-card-facts"><span>'+icon('clock')+' '+esc(c.hours||'Self-paced')+'</span>'+(chapters?'<span>'+icon('book')+' '+chapters+' chapters</span>':'')+'</span>'+
   (reviewed?'<span class="syl-card-rating">'+icon('star')+' '+esc(rating.toFixed(1))+' <small>('+reviews+' reviews)</small></span>':'')+
   (progress>0?'<span class="syl-v3-progress"><span><strong>Study progress</strong><em>'+progress+'%</em></span><span class="syl-v3-meter"><span style="width:'+progress+'%"></span></span></span>':'')+
   '<span class="elite-course-foot"><span>View course</span><em>'+icon('arrow')+'</em></span></span></button>'+
   '<button type="button" class="syl-v3-home-save '+(saved?'is-saved':'')+'" data-action="yt-save" data-id="'+esc(c.id)+'" aria-label="'+(saved?'Remove saved course':'Save course')+'" aria-pressed="'+(saved?'true':'false')+'">'+icon('bookmark')+'</button></article>';
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
const formatCourseTime=seconds=>{
 const n=Math.max(0,Math.floor(Number(seconds)||0));
 return [Math.floor(n/3600),Math.floor(n%3600/60),n%60].map(x=>String(x).padStart(2,'0')).join(':');
};
const courseGuides={
 'DPqiIzK97K0':{
  outcomes:['Understand the Arduino board, breadboards and basic circuits','Build LED and traffic-light projects','Use analog inputs, sensors and pushbuttons','Explore buzzers, displays and LED matrix projects'],
  requirements:['Phone or laptop and internet for watching lessons','For hands-on projects: an Arduino-compatible board, USB data cable and computer','Breadboard, jumper wires, LEDs, resistors and sensors as needed for each activity']
 },
 'rfscVS0vtbw':{
  outcomes:['Set up Python and write your first programs','Work with variables, strings and data types','Use functions, conditions and loops','Practice files, modules and classes'],
  requirements:['A phone or laptop to follow the course','A laptop or desktop with Python is recommended for coding exercises']
 },
 'hDKCxebp88A':{
  outcomes:['Explore supervised learning and model evaluation','Work through regression, decision trees and ensembles','Understand clustering and unsupervised learning','Practice an end-to-end project and deployment workflow'],
  requirements:['Comfort with basic Python programming','A computer with Python and relevant data-science packages for hands-on exercises']
 },
 'c9Wg6Cb_YlU':{
  outcomes:['Create wireframes for a website','Turn ideas into user-interface layouts','Build polished mockups','Follow a practical design workflow using Figma'],
  requirements:['Phone or laptop and internet for learning','A laptop or desktop and access to Figma are recommended for practical design work']
 }
};
const coursePrice=c=>{
 const n=Number(c.price),paid=Number.isFinite(n)&&n>0;
 const free=!paid&&(c.access==='free'||c.price===0||c.source==='YouTube'||c.type==='video'||c.type==='playlist');
 return {paid,label:paid?'₦'+Math.round(n).toLocaleString('en-NG'):free?'FREE':'Confirm price'};
};
function course(){
 const c=V.state.selected;if(!c)return library();
 const assessment=window.SYLUTION_ASSESS,check=assessment?.record(c.id)||{};
 const ready=!!assessment?.questions(c.id)?.length;
 const lessons=V.lessons(),loading=c.type==='playlist'&&!lessons.length;
 const p=Math.max(0,Math.min(100,V.progress(c)||0));
 const progressKey=c.type+':'+c.id;
 const studied=Array.isArray(V.state.courseProgress[progressKey])?V.state.courseProgress[progressKey]:[];
 const nextIndex=lessons.findIndex((_,i)=>!studied.includes(i));
 const activeIndex=nextIndex<0?0:nextIndex;
 const saved=V.state.saved.includes(c.id);
 const price=coursePrice(c);
 const guide=courseGuides[c.id]||{};
 const titles=(Array.isArray(c.chapters)?c.chapters:[]).map(row=>String(Array.isArray(row)?row[0]:'').trim())
   .filter(t=>t&&!/^(introduction|welcome|setup|installation|complete .* workshop)$/i.test(t));
 const outcomes=guide.outcomes||titles.slice(0,4);
 const requirements=guide.requirements||
   (c.category==='Engineering & IoT'
     ?['Phone or laptop and internet for watching lessons','Additional hardware and a computer may be needed for practical projects']
     :['Phone or laptop and internet to follow the lessons','A computer and relevant tools are recommended for hands-on practice']);
 const startLabel=loading?'Loading lessons':p>=100?'Review Course':p>0?'Continue Learning':'Start Learning';
 const chapterRow=(l,i)=>'<button type="button" class="syl-v4-lesson '+(studied.includes(i)?'is-studied':i===activeIndex?'is-next':'')+'" data-action="yt-lesson" data-index="'+i+'">'+
   '<span class="syl-v4-lesson-num">'+(studied.includes(i)?icon('check'):String(i+1).padStart(2,'0'))+'</span>'+
   '<span class="syl-v4-lesson-info"><strong>'+esc(l.title)+'</strong><small>'+(c.type==='video'?'Starts at '+formatCourseTime(l.seconds):'Lesson '+(i+1))+(studied.includes(i)?' · Marked studied':'')+'</small></span>'+
   '<span class="syl-v4-lesson-arrow">'+icon('play')+'</span></button>';
 const chapterContent=lessons.length?
   '<div class="syl-v4-lesson-list">'+lessons.slice(0,4).map(chapterRow).join('')+'</div>'+
   (lessons.length>4?'<details class="syl-v4-more"'+(activeIndex>=4?' open':'')+'><summary>View remaining '+(lessons.length-4)+' chapters '+icon('arrow')+'</summary><div class="syl-v4-lesson-list">'+lessons.slice(4).map((l,i)=>chapterRow(l,i+4)).join('')+'</div></details>':'')
   :'<div class="yt-loading">'+icon('clock')+' '+esc(V.state.message||'Loading course chapters…')+'</div>';
 const learnList=outcomes.length?outcomes.map(t=>'<li>'+icon('check')+'<span>'+esc(t)+'</span></li>').join(''):'<li>'+icon('check')+'<span>Work through the course chapters at your own pace.</span></li>';
 const requirementsList=requirements.map(t=>'<li>'+icon('check')+'<span>'+esc(t)+'</span></li>').join('');
 return '<section class="screen yt-detail syl-course-detail-v4">'+
  '<div class="syl-v4-breadcrumb"><button type="button" data-go="courses">'+icon('back')+' All courses</button><span>/</span><span>'+esc(c.category||'Digital Skills')+'</span></div>'+
  '<div class="syl-v4-hero">'+
    '<div class="syl-v4-hero-media"><img src="'+esc(c.image)+'" alt="'+esc(c.title)+' course thumbnail" loading="eager"/>'+
      '<span class="syl-v4-media-mark">SYLearn · Course preview</span><span class="syl-v4-media-symbol">'+icon('play')+'</span></div>'+
    '<div class="syl-v4-hero-copy"><div class="syl-v4-tags"><span class="syl-v4-access '+(price.paid?'is-paid':'is-free')+'">'+esc(price.label)+'</span><span class="syl-v4-level">'+esc(c.level||'All levels')+'</span></div>'+
      '<span class="syl-v4-overline">'+esc(c.category||'Digital Skills')+'</span>'+
      '<h1>'+esc(c.title)+'</h1><p class="syl-v4-description">'+esc(c.description||'Build practical skills with this course.')+'</p>'+
      '<div class="syl-v4-facts"><span>'+icon('clock')+' '+esc(c.hours||'Self-paced')+'</span>'+
       '<span>'+icon('book')+' '+lessons.length+' '+(lessons.length===1?'chapter':'chapters')+'</span>'+
       '<span>'+icon('globe')+' Self-paced</span></div>'+
      '<div class="syl-v4-hero-actions"><button type="button" class="syl-v4-cta" data-action="yt-start" '+(loading?'disabled':'')+'>'+icon('play')+' '+startLabel+' '+icon('arrow')+'</button>'+
       '<button type="button" class="syl-v4-icon-action '+(saved?'is-saved':'')+'" data-action="yt-save" data-id="'+esc(c.id)+'" aria-label="'+(saved?'Remove saved course':'Save course')+'" aria-pressed="'+saved+'">'+icon('bookmark')+'</button>'+
       '<button type="button" class="syl-v4-icon-action" data-action="yt-share" aria-label="Share course">'+icon('share')+'</button></div>'+
      '<p class="syl-v4-price-note">Video lessons are '+(price.paid?'priced as shown above.':'free to watch.')+' Practice materials are not included unless stated.</p>'+
    '</div></div>'+
  '<div class="syl-v4-layout"><div class="syl-v4-main">'+
    (p>0?'<section class="syl-v4-panel syl-v4-progress" aria-label="Your study progress"><div class="syl-v4-panel-head"><div><span class="syl-v4-eyebrow">YOUR LEARNING</span><h2>Keep your momentum.</h2></div><strong>'+p+'%</strong></div><div class="syl-v4-progress-track"><span style="width:'+p+'%"></span></div><p>'+studied.length+' of '+lessons.length+' chapters marked as studied on this device. This does not verify watch time.</p></section>':'')+
    '<section class="syl-v4-panel" id="syl-course-overview"><div class="syl-v4-panel-head"><div><span class="syl-v4-eyebrow">YOUR SKILL PATH</span><h2>What you’ll learn</h2></div>'+icon('check')+'</div>'+
      '<ul class="syl-v4-checklist">'+learnList+'</ul></section>'+
    '<section class="syl-v4-panel" id="syl-course-curriculum"><div class="syl-v4-panel-head"><div><span class="syl-v4-eyebrow">YOUR COURSE ROADMAP</span><h2>Course curriculum</h2><p>'+lessons.length+' chapters · '+esc(c.hours||'Self-paced')+' · Learn in your own order</p></div><span class="syl-v4-progress-label">'+p+'% studied</span></div>'+
      chapterContent+'<p class="syl-v4-small-note">Tap a chapter to open the lesson. Progress increases only when you manually mark a chapter as studied.</p></section>'+
    '<section class="syl-v4-panel syl-v4-assessment"><div class="syl-v4-panel-head"><div><span class="syl-v4-eyebrow">PRACTICE & ASSESSMENT</span><h2>Test your knowledge</h2></div>'+icon('file')+'</div><p>Take a course-specific knowledge check. The passing score is 80%; completing the study log creates a personal learning record, not an accredited qualification.</p>'+
      '<div class="syl-v4-assessment-foot"><span>'+(check.latest?'Previous score: '+esc(check.latest.score)+'%':'Practice what you learned')+'</span><button type="button" data-action="qa-open" '+(!ready?'disabled':'')+'>'+ (ready?'Start assessment':'Assessment coming soon')+' '+icon('arrow')+'</button></div></section>'+
   '</div><aside class="syl-v4-aside">'+
    '<section class="syl-v4-panel"><span class="syl-v4-eyebrow">PREPARE TO LEARN</span><h2>Course requirements</h2><ul class="syl-v4-checklist">'+requirementsList+'</ul></section>'+
    '<section class="syl-v4-panel syl-v4-instructor"><span class="syl-v4-eyebrow">ORIGINAL EDUCATOR</span><div class="syl-v4-educator"><span class="syl-v4-educator-avatar">'+icon('book')+'</span><div><h2>'+esc(c.creator||'Course educator')+'</h2><p>Original course creator</p></div></div><p>SYLearn organizes access, chapter navigation and your personal study log. The video content belongs to its original creator.</p></section>'+
    '<section class="syl-v4-panel syl-v4-certificate"><span class="syl-v4-eyebrow">LEARNING RECORD</span><h2>Progress & certificates</h2><p>Your chapters and assessment results are recorded on this device. A verified or accredited certificate is not included with this external video course.</p></section>'+
   '</aside></div>'+
  '<div class="syl-v4-mobile-action"><span><small>'+esc(price.label)+'</small><strong>'+(p>0&&p<100?'Pick up where you left off':'Learn at your own pace')+'</strong></span><button type="button" data-action="yt-start" '+(loading?'disabled':'')+'>'+icon('play')+' '+(p>0&&p<100?'Continue':'Start')+'</button></div>'+
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
if(name==='yt-start'){const c=V.state.selected;if(!c)return true;const ls=V.lessons();const rows=V.state.courseProgress[c.type+':'+c.id]||[];const next=ls.findIndex((_,i)=>!rows.includes(i));V.setLesson(next<0?0:next);tools.nav('ytwatch',c.id);return true}
if(name==='yt-share'){
 const c=V.state.selected;if(!c)return true;
 const url=location.href,title='SYLearn: '+c.title;
 if(navigator.share){navigator.share({title,url}).catch(()=>{});}
 else if(navigator.clipboard?.writeText){navigator.clipboard.writeText(url).then(()=>tools.toast('Course link copied.')).catch(()=>tools.toast('Use the browser share menu to share this course.'));}
 else tools.toast('Use the browser share menu to share this course.');
 return true
}
if(name==='yt-lesson'){V.setLesson(Number(data.index));tools.nav('ytwatch',V.state.selected.id);return true}
if(name==='yt-back'){tools.nav('ytcourse',V.state.selected.id);return true}
if(name==='yt-complete'){let p=V.finish();tools.render();tools.toast('Lesson added to your study log: '+p+'%');return true}
if(name==='yt-reset'){V.state.items=V.curated.slice();V.state.status='curated';V.state.query='';V.state.category='All';V.state.sort='featured';V.state.kind='video';V.state.message='Explore available courses.';tools.render();return true}
return false
}
window.SYLUTION_VIDEO_UI={library,course,watch,card,action,startSearch,open};
})();