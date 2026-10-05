import React,{useMemo}from"react";
import{ArrowRight,Clock,MapPin,Search,Truck}from"lucide-react";
function norm(p){return((p.n||"")+" "+(p.b||"")+" "+(p.salt||"")+" "+(p.c||"")).toLowerCase()}
export default function SearchExperience({search,products,imageRenderer,onOpen,onClear}){
 const q=search.trim().toLowerCase();
 const results=useMemo(()=>{
  if(!q)return[];
  const all=products.filter(p=>norm(p).includes(q));
  const exact=all.filter(p=>(p.n||"").toLowerCase().startsWith(q));
  const salt=all.filter(p=>!exact.includes(p)&&p.salt&&p.salt.toLowerCase().includes(q));
  const brand=all.filter(p=>!exact.includes(p)&&!salt.includes(p));
  return[...exact,...salt,...brand].slice(0,6);
 },[q,products]);
 if(!q)return null;
 return <div className="wcSearchExperience">
  <div className="wcSearchPanelHead">
   <div><span className="wcSearchEyebrow">LIVE CATALOGUE SEARCH</span><h3>Search results for “{search}”</h3><p>No fake keyword suggestions — only products from the Wellcare catalogue.</p></div>
   <button className="wcSearchClear" onClick={onClear}>Clear</button>
  </div>
  {results.length?<div className="wcSearchResultList">{results.slice(0,3).map((p,i)=><button className="wcSearchResult" key={p.id} onClick={()=>onOpen(p)}>
    <div className="wcSearchResultImage">{imageRenderer(p)}</div>
    <div className="wcSearchResultInfo"><div><span>{i===0?"BEST MATCH":p.salt?"SAME COMPOSITION":"RELATED PRODUCT"}</span><small>{p.b||"Wellcare"} · {p.c||"Healthcare"}</small></div><b>{p.n}</b><p>{p.salt||"Trusted healthcare product"}</p><strong>₹{p.p}{p.mrp&&<del>₹{p.mrp}</del>}</strong></div>
    <ArrowRight size={18}/>
   </button>)}</div>:<div className="wcSearchEmpty"><Search size={22}/><div><b>No exact product found</b><span>Try the medicine name, brand or salt. Related catalogue products will appear when available.</span></div></div>}
  {results.length>0&&<div className="wcSearchDeliveryStrip"><div><MapPin size={17}/><b>Choose delivery or pickup</b><span>Fast local fulfilment from your selected Wellcare store</span></div><div className="wcEtaChips"><span><Truck size={14}/> Home delivery · 20–30 min</span><span><Clock size={14}/> Store pickup · 10–15 min</span></div></div>}
 </div>
}