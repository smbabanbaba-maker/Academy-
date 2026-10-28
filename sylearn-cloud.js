/* SYLearn Cloud Accounts V1 — Supabase Auth + opt-in cloud sync.
 * Uses a PUBLIC publishable key and RLS, never a secret/service_role key.
 * Offline study remains local-first; imported guest data requires consent.
 * Quiz scores/certificates are still local and unverified.
 */
(function(){
'use strict';
const ENDPOINT='https://ctipxeukshkfigbkatnl.supabase.co';
const PUBLISHABLE_KEY='sb_publishable_lxNkqUvgdVtlEBhT7UYL1Q_e6j6wn89';
const sdk=window.supabase;
const V=window.SYLUTION_VIDEO;
const db=sdk&&typeof sdk.createClient==='function'?
 sdk.createClient(ENDPOINT,PUBLISHABLE_KEY,{
  auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,
   storageKey:'sylearn-supabase-auth-v1'}
 }):null;
const PREFIX='sylearn-cloud-';
const COURSES=new Map((V?.curated||[]).map(c=>[c.id,c]));
let user=null,linked=false,connecting=false,uploading=false,pending=false,notice='',catalogOnline=false,authReady=false,recovery=false;
let currentUserId='',queueTimer=null;
const safeJSON=(s,fallback)=>{try{return s?JSON.parse(s):fallback}catch(e){return fallback}};
const get=(k)=>{try{return localStorage.getItem(k)}catch(e){return null}};
const put=(k,v)=>{try{localStorage.setItem(k,typeof v==='string'?v:JSON.stringify(v))}catch(e){}};
const del=(k)=>{try{localStorage.removeItem(k)}catch(e){}};
const path=kind=>PREFIX+kind;
const linkedKey=uid=>path('linked-'+uid);
const snapshotKey=owner=>path('snapshot-'+owner);
const queueKey=uid=>path('queue-'+uid);
const keys=()=>{
 const all=[];
 try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k?.startsWith('sylution_'))all.push(k)}}catch(e){}
 return all;
};
const snapshot=()=>{
 const records={};for(const k of keys()){const v=get(k);if(v!==null)records[k]=v}
 return records;
};
const storeSnapshot=owner=>put(snapshotKey(owner),snapshot());
const restoreSnapshot=owner=>{
 const records=safeJSON(get(snapshotKey(owner)),{});
 for(const k of keys())del(k);
 for(const [k,v] of Object.entries(records||{})){
  if(k.startsWith('sylution_')&&typeof v==='string')put(k,v);
 }
};
const studyData=records=>{
 const saved=safeJSON(records['sylution_yt-saved'],[]);
 const progress=safeJSON(records['sylution_yt-progress'],{});
 return (Array.isArray(saved)&&saved.length>0)||
  (progress&&typeof progress==='object'&&Object.values(progress).some(a=>Array.isArray(a)&&a.length>0))||
  Object.keys(records).some(k=>k.startsWith('sylution_yt-note-')&&records[k]?.length>0);
};
const emit=()=>{
 try{window.dispatchEvent(new CustomEvent('sylearn-cloud-change',{detail:status()}))}catch(e){}
};
const status=()=>({
 available:!!db,user:user?{id:user.id,email:user.email}:null,
 linked,connecting,pending,authReady,notice,catalogOnline,recovery,
 unsynced:user?Object.keys(safeJSON(get(queueKey(user.id)),{})).length:0
});
const check=resp=>{if(resp?.error)throw Error(resp.error.message||'Cloud request failed');return resp?.data};
const courseValid=id=>COURSES.has(id);
const chapterValid=(id,i)=>courseValid(id)&&Number.isInteger(i)&&i>=0&&i<(COURSES.get(id).chapters||[]).length;
const validCourseRows=data=>Array.isArray(data)?data.filter(r=>r&&courseValid(r.course_id)):[];
const readRemote=async()=>{
 if(!user)throw Error('Sign in first');
 const [a,b,c,d]=await Promise.all([
  db.from('saved_courses').select('course_id').eq('user_id',user.id),
  db.from('chapter_progress').select('course_id,chapter_index').eq('user_id',user.id),
  db.from('study_notes').select('course_id,chapter_index,body').eq('user_id',user.id),
  db.from('profiles').select('display_name,preferred_language').eq('id',user.id).maybeSingle()
 ]);
 return {saved:validCourseRows(check(a)),progress:validCourseRows(check(b)).filter(r=>chapterValid(r.course_id,r.chapter_index)),
  notes:validCourseRows(check(c)).filter(r=>chapterValid(r.course_id,r.chapter_index)),
  profile:check(d)};
};
const localSaved=()=>[...new Set((safeJSON(get('sylution_yt-saved'),[])||[]).filter(id=>typeof id==='string'&&courseValid(id)))];
const localProgress=()=>{
 const p=safeJSON(get('sylution_yt-progress'),{}),rows=[];
 if(!p||Array.isArray(p)||typeof p!=='object')return rows;
 for(const [key,indices] of Object.entries(p)){
  if(!key.startsWith('video:')||!Array.isArray(indices))continue;
  const id=key.slice(6);
  if(!courseValid(id))continue;
  for(const i of new Set(indices)){if(chapterValid(id,i))rows.push({user_id:user.id,course_id:id,chapter_index:i,source:'legacy_local'})}
 }
 return rows;
};
const localNotes=()=>{
 const rows=[];
 for(const k of keys()){
  const m=/^sylution_yt-note-(.+)-(\d+)$/.exec(k);
  if(!m||!chapterValid(m[1],Number(m[2])))continue;
  const body=String(get(k)||'').slice(0,6000);
  if(body.trim())rows.push({user_id:user.id,course_id:m[1],chapter_index:Number(m[2]),body});
 }
 return rows;
};
const readQueue=()=>safeJSON(get(queueKey(user.id)),{});
const persistQueue=val=>put(queueKey(user.id),val);
const send=async op=>{
 if(!db||!user||!linked)return;
 let q;
 if(op.type==='saved'){
  q=op.value?
   db.from('saved_courses').upsert({user_id:user.id,course_id:op.course},{onConflict:'user_id,course_id'}):
   db.from('saved_courses').delete().eq('user_id',user.id).eq('course_id',op.course);
 }else if(op.type==='progress'){
  q=db.from('chapter_progress').upsert({user_id:user.id,course_id:op.course,chapter_index:op.index,source:op.source||'learner_marked'},
   {onConflict:'user_id,course_id,chapter_index'});
 }else if(op.type==='note'){
  q=db.from('study_notes').upsert({user_id:user.id,course_id:op.course,chapter_index:op.index,body:op.body},
   {onConflict:'user_id,course_id,chapter_index'});
 }else if(op.type==='profile'){
  q=db.from('profiles').upsert({id:user.id,display_name:op.name,preferred_language:op.language},{onConflict:'id'});
 }else return;
 check(await q);
};
async function flushQueue(){
 if(!db||!linked||!user||uploading||!navigator.onLine)return;
 uploading=true;
 const uid=user.id;
 try{
  const batch=Object.entries(readQueue());
  for(const [key,op] of batch){
   if(!user||user.id!==uid)break;
   try{
    await send(op);
    const latest=readQueue();
    if(JSON.stringify(latest[key])===JSON.stringify(op)){
     delete latest[key];persistQueue(latest);
    }
   }catch(err){notice='Some changes are saved on this device and will retry online.';break}
  }
 }finally{uploading=false;emit()}
}
const queue=op=>{
 if(!db||!user||!linked)return;
 const q=readQueue();
 const id=op.type+':'+(op.course||'profile')+':'+(op.index??'');
 q[id]=op;persistQueue(q);
 clearTimeout(queueTimer);
 queueTimer=setTimeout(()=>{flushQueue().catch(()=>{})},450);
 emit();
};
function applyRemote(rows){
 const saved=[...new Set(rows.saved.map(r=>r.course_id))];
 const progress={};
 for(const r of rows.progress){
  const key='video:'+r.course_id;
  if(!progress[key])progress[key]=[];
  if(!progress[key].includes(r.chapter_index))progress[key].push(r.chapter_index);
 }
 const existing=snapshot();
 // Protect pre-existing local-only notes from disappearing; cloud is authoritative
 // for matching note IDs. A full device backup is kept before any sync.
 for(const k of Object.keys(existing)){
  if(/^sylution_yt-note-/.test(k))del(k);
 }
 for(const r of rows.notes)put('sylution_yt-note-'+r.course_id+'-'+r.chapter_index,String(r.body||'').slice(0,6000));
 put('sylution_yt-saved',saved);put('sylution_yt-progress',progress);
 if(V){
  V.state.saved=saved.slice();V.state.courseProgress=progress;
 }
 if(rows.profile?.display_name&&rows.profile.display_name!=='Learner'){
  const current=safeJSON(get('sylution_user'),{});
  const next={...current,name:String(rows.profile.display_name).slice(0,60),
   preferred:rows.profile.preferred_language==='Hausa'?'Hausa':'English'};
  put('sylution_user',next);
 }
 storeSnapshot(user.id);
 try{window.dispatchEvent(new Event('sylearn-cloud-data'))}catch(e){}
}
async function refresh(){
 if(!db||!user||!linked||connecting)return false;
 connecting=true;emit();
 try{
  // Never overwrite a pending offline deletion/change with an older cloud value.
  await flushQueue();
  if(Object.keys(readQueue()).length)throw Error('Reconnect to sync pending changes first');
  const rows=await readRemote();
  storeSnapshot(user.id);
  applyRemote(rows);
  notice='Your learning records are synced.';
  return true;
 }catch(err){notice=String(err.message||'Cloud sync unavailable');return false}
 finally{connecting=false;emit()}
}
async function linkDevice(){
 if(!db||!user)throw Error('Sign in first');
 if(linked)return refresh();
 if(connecting)throw Error('Sync is already running');
 connecting=true;emit();
 try{
  const rows=await readRemote();
  const uid=user.id;
  const before=snapshot();
  put(path('backup-before-import-'+uid),before);
  const savedSet=new Set(rows.saved.map(r=>r.course_id));
  const missingSaved=localSaved().filter(id=>!savedSet.has(id)).map(course_id=>({user_id:uid,course_id}));
  const done=new Set(rows.progress.map(r=>r.course_id+':'+r.chapter_index));
  const missingProgress=localProgress().filter(r=>!done.has(r.course_id+':'+r.chapter_index));
  const existingNotes=new Set(rows.notes.map(r=>r.course_id+':'+r.chapter_index));
  const missingNotes=localNotes().filter(r=>!existingNotes.has(r.course_id+':'+r.chapter_index));
  if(missingSaved.length)check(await db.from('saved_courses').upsert(missingSaved,{onConflict:'user_id,course_id'}));
  if(missingProgress.length)check(await db.from('chapter_progress').upsert(missingProgress,{onConflict:'user_id,course_id,chapter_index'}));
  if(missingNotes.length)check(await db.from('study_notes').upsert(missingNotes,{onConflict:'user_id,course_id,chapter_index'}));
  const updated=await readRemote();
  linked=true;pending=false;
  put(linkedKey(uid),'1');put(path('owner'),uid);
  applyRemote(updated);
  notice='Cloud sync is enabled for this account.';
  return {saved:updated.saved.length,chapters:updated.progress.length,notes:updated.notes.length};
 }catch(err){notice=String(err.message||'Import failed');throw err}
 finally{connecting=false;emit()}
}
async function activate(next){
 authReady=true;
 if(!next){
  const previousOwner=get(path('owner'));
  if(previousOwner&&get(snapshotKey('guest'))!==null){
   storeSnapshot(previousOwner);restoreSnapshot('guest');del(path('owner'));
   setTimeout(()=>location.reload(),0);
  }
  user=null;linked=false;pending=false;currentUserId='';
  notice='Sign in to sync your learning across devices.';emit();return;
 }
 if(currentUserId===next.id&&user)return;
 const previousOwner=get(path('owner'));
 let swapped=false;
 if(previousOwner&&previousOwner!==next.id){
  storeSnapshot(previousOwner);
  restoreSnapshot(next.id);
  put(path('owner'),next.id);
  swapped=true;
 }else if(!previousOwner){
  if(get(snapshotKey('guest'))===null)storeSnapshot('guest');
  const existing=safeJSON(get(snapshotKey(next.id)),null);
  if(existing)restoreSnapshot(next.id);
 }
 currentUserId=next.id;user=next;
 linked=get(linkedKey(next.id))==='1';
 if(linked){
  put(path('owner'),next.id);
  notice='Signed in. Checking your saved progress.';
  emit();setTimeout(()=>{refresh().catch(()=>{})},0);
 }else if(studyData(snapshot())){
  pending=true;notice='Confirm that the study records on this device belong to your account before importing.';
  emit();
 }else{
  linked=true;pending=false;put(linkedKey(next.id),'1');put(path('owner'),next.id);
  notice='Signed in. Loading your cloud learning records.';
  emit();setTimeout(()=>{refresh().catch(()=>{})},0);
 }
 if(swapped)setTimeout(()=>location.reload(),0);
}
async function boot(){
 if(!db){authReady=true;notice='Cloud sign-in could not load. Device learning still works.';emit();return}
 try{
  const {data,error}=await db.auth.getSession();
  if(error)throw error;
  await activate(data.session?.user||null);
  db.auth.onAuthStateChange((event,session)=>{
   if(event==='PASSWORD_RECOVERY'){
    recovery=true;location.hash='#/account';emit();
   }
   setTimeout(()=>{activate(session?.user||null).catch(()=>{})},0);
  });
 }catch(err){authReady=true;notice='Unable to check cloud account right now.';emit()}
 loadCatalog().catch(()=>{});
}
async function loadCatalog(){
 if(!db||!V)return false;
 try{
  const [c,ch]=await Promise.all([
   db.from('courses').select('id,title,creator,category,level,description,hours_label,thumbnail_url,is_featured').eq('is_published',true),
   db.from('course_chapters').select('course_id,chapter_index,title,start_seconds').order('chapter_index',{ascending:true})
  ]);
  const catalog=check(c),chapters=check(ch);
  if(!Array.isArray(catalog)||!Array.isArray(chapters)||catalog.length===0)return false;
  for(const item of catalog){
   const original=COURSES.get(item.id);
   if(!original)continue; // New catalog entries need product and attribution review.
   original.title=item.title;original.creator=item.creator;original.category=item.category;
   original.level=item.level;original.description=item.description;original.hours=item.hours_label;
   if(typeof item.thumbnail_url==='string'&&/^https:\/\/i\.ytimg\.com\//.test(item.thumbnail_url))original.image=item.thumbnail_url;
   original.featured=!!item.is_featured;
   const matching=chapters.filter(x=>x.course_id===item.id).sort((a,b)=>a.chapter_index-b.chapter_index);
   if(matching.length&&matching.every((x,i)=>x.chapter_index===i))
    original.chapters=matching.map(x=>[x.title,x.start_seconds]);
  }
  catalogOnline=true;emit();return true;
 }catch(e){catalogOnline=false;emit();return false}
}
async function signIn(email,password){
 if(!db)throw Error('Cloud sign-in is temporarily unavailable.');
 const {data,error}=await db.auth.signInWithPassword({email,password});
 if(error)throw error;
 return data;
}
async function signUp(email,password,name){
 if(!db)throw Error('Cloud sign-up is temporarily unavailable.');
 const redirect=location.origin+location.pathname;
 const {data,error}=await db.auth.signUp({email,password,options:{
  emailRedirectTo:redirect,
  data:{display_name:String(name||'Learner').trim().slice(0,60)}
 }});
 if(error)throw error;return data;
}
async function updatePassword(password){
 if(!db||!user)throw Error('Sign in using the recovery link first.');
 const {error}=await db.auth.updateUser({password});
 if(error)throw error;
 recovery=false;notice='Password updated successfully.';emit();
}
async function resetPassword(email){
 if(!db)throw Error('Cloud sign-in unavailable.');
 const {error}=await db.auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname});
 if(error)throw error;
}
async function signOut(){
 if(!db||!user)return;
 const uid=user.id;
 if(linked)await flushQueue();
 if(linked)storeSnapshot(uid);
 const {error}=await db.auth.signOut();
 if(error)throw error;
 restoreSnapshot('guest');
 del(path('owner'));
 user=null;linked=false;pending=false;currentUserId='';
 notice='Signed out. Guest records restored to this device.';emit();
}
window.addEventListener('online',()=>{flushQueue().catch(()=>{});if(user&&linked)refresh().catch(()=>{})});
document.addEventListener('visibilitychange',()=>{
 if(!document.hidden&&user&&linked)flushQueue().catch(()=>{});
});
window.SYLEARN_CLOUD={
 status,signIn,signUp,signOut,resetPassword,updatePassword,linkDevice,refresh,loadCatalog,
 saveCourse:(id,saved)=>{if(courseValid(id))queue({type:'saved',course:id,value:!!saved})},
 markChapter:(id,index,source)=>{if(chapterValid(id,index))queue({type:'progress',course:id,index,source:source==='client_playback'?'client_playback':'learner_marked'})},
 saveNote:(id,index,body)=>{if(chapterValid(id,index))queue({type:'note',course:id,index,body:String(body||'').slice(0,6000)})},
 saveProfile:(name,language)=>{if(user&&linked)queue({type:'profile',name:String(name||'Learner').slice(0,60),language:language==='Hausa'?'Hausa':'English'})}
};
boot().catch(()=>{});
})();