/* Vercel Node.js serverless YouTube Data API proxy.
   Set YOUTUBE_API_KEY in the hosting environment, never in client source.
   Do not treat YouTube search results as SYLUTION-owned videos. */
module.exports=async function handler(req,res){
  res.setHeader('Content-Type','application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options','nosniff');
  if(req.method!=='GET'){res.setHeader('Allow','GET');return res.status(405).json({error:'GET only'})}
  const key=process.env.YOUTUBE_API_KEY;
  if(!key)return res.status(503).json({error:'YouTube API is not configured on this deployment. Set the YOUTUBE_API_KEY server environment variable.'});
  const q=req.query||{},mode=String(q.mode||'search'),max=mode==='search'?12:50;
  const params=new URLSearchParams({key,part:'snippet',maxResults:String(max)});
  if(mode==='validate'){
    const ids=String(q.ids||'').split(',').filter(Boolean);
    if(!ids.length||ids.length>50||ids.some(id=>!/^[a-zA-Z0-9_-]{11}$/.test(id)))
      return res.status(400).json({error:'Supply 1–50 valid YouTube video IDs.'});
    const args=new URLSearchParams({key,part:'snippet,status',id:ids.join(','),maxResults:'50'});
    try{
      const ctrl=new AbortController();const timer=setTimeout(()=>ctrl.abort(),9000);
      let r;try{r=await fetch('https://www.googleapis.com/youtube/v3/videos?'+args.toString(),{signal:ctrl.signal})}finally{clearTimeout(timer)}
      if(!r.ok)return res.status(503).json({error:'Verification unavailable; keep previously selected catalog until checked.'});
      const data=await r.json();
      const available=(data.items||[]).filter(v=>v?.status?.privacyStatus==='public'&&v?.status?.embeddable===true).map(v=>v.id);
      res.setHeader('Cache-Control','public, s-maxage=1800, stale-while-revalidate=3600');
      return res.status(200).json({available,checked:ids.length,source:'YouTube Data API videos.list'});
    }catch(e){return res.status(503).json({error:'Video verification is temporarily unavailable.'})}
  }
  if(mode==='search'){
    const keyword=String(q.q||'').trim().slice(0,80);
    if(keyword.length<2)return res.status(400).json({error:'Enter at least two characters to search.'});
    const kind=q.kind==='playlist'?'playlist':'video';
    params.set('q',keyword+' full course tutorial');
    params.set('type',kind);
    params.set('safeSearch','moderate');
    if(kind==='video'){params.set('videoEmbeddable','true');params.set('videoDuration','long')}
    params.set('order','relevance');
  }else if(mode==='playlist'){
    const id=String(q.id||'');
    if(!/^[a-zA-Z0-9_-]{12,60}$/.test(id))return res.status(400).json({error:'Invalid playlist ID'});
    params.set('playlistId',id);
  }else return res.status(400).json({error:'Unknown API mode'});
  if(q.pageToken){
    const token=String(q.pageToken);
    if(!/^[A-Za-z0-9_-]{4,256}$/.test(token))return res.status(400).json({error:'Invalid page token'});
    params.set('pageToken',token)
  }
  const url='https://www.googleapis.com/youtube/v3/'+(mode==='search'?'search':'playlistItems')+'?'+params.toString();
  try{
    const ctrl=new AbortController();
    const timer=setTimeout(()=>ctrl.abort(),11000);
    let r;try{r=await fetch(url,{signal:ctrl.signal,headers:{'Accept':'application/json'}})}finally{clearTimeout(timer)}
    if(!r.ok){
      const errorBody=await r.json().catch(()=>({}));
      const reason=errorBody?.error?.errors?.[0]?.reason;
      return res.status(r.status===403?503:502).json({error:reason==='quotaExceeded'?'Daily YouTube API quota exhausted. Try again later.':'YouTube API request failed. Check your API key, quota and restrictions.',reason:reason||'upstream'});
    }
    const result=await r.json();
    res.setHeader('Cache-Control',mode==='search'?'public, s-maxage=900, stale-while-revalidate=900':'public, s-maxage=300, stale-while-revalidate=600');
    const items=(result.items||[]).map(x=>{
      const s=x.snippet||{},id=mode==='search'?(q.kind==='playlist'?x.id?.playlistId:x.id?.videoId):(x.contentDetails?.videoId||s.resourceId?.videoId);
      if(!id||s.title==='Private video'||s.title==='Deleted video')return null;
      const type=mode==='search'&&q.kind==='playlist'?'playlist':'video';
      return {id,type,title:s.title||'',creator:s.channelTitle||'YouTube creator',description:s.description||'',image:s.thumbnails?.medium?.url||s.thumbnails?.default?.url||'',publishedAt:s.publishedAt||''}
    }).filter(Boolean);
    return res.status(200).json({items,nextPageToken:result.nextPageToken||null,total:result.pageInfo?.totalResults||items.length,source:'YouTube Data API',mode});
  }catch(e){return res.status(502).json({error:e.name==='AbortError'?'YouTube API request timed out.':'YouTube service is temporarily unavailable.'})}
};