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
    '<button type="button" class="syl-v4-hero-media" data-action="yt-start" aria-label="Play '+esc(c.title)+'" '+(loading?'disabled':'')+'><img src="'+esc(c.image)+'" alt="" loading="eager"/>'+
      '<span class="syl-v4-media-mark">SYLearn · Course video</span><span class="syl-v4-media-symbol" aria-hidden="true">'+icon('play')+'</span></button>'+
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
    '<section class="syl-v4-panel syl-v4-progress" aria-label="Your study progress"><div class="syl-v4-panel-head"><div><span class="syl-v4-eyebrow">YOUR LEARNING JOURNEY</span><h2>'+ (p>=100?'Course study complete':p>0?'Keep your momentum':'Ready to begin?') +'</h2></div><strong>'+p+'%</strong></div><div class="syl-v4-progress-track" role="progressbar" aria-label="Chapters marked studied" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+p+'"><span style="width:'+p+'%"></span></div><p>'+studied.length+' of '+lessons.length+' chapters marked as studied on this device. This does not verify watch time.</p></section>'+
    '<section class="syl-v4-panel" id="syl-course-overview"><div class="syl-v4-panel-head"><div><span class="syl-v4-eyebrow">YOUR SKILL PATH</span><h2>What you’ll learn</h2></div>'+icon('check')+'</div>'+
      '<ul class="syl-v4-checklist">'+learnList+'</ul></section>'+
    '<section class="syl-v4-panel" id="syl-course-curriculum"><div class="syl-v4-panel-head"><div><span class="syl-v4-eyebrow">YOUR COURSE ROADMAP</span><h2>Course curriculum</h2><p>'+lessons.length+' chapters · '+esc(c.hours||'Self-paced')+' · Learn in your own order</p></div><span class="syl-v4-progress-label">'+p+'% studied</span></div>'+
      chapterContent+'<p class="syl-v4-small-note">Tap a chapter to open the lesson. Progress increases only when you manually mark a chapter as studied.</p></section>'+
    '<section class="syl-v4-panel syl-v4-assessment"><div class="syl-v4-panel-head"><div><span class="syl-v4-eyebrow">PRACTICE & ASSESSMENT · 80% TO PASS</span><h2>Test your knowledge</h2></div>'+icon('file')+'</div><p>Take a course-specific knowledge check. The passing score is 80%; completing the study log creates a personal learning record, not an accredited qualification.</p>'+
      '<div class="syl-v4-assessment-foot"><span>'+(check.latest?'Previous score: '+esc(check.latest.score)+'%':'Practice what you learned')+'</span><button type="button" data-action="qa-open" '+(!ready?'disabled':'')+'>'+ (ready?'Start assessment':'Assessment coming soon')+' '+icon('arrow')+'</button></div></section>'+
   '</div><aside class="syl-v4-aside">'+
    '<section class="syl-v4-panel"><span class="syl-v4-eyebrow">PREPARE TO LEARN</span><h2>Course requirements</h2><ul class="syl-v4-checklist">'+requirementsList+'</ul></section>'+
    '<section class="syl-v4-panel syl-v4-instructor"><span class="syl-v4-eyebrow">ORIGINAL EDUCATOR</span><div class="syl-v4-educator"><span class="syl-v4-educator-avatar">'+icon('book')+'</span><div><h2>'+esc(c.creator||'Course educator')+'</h2><p>Original course creator</p></div></div><p>SYLearn organizes access, chapter navigation and your personal study log. The video content belongs to its original creator.</p></section>'+
    '<section class="syl-v4-panel syl-v4-certificate"><span class="syl-v4-eyebrow">LEARNING RECORD</span><h2>Progress & certificates</h2><p>Your chapters and assessment results are recorded on this device. A verified or accredited certificate is not included with this external video course.</p></section>'+
   '</aside></div>'+
  '<div class="syl-v4-mobile-action"><span><small>'+esc(price.label)+'</small><strong>'+(p>0&&p<100?'Pick up where you left off':'Learn at your own pace')+'</strong></span><button type="button" data-action="yt-start" '+(loading?'disabled':'')+'>'+icon('play')+' '+(p>0&&p<100?'Continue':'Start')+'</button></div>'+
 '</section>';
}
const timecode=seconds=>{
 const n=Math.max(0,Math.floor(Number(seconds)||0));
 return [Math.floor(n/3600),Math.floor(n%3600/60),n%60].map(x=>String(x).padStart(2,'0')).join(':');
};
/* Keep classroom styling atomic with its markup; prevents stale Vercel CSS/JS mismatches. */
const classroomFullscreenStyles="\n/* Fullscreen classroom video controls: no YouTube interface masking */\n.syl-classroom-v5 .syl-video-fullscreen {position:relative;display:block;isolation:isolate;background:#080d16;}\n.syl-classroom-v5 .syl-fs-toolbar {display:none;}\n.syl-classroom-v5 .syl-fs-inline-actions {display:flex;align-items:center;justify-content:flex-end;gap:15px;flex-wrap:wrap;}\n.syl-classroom-v5 .syl-fs-inline-actions button {display:inline-flex;align-items:center;gap:7px;min-height:35px;border:1px solid #405268;border-radius:9px;background:#233044;color:#fff;font-size:11px;font-weight:850;padding:7px 10px;}\n.syl-classroom-v5 .syl-fs-inline-actions button:hover {background:#344560;}\n.syl-classroom-v5 .syl-fs-inline-actions button svg {width:15px;height:15px;}\n.syl-classroom-v5 .syl-video-fullscreen:fullscreen,\n.syl-classroom-v5 .syl-video-fullscreen:-webkit-full-screen,\n.syl-classroom-v5 .syl-video-fullscreen.syl-fs-theater {\n  position:fixed!important;inset:0!important;z-index:2147483647!important;\n  width:100vw!important;height:100vh!important;height:100dvh!important;\n  max-height:none!important;max-width:none!important;border:0!important;\n  display:flex!important;flex-direction:column!important;\n  background:#05080e!important;overflow:hidden!important;\n}\n.syl-classroom-v5 .syl-video-fullscreen:fullscreen .syl-fs-toolbar,\n.syl-classroom-v5 .syl-video-fullscreen:-webkit-full-screen .syl-fs-toolbar,\n.syl-classroom-v5 .syl-video-fullscreen.syl-fs-theater .syl-fs-toolbar{\n  display:flex;align-items:center;justify-content:space-between;gap:10px;\n  flex:0 0 44px;position:relative;z-index:12;\n  width:100%;height:44px;padding:5px 13px;\n  background:#111d2d;color:#f5f7fb;\n}\n.syl-classroom-v5 .syl-fs-toolbar span {font-size:11px;font-weight:800;}\n.syl-classroom-v5 .syl-fs-toolbar button {display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:8px 11px;border:1px solid #41506a;border-radius:8px;background:#253248;color:#fff;font-size:11px;font-weight:850;min-height:34px;}\n.syl-classroom-v5 .syl-fs-toolbar button svg{height:16px;width:16px;}\n.syl-classroom-v5 .syl-video-fullscreen:fullscreen .syl-classroom-video-ratio,\n.syl-classroom-v5 .syl-video-fullscreen:-webkit-full-screen .syl-classroom-video-ratio,\n.syl-classroom-v5 .syl-video-fullscreen.syl-fs-theater .syl-classroom-video-ratio{\n  display:block;position:relative;flex:1 1 0;min-height:0;\n  width:100%!important;height:auto!important;aspect-ratio:auto!important;\n  overflow:hidden;background:#05080e;\n}\n.syl-classroom-v5 .syl-video-fullscreen:fullscreen .syl-classroom-video-ratio iframe,\n.syl-classroom-v5 .syl-video-fullscreen:-webkit-full-screen .syl-classroom-video-ratio iframe,\n.syl-classroom-v5 .syl-video-fullscreen.syl-fs-theater .syl-classroom-video-ratio iframe{\n  position:absolute;inset:0;width:100%;height:100%;border:0;\n}\n@media(orientation:portrait) {\n  .syl-classroom-v5 .syl-video-fullscreen.syl-fs-rotate:fullscreen .syl-classroom-video-ratio,\n  .syl-classroom-v5 .syl-video-fullscreen.syl-fs-rotate:-webkit-full-screen .syl-classroom-video-ratio,\n  .syl-classroom-v5 .syl-video-fullscreen.syl-fs-rotate.syl-fs-theater .syl-classroom-video-ratio{\n    flex:none;position:absolute;left:50%;top:50%;\n    width:100dvh!important;height:100vw!important;\n    transform:translate(-50%,-50%) rotate(90deg);\n    transform-origin:center;aspect-ratio:auto!important;\n    z-index:1;\n  }\n  .syl-classroom-v5 .syl-video-fullscreen.syl-fs-rotate .syl-fs-toolbar{\n    flex:0 0 auto;position:absolute;top:0;left:0;width:100%;\n    background:rgba(17,29,45,.93);\n  }\n}\n@media(max-width:640px) {\n  .syl-classroom-v5 .syl-classroom-video-caption {gap:7px;}\n  .syl-classroom-v5 .syl-fs-inline-actions {gap:8px;}\n  .syl-classroom-v5 .syl-fs-inline-actions button {min-height:33px;padding:6px 9px;font-size:10px;}\n  .syl-classroom-v5 .syl-classroom-video-caption a {font-size:9px;}\n}\n";
const classroomBundledStyles="/* SYLearn Classroom V5 — learning-player route only */\n.syl-classroom-v5{\n  --class-ink:#1f2939;--class-muted:#778292;\n  --class-red:#d92b50;--class-line:#e7ebf1;\n  --class-panel:#fff;\n  color:var(--class-ink);\n  padding:20px 0 46px;\n}\n.syl-classroom-v5 .syl-classroom-topline{\n  display:flex;align-items:center;gap:10px;\n  min-width:0;margin-bottom:19px;\n  color:#a0a8b3;font-size:11px;font-weight:750;\n}\n.syl-classroom-v5 .syl-classroom-return{\n  display:inline-flex;align-items:center;gap:5px;\n  flex:none;border:0;padding:7px 0;\n  color:#515e72;background:transparent;font-size:11px;font-weight:850;\n}\n.syl-classroom-v5 .syl-classroom-return:hover{color:#c32b4c}\n.syl-classroom-v5 .syl-classroom-return svg{width:17px;height:17px}\n.syl-classroom-v5 .syl-classroom-crumb{\n  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;\n  min-width:0;max-width:400px;color:#8995a4;\n}\n.syl-classroom-v5 .syl-classroom-class-tag{\n  margin-left:auto;white-space:nowrap;padding:7px 10px;\n  border-radius:8px;background:#fbeef2;color:#b9264c;\n  font-size:10px;letter-spacing:.015em;\n}\n.syl-classroom-v5 .syl-classroom-heading{\n  display:flex;align-items:end;justify-content:space-between;\n  gap:15px;margin:0 0 20px;\n}\n.syl-classroom-v5 .syl-classroom-overline{\n  display:block;color:#ca3454;\n  font:850 10px/1.4 'Plus Jakarta Sans',sans-serif;\n  letter-spacing:.13em;\n}\n.syl-classroom-v5 .syl-classroom-heading h1{\n  color:#1f2a39;margin:7px 0 5px;\n  font:850 clamp(25px,3vw,34px)/1.2 'Plus Jakarta Sans',sans-serif;\n  letter-spacing:-.055em;\n}\n.syl-classroom-v5 .syl-classroom-heading p{\n  color:#7c8798;font-size:12px;line-height:1.6;margin:0;\n}\n.syl-classroom-v5 .syl-classroom-heading-progress{\n  display:flex;flex-direction:column;align-items:flex-end;gap:3px;\n  flex:none;\n}\n.syl-classroom-v5 .syl-classroom-heading-progress strong{\n  color:#1b805f;font:850 27px/1 'Plus Jakarta Sans',sans-serif;\n}\n.syl-classroom-v5 .syl-classroom-heading-progress span{\n  color:#8591a0;font-size:10px;font-weight:750;\n}\n.syl-classroom-v5 .syl-classroom-layout{\n  display:grid;\n  grid-template-columns:minmax(0,1.76fr) minmax(260px,.79fr);\n  gap:17px;align-items:start;\n}\n.syl-classroom-v5 .syl-classroom-main{\n  display:flex;flex-direction:column;gap:15px;min-width:0;\n}\n.syl-classroom-v5 .syl-classroom-player-card{\n  background:#111923;color:#fff;\n  border:1px solid #283344;border-radius:19px;\n  overflow:hidden;\n  box-shadow:0 12px 33px rgba(17,26,39,.14);\n}\n.syl-classroom-v5 .syl-classroom-player-label{\n  display:flex;align-items:center;gap:9px;\n  min-height:43px;padding:10px 15px;\n  background:#151e2b;\n  color:#fff;font-size:11px;letter-spacing:.01em;\n}\n.syl-classroom-v5 .syl-classroom-player-label strong{\n  font-size:11px;font-weight:850;white-space:nowrap;\n}\n.syl-classroom-v5 .syl-classroom-player-label>span:last-child{\n  margin-left:auto;font-size:10px;color:#a6b3c6;\n  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;\n}\n.syl-classroom-v5 .syl-classroom-live-dot{\n  width:8px;height:8px;flex:none;\n  border-radius:50%;background:#66e3bd;\n  box-shadow:0 0 0 4px rgba(102,227,189,.13);\n}\n.syl-classroom-v5 .syl-classroom-video-ratio{\n  position:relative;width:100%;aspect-ratio:16/9;\n  overflow:hidden;background:#0a1019;\n}\n.syl-classroom-v5 .syl-classroom-video-ratio iframe{\n  display:block;position:absolute;inset:0;\n  width:100%;height:100%;border:0;background:#0a1019;\n}\n.syl-classroom-v5 .syl-classroom-video-caption{\n  display:flex;justify-content:space-between;align-items:center;gap:10px;\n  padding:11px 15px;background:#151e2b;color:#a4b1c2;\n}\n.syl-classroom-v5 .syl-classroom-video-caption>span{\n  display:inline-flex;align-items:center;gap:7px;\n  font-size:10px;font-weight:700;\n}\n.syl-classroom-v5 .syl-classroom-video-caption svg{\n  width:14px;height:14px;flex:none;\n}\n.syl-classroom-v5 .syl-classroom-video-caption a{\n  display:inline-flex;align-items:center;gap:5px;\n  color:#edf4ff;font-size:10px;font-weight:800;\n  text-decoration:none;\n}\n.syl-classroom-v5 .syl-classroom-video-caption a:hover{text-decoration:underline}\n.syl-classroom-v5 .syl-classroom-lesson-card,\n.syl-classroom-v5 .syl-classroom-sidebar,\n.syl-classroom-v5 .syl-classroom-tool-card,\n.syl-classroom-v5 .syl-classroom-notes-card{\n  background:#fff;\n  border:1px solid var(--class-line);\n  box-shadow:0 5px 21px rgba(21,33,55,.035);\n  border-radius:17px;\n  min-width:0;\n}\n.syl-classroom-v5 .syl-classroom-lesson-card{padding:20px 21px 16px}\n.syl-classroom-v5 .syl-classroom-lesson-kicker{\n  display:flex;justify-content:space-between;align-items:center;gap:9px;\n  margin-bottom:10px;\n  color:#c33253;font:850 10px/1.45 'Plus Jakarta Sans',sans-serif;\n  letter-spacing:.07em;\n}\n.syl-classroom-v5 .syl-classroom-course-level{\n  background:#f4f6f9;color:#7f8b9b;padding:6px 8px;\n  border-radius:7px;font-size:10px;letter-spacing:0;\n}\n.syl-classroom-v5 .syl-classroom-lesson-card h2{\n  color:#222b39;\n  font:850 clamp(20px,2.3vw,28px)/1.27 'Plus Jakarta Sans',sans-serif;\n  letter-spacing:-.04em;margin:0 0 7px;\n}\n.syl-classroom-v5 .syl-classroom-belongs{\n  color:#8a94a3;font-size:11px;line-height:1.65;\n  margin:0;padding-bottom:18px;\n  border-bottom:1px solid #eef0f4;\n}\n.syl-classroom-v5 .syl-classroom-belongs strong{color:#617084;font-weight:800}\n.syl-classroom-v5 .syl-classroom-lesson-actions{\n  display:flex;align-items:center;justify-content:space-between;\n  gap:12px;margin:17px 0 0;flex-wrap:wrap;\n}\n.syl-classroom-v5 .syl-classroom-study-button{\n  display:inline-flex;align-items:center;justify-content:center;gap:8px;\n  border:0;border-radius:11px;\n  background:#dc2b51;color:#fff;\n  min-height:43px;padding:10px 14px;\n  font-size:11px;font-weight:800;\n  box-shadow:0 5px 12px rgba(220,43,81,.12);\n}\n.syl-classroom-v5 .syl-classroom-study-button:hover{\n  background:#be1b40;\n}\n.syl-classroom-v5 .syl-classroom-study-button.is-finished{\n  background:#ebf9f2;color:#187653;\n  box-shadow:none;opacity:1;cursor:default;\n}\n.syl-classroom-v5 .syl-classroom-study-button svg{width:17px;height:17px}\n.syl-classroom-v5 .syl-classroom-step-buttons{\n  display:flex;align-items:center;gap:7px;flex-wrap:wrap;\n}\n.syl-classroom-v5 .syl-classroom-step-buttons button{\n  display:inline-flex;align-items:center;justify-content:center;gap:6px;\n  border:1px solid #e3e8ef;border-radius:10px;\n  background:#fff;color:#596779;\n  min-height:43px;padding:9px 12px;\n  font-size:11px;font-weight:800;\n}\n.syl-classroom-v5 .syl-classroom-step-buttons button.is-next{\n  color:#c12547;background:#fff4f6;border-color:#f2d1d9;\n}\n.syl-classroom-v5 .syl-classroom-step-buttons button:disabled{opacity:.35}\n.syl-classroom-v5 .syl-classroom-step-buttons svg{width:15px;height:15px}\n.syl-classroom-v5 .syl-classroom-study-status{\n  min-height:17px;\n  color:#8994a3;font-size:10px;line-height:1.65;\n  margin:11px 0 0;\n}\n.syl-classroom-v5 .syl-classroom-sidebar{\n  position:sticky;top:107px;overflow:hidden;\n}\n.syl-classroom-v5 .syl-classroom-sidebar-head{\n  padding:20px 18px 17px;\n  background:linear-gradient(122deg,#fff,#fdf7f9);\n  border-bottom:1px solid #eceef2;\n}\n.syl-classroom-v5 .syl-classroom-sidebar-head h2{\n  font:850 20px/1.25 'Plus Jakarta Sans',sans-serif;\n  letter-spacing:-.04em;color:#243043;margin:6px 0 6px;\n}\n.syl-classroom-v5 .syl-classroom-sidebar-head p{\n  margin:0;color:#8893a2;font-size:11px;\n}\n.syl-classroom-v5 .syl-classroom-sidebar-progress{\n  width:100%;height:7px;margin:14px 0 8px;\n  background:#eef0f4;border-radius:999px;overflow:hidden;\n}\n.syl-classroom-v5 .syl-classroom-sidebar-progress>span{\n  display:block;height:100%;border-radius:inherit;\n  background:linear-gradient(90deg,#cf2850,#ee7c95);\n}\n.syl-classroom-v5 .syl-classroom-sidebar-head>small{\n  color:#8c96a5;font-size:10px;font-weight:700;\n}\n.syl-classroom-v5 .syl-classroom-chapter-list{\n  overflow-y:auto;max-height:min(58vh,575px);\n  overscroll-behavior:contain;\n  scrollbar-width:thin;\n}\n.syl-classroom-v5 .syl-classroom-chapter{\n  display:flex;align-items:center;gap:10px;\n  width:100%;min-height:66px;padding:11px 12px;\n  text-align:left;border:0;border-bottom:1px solid #f0f1f4;\n  background:#fff;color:#475466;\n  transition:background .18s ease;\n}\n.syl-classroom-v5 .syl-classroom-chapter:last-child{border-bottom:0}\n.syl-classroom-v5 .syl-classroom-chapter:hover{background:#faf6f8}\n.syl-classroom-v5 .syl-classroom-chapter.is-current{\n  background:#fff4f6;\n  box-shadow:inset 3px 0 0 #d52a52;\n}\n.syl-classroom-v5 .syl-classroom-chapter-index{\n  display:grid;place-items:center;\n  width:31px;height:31px;flex:none;\n  border-radius:9px;\n  font:850 10px/1 'Plus Jakarta Sans',sans-serif;\n  color:#738093;background:#f1f3f6;\n}\n.syl-classroom-v5 .syl-classroom-chapter.is-current .syl-classroom-chapter-index{\n  background:#f5dce4;color:#c02a4d;\n}\n.syl-classroom-v5 .syl-classroom-chapter.is-done .syl-classroom-chapter-index{\n  background:#e7f6f0;color:#128664;\n}\n.syl-classroom-v5 .syl-classroom-chapter-index svg{width:16px;height:16px}\n.syl-classroom-v5 .syl-classroom-chapter-copy{\n  display:flex;flex-direction:column;gap:4px;\n  min-width:0;flex:1;\n}\n.syl-classroom-v5 .syl-classroom-chapter-copy strong{\n  display:-webkit-box;-webkit-line-clamp:2;\n  -webkit-box-orient:vertical;line-clamp:2;overflow:hidden;\n  color:#313b4b;\n  font:750 11px/1.45 'Plus Jakarta Sans',sans-serif;\n}\n.syl-classroom-v5 .syl-classroom-chapter-copy small{\n  color:#8b96a5;font-size:10px;\n}\n.syl-classroom-v5 .syl-classroom-chapter-active{\n  display:grid;place-items:center;flex:none;\n  color:#c52e52;\n}\n.syl-classroom-v5 .syl-classroom-chapter-active svg{width:15px;height:15px}\n.syl-classroom-v5 .syl-classroom-sidebar-foot{\n  display:flex;flex-direction:column;gap:4px;\n  border-top:1px solid #eceef2;\n  background:#f9fafc;padding:14px 17px 15px;\n}\n.syl-classroom-v5 .syl-classroom-sidebar-foot span{\n  color:#8e98a7;font-size:10px;\n}\n.syl-classroom-v5 .syl-classroom-sidebar-foot strong{\n  font-size:12px;color:#485569;font-weight:850;\n}\n.syl-classroom-v5 .syl-classroom-lower-grid{\n  display:grid;grid-template-columns:1fr 1fr;\n  gap:17px;margin-top:18px;\n}\n.syl-classroom-v5 .syl-classroom-tool-card,\n.syl-classroom-v5 .syl-classroom-notes-card{\n  padding:19px 20px 20px;\n}\n.syl-classroom-v5 .syl-classroom-section-header{\n  margin-bottom:17px;\n}\n.syl-classroom-v5 .syl-classroom-section-header h2{\n  font:850 20px/1.25 'Plus Jakarta Sans',sans-serif;\n  color:#263144;letter-spacing:-.04em;\n  margin:6px 0;\n}\n.syl-classroom-v5 .syl-classroom-section-header p{\n  font-size:11px;line-height:1.6;color:#8591a0;margin:0;\n}\n.syl-classroom-v5 .syl-classroom-tool-links{\n  display:flex;flex-direction:column;gap:9px;\n}\n.syl-classroom-v5 .syl-classroom-tool-links button{\n  display:flex;align-items:center;gap:12px;\n  width:100%;min-height:66px;\n  border:1px solid #edf0f4;border-radius:12px;\n  padding:11px 12px;\n  background:#fafbfc;color:#475568;text-align:left;\n}\n.syl-classroom-v5 .syl-classroom-tool-links button:hover{\n  background:#fff5f7;border-color:#f3d5dc;\n}\n.syl-classroom-v5 .syl-classroom-tool-icon{\n  display:grid;place-items:center;\n  flex:none;width:39px;height:39px;\n  border-radius:11px;background:#fbe7ed;color:#c43356;\n}\n.syl-classroom-v5 .syl-classroom-tool-icon svg{width:19px;height:19px}\n.syl-classroom-v5 .syl-classroom-tool-links button>span:nth-child(2){\n  display:flex;flex-direction:column;gap:3px;flex:1;min-width:0;\n}\n.syl-classroom-v5 .syl-classroom-tool-links button strong{\n  color:#2b3746;font-size:12px;font-weight:800;\n}\n.syl-classroom-v5 .syl-classroom-tool-links button small{\n  color:#8996a4;font-size:10px;\n}\n.syl-classroom-v5 .syl-classroom-tool-links button>svg:last-child{\n  width:16px;height:16px;color:#bf3252;\n}\n.syl-classroom-v5 .syl-classroom-notes-card label{\n  display:block;margin:2px 0 9px;\n  color:#49586b;font-size:11px;font-weight:800;\n}\n.syl-classroom-v5 .syl-classroom-notes-card textarea{\n  display:block;width:100%;min-height:162px;\n  resize:vertical;border:1px solid #e5eaf0;\n  border-radius:12px;outline:none;background:#fafbfc;\n  color:#253143;font-size:12px;line-height:1.65;\n  padding:13px 14px;\n}\n.syl-classroom-v5 .syl-classroom-notes-card textarea:focus{\n  border-color:#d6335c;box-shadow:0 0 0 3px rgba(214,51,92,.09);\n}\n.syl-classroom-v5 .syl-classroom-notes-bottom{\n  display:flex;align-items:center;justify-content:space-between;\n  gap:10px;margin-top:11px;\n}\n.syl-classroom-v5 .syl-classroom-notes-bottom small{\n  font-size:10px;color:#8d99a7;\n}\n.syl-classroom-v5 .syl-classroom-notes-bottom button{\n  display:inline-flex;align-items:center;justify-content:center;gap:6px;\n  min-height:40px;padding:9px 13px;\n  border:0;border-radius:10px;\n  background:#202f42;color:#fff;\n  font-size:11px;font-weight:800;\n}\n.syl-classroom-v5 .syl-classroom-notes-bottom button svg{width:15px;height:15px}\n.syl-classroom-v5 .syl-classroom-disclaimer{\n  margin:16px 1px 0;\n  font-size:10px;line-height:1.65;color:#929baa;\n}\n.syl-classroom-v5 button:focus-visible,\n.syl-classroom-v5 a:focus-visible{\n  outline:3px solid #dc3e64;outline-offset:2px;\n}\n@media(max-width:1000px){\n  .syl-classroom-v5 .syl-classroom-layout{\n    grid-template-columns:minmax(0,1.55fr) minmax(245px,.85fr);\n    gap:13px;\n  }\n  .syl-classroom-v5 .syl-classroom-lower-grid{gap:13px}\n}\n@media(max-width:760px){\n  .syl-classroom-v5 .syl-classroom-layout{grid-template-columns:1fr}\n  .syl-classroom-v5 .syl-classroom-sidebar{position:static;top:auto}\n  .syl-classroom-v5 .syl-classroom-chapter-list{max-height:none;overflow:visible}\n  .syl-classroom-v5 .syl-classroom-sidebar-head{padding:16px 16px 14px}\n  .syl-classroom-v5 .syl-classroom-lower-grid{grid-template-columns:1fr}\n}\n@media(max-width:640px){\n  .syl-classroom-v5{padding:10px 0 34px}\n  .syl-classroom-v5 .syl-classroom-topline{margin-bottom:13px;gap:7px}\n  .syl-classroom-v5 .syl-classroom-return{font-size:10px}\n  .syl-classroom-v5 .syl-classroom-crumb{font-size:10px}\n  .syl-classroom-v5 .syl-classroom-class-tag{display:none}\n  .syl-classroom-v5 .syl-classroom-heading{margin-bottom:14px;align-items:center}\n  .syl-classroom-v5 .syl-classroom-heading h1{font-size:23px;line-height:1.22}\n  .syl-classroom-v5 .syl-classroom-heading p{font-size:11px}\n  .syl-classroom-v5 .syl-classroom-heading-progress strong{font-size:20px}\n  .syl-classroom-v5 .syl-classroom-heading-progress span{font-size:9px}\n  .syl-classroom-v5 .syl-classroom-main{gap:12px}\n  .syl-classroom-v5 .syl-classroom-player-card{border-radius:14px}\n  .syl-classroom-v5 .syl-classroom-player-label{padding:8px 10px;min-height:37px}\n  .syl-classroom-v5 .syl-classroom-player-label strong{font-size:10px}\n  .syl-classroom-v5 .syl-classroom-player-label>span:last-child{font-size:9px}\n  .syl-classroom-v5 .syl-classroom-video-caption{padding:10px 11px;gap:7px}\n  .syl-classroom-v5 .syl-classroom-video-caption>span,\n  .syl-classroom-v5 .syl-classroom-video-caption a{font-size:9px}\n  .syl-classroom-v5 .syl-classroom-lesson-card{padding:16px 13px 14px;border-radius:14px}\n  .syl-classroom-v5 .syl-classroom-lesson-card h2{font-size:20px}\n  .syl-classroom-v5 .syl-classroom-lesson-actions{gap:10px}\n  .syl-classroom-v5 .syl-classroom-study-button{width:100%;min-height:44px}\n  .syl-classroom-v5 .syl-classroom-step-buttons{width:100%}\n  .syl-classroom-v5 .syl-classroom-step-buttons button{flex:1;min-width:0}\n  .syl-classroom-v5 .syl-classroom-sidebar{border-radius:14px}\n  .syl-classroom-v5 .syl-classroom-sidebar-head h2{font-size:18px}\n  .syl-classroom-v5 .syl-classroom-chapter{min-height:62px}\n  .syl-classroom-v5 .syl-classroom-tool-card,\n  .syl-classroom-v5 .syl-classroom-notes-card{padding:17px 15px;border-radius:14px}\n  .syl-classroom-v5 .syl-classroom-section-header h2{font-size:18px}\n}\n@media(prefers-reduced-motion:reduce){\n  .syl-classroom-v5 .syl-classroom-study-button,\n  .syl-classroom-v5 .syl-classroom-chapter,\n  .syl-classroom-v5 .syl-classroom-tool-links button{transition:none!important}\n}\n";
const lessonNoteKey=(id,index)=>'sylution_yt-note-'+String(id||'')+'-'+Math.max(0,Number(index)||0);
const lessonNote=(id,index)=>{try{return String(localStorage.getItem(lessonNoteKey(id,index))||'').slice(0,6000)}catch(e){return ''}};
/* Immersive, edge-to-edge watch experience. Entire viewport rotates together in portrait.
   No rotated iframe, duplicated navbar, in-player fake YouTube controls, or sidebar. */
