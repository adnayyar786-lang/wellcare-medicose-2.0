const json=(data,status=200,extra={})=>new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"public, max-age=86400, s-maxage=604800",...extra}});
function decodeBingUrl(value){return value.replace(/\\u002f/g,"/").replace(/\\\//g,"/").replace(/\\u003d/g,"=").replace(/\\u0026/g,"&").replace(/\\\"/g,"\\"")}catch{return value.replace(/\\u002f/g,"/").replace(/\\u003d/g,"=").replace(/\\u0026/g,"&")}}
export default {async fetch(request,env){const u=new URL(request.url);
if(u.pathname==="/api/product-image"){const name=(u.searchParams.get("name")||"").trim(),brand=(u.searchParams.get("brand")||"").trim(),salt=(u.searchParams.get("salt")||"").trim();if(!name)return json({url:null},400);
const cacheKey=new Request(u.toString(),request);const cache=caches.default;const cached=await cache.match(cacheKey);if(cached)return cached;
const query=[name,brand,salt,"medicine product"].filter(Boolean).join(" ");try{
const target="https://www.bing.com/images/search?q="+encodeURIComponent(query)+"&form=HDRSC2";
const res=await fetch(target,{headers:{"user-agent":"Mozilla/5.0 (compatible; WellcareMedicose/2.0; +https://wellcare-medicose-2-0.adnayyar786.workers.dev)","accept":"text/html"}});
const html=await res.text();const urls=[];const re=/\"murl\":\"(https?:\\/\\/[^"]+)\"/g;let m;while((m=re.exec(html))&&urls.length<8){const v=decodeBingUrl(m[1]);if(/^https?:\\/\\//.test(v)&&!urls.includes(v))urls.push(v)}
const out=json({url:urls[0]||null,query});await cache.put(cacheKey,out.clone());return out;
}catch(e){return json({url:null,error:"image_lookup_failed"},502)}}return env.ASSETS.fetch(request);}};