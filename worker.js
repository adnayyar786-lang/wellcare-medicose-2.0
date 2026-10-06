const json=(data,status=200,extra={})=>new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"public, max-age=300",...extra}});
function decodeBingUrl(value){return value.split("\\u002f").join("/").split("\\/").join("/").split("\\u003d").join("=").split("\\u0026").join("&").split("\\\"").join('"')}
export default {async fetch(request,env){const u=new URL(request.url);
if(u.pathname==="/api/product-image"){const name=(u.searchParams.get("name")||"").trim(),brand=(u.searchParams.get("brand")||"").trim(),salt=(u.searchParams.get("salt")||"").trim(),type=(u.searchParams.get("type")||"medicine product").trim();if(!name)return json({error:"missing_name"},400);
const cacheKey=new Request(u.toString(),request);const cache=caches.default;const cached=await cache.match(cacheKey);if(cached)return cached;
const query=[name,brand,salt,type].filter(Boolean).join(" ");try{
const target="https://www.bing.com/images/search?q="+encodeURIComponent(query)+"&form=HDRSC2";
const res=await fetch(target,{headers:{"user-agent":"Mozilla/5.0 (compatible; WellcareMedicose/2.0)","accept":"text/html"}});
const html=await res.text();const urls=[];const seen=new Set();
const tileRe=/<a[^>]+class=["']iusc["'][^>]+m=["']([^"']+)["']/gi;
let tile;
while((tile=tileRe.exec(html))!==null&&urls.length<12){
  try{
    const raw=tile[1].replace(/&quot;/g,'"').replace(/&amp;/g,'&');
    const meta=JSON.parse(raw);
    const v=decodeBingUrl(String(meta.murl||""));
    if((v.startsWith("https://")||v.startsWith("http://"))&&!seen.has(v)){seen.add(v);urls.push(v)}
  }catch{}
}
if(!urls.length){
  const marker='"murl":"';let pos=0;
  while((pos=html.indexOf(marker,pos))!==-1&&urls.length<12){
    const start=pos+marker.length;const end=html.indexOf('"',start);if(end===-1)break;
    const v=decodeBingUrl(html.slice(start,end));
    if((v.startsWith("https://")||v.startsWith("http://"))&&!seen.has(v)){seen.add(v);urls.push(v)}
    pos=end+1
  }
}
for(const imageUrl of urls){try{const img=await fetch(imageUrl,{headers:{"user-agent":"Mozilla/5.0","accept":"image/avif,image/webp,image/apng,image/*,*/*;q=0.8"}});if(!img.ok)continue;const type=img.headers.get("content-type")||"image/jpeg";if(!type.startsWith("image/"))continue;const out=new Response(img.body,{status:200,headers:{"content-type":type,"cache-control":"public, max-age=86400, s-maxage=604800"}});await cache.put(cacheKey,out.clone());return out}catch{}}
return json({error:"image_not_found"},404);
}catch(e){return json({error:"image_lookup_failed"},502)}}return env.ASSETS.fetch(request);}};