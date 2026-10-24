/* Assessment and locally generated study records for SYLUTION Learn.
   A local record is not accredited or identity verified. */
(function(){
'use strict';
const A=window.SYLUTION_ASSESS,V=window.SYLUTION_VIDEO;
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const current=()=>V.state.selected;
const head=(tag,title,description)=>'<div class="learning-head"><span class="learning-kicker">'+tag+'</span><h1>'+esc(title)+'</h1><p>'+esc(description)+'</p></div>';
function assessment(){
 const c=current();if(!c)return '<section class="screen"><p>Select a course to start an assessment.</p><button data-go="courses" class="btn btn-primary">Courses</button></section>';
 const q=A.questions(c.id),r=A.record(c.id),attempt=A.attempt,started=attempt.id===c.id;
 const mark=V.progress(c);
 let body;
 if(!q.length)body='<div class="learning-panel"><p>This course does not yet have a course-specific knowledge check.</p></div>';
 else if(!started)body='<div class="learning-panel learning-ready"><div class="learning-summary"><div><strong>'+q.length+'</strong><span>Questions</span></div><div><strong>'+A.PASS+'%</strong><span>Pass mark</span></div><div><strong>'+mark+'%</strong><span>Chapter progress</span></div></div><p>This is an independent knowledge check written by SYLUTION Learn, not an exam from YouTube or the original instructor. You may practise anytime. A local completion record requires 100% chapter progress and a passing result.</p><button class="btn btn-primary" data-action="qa-start">Begin assessment →</button>'+(r.latest?'<p class="learning-previous">Your previous score: <strong>'+r.latest.score+'%</strong> · '+(r.latest.passed?'Passed':'Try again')+'</p>':'')+'</div>';
 else if(!r.latest||A.attempt.resultsOpen!==true){
  body='<div class="learning-question-stack">'+q.map((item,i)=>'<fieldset class="learning-question"><legend><span>QUESTION '+(i+1)+' OF '+q.length+'</span>'+esc(item.text)+'</legend><div class="learning-options">'+item.choices.map((text,k)=>'<button type="button" data-action="qa-answer" data-index="'+i+'" data-option="'+k+'" class="learning-option '+(attempt.answers[i]===k?'selected':'')+'" aria-pressed="'+(attempt.answers[i]===k?'true':'false')+'"><span>'+String.fromCharCode(65+k)+'</span>'+esc(text)+'</button>').join('')+'</div></fieldset>').join('')+'</div>'+
  '<div class="learning-submit-bar"><span>'+attempt.answers.filter(x=>x!==null).length+' / '+q.length+' answered</span><button data-action="qa-submit" class="btn btn-primary" '+(attempt.answers.includes(null)?'disabled':'')+'>Submit assessment →</button></div>';
 }else{
  const v=r.latest;
  body='<div class="learning-score '+(v.passed?'passed':'retry')+'"><span>'+ (v.passed?'ASSESSMENT PASSED':'KEEP PRACTISING') +'</span><strong>'+v.score+'%</strong><p>'+v.correct+' / '+v.total+' correct answers. '+(v.passed?'Knowledge check passed.':'Review the explanations and try again.')+'</p>'+'</div>'+
  '<div class="learning-review">'+q.map((item,i)=>{const answer=v.answers[i];return '<div class="learning-review-item"><strong>'+esc(item.text)+'</strong><p class="'+(answer===item.correct?'correct':'incorrect')+'">Your answer: '+esc(item.choices[answer]??'Not answered')+' '+(answer===item.correct?'✓':'✕')+'</p><p>Correct: '+esc(item.choices[item.correct])+'</p><small>'+esc(item.explanation)+'</small></div>'}).join('')+'</div>'+
  '<div class="learning-review-actions"><button class="btn btn-primary" data-action="qa-start">Try again</button>'+(A.eligible(c.id,mark)?'<button class="btn btn-outline" data-action="qa-certificate">View completion record</button>':'<button class="btn btn-outline" data-action="yt-back">Back to course</button>')+'</div>';
 }
 return '<section class="screen learning-assessment"><button class="back-btn" data-action="yt-back">← Back to curriculum</button>'+head('COURSE KNOWLEDGE CHECK',c.title,'Answer the questions to check your understanding of the course material.')+body+'</section>';
}
function certificate(){
 const c=current(),data=c?A.completion(c.id,V.progress(c)):null;
 if(!data)return '<section class="screen learning-assessment"><button class="back-btn" data-go="profile">← Back to Profile</button>'+head('STUDY RECORD','Not available yet','Complete all chapters and pass the course knowledge check (at least '+A.PASS+'%).')+'<button class="btn btn-primary" data-go="courses">Browse courses</button></section>';
 let display='Learner';try{const st=JSON.parse(localStorage.getItem('user'));if(st?.name)display=st.name}catch(e){}
 const when=new Date(data.date);
 return '<section class="screen learning-certificate"><button class="back-btn" data-go="profile">← My profile</button>'+
 '<div class="learning-document"><div class="learning-doc-top"><strong>SYLUTION <em>Learn</em></strong><small>LEARN · BUILD · GROW</small></div><div class="learning-doc-rule"></div><span>PERSONAL STUDY ACHIEVEMENT</span><h1>Learning Completion Record</h1><p>This record acknowledges that</p><h2>'+esc(display)+'</h2><p>has self-reported completion of the study chapters for</p><h3>'+esc(c.title)+'</h3><div class="learning-doc-metrics"><div><strong>'+data.score+'%</strong><small>Best knowledge check score</small></div><div><strong>'+esc(Number.isNaN(when.getTime())?'Date unavailable':when.toLocaleDateString('en-GB',{year:'numeric',month:'long',day:'numeric'}))+'</strong><small>Assessment passed</small></div></div><p class="learning-doc-source">Original course creator: '+esc(c.creator)+'</p><div class="learning-doc-ref">Local reference: '+esc(data.reference)+'</div><div class="learning-doc-warning"><strong>Unverified local study record</strong><p>Issued locally by this browser-based demonstration of SYLUTION Learn. It is not an accredited certificate, identity verification, examination proctoring, or a credential issued by the original video creator. It cannot be independently verified and may be altered through local browser data.</p></div></div>'+
 '<div class="learning-doc-actions"><button class="btn btn-primary" data-action="qa-print">Print / Save as PDF</button><button class="btn btn-outline" data-action="qa-start">Retake knowledge check</button></div></section>';
}
function action(name,el,tools){
 const c=current();if(!c)return false;
 if(name==='qa-open'){tools.nav('ytassessment',c.id);return true}
 if(name==='qa-start'){if(!A.start(c.id)){tools.toast('Questions are not ready for this course.');return true}tools.nav('ytassessment',c.id);return true}
 if(name==='qa-answer'){A.answer(Number(el.index),Number(el.option));tools.render();return true}
 if(name==='qa-submit'){const result=A.submit(c.id);if(result.error){tools.toast(result.error);return true}A.attempt.resultsOpen=true;tools.render();tools.toast(result.passed?'Assessment passed!':'Assessment finished. You can try again.');return true}
 if(name==='qa-certificate'){tools.nav('ytcompletion',c.id);return true}
 if(name==='qa-print'){window.print();return true}
 return false;
}
window.SYLUTION_ASSESS_UI={assessment,certificate,action};
})();