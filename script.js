/* ===== بيانات المنيو: عدّل الأسعار والأوصاف والأصناف من هنا فقط ===== */
const MENU = [
  { id: "classic", ar: "بطاطس كلاسيك", en: "Classic Potato", items: [
    { ar: "بطاطساية كلاسيك - عادي", en: "Batatisaya Classic - Regular", price: 95,
      desc: { ar: "200 جم من البطاطس.", en: "200 g of potatoes." } },
    { ar: "بطاطساية كلاسيك - كبير", en: "Batatisaya Classic - Large", price: 140,
      desc: { ar: "300 جم من البطاطس.", en: "300 g of potatoes." } }
  ]},
  { id: "mix", ar: "ميكس بطاطساية", en: "Mix Batatisaya", items: [
    { ar: "ميكس بطاطساية - عادي", en: "Mix Batatisaya - Regular", price: 140,
      desc: { ar: "200 جم بطاطس مع صوصين من اختيارك.", en: "200 g of potatoes with two sauces of your choice." } },
    { ar: "ميكس بطاطساية - كبير", en: "Mix Batatisaya - Large", price: 160,
      desc: { ar: "300 جم بطاطس مع صوصين من اختيارك.", en: "300 g of potatoes with two sauces of your choice." } }
  ]},
  { id: "signature", ar: "بطاطساية سيجنتشر", en: "Batatisaya Signature", items: [
    { ar: "بطاطساية الأصلية", en: "The Original Batatisaya Fries", price: 180,
      desc: { ar: "صوص جبنة شيدر، صوص بطاطساية، بصل مقرمش، ومخلل.", en: "Cheddar cheese sauce, Batatisaya sauce, crispy onions, and pickles." } },
    { ar: "بطاطساية فاير", en: "Batatisaya Fire Fries", price: 180,
      desc: { ar: "صوص جبنة شيدر، سبايسي مايونيز، هالبينو، وبصل مقرمش.", en: "Cheddar cheese sauce, spicy mayonnaise, jalapeños, and crispy onions." } },
    { ar: "بطاطساية سموكي", en: "Batatisaya Smoky Fries", price: 190,
      desc: { ar: "صوص جبنة شيدر، صوص باربيكيو، بيف بيكون، وبصل مقرمش.", en: "Cheddar cheese sauce, barbecue sauce, beef bacon, and crispy onions." } },
    { ar: "بطاطساية كريسبي", en: "Batatisaya Crispy Fries", price: 195,
      desc: { ar: "كريسبي تشيكن، صوص بافلو، صوص رانش، جبنة شيدر، وهالبينو.", en: "Crispy chicken, Buffalo sauce, ranch sauce, cheddar cheese, and jalapeños." } }
  ]},
  { id: "snacks", ar: "سناكس", en: "Snacks", items: [
    { ar: "كرات البطاطس بالجبنة - 5 قطع", en: "Cheese Potato Balls - 5 pcs", price: 190,
      desc: { ar: "كرات بطاطس محشوة بالجبنة، مقرمشة من الخارج.", en: "Cheese-stuffed potato balls, crispy on the outside." } }
  ]},
  { id: "sides", ar: "الأصناف الجانبية والصوصات", en: "Sides & Sauces", items: [
    { ar: "صوصات", en: "Sauces", price: 40 },
    { ar: "هالابينو", en: "Jalapeño", price: 40 },
    { ar: "خيار مخلل", en: "Pickles", price: 40 },
    { ar: "هوت دوج", en: "Hot Dog", price: 60 },
    { ar: "بيف بيكون", en: "Beef Bacon", price: 60 },
    { ar: "سموك بيف", en: "Smoked Beef", price: 60 },
    { ar: "بيبروني", en: "Pepperoni", price: 60 },
    { ar: "سلامي", en: "Salami", price: 60 },
    { ar: "تركي", en: "Turkey", price: 60 }
  ]},
  { id: "crepes", ar: "كريبات", en: "Crepes", items: [
    { ar: "كريب بطاطس", en: "Potato Crepe", price: 110 },
    { ar: "كريب زنجر", en: "Zinger Crepe", price: 140 },
    { ar: "كريب سجق", en: "Sausage Crepe", price: 145 },
    { ar: "كريب ميكس", en: "Mix Crepe", price: 155 }
  ]},
  { id: "drinks", ar: "مشروبات", en: "Drinks", items: [
    { ar: "كولا", en: "Cola", price: 20 },
    { ar: "مياه", en: "Water", price: 30 }
  ]}
];

