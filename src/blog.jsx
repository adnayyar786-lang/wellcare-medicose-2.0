import React from "react";

const sources = [
  ["Dassana's Veg Recipes","https://www.vegrecipesofindia.com/veg-fried-rice-recipe/"],
  ["NDTV Food","https://food.ndtv.com/recipe-vegetable-fried-rice-hindi-952593"],
  ["Swasthi's Recipes","https://www.indianhealthyrecipes.com/vegetable-fried-rice-indian-style/"],
  ["Hebbar's Kitchen","https://hebbarskitchen.com/hi/veg-fried-rice-vegetable-fried-rice/"]
];

export default function Blog(){
  return <div className="blogPage">
    <header className="blogHeader">
      <a href="/" className="blogBack">← Wellcare Medicose</a>
      <span>WELLNESS & FOOD</span>
    </header>
    <main className="blogArticle">
      <div className="blogKicker">HOME COOKING · QUICK RECIPE</div>
      <h1>घर पर स्वादिष्ट फ्राइड राइस कैसे बनाएं?</h1>
      <p className="blogLead">बचे हुए चावल, थोड़ी सब्जियां और कुछ basic sauces से घर पर restaurant-style वेज फ्राइड राइस बनाना आसान है। यह quick recipe लगभग 25–30 मिनट में तैयार हो सकती है।</p>
      <div className="riceHero" aria-label="Vegetable fried rice illustration">
        <div className="riceBowl">🍚</div><div className="riceVeg">🥕 🫑 🌽 🧅</div>
      </div>
      <div className="blogMeta"><span>⏱️ लगभग 30 मिनट</span><span>🍽️ 2–3 servings</span><span>🌱 Vegetarian</span></div>

      <section><h2>सामग्री</h2>
        <ul className="blogList">
          <li>2 कप पके हुए और ठंडे चावल — लंबे दाने वाले चावल बेहतर रहते हैं</li>
          <li>1–2 बड़े चम्मच cooking oil</li>
          <li>लहसुन और थोड़ा अदरक, बारीक कटा हुआ</li>
          <li>गाजर, शिमला मिर्च, फ्रेंच बीन्स और पत्तागोभी</li>
          <li>Spring onion और हरी मिर्च</li>
          <li>1–2 चम्मच soy sauce और थोड़ा vinegar</li>
          <li>नमक और कुटी हुई काली मिर्च स्वादानुसार</li>
        </ul>
      </section>

      <section><h2>चावल सही तैयार करना सबसे जरूरी है</h2>
        <p>फ्राइड राइस के लिए चावल ज्यादा नरम या चिपचिपे न हों। पके हुए चावल को अच्छी तरह ठंडा करके इस्तेमाल करने से grains अलग रहते हैं। कई home-style recipes leftover rice को खास तौर पर convenient बताती हैं।</p>
      </section>

      <section><h2>बनाने की आसान विधि</h2>
        <ol className="blogSteps">
          <li><b>पैन तेज गर्म करें:</b> कड़ाही या wok को अच्छी तरह गरम करके oil डालें।</li>
          <li><b>Aromatics डालें:</b> लहसुन, अदरक और हरी मिर्च को थोड़ी देर तेज आंच पर भूनें।</li>
          <li><b>सब्जियां stir-fry करें:</b> गाजर, beans, cabbage और capsicum डालकर तेज आंच पर हल्का crunchy रहने तक पकाएं।</li>
          <li><b>Sauces डालें:</b> soy sauce, थोड़ा vinegar, नमक और black pepper मिलाएं।</li>
          <li><b>चावल मिलाएं:</b> ठंडे पके चावल डालकर हल्के हाथ से toss करें ताकि grains टूटें नहीं।</li>
          <li><b>Final toss:</b> spring onion डालें और 1–2 मिनट तेज आंच पर पकाकर तुरंत serve करें।</li>
        </ol>
      </section>

      <section className="blogTip"><h2>🍳 Restaurant जैसा स्वाद पाने के 5 tips</h2>
        <ul className="blogList">
          <li>पैन को पहले अच्छी तरह गरम करें और छोटे batches में पकाएं।</li>
          <li>चावल ठंडे और relatively dry रखें।</li>
          <li>सब्जियों को overcook न करें—हल्का crunch अच्छा लगता है।</li>
          <li>Soy sauce कम मात्रा से शुरू करें; जरूरत हो तो बाद में बढ़ाएं।</li>
          <li>चावल डालने के बाद लगातार तेज आंच पर toss करें और तुरंत serve करें।</li>
        </ul>
      </section>

      <section><h2>अपने हिसाब से फ्राइड राइस बनाएं</h2>
        <p>आप इसमें sweet corn, peas, mushroom, baby corn या दूसरी उपलब्ध सब्जियां जोड़ सकते हैं। Egg fried rice के लिए अलग से scrambled egg तैयार करके अंत में rice के साथ मिलाया जा सकता है। तीखा पसंद हो तो chilli-garlic या green chilli की मात्रा बढ़ाएं।</p>
      </section>

      <section><h2>Quick summary</h2>
        <div className="recipeCard"><div><b>Prep</b><span>10–15 min</span></div><div><b>Cook</b><span>10–15 min</span></div><div><b>Difficulty</b><span>Easy</span></div></div>
        <p>गरम-गरम vegetable fried rice को spring onion से garnish करके serve करें। घर पर available ingredients के साथ यह एक आसान और flexible meal है।</p>
      </section>

      <section className="blogSources"><h2>Recipe research</h2><p>इस article के cooking principles और ingredient ideas को कई publicly available Indian recipe references से cross-check किया गया है:</p>
        <ul>{sources.map(([name,url])=><li key={url}><a href={url} target="_blank" rel="noreferrer">{name} ↗</a></li>)}</ul>
      </section>
    </main>
  </div>
}