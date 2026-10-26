(function sylutionApp(){
'use strict';
const root=document.getElementById('app');
const VIDEO=window.SYLUTION_VIDEO,VIDEO_UI=window.SYLUTION_VIDEO_UI;
const ASSESS=window.SYLUTION_ASSESS,ASSESS_UI=window.SYLUTION_ASSESS_UI;
window.SYLUTION_PROFILE=()=>state.user;
const I={
home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
book:'<path d="M12 7v14"/><path d="M3 18V5a2 2 0 0 1 2-2h3a4 4 0 0 1 4 4 4 4 0 0 1 4-4h3a2 2 0 0 1 2 2v13a1 1 0 0 1-1 1h-4a4 4 0 0 0-4 2 4 4 0 0 0-4-2H4a1 1 0 0 1-1-1z"/>',
brain:'<rect x="3" y="7" width="18" height="14" rx="5"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/><path d="M12 3v4m-3 11h6m-9-8H3m18 0h-3"/>',
chart:'<path d="M5 20v-5m7 5V9m7 11V4"/>',
user:'<circle cx="12" cy="7" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
search:'<circle cx="10.8" cy="10.8" r="7"/><path d="m16 16 5 5"/>',
sliders:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2"/><circle cx="15" cy="17" r="2"/>',
globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
cap:'<path d="m2 9 10-5 10 5-10 5L2 9zm4 3v5c3 3 9 3 12 0v-5m4-3v7"/>',
laptop:'<rect x="5" y="4" width="14" height="12" rx="1"/><path d="M2 20h20l-3-4H5l-3 4z"/>',
file:'<path d="M6 2h8l4 4v16H6zM14 2v5h5M9 12h6m-6 4h6"/>',
radio:'<path d="M12 18a6 6 0 1 0 0-12m0 16a10 10 0 1 0 0-20"/><circle cx="12" cy="12" r="2"/>',
arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
back:'<path d="m15 18-6-6 6-6"/>',
play:'<path d="m7 4 13 8-13 8z"/>',
pause:'<path d="M7 4v16m10-16v16"/>',
heart:'<path d="M20.8 8.6c0 5-8.8 11-8.8 11s-8.8-6-8.8-11A5.3 5.3 0 0 1 12 5a5.3 5.3 0 0 1 8.8 3.6z"/>',
bookmark:'<path d="M6 3h12v18l-6-4-6 4V3z"/>',
star:'<path d="m12 2 3 6 7 .9-5 5 .9 7.1L12 18l-5.9 3 .9-7.1-5-5L9 8z"/>',
users:'<circle cx="9" cy="8" r="3"/><path d="M2 21v-2a7 7 0 0 1 14 0v2M17 6a3 3 0 0 1 0 6m1 5a5 5 0 0 1 4 4"/>',
clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
check:'<path d="m4 12 5 5L20 6"/>',
trophy:'<path d="M7 3h10v7a5 5 0 0 1-10 0V3zM7 5H3v3a4 4 0 0 0 4 4m10-7h4v3a4 4 0 0 1-4 4m-5 3v4m-5 2h10"/>',
flame:'<path d="M12 22c-5 0-8-4-8-8 0-4 4-8 6-11 0 6 5 6 5 10 2-1 3-3 3-5 4 6 3 14-6 14z"/>',
mic:'<rect x="9" y="2" width="6" height="13" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4m-4 0h8"/>',
send:'<path d="m22 2-7 20-4-9-9-4zM22 2 11 13"/>',
download:'<path d="M12 2v14m-5-5 5 5 5-5M4 18v3h16v-3"/>',
settings:'<circle cx="12" cy="12" r="3"/><path d="M4 9V7l3-3 2 1 3-2 3 2 2-1 3 3v2l2 3-2 3v2l-3 3-2-1-3 2-3-2-2 1-3-3v-2l-2-3z"/>',
award:'<circle cx="12" cy="9" r="6"/><path d="m8 14-2 8 6-3 6 3-2-8"/>',
filter:'<path d="M4 7h16M7 12h10m-7 5h4"/>',
spark:'<path d="m12 2 2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z"/>',
lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
card:'<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/>',
info:'<circle cx="12" cy="12" r="10"/><path d="M12 11v6m0-10v1"/>',
help:'<circle cx="12" cy="12" r="10"/><path d="M9 9a3 3 0 1 1 5 3c-2 1-2 2-2 3m0 3v1"/>',
menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
close:'<path d="M5 5 19 19M19 5 5 19"/>',
repeat:'<path d="M20 11V6l-3 3a8 8 0 1 0 2 8M4 13v5l3-3"/>',
translate:'<path d="M4 5h12M10 2v3m3 0c0 7-4 11-9 14m2-10c1 3 4 6 7 8m2 3 4-11 4 11m-6-4h4"/>',
headphones:'<path d="M3 14v-3a9 9 0 0 1 18 0v3M3 14h4v7H5a2 2 0 0 1-2-2zm18 0h-4v7h2a2 2 0 0 0 2-2z"/>',
logout:'<path d="M9 3H4v18h5m3-5 4-4-4-4m4 4H7"/>',
edit:'<path d="m3 21 4-1 13-13-3-3L4 17l-1 4z"/>',
calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6m10-6v6M3 10h18"/>',
camera:'<path d="M4 6h4l2-3h4l2 3h4a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/><circle cx="12" cy="13" r="4"/>',
flag:'<path d="M5 22V3m0 1c5-3 9 3 15 0v11c-6 3-10-3-15 0"/>',
volume:'<path d="M4 9h4l5-4v14l-5-4H4zM16 9a5 5 0 0 1 0 6m3-9a9 9 0 0 1 0 12"/>',
more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>'
};
const ico=(name,size)=>'<svg aria-hidden="true" viewBox="0 0 24 24" width="'+(size||20)+'" height="'+(size||20)+'" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round">'+(I[name]||I.book)+'</svg>';
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const PHOTOS={
hero:'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=85',
english:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
arabic:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80',
python:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
jamb:'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80',
design:'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=900&q=80',
excel:'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80',
french:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80',
spanish:'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=900&q=80',
hausa:'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80',
science:'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80',
business:'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80',
video:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1300&q=85',
face:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=85'
};
const COURSES=[
{id:'python',title:'Python for Everyone',short:'Python',desc:'Learn programming with Python from scratch.',cat:'Digital Skills',level:'Beginner',price:0,image:PHOTOS.python,lessons:18,mins:240,teacher:'SYLUTION Tech School',highlights:['Variables and data types','Loops and functions','Hands-on exercises','Build a small project']},
{id:'design',title:'Graphic Design Fundamentals',short:'Graphic Design',desc:'Learn visual design principles and creative tools.',cat:'Digital Skills',level:'Beginner',price:0,image:PHOTOS.design,lessons:15,mins:220,teacher:'SYLUTION Creative School',highlights:['Color and typography','Layouts and hierarchy','Social media design','Portfolio project']},
{id:'excel',title:'Excel for Everyone',short:'Excel',desc:'Master practical Excel skills for work and study.',cat:'Digital Skills',level:'Beginner',price:0,image:PHOTOS.excel,lessons:14,mins:200,teacher:'SYLUTION Tech School',highlights:['Formulas and functions','Sorting and filtering','Visual charts','Business spreadsheets']},
{id:'business',title:'Entrepreneurship Basics',short:'Business',desc:'Learn to validate ideas and start a sustainable business.',cat:'Business',level:'Beginner',price:0,image:PHOTOS.business,lessons:10,mins:160,teacher:'SYLUTION Business School',highlights:['Business ideas','Customers and markets','Simple budgets','Go-to-market basics']},
{id:'robotics',title:'Robotics and IoT',short:'Robotics',desc:'Start building practical electronics and smart devices.',cat:'Engineering',level:'Intermediate',price:0,image:PHOTOS.python,lessons:14,mins:260,teacher:'SYLUTION Engineering',highlights:['Sensors and microcontrollers','ESP32 basics','Practical projects','IoT dashboards']}
];
const QUESTIONS=[
{q:'Which word is closest in meaning to “benevolent”?',o:['Cruel','Kind','Selfish','Hostile'],a:1,why:'Benevolent means kind and willing to help others.'},
{q:'Which word is the opposite of “scarce”?',o:['Rare','Limited','Abundant','Missing'],a:2,why:'Abundant means plentiful, the opposite of scarce.'},
{q:'Choose the correct sentence.',o:['She go to school.','She going to school.','She goes to school.','She gone to school.'],a:2,why:'The singular third-person present tense form is “goes”.'},
{q:'What is 15% of 200?',o:['15','25','30','35'],a:2,why:'0.15 × 200 = 30.'},
{q:'Which organ pumps blood around the body?',o:['Lungs','Heart','Kidney','Liver'],a:1,why:'The heart pumps blood through the circulatory system.'},
{q:'What is the next number: 2, 4, 8, 16, ...?',o:['18','24','30','32'],a:3,why:'Each number is doubled, so 16 × 2 = 32.'},
{q:'Which is a renewable energy source?',o:['Coal','Petrol','Solar','Diesel'],a:2,why:'Solar energy can be replenished by sunlight.'},
{q:'Which punctuation mark ends a question?',o:['Comma','Full stop','Question mark','Colon'],a:2,why:'A question mark (?) marks a direct question.'}
];
const read=(k,d)=>{try{const x=localStorage.getItem('sylution_'+k);return x?JSON.parse(x):d}catch(e){return d}};
const save=(k,v)=>{try{localStorage.setItem('sylution_'+k,JSON.stringify(v))}catch(e){}};
const state={page:'home',category:'All',search:'',sort:'popular',courseId:'python',heroIndex:0,detailTab:'overview',lessonTab:'notes',saved:read('saved',[]),enrolled:read('enrolled',[]),completed:read('completed',{}),user:read('user',{name:'Learner',preferred:'Hausa'}),chat:read('chat',[{from:'ai',text:'Hi there! 👋 I’m your SYLearn AI Tutor preview. Ask about Python, design, robotics or digital skills. You can ask me to explain in Hausa!'}]),quizIndex:0,answers:{},quizEnds:0,quizSubmitted:false,quizResult:0,modal:null,lessonPlaying:false,liveTab:'upcoming',liveSaved:read('liveSaved',[]),drafts:read('drafts',[]),toastTimer:null};
const money=n=>n?'₦'+n.toLocaleString('en-NG'):'Free';
const course=id=>COURSES.find(c=>c.id===id)||COURSES[0];
const ct=id=>state.completed[id]||0;
const countCompleted=()=>Object.values(state.completed).filter(n=>n>=100).length;
const nav=(page,arg)=>{state.page=page;if(arg){if(['ytcourse','ytwatch','ytassessment','ytcompletion'].includes(page)&&VIDEO.state.selected?.id!==arg)VIDEO.select(arg)}state.modal=null;state.lessonPlaying=false;const hash='#/'+page+(arg?'/'+arg:'');if(location.hash!==hash)history.pushState(null,'',hash);render();window.scrollTo({top:0,behavior:'auto'})};
const toast=message=>{document.querySelector('.toast')?.remove();const el=document.createElement('div');el.className='toast';el.setAttribute('role','status');el.textContent=message;document.body.appendChild(el);clearTimeout(state.toastTimer);state.toastTimer=setTimeout(()=>el.remove(),3300)};
const badge=(text,cl)=>'<span class="badge '+(cl||'')+'">'+esc(text)+'</span>';
const heading=(title,link,pg)=>'<div class="section-head"><h2>'+title+'</h2>'+(link?'<button class="link" data-go="'+pg+'">'+link+' '+ico('arrow')+'</button>':'')+'</div>';
const img=(src,alt)=>'<img src="'+esc(src)+'" alt="'+esc(alt)+'" loading="lazy" onerror="this.style.opacity=0"/>';


const thumb=(c,klass)=>'<div class="thumb '+(klass||'')+'">'+img(c.image,c.title)+'<span class="thumb-overlay"></span><span class="course-art-title">'+esc(c.short)+'</span><span class="thumb-label">'+esc(c.level)+'</span></div>';
const favButton=id=>'<button class="favorite '+(state.saved.includes(id)?'saved':'')+'" aria-label="'+(state.saved.includes(id)?'Unsave course':'Save course')+'" data-action="favorite" data-id="'+id+'">'+ico('bookmark')+'</button>';
const card=c=>'<article class="course-card '+classForCategory(c.cat)+'"><div class="course-image-wrap"><button class="course-image-button" data-go="detail" data-id="'+c.id+'" aria-label="Open '+esc(c.title)+'">'+thumb(c,'')+'</button>'+favButton(c.id)+'</div><div class="course-card-content"><span class="card-eyebrow">'+esc(c.cat)+' <span>·</span> '+esc(c.level)+'</span><button class="course-title" data-go="detail" data-id="'+c.id+'">'+esc(c.title)+'</button><p>'+esc(c.desc)+'</p><div class="course-card-bottom"><span class="syl-tech-guided">'+ico('book',14)+' Guided practice</span><span class="syl-tech-practice-label">Explore</span></div></div></article>';
const classForCategory=name=>({'Languages':'accent-teal','Academics':'accent-blue','Digital Skills':'accent-purple','Exams':'accent-blue','Live Classes':'accent-red','Business':'accent-gold','Engineering':'accent-blue','All':'accent-neutral'})[name]||'accent-neutral';
const catData=[['Digital Skills','laptop'],['Engineering','settings'],['Business','users']];
const categories=(active,go)=>'<div class="category-strip">'+(state.page==='courses'?[['All','menu'],...catData,['Business','users'],['Engineering','settings']]:catData).map(([name,icon])=>'<button class="category '+classForCategory(name)+' '+(active===name?'active':'')+'" data-action="category" data-value="'+name+'" data-target="'+go+'"><span class="category-circle">'+ico(icon)+'</span><span class="category-name">'+esc(name)+'</span></button>').join('')+'</div>';
const hero=(headline,emph,subtitle,action,photo)=>'<div class="hero elegant-hero"><div class="hero-content"><span class="hero-eyebrow">SYLUTION LEARN</span><h1>'+headline+'<br><span class="red">'+emph+'</span></h1><p>'+subtitle+'</p><button class="btn btn-primary" data-go="'+(action==='Languages'?'languages':'courses')+'">Explore '+action+' '+ico('arrow')+'</button></div>'+img(photo||PHOTOS.hero,'Learning at SYLUTION').replace('<img','<img class="hero-photo"')+'</div>';


const header=()=>{
 const page=state.page;
 const isCourse=['courses','ytlibrary','ytcourse','ytwatch','ytassessment','ytcompletion','saved'].includes(page);
 return "<header class='topbar syl-topbar elite-topbar'><div class='container topbar-inner elite-topbar-row'>"+
  "<button type='button' class='elite-brand' data-go='home' aria-label='SYLearn home'><img class='elite-brand-icon' src='./icon.svg' alt='' /><span class='elite-brand-copy'><strong><span>SY</span>Learn</strong><small>Digital Skills Academy</small></span></button>"+
  "<nav class='elite-desktop-nav' aria-label='Main navigation'>"+
  [['home','Home'],['courses','Courses'],['live','Live'],['progress','Learning'],['profile','Profile']].map(([pg,label])=>"<button type='button' class='"+(page===pg||(pg==='courses'&&isCourse)?'is-active':'')+"' data-go='"+pg+"'>"+label+"</button>").join('')+"</nav>"+
  "<div class='elite-header-actions'><button type='button' class='elite-header-icon' data-action='elite-search' aria-label='Search courses'>"+ico('search',20)+"</button><button type='button' class='elite-header-avatar' data-go='profile' aria-label='Open profile'>"+esc((state.user.name||'L').charAt(0).toUpperCase())+"</button></div>"+
  "</div></header>";
};
const navBar=()=>{
 const selected=['courses','ytlibrary','ytcourse','ytwatch','ytassessment','ytcompletion','saved'].includes(state.page)?'courses':state.page;
 return "<div class='nav-wrapper syl-bottom-nav elite-nav-wrap'><nav class='bottom-nav elite-bottom-nav' aria-label='Learning navigation'>"+
 [['home','home','Home'],['courses','book','Courses'],['live','radio','Live'],['progress','chart','Learning'],['profile','user','Profile']]
 .map(([pg,icon,label])=>"<button type='button' class='nav-item elite-nav-item "+(selected===pg?'active':'')+"' aria-label='"+label+"' aria-current='"+(selected===pg?'page':'false')+"' data-go='"+pg+"'><span class='elite-nav-icon'>"+ico(icon,22)+"</span><span class='elite-nav-label'>"+label+"</span></button>").join('')+
 "</nav></div>";
};
const footer=()=>"<footer class='footer syl-footer elite-footer elite-footer-minimal'><strong>SYLearn</strong><p>Learn. Build. Grow. <span>·</span> Powered by SYLUTION</p></footer>";

function home(){
 const curated=VIDEO.curated||[];
 const featuredIds=['rfscVS0vtbw','DPqiIzK97K0','hDKCxebp88A','c9Wg6Cb_YlU'];
 const picks=featuredIds.map(id=>curated.find(course=>course.id===id)).filter(Boolean);
 if(picks.length<4) curated.forEach(course=>{if(picks.length<4&&!picks.some(item=>item.id===course.id))picks.push(course)});
 const categories=[
  {name:'Programming',label:'Coding',icon:'laptop',tone:'red'},
  {name:'Data & Analytics',label:'Data Analytics',icon:'chart',tone:'blue'},
  {name:'Engineering & IoT',label:'Robotics & IoT',icon:'settings',tone:'violet'},
  {name:'Business & Office',label:'Digital Business',icon:'file',tone:'amber'},
  {name:'Design & Creative',label:'Design',icon:'spark',tone:'pink'},
  {name:'Artificial Intelligence',label:'AI & Automation',icon:'brain',tone:'gray'}
 ];
 const skillChip=(c,duplicate)=>{
  const available=curated.some(x=>x.category===c.name);
  const attrs=available
   ?"data-action='home-video-filter' data-value='"+esc(c.name)+"'"
   :"disabled aria-disabled='true'";
  return "<button type='button' class='elite-skill-chip elite-tone-"+c.tone+"' "+attrs+
   (duplicate?" tabindex='-1'":"")+" aria-label='"+esc(c.label)+(available?" courses":"' (coming soon)")+"'>"+
   "<span class='elite-skill-icon'>"+ico(c.icon,21)+"</span>"+
   "<span class='elite-skill-name'>"+esc(c.label)+"</span>"+
   (available?"<span class='elite-skill-arrow'>"+ico('arrow',15)+"</span>":"<span class='elite-skill-soon'>Soon</span>")+
   "</button>";
 };
 const courseTile=c=>{
  const amount=Number(c.price),paid=Number.isFinite(amount)&&amount>0;
  const isFree=!paid&&(c.access==='free'||c.price===0||c.source==='YouTube'||c.type==='video'||c.type==='playlist');
  const access=paid?'₦'+Math.round(amount).toLocaleString('en-NG'):isFree?'FREE':'View price';
  const rating=Number(c.rating),reviews=Number(c.reviewCount||0);
  const hasReviews=Number.isFinite(rating)&&rating>0&&rating<=5&&Number.isInteger(reviews)&&reviews>0;
  const chapters=Array.isArray(c.chapters)?c.chapters.length:0;
  const progress=Math.min(100,Math.max(0,VIDEO.progress(c)||0));
  const saved=VIDEO.state.saved.includes(c.id);
  return "<article class='elite-course-card elite-featured-card syl-course-v2 syl-course-v3'>"+
   "<button type='button' class='elite-course-open' data-action='yt-open' data-id='"+esc(c.id)+"' aria-label='View details for "+esc(c.title)+"'>"+
   "<span class='elite-course-thumb syl-home-video-thumb'>"+img(c.image,c.title)+
   "<span class='elite-card-play' aria-hidden='true'>"+ico('play',16)+"</span>"+
   "<span class='syl-card-price "+(paid?'syl-is-paid':'syl-is-free')+"'>"+esc(access)+"</span></span>"+
   "<span class='elite-course-body'><span class='elite-course-category'>"+esc(c.category)+" <b>·</b> "+esc(c.level||'All levels')+"</span>"+
   "<strong class='elite-featured-name'>"+esc(c.title)+"</strong>"+
   "<span class='elite-course-description'>"+esc(c.description||'Learn practical digital skills, step by step.')+"</span>"+
   "<span class='syl-card-facts'><span>"+ico('clock',13)+" "+esc(c.hours||'Self-paced')+"</span>"+(chapters?"<span>"+ico('book',13)+" "+chapters+" chapters</span>":'')+"</span>"+
   (hasReviews?"<span class='syl-card-rating'>"+ico('star',12)+" "+esc(rating.toFixed(1))+" <small>("+reviews+" reviews)</small></span>":'')+
   (progress>0?"<span class='syl-v3-progress'><span><strong>Study progress</strong><em>"+progress+"%</em></span><span class='syl-v3-meter'><span style='width:"+progress+"%'></span></span></span>":'')+
   "<span class='elite-course-foot'><span>View course</span><em>"+ico('arrow',16)+"</em></span></span></button>"+
   "<button type='button' class='syl-v3-home-save "+(saved?'is-saved':'')+"' data-action='yt-save' data-id='"+esc(c.id)+"' aria-label='"+(saved?'Remove saved course':'Save course')+"' aria-pressed='"+(saved?'true':'false')+"'>"+ico('bookmark',17)+"</button></article>";
 };
 return "<section class='screen elite-home'>"+
  "<form id='home-search-form' class='elite-course-search elite-search-top' role='search'>"+ico('search',21)+"<input id='home-search' name='search' type='search' autocomplete='off' placeholder='Search Python, AI, design, robotics...' aria-label='Search digital skills courses' value='"+esc(VIDEO.state.query||'')+"'/><button type='submit'>Search "+ico('arrow',17)+"</button></form>"+
  "<section class='elite-promo-banner' aria-label='Discover your potential'><div class='elite-promo-media'>"+img(PHOTOS.hero,'Students working together around a laptop')+"</div><div class='elite-promo-wash' aria-hidden='true'></div><div class='elite-promo-copy'><span class='elite-promo-eyebrow'><span class='elite-promo-spark'>✦</span> DISCOVER YOUR POTENTIAL</span><h1>A brighter you<br><em>through better learning.</em></h1><p>Practical digital skills and real learning opportunities — all in one place.</p><button type='button' class='elite-promo-button' data-go='courses'>Explore courses "+ico('arrow',18)+"</button></div></section>"+
  "<section class='elite-section elite-skills-section' aria-label='Explore Skills'><div class='elite-skills-heading'><div><span class='elite-section-eyebrow'>CHOOSE YOUR NEXT SKILL</span><h2>Explore Skills</h2></div><button type='button' data-go='courses' class='elite-skills-viewall'>View all "+ico('arrow',16)+"</button></div>"+
  "<div class='elite-skill-carousel' aria-label='Browse skills in one moving row'><div class='elite-skill-track'><div class='elite-skill-set'>"+
  categories.map(c=>skillChip(c,false)).join('')+
  "</div><div class='elite-skill-set' aria-hidden='true'>"+
  categories.map(c=>skillChip(c,true)).join('')+
  "</div></div></div></section>"+
  "<section class='elite-section elite-featured'><div class='elite-section-header'><div><span class='elite-section-eyebrow'>START LEARNING TODAY</span><h2>Featured courses</h2><p>Practical lessons to help you reach your goals.</p></div><button class='elite-section-link' data-go='courses'>View all "+ico('arrow',16)+"</button></div><div class='elite-course-grid'>"+picks.map(courseTile).join('')+"</div></section>"+
  "<div class='elite-community-strip'><span class='elite-community-mark'>"+ico('users',19)+"</span><span class='elite-community-copy'><strong>Join the SYLearn community</strong><small>Meet learners, exchange ideas and keep growing.</small></span><a href='https://t.me/SYLearn_Bot' target='_blank' rel='noopener noreferrer' class='elite-community-action' aria-label='Open SYLearn bot for community link'>Open bot "+ico('arrow',15)+"</a></div>"+
  "</section>";
}
function courses(){return VIDEO_UI.library()}

function detail(){
const c=course(state.courseId);const enrolled=state.enrolled.includes(c.id);
const tabs=[['overview','Overview'],['modules','Study outline'],['practice','Practice'],['instructor','About this outline']];
return '<section class="screen detail-screen '+classForCategory(c.cat)+'"><button class="back-btn" data-go="courses">'+ico('back')+' All courses</button>'+
'<div class="detail-banner">'+img(c.image,c.title)+'<div class="detail-copy"><div class="heading-eyebrow" style="color:#ffc6ca">SYLearn · Guided Practice</div><h1>'+esc(c.title)+'</h1><p>'+esc(c.desc)+'</p></div></div>'+
'<div class="row-between mt-3 gap-2" style="flex-wrap:wrap"><div><h1>'+esc(c.title)+'</h1><p class="muted">'+esc(c.desc)+'</p></div>'+badge(c.level)+'</div>'+
'<div class="stats-inline"><span>'+ico('book')+' Guided introductory practice</span><span>'+ico('cap')+' '+esc(c.level)+'</span><span>'+ico('info')+' Study outline</span></div>'+
'<div class="row gap-2" style="flex-wrap:wrap"><button class="btn btn-primary" data-action="enroll" data-id="'+c.id+'">'+(enrolled?'Continue practice':'Open guided practice')+' '+ico('arrow')+'</button><button class="btn btn-outline" data-action="favorite" data-id="'+c.id+'">'+ico('heart')+' '+(state.saved.includes(c.id)?'Saved':'Save Course')+'</button></div>'+
'<div class="detail-tabs">'+tabs.map(([t,n])=>'<button class="detail-tab '+(state.detailTab===t?'active':'')+'" data-action="detail-tab" data-value="'+t+'">'+n+'</button>').join('')+'</div>'+
(state.detailTab==='overview'?'<h2 class="mb-2">About this course</h2><p class="muted">This is a guided introduction covering essential ideas and a short practice activity. Explore the Courses library for full-length video lessons.</p><div class="panel mt-3" style="padding:20px;background:#fff6f6"><h3 class="mb-2">What you will learn</h3><div class="grid-2">'+c.highlights.map(t=>'<div class="row gap-2 small">'+ico('check')+' '+esc(t)+'</div>').join('')+'</div></div>'+heading('Course Modules','View all','lesson')+modules(c,3):'')+
(state.detailTab==='modules'?heading('Course Modules')+modules(c,c.lessons):'')+
(state.detailTab==='practice'?'<div class="panel" style="padding:24px"><h3>Build confidence through practice</h3><p class="muted">Open the guided introduction and explore real-world examples at your own pace.</p><button class="btn btn-primary" data-go="lesson" data-id="'+c.id+'">Start practice '+ico('arrow')+'</button></div>':'')+
(state.detailTab==='instructor'?'<div class="panel" style="padding:24px"><h3>'+esc(c.teacher)+'</h3><p class="muted">The SYLearn teaching team develops structured, approachable courses with practice and assessments.</p><button class="btn btn-outline" data-go="instructor">Instructor Studio '+ico('arrow')+'</button></div>':'')+'</section>';
}
function modules(c,max){
 return '<button class="module w-full" data-go="lesson" data-id="'+esc(c.id)+'"><span class="module-num">01</span><span class="module-text" style="text-align:left"><strong>Introduction to '+esc(c.short)+'</strong><small>Guided practice · Audio-led overview</small></span>'+ico('play')+'</button>';
}

function lesson(){
const c=course(state.courseId);
const txt='Welcome to '+c.title+'. In this introductory lesson, we will explore the core ideas, see examples and then check your understanding. Learning improves with regular practice.';
return '<section class="screen lesson-screen '+classForCategory(c.cat)+'"><button class="back-btn" data-go="detail" data-id="'+c.id+'">'+ico('back')+' '+esc(c.title)+'</button>'+
'<div class="lesson-visual">'+img(PHOTOS.video,'Learning session preview')+'<div class="play-overlay"><button class="play-round" aria-label="Play audio lesson" data-action="lesson-audio">'+ico(state.lessonPlaying?'pause':'play')+'</button><h2 style="max-width:80%">Introduction and Basic Concepts</h2><span class="small">Guided audio introduction</span></div></div>'+
'<div class="lesson-body"><p class="small muted bold">'+esc(c.title.toUpperCase())+' › MODULE 1</p><div class="row-between" style="align-items:flex-start"><div><h1>1.1 Introduction and Basic Concepts</h1><p class="muted">'+esc(c.desc)+'</p></div>'+badge(ct(c.id)+'% complete')+'</div>'+
'<div class="progress-track mt-3"><div class="progress-fill" style="width:'+ct(c.id)+'%"></div></div><div class="detail-tabs">'+[['notes','Notes'],['resources','Resources'],['transcript','Transcript']].map(([k,t])=>'<button class="detail-tab '+(state.lessonTab===k?'active':'')+'" data-action="lesson-tab" data-value="'+k+'">'+t+'</button>').join('')+'</div>'+
(state.lessonTab==='notes'?'<div class="panel" style="padding:20px"><h3>Lesson Notes</h3><ul class="note-list list-style"><li>Learn the essential terms and concepts.</li><li>Apply the ideas to practical, everyday examples.</li><li>Practice consistently and review your progress.</li><li>Ask the AI Tutor if something is unclear.</li></ul></div>':'')+
(state.lessonTab==='resources'?'<div class="panel" style="padding:20px"><h3>Resources</h3><p class="muted">Visit the Courses library for complete lessons. This page provides a guided introduction to key concepts.</p><button class="btn btn-outline" data-go="ai">Ask AI Tutor '+ico('arrow')+'</button></div>':'')+
(state.lessonTab==='transcript'?'<div class="panel" style="padding:20px"><h3>Audio Transcript</h3><p>'+esc(txt)+'</p></div>':'')+
'<div class="row mt-3 gap-2" style="flex-wrap:wrap"><button class="btn btn-muted" data-action="lesson-audio">'+ico('volume')+' Read Aloud</button><button class="btn btn-primary" data-action="complete-lesson" data-id="'+c.id+'">'+ico('check')+' Mark Lesson Complete</button><button class="btn btn-outline" data-go="exam">Practice Questions '+ico('arrow')+'</button></div><p class="fine-print mt-2">Video thumbnail is illustrative. The working preview includes spoken text where supported by your browser; actual instructor videos must be uploaded separately.</p></div></section>';
}

function ai(){
return '<section class="screen chat-container ai-screen theme-purple"><div class="page-intro"><div><div class="eyebrow-light"><span class="status-spark">✦</span> YOUR PERSONAL LEARNING COMPANION</div><h1>Learn smarter with <span class="red">AI Tutor.</span></h1><p class="muted">Questions are the beginning of something great.</p></div></div>'+
'<div class="ai-cover"><div class="ai-cover-text"><div class="hero-kicker"><span class="kicker-beam"></span> CURIOUS MINDS WELCOME</div><h2>Your study buddy,<br>anytime you need it.</h2><p>Ask for an explanation in Hausa or English, practise new concepts and grow one question at a time.</p></div><div class="ai-cover-symbol" aria-hidden="true">'+ico('brain')+'<span>✦</span></div></div>'+
'<div class="ai-conversation-head"><span class="bot-avatar">'+ico('brain')+'</span><span><strong>SYLUTION Study Companion</strong><small>Topic-based learning responses</small></span>'+badge('GUIDED','muted-badge')+'</div>'+
'<div class="chat-log" id="chat-log" aria-live="polite">'+state.chat.map(m=>'<div class="bubble-row '+(m.from==='user'?'user':'')+'">'+(m.from==='ai'?'<div class="bot-avatar">'+ico('brain')+'</div>':'')+'<div class="bubble '+(m.from==='ai'?'ai':'user')+'">'+esc(m.text)+'</div></div>').join('')+'</div>'+
'<div class="section-title-group">'+heading('A little inspiration','','')+'<p class="section-subtitle">Not sure where to start? Try one of these.</p></div>'+
'<div class="suggest-grid">'+[['translate','Explain Python in Hausa'],['file','Help me practise JavaScript'],['edit','Explain the basics of UX design'],['brain','Teach me robotics basics']].map(([i,t])=>'<button class="suggest" data-action="prompt" data-value="'+esc(t)+'">'+ico(i)+'<span>'+t+'</span>'+ico('arrow')+'</button>').join('')+'</div>'+
'<form class="chat-form" id="ai-form"><input required name="message" aria-label="Ask AI Tutor" placeholder="Ask a question, anything at all..." autocomplete="off"/><button type="button" class="icon-button" aria-label="Voice input" data-action="speech-chat">'+ico('mic')+'</button><button type="submit" class="btn btn-primary" aria-label="Send message">'+ico('send')+'</button></form>'+
'<p class="fine-print mt-2">This study assistant offers topic-based educational replies. It is not connected to a live generative AI model. Verify important information.</p></section>';
}

function respond(q){
const t=q.toLowerCase();
if(/hausa|fassara|bayanin/.test(t))return 'Ga bayani a Hausa: Idan kana koyon sabon abu, ka fara da ma’anarsa, ka kalli misalai biyu, sannan ka yi atisaye. Misali, a Python, variable wata suna ce da ake amfani da ita wajen adana daraja kamar age = 20. Kana son karin misalai?';
if(/python|variable|program|code/.test(t))return 'In Python, a variable stores a value under a name.\n\nname = "Amina"\nage = 20\nis_student = True\n\nTry it: change the value of age, then print(age). What do you expect to see?';
if(/design|ux|interface/.test(t))return 'A good interface should be clear, consistent and easy to use. Start with the user’s goal, draw a simple wireframe, then test the design with real people.';
if(/math|mathematics|fraction|percent/.test(t))return 'To calculate a percentage, multiply the number by the percentage divided by 100. For example, 15% of 200 = (15 / 100) × 200 = 30.\n\nTry this: what is 25% of 80?';
if(/practice|question|quiz/.test(t))return 'Here is a quick practice question:\n\nWhich word is closest in meaning to “benevolent”?\nA. Cruel\nB. Kind\nC. Selfish\nD. Hostile\n\nThink about it, then open CBT Exam Practice to test yourself!';
return 'I can help you explore digital skills. This is a guided study response rather than live AI generation. Try questions about Python, design, robotics or ask for an explanation in Hausa.';
}


function exam(){
if(!state.quizEnds)state.quizEnds=Date.now()+30*60*1000;
const ix=state.quizIndex;const q=QUESTIONS[ix];const a=state.answers[ix];
return '<section class="screen exam-screen theme-blue"><button class="back-btn" data-go="home">'+ico('back')+' Dashboard</button>'+
'<div class="panel" class="exam-intro-card"><div class="row-between"><div><h3>UTME Practice Test</h3><p class="muted small" style="margin:4px 0 0">Mixed Subject · Practice</p></div><div class="center"><div class="small muted">Time Left</div><h2 class="exam-time" id="quiz-clock">30:00</h2></div></div></div>'+
'<div class="row-between mt-3"><strong>Question '+(ix+1)+' of '+QUESTIONS.length+'</strong><span class="muted small">'+Math.round((ix+1)/QUESTIONS.length*100)+'% Complete</span></div><div class="progress-track mt-2"><div class="progress-fill" style="width:'+((ix+1)/QUESTIONS.length*100)+'%"></div></div>'+
'<div class="question-card"><h2 style="margin-bottom:24px">'+esc(q.q)+'</h2>'+q.o.map((opt,i)=>'<button class="answer '+(a===i?'selected':'')+'" data-action="answer" data-index="'+i+'"><span class="letter">'+String.fromCharCode(65+i)+'</span><span>'+esc(opt)+'</span></button>').join('')+'<div class="notice mt-3">Select the best answer. You can change it before submitting your test.</div></div>'+
'<div class="row-between gap-2"><button class="btn btn-outline" data-action="quiz-prev" '+(ix===0?'disabled':'')+'>'+ico('back')+' Previous</button><button class="btn btn-primary" data-action="'+(ix===QUESTIONS.length-1?'quiz-submit':'quiz-next')+'">'+(ix===QUESTIONS.length-1?'Submit Exam':'Next Question')+' '+ico('arrow')+'</button></div></section>';
}
function results(){
return '<section class="screen exam-results-screen theme-gold"><div class="form-card center"><div style="font-size:48px">🏆</div><h1>Exam Complete!</h1><p class="muted">Here is your practice test result.</p><div class="ring large" style="--percent:'+Math.round(state.quizResult/QUESTIONS.length*100)+'%;margin:20px auto"><span>'+Math.round(state.quizResult/QUESTIONS.length*100)+'%<small>Score</small></span></div><h3>'+state.quizResult+' / '+QUESTIONS.length+' correct</h3><p class="muted small">This sample exam is for practice and not an official JAMB exam.</p><div class="rule"></div><h3 style="text-align:left">Answer Review</h3>'+
QUESTIONS.map((q,i)=>'<div style="text-align:left;border-bottom:1px solid var(--line);padding:12px 0"><strong class="small">'+(i+1)+'. '+esc(q.q)+'</strong><p class="small" style="margin:5px 0;color:'+(state.answers[i]===q.a?'#15895a':'#e0001b')+'">Your answer: '+(state.answers[i]===undefined?'Skipped':esc(q.o[state.answers[i]]))+'</p><p class="small muted" style="margin:0">Correct: '+esc(q.o[q.a])+'. '+esc(q.why)+'</p></div>').join('')+
'<button class="btn btn-primary btn-block mt-3" data-action="quiz-retake">'+ico('repeat')+' Retake Practice Test</button><button class="btn btn-outline btn-block mt-2" data-go="home">Back Home</button></div></section>';
}

function progress(){
 const all=VIDEO.curated.slice();
 const started=all.filter(c=>VIDEO.progress(c)>0);
 const active=started.filter(c=>VIDEO.progress(c)<100);
 const complete=started.filter(c=>VIDEO.progress(c)>=100);
 const bookmarked=all.filter(c=>VIDEO.state.saved.includes(c.id));
 const tabs=[['active','In progress',active.length],['complete','Completed',complete.length],['saved','Saved',bookmarked.length],['all','All courses',new Set([...started,...bookmarked].map(c=>c.id)).size]];
 const selected=['active','complete','saved','all'].includes(state.learningFilter)?state.learningFilter:'active';
 const included=selected==='active'?active:selected==='complete'?complete:selected==='saved'?bookmarked:all.filter(c=>started.includes(c)||bookmarked.includes(c));
 const marked=started.reduce((n,c)=>{
  const key=(c.type||'video')+':'+c.id;
  const rows=VIDEO.state.courseProgress[key];
  return n+(Array.isArray(rows)?new Set(rows.filter(Number.isInteger)).size:0);
 },0);
 const first=active[0]||complete[0]||bookmarked[0]||null;
 const percent=c=>Math.max(0,Math.min(100,VIDEO.progress(c)||0));
 const chapters=c=>Array.isArray(c.chapters)?c.chapters.length:0;
 const nextInfo=c=>{
   const key=(c.type||'video')+':'+c.id,seen=VIDEO.state.courseProgress[key]||[];
   const next=Array.isArray(c.chapters)?c.chapters.findIndex((row,i)=>!seen.includes(i)):-1;
   return percent(c)>=100?'All chapters marked studied':next>=0?'Next: '+String(c.chapters[next]?.[0]||'Continue the course'):'Start your first chapter';
 };
 const card=c=>{
  const n=percent(c),total=chapters(c),key=(c.type||'video')+':'+c.id;
  const recorded=Array.isArray(VIDEO.state.courseProgress[key])?VIDEO.state.courseProgress[key].length:0;
  const saved=VIDEO.state.saved.includes(c.id);
  const label=n>=100?'Review course':n>0?'Resume learning':'Start learning';
  return '<article class="syl-ld-course">'+
   '<button type="button" class="syl-ld-image" data-action="yt-open" data-id="'+esc(c.id)+'" aria-label="View '+esc(c.title)+'"><span class="syl-ld-picture">'+img(c.image,c.title)+'</span><span class="syl-ld-image-tag">'+esc(c.category||'Digital Skills')+'</span></button>'+
   '<div class="syl-ld-course-body"><div class="syl-ld-course-topline"><span>'+esc(c.level||'All levels')+'</span>'+(saved?'<span class="syl-ld-saved">'+ico('bookmark')+' Saved</span>':'')+'</div>'+
   '<button type="button" class="syl-ld-course-title" data-action="yt-open" data-id="'+esc(c.id)+'">'+esc(c.title)+'</button>'+
   '<p class="syl-ld-next">'+esc(nextInfo(c))+'</p>'+
   '<div class="syl-ld-percentline"><span aria-label="'+Math.min(recorded,total)+' of '+total+' chapters marked studied">'+Math.min(recorded,total)+' / '+total+' chapters</span><strong>'+n+'%</strong></div>'+
   '<div class="syl-ld-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+n+'" aria-label="Study progress"><span style="width:'+n+'%"></span></div>'+
   '<button type="button" class="syl-ld-resume" data-action="learning-resume" data-id="'+esc(c.id)+'"><span>'+label+'</span>'+ico('arrow')+'</button></div></article>';
 };
 const filteredCards=included.map(card).join('');
 const emptyHeading=selected==='active'?'No courses in progress yet':selected==='complete'?'Your completed courses will appear here':selected==='saved'?'No saved courses yet':'Your learning space is ready';
 const emptyMessage=selected==='active'?'Explore a course and mark a chapter as studied to begin building your progress.':selected==='complete'?'Courses will appear here when all their chapters are marked as studied.':selected==='saved'?'Bookmark a course you want to return to.':'Explore courses and save your favourites to start your learning journey.';
 return '<section class="screen real-progress syl-learning-v2">'+
  '<div class="syl-ld-hero"><div class="syl-ld-hero-glow" aria-hidden="true"></div>'+
   '<div class="syl-ld-hero-top"><span class="syl-ld-kicker">'+ico('cap')+' SYLEARN · MY LEARNING</span><span class="syl-ld-hero-emblem">'+ico('spark')+'</span></div>'+
   '<h1>Your learning journey.</h1><p>Build your skills with every chapter. Your next step starts here.</p>'+
   '<div class="syl-ld-stats">'+
    '<div class="syl-ld-stat">'+ico('book')+'<strong>'+started.length+'</strong><span>Courses started</span></div>'+
    '<div class="syl-ld-stat">'+ico('check')+'<strong>'+marked+'</strong><span>Chapters studied</span></div>'+
    '<div class="syl-ld-stat">'+ico('award')+'<strong>'+complete.length+'</strong><span>Outlines finished</span></div>'+
   '</div></div>'+
  (first?'<div class="syl-ld-next-step"><div class="syl-ld-next-text"><span>'+ico('spark')+' '+(percent(first)>=100?'REVISIT A FINISHED COURSE':percent(first)>0?'PICK UP WHERE YOU LEFT OFF':'START YOUR NEXT COURSE')+'</span><strong>'+esc(first.title)+'</strong><small>'+percent(first)+'% of chapters marked studied</small></div><button type="button" data-action="learning-resume" data-id="'+esc(first.id)+'">'+(percent(first)>=100?'Review':percent(first)>0?'Continue':'Start')+' '+ico('arrow')+'</button></div>':'')+
  '<div class="syl-ld-section-title"><div><span>YOUR LEARNING SPACE</span><h2>My courses</h2><p>Keep track of what you are learning.</p></div><button type="button" class="syl-ld-browse" data-go="courses">Explore courses '+ico('arrow')+'</button></div>'+
  '<div class="syl-ld-tabs" role="group" aria-label="Filter learning courses">'+tabs.map(([id,label,count])=>'<button type="button" class="'+(selected===id?'is-active':'')+'" data-action="learning-filter" data-value="'+id+'" aria-pressed="'+(selected===id?'true':'false')+'">'+label+' <small>'+count+'</small></button>').join('')+'</div>'+
  (included.length?'<div class="syl-ld-course-grid">'+filteredCards+'</div>':'<div class="syl-ld-empty">'+ico('book')+'<h3>'+emptyHeading+'</h3><p>'+emptyMessage+'</p><button type="button" data-go="courses">Explore courses '+ico('arrow')+'</button></div>')+
  '<div class="syl-ld-data-note">'+ico('info')+' <span>Progress reflects chapters marked as studied and is stored in this browser. It is not verified viewing time or an accredited credential.</span></div>'+
 '</section>';
}

/* Premium student profile: read authentic local learning records, never estimate watch time. */
const profilePhoto=user=>{
 const raw=String(user?.avatar||'');
 return /^data:image\/(?:jpeg|png|webp);base64,[a-z0-9+/=]+$/i.test(raw)&&raw.length<210000?raw:'';
};
const studentOverview=()=>{
 const courses=Array.isArray(VIDEO.curated)?VIDEO.curated:[];
 const started=courses.filter(c=>VIDEO.progress(c)>0);
 const finished=started.filter(c=>VIDEO.progress(c)>=100);
 const startedIds=new Set(started.map(c=>c.id));
 const studied=started.reduce((n,c)=>{
   const key=(c.type||'video')+':'+c.id, rows=VIDEO.state.courseProgress[key];
   if(!Array.isArray(rows))return n;
   const total=Array.isArray(c.chapters)?c.chapters.length:0;
   return n+new Set(rows.filter(i=>Number.isInteger(i)&&i>=0&&i<total)).size;
 },0);
 const saved=Array.isArray(VIDEO.state.saved)?courses.filter(c=>VIDEO.state.saved.includes(c.id)).length:0;
 const liveSaved=Array.isArray(state.liveSaved)?state.liveSaved.length:0;
 const assessments=courses.filter(c=>{
   try{return (ASSESS.record(c.id)?.bestScore||0)>=80}catch(e){return false}
 }).length;
 return {started:startedIds.size,studied,finished:finished.length,saved,liveSaved,assessments};
};
const profileStatTile=(icon,num,title)=>'<div class="syl-p3-stat">'+ico(icon,19)+'<strong>'+num+'</strong><span>'+title+'</span></div>';
function profile(){
 const name=String(state.user?.name||'Learner').trim()||'Learner';
 const photo=profilePhoto(state.user),stats=studentOverview();
 const initials=(name.match(/\b[\p{L}\p{N}]/gu)||[name[0]]).slice(0,2).join('').toUpperCase();
 const subtitle=stats.studied>0?'You have marked '+stats.studied+' '+(stats.studied===1?'chapter':'chapters')+' as studied. Keep building your skills.':'Your next skill starts with your first lesson.';
 const photoHtml=photo?'<img src="'+photo+'" alt="Your saved profile picture"/>':'<span aria-hidden="true">'+esc(initials)+'</span>';
 const tiles=[
  ['book','My courses','Continue your learning journey','progress','active'],
  ['bookmark','Saved courses','Pick up your favourites','saved',''],
  ['chart','My progress','Chapters and study history','progress','all'],
  ['calendar','Live classes','Sessions and schedules','live','']
 ];
 const links=tiles.map(([icon,title,desc,page,tab])=>'<button type="button" class="syl-p3-link" '+(tab?'data-action="profile-hub" data-value="'+tab+'"':'data-go="'+page+'"')+'><span class="syl-p3-link-icon">'+ico(icon,22)+'</span><strong>'+title+'</strong><small>'+desc+'</small><span class="syl-p3-link-arrow">'+ico('arrow',15)+'</span></button>').join('');
 const settings=[
  ['user','Personal information','Name, picture and preferences','account'],
  ['globe','Learning language',String(state.user?.preferred||'Hausa'),'account'],
  ['lock','Account & data','Local profile, backup and restore','account']
 ];
 return '<section class="screen profile-screen syl-profile-v3">'+
  '<div class="syl-p3-hero"><div class="syl-p3-hero-glow" aria-hidden="true"></div>'+
   '<div class="syl-p3-topline"><span>'+ico('cap',16)+' SYLEARN · STUDENT PROFILE</span><span class="syl-p3-topicon">'+ico('spark',20)+'</span></div>'+
   '<div class="syl-p3-identity"><div class="syl-p3-avatar">'+photoHtml+'</div>'+
    '<div class="syl-p3-identity-copy"><span class="syl-p3-identity-label">YOUR PERSONAL LEARNING SPACE</span><h1>'+esc(name)+'</h1><p>'+esc(subtitle)+'</p>'+
     '<span class="syl-p3-local-label">'+ico('info',13)+' Saved on this device</span></div>'+
    '<button type="button" class="syl-p3-hero-edit" data-go="account">'+ico('edit',16)+' Edit profile</button></div>'+
   '<div class="syl-p3-stats">'+profileStatTile('book',stats.started,'Courses started')+profileStatTile('check',stats.studied,'Chapters studied')+profileStatTile('bookmark',stats.saved,'Saved courses')+'</div>'+
  '</div>'+
  '<div class="syl-p3-section-head"><div><span class="syl-p3-eyebrow">YOUR WORKSPACE</span><h2>My learning hub</h2><p>Everything you need to keep moving forward.</p></div></div>'+
  '<div class="syl-p3-links">'+links+'</div>'+
  '<div class="syl-p3-achievement"><span class="syl-p3-achievement-icon">'+ico(stats.studied>0?'award':'cap',23)+'</span><div><span class="syl-p3-eyebrow">LEARNING MILESTONES</span><h3>'+(stats.finished?'Courses studied — '+stats.finished:stats.studied?'Learning in progress':'Your journey starts here')+'</h3><p>'+(stats.finished?'You have marked every chapter in '+stats.finished+' course outline'+(stats.finished===1?'':'s')+' as studied.':stats.studied?'You have marked '+stats.studied+' chapters as studied. Keep going at your own pace.':'Begin a course and mark your first chapter as studied to see your progress here.')+'</p></div><button type="button" data-go="progress">View progress '+ico('arrow',15)+'</button></div>'+
  '<div class="syl-p3-section-head"><div><span class="syl-p3-eyebrow">MADE FOR YOU</span><h2>Account & preferences</h2><p>Make SYLearn comfortable for the way you learn.</p></div></div>'+
  '<div class="syl-p3-settings">'+settings.map(([icon,title,desc,page])=>'<button type="button" class="syl-p3-settings-row" data-go="'+page+'"><span class="syl-p3-settings-icon">'+ico(icon,20)+'</span><span><strong>'+title+'</strong><small>'+esc(desc)+'</small></span><span class="syl-p3-settings-arrow">'+ico('arrow',16)+'</span></button>').join('')+'</div>'+
  '<div class="syl-p3-section-head syl-p3-support-head"><div><span class="syl-p3-eyebrow">HERE TO HELP</span><h2>Support & about</h2></div></div>'+
  '<div class="syl-p3-settings">'+
   '<button type="button" class="syl-p3-settings-row" data-action="help"><span class="syl-p3-settings-icon">'+ico('help',20)+'</span><span><strong>Help & support</strong><small>How to use SYLearn and your learning records</small></span><span class="syl-p3-settings-arrow">'+ico('arrow',16)+'</span></button>'+
   '<button type="button" class="syl-p3-settings-row" data-action="about"><span class="syl-p3-settings-icon">'+ico('info',20)+'</span><span><strong>About SYLearn</strong><small>Digital Skills Academy by SYLUTION</small></span><span class="syl-p3-settings-arrow">'+ico('arrow',16)+'</span></button></div>'+
  '<div class="syl-p3-privacy">'+ico('lock',17)+' <span>Profile details, your study history and saved classes are stored locally. Secure sign-in and automatic cloud synchronisation are not connected yet.</span></div>'+
 '</section>';
}

function saved(){
 const items=VIDEO.curated.filter(c=>VIDEO.state.saved.includes(c.id));
 return '<section class="screen saved-real"><button class="back-btn" data-go="profile">'+ico('back')+' Profile</button><span class="home-block-eyebrow">YOUR COLLECTION</span><h1>Saved courses</h1><p class="muted">Bookmarks saved on this device.</p>'+
 (items.length?'<div class="yt-course-grid">'+items.map(VIDEO_UI.card).join('')+'</div>':'<div class="real-empty">'+ico('bookmark')+'<h3>No saved courses</h3><p>Use the heart on any course card to save it here.</p><button class="btn btn-primary" data-go="courses">Explore courses</button></div>')+'</section>';
}

function certificates(){
 const c=VIDEO.curated.filter(x=>ASSESS.eligible(x.id,VIDEO.progress(x)));
 return '<section class="screen saved-real"><button class="back-btn" data-go="profile">'+ico('back')+' Profile</button><div class="learning-head"><span class="learning-kicker">YOUR LEARNING RECORDS</span><h1>Course completion records.</h1><p>Saved in this browser. These records are personal study acknowledgments, not accredited qualifications.</p></div>'+
 (c.length?'<div class="learning-record-list">'+c.map(x=>'<div class="learning-record-card"><div><strong>'+esc(x.title)+'</strong><p>Best assessment: '+ASSESS.record(x.id).bestScore+'% · Chapters: 100%</p><small>Educator: '+esc(x.creator)+'</small></div><button class="btn btn-primary" data-action="qa-record-open" data-id="'+esc(x.id)+'">View record</button></div>').join('')+'</div>':'<div class="real-empty">'+ico('award')+'<h3>No completion records yet</h3><p>Complete every chapter and pass the course knowledge check to create a local learning record.</p><button class="btn btn-primary" data-go="courses">Explore courses</button></div>')+'</section>';
}

function downloads(){return '<section class="screen"><button class="back-btn" data-go="profile">'+ico('back')+' Profile</button><h1>My Downloads</h1><div class="empty mt-3">'+ico('download')+'<h3>Offline lessons</h3><p class="muted">Offline video and lesson downloads will be available when the secure media library and storage are connected.</p><button class="btn btn-primary" data-go="courses">Browse Courses</button></div></section>';}
function account(){
 const photo=profilePhoto(state.user),name=String(state.user?.name||'Learner');
 const short=(name.match(/\b[\p{L}\p{N}]/gu)||[name[0]||'L']).slice(0,2).join('').toUpperCase();
 return '<section class="screen syl-account-v3"><button type="button" class="syl-account-back" data-go="profile">'+ico('back',17)+' Back to profile</button>'+
  '<div class="syl-account-head"><span class="syl-p3-eyebrow">YOUR ACCOUNT</span><h1>Make it yours.</h1><p>Personalise your student profile and learning experience.</p></div>'+
  '<div class="syl-account-card"><div class="syl-account-avatar-row"><div class="syl-account-avatar">'+(photo?'<img src="'+photo+'" alt="Your profile photo"/>':'<span>'+esc(short)+'</span>')+'</div>'+
   '<div><h2>Profile picture</h2><p>Upload a clear photo, or use your initials.</p><label class="syl-account-file-label" for="syl-profile-photo">'+ico('camera',16)+' Choose photo</label>'+
   (photo?'<button type="button" class="syl-account-remove" data-action="profile-remove-photo">Remove photo</button>':'')+
   '<input id="syl-profile-photo" type="file" accept="image/jpeg,image/png,image/webp" aria-label="Choose profile photo"/></div></div>'+
   '<form id="account-form"><div class="syl-account-field"><label for="account-name">Display name</label><input id="account-name" name="name" required minlength="2" maxlength="60" autocomplete="nickname" value="'+esc(name)+'" placeholder="Enter your name"/></div>'+
   '<div class="syl-account-field"><label for="account-language">Learning explanations language</label><select name="preferred" id="account-language">'+['Hausa','English'].map(x=>'<option value="'+x+'" '+(state.user.preferred===x?'selected':'')+'>'+x+'</option>').join('')+'</select></div>'+
   '<button type="submit" class="syl-account-primary">'+ico('check',17)+' Save profile changes</button></form>'+
   '<p class="syl-account-help">'+ico('info',14)+' Your picture and settings are stored on this device, not in an online account.</p></div>'+
  '<div class="syl-account-data"><div><span class="syl-p3-eyebrow">YOUR RECORDS</span><h2>Data & backup</h2><p>Keep a personal copy of your courses, chapters and saved classes. You can restore a backup on another device manually.</p></div>'+
   '<div class="syl-account-data-actions"><button type="button" data-action="profile-export">'+ico('download',18)+' Download backup</button><label for="syl-profile-restore">'+ico('repeat',18)+' Restore backup</label><input type="file" id="syl-profile-restore" accept=".json,application/json" aria-label="Restore SYLearn learning backup"/></div>'+
   '<p>Restoring a backup replaces the matching records on this device. Automatic syncing is not available yet.</p></div>'+
  '<div class="syl-account-security"><span>'+ico('lock',20)+'</span><div><h2>Secure student sign-in</h2><p>Email or Google sign-in, account recovery and cloud progress sync require a configured authentication service and database. They are not active yet.</p></div></div>'+
 '</section>';
}
function billing(){
 return '<section class="screen syl-tech-content-page syl-tech-membership"><button class="syl-tech-back" data-go="profile">'+ico('back')+' Profile</button>'+
 '<div class="syl-tech-page-banner"><span class="syl-tech-page-kicker">'+ico('card')+' SYLEARN · MEMBERSHIP</span><h1>Learn without limits to your curiosity.</h1><p>Build practical skills through the courses that are currently available in SYLearn.</p></div>'+
 '<div class="syl-tech-member-grid"><article class="syl-tech-feature-panel"><span class="syl-tech-label">CURRENT ACCESS</span><div class="syl-tech-feature-icon">'+ico('book')+'</div><h2>Explore learning</h2><p>Browse self-paced lessons, track your progress on this device and save your favourite courses.</p><button class="btn btn-primary" data-go="courses">Explore courses '+ico('arrow')+'</button></article>'+
 '<article class="syl-tech-feature-panel"><span class="syl-tech-label">MEMBERSHIP DEVELOPMENT</span><div class="syl-tech-feature-icon">'+ico('lock')+'</div><h2>Premium membership</h2><p>Subscription plans, access verification and online payments have not launched yet. No payment is requested on this page.</p><button class="btn btn-outline" data-go="live">Explore live learning '+ico('arrow')+'</button></article></div></section>';
}
function notifications(){
 const sessions=liveSessions(),now=Date.now();
 const upcoming=sessions.filter(x=>Date.parse(x.startAt)>now&&Date.parse(x.endAt)>now);
 const saved=upcoming.filter(x=>state.liveSaved.includes(x.id));
 const started=VIDEO.curated.filter(c=>VIDEO.progress(c)>0);
 const summary=[
 ['calendar','Live class schedule',upcoming.length?upcoming.length+' announced upcoming '+(upcoming.length===1?'class':'classes'):'No upcoming live classes announced','live'],
 ['bookmark','Your saved live classes',saved.length?saved.length+' saved upcoming '+(saved.length===1?'session':'sessions'):'No saved upcoming sessions','live'],
 ['chart','Learning progress',started.length?started.length+' '+(started.length===1?'course':'courses')+' started on this device':'Start a course to see learning progress','progress']
 ];
 return '<section class="screen syl-tech-content-page syl-tech-updates"><button class="syl-tech-back" data-go="profile">'+ico('back')+' Profile</button>'+
 '<div class="syl-tech-page-banner"><span class="syl-tech-page-kicker">'+ico('bell')+' YOUR LEARNING UPDATES</span><h1>What’s happening at SYLearn.</h1><p>Quick access to your learning activity and confirmed live class schedules.</p></div>'+
 '<div class="syl-tech-notice-list">'+summary.map(([symbol,title,desc,pg])=>'<button class="syl-tech-notice" data-go="'+pg+'"><span class="syl-tech-notice-icon">'+ico(symbol)+'</span><span><strong>'+title+'</strong><small>'+esc(desc)+'</small></span>'+ico('arrow')+'</button>').join('')+'</div>'+
 '<p class="syl-tech-page-note">'+ico('info')+' These are current on-device updates, not push notifications. Automatic alerts will require notification permissions and a connected service.</p></section>';
}

const LIVE_TOPIC_IDEAS=[
 {title:'Python Live Coding',category:'PROGRAMMING',icon:'laptop',description:'Build practical projects while following an instructor step by step.'},
 {title:'Arduino Project Lab',category:'ENGINEERING & IoT',icon:'settings',description:'Learn real circuits, sensors and practical electronics projects.'},
 {title:'UI/UX Design Workshop',category:'DESIGN & CREATIVE',icon:'edit',description:'Create wireframes and prototype digital products.'},
 {title:'AI Skills Workshop',category:'ARTIFICIAL INTELLIGENCE',icon:'brain',description:'Understand AI tools and practice useful digital workflows.'}
];
function liveSessions(){
 const source=Array.isArray(window.SYLEARN_LIVE_SESSIONS)?window.SYLEARN_LIVE_SESSIONS:[];
 const seen=new Set();
 return source.filter(c=>{
   if(!c||typeof c!=='object'||!/^[a-z0-9][a-z0-9_-]{1,70}$/i.test(String(c.id||'')))return false;
   if(seen.has(c.id))return false;
   if(!String(c.title||'').trim()||!String(c.instructor||'').trim())return false;
   if(!/(?:Z|[+-]\d{2}:\d{2})$/.test(String(c.startAt||''))||!/(?:Z|[+-]\d{2}:\d{2})$/.test(String(c.endAt||'')))return false;
   if(!Number.isFinite(Date.parse(c.startAt))||!Number.isFinite(Date.parse(c.endAt))||Date.parse(c.endAt)<=Date.parse(c.startAt))return false;
   seen.add(c.id);
   return true;
 }).sort((x,y)=>Date.parse(x.startAt)-Date.parse(y.startAt));
}
const livePhase=(c,now=Date.now())=>{
 const start=Date.parse(c.startAt),end=Date.parse(c.endAt);
 return now>=end?'past':now>=start?'live':'upcoming';
};
const liveMeetingUrl=c=>{
 const url=String(c.meetingUrl||'').trim();
 return /^https:\/\/[a-z0-9.-]+(?::443)?(?:\/|$)/i.test(url)&&!url.includes('@')?url:'';
};
const liveWhen=c=>{
 const d=new Date(c.startAt);
 try{return new Intl.DateTimeFormat('en-NG',{weekday:'short',day:'numeric',month:'short',year:'numeric',hour:'numeric',minute:'2-digit',timeZone:'Africa/Lagos',timeZoneName:'short'}).format(d)}
 catch(e){return d.toUTCString()}
};
function live(){
 const sessions=liveSessions(),now=Date.now(),saved=state.liveSaved||[];
 const upcoming=sessions.filter(c=>livePhase(c,now)==='upcoming');
 const happening=sessions.filter(c=>livePhase(c,now)==='live');
 const past=sessions.filter(c=>livePhase(c,now)==='past');
 const mine=sessions.filter(c=>saved.includes(c.id)&&livePhase(c,now)!=='past');
 const tab=['upcoming','now','mine','past'].includes(state.liveTab)?state.liveTab:'upcoming';
 const tabs=[['upcoming','Upcoming',upcoming.length],['now','Live now',happening.length],['mine','My saved',mine.length],['past','Past',past.length]];
 const rows=(tab==='now'?happening:tab==='mine'?mine:tab==='past'?past:upcoming);
 const renderSession=c=>{
   const phase=livePhase(c,now),hasLink=!!liveMeetingUrl(c),isSaved=saved.includes(c.id);
   const paid=c.access==='paid',amount=Number(c.priceNGN);
   const fee=paid?(Number.isFinite(amount)&&amount>0?'₦'+Math.round(amount).toLocaleString('en-NG'):'PAID'):(c.access==='free'?'FREE':'ACCESS TO BE CONFIRMED');
   const outcomes=(Array.isArray(c.outcomes)?c.outcomes:[]).slice(0,4),reqs=(Array.isArray(c.requirements)?c.requirements:[]).slice(0,3);
   const cover=String(c.image||'');
   const coverValid=/^https:\/\/[a-z0-9.-]+(?::443)?\//i.test(cover)&&!cover.includes('@');
   const liveNow=phase==='live';
   return '<article class="syl-live-class-card">'+
    '<div class="syl-live-class-media">'+(coverValid?'<img src="'+esc(cover)+'" alt="" loading="lazy"/>':'<div class="syl-live-class-art" aria-hidden="true">'+ico('radio',51)+'</div>')+
     '<span class="syl-live-class-tag '+(liveNow?'is-live':'')+'">'+(liveNow?'● LIVE NOW':phase==='past'?'FINISHED':'UPCOMING')+'</span>'+
     '<span class="syl-live-class-fee">'+esc(fee)+'</span></div>'+
    '<div class="syl-live-class-copy"><span class="syl-live-topic">'+esc(c.category||'Digital Skills')+'</span>'+
    '<h3>'+esc(c.title)+'</h3><p>'+esc(c.description||'Instructor-led live learning session.')+'</p>'+
    '<div class="syl-live-class-info"><span>'+ico('calendar')+' '+esc(liveWhen(c))+'</span>'+
      '<span>'+ico('user')+' '+esc(c.instructor)+'</span>'+
      '<span>'+ico('clock')+' '+Math.round((Date.parse(c.endAt)-Date.parse(c.startAt))/60000)+' minutes</span></div>'+
    ((outcomes.length||reqs.length)?'<details class="syl-live-session-details"><summary>Session details '+ico('arrow')+'</summary>'+
       (outcomes.length?'<strong>What you will learn</strong><ul>'+outcomes.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul>':'')+
       (reqs.length?'<strong>What you need</strong><ul>'+reqs.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul>':'')+'</details>':'')+
    '<div class="syl-live-card-footer">'+
     (phase==='past'?'<span class="syl-live-ended">Session ended</span>':
       liveNow&&hasLink?'<button type="button" class="syl-live-join" data-action="live-join" data-id="'+esc(c.id)+'">'+ico('radio')+' Join live</button>':
       '<button type="button" class="syl-live-save '+(isSaved?'is-saved':'')+'" data-action="live-save" data-id="'+esc(c.id)+'" aria-pressed="'+(isSaved?'true':'false')+'">'+ico(isSaved?'check':'bookmark')+' '+(isSaved?'Saved to my list':'Save class')+'</button>')+
     (phase==='past'?'':'<button type="button" class="syl-live-calendar" data-action="live-calendar" data-id="'+esc(c.id)+'" aria-label="Add '+esc(c.title)+' to calendar">'+ico('calendar')+' Add to calendar</button>')+
     '</div></div></article>';
 };
 const emptyTitle=tab==='now'?'No class is live right now':tab==='mine'?'No classes saved yet':tab==='past'?'No previous classes yet':'No live classes announced yet';
 const emptyText=tab==='now'?'Check the upcoming timetable for announced sessions.':tab==='mine'?'Save an announced class to keep it on this device. Saving is not an official registration.':tab==='past'?'Completed sessions will appear here after their scheduled time.':'Our team is preparing the first instructor-led classes. Dates and joining links will appear here once they are confirmed.';
 return '<section class="screen syl-live-hub">'+
  '<div class="syl-live-hero"><div class="syl-live-hero-graphic" aria-hidden="true"></div>'+
   '<div class="syl-live-hero-top"><span class="syl-live-kicker">'+ico('radio')+' SYLEARN · LIVE ACADEMY</span><span class="syl-live-hero-icon">'+ico('calendar')+'</span></div>'+
   '<div class="syl-live-hero-head"><div><h1>Learn live.<span> Build real skills.</span></h1><p>Join scheduled instructor-led classes, work on real projects and ask questions as you learn.</p></div>'+
    '<div class="syl-live-hero-mini"><strong>'+happening.length+'</strong><span>Live right now</span></div></div>'+
   '<div class="syl-live-hero-pills"><span>'+ico('calendar')+' Scheduled workshops</span><span>'+ico('users')+' Real instructors</span><span>'+ico('globe')+' West Africa Time (WAT)</span></div></div>'+
  '<div class="syl-live-top-features"><div>'+ico('radio')+'<strong>Live lessons</strong><span>Learn in real time</span></div><div>'+ico('calendar')+'<strong>Flexible sessions</strong><span>Join at a scheduled time</span></div><div>'+ico('book')+'<strong>Practical learning</strong><span>Build as you study</span></div></div>'+
  '<div class="syl-live-section-heading"><div><span class="syl-live-eyebrow">YOUR CLASSROOM CALENDAR</span><h2>Live class schedule</h2><p>Only confirmed sessions are published here.</p></div><span class="syl-live-schedule-zone">'+ico('clock')+' Times in WAT</span></div>'+
  '<div class="syl-live-tabs" role="group" aria-label="Filter live classes">'+tabs.map(([key,label,count])=>'<button type="button" class="'+(tab===key?'is-active':'')+'" data-action="live-tab" data-value="'+key+'" aria-pressed="'+(tab===key?'true':'false')+'">'+label+' <small>'+count+'</small></button>').join('')+'</div>'+
  (rows.length?'<div class="syl-live-cards">'+rows.map(renderSession).join('')+'</div>':
   '<div class="syl-live-empty"><span class="syl-live-empty-icon">'+ico(tab==='now'?'radio':'calendar')+'</span><h3>'+emptyTitle+'</h3><p>'+emptyText+'</p>'+
   (tab!=='upcoming'?'<button type="button" data-action="live-tab" data-value="upcoming">View upcoming classes '+ico('arrow')+'</button>':'<span class="syl-live-empty-sub">'+ico('info')+' No date or meeting link has been published yet.</span>')+'</div>')+
  '<div class="syl-live-section-heading syl-live-next-heading"><div><span class="syl-live-eyebrow">WHAT WE ARE PREPARING</span><h2>Hands-on learning tracks</h2><p>Potential workshop subjects — dates to be announced.</p></div></div>'+
  '<div class="syl-live-topic-grid">'+LIVE_TOPIC_IDEAS.map((t,i)=>'<div class="syl-live-topic-card syl-live-topic-'+i+'"><span class="syl-live-topic-icon">'+ico(t.icon,26)+'</span><span class="syl-live-eyebrow">'+esc(t.category)+'</span><h3>'+esc(t.title)+'</h3><p>'+esc(t.description)+'</p><span class="syl-live-topic-status">'+ico('clock')+' Schedule pending</span></div>').join('')+'</div>'+
  '<div class="syl-live-how"><div><span class="syl-live-eyebrow">HOW LIVE LEARNING WORKS</span><h2>One class. Real progress.</h2></div><div class="syl-live-how-steps">'+[['01','Find a class','See confirmed dates, time and what you will learn.'],['02','Save the date','Add an upcoming session to your calendar.'],['03','Join & learn','Open the live meeting when the class is in session.']].map(([num,title,desc])=>'<div><span>'+num+'</span><strong>'+title+'</strong><p>'+desc+'</p></div>').join('')+'</div></div>'+
  '<div class="syl-live-utility"><div><span class="syl-live-eyebrow">LEARN BETWEEN LIVE CLASSES</span><h3>Keep growing at your own pace.</h3><p>Explore self-paced courses, or use the guided study assistant for a topic explanation.</p></div><div><button type="button" data-go="courses">Explore courses '+ico('arrow')+'</button><button type="button" data-go="ai">AI Tutor '+ico('arrow')+'</button></div></div>'+
  '<div class="syl-live-disclaimer">'+ico('info')+' Saved classes and calendar files are personal reminders, not confirmed enrolment or attendance. The Live Now status follows scheduled time and does not verify that an instructor has started broadcasting. Meeting links appear only for scheduled sessions with a valid link.</div>'+
 '</section>';
}
function instructor(){
return '<section class="screen instructor-screen theme-purple"><button class="back-btn" data-go="profile">'+ico('back')+' Profile</button><div class="screen-header"><h1>Instructor Studio</h1><p class="muted">Create course drafts for review before publishing.</p></div><div class="split"><div class="panel" style="padding:24px"><h2>New Course Draft</h2><form id="draft-form"><div class="field"><label>Course title</label><input name="title" maxlength="70" required placeholder="e.g. Introduction to IoT"/></div><div class="field"><label>Category</label><select name="cat">'+['Programming','AI & Automation','Cybersecurity','Design & Creative','Data & Analytics','Engineering & IoT','Business & Office'].map(c=>'<option>'+c+'</option>').join('')+'</select></div><div class="field"><label>Description</label><textarea name="desc" rows="4" required maxlength="300" placeholder="What students will learn"></textarea></div><button class="btn btn-primary btn-block">Save Course Draft '+ico('arrow')+'</button></form></div><div><div class="panel" style="padding:22px"><h2>My Drafts</h2><p class="small muted">Saved in this browser only; publishing requires a secure instructor backend.</p>'+(state.drafts.length?state.drafts.map((d,i)=>'<div class="module"><span class="module-num">'+(i+1)+'</span><span class="module-text"><strong>'+esc(d.title)+'</strong><small>'+esc(d.cat)+' · Draft</small></span>'+badge('Draft')+'</div>').join(''):'<div class="empty" style="padding:25px"><h3>No drafts yet</h3><p class="small muted">Your course drafts will appear here.</p></div>')+'</div></div></div></section>';}

function welcome(){
return '<section class="screen"><div class="hero" style="height:310px">'+img(PHOTOS.hero,'SYLearn students').replace('<img','<img class="hero-photo"')+'<div class="hero-content"><div class="heading-eyebrow">WELCOME TO SYLUTION LEARN</div><h1>Everything to learn.<br><span class="red">One place.</span></h1><p>Practical courses in technology, creative skills and digital business.</p><button class="btn btn-primary" data-go="signup">Get Started '+ico('arrow')+'</button></div></div>'+
heading('Your learning journey begins here','','')+
'<div class="grid-2 onboarding-features">'+[['book','Learn at your pace','Explore structured courses and practise when you want.'],['laptop','Develop real skills','Explore programming, design, technology and business.'],['brain','Study with AI','Explore guided study answers in Hausa or English.'],['trophy','Celebrate progress','Track chapters you study and record eligible knowledge-check results.']].map(([i,t,d])=>'<div class="panel" style="padding:20px"><div class="red">'+ico(i,28)+'</div><h3 class="mt-2">'+t+'</h3><p class="muted small">'+d+'</p></div>').join('')+'</div><div class="row gap-2 mt-3"><button class="btn btn-primary" data-go="signup">Create Learning Profile '+ico('arrow')+'</button><button class="btn btn-outline" data-go="home">Explore as Guest</button></div></section>';
}
function signup(){
return '<section class="screen"><button class="back-btn" data-go="welcome">'+ico('back')+' Back to welcome</button><div class="form-card"><div class="red">'+ico('cap',35)+'</div><h1>Start learning today</h1><p class="muted">Personalise your learning profile to explore courses and save study preferences on this device.</p><form id="signup-form"><div class="field"><label for="student-name">Your name</label><input id="student-name" name="name" required maxlength="60" placeholder="Your full name"/></div><div class="field"><label for="student-goal">What would you like to learn?</label><select name="goal" id="student-goal"><option>Programming</option><option>AI & Automation</option><option>Design & Creative</option><option>Data & Analytics</option><option>Engineering & IoT</option><option>Cybersecurity</option><option>Business & Office</option></select></div><div class="field"><label for="student-language">Explanations in</label><select id="student-language" name="preferred"><option>Hausa</option><option>English</option></select></div><button class="btn btn-primary btn-block" type="submit">Continue to SYLearn '+ico('arrow')+'</button></form><p class="fine-print mt-3">Your profile is saved on this device. Secure email or Google sign-in is not connected yet.</p><button class="btn btn-light btn-block mt-2" data-go="home">Continue as Guest</button></div></section>';
}

function overlay(){
if(!state.modal)return '';
const data={pro:['SYLearn Membership','Paid subscriptions are not available yet. You can currently explore available courses and scheduled live learning without entering payment details.'],help:['Help & Support','Use the navigation bar to explore courses, listen to sample lessons, practise with CBT, and save your preferences. If you encounter an issue, contact the SYLUTION team when support channels are launched.'],about:['About SYLearn','SYLearn is a digital skills academy by SYLUTION for programming, AI, engineering, design, data and professional growth. Learning records are saved in the browser until secure student accounts are connected.'],payment:['Checkout unavailable','Online payment and enrollment verification are not connected. No payment is being requested.'],session:['Class Reminder','Only confirmed live classes appear in the Live Academy schedule. Add an announced class to your calendar for reminders.']}[state.modal]||['Information','This feature is not yet available.'];
return '<div class="modal-layer" data-action="close-modal"><div class="modal" role="dialog" aria-modal="true" aria-label="'+data[0]+'"><div class="row-between mb-3"><h2>'+data[0]+'</h2><button class="icon-button" data-action="close-modal" aria-label="Close">'+ico('close')+'</button></div><p class="muted">'+data[1]+'</p><button class="btn btn-primary btn-block" data-action="close-modal">Understood</button></div></div>';
}
function render(){
const pages={ytassessment:ASSESS_UI.assessment,ytcompletion:ASSESS_UI.certificate,ytlibrary:VIDEO_UI.library,ytcourse:VIDEO_UI.course,ytwatch:VIDEO_UI.watch,home,courses,detail,lesson,ai,exam,results,progress,profile,saved,certificates,downloads,account,billing,notifications,live,instructor,welcome,signup};
const watching=state.page==='ytwatch';
document.body.classList.toggle('syl-video-immersive-active',watching);
const theme=document.querySelector('meta[name="theme-color"]');if(theme)theme.setAttribute('content',watching?'#05070d':'#ffffff');
root.innerHTML=watching
 ?'<div class="syl-immersive-app">'+(pages[state.page]||home)()+'</div>'
 :'<div class="app-shell">'+header()+'<main class="container">'+(pages[state.page]||home)()+'</main>'+footer()+navBar()+overlay()+'</div>';
if(state.page==='exam')tickClock();
if(watching)window.SYLUTION_PLAYER?.attach?.();
}
function speak(text,code){
if(!('speechSynthesis' in window)){toast('Audio playback is not supported in this browser.');return}
window.speechSynthesis.cancel();const utter=new SpeechSynthesisUtterance(text);utter.lang=code||'en-US';utter.rate=.88;utter.pitch=1;utter.onend=()=>{state.lessonPlaying=false};window.speechSynthesis.speak(utter)
}
function recognition(langCode,cb){
const Speech=window.SpeechRecognition||window.webkitSpeechRecognition;
if(!Speech){toast('Speech recognition is not available in this browser. Please type the phrase.');return}
try{const recog=new Speech();recog.lang=langCode;recog.interimResults=false;recog.maxAlternatives=1;recog.onresult=e=>cb(e.results[0][0].transcript);recog.onerror=e=>toast('Microphone error: '+e.error+'. You can type instead.');recog.start();toast('Listening… please speak clearly.')}catch(e){toast('Could not access the microphone.')}
}
function tickClock(){
const el=document.getElementById('quiz-clock');if(!el||state.page!=='exam')return;const left=Math.max(0,Math.ceil((state.quizEnds-Date.now())/1000));el.textContent=String(Math.floor(left/60)).padStart(2,'0')+':'+String(left%60).padStart(2,'0');if(left===0)submitQuiz()
}
function submitQuiz(){state.quizResult=QUESTIONS.reduce((n,q,i)=>n+(state.answers[i]===q.a?1:0),0);state.quizSubmitted=true;nav('results')}
function favorite(id){
if(state.saved.includes(id))state.saved=state.saved.filter(x=>x!==id);else state.saved.push(id);
save('saved',state.saved);render();toast(state.saved.includes(id)?'Course saved to your profile.':'Course removed from saved list.');
}
document.addEventListener('click',e=>{
const b=e.target.closest('[data-go],[data-action]');if(!b)return;
const action=b.dataset.action;const go=b.dataset.go;const id=b.dataset.id;const val=b.dataset.value;
if(action&&action.startsWith('yt-')&&VIDEO_UI.action(action,b.dataset,{nav,render,toast}))return;
if(action&&action.startsWith('qa-')&&ASSESS_UI.action(action,b.dataset,{nav,render,toast}))return;
if(go){if(go==='ytcourse'&&id){VIDEO_UI.open(id,nav,render,toast);return}nav(go,id);return}
if(!action)return;
if(action==='live-tab'){state.liveTab=['upcoming','now','mine','past'].includes(val)?val:'upcoming';render();return}
if(action==='live-save'){
 const session=liveSessions().find(s=>s.id===id);
 if(!session){toast('Class is not available.');return}
 if(state.liveSaved.includes(id)){state.liveSaved=state.liveSaved.filter(x=>x!==id);toast('Class removed from your saved list.')}
 else{state.liveSaved=[...new Set([...state.liveSaved,id])];toast('Saved on this device — not an official class registration.')}
 save('liveSaved',state.liveSaved);render();return
}
if(action==='live-join'){
 const session=liveSessions().find(s=>s.id===id);
 if(!session||livePhase(session)!=='live'||!liveMeetingUrl(session)){toast('This live class is not open yet.');return}
 window.open(liveMeetingUrl(session),'_blank','noopener,noreferrer');return
}
if(action==='live-calendar'){
 const session=liveSessions().find(s=>s.id===id);
 if(!session){toast('Class schedule unavailable.');return}
 const stamp=d=>new Date(d).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');
 const line=x=>String(x||'').replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
 const date=new Date(),message='SYLearn Live Academy — '+session.title;
 const calendar=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//SYLUTION//SYLearn Live Academy//EN','BEGIN:VEVENT','UID:'+line(session.id)+'@sylutionacademy.vercel.app','DTSTAMP:'+stamp(date),'DTSTART:'+stamp(session.startAt),'DTEND:'+stamp(session.endAt),'SUMMARY:'+line(message),'DESCRIPTION:'+line(session.description||'Live course workshop'),'BEGIN:VALARM','TRIGGER:-PT30M','ACTION:DISPLAY','DESCRIPTION:Live class begins soon','END:VALARM','END:VEVENT','END:VCALENDAR'].join('\r\n');
 try{
  const url=URL.createObjectURL(new Blob([calendar],{type:'text/calendar;charset=utf-8'}));
  const anchor=document.createElement('a');anchor.href=url;anchor.download='SYLearn-'+session.id+'.ics';
  anchor.style.display='none';document.body.appendChild(anchor);anchor.click();anchor.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Calendar file created. Import it to set a reminder.');
 }catch(e){toast('Calendar download is unavailable in this browser.')}
 return
}
if(action==='profile-hub'){state.learningFilter=['active','complete','saved','all'].includes(val)?val:'active';nav('progress');return}
if(action==='profile-remove-photo'){
 if(!state.user?.avatar)return;
 state.user={...state.user,avatar:''};save('user',state.user);render();toast('Profile photo removed from this device.');return
}
if(action==='profile-export'){
 const records={},fixedKeys=['sylution_user','sylution_yt-progress','sylution_yt-saved','sylution_liveSaved','sylution_completed','sylution_enrolled','sylution_saved','sylution-course-assessments-v1'];
 try{
  for(const key of fixedKeys){const value=localStorage.getItem(key);if(value!==null)records[key]=value}
  for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);
    if(/^sylution_yt-note-[a-z0-9_-]+-\d+$/i.test(key)){
      const value=localStorage.getItem(key);if(value!==null)records[key]=value.slice(0,6000);
    }
  }
  const backup={format:'sylearn-learning-backup',version:1,createdAt:new Date().toISOString(),records};
  const url=URL.createObjectURL(new Blob([JSON.stringify(backup,null,2)],{type:'application/json'}));
  const link=document.createElement('a');link.href=url;link.download='SYLearn-learning-backup.json';link.style.display='none';
  document.body.appendChild(link);link.click();link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1500);
  toast('Learning backup prepared for download.');
 }catch(e){toast('Backup download is not available in this browser.')}
 return
}
if(action==='learning-filter'){state.learningFilter=['active','complete','saved','all'].includes(val)?val:'active';render();return}
if(action==='learning-resume'){
 if(!VIDEO.select(String(id||''))){toast('Course unavailable.');return}
 VIDEO_UI.action('yt-start',{}, {nav,render,toast});return
}
if(action==='qa-record-open'){if(VIDEO.select(id))nav('ytcompletion',id);return}
if(action==='elite-search'){if(state.page!=='home')nav('home');requestAnimationFrame(()=>document.getElementById('home-search')?.focus());return}
 if(action==='home-video-filter'){VIDEO.state.items=VIDEO.curated.slice();VIDEO.state.status='curated';VIDEO.state.category=val||'All';VIDEO.state.sort='featured';nav('courses');return}
if(action==='category'){if(val==='Live Classes'){nav('live');return}if(val==='Exams'){nav('exam');return}state.category=val;nav('courses');return}
if(action==='hero-slide'){state.heroIndex=Number(b.dataset.index)||0;render();return}
if(action==='favorite'){favorite(id);return}
if(action==='clear-filter'){state.category='All';state.search='';state.sort='popular';render();return}
if(action==='home-search'){const x=document.getElementById('home-search');state.search=x?x.value:'';state.category='All';nav('courses');return}
if(action==='detail-tab'){state.detailTab=val;render();return}
if(action==='lesson-tab'){state.lessonTab=val;render();return}
if(action==='enroll'){const c=course(id);if(!state.enrolled.includes(id)){state.enrolled.push(id);save('enrolled',state.enrolled)}nav('lesson',id);return}
if(action==='lesson-audio'){state.lessonPlaying=true;render();speak('Welcome to '+course(state.courseId).title+'. Let us begin by reviewing the essential concepts and then practising with examples.','en-US');return}
if(action==='complete-lesson'){state.completed[id]=100;save('completed',state.completed);if(!state.enrolled.includes(id)){state.enrolled.push(id);save('enrolled',state.enrolled)}render();toast('Great work! Lesson progress saved.');return}
if(action==='prompt'){state.chat.push({from:'user',text:val},{from:'ai',text:respond(val)});save('chat',state.chat);render();return}
if(action==='speech-chat'){recognition(state.user.preferred==='Hausa'?'ha-NG':'en-US',val=>{const f=document.querySelector('#ai-form input');if(f)f.value=val});return}
if(action==='say-phrase'){speak(lang().phrase,lang().code);return}
if(action==='record'){recognition(lang().code,checkPronunciation);return}
if(action==='reset-pronounce'){state.pronounce='';render();return}
if(action==='answer'){state.answers[state.quizIndex]=Number(b.dataset.index);render();return}
if(action==='quiz-next'){state.quizIndex=Math.min(QUESTIONS.length-1,state.quizIndex+1);render();return}
if(action==='quiz-prev'){state.quizIndex=Math.max(0,state.quizIndex-1);render();return}
if(action==='quiz-submit'){submitQuiz();return}
if(action==='quiz-retake'){state.quizIndex=0;state.answers={};state.quizEnds=Date.now()+30*60*1000;state.quizResult=0;nav('exam');return}
if(action==='pro'){state.modal='pro';render();return}
if(action==='help'||action==='about'){state.modal=action;render();return}
if(action==='session-alert'){state.modal='session';render();return}
if(action==='close-modal'){if(b.classList&&b.classList.contains('modal-layer')&&e.target!==b)return;state.modal=null;render();return}
});
document.addEventListener('submit',e=>{
if(e.target.id==='yt-search-form'){e.preventDefault();VIDEO_UI.startSearch(e.target,()=>{if(['courses','ytlibrary'].includes(state.page))render()});nav('courses');return}
if(e.target.id==='home-search-form'){e.preventDefault();const q=String(new FormData(e.target).get('search')||'').trim();VIDEO.state.category='All';VIDEO.state.sort='featured';nav('courses');if(q.length>=2)VIDEO.search(q,'video').then(()=>{if(state.page==='courses')render()});return}
if(e.target.id==='course-search'){e.preventDefault();state.search=String(new FormData(e.target).get('search')||'');render();return}
if(e.target.id==='ai-form'){e.preventDefault();const f=new FormData(e.target);const q=String(f.get('message')||'').trim();if(!q)return;state.chat.push({from:'user',text:q},{from:'ai',text:respond(q)});save('chat',state.chat);render();setTimeout(()=>window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'}),0);return}
if(e.target.id==='pronounce-form'){e.preventDefault();checkPronunciation(String(new FormData(e.target).get('spoken')||''));return}
if(e.target.id==='signup-form'){e.preventDefault();const data=new FormData(e.target);state.user={name:String(data.get('name')||'Learner').trim().slice(0,60),preferred:String(data.get('preferred')||'Hausa')};save('user',state.user);state.category=String(data.get('goal')||'All');nav('courses');toast('Welcome to SYLearn, '+state.user.name+'!');return}
if(e.target.id==='account-form'){e.preventDefault();const f=new FormData(e.target);state.user={...state.user,name:String(f.get('name')||'Learner').trim().slice(0,60),preferred:['Hausa','English'].includes(String(f.get('preferred')))?String(f.get('preferred')):'Hausa'};save('user',state.user);nav('profile');toast('Account preferences saved on this device.');return}
if(e.target.id==='draft-form'){e.preventDefault();const f=new FormData(e.target);state.drafts.push({title:String(f.get('title')).slice(0,70),cat:String(f.get('cat')),desc:String(f.get('desc')).slice(0,300)});save('drafts',state.drafts);render();toast('Your course draft is saved locally.');return}
});
document.addEventListener('change',e=>{
if(e.target.id==='syl-profile-photo'){
 const file=e.target.files?.[0];if(!file)return;
 if(!/^image\/(png|jpeg|webp)$/.test(file.type)||file.size>5000000){toast('Choose a JPG, PNG or WebP photo smaller than 5 MB.');return}
 const reader=new FileReader();
 reader.onerror=()=>toast('Could not read this photo.');
 reader.onload=()=>{
  const image=new Image();
  image.onerror=()=>toast('This image could not be opened.');
  image.onload=()=>{
   try{
    const canvas=document.createElement('canvas'),max=192,scale=Math.min(1,max/Math.max(image.width,image.height));
    canvas.width=Math.max(1,Math.round(image.width*scale));
    canvas.height=Math.max(1,Math.round(image.height*scale));
    const ctx=canvas.getContext('2d');if(!ctx)throw Error('Missing canvas context');
    ctx.fillStyle='#ffffff';ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(image,0,0,canvas.width,canvas.height);
    const value=canvas.toDataURL('image/jpeg',.78);
    if(!profilePhoto({avatar:value}))throw Error('Photo is too large to save');
    const previous=state.user;
    try{state.user={...previous,avatar:value};localStorage.setItem('sylution_user',JSON.stringify(state.user))}
    catch(err){state.user=previous;throw err}
    render();toast('Your profile photo is saved on this device.');
   }catch(err){toast('Could not save this photo. Try a smaller image.')}
  };
  image.src=reader.result;
 };
 reader.readAsDataURL(file);
 return
}
if(e.target.id==='syl-profile-restore'){
 const file=e.target.files?.[0];if(!file)return;
 if(file.size>1000000||!/(?:\.json$|json$)/i.test(file.name||'') ){toast('Choose a SYLearn JSON backup smaller than 1 MB.');return}
 const reader=new FileReader();
 reader.onerror=()=>toast('Could not read this backup.');
 reader.onload=()=>{
  try{
   const parsed=JSON.parse(String(reader.result||''));
   if(parsed.format!=='sylearn-learning-backup'||parsed.version!==1||!parsed.records||typeof parsed.records!=='object'||Array.isArray(parsed.records))throw Error('Unrecognized SYLearn backup');
   const allow=['sylution_user','sylution_yt-progress','sylution_yt-saved','sylution_liveSaved','sylution_completed','sylution_enrolled','sylution_saved','sylution-course-assessments-v1'];
   const pairs=Object.entries(parsed.records).filter(([k,v])=>(allow.includes(k)||/^sylution_yt-note-[a-z0-9_-]+-\d+$/i.test(k))&&typeof v==='string'&&v.length<300000);
   if(!pairs.length||pairs.length>300)throw Error('Backup does not contain valid records');
   for(const [key,val] of pairs){
    if(key.startsWith('sylution_yt-note-')){
      if(val.length>6000)throw Error('Invalid note length');
      continue;
    }
    const data=JSON.parse(val),isObject=data&&typeof data==='object'&&!Array.isArray(data);
    if(key==='sylution_user'){
      if(!isObject||typeof data.name!=='string'||data.name.length>60||!['Hausa','English'].includes(data.preferred||'Hausa'))throw Error('Invalid profile data');
      if(data.avatar&& !profilePhoto(data))throw Error('Invalid profile picture');
    }else if(['sylution_yt-saved','sylution_enrolled','sylution_saved','sylution_liveSaved'].includes(key)){
      if(!Array.isArray(data)||data.length>300||!data.every(x=>typeof x==='string'&&x.length<=100))throw Error('Invalid saved list');
    }else if(key==='sylution_yt-progress'){
      if(!isObject||Object.keys(data).length>300||!Object.values(data).every(x=>Array.isArray(x)&&x.length<=1000&&x.every(i=>Number.isInteger(i)&&i>=0&&i<1000)))throw Error('Invalid progress records');
    }else if(['sylution_completed','sylution-course-assessments-v1'].includes(key)){
      if(!isObject||Object.keys(data).length>300)throw Error('Invalid learning records');
    }
   }
   if(!window.confirm('Restore '+pairs.length+' SYLearn records? Matching records on this device will be replaced.'))return;
   const previous=pairs.map(([key])=>[key,localStorage.getItem(key)]);
   try{for(const [key,val] of pairs)localStorage.setItem(key,val)}
   catch(err){for(const [key,value] of previous){try{if(value===null)localStorage.removeItem(key);else localStorage.setItem(key,value)}catch(e){}}throw err}
   toast('Backup restored. Reloading your learning records.');
   location.reload();
  }catch(err){toast('Could not restore this file. Please use a valid SYLearn backup.')}
 };
 reader.readAsText(file);
 return
}
if(e.target.id==='sort-courses'){state.sort=e.target.value;render()}
if(e.target.id==='speaking-language'){state.lang=e.target.value;state.pronounce='';render()}
});
document.addEventListener('keydown',e=>{
if(e.target.id==='home-search'&&e.key==='Enter'){e.preventDefault();state.search=e.target.value;state.category='All';nav('courses')}
if(e.key==='Escape'&&state.modal){state.modal=null;render()}
});
window.addEventListener('popstate',route);
window.addEventListener('hashchange',route);
setInterval(()=>{if(state.page==='exam')tickClock()},1000);
function route(){
const [page,arg]=decodeURI((location.hash||'#/home').slice(2)).split('/');
const supported=['ytassessment','ytcompletion','ytlibrary','ytcourse','ytwatch','home','courses','detail','lesson','ai','exam','results','progress','profile','saved','certificates','downloads','account','billing','notifications','live','instructor','welcome','signup'];
if(page&&supported.includes(page)){
 state.page=page;
 if(arg){
  if(['detail','lesson'].includes(page))state.courseId=arg;
  
  if(['ytcourse','ytwatch','ytassessment','ytcompletion'].includes(page)&&VIDEO.state.selected?.id!==arg)VIDEO.select(arg);
 }
}else state.page='home';
render();
if((page==='ytcourse'||page==='ytwatch')&&VIDEO.state.selected?.type==='playlist'&&!VIDEO.state.playlistLessons.length){
 VIDEO.getLessons().then(()=>{if(state.page===page)render()})
}
}
route();
if(VIDEO&&typeof VIDEO.verifyCatalog==='function')VIDEO.verifyCatalog().then(changed=>{if(changed&&['home','courses','ytlibrary','ytcourse','ytwatch'].includes(state.page))render()}).catch(()=>{});
})();