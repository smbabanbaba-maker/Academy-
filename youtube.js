/* SYLUTION Learn YouTube education catalog.
   Curated courses work without an API key. Live discovery requires /api/youtube
   on a server that has a protected YOUTUBE_API_KEY environment variable.
   Original video ownership, YouTube attribution and player UI are retained. */
(function(){
'use strict';
const curate=[
 {
  "id": "rfscVS0vtbw",
  "title": "Learn Python — Full Course for Beginners",
  "creator": "freeCodeCamp.org",
  "category": "Programming",
  "level": "Beginner",
  "description": "Start programming with Python: setup, variables, functions, loops, files and projects.",
  "hours": "4h 26m",
  "chapters": [
   [
    "Introduction",
    0
   ],
   [
    "Install Python & Set Up",
    105
   ],
   [
    "Variables and Data Types",
    906
   ],
   [
    "Strings, Numbers and Input",
    1623
   ],
   [
    "Lists and Functions",
    3800
   ],
   [
    "Conditions and Loops",
    6006
   ],
   [
    "Files and Modules",
    11561
   ],
   [
    "Classes and Final Quiz",
    13436
   ]
  ],
  "featured": false
 },
 {
  "id": "PkZNo7MFNFg",
  "title": "JavaScript — Full Course for Beginners",
  "creator": "freeCodeCamp.org",
  "category": "Programming",
  "level": "Beginner",
  "description": "Complete fundamentals from variables and arrays to objects, loops and ES6.",
  "hours": "3h 20m+",
  "chapters": [
   [
    "Introduction & JavaScript Setup",
    0
   ],
   [
    "Variables and Operators",
    356
   ],
   [
    "Strings",
    1279
   ],
   [
    "Arrays",
    2444
   ],
   [
    "Functions and Scope",
    3101
   ],
   [
    "Conditions and Objects",
    4104
   ],
   [
    "Loops",
    7815
   ],
   [
    "Modern JavaScript and ES6",
    9456
   ]
  ],
  "featured": false
 },
 {
  "id": "HXV3zeQKqGY",
  "title": "SQL Tutorial — Full Database Course",
  "creator": "freeCodeCamp.org",
  "category": "Data & Analytics",
  "level": "Beginner",
  "description": "Learn SQL and database basics, tables, queries, joins and database design.",
  "hours": "4h+",
  "chapters": [
   [
    "What Is a Database?",
    156
   ],
   [
    "Tables and Keys",
    1390
   ],
   [
    "SQL Basics and Setup",
    2611
   ],
   [
    "Creating Tables and Data",
    4549
   ],
   [
    "Queries and Functions",
    6971
   ],
   [
    "Joins and Nested Queries",
    10896
   ],
   [
    "ER Diagrams and Database Design",
    13332
   ]
  ],
  "featured": false
 },
 {
  "id": "KJgsSFOSQv0",
  "title": "C Programming Tutorial for Beginners",
  "creator": "freeCodeCamp.org",
  "category": "Programming",
  "level": "Beginner",
  "description": "Programming fundamentals with C, variables, arrays, functions, loops and pointers.",
  "hours": "3h 45m+",
  "chapters": [
   [
    "Introduction",
    0
   ],
   [
    "Setup and Hello World",
    82
   ],
   [
    "Variables and Data Types",
    1256
   ],
   [
    "Input and Arrays",
    3600
   ],
   [
    "Functions and Decisions",
    5804
   ],
   [
    "Loops and Structs",
    8487
   ],
   [
    "Pointers and Memory",
    11350
   ],
   [
    "Writing and Reading Files",
    12757
   ]
  ],
  "featured": false
 },
 {
  "id": "DPqiIzK97K0",
  "title": "Arduino & Electronics — Project-Based Course",
  "creator": "freeCodeCamp.org",
  "category": "Engineering & IoT",
  "level": "Beginner",
  "description": "Build Arduino circuits, LED projects, voltmeters, buzzers, sensors and an LED matrix display.",
  "hours": "10h 28m",
  "chapters": [
   [
    "Getting started with Arduino",
    0
   ],
   [
    "Breadboards and LEDs",
    292
   ],
   [
    "Traffic light project",
    3412
   ],
   [
    "Analog pins",
    4370
   ],
   [
    "Voltmeter project",
    5681
   ],
   [
    "Sound and buzzer projects",
    7998
   ],
   [
    "Temperature sensors",
    11867
   ],
   [
    "Pushbuttons and RGB LED",
    14877
   ],
   [
    "7-segment displays",
    22324
   ],
   [
    "8x8 LED matrix",
    33357
   ]
  ],
  "featured": true
 },
 {
  "id": "Vl0H-qTclOg",
  "title": "Microsoft Excel — Six Real-World Projects",
  "creator": "freeCodeCamp.org",
  "category": "Business & Office",
  "level": "Beginner",
  "description": "Practice payroll, gradebooks, charts, inventory, pivot tables and lookups with Excel.",
  "hours": "2h 30m",
  "chapters": [
   [
    "Complete Excel workshop",
    0
   ]
  ],
  "featured": false
 },
 {
  "id": "CMEWVn1uZpQ",
  "title": "Python for Data Science — Practical Projects",
  "creator": "freeCodeCamp.org",
  "category": "Data & Analytics",
  "level": "Beginner",
  "description": "Learn Python, NumPy, Pandas, visualizations, data cleaning and introductory machine learning.",
  "hours": "17h+",
  "chapters": [
   [
    "Installation and Python basics",
    0
   ],
   [
    "Pandas and NumPy",
    6101
   ],
   [
    "Web scraping project",
    12375
   ],
   [
    "Filtering and extraction",
    14736
   ],
   [
    "Data reshaping",
    27117
   ],
   [
    "Visualization project",
    28259
   ],
   [
    "GroupBy and merging",
    32199
   ],
   [
    "Data cleaning project",
    45945
   ],
   [
    "Machine learning introduction",
    51465
   ]
  ],
  "featured": true
 },
 {
  "id": "hDKCxebp88A",
  "title": "Machine Learning with Python & Scikit-Learn",
  "creator": "freeCodeCamp.org",
  "category": "Artificial Intelligence",
  "level": "Intermediate",
  "description": "Build supervised and unsupervised learning models and deploy a real machine-learning project.",
  "hours": "18h+",
  "chapters": [
   [
    "Introduction",
    0
   ],
   [
    "Linear regression",
    25
   ],
   [
    "Logistic regression",
    8250
   ],
   [
    "Decision trees and forests",
    17606
   ],
   [
    "ML project workflow",
    26729
   ],
   [
    "XGBoost",
    36373
   ],
   [
    "Unsupervised learning",
    44457
   ],
   [
    "End-to-end ML project",
    49998
   ],
   [
    "Deploy with Flask",
    60347
   ]
  ],
  "featured": true
 },
 {
  "id": "PSNXoAs2FtQ",
  "title": "Data Analyst Bootcamp — SQL, Excel & Power BI",
  "creator": "freeCodeCamp.org",
  "category": "Data & Analytics",
  "level": "Beginner",
  "description": "Career-oriented analytics bootcamp with SQL, Tableau, Power BI, Python, Excel and portfolio projects.",
  "hours": "19h+",
  "chapters": [
   [
    "Bootcamp introduction",
    0
   ],
   [
    "Becoming a data analyst",
    70
   ],
   [
    "SQL setup",
    908
   ],
   [
    "SQL SELECT queries",
    1484
   ],
   [
    "SQL WHERE clauses",
    1857
   ]
  ],
  "featured": false
 },
 {
  "id": "wUSDVGivd-8",
  "title": "Python for Data Analytics — Full Tutorial",
  "creator": "Luke Barousse",
  "category": "Data & Analytics",
  "level": "Beginner",
  "description": "Learn Python, Pandas, Matplotlib and practical data analyst portfolio projects.",
  "hours": "11h 9m",
  "chapters": [
   [
    "Welcome and setup",
    0
   ],
   [
    "Python basics",
    522
   ],
   [
    "Lists and dictionaries",
    5640
   ],
   [
    "Functions",
    10332
   ],
   [
    "Pandas intro",
    15776
   ],
   [
    "Charts with Matplotlib",
    19039
   ],
   [
    "Data analysis techniques",
    21056
   ],
   [
    "Final portfolio project",
    35140
   ]
  ],
  "featured": false
 },
 {
  "id": "c9Wg6Cb_YlU",
  "title": "UI/UX Design — Wireframes to Prototypes",
  "creator": "freeCodeCamp.org",
  "category": "Design & Creative",
  "level": "Beginner",
  "description": "Follow a real website design process from wireframes through UI layout to polished Figma mockups.",
  "hours": "1h+",
  "chapters": [
   [
    "Introduction",
    0
   ],
   [
    "Wireframing",
    87
   ],
   [
    "User Interface Layout",
    1858
   ],
   [
    "Polished Mockup",
    3998
   ]
  ],
  "featured": false
 }
];
const photo=id=>'https://i.ytimg.com/vi/'+id+'/hqdefault.jpg';
const validVideo=id=>/^[a-zA-Z0-9_-]{11}$/.test(String(id||''));
const validPlaylist=id=>/^[a-zA-Z0-9_-]{12,60}$/.test(String(id||''));
const normalizeCourse=c=>Object.assign({},c,{type:c.type||'video',image:c.image||photo(c.id),source:'YouTube',hours:c.hours||'See YouTube',chapters:c.chapters||[['Watch the video',0]],format:c.category==='Agriculture'?'Practical lesson':'Video course'});
const curated=Array.from(new Map(curate.filter(c=>validVideo(c.id)).map(c=>[c.id,normalizeCourse(c)])).values()).sort((a,b)=>Number(!!b.featured)-Number(!!a.featured));
const state={category:'All',sort:'featured',saved:(()=>{try{const a=JSON.parse(localStorage.getItem('sylution_yt-saved'));return Array.isArray(a)?a.filter(validVideo):[]}catch(e){return[]}})(),items:curated.slice(),query:'',kind:'video',status:'curated',message:'Selected courses confirmed as public YouTube video pages. Playback permission may vary; unavailable embeds can be opened on YouTube.',page:null,selected:curated[0],lesson:0,playlistLessons:[],courseProgress:(()=>{try{return JSON.parse(localStorage.getItem('sylution_yt-progress'))||{}}catch(e){return{}}})()};
const searchApi=async(q,kind,token)=>{const u=new URL('./api/youtube',location.href.split('#')[0]);u.searchParams.set('mode','search');u.searchParams.set('q',q);u.searchParams.set('kind',kind);if(token)u.searchParams.set('pageToken',token);const res=await fetch(u.href,{headers:{'Accept':'application/json'}});const data=await res.json().catch(()=>({error:'Server response was not JSON'}));if(!res.ok)throw Error(data.error||'YouTube search is not configured');return data};
const listPlaylist=async(id,token)=>{if(!validPlaylist(id))throw Error('Invalid playlist');const u=new URL('./api/youtube',location.href.split('#')[0]);u.searchParams.set('mode','playlist');u.searchParams.set('id',id);if(token)u.searchParams.set('pageToken',token);const res=await fetch(u.href);const data=await res.json().catch(()=>({error:'Could not read server response'}));if(!res.ok)throw Error(data.error||'Playlist unavailable');return data};
function sanitize(item){
if(!item)return null;
const type=item.type==='playlist'?'playlist':'video',id=String(item.id||'');
if(!(type==='video'?validVideo(id):validPlaylist(id)))return null;
return {id,type,title:String(item.title||'Untitled course').slice(0,200),creator:String(item.creator||'YouTube creator').slice(0,120),category:String(item.category||'YouTube Courses').slice(0,80),level:String(item.level||'All levels'),description:String(item.description||'Video course from YouTube').slice(0,600),image:type==='video'?photo(id):(/^https:\/\/i\.ytimg\.com\//.test(String(item.image||''))?item.image:''),hours:String(item.hours||'Full course'),chapters:[],source:'YouTube',publishedAt:item.publishedAt||''};
}
async function search(query,kind){
const q=String(query||'').trim().slice(0,80);
if(q.length<2){state.items=curated.slice();state.status='curated';state.message='Showing '+curated.length+' selected courses. Enter at least two letters to search.';return state}
state.query=q;state.kind=kind==='playlist'?'playlist':'video';state.category='All';state.sort='featured';state.status='loading';state.message='Searching YouTube...';
try{const result=await searchApi(q,state.kind);state.items=(result.items||[]).map(sanitize).filter(Boolean);state.page=result.nextPageToken||null;state.status='api';state.message=state.items.length?'Live YouTube results. Videos and playlists belong to their original creators.':'No results. Try another subject.'}
catch(e){state.items=curated.filter(c=>(c.title+' '+c.category+' '+c.description+' '+c.creator).toLowerCase().includes(q.toLowerCase()));state.status='fallback';state.page=null;state.message='Live YouTube search is not configured. Showing '+state.items.length+' matching curated courses instead.'}
return state
}
function select(id){
let found=state.items.find(c=>c.id===id)||curated.find(c=>c.id===id);
if(!found)return false;
state.selected=found;state.lesson=0;state.playlistLessons=[];return true
}
function lessons(){
const c=state.selected;
if(!c)return[];
if(c.type==='playlist')return state.playlistLessons.map((x,i)=>({title:x.title,id:x.id,index:i,seconds:0,creator:x.creator}));
return (c.chapters&&c.chapters.length?c.chapters:[['Watch the full course',0]]).map(([title,seconds],i)=>({title,id:c.id,seconds,index:i,creator:c.creator}))
}
async function getLessons(){
const course=state.selected;if(!course||course.type!=='playlist'){state.playlistLessons=[];return lessons()}
try{let page=null,all=[];do{const r=await listPlaylist(course.id,page);all.push(...(r.items||[]));page=r.nextPageToken||null}while(page&&all.length<150);
state.playlistLessons=all.filter(v=>validVideo(v.id)).map((v,i)=>({...v,index:i}));state.message=state.playlistLessons.length?'Playlist lessons loaded.':'This playlist has no publicly available video lessons.'}
catch(e){state.playlistLessons=[];state.message='Playlist is temporarily unavailable: '+(e.message||e)}
return lessons()
}
function currentLesson(){return lessons()[state.lesson]||lessons()[0]||null}
function setLesson(n){const l=lessons();state.lesson=Math.max(0,Math.min(l.length-1,Number(n)||0));return currentLesson()}
function finish(){
const c=state.selected;if(!c)return 0;
const key=c.type+':'+c.id,all=lessons();
const entry=Array.isArray(state.courseProgress[key])?state.courseProgress[key]:[];
if(!entry.includes(state.lesson))entry.push(state.lesson);
state.courseProgress[key]=entry;
try{localStorage.setItem('sylution_yt-progress',JSON.stringify(state.courseProgress))}catch(e){}
return all.length?Math.round(entry.length/all.length*100):0
}
function progress(c){if(!c)return 0;const key=c.type+':'+c.id;const entry=state.courseProgress[key]||[];const n=c.type==='playlist'?state.playlistLessons.length:(c.chapters||[]).length||1;return n?Math.round(entry.length/n*100):0}
function toggleSaved(id){
if(!validVideo(id))return false;
const n=state.saved.indexOf(id);if(n>=0)state.saved.splice(n,1);else state.saved.push(id);
try{localStorage.setItem('sylution_yt-saved',JSON.stringify(state.saved))}catch(e){}
return state.saved.includes(id)
}
const categories=['All','Programming','Artificial Intelligence','Data & Analytics','Business & Office','Web Development','Design & Creative','Cybersecurity','Engineering & IoT','Mathematics & Science','Languages','Agriculture'];
const filtered=()=>{
let list=state.items.filter(c=>state.category==='All'||c.category===state.category);
if(state.sort==='az')list=list.sort((a,b)=>a.title.localeCompare(b.title));
else if(state.sort==='saved')list=list.filter(c=>state.saved.includes(c.id));
else if(state.sort==='featured')list=list.sort((a,b)=>Number(!!b.featured)-Number(!!a.featured));
return list
};
/* Once configured, the server checks YouTube's authoritative status.embeddable
   and privacyStatus fields. Do not delete courses based on network errors. */
let verificationInFlight=null;
async function verifyCatalog(){
 if(verificationInFlight)return verificationInFlight;
 verificationInFlight=(async()=>{
  try{
   const ids=curated.map(x=>x.id).filter(validVideo);
   if(!ids.length)return false;
   const u=new URL('./api/youtube',location.href.split('#')[0]);
   u.searchParams.set('mode','validate');u.searchParams.set('ids',ids.join(','));
   const ctrl=new AbortController();const timer=setTimeout(()=>ctrl.abort(),10500);
   let response;try{response=await fetch(u.href,{signal:ctrl.signal,headers:{Accept:'application/json'}})}finally{clearTimeout(timer)}
   if(!response.ok)return false;
   const result=await response.json();
   if(!Array.isArray(result.available)||result.checked!==ids.length)return false;
   const validIds=new Set(result.available.filter(validVideo));
   const removed=curated.filter(c=>!validIds.has(c.id)).map(c=>c.id);
   if(!removed.length)return false;
   for(let i=curated.length-1;i>=0;i--)if(!validIds.has(curated[i].id))curated.splice(i,1);
   state.items=state.items.filter(c=>!removed.includes(c.id));
   if(state.selected&&!validIds.has(state.selected.id))state.selected=curated[0]||null;
   state.message=removed.length+' unavailable or unembeddable videos were excluded from this session.';
   return true;
  }catch(e){return false}
 })();
 return verificationInFlight;
}
window.SYLUTION_VIDEO={curated,state,categories,filtered,toggleSaved,search,select,getLessons,lessons,currentLesson,setLesson,finish,progress,validVideo,photo,verifyCatalog};
})();