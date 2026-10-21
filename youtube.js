/* SYLUTION Learn YouTube education catalog.
   Curated courses work without an API key. Live discovery requires /api/youtube
   on a server that has a protected YOUTUBE_API_KEY environment variable.
   Original video ownership, YouTube attribution and player UI are retained. */
(function(){
'use strict';
const curate=[
{id:'rfscVS0vtbw',title:'Learn Python — Full Course for Beginners',creator:'freeCodeCamp.org',category:'Programming',level:'Beginner',description:'Start programming with Python: setup, variables, functions, loops, files and projects.',hours:'4h 26m',chapters:[['Introduction',0],['Install Python & Set Up',105],['Variables and Data Types',906],['Strings, Numbers and Input',1623],['Lists and Functions',3800],['Conditions and Loops',6006],['Files and Modules',11261],['Classes and Final Quiz',13436]]},
{id:'pQN-pnXPaVg',title:'HTML Full Course — Build a Website',creator:'freeCodeCamp.org',category:'Web Development',level:'Beginner',description:'HTML tags, formatting, links, images, tables, forms and embedding media.',hours:'2h',chapters:[['Introduction',0],['Text Editor and First HTML File',114],['Basic HTML Tags',1231],['Styling and Formatting',2533],['Links and Images',3556],['Videos, Lists and Tables',4572],['Divs, Forms and Meta Tags',5841]]},
{id:'PkZNo7MFNFg',title:'JavaScript — Full Course for Beginners',creator:'freeCodeCamp.org',category:'Programming',level:'Beginner',description:'Complete fundamentals from variables and arrays to objects, loops and ES6.',hours:'3h 20m+',chapters:[['Introduction & JavaScript Setup',0],['Variables and Operators',356],['Strings',1279],['Arrays',2444],['Functions and Scope',3101],['Conditions and Objects',4104],['Loops',7815],['Modern JavaScript and ES6',9456]]},
{id:'HXV3zeQKqGY',title:'SQL Tutorial — Full Database Course',creator:'freeCodeCamp.org',category:'Data & Analytics',level:'Beginner',description:'Learn SQL and database basics, tables, queries, joins and database design.',hours:'4h+',chapters:[['What Is a Database?',156],['Tables and Keys',1390],['SQL Basics and Setup',2611],['Creating Tables and Data',4549],['Queries and Functions',6971],['Joins and Nested Queries',10896],['ER Diagrams and Database Design',13332]]},
{id:'KJgsSFOSQv0',title:'C Programming Tutorial for Beginners',creator:'freeCodeCamp.org',category:'Programming',level:'Beginner',description:'Programming fundamentals with C, variables, arrays, functions, loops and pointers.',hours:'3h 45m+',chapters:[['Introduction',0],['Setup and Hello World',82],['Variables and Data Types',1256],['Input and Arrays',3600],['Functions and Decisions',5804],['Loops and Structs',8487],['Pointers and Memory',11350],['Writing and Reading Files',12757]]},
{id:'vLnPwxZdW4Y',title:'C++ Tutorial for Beginners — Full Course',creator:'freeCodeCamp.org',category:'Programming',level:'Beginner',description:'Get started with C++ syntax, functions, control flow, classes and objects.',hours:'4h',chapters:[['Introduction and Installation',0],['Variables and Data Types',1195],['Strings, Numbers and Input',2355],['Arrays and Functions',4425],['Conditions and Loops',5722],['Pointers',10751],['Classes, Objects and Inheritance',11606]]}
];
const photo=id=>'https://i.ytimg.com/vi/'+id+'/hqdefault.jpg';
const validVideo=id=>/^[a-zA-Z0-9_-]{11}$/.test(String(id||''));
const validPlaylist=id=>/^[a-zA-Z0-9_-]{12,60}$/.test(String(id||''));
const normalizeCourse=c=>Object.assign({},c,{type:c.type||'video',image:c.image||photo(c.id),source:'YouTube',hours:c.hours||'Full course',chapters:c.chapters||[['Full video',0]]});
const curated=curate.map(normalizeCourse);
const state={items:curated.slice(),query:'',kind:'video',status:'curated',message:'Six verified full-length courses are ready. Live search needs a Google Cloud API key configured on your server.',page:null,selected:curated[0],lesson:0,playlistLessons:[],courseProgress:(()=>{try{return JSON.parse(localStorage.getItem('sylution_yt-progress'))||{}}catch(e){return{}}})()};
const searchApi=async(q,kind,token)=>{const u=new URL('./api/youtube',location.href.split('#')[0]);u.searchParams.set('mode','search');u.searchParams.set('q',q);u.searchParams.set('kind',kind);if(token)u.searchParams.set('pageToken',token);const res=await fetch(u.href,{headers:{'Accept':'application/json'}});const data=await res.json().catch(()=>({error:'Server response was not JSON'}));if(!res.ok)throw Error(data.error||'YouTube search is not configured');return data};
const listPlaylist=async(id,token)=>{if(!validPlaylist(id))throw Error('Invalid playlist');const u=new URL('./api/youtube',location.href.split('#')[0]);u.searchParams.set('mode','playlist');u.searchParams.set('id',id);if(token)u.searchParams.set('pageToken',token);const res=await fetch(u.href);const data=await res.json().catch(()=>({error:'Could not read server response'}));if(!res.ok)throw Error(data.error||'Playlist unavailable');return data};
function sanitize(item){
if(!item)return null;
const type=item.type==='playlist'?'playlist':'video',id=String(item.id||'');
if(!(type==='video'?validVideo(id):validPlaylist(id)))return null;
return {id,type,title:String(item.title||'Untitled course').slice(0,200),creator:String(item.creator||'YouTube creator').slice(0,120),category:String(item.category||'YouTube Courses').slice(0,80),level:String(item.level||'All levels'),description:String(item.description||'Video course from YouTube').slice(0,600),image:type==='video'?photo(id):(String(item.image||'').startsWith('https://')?item.image:''),hours:String(item.hours||'Full course'),chapters:[],source:'YouTube',publishedAt:item.publishedAt||''};
}
async function search(query,kind){
const q=String(query||'').trim().slice(0,80);
if(q.length<2){state.items=curated.slice();state.status='curated';state.message='Showing our curated courses. Enter at least two letters to search.';return state}
state.query=q;state.kind=kind==='playlist'?'playlist':'video';state.status='loading';state.message='Searching YouTube...';
try{const result=await searchApi(q,state.kind);state.items=(result.items||[]).map(sanitize).filter(Boolean);state.page=result.nextPageToken||null;state.status='api';state.message=state.items.length?'Live YouTube results. Videos and playlists belong to their original creators.':'No results. Try another subject.'}
catch(e){state.items=curated.filter(c=>(c.title+' '+c.category+' '+c.description).toLowerCase().includes(q.toLowerCase()));state.status='fallback';state.page=null;state.message='Live YouTube search is not active: '+String(e.message||e)+'. Showing matching starter courses instead.'}
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
window.SYLUTION_VIDEO={curated,state,search,select,getLessons,lessons,currentLesson,setLesson,finish,progress,validVideo,photo};
})();