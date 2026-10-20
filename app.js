(function sylutionApp(){
'use strict';
const root=document.getElementById('app');
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
{id:'english',title:'English for Beginners',short:'English',desc:'Build confidence in speaking English step by step.',cat:'Languages',level:'Beginner',price:0,rating:'4.8',students:'12K',image:PHOTOS.english,lessons:12,mins:180,teacher:'SYLUTION Language Academy',theme:'#fee2e4',highlights:['Everyday conversations','Practical grammar','Listening and pronunciation','Useful vocabulary']},
{id:'arabic',title:'Arabic Essentials',short:'Arabic',desc:'Learn Arabic for real-life conversations.',cat:'Languages',level:'Beginner',price:12000,rating:'4.7',students:'8K',image:PHOTOS.arabic,lessons:16,mins:200,teacher:'SYLUTION Language Academy',highlights:['Arabic alphabet','Reading and pronunciation','Daily dialogue','Writing basics']},
{id:'python',title:'Python for Everyone',short:'Python',desc:'Learn programming with Python from scratch.',cat:'Digital Skills',level:'Beginner',price:15000,rating:'4.7',students:'9K',image:PHOTOS.python,lessons:18,mins:240,teacher:'SYLUTION Tech School',highlights:['Variables and data types','Loops and functions','Hands-on exercises','Build a small project']},
{id:'jamb',title:'JAMB Preparation',short:'JAMB Prep',desc:'Practice with CBT questions and effective study methods.',cat:'Exams',level:'Intermediate',price:10000,rating:'4.6',students:'7K',image:PHOTOS.jamb,lessons:20,mins:260,teacher:'SYLUTION Academic Team',highlights:['Timed CBT practice','English revision','Study techniques','Detailed answer review']},
{id:'design',title:'Graphic Design Fundamentals',short:'Graphic Design',desc:'Learn visual design principles and creative tools.',cat:'Digital Skills',level:'Beginner',price:14000,rating:'4.8',students:'11K',image:PHOTOS.design,lessons:15,mins:220,teacher:'SYLUTION Creative School',highlights:['Color and typography','Layouts and hierarchy','Social media design','Portfolio project']},
{id:'excel',title:'Excel for Everyone',short:'Excel',desc:'Master practical Excel skills for work and study.',cat:'Digital Skills',level:'Beginner',price:12000,rating:'4.7',students:'9K',image:PHOTOS.excel,lessons:14,mins:200,teacher:'SYLUTION Tech School',highlights:['Formulas and functions','Sorting and filtering','Visual charts','Business spreadsheets']},
{id:'french',title:'French for Beginners',short:'French',desc:'Speak French in daily situations with confidence.',cat:'Languages',level:'Beginner',price:0,rating:'4.8',students:'5K',image:PHOTOS.french,lessons:12,mins:180,teacher:'SYLUTION Language Academy',highlights:['Greetings','Basic vocabulary','Listening practice','Useful expressions']},
{id:'spanish',title:'Spanish Conversations',short:'Spanish',desc:'Practice pronunciation and conversational Spanish.',cat:'Languages',level:'Beginner',price:0,rating:'4.8',students:'4K',image:PHOTOS.spanish,lessons:12,mins:180,teacher:'SYLUTION Language Academy',highlights:['Everyday phrases','Speaking practice','Vocabulary','Listening']},
{id:'hausa',title:'Learn Hausa',short:'Hausa',desc:'Learn Hausa greetings, grammar and conversation.',cat:'Languages',level:'Beginner',price:0,rating:'4.9',students:'6K',image:PHOTOS.hausa,lessons:12,mins:180,teacher:'SYLUTION Language Academy',highlights:['Basic greetings','Common phrases','Reading and writing','Local conversations']},
{id:'science',title:'Science Foundations',short:'Science',desc:'Explore science through simple explanations and examples.',cat:'Academics',level:'Beginner',price:0,rating:'4.6',students:'3K',image:PHOTOS.science,lessons:10,mins:150,teacher:'SYLUTION Academic Team',highlights:['Scientific method','Basic chemistry','Biology','Science quiz']},
{id:'business',title:'Entrepreneurship Basics',short:'Business',desc:'Learn to validate ideas and start a sustainable business.',cat:'Business',level:'Beginner',price:0,rating:'4.8',students:'2K',image:PHOTOS.business,lessons:10,mins:160,teacher:'SYLUTION Business School',highlights:['Business ideas','Customers and markets','Simple budgets','Go-to-market basics']},
{id:'robotics',title:'Robotics and IoT',short:'Robotics',desc:'Start building practical electronics and smart devices.',cat:'Engineering',level:'Intermediate',price:16000,rating:'4.9',students:'2K',image:PHOTOS.python,lessons:14,mins:260,teacher:'SYLUTION Engineering',highlights:['Sensors and microcontrollers','ESP32 basics','Practical projects','IoT dashboards']}
];
const LANGS=[
{key:'english',label:'English',flag:'🇬🇧',code:'en-US',phrase:'How are you today?',translated:'Yaya kake yau?',answer:'How are you today?'},
{key:'arabic',label:'Arabic',flag:'🇸🇦',code:'ar-SA',phrase:'كيف حالك؟',translated:'Yaya kake?',answer:'كيف حالك'},
{key:'french',label:'French',flag:'🇫🇷',code:'fr-FR',phrase:'Comment allez-vous ?',translated:'Yaya kake?',answer:'Comment allez vous'},
{key:'spanish',label:'Spanish',flag:'🇪🇸',code:'es-ES',phrase:'¿Cómo estás?',translated:'Yaya kake?',answer:'Como estas'},
{key:'hausa',label:'Hausa',flag:'🇳🇬',code:'ha-NG',phrase:'Ina kwana?',translated:'Good morning',answer:'Ina kwana'}
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
const state={page:'home',category:'All',search:'',sort:'popular',courseId:'english',heroIndex:0,detailTab:'overview',lessonTab:'notes',lang:'spanish',saved:read('saved',[]),enrolled:read('enrolled',['english']),completed:read('completed',{}),user:read('user',{name:'Amina Yusuf',preferred:'Hausa'}),chat:read('chat',[{from:'ai',text:'Hi there! 👋 I’m your SYLUTION Learn AI Tutor preview. Ask about English, Python, Mathematics or study skills. You can ask me to explain in Hausa!'}]),quizIndex:0,answers:{},quizEnds:0,quizSubmitted:false,quizResult:0,modal:null,lessonPlaying:false,pronounce:'',drafts:read('drafts',[]),toastTimer:null};
const money=n=>n?'₦'+n.toLocaleString('en-NG'):'Free';
const course=id=>COURSES.find(c=>c.id===id)||COURSES[0];
const lang=()=>LANGS.find(x=>x.key===state.lang)||LANGS[0];
const ct=id=>state.completed[id]||0;
const countCompleted=()=>Object.values(state.completed).filter(n=>n>=100).length;
const nav=(page,arg)=>{state.page=page;if(arg){if(['detail','lesson'].includes(page))state.courseId=arg;if(['track','speaking'].includes(page))state.lang=arg}state.modal=null;state.lessonPlaying=false;const hash='#/'+page+(arg?'/'+arg:'');if(location.hash!==hash)history.pushState(null,'',hash);render();window.scrollTo({top:0,behavior:'instant'})};
const toast=message=>{document.querySelector('.toast')?.remove();const el=document.createElement('div');el.className='toast';el.setAttribute('role','status');el.textContent=message;document.body.appendChild(el);clearTimeout(state.toastTimer);state.toastTimer=setTimeout(()=>el.remove(),3300)};
const badge=(text,cl)=>'<span class="badge '+(cl||'')+'">'+esc(text)+'</span>';
const heading=(title,link,pg)=>'<div class="section-head"><h2>'+title+'</h2>'+(link?'<button class="link" data-go="'+pg+'">'+link+' '+ico('arrow')+'</button>':'')+'</div>';
const img=(src,alt)=>'<img src="'+esc(src)+'" alt="'+esc(alt)+'" loading="lazy" onerror="this.style.opacity=0"/>';


const thumb=(c,klass)=>'<div class="thumb '+(klass||'')+'">'+img(c.image,c.title)+'<span class="thumb-overlay"></span><span class="course-art-title">'+esc(c.short)+'</span><span class="thumb-label">'+esc(c.level)+'</span></div>';
const favButton=id=>'<button class="favorite '+(state.saved.includes(id)?'saved':'')+'" aria-label="'+(state.saved.includes(id)?'Unsave course':'Save course')+'" data-action="favorite" data-id="'+id+'">'+ico('bookmark')+'</button>';
const card=c=>'<article class="course-card"><div class="course-image-wrap"><button class="course-image-button" data-go="detail" data-id="'+c.id+'" aria-label="Open '+esc(c.title)+'">'+thumb(c,'')+'</button>'+favButton(c.id)+'</div><div class="course-card-content"><span class="card-eyebrow">'+esc(c.cat)+' <span>·</span> '+esc(c.level)+'</span><button class="course-title" data-go="detail" data-id="'+c.id+'">'+esc(c.title)+'</button><p>'+esc(c.desc)+'</p><div class="course-card-bottom"><span class="rating"><span class="star">★</span> '+c.rating+' <span class="muted">· sample</span></span><span class="price">'+money(c.price)+'</span></div></div></article>';
const catData=[['Languages','book'],['Academics','cap'],['Digital Skills','laptop'],['Exams','file'],['Live Classes','radio']];
const categories=(active,go)=>'<div class="category-strip">'+(state.page==='courses'?[['All','menu'],...catData,['Business','users'],['Engineering','settings']]:catData).map(([name,icon])=>'<button class="category '+(active===name?'active':'')+'" data-action="category" data-value="'+name+'" data-target="'+go+'"><span class="category-circle">'+ico(icon)+'</span><span class="category-name">'+esc(name)+'</span></button>').join('')+'</div>';
const hero=(headline,emph,subtitle,action,photo)=>'<div class="hero elegant-hero"><div class="hero-content"><span class="hero-eyebrow">SYLUTION LEARN</span><h1>'+headline+'<br><span class="red">'+emph+'</span></h1><p>'+subtitle+'</p><button class="btn btn-primary" data-go="'+(action==='Languages'?'languages':'courses')+'">Explore '+action+' '+ico('arrow')+'</button></div>'+img(photo||PHOTOS.hero,'Learning at SYLUTION').replace('<img','<img class="hero-photo"')+'</div>';


const header=()=>'<header class="topbar"><div class="container topbar-inner"><button class="brand new-brand" data-go="home" aria-label="SYLUTION Learn home"><span class="brand-name">SYLUTION <strong>Learn</strong></span><span class="brand-caption">Learn. Build. Grow.</span></button><nav class="desktop-navigation" aria-label="Main sections"><button class="'+(state.page==='home'?'is-current':'')+'" data-go="home">Home</button><button class="'+(state.page==='courses'?'is-current':'')+'" data-go="courses">Courses</button><button class="'+(['languages','track','speaking'].includes(state.page)?'is-current':'')+'" data-go="languages">Languages</button><button class="'+(state.page==='exam'?'is-current':'')+'" data-go="exam">Exams</button></nav><div class="top-actions"><button class="icon-button" data-go="notifications" aria-label="Notifications">'+ico('bell')+'<span class="dot">3</span></button><button class="icon-button header-saved" data-go="saved" aria-label="Saved courses">'+ico('bookmark')+'</button><button data-go="profile" class="profile-avatar-button" aria-label="Profile">'+img(PHOTOS.face,'Your profile').replace('<img','<img class="avatar"')+'</button></div></div></header>';
const navBar=()=>'<div class="nav-wrapper"><nav class="bottom-nav" aria-label="Main navigation">'+[['home','home','Home'],['courses','book','Courses'],['ai','brain','AI Tutor'],['progress','chart','Progress'],['profile','user','Profile']].map(([pg,icon,label])=>'<button class="nav-item '+(state.page===pg||(pg==='courses'&&['detail','lesson','languages','track','speaking','exam','results','live','instructor','saved'].includes(state.page))?'active':'')+'" data-go="'+pg+'" aria-label="'+label+'">'+ico(icon)+'<span>'+label+'</span></button>').join('')+'</nav></div>';
const footer=()=>'<footer class="footer">SYLUTION <strong style="color:var(--red)">Learn</strong><p>Learn. Build. Grow. — A product of SYLUTION LTD</p><span class="fine-print">Preview experience: demonstration courses, prices, reviews and student counts are illustrative.</span></footer>';


function home(){
const current=course(state.enrolled[0]||'english'),featured=[COURSES[7],COURSES[2],COURSES[3],COURSES[4]];
const slides=[
{label:'DISCOVER YOUR POTENTIAL',a:'A brighter you',b:'through better learning.',description:'Practical skills. Expert guidance. Real-world growth.',button:'Explore courses',page:'courses',image:PHOTOS.hero},
{label:'LEARN WITHOUT LIMITS',a:'A new language.',b:'A whole new world.',description:'Start speaking with confidence, one lesson at a time.',button:'Discover languages',page:'languages',image:PHOTOS.french},
{label:'SHAPE YOUR FUTURE',a:'Small steps.',b:'Extraordinary skills.',description:'Develop tech, creative and business skills that matter.',button:'Browse digital skills',page:'courses',image:PHOTOS.python}
];
const slide=slides[state.heroIndex||0];
return '<section class="screen home-screen">'+
'<form class="searchbar home-search" id="home-search-form">'+ico('search')+'<input id="home-search" name="search" aria-label="Search courses" placeholder="Search courses, skills or topics..." value="'+esc(state.search)+'"/><button type="submit" class="search-filter-button" aria-label="Search courses">'+ico('sliders')+'</button></form>'+
categories('Languages','courses')+
'<div class="hero-carousel"><div class="hero premium-home-banner"><div class="hero-content"><div class="banner-eyebrow">'+esc(slide.label)+'</div><h1>'+esc(slide.a)+'<br><span class="red">'+esc(slide.b)+'</span></h1><p>'+esc(slide.description)+'</p><button class="btn btn-primary" data-go="'+slide.page+'">'+esc(slide.button)+' '+ico('arrow')+'</button></div>'+img(slide.image,slide.description).replace('<img','<img class="banner-photo"')+'<span class="banner-photo-fade"></span><span class="banner-doodle">Learn.<br>Build.<br>Grow.<i></i></span></div><div class="carousel-dots" aria-label="Featured categories">'+slides.map((x,i)=>'<button class="carousel-dot '+((state.heroIndex||0)===i?'active':'')+'" data-action="hero-slide" data-index="'+i+'" aria-label="Show banner '+(i+1)+'"></button>').join('')+'</div></div>'+
'<div class="home-highlights"><span>'+ico('check')+' Learn at your own pace</span><span>'+ico('globe')+' World languages</span><span>'+ico('brain')+' AI-powered support</span></div>'+
heading('Continue Learning','See all','progress')+
'<div class="resume-card"><button class="resume-image" data-go="lesson" data-id="'+current.id+'" aria-label="Continue '+esc(current.title)+'">'+img(current.image,current.title)+'<span class="resume-image-tag">'+esc(current.level)+'</span></button><div class="resume-body"><span class="resume-eyebrow">'+esc(current.cat)+' · Lesson 1 of '+current.lessons+'</span><h3>'+esc(current.title)+'</h3><p>'+esc(current.desc)+'</p><div class="resume-meter"><div class="progress-track"><div class="progress-fill" style="width:'+ct(current.id)+'%"></div></div><span>'+ct(current.id)+'%</span></div><div class="resume-actions"><button class="btn btn-primary" data-go="lesson" data-id="'+current.id+'">'+ico('play')+' Continue Learning</button><button class="resume-more" data-go="detail" data-id="'+current.id+'" aria-label="Course details">'+ico('more')+'</button></div></div></div>'+
heading('Popular Courses','See all','courses')+
'<div class="popular-list horizontal-scroll">'+featured.map(card).join('')+'</div>'+
heading('Explore What You Love','View categories','courses')+
'<div class="discovery-grid"><button class="discovery-card dc-languages" data-go="languages"><span class="discovery-icon">'+ico('globe')+'</span><strong>World Languages</strong><small>Speak a new language with confidence.</small><span class="discovery-flag">🇬🇧 🇫🇷 🇸🇦</span><span class="discovery-arrow">'+ico('arrow')+'</span></button><button class="discovery-card dc-exams" data-go="exam"><span class="discovery-icon">'+ico('file')+'</span><strong>Exam Preparation</strong><small>Learn, practise and build confidence.</small><span class="discovery-large-mark">A+</span><span class="discovery-arrow">'+ico('arrow')+'</span></button><button class="discovery-card dc-tech" data-go="courses"><span class="discovery-icon">'+ico('laptop')+'</span><strong>Technology & AI</strong><small>Future-ready digital skills.</small><span class="discovery-large-mark">&lt;/&gt;</span><span class="discovery-arrow">'+ico('arrow')+'</span></button><button class="discovery-card dc-ai" data-go="ai"><span class="discovery-icon">'+ico('brain')+'</span><strong>Meet Your AI Tutor</strong><small>Simple explanations when you need them.</small><span class="discovery-large-mark">✦</span><span class="discovery-arrow">'+ico('arrow')+'</span></button></div>'+
'<div class="languages-promo"><div><span class="promo-eyebrow">'+ico('globe')+' LANGUAGE LEARNING</span><h2>Say hello to <span class="red">new possibilities.</span></h2><p>Practise speaking, listening, reading and writing across multiple languages.</p><button class="btn btn-primary" data-go="languages">Explore languages '+ico('arrow')+'</button></div><div class="promo-language-orbs"><span>🇬🇧</span><span>🇸🇦</span><span>🇫🇷</span><span>🇪🇸</span><span>🇳🇬</span></div></div>'+
heading('Keep Moving Forward','','')+
'<div class="footer-tiles"><button class="footer-tile" data-go="ai"><span>'+ico('brain')+'</span><strong>Ask AI Tutor</strong><small>Questions made simple.</small>'+ico('arrow')+'</button><button class="footer-tile" data-go="exam"><span>'+ico('file')+'</span><strong>Practice Exams</strong><small>Try CBT-style questions.</small>'+ico('arrow')+'</button><button class="footer-tile" data-go="progress"><span>'+ico('chart')+'</span><strong>Your Progress</strong><small>Celebrate every step.</small>'+ico('arrow')+'</button></div></section>';
}


function courses(){
const search=state.search.toLowerCase().trim();
let list=COURSES.filter(c=>(state.category==='All'||c.cat===state.category)&&(c.title+' '+c.cat+' '+c.desc).toLowerCase().includes(search));
if(state.sort==='free')list=list.filter(c=>!c.price);
if(state.sort==='price')list.sort((a,b)=>a.price-b.price);
return '<section class="screen course-catalog"><div class="screen-header"><span class="page-eyebrow">THE COURSE LIBRARY</span><h1>Find your next <span class="red">big thing.</span></h1><p class="muted">Explore courses and discover the skills that excite you.</p></div>'+
'<form class="searchbar catalog-search" id="course-search">'+ico('search')+'<input name="search" aria-label="Search courses" placeholder="Search courses, skills or languages..." value="'+esc(state.search)+'"/><button type="submit" aria-label="Search courses">'+ico('sliders')+'</button></form>'+
categories(state.category,'courses')+
'<div class="catalog-tools"><div><h2>'+esc(state.category==='All'?'All Courses':state.category)+'</h2><p class="small muted">'+list.length+' sample learning paths</p></div><select class="select" id="sort-courses" aria-label="Sort courses"><option value="popular" '+(state.sort==='popular'?'selected':'')+'>Most popular</option><option value="free" '+(state.sort==='free'?'selected':'')+'>Free courses</option><option value="price" '+(state.sort==='price'?'selected':'')+'>Price: Low to high</option></select></div>'+
(list.length?'<div class="course-grid">'+list.map(card).join('')+'</div>':'<div class="empty">'+ico('search')+'<h3>No matching courses</h3><p class="muted">Try another topic or reset the filters.</p><button class="btn btn-primary" data-action="clear-filter">Reset filters</button></div>')+
'<div class="catalog-cta"><div><h2>Every great journey starts somewhere.</h2><p>Not sure where to begin? Explore languages or ask the tutor.</p></div><button class="btn btn-primary" data-go="languages">Explore Languages '+ico('arrow')+'</button></div></section>';
}

function detail(){
const c=course(state.courseId);const enrolled=state.enrolled.includes(c.id);
const tabs=[['overview','Overview'],['modules','Modules'],['reviews','Reviews'],['instructor','Instructor']];
return '<section class="screen"><button class="back-btn" data-go="courses">'+ico('back')+' All courses</button>'+
'<div class="detail-banner">'+img(c.image,c.title)+'<div class="detail-copy"><div class="heading-eyebrow" style="color:#ffc6ca">Featured course</div><h1>'+esc(c.title)+'</h1><p>'+esc(c.desc)+'</p></div></div>'+
'<div class="row-between mt-3 gap-2" style="flex-wrap:wrap"><div><h1>'+esc(c.title)+'</h1><p class="muted">'+esc(c.desc)+'</p></div>'+badge(c.level)+'</div>'+
'<div class="stats-inline"><span><span class="star">★</span><strong>'+c.rating+'</strong> (demo rating)</span><span>'+ico('users')+' Learners worldwide</span><span>'+ico('clock')+' '+c.lessons+' lessons</span><span>'+ico('cap')+' '+esc(c.level)+'</span></div>'+
'<div class="row gap-2" style="flex-wrap:wrap"><button class="btn btn-primary" data-action="enroll" data-id="'+c.id+'">'+(enrolled?'Continue Learning':'Enroll '+(c.price?'— '+money(c.price):'for Free'))+' '+ico('arrow')+'</button><button class="btn btn-outline" data-action="favorite" data-id="'+c.id+'">'+ico('heart')+' '+(state.saved.includes(c.id)?'Saved':'Save Course')+'</button></div>'+
'<div class="detail-tabs">'+tabs.map(([t,n])=>'<button class="detail-tab '+(state.detailTab===t?'active':'')+'" data-action="detail-tab" data-value="'+t+'">'+n+'</button>').join('')+'</div>'+
(state.detailTab==='overview'?'<h2 class="mb-2">About this course</h2><p class="muted">This practical course is organized into short, understandable lessons. Learn concepts, try real examples, practice with quizzes and build confidence at every stage.</p><div class="panel mt-3" style="padding:20px;background:#fff6f6"><h3 class="mb-2">What you will learn</h3><div class="grid-2">'+c.highlights.map(t=>'<div class="row gap-2 small">'+ico('check')+' '+esc(t)+'</div>').join('')+'</div></div>'+heading('Course Modules','View all','lesson')+modules(c,3):'')+
(state.detailTab==='modules'?heading('Course Modules')+modules(c,c.lessons):'')+
(state.detailTab==='reviews'?'<div class="panel" style="padding:24px"><h3>Student feedback</h3><p class="muted">Verified reviews will appear when real students complete the course. Ratings in the catalog are design placeholders.</p></div>':'')+
(state.detailTab==='instructor'?'<div class="panel" style="padding:24px"><h3>'+esc(c.teacher)+'</h3><p class="muted">The SYLUTION Learn teaching team develops structured, approachable courses with practice and assessments.</p><button class="btn btn-outline" data-go="instructor">Instructor Studio '+ico('arrow')+'</button></div>':'')+'</section>';
}
function modules(c,max){
let n=Math.min(max,c.lessons);
return Array.from({length:n},(_,i)=>'<button class="module w-full" data-go="lesson" data-id="'+c.id+'"><span class="module-num">'+(i+1)+'</span><span class="module-text" style="text-align:left"><strong>'+esc(i===0?'Getting Started with '+c.short:i===1?'Essential Concepts':i===2?'Practice and Real Examples':'Lesson '+(i+1)+': Learn and Apply')+'</strong><small>Lesson '+(i+1)+' · '+(i%2?12:9)+' min</small></span>'+ico('play')+'</button>').join('');
}
function lesson(){
const c=course(state.courseId);
const txt='Welcome to '+c.title+'. In this introductory lesson, we will explore the core ideas, see examples and then check your understanding. Learning improves with regular practice.';
return '<section class="screen"><button class="back-btn" data-go="detail" data-id="'+c.id+'">'+ico('back')+' '+esc(c.title)+'</button>'+
'<div class="lesson-visual">'+img(PHOTOS.video,'Learning session preview')+'<div class="play-overlay"><button class="play-round" aria-label="Play audio lesson" data-action="lesson-audio">'+ico(state.lessonPlaying?'pause':'play')+'</button><h2 style="max-width:80%">Introduction and Basic Concepts</h2><span class="small">Audio-led demonstration lesson</span></div></div>'+
'<div class="lesson-body"><p class="small muted bold">'+esc(c.title.toUpperCase())+' › MODULE 1</p><div class="row-between" style="align-items:flex-start"><div><h1>1.1 Introduction and Basic Concepts</h1><p class="muted">'+esc(c.desc)+'</p></div>'+badge(ct(c.id)+'% complete')+'</div>'+
'<div class="progress-track mt-3"><div class="progress-fill" style="width:'+ct(c.id)+'%"></div></div><div class="detail-tabs">'+[['notes','Notes'],['resources','Resources'],['transcript','Transcript']].map(([k,t])=>'<button class="detail-tab '+(state.lessonTab===k?'active':'')+'" data-action="lesson-tab" data-value="'+k+'">'+t+'</button>').join('')+'</div>'+
(state.lessonTab==='notes'?'<div class="panel" style="padding:20px"><h3>Lesson Notes</h3><ul class="note-list list-style"><li>Learn the essential terms and concepts.</li><li>Apply the ideas to practical, everyday examples.</li><li>Practice consistently and review your progress.</li><li>Ask the AI Tutor if something is unclear.</li></ul></div>':'')+
(state.lessonTab==='resources'?'<div class="panel" style="padding:20px"><h3>Resources</h3><p class="muted">This is the interactive course template. Verified course handouts and real video lessons can be added by instructors.</p><button class="btn btn-outline" data-go="ai">Ask AI Tutor '+ico('arrow')+'</button></div>':'')+
(state.lessonTab==='transcript'?'<div class="panel" style="padding:20px"><h3>Audio Transcript</h3><p>'+esc(txt)+'</p></div>':'')+
'<div class="row mt-3 gap-2" style="flex-wrap:wrap"><button class="btn btn-muted" data-action="lesson-audio">'+ico('volume')+' Read Aloud</button><button class="btn btn-primary" data-action="complete-lesson" data-id="'+c.id+'">'+ico('check')+' Mark Lesson Complete</button><button class="btn btn-outline" data-go="exam">Practice Questions '+ico('arrow')+'</button></div><p class="fine-print mt-2">Video thumbnail is illustrative. The working preview includes spoken text where supported by your browser; actual instructor videos must be uploaded separately.</p></div></section>';
}

function ai(){
return '<section class="screen chat-container ai-screen"><div class="page-intro"><div><div class="eyebrow-light"><span class="status-spark">✦</span> YOUR PERSONAL LEARNING COMPANION</div><h1>Learn smarter with <span class="red">AI Tutor.</span></h1><p class="muted">Questions are the beginning of something great.</p></div></div>'+
'<div class="ai-cover"><div class="ai-cover-text"><div class="hero-kicker"><span class="kicker-beam"></span> CURIOUS MINDS WELCOME</div><h2>Your study buddy,<br>anytime you need it.</h2><p>Ask for an explanation in Hausa or English, practise new concepts and grow one question at a time.</p></div><div class="ai-cover-symbol" aria-hidden="true">'+ico('brain')+'<span>✦</span></div></div>'+
'<div class="ai-conversation-head"><span class="bot-avatar">'+ico('brain')+'</span><span><strong>SYLUTION Study Companion</strong><small>Interactive demonstration · rule-based responses</small></span>'+badge('DEMO','muted-badge')+'</div>'+
'<div class="chat-log" id="chat-log" aria-live="polite">'+state.chat.map(m=>'<div class="bubble-row '+(m.from==='user'?'user':'')+'">'+(m.from==='ai'?'<div class="bot-avatar">'+ico('brain')+'</div>':'')+'<div class="bubble '+(m.from==='ai'?'ai':'user')+'">'+esc(m.text)+'</div></div>').join('')+'</div>'+
'<div class="section-title-group">'+heading('A little inspiration','','')+'<p class="section-subtitle">Not sure where to start? Try one of these.</p></div>'+
'<div class="suggest-grid">'+[['translate','Explain this in Hausa'],['file','Give me practice questions'],['edit','Correct my grammar'],['brain','Teach me Python basics']].map(([i,t])=>'<button class="suggest" data-action="prompt" data-value="'+esc(t)+'">'+ico(i)+'<span>'+t+'</span>'+ico('arrow')+'</button>').join('')+'</div>'+
'<form class="chat-form" id="ai-form"><input required name="message" aria-label="Ask AI Tutor" placeholder="Ask a question, anything at all..." autocomplete="off"/><button type="button" class="icon-button" aria-label="Voice input" data-action="speech-chat">'+ico('mic')+'</button><button type="submit" class="btn btn-primary" aria-label="Send message">'+ico('send')+'</button></form>'+
'<p class="fine-print mt-2">The tutor currently uses predefined educational demo responses, not an AI API. Production AI will require a secure integration.</p></section>';
}

function respond(q){
const t=q.toLowerCase();
if(/hausa|fassara|bayanin/.test(t))return 'Ga bayani a Hausa: Idan kana koyon sabon abu, ka fara da ma’anarsa, ka kalli misalai biyu, sannan ka yi atisaye. Misali, a Python, variable wata suna ce da ake amfani da ita wajen adana daraja kamar age = 20. Kana son karin misalai?';
if(/python|variable|program|code/.test(t))return 'In Python, a variable stores a value under a name.\n\nname = "Amina"\nage = 20\nis_student = True\n\nTry it: change the value of age, then print(age). What do you expect to see?';
if(/grammar|english|tense/.test(t))return 'Let’s practise English. Use “has” with he, she, it; use “have” with I, you, we and they.\n\nExamples:\n• She has a book.\n• They have books.\n\nYour turn: Fill the blank — “My brother ___ a laptop.”';
if(/math|mathematics|fraction|percent/.test(t))return 'To calculate a percentage, multiply the number by the percentage divided by 100. For example, 15% of 200 = (15 / 100) × 200 = 30.\n\nTry this: what is 25% of 80?';
if(/practice|question|quiz/.test(t))return 'Here is a quick practice question:\n\nWhich word is closest in meaning to “benevolent”?\nA. Cruel\nB. Kind\nC. Selfish\nD. Hostile\n\nThink about it, then open CBT Exam Practice to test yourself!';
return 'I can help you study that topic. This is a sample tutor response in the UI preview. In the live product, a connected AI model will give personalized, accurate explanations and follow-up questions. Try asking about English grammar, Python, Mathematics, or say “Explain this in Hausa”.';
}


function languages(){
return '<section class="screen languages-screen"><div class="screen-header"><span class="page-eyebrow">SYLUTION LANGUAGE ACADEMY</span><h1>Every language opens <span class="red">a new world.</span></h1><p class="muted">Practise speaking, listening, reading and everyday communication.</p></div>'+
'<div class="language-feature"><div><span class="page-eyebrow">EXPLORE THE WORLD</span><h2>Start speaking with confidence.</h2><p>Five featured language pathways. More languages can be added as verified lessons become available.</p><button class="btn btn-primary" data-go="speaking" data-id="english">'+ico('mic')+' Try speaking practice</button></div><div class="language-feature-art" aria-hidden="true"><span>🇬🇧</span><span>🇫🇷</span><span>🇸🇦</span><span>🇪🇸</span></div></div>'+
'<div class="language-actions"><button data-go="track" data-id="english">'+ico('book')+' My lessons</button><button data-go="speaking" data-id="english">'+ico('mic')+' Speaking</button><button data-go="ai">'+ico('brain')+' AI Tutor</button><button data-go="certificates">'+ico('award')+' Certificates</button></div>'+
heading('Choose Your Language','','')+
'<div class="language-grid polished-language-grid">'+LANGS.map((l,i)=>'<button class="language-choice" data-go="track" data-id="'+l.key+'"><div class="language-choice-top"><span class="language-flag">'+l.flag+'</span><span class="language-arrow">'+ico('arrow')+'</span></div><h3>'+l.label+'</h3><span class="muted small">Beginner pathway</span><div class="language-choice-meter"><div class="progress-track"><div class="progress-fill" style="width:'+[60,35,20,75,40][i]+'%"></div></div><small>Sample progress '+[60,35,20,75,40][i]+'%</small></div></button>').join('')+'</div>'+
'<div class="language-tip"><span>'+ico('volume')+'</span><div><strong>Learn by listening and speaking.</strong><p class="small muted">Try our speaking exercises, designed to build pronunciation confidence.</p></div><button class="btn btn-primary" data-go="speaking" data-id="english">Start practising '+ico('arrow')+'</button></div></section>';
}

function track(){
const l=lang();return '<section class="screen"><button class="back-btn" data-go="languages">'+ico('back')+' All Languages</button>'+
'<div class="panel" style="padding:25px;background:linear-gradient(110deg,#fff0f1,#fff)"><div class="row-between"><div><span style="font-size:44px">'+l.flag+'</span><h1>Learn '+l.label+'</h1><p class="muted">Build everyday communication skills, one lesson at a time.</p>'+badge('Beginner · A1')+'</div><div class="ring large" style="--percent:25%"><span>25%<small>Preview</small></span></div></div></div>'+
heading('Your Learning Path','','')+
'<div class="panel" style="padding:10px">'+[['Greetings & Introductions','Meet people and introduce yourself','book'],['Vocabulary Builder','Learn useful everyday words','file'],['Speaking Practice','Speak and receive browser feedback','mic'],['Listening & Review','Listen, repeat and review','headphones']].map(([title,sub,icon],i)=>'<button class="settings-row" data-go="'+(i===2?'speaking':'lesson')+'" data-id="'+(i===2?l.key:l.key==='arabic'?'arabic':l.key==='french'?'french':l.key==='hausa'?'hausa':l.key==='spanish'?'spanish':'english')+'">'+ico(icon)+'<span class="grow"><strong>'+title+'</strong><small>'+sub+'</small></span>'+ico('arrow')+'</button>').join('')+'</div>'+
'<div class="row gap-2 mt-3" style="flex-wrap:wrap"><button class="btn btn-primary" data-go="speaking" data-id="'+l.key+'">'+ico('mic')+' Start Speaking Practice</button><button class="btn btn-outline" data-go="ai">Ask Language Tutor '+ico('arrow')+'</button></div></section>';
}
function speaking(){
const l=lang();
return '<section class="screen"><button class="back-btn" data-go="track" data-id="'+l.key+'">'+ico('back')+' '+l.label+'</button>'+
'<div class="row-between mb-3"><h1>Speaking <span class="red">Practice</span></h1><select class="select" id="speaking-language">'+LANGS.map(x=>'<option value="'+x.key+'" '+(x.key===l.key?'selected':'')+'>'+x.flag+' '+x.label+'</option>').join('')+'</select></div>'+
'<div class="pills"><button class="pill active">Practice</button><button class="pill" data-go="ai">Conversation</button><button class="pill" data-go="ai">Role Play</button></div>'+
'<div class="speak-box"><div class="heading-eyebrow">Speak this phrase</div><h1>'+esc(l.phrase)+'</h1><p class="muted">'+esc(l.translated)+'</p><button class="btn btn-outline" data-action="say-phrase">'+ico('volume')+' Hear Pronunciation</button></div>'+
'<div class="panel center" style="padding:27px"><p class="muted small">Tap the microphone and speak clearly</p><button class="mic-button" data-action="record" aria-label="Start speaking">'+ico('mic')+'</button><p class="muted small">Your pronunciation feedback appears below.</p>'+(state.pronounce?'<div class="notice" style="text-align:left"><strong>Recognition result</strong><p style="margin:5px 0 0">'+esc(state.pronounce)+'</p></div>':'<div class="video-info">Your browser may ask for microphone permission. If speech recognition is unavailable, you can type your response below.</div>')+
'<form id="pronounce-form" class="row gap-2 mt-3"><input name="spoken" class="select flex-1" placeholder="Or type what you said..." aria-label="Type pronunciation practice"/><button class="btn btn-primary" type="submit">Check</button></form></div>'+
'<div class="panel mt-3" style="padding:20px"><h3>'+ico('spark')+' AI Tips</h3><p class="muted small">Listen to the model pronunciation, repeat at a natural pace, and practise the sentence several times. Speech-to-text feedback is an approximation—not a certified pronunciation score.</p><div class="row gap-2"><button class="btn btn-outline" data-action="reset-pronounce">'+ico('repeat')+' Try Again</button><button class="btn btn-primary" data-go="track" data-id="'+l.key+'">Next Lesson '+ico('arrow')+'</button></div></div></section>';
}
function exam(){
if(!state.quizEnds)state.quizEnds=Date.now()+30*60*1000;
const ix=state.quizIndex;const q=QUESTIONS[ix];const a=state.answers[ix];
return '<section class="screen"><button class="back-btn" data-go="home">'+ico('back')+' Dashboard</button>'+
'<div class="panel" style="padding:22px;background:#fff4f5"><div class="row-between"><div><h3>UTME Practice Test</h3><p class="muted small" style="margin:4px 0 0">Mixed Subject · Demonstration</p></div><div class="center"><div class="small muted">Time Left</div><h2 class="red" id="quiz-clock">30:00</h2></div></div></div>'+
'<div class="row-between mt-3"><strong>Question '+(ix+1)+' of '+QUESTIONS.length+'</strong><span class="muted small">'+Math.round((ix+1)/QUESTIONS.length*100)+'% Complete</span></div><div class="progress-track mt-2"><div class="progress-fill" style="width:'+((ix+1)/QUESTIONS.length*100)+'%"></div></div>'+
'<div class="question-card"><h2 style="margin-bottom:24px">'+esc(q.q)+'</h2>'+q.o.map((opt,i)=>'<button class="answer '+(a===i?'selected':'')+'" data-action="answer" data-index="'+i+'"><span class="letter">'+String.fromCharCode(65+i)+'</span><span>'+esc(opt)+'</span></button>').join('')+'<div class="notice mt-3">Select the best answer. You can change it before submitting your test.</div></div>'+
'<div class="row-between gap-2"><button class="btn btn-outline" data-action="quiz-prev" '+(ix===0?'disabled':'')+'>'+ico('back')+' Previous</button><button class="btn btn-primary" data-action="'+(ix===QUESTIONS.length-1?'quiz-submit':'quiz-next')+'">'+(ix===QUESTIONS.length-1?'Submit Exam':'Next Question')+' '+ico('arrow')+'</button></div></section>';
}
function results(){
return '<section class="screen"><div class="form-card center"><div style="font-size:48px">🏆</div><h1>Exam Complete!</h1><p class="muted">Here is your practice test result.</p><div class="ring large" style="--percent:'+Math.round(state.quizResult/QUESTIONS.length*100)+'%;margin:20px auto"><span>'+Math.round(state.quizResult/QUESTIONS.length*100)+'%<small>Score</small></span></div><h3>'+state.quizResult+' / '+QUESTIONS.length+' correct</h3><p class="muted small">This sample exam is for practice and not an official JAMB exam.</p><div class="rule"></div><h3 style="text-align:left">Answer Review</h3>'+
QUESTIONS.map((q,i)=>'<div style="text-align:left;border-bottom:1px solid var(--line);padding:12px 0"><strong class="small">'+(i+1)+'. '+esc(q.q)+'</strong><p class="small" style="margin:5px 0;color:'+(state.answers[i]===q.a?'#15895a':'#e0001b')+'">Your answer: '+(state.answers[i]===undefined?'Skipped':esc(q.o[state.answers[i]]))+'</p><p class="small muted" style="margin:0">Correct: '+esc(q.o[q.a])+'. '+esc(q.why)+'</p></div>').join('')+
'<button class="btn btn-primary btn-block mt-3" data-action="quiz-retake">'+ico('repeat')+' Retake Practice Test</button><button class="btn btn-outline btn-block mt-2" data-go="home">Back Home</button></div></section>';
}

function progress(){
const count=state.enrolled.length,done=countCompleted();
const percent=count?Math.min(100,Math.round(Object.values(state.completed).reduce((a,b)=>a+b,0)/count)):0;
return '<section class="screen progress-screen"><div class="page-intro"><div><div class="eyebrow-light"><span class="status-spark">✦</span> YOUR STORY OF GROWTH</div><h1>Every step <span class="red">counts.</span></h1><p class="muted">A clearer look at where you are and how far you have come.</p></div>'+badge('Learning dashboard')+'</div>'+
'<div class="progress-overview"><div class="progress-headline"><span class="hero-kicker"><span class="kicker-beam"></span> YOUR LEARNING JOURNEY</span><h2>Keep becoming<br><em>more.</em></h2><p>Small lessons. Real momentum. All progress is worth celebrating.</p><button class="btn btn-primary" data-go="courses">Discover your next course '+ico('arrow')+'</button></div><div class="progress-orb"><div class="ring large" style="--percent:'+percent+'%"><span>'+percent+'%<small>Progress</small></span></div><div class="progress-orb-caption">'+count+' enrolled learning path'+(count===1?'':'s')+'</div></div></div>'+
'<div class="stat-grid progress-kpis"><div class="stat-card"><span class="kpi-icon">'+ico('book')+'</span><span class="stat-number">'+count+'</span><span class="kpi-label">Courses enrolled</span></div><div class="stat-card"><span class="kpi-icon">'+ico('check')+'</span><span class="stat-number">'+done+'</span><span class="kpi-label">Courses completed</span></div><div class="stat-card"><span class="kpi-icon">'+ico('award')+'</span><span class="stat-number">'+done+'</span><span class="kpi-label">Certificates eligible</span></div></div>'+
'<div class="progress-grid"><div class="panel activity-panel"><div class="row-between"><div><h3>Weekly study rhythm</h3><p class="small muted">Illustrative activity, for preview only</p></div><span class="activity-chip">7 DAYS</span></div><div class="chart">'+[34,60,43,75,56,88,67].map((n,i)=>'<div class="chart-col"><div class="chart-bar" style="height:'+n+'%"></div><small>'+['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]+'</small></div>').join('')+'</div></div><div class="panel momentum-panel"><span class="momentum-icon">'+ico('flame')+'</span><span class="micro-kicker">KEEP THE HABIT</span><h2>Stay in motion.</h2><p>Little by little, one new lesson after another.</p><button class="btn btn-outline" data-go="courses">Find a lesson '+ico('arrow')+'</button></div></div>'+
'<div class="section-title-group">'+heading('Your learning paths','Explore more','courses')+'</div>'+
'<div class="panel enrolled-paths">'+state.enrolled.map(id=>{const c=course(id);return '<button class="settings-row" data-go="lesson" data-id="'+id+'"><span class="enrolled-icon">'+ico('book')+'</span><span class="grow"><strong>'+esc(c.title)+'</strong><small>'+ct(id)+'% completed</small><span class="mini-progress"><span style="width:'+ct(id)+'%"></span></span></span>'+ico('arrow')+'</button>'}).join('')+'</div>'+
'<div class="section-title-group">'+heading('Little wins, big dreams','','')+'</div>'+
'<div class="achievements">'+[['First Course','cap'],['Dedicated Learner','flame'],['Skill Builder','trophy'],['Language Explorer','globe']].map(([t,i])=>'<div class="achievement">'+ico(i)+'<h3 class="small mt-2">'+t+'</h3><span class="tiny muted">Milestone preview</span></div>').join('')+'</div></section>';
}


function profile(){
return '<section class="screen profile-screen"><div class="page-intro"><div><div class="eyebrow-light"><span class="status-spark">✦</span> YOUR PERSONAL SPACE</div><h1>My <span class="red">profile.</span></h1><p class="muted">Your journey and everything that makes it yours.</p></div></div>'+
'<div class="profile-cover"><div class="profile-cover-light" aria-hidden="true">✳</div><div class="profile-cover-inner">'+img(PHOTOS.face,'Profile avatar').replace('<img','<img class="avatar"')+'<div class="profile-identity"><span class="micro-kicker">SYLUTION LEARN MEMBER</span><h2>'+esc(state.user.name)+'</h2><p>Growing every day, one lesson at a time.</p><span class="profile-member-tag">'+ico('spark')+' Learning Explorer</span></div><button class="btn btn-hero-outline" data-go="account">'+ico('edit')+' Edit profile</button></div></div>'+
'<div class="stat-grid profile-kpis">'+[['Courses enrolled',state.enrolled.length,'book'],['Certificates',countCompleted(),'award'],['Saved courses',state.saved.length,'bookmark']].map(([l,n,ic])=>'<div class="stat-card"><span class="kpi-icon">'+ico(ic)+'</span><div class="stat-number">'+n+'</div><p class="small muted">'+l+'</p></div>').join('')+'</div>'+
'<div class="member-offer"><span class="member-symbol">'+ico('award')+'</span><div><span class="micro-kicker">YOUR NEXT LEVEL</span><h3>SYLUTION Learn <span class="red">Pro</span></h3><p>See how premium learning could work for you.</p></div><button class="btn btn-primary" data-action="pro">Explore plan '+ico('arrow')+'</button></div>'+
'<div class="section-title-group">'+heading('My learning space','','')+'</div>'+
'<div class="profile-link-grid">'+[['download','My Downloads','downloads'],['award','My Certificates','certificates'],['bookmark','Saved Courses','saved'],['chart','Learning Stats','progress']].map(([i,t,p])=>'<button class="profile-link" data-go="'+p+'"><span class="profile-link-icon">'+ico(i)+'</span><strong>'+t+'</strong>'+ico('arrow')+'</button>').join('')+'</div>'+
'<div class="section-title-group">'+heading('Your settings','','')+'</div><div class="panel">'+[['user','Account Information','Name, display name and profile','account'],['card','Membership & Billing','Plan and payment information','billing'],['bell','Notifications','Course news and reminders','notifications'],['globe','Language Preferences',state.user.preferred||'Hausa','account'],['cap','Instructor Studio','Create and manage course drafts','instructor']].map(([i,t,s,p])=>'<button class="settings-row" data-go="'+p+'"><span class="settings-icon">'+ico(i)+'</span><span class="grow"><strong>'+t+'</strong><small>'+esc(s)+'</small></span>'+ico('arrow')+'</button>').join('')+'</div>'+
'<div class="section-title-group">'+heading('Support & About','','')+'</div><div class="panel"><button class="settings-row" data-action="help"><span class="settings-icon">'+ico('help')+'</span><span class="grow"><strong>Help & Support</strong><small>How this learning preview works</small></span>'+ico('arrow')+'</button><button class="settings-row" data-action="about"><span class="settings-icon">'+ico('info')+'</span><span class="grow"><strong>About SYLUTION Learn</strong><small>A product of SYLUTION LTD · Preview 2.0</small></span>'+ico('arrow')+'</button></div></section>';
}

function saved(){
const cs=COURSES.filter(c=>state.saved.includes(c.id));return '<section class="screen"><button class="back-btn" data-go="profile">'+ico('back')+' Profile</button><h1>Saved Courses</h1><p class="muted">Quick access to courses you love.</p>'+(cs.length?'<div class="course-grid mt-3">'+cs.map(card).join('')+'</div>':'<div class="empty mt-3">'+ico('bookmark')+'<h3>No saved courses yet</h3><p class="muted">Tap the heart on any course to save it here.</p><button class="btn btn-primary" data-go="courses">Explore Courses</button></div>')+'</section>';
}
function certificates(){
const completed=state.enrolled.filter(id=>ct(id)>=100);
return '<section class="screen"><button class="back-btn" data-go="profile">'+ico('back')+' Profile</button><h1>My Certificates</h1><p class="muted">Certificates unlock after course completion and assessment.</p>'+
(completed.length?completed.map(id=>'<div class="panel mt-3" style="padding:25px;text-align:center;border:2px solid #ffdfe4"><div class="red">'+ico('award',35)+'</div><div class="heading-eyebrow mt-2">SYLUTION Learn</div><h2>Certificate of Completion</h2><p class="muted">'+esc(state.user.name)+' · '+esc(course(id).title)+'</p><p class="fine-print">Preview certificate — not an accredited degree or regulated qualification.</p></div>').join(''):'<div class="empty mt-3">'+ico('award')+'<h3>Your learning journey is underway</h3><p class="muted">Complete your first course to unlock a certificate preview.</p><button class="btn btn-primary" data-go="courses">Browse Courses</button></div>')+'</section>';
}
function downloads(){return '<section class="screen"><button class="back-btn" data-go="profile">'+ico('back')+' Profile</button><h1>My Downloads</h1><div class="empty mt-3">'+ico('download')+'<h3>Offline lessons</h3><p class="muted">Offline video and lesson downloads will be available when the secure media library and storage are connected.</p><button class="btn btn-primary" data-go="courses">Browse Courses</button></div></section>';}
function account(){return '<section class="screen"><button class="back-btn" data-go="profile">'+ico('back')+' Profile</button><div class="form-card"><h1>Account Settings</h1><p class="muted">Customize your learning experience.</p><form id="account-form"><div class="field"><label for="account-name">Display name</label><input id="account-name" name="name" required maxlength="60" value="'+esc(state.user.name)+'"/></div><div class="field"><label for="account-language">Learning explanations language</label><select name="preferred" id="account-language">'+['Hausa','English','Arabic','French','Spanish'].map(x=>'<option '+(state.user.preferred===x?'selected':'')+'>'+x+'</option>').join('')+'</select></div><button type="submit" class="btn btn-primary btn-block">Save Changes '+ico('check')+'</button></form><p class="fine-print mt-2">Preview settings are saved in this browser. Secure login has not yet been connected.</p></div></section>';}
function billing(){return '<section class="screen"><button class="back-btn" data-go="profile">'+ico('back')+' Profile</button><div class="form-card center"><div class="red">'+ico('card',40)+'</div><h1>Membership & Billing</h1><p class="muted">Choose how you want to learn.</p><div class="panel" style="padding:20px"><h3>Free Preview</h3><p class="muted small">Access sample content and test the UI.</p><div class="stat-number">₦0</div><p class="fine-print">Online payments, subscription plans and enrollments are not enabled in this demo.</p></div><button class="btn btn-primary btn-block mt-3" data-action="pro">Explore Premium</button></div></section>';}
function notifications(){return '<section class="screen"><button class="back-btn" data-go="profile">'+ico('back')+' Profile</button><h1>Notifications</h1><p class="muted">Your learning updates in one place.</p><div class="panel mt-3">'+[['book','Welcome to SYLUTION Learn','Start exploring courses and languages today.'],['flame','Keep your streak alive','Practise for a few minutes daily.'],['brain','AI Tutor preview','Try a sample explanation in Hausa.']].map(([i,t,s])=>'<div class="settings-row">'+ico(i)+'<span class="grow"><strong>'+t+'</strong><small>'+s+'</small></span>'+badge('Demo')+'</div>').join('')+'</div></section>';}
function live(){return '<section class="screen"><button class="back-btn" data-go="home">'+ico('back')+' Home</button><div class="screen-header"><h1>Live Classes</h1><p class="muted">Learn with instructors and your community.</p></div><div class="panel" style="padding:22px;background:linear-gradient(120deg,#fff0f1,#fff)"><div class="red">'+ico('radio',32)+'</div><h2 class="mt-2">Learn together, grow together</h2><p class="muted">Live classes will include scheduled sessions, chat, questions and instructor-led exercises. Sample sessions below are illustrative.</p></div>'+
heading('Upcoming Session Examples','','')+'<div class="grid-2">'+[['English Speaking Club','Language Practice'],['Introduction to Python','Digital Skills'],['JAMB Exam Strategies','Exam Prep'],['AI for Beginners','Technology']].map(([n,c])=>'<div class="panel" style="padding:20px"><div class="red">'+ico('calendar')+'</div><h3 class="mt-2">'+n+'</h3><p class="muted small">'+c+' · Schedule pending</p><button class="btn btn-outline" data-action="session-alert">Notify me when available</button></div>').join('')+'</div></section>';}
function instructor(){
return '<section class="screen"><button class="back-btn" data-go="profile">'+ico('back')+' Profile</button><div class="screen-header"><h1>Instructor Studio</h1><p class="muted">Create course drafts for review before publishing.</p></div><div class="split"><div class="panel" style="padding:24px"><h2>New Course Draft</h2><form id="draft-form"><div class="field"><label>Course title</label><input name="title" maxlength="70" required placeholder="e.g. Introduction to IoT"/></div><div class="field"><label>Category</label><select name="cat">'+['Languages','Academics','Digital Skills','Exams','Business','Engineering'].map(c=>'<option>'+c+'</option>').join('')+'</select></div><div class="field"><label>Description</label><textarea name="desc" rows="4" required maxlength="300" placeholder="What students will learn"></textarea></div><button class="btn btn-primary btn-block">Save Course Draft '+ico('arrow')+'</button></form></div><div><div class="panel" style="padding:22px"><h2>My Drafts</h2><p class="small muted">Saved in this browser only; publishing requires a secure instructor backend.</p>'+(state.drafts.length?state.drafts.map((d,i)=>'<div class="module"><span class="module-num">'+(i+1)+'</span><span class="module-text"><strong>'+esc(d.title)+'</strong><small>'+esc(d.cat)+' · Draft</small></span>'+badge('Draft')+'</div>').join(''):'<div class="empty" style="padding:25px"><h3>No drafts yet</h3><p class="small muted">Your course drafts will appear here.</p></div>')+'</div></div></div></section>';}

function welcome(){
return '<section class="screen"><div class="hero" style="height:310px">'+img(PHOTOS.hero,'SYLUTION Learn students').replace('<img','<img class="hero-photo"')+'<div class="hero-content"><div class="heading-eyebrow">WELCOME TO SYLUTION LEARN</div><h1>Everything to learn.<br><span class="red">One place.</span></h1><p>Expert lessons, languages, exams and learning tools for a brighter future.</p><button class="btn btn-primary" data-go="signup">Get Started '+ico('arrow')+'</button></div></div>'+
heading('Your learning journey begins here','','')+
'<div class="grid-2">'+[['book','Learn at your pace','Explore structured courses and practise when you want.'],['globe','Discover world languages','Build everyday communication skills with spoken practice.'],['brain','Study with AI','Ask questions and practise with explanations in Hausa or English.'],['trophy','Celebrate progress','Track progress and unlock milestone certificates.']].map(([i,t,d])=>'<div class="panel" style="padding:20px"><div class="red">'+ico(i,28)+'</div><h3 class="mt-2">'+t+'</h3><p class="muted small">'+d+'</p></div>').join('')+'</div><div class="row gap-2 mt-3"><button class="btn btn-primary" data-go="signup">Create Demo Profile '+ico('arrow')+'</button><button class="btn btn-outline" data-go="home">Explore as Guest</button></div></section>';
}
function signup(){
return '<section class="screen"><button class="back-btn" data-go="welcome">'+ico('back')+' Back to welcome</button><div class="form-card"><div class="red">'+ico('cap',35)+'</div><h1>Start learning today</h1><p class="muted">Create your local demo learner profile to explore SYLUTION Learn.</p><form id="signup-form"><div class="field"><label for="student-name">Your name</label><input id="student-name" name="name" required maxlength="60" placeholder="Your full name"/></div><div class="field"><label for="student-goal">What would you like to learn?</label><select name="goal" id="student-goal"><option>Languages</option><option>Academics</option><option>Digital Skills</option><option>Business</option><option>Engineering</option></select></div><div class="field"><label for="student-language">Explanations in</label><select id="student-language" name="preferred"><option>Hausa</option><option>English</option><option>Arabic</option><option>French</option><option>Spanish</option></select></div><button class="btn btn-primary btn-block" type="submit">Continue to SYLUTION Learn '+ico('arrow')+'</button></form><p class="fine-print mt-3">This is a local demo profile only. No password, email, or real authentication is collected.</p><button class="btn btn-light btn-block mt-2" data-go="home">Continue as Guest</button></div></section>';
}

function overlay(){
if(!state.modal)return '';
const data={pro:['SYLUTION Learn Pro','Premium membership will unlock more courses and advanced learning tools once subscriptions are connected. No payment is taken in this preview.'],help:['Help & Support','Use the navigation bar to explore courses, listen to sample lessons, practise with CBT, and save your preferences. If you encounter an issue, contact the SYLUTION team when support channels are launched.'],about:['About SYLUTION Learn','SYLUTION Learn is a digital learning platform by SYLUTION LTD for academics, languages, AI, engineering, creative skills and professional growth. This is the interactive UX prototype.'],payment:['Checkout Preview','This course requires payment in the production platform. No payment processor or enrollment verification is connected in this prototype.'],session:['Class Reminder','Live class schedules and notifications are not yet connected. This is a preview of the intended experience.']}[state.modal]||['Information','Preview feature'];
return '<div class="modal-layer" data-action="close-modal"><div class="modal" role="dialog" aria-modal="true" aria-label="'+data[0]+'"><div class="row-between mb-3"><h2>'+data[0]+'</h2><button class="icon-button" data-action="close-modal" aria-label="Close">'+ico('close')+'</button></div><p class="muted">'+data[1]+'</p><button class="btn btn-primary btn-block" data-action="close-modal">Understood</button></div></div>';
}
function render(){
const pages={home,courses,detail,lesson,ai,languages,track,speaking,exam,results,progress,profile,saved,certificates,downloads,account,billing,notifications,live,instructor,welcome,signup};
root.innerHTML='<div class="app-shell">'+header()+'<main class="container">'+(pages[state.page]||home)()+'</main>'+footer()+navBar()+overlay()+'</div>';
if(state.page==='exam')tickClock();
}
function speak(text,code){
if(!('speechSynthesis' in window)){toast('Audio playback is not supported in this browser.');return}
window.speechSynthesis.cancel();const utter=new SpeechSynthesisUtterance(text);utter.lang=code||'en-US';utter.rate=.88;utter.pitch=1;utter.onend=()=>{state.lessonPlaying=false};window.speechSynthesis.speak(utter)
}
function checkPronunciation(value){
const expected=lang().answer.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^\p{L}\p{N} ]/gu,'').replace(/\s+/g,' ').trim();
const actual=String(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^\p{L}\p{N} ]/gu,'').replace(/\s+/g,' ').trim();
if(!actual){toast('Speak or type a phrase first.');return}
state.pronounce=(actual===expected?'✅ Great match! ':'🔁 Keep practising. ')+ 'Recognized: “'+value+'”. Expected: “'+lang().phrase+'”.';
render();
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
if(go){if(go==='speaking'&&id)state.pronounce='';nav(go,id);return}
if(!action)return;
if(action==='category'){if(val==='Languages'&&state.page==='home'){nav('languages');return}if(val==='Live Classes'){nav('live');return}if(val==='Exams'){nav('exam');return}state.category=val;nav('courses');return}
if(action==='hero-slide'){state.heroIndex=Number(b.dataset.index)||0;render();return}
if(action==='favorite'){favorite(id);return}
if(action==='clear-filter'){state.category='All';state.search='';state.sort='popular';render();return}
if(action==='home-search'){const x=document.getElementById('home-search');state.search=x?x.value:'';state.category='All';nav('courses');return}
if(action==='detail-tab'){state.detailTab=val;render();return}
if(action==='lesson-tab'){state.lessonTab=val;render();return}
if(action==='enroll'){const c=course(id);if(c.price&&!state.enrolled.includes(id)){state.modal='payment';render();return}if(!state.enrolled.includes(id)){state.enrolled.push(id);save('enrolled',state.enrolled)}nav('lesson',id);return}
if(action==='lesson-audio'){state.lessonPlaying=true;render();speak('Welcome to '+course(state.courseId).title+'. Let us begin by reviewing the essential concepts and then practising with examples.','en-US');return}
if(action==='complete-lesson'){state.completed[id]=Math.min(100,ct(id)+25);save('completed',state.completed);if(!state.enrolled.includes(id)){state.enrolled.push(id);save('enrolled',state.enrolled)}render();toast('Great work! Lesson progress saved.');return}
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
if(e.target.id==='home-search-form'){e.preventDefault();state.search=String(new FormData(e.target).get('search')||'');state.category='All';nav('courses');return}
if(e.target.id==='course-search'){e.preventDefault();state.search=String(new FormData(e.target).get('search')||'');render();return}
if(e.target.id==='ai-form'){e.preventDefault();const f=new FormData(e.target);const q=String(f.get('message')||'').trim();if(!q)return;state.chat.push({from:'user',text:q},{from:'ai',text:respond(q)});save('chat',state.chat);render();setTimeout(()=>window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'}),0);return}
if(e.target.id==='pronounce-form'){e.preventDefault();checkPronunciation(String(new FormData(e.target).get('spoken')||''));return}
if(e.target.id==='signup-form'){e.preventDefault();const data=new FormData(e.target);state.user={name:String(data.get('name')||'Learner').trim().slice(0,60),preferred:String(data.get('preferred')||'Hausa')};save('user',state.user);state.category=String(data.get('goal')||'All');nav('courses');toast('Welcome to SYLUTION Learn, '+state.user.name+'!');return}
if(e.target.id==='account-form'){e.preventDefault();const f=new FormData(e.target);state.user={name:String(f.get('name')||'Learner').trim().slice(0,60),preferred:String(f.get('preferred')||'Hausa')};save('user',state.user);nav('profile');toast('Account preferences saved on this device.');return}
if(e.target.id==='draft-form'){e.preventDefault();const f=new FormData(e.target);state.drafts.push({title:String(f.get('title')).slice(0,70),cat:String(f.get('cat')),desc:String(f.get('desc')).slice(0,300)});save('drafts',state.drafts);render();toast('Your course draft is saved locally.');return}
});
document.addEventListener('change',e=>{
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
const [page,arg]=decodeURI((location.hash||'#/home').replace(/^#\//,'')).split('/');
if(page&&['home','courses','detail','lesson','ai','languages','track','speaking','exam','results','progress','profile','saved','certificates','downloads','account','billing','notifications','live','instructor','welcome','signup'].includes(page)){state.page=page;if(arg){if(['detail','lesson'].includes(page))state.courseId=arg;if(['track','speaking'].includes(page))state.lang=arg}}else state.page='home';render()
}
route();
})();