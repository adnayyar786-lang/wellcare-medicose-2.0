import React,{useMemo}from"react";
import{ArrowRight,Clock,MapPin,Search,Truck}from"lucide-react";
function norm(p){return((p.n||"")+" "+(p.b||"")+" "+(p.salt||"")+" "+(p.c||"")).toLowerCase()}
export default function SearchExperience({search,products,imageRenderer,onOpen,onClear}){
 const q=search.trim().toLowerCase();
 const results=useMemo(()=>{
  if(!q)return[];
  const clean=s=>(s||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
  const terms=q.split(/\s+/).filter(Boolean);
  const human=p=>!/(pet|vet|dog|cat|puppy|kitten|animal|veterinary)/i.test((p.n+" "+p.b+" "+p.c).toLowerCase());
  const score=p=>{
    const n=clean(p.n),b=clean(p.b),s=clean(p.salt),c=clean(p.c);
    let v=0;
    if(n===q)v+=1000;
    if(n.startsWith(q))v+=700;
    if(n.split(" ").some(t=>t.startsWith(q)))v+=450;
    if(n.includes(q))v+=280;
    if(b===q||b.startsWith(q))v+=220;
    if(b.includes(q))v+=100;
    if(s.includes(q))v+=160;
    if(c.includes(q))v+=70;
    if(terms.every(t=>n.includes(t)))v+=180;
    if(terms.every(t=>(n+" "+b+" "+s+" "+c).includes(t)))v+=60;
    return v;
  };
  const pool=products.filter(human);
  const matches=pool.map(p=>({...p,_score:score(p)})).filter(p=>p._score>0).sort((a,b)=>b._score-a._score);
  const primary=matches[0];
  const sameSalt=primary?.salt?pool.filter(p=>p.id!==primary.id&&p.salt&&p.salt.toLowerCase()===primary.salt.toLowerCase()).sort((a,b)=>score(b)-score(a)):[];
  const related=matches.filter(p=>p.id!==primary?.id&&!sameSalt.some(x=>x.id===p.id));
  const out=[];
  if(primary)out.push({...primary,_kind:"EXACT"});
  for(const p of sameSalt)if(out.length<6)out.push({...p,_kind:"SAME COMPOSITION"});
  for(const p of related)if(out.length<6)out.push({...p,_kind:p.b&&primary&&p.b.toLowerCase()===primary.b?.toLowerCase()?"SAME BRAND":"RELATED PRODUCT"});
  return out.slice(0,6);
 },[q,products]);
 if(!q)return null;
 return <div className="wcSearchExperience">
  <div className="wcSearchPanelHead">
   <div><span className="wcSearchEyebrow">LIVE CATALOGUE SEARCH</span><h3>Search results for “{search}”</h3><p>No fake keyword suggestions — only products from the Wellcare catalogue.</p></div>
   <button className="wcSearchClear" onClick={onClear}>Clear</button>
  </div>
  {results.length?<div className="wcSearchResultList">{results.map((p,i)=><button className="wcSearchResult" key={p.id} onClick={()=>onOpen(p)}>
    <div className="wcSearchResultImage">{imageRenderer(p)}</div>
    <div className="wcSearchResultInfo"><div><span>{p._kind||"RELATED PRODUCT"}</span><small>{p.b||"Wellcare"} · {p.c||"Healthcare"}</small></div><b>{p.n}</b><p>{p.salt||"Trusted healthcare product"}</p><strong>₹{p.p}{p.mrp&&<del>₹{p.mrp}</del>}</strong></div>
    <ArrowRight size={18}/>
   </button>)}</div>:<div className="wcSearchEmpty"><Search size={22}/><div><b>No exact product found</b><span>Try the medicine name, brand or salt. Related catalogue products will appear when available.</span></div></div>}
  {results.length>0&&<div className="wcSearchDeliveryStrip"><div><MapPin size={17}/><b>Choose delivery or pickup</b><span>Fast local fulfilment from your selected Wellcare store</span></div><div className="wcEtaChips"><span><Truck size={14}/> Home delivery · 20–30 min</span><span><Clock size={14}/> Store pickup · 10–15 min</span></div></div>}
 </div>
}