/* CF BUILD TRIGGER: invalid newline escape fixed; keep homepage isolated. */
import React,{useEffect,useMemo,useState}from"react";
import{ArrowRight,ChevronLeft,ChevronRight,Heart,Plus,ShieldCheck,Truck,Upload}from"lucide-react";

const HEROES=[
 {eyebrow:"WELLCARE MEDICOSE",title:"Trusted healthcare,\nright at your doorstep.",copy:"Shop medicines, wellness essentials and pet care from your selected Wellcare store.",cta:"Shop Medicines",tone:"mint",icon:"💊"},
 {eyebrow:"FAST LOCAL PHARMACY",title:"Order now.\nPick up or get it delivered.",copy:"Choose store pickup or convenient home delivery at checkout.",cta:"Explore Pharmacy",tone:"blue",icon:"🛍️"},
 {eyebrow:"HEALTH • WELLNESS • CARE",title:"Everyday essentials\nfrom trusted brands.",copy:"Discover medicines, personal care, nutrition and healthcare products.",cta:"Browse Categories",tone:"cream",icon:"🩺"}
];
const SERVICES=[["💊","Pharmacy","Medicines"],["✦","Latest","New arrivals"],["🐾","Petcare","Pet health"],["🩺","Consult","Doctor help"],["☼","Wellness","Daily health"],["⌁","Health Devices","Care at home"]];
const CATEGORIES=[["Fever & Headache","🌡️"],["Pain Relief","💊"],["Cough & Cold","🌿"],["Diabetes","🩺"],["Heart Care","❤️"],["Blood Pressure","🫀"],["Cholesterol","🧬"],["Digestive","◉"],["Acidity","🔥"],["Respiratory Care","🫁"],["Anti Infective","🦠"],["Allergy","🤧"],["Vitamins & Supplements","🍊"],["Nutrition","🥛"],["Bone & Joint","🦴"],["Skin Care","🧴"],["Hair Care","💇"],["Eye & Ear Care","👁️"],["Baby Care","🍼"],["Women Care","♀"],["Men's Health","♂"],["First Aid","✚"],["Ayurveda","🌿"],["Health Devices","🩺"]];
const BRANDS=["Mankind","Dr. Reddy's","Cipla","Abbott","Sun Pharma","Dabur","Himalaya","Apollo"];
const VET=[["DOG CARE","🐶"],["CAT CARE","🐱"],["Puppy","🐾"],["Kitten","🐾"],["Pet Food","🥣"],["Supplements","🧴"],["Grooming","✂️"],["Tick & Flea","🪲"],["Deworming","◉"]];

function ProductRail({title,sub,items,imageRenderer,onDetail,onAdd,onWish,wishlist,onViewAll}){
 return <section className="wcRailSection"><div className="wcSectionHead"><div><span className="wcEyebrow">WELLCARE PICKS</span><h2>{title}</h2>{sub&&<p>{sub}</p>}</div><button className="wcViewAll" onClick={()=>onViewAll&&onViewAll()}>View all <ArrowRight size={16}/></button></div><div className="wcProductRail">{items.map(p=><article className="wcProductCard" key={p.id} onClick={()=>onDetail(p)}><button className={"wcWish "+(wishlist.some(x=>x.id===p.id)?"liked":"")} onClick={e=>{e.stopPropagation();onWish(p)}}><Heart size={17} fill={wishlist.some(x=>x.id===p.id)?"currentColor":"none"}/></button><div className="wcProductMedia"><span className="wcBrandBadge">{p.b||"Wellcare"}</span>{imageRenderer(p)}{p.mrp&&p.mrp>p.p&&<span className="wcDiscount">{Math.round((1-p.p/p.mrp)*100)}% OFF</span>}</div><div className="wcProductMeta"><small>{p.c||"Healthcare"}</small><span className={"wcStockBadge "+((Number(p.stock??p.inventory??p.qty??999999)<=0)?"out":(Number(p.stock??p.inventory??p.qty??999999)<=5?"low":"in"))}>{Number(p.stock??p.inventory??p.qty??999999)<=0?"Out of stock":Number(p.stock??p.inventory??p.qty??999999)<=5?`Only ${Number(p.stock??p.inventory??p.qty)} left`:`In stock · ${Number(p.stock??p.inventory??p.qty)} available`}</span><h3>{p.n}</h3><p>{p.salt||"Trusted healthcare product"}</p><div className="wcRating">★ 4.8 <span>· Genuine</span></div><div className="wcPriceRow"><div><b>₹{p.p}</b>{p.mrp&&<del>₹{p.mrp}</del>}</div><button className="wcAdd" disabled={p.stock===0} onClick={e=>{e.stopPropagation();onAdd(p)}}>{p.stock===0?"Out of stock":<><Plus size={15}/> Add</>}</button></div></div></article>)}</div></section>
}