function watch(){
 const c=V.state.selected,l=V.currentLesson();
 if(!c||!l)return course();
 if(!V.validVideo(l.id))return '<section class="screen syl-immersive-error"><h1>Video unavailable</h1><button type="button" class="btn btn-primary" data-action="yt-back">Back to course</button></section>';
 const lessons=V.lessons(),index=Math.max(0,V.state.lesson),seconds=Math.max(0,Math.floor(Number(l.seconds)||0));
 const src='https://www.youtube.com/embed/'+l.id+'?start='+seconds+'&playsinline=1&rel=0&controls=1&fs=1';
 const original='https://www.youtube.com/watch?v='+l.id+(seconds?'&t='+seconds+'s':'');
 const marked=Array.isArray(V.state.courseProgress[c.type+':'+c.id])?V.state.courseProgress[c.type+':'+c.id]:[];
 const completed=marked.includes(index),percentage=Math.max(0,Math.min(100,V.progress(c)||0));
 const notes=lessonNote(c.id,index);
 const chapterButtons=lessons.map((row,i)=>{
  const active=i===index,done=marked.includes(i);
  return '<button type="button" class="syl-immersive-chapter'+(active?' is-active':'')+'" data-action="yt-lesson" data-index="'+i+'" '+(active?'aria-current="step"':'')+'>'+
   '<span class="syl-immersive-chapter-number">'+(done?icon('check'):String(i+1).padStart(2,'0'))+'</span>'+
   '<span class="syl-immersive-chapter-info"><strong>'+esc(row.title)+'</strong><small>'+(c.type==='video'?timecode(row.seconds):'Lesson '+(i+1))+(done?' · Studied':'')+'</small></span>'+
   (active?'<span class="syl-immersive-chapter-playing">'+icon('play')+'</span>':'')+'</button>';
 }).join('');
 return '<section class="screen syl-immersive-page" aria-label="SYLearn video lesson">'+
  '<div class="syl-immersive-view" id="syl-immersive-view">'+
   '<div class="syl-immersive-player" id="syl-video-fullscreen"><iframe id="yt-lesson-frame" src="'+src+'" title="'+esc(l.title)+' — '+esc(c.creator)+'" loading="eager" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>'+
   '<header class="syl-immersive-topbar"><button type="button" class="syl-immersive-iconbtn" data-action="yt-back" aria-label="Back to course">'+icon('back')+'</button>'+
    '<div class="syl-immersive-identity"><strong>SYLearn <span>CLASSROOM</span></strong><small>Lesson '+(index+1)+' / '+lessons.length+' · '+esc(l.title)+'</small></div>'+
    '<button type="button" class="syl-immersive-top-action" data-action="yt-panel" data-panel="chapters" aria-controls="syl-immersive-drawer" aria-expanded="false">'+icon('book')+' Chapters</button></header>'+
   '<nav class="syl-immersive-dock" aria-label="Lesson controls">'+
    '<button type="button" data-action="yt-prev" '+(index===0?'disabled':'')+' aria-label="Previous chapter">'+icon('back')+'<span>Prev</span></button>'+
    '<button type="button" data-action="yt-complete" class="syl-immersive-complete'+(completed?' is-done':'')+'" '+(completed?'disabled':'')+' aria-label="'+(completed?'Chapter marked studied':'Mark this chapter studied')+'">'+icon('check')+'<span>'+(completed?'Studied':'Mark studied')+'</span></button>'+
    '<button type="button" data-action="yt-next" '+(index===lessons.length-1?'disabled':'')+' aria-label="Next chapter"><span>Next</span>'+icon('arrow')+'</button>'+
    '<button type="button" data-action="yt-panel" data-panel="notes" aria-controls="syl-immersive-drawer" aria-expanded="false" aria-label="Open study notes">'+icon('file')+'<span>Notes</span></button>'+
    '<button type="button" data-action="yt-panel" data-panel="options" aria-controls="syl-immersive-drawer" aria-expanded="false" aria-label="More video options">'+icon('more')+'</button>'+
   '</nav>'+
   '<button class="syl-immersive-backdrop" id="syl-immersive-backdrop" type="button" data-action="yt-panel-close" aria-label="Close learning panel" hidden></button>'+
   '<aside class="syl-immersive-drawer" id="syl-immersive-drawer" aria-hidden="true" aria-label="Learning panel">'+
    '<div class="syl-immersive-drawer-head"><div><small>SYLearn · Learning space</small><h2 id="syl-immersive-drawer-title">Course chapters</h2></div><button type="button" data-action="yt-panel-close" aria-label="Close panel">'+icon('close')+'</button></div>'+
    '<div class="syl-immersive-panel syl-panel-chapters" data-content="chapters"><p class="syl-immersive-hint">'+lessons.length+' chapters · '+percentage+'% marked studied</p><div class="syl-immersive-progress"><span style="width:'+percentage+'%"></span></div><div class="syl-immersive-chapter-list">'+chapterButtons+'</div><p class="syl-immersive-credit">Original educator: '+esc(c.creator)+'</p></div>'+
    '<div class="syl-immersive-panel syl-panel-notes" data-content="notes" hidden><label for="syl-lesson-note">Your notes for this chapter</label><textarea id="syl-lesson-note" maxlength="6000" placeholder="Write useful ideas or examples from this lesson...">'+esc(notes)+'</textarea><p class="syl-immersive-hint">Notes are stored on this device.</p><button type="button" class="syl-immersive-save" data-action="yt-note-save">'+icon('check')+' Save notes</button></div>'+
    '<div class="syl-immersive-panel syl-panel-options" data-content="options" hidden><p class="syl-immersive-hint">Choose how you want to watch.</p>'+
      '<button type="button" class="syl-immersive-option" data-action="yt-fit-view">'+icon('laptop')+' Switch landscape / portrait fit</button>'+
      '<button type="button" class="syl-immersive-option" data-action="yt-retry-player">'+icon('repeat')+' Retry official video player</button>'+
      '<a class="syl-immersive-option" href="'+original+'" target="_blank" rel="noopener noreferrer">'+icon('arrow')+' Watch original on YouTube</a>'+
      '<button type="button" class="syl-immersive-option" data-action="yt-native-fullscreen">'+icon('play')+' Request device fullscreen</button>'+
     '</div>'+
   '</aside>'+
  '</div></section>';
}