/* ===== نصوص الواجهة ===== */
const UI = {
  ar: { dir: "rtl", switchTo: "English", currency: "ج.م", tagline: "اختر بطاطسك وصوصك",
        vat: "الأسعار غير شاملة ضريبة القيمة المضافة", rights: "جميع الحقوق محفوظة",
        search: "ابحث عن صنف", nav: "أقسام المنيو", top: "الرجوع إلى أعلى الصفحة",
        noRes: "لا توجد نتائج لبحثك", noResSub: "جرّب اسمًا آخر أو امسح البحث.", clear: "مسح البحث", switchAria: "Switch to English" },
  en: { dir: "ltr", switchTo: "العربية", currency: "EGP", tagline: "Pick your fries. Pick your sauce.",
        vat: "Prices do not include VAT", rights: "All rights reserved",
        search: "Search for an item", nav: "Menu sections", top: "Back to top",
        noRes: "No results found", noResSub: "Try another name or clear the search.", clear: "Clear search", switchAria: "التبديل إلى العربية" }
};

const $ = (id) => document.getElementById(id);
const menuEl = $("menu"), tabsEl = $("tabs"), searchEl = $("search"), emptyEl = $("empty");
let lang = "ar";
try { const saved = localStorage.getItem("batatsaya-lang"); if (saved === "en" || saved === "ar") lang = saved; } catch (e) {}

/* توحيد الحروف العربية/الإنجليزية لتحسين البحث */
const norm = (s) => s.toLowerCase().replace(/[\u064B-\u0652\u0640]/g, "")
  .replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/[^\p{L}\p{N} ]/gu, "").trim();

const money = (p) => lang === "ar" ? `${p} ${UI.ar.currency}` : `${p} ${UI.en.currency}`;

function buildTabs() {
  tabsEl.innerHTML = MENU.map((s) => `<a href="#sec-${s.id}" data-id="${s.id}">${s[lang]}</a>`).join("");
}

function renderMenu() {
  const q = norm(searchEl.value);
  let total = 0;
  menuEl.innerHTML = MENU.map((s) => {
    const items = s.items.filter((i) => !q || norm(i.ar).includes(q) || norm(i.en).includes(q));
    total += items.length;
    const link = tabsEl.querySelector(`[data-id="${s.id}"]`);
    if (link) link.hidden = !items.length;
    if (!items.length) return "";
    const cards = items.map((i) => `
      <article class="card">
        <div class="row"><h3 class="name">${i[lang]}</h3><span class="price">${money(i.price)}</span></div>
        ${i.desc ? `<p class="desc">${i.desc[lang]}</p>` : ""}
      </article>`).join("");
    return `<section class="sec" id="sec-${s.id}"><h2>${s[lang]}</h2><div class="grid">${cards}</div></section>`;
  }).join("");
  emptyEl.hidden = total > 0;
  updateActive();
}

function applyLang() {
  const t = UI[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = t.dir;
  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t[el.dataset.i18n]; });
  $("langBtn").textContent = t.switchTo;
  $("langBtn").setAttribute("aria-label", t.switchAria);
  searchEl.placeholder = t.search; searchEl.setAttribute("aria-label", t.search);
  tabsEl.setAttribute("aria-label", t.nav);
  $("toTop").setAttribute("aria-label", t.top);
  $("emptyT").textContent = t.noRes; $("emptyS").textContent = t.noResSub; $("clearBtn").textContent = t.clear;
  buildTabs();
  renderMenu();
  menuEl.classList.remove("in"); void menuEl.offsetWidth; menuEl.classList.add("in");
}

/* القسم النشط في شريط التنقل */
let activeId = null;
function updateActive() {
  const topH = $("top").offsetHeight;
  document.documentElement.style.setProperty("--top-h", topH + "px");
  let current = null;
  menuEl.querySelectorAll(".sec").forEach((sec) => { if (sec.getBoundingClientRect().top <= topH + 40) current = sec.id.slice(4); });
  if (!current) { const first = menuEl.querySelector(".sec"); current = first ? first.id.slice(4) : null; }
  tabsEl.querySelectorAll("a").forEach((a) => a.classList.toggle("active", a.dataset.id === current));
  if (current && current !== activeId) {
    const a = tabsEl.querySelector(`[data-id="${current}"]`);
    if (a) a.scrollIntoView({ inline: "center", block: "nearest" });
  }
  activeId = current;
}

let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) { ticking = true; requestAnimationFrame(() => { updateActive(); $("toTop").classList.toggle("show", window.scrollY > 600); ticking = false; }); }
}, { passive: true });
window.addEventListener("resize", updateActive);

tabsEl.addEventListener("click", (e) => {
  const a = e.target.closest("a"); if (!a) return;
  e.preventDefault();
  const sec = $("sec-" + a.dataset.id); if (sec) sec.scrollIntoView({ block: "start" });
});
$("langBtn").addEventListener("click", () => {
  lang = lang === "ar" ? "en" : "ar";
  try { localStorage.setItem("batatsaya-lang", lang); } catch (e) {}
  applyLang();
});
searchEl.addEventListener("input", renderMenu);
$("clearBtn").addEventListener("click", () => { searchEl.value = ""; renderMenu(); searchEl.focus(); });
$("toTop").addEventListener("click", () => window.scrollTo({ top: 0 }));
$("year").textContent = new Date().getFullYear();

applyLang();