function MedicineDetails({product,allProducts,imageRenderer,onBack,onSelect,onAdd,wishlist,onWish}){
 const related=allProducts.filter(x=>x.id!==product.id&&(x.b===product.b||x.c===product.c||x.salt===product.salt)).slice(0,8);
 const discount=product.mrp&&product.mrp>product.p?Math.round((1-product.p/product.mrp)*100):0; const stock=Number(product.stock??product.inventory??product.qty??999999); const stockLabel=stock<=0?"Out of stock":stock<=5?`Only ${stock} left`:`In stock · ${stock} available`;
 return <section className="wcProductDetailView">
  <div className="wcDetailTop"><button className="wcBackButton" onClick={onBack}><ChevronLeft size={18}/> Back to medicines</button><span>PRODUCT DETAILS</span></div>
  <div className="wcDetailStoreBar"><div><span className="wcStoreDot">●</span><div><b>Wellcare Medicose</b><small>Selected store · genuine pharmacy stock</small></div></div><span className="wcStoreStatus">IN STOCK</span></div>
  <div className="wcDetailMain">
   <div className="wcDetailGallery">
    <div className="wcDetailImage">{imageRenderer(product)}{discount>0&&<span className="wcDetailDiscount">{discount}% OFF</span>}</div>
    <div className="wcGalleryDots"><i className="active"/><i/><i/></div>
   </div>
   <div className="wcDetailInfo">
    <div className="wcDetailBrand">{product.b||"Wellcare"}</div>
    <h1>{product.n}</h1>
    <p className="wcDetailSalt">{product.salt||"Trusted healthcare product"} · {product.c||"Healthcare"}</p>
    <div className="wcDetailRating"><b>★ 4.8</b><span>126 reviews</span><em>✓ Genuine</em></div>
    <div className={"wcDetailStock "+(stock<=0?"out":stock<=5?"low":"in")}>● {stockLabel}</div><div className="wcDetailPrice"><b>₹{product.p}</b>{product.mrp&&<del>₹{product.mrp}</del>}{discount>0&&<em>{discount}% OFF</em>}</div>
    {product.rx&&<div className="wcRxNotice">Prescription required · Upload your prescription at checkout.</div>}
    <div className="wcDeliveryTitle">Get it your way</div>
    <div className="wcDeliveryChoices">
      <button className="selected"><span>🚚</span><div><b>Home delivery</b><small>Estimated 20–30 min</small></div><strong>✓</strong></button>
      <button><span>🏪</span><div><b>Store pickup</b><small>Ready in 10–15 min</small></div><strong>›</strong></button>
    </div>
    <div className="wcDetailFacts"><span>📦 Stock: {stock<=0?"Unavailable":stock+" unit"+(stock===1?"":"s")+" available"}</span><span>✓ Genuine medicine</span><span>✓ Secure checkout</span><span>✓ Pickup + home delivery</span></div>
    <div className="wcDetailActions"><button className="wcDetailAdd" disabled={product.stock===0} onClick={()=>onAdd(product)}><Plus size={17}/> {product.stock===0?"Out of stock":"Add to Cart · ₹"+product.p}</button><button className={"wcDetailWish "+(wishlist.some(x=>x.id===product.id)?"liked":"")} onClick={()=>onWish(product)}>♥</button></div>
   </div>
  </div>
  <div className="wcDetailInfoBlock"><span className="wcEyebrow">ABOUT THIS MEDICINE</span><h2>Product information</h2><p>{product.salt||product.c||"Medicine information available from your selected Wellcare store."}</p><div className="wcInfoGrid"><div><b>Brand</b><span>{product.b||"Wellcare"}</span></div><div><b>Category</b><span>{product.c||"Healthcare"}</span></div><div><b>MRP</b><span>₹{product.mrp||product.p}</span></div><div><b>Availability</b><span>{product.stock===0?"Currently unavailable":"Available at selected store"}</span></div></div></div>
  <div className="wcWhyDetail"><div><b>✓ Authentic products</b><span>Pharmacy-sourced inventory</span></div><div><b>⚡ Fast local fulfilment</b><span>Delivery ETA shown before checkout</span></div><div><b>↺ Easy reorders</b><span>Find regular medicines quickly</span></div></div>
  <div className="wcRelatedDetail"><div className="wcSectionHead"><div><span className="wcEyebrow">RELATED PRODUCTS</span><h2>You may also like</h2><p>Same composition, brand or nearby healthcare category.</p></div></div>{related.length?<div className="wcRelatedGrid">{related.map(p=><button key={p.id} className="wcRelatedCard" onClick={()=>onSelect(p)}><div className="wcRelatedImage">{imageRenderer(p)}</div><div className="wcRelatedText"><small>{p.b||"Wellcare"} · {p.c||"Healthcare"}</small><b>{p.n}</b><span>₹{p.p}</span></div><ChevronRight size={17}/></button>)}</div>:<div className="wcNoRelated">More medicines will appear here as the catalogue grows.</div>}</div>
 </section>
}
export default function HomeExperience({products,shown,branch,setCat,setSearch,setRx,setPanel,setDetail,add,toggleWish,wishlist,imageRenderer}){
 const [selected,setSelected]=useState(null);
 const [slide,setSlide]=useState(0);
 useEffect(()=>{const t=setInterval(()=>setSlide(x=>(x+1)%HEROES.length),5500);return()=>clearInterval(t)},[]);
 useEffect(()=>{const h=e=>{if(e.detail){setPanel(null);setSelected(null);setDetail(e.detail)}};window.addEventListener("wellcare:open-product",h);return()=>window.removeEventListener("wellcare:open-product",h)},[setPanel,setDetail]);
 const human=useMemo(()=>products.filter(p=>!/(pet|vet|dog|cat|puppy|kitten|animal|veterinary)/i.test((p.n+" "+p.b+" "+p.c).toLowerCase())),[products]);
 const popular=(shown.length?shown:human).slice(0,10);
 const deals=human.filter(p=>p.mrp&&p.mrp>p.p).slice(0,10);
 const suggestions=human.filter(p=>p.c==="Pain Relief"||p.c==="Cough & Cold"||p.c==="Vitamins"||p.c==="Skin Care").slice(0,10);
 const veterinary=products.filter(p=>/(pet|vet|dog|cat|puppy|kitten|animal|veterinary)/i.test((p.n+" "+p.b+" "+p.c).toLowerCase())).slice(0,8);
 const goCategory=x=>{setCat("");setSearch("");setSelected(null);setPanel("category:"+x)}; const openAllMedicines=()=>{setCat("");setSearch("");setSelected(null);setPanel("category:Medicines")}; const openProduct=p=>{setSelected(null);setPanel(null);setDetail(p)};
 return <div className="wcHome"><div className="wcHomeContent">
  <section className={"wcHero wcHero-"+HEROES[slide].tone}>
   <div className="wcHeroCopy"><div className="wcHeroTopline"><span className="wcHeroLiveDot"/> <span>LOCAL PHARMACY • {branch?"STORE SELECTED":"SELECT YOUR STORE"}</span></div><span className="wcEyebrow">{HEROES[slide].eyebrow}</span><h1>{HEROES[slide].title.split("\n").map((x,i)=><React.Fragment key={i}>{i>0&&<br/>}{x}</React.Fragment>)}</h1><p>{HEROES[slide].copy}</p><div className="wcHeroPromise"><span>✓ Genuine pharmacy stock</span><span>✓ Fast local fulfilment</span><span>✓ Pickup or home delivery</span></div><div className="wcHeroActions"><button className="wcPrimary" onClick={()=>slide===2?setPanel("categories"):setPanel("category:Medicines")}>{HEROES[slide].cta}<ArrowRight size={17}/></button><button className="wcSecondary" onClick={()=>setRx(true)}><Upload size={16}/> Prescription</button></div><div className="wcHeroTrust"><span><ShieldCheck size={15}/> Genuine medicines</span><span><Truck size={15}/> Pickup + delivery</span></div></div>
   <div className="wcHeroVisual"><div className="wcHeroGlow"/><div className="wcHeroBrand"><span>WC</span><b>WELLCARE</b><small>MEDICOSE · HEALTHCARE</small></div><div className="wcHeroProduct wcHeroProductA">{popular[0]&&<><div>{imageRenderer(popular[0])}</div><b>{popular[0].n}</b><small>₹{popular[0].p}</small></>}</div><div className="wcHeroProduct wcHeroProductB">{popular[1]&&<><div>{imageRenderer(popular[1])}</div><b>{popular[1].n}</b><small>₹{popular[1].p}</small></>}</div><div className="wcHeroFloat wcFloatA">✓ Genuine pharmacy stock</div><div className="wcHeroFloat wcFloatB">⚡ Fast local fulfilment</div></div>
   <div className="wcHeroDots">{HEROES.map((_,i)=><button key={i} className={i===slide?"active":""} onClick={()=>setSlide(i)} aria-label={"Slide "+(i+1)}/>)}</div>
  </section>
  <section className="wcSearchHint"><div><b>What are you looking for?</b><span>Search by medicine, brand, salt or health need above</span></div><button onClick={()=>document.querySelector(".headerSearchRow input")?.focus()}>Start searching <ArrowRight size={15}/></button></section>
  <section className="wcCategoryBlock"><div className="wcSectionHead"><div><span className="wcEyebrow">SHOP SMART</span><h2>Medicines & Healthcare</h2><p>Popular categories for everyday health.</p></div><button className="wcViewAll" onClick={()=>setPanel("categories")}>View all <ArrowRight size={16}/></button></div><div className="wcCategoryRail">{CATEGORIES.map(([t,i])=><button key={t} onClick={()=>goCategory(t)}><span>{i}</span><b>{t}</b></button>)}</div></section>
  <section className="wcBrandSection"><div className="wcSectionHead"><div><span className="wcEyebrow">TRUSTED COMPANIES</span><h2>Shop by top brands</h2><p>Medicines and healthcare from familiar names.</p></div><button className="wcViewAll" onClick={()=>setPanel("categories")}>All brands <ArrowRight size={16}/></button></div><div className="wcBrandRail">{BRANDS.map(b=><button key={b} onClick={()=>goCategory(b)}><span className="wcBrandLogo">{b.replace(/[^A-Za-z]/g,"").slice(0,2).toUpperCase()}</span><b>{b}</b><small>View products</small></button>)}</div></section>
  <ProductRail title="Popular Medicines" sub="Best picks available from your selected Wellcare store." items={popular} imageRenderer={imageRenderer} onDetail={openProduct} onAdd={add} onWish={toggleWish} wishlist={wishlist} onViewAll={openAllMedicines}/>
  <ProductRail title="Deals & Everyday Essentials" sub="Great-value healthcare products with clear pricing." items={deals.length?deals:popular.slice().reverse()} imageRenderer={imageRenderer} onDetail={openProduct} onAdd={add} onWish={toggleWish} wishlist={wishlist} onViewAll={openAllMedicines}/>
  <section className="wcSuggestion"><div className="wcSuggestionIntro"><span className="wcEyebrow">YOU MAY ALSO LIKE</span><h2>Related medicines & suggestions</h2><p>Similar categories, salts and everyday healthcare picks—so customers can discover the next useful product without leaving the page.</p></div><div className="wcSuggestionRail">{suggestions.map(p=><button key={p.id} onClick={()=>openProduct(p)}><div className="wcSuggestionImage">{imageRenderer(p)}</div><div><small>{p.b}</small><b>{p.n}</b><strong>₹{p.p}</strong></div><ArrowRight size={16}/></button>)}</div></section>
  <section className="wcVetSection"><div className="wcSectionHead"><div><span className="wcEyebrow">SEPARATE PET CARE</span><h2>Veterinary Care</h2><p>Dog, cat, puppy, kitten, food, grooming and pet health.</p></div><button className="wcViewAll" onClick={()=>setPanel("petcare")}>View all <ArrowRight size={16}/></button></div><div className="wcVetRail">{VET.map(([t,i],idx)=><button key={t} onClick={()=>setPanel("petcare:"+({Puppy:"dogs",Kitten:"cats","Pet Food":"food",Supplements:"food",Grooming:"grooming","Tick & Flea":"medicines",Deworming:"medicines"}[t]||""))} className={idx<2?"wcVetBig":""}><span>{i}</span><b>{t}</b><small>Pet care</small></button>)}</div>{veterinary.length>0&&<div className="wcVetProducts">{veterinary.slice(0,6).map(p=><article key={p.id} onClick={()=>openProduct(p)}><div>{imageRenderer(p)}</div><b>{p.n}</b><span>₹{p.p}</span><button onClick={e=>{e.stopPropagation();add(p)}}><Plus size={14}/> Add</button></article>)}</div>}</section>
 </div>
 </div>
}