let telegramFullscreenOwned=false;
function telegramLessonFullscreen(){
 try{
  const tg=window.Telegram?.WebApp;
  if(tg&&typeof tg.requestFullscreen==='function'&&!telegramFullscreenOwned){
   tg.requestFullscreen();telegramFullscreenOwned=true;
  }
 }catch(e){}
}
function exitTelegramLessonFullscreen(){
 if(!telegramFullscreenOwned)return;
 telegramFullscreenOwned=false;
 try{window.Telegram?.WebApp?.exitFullscreen?.()}catch(e){}
}
function closeImmersivePanel(){
 const view=document.getElementById('syl-immersive-view');
 if(!view)return;
 view.classList.remove('syl-panel-open');
 const drawer=document.getElementById('syl-immersive-drawer');
 if(drawer)drawer.setAttribute('aria-hidden','true');
 const shade=document.getElementById('syl-immersive-backdrop');
 if(shade)shade.hidden=true;
 view.querySelectorAll('[aria-controls="syl-immersive-drawer"]').forEach(b=>b.setAttribute('aria-expanded','false'));
}
function action(name,data,tools){
if(name==='yt-save'){const yes=V.toggleSaved(data.id);tools.render();tools.toast(yes?'Saved to your learning list.':'Removed from saved.');return true}
if(name==='yt-filter'){V.state.category=String(data.value||'All');tools.render();return true}
if(name==='yt-sort'){V.state.sort=['featured','az','beginner','saved'].includes(data.value)?data.value:'featured';tools.render();return true}
if(name==='yt-open'){open(data.id,tools.nav,tools.render,tools.toast);return true}
if(name==='yt-start'){const c=V.state.selected;if(!c)return true;telegramLessonFullscreen();const ls=V.lessons();const rows=V.state.courseProgress[c.type+':'+c.id]||[];const next=ls.findIndex((_,i)=>!rows.includes(i));V.setLesson(next<0?0:next);tools.nav('ytwatch',c.id);return true}
if(name==='yt-share'){
 const c=V.state.selected;if(!c)return true;
 const url=location.href,title='SYLearn: '+c.title;
 if(navigator.share){navigator.share({title,url}).catch(()=>{});}
 else if(navigator.clipboard?.writeText){navigator.clipboard.writeText(url).then(()=>tools.toast('Course link copied.')).catch(()=>tools.toast('Use the browser share menu to share this course.'));}
 else tools.toast('Use the browser share menu to share this course.');
 return true
}
if(name==='yt-lesson'){telegramLessonFullscreen();V.setLesson(Number(data.index));tools.nav('ytwatch',V.state.selected.id);return true}
if(name==='yt-back'){try{if(document.fullscreenElement)document.exitFullscreen?.().catch?.(()=>{})}catch(e){}exitTelegramLessonFullscreen();tools.nav('ytcourse',V.state.selected.id);return true}
if(name==='yt-note-save'){
 const c=V.state.selected;if(!c)return true;
 const field=document.getElementById('syl-lesson-note');if(!field)return true;
 try{localStorage.setItem(lessonNoteKey(c.id,V.state.lesson),String(field.value||'').slice(0,6000));tools.toast('Lesson notes saved on this device.');}
 catch(e){tools.toast('Could not save notes on this device.');}
 return true
}
if(name==='yt-retry-player'){
 const frame=document.getElementById('yt-lesson-frame'),c=V.state.selected,lesson=V.currentLesson();
 if(!frame||!c||!lesson)return true;
 const secs=Math.max(0,Math.floor(Number(lesson.seconds)||0));
 const current=String(frame.getAttribute('src')||'');
 // Alternate between the two official YouTube embed domains when an embedded player is blocked.
 const host=current.includes('youtube-nocookie.com')?'www.youtube.com':'www.youtube-nocookie.com';
 const newUrl='https://'+host+'/embed/'+lesson.id+'?start='+secs+'&playsinline=1&rel=0&controls=1&fs=1';
 frame.setAttribute('src',newUrl);
 tools.toast('Reloading video. If playback is blocked here, use Watch original.');
 return true
}
if(name==='yt-panel'){
 const view=document.getElementById('syl-immersive-view');
 const drawer=document.getElementById('syl-immersive-drawer');
 if(!view||!drawer)return true;
 const requested=['chapters','notes','options'].includes(data.panel)?data.panel:'chapters';
 const active=view.classList.contains('syl-panel-open')&&view.dataset.activePanel===requested;
 if(active){closeImmersivePanel();return true;}
 view.dataset.activePanel=requested;
 view.querySelectorAll('.syl-immersive-panel').forEach(el=>{el.hidden=el.dataset.content!==requested});
 const h=document.getElementById('syl-immersive-drawer-title');
 if(h)h.textContent=({chapters:'Course chapters',notes:'Study notes',options:'Player options'})[requested];
 drawer.setAttribute('aria-hidden','false');
 const shade=document.getElementById('syl-immersive-backdrop');
 if(shade)shade.hidden=false;
 view.querySelectorAll('[aria-controls="syl-immersive-drawer"]').forEach(b=>b.setAttribute('aria-expanded',String(b.dataset.panel===requested)));
 view.classList.add('syl-panel-open');
 return true
}
if(name==='yt-panel-close'){closeImmersivePanel();return true}
if(name==='yt-prev'||name==='yt-next'){
 const n=V.lessons().length;
 const next=V.state.lesson+(name==='yt-prev'?-1:1);
 if(n&&next>=0&&next<n){V.setLesson(next);tools.nav('ytwatch',V.state.selected.id)}
 return true
}
if(name==='yt-fit-view'){
 document.getElementById('syl-immersive-view')?.classList.toggle('syl-immersive-fit');
 closeImmersivePanel();
 return true
}
if(name==='yt-native-fullscreen'){
 const shell=document.getElementById('syl-immersive-view');
 if(!shell)return true;
 const enter=shell.requestFullscreen||shell.webkitRequestFullscreen;
 if(typeof enter==='function'){
  try{
   const promise=enter.call(shell);
   Promise.resolve(promise).then(()=>{
    if(screen.orientation?.lock) return Promise.resolve(screen.orientation.lock('landscape')).catch(()=>{});
   }).catch(()=>tools.toast('Device fullscreen is restricted here; immersive video mode is still available.'));
  }catch(e){tools.toast('Your browser blocked native fullscreen; immersive mode is already active.')}
 }else tools.toast('Immersive view already fills this app. Native fullscreen is restricted on this device.');
 closeImmersivePanel();
 return true
}
if(name==='yt-complete'){
 const progress=V.finish();
 // Never rerender a playing iframe just because the learner marked a chapter studied.
 const button=document.querySelector('.syl-immersive-complete');
 if(button){button.disabled=true;button.classList.add('is-done');button.setAttribute('aria-label','Chapter marked studied');button.innerHTML=icon('check')+'<span>Studied</span>';}
 const current=document.querySelector('.syl-immersive-chapter.is-active');
 if(current){
  const index=current.querySelector('.syl-immersive-chapter-number');
  if(index)index.innerHTML=icon('check');
  current.querySelector('.syl-immersive-chapter-info small')?.append(' · Studied');
 }
 const bar=document.querySelector('.syl-immersive-progress span');
 if(bar)bar.style.width=progress+'%';
 const hint=document.querySelector('.syl-panel-chapters .syl-immersive-hint');
 if(hint)hint.textContent=V.lessons().length+' chapters · '+progress+'% marked studied';
 return true
}
if(name==='yt-reset'){V.state.items=V.curated.slice();V.state.status='curated';V.state.query='';V.state.category='All';V.state.sort='featured';V.state.kind='video';V.state.message='Explore available courses.';tools.render();return true}
return false
}
// Escape closes the drawer; exiting native fullscreen does not discard the lesson.
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeImmersivePanel()});
window.addEventListener('hashchange',()=>{if(!location.hash.startsWith('#/ytwatch'))exitTelegramLessonFullscreen()});
// Startup-critical course handlers. Define these before exporting the UI object.
function startSearch(form,onDone){
 let query='';
 try{query=String(new FormData(form).get('query')||'').trim().slice(0,80)}catch(e){
   query=String(form?.querySelector?.('[name="query"]')?.value||'').trim().slice(0,80);
 }
 const normalized=query.toLocaleLowerCase();
 V.state.query=query.length>=2?query:'';
 V.state.items=V.state.query?V.curated.filter(c=>
   [c.title,c.category,c.description,c.creator,c.level].some(v=>String(v||'').toLocaleLowerCase().includes(normalized))
 ):V.curated.slice();
 V.state.category='All';
 V.state.sort='featured';
 V.state.status='curated';
 V.state.kind='video';
 V.state.message=V.state.items.length?'Explore available courses.':'No matching courses. Try a different skill.';
 if(typeof onDone==='function')onDone();
 return Promise.resolve(V.state);
}
function open(id,nav,render,toast){
 if(!V.select(String(id||''))){
   if(typeof toast==='function')toast('This course is unavailable.');
   return false;
 }
 const selected=V.state.selected;
 if(typeof nav==='function')nav('ytcourse',selected.id);
 if(selected.type==='playlist'){
   V.getLessons().then(()=>{if(V.state.selected?.id===selected.id&&typeof render==='function')render()}).catch(()=>{});
 }
 return true;
}
window.SYLUTION_VIDEO_UI={library,course,watch,card,action,startSearch,open};
})();