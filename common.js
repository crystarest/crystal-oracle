const DECO_GLYPHS = { star: "✦", moon: "☾", petal: "❀", heart: "♡", sparkle: "✧" };

/* 只在頁面最上緣或最下緣兩個安全帶狀區域放裝飾,避開中間的標題/內文,
   避免圖示疊在文字上造成閱讀干擾。 */
function scatterInSafeBands(glyphs, count) {
  const items = [];
  for (let i = 0; i < count; i++) {
    const top = i % 2 === 0 ? Math.random() * 7 : 90 + Math.random() * 9;
    items.push({ type: glyphs[i % glyphs.length], left: Math.random() * 100 + "%", top: top + "%" });
  }
  return items;
}

/* 寬螢幕(電腦版)裝飾數量加倍,避免兩側背景看起來太空 */
function wideFactor() {
  return window.innerWidth >= 900 ? 2.2 : 1;
}

const DECO_THEMES = {
  hub: () => {
    const f = wideFactor();
    const items = [{ type: "moon", left: "78%", top: "5%" }];
    if (f > 1) items.push({ type: "moon", left: "6%", top: "8%" });
    for (let i = 0; i < Math.round(5 * f); i++) items.push({ type: "star", left: Math.random() * 100 + "%", top: Math.random() * 45 + "%" });
    for (let i = 0; i < Math.round(3 * f); i++) items.push({ type: "leaf", left: Math.random() * 100 + "%", top: 55 + Math.random() * 40 + "%" });
    return items;
  },
  fortune: () => {
    const f = wideFactor();
    const items = [{ type: "moon", left: "76%", top: "4%" }];
    if (f > 1) items.push({ type: "moon", left: "8%", top: "6%" });
    for (let i = 0; i < Math.round(9 * f); i++) items.push({ type: "star", left: Math.random() * 100 + "%", top: Math.random() * 42 + "%" });
    return items;
  },
  draw: () => scatterInSafeBands(["leaf", "petal"], Math.round(8 * wideFactor())),
  chakra: () => {
    const colors = ["#ff5c5c", "#ff9a4d", "#ffd84d", "#5cd67a", "#4dc7ff", "#7a5cff", "#d8b3ff"];
    const base = colors.map((c, i) => ({ type: "blob", color: c, left: (6 + i * 13) + "%", top: (Math.random() * 65) + "%" }));
    if (wideFactor() > 1) {
      colors.forEach((c, i) => base.push({ type: "blob", color: c, left: (10 + i * 12) + "%", top: (Math.random() * 65) + "%" }));
    }
    return base;
  },
  match: () => scatterInSafeBands(["heart", "sparkle"], Math.round(8 * wideFactor())),
};

function renderDeco() {
  const el = document.getElementById("stars");
  if (!el) return;
  const theme = el.dataset.decoTheme || "hub";
  const build = DECO_THEMES[theme] || DECO_THEMES.hub;
  const items = build();
  el.innerHTML = "";
  items.forEach(it => {
    const node = document.createElement("div");
    if (it.type === "blob") {
      node.className = "deco-item deco-blob";
      node.style.width = "150px";
      node.style.height = "150px";
      node.style.background = it.color;
    } else if (it.type === "leaf") {
      node.className = "deco-item deco-leaf-shape";
    } else {
      node.className = `deco-item glyph deco-${it.type}`;
      node.textContent = DECO_GLYPHS[it.type];
    }
    node.style.left = it.left;
    node.style.top = it.top;
    node.style.setProperty("--delay", (Math.random() * 3).toFixed(2) + "s");
    node.style.setProperty("--rot", (Math.random() * 20 - 10).toFixed(1) + "deg");
    el.appendChild(node);
  });
  renderFireflies(el);
}

/* 螢火蟲光點:全站每個頁面都加,跟主題裝飾疊在同一層,緩慢往上飄、忽明忽暗 */
function renderFireflies(container) {
  const count = Math.round(10 * wideFactor());
  for (let i = 0; i < count; i++) {
    const node = document.createElement("div");
    node.className = "firefly";
    node.style.left = Math.random() * 100 + "%";
    node.style.top = 40 + Math.random() * 55 + "%";
    node.style.setProperty("--fly-dur", (10 + Math.random() * 8).toFixed(1) + "s");
    node.style.setProperty("--fly-delay", (Math.random() * 10).toFixed(1) + "s");
    container.appendChild(node);
  }
}

/* 總覽頁的水晶球每次進站隨機換成一顆礦石,而不是固定的水晶球 */
function renderHubOrb() {
  const el = document.getElementById("hub-orb");
  if (!el || typeof CRYSTALS === "undefined") return;
  const pick = CRYSTALS[Math.floor(Math.random() * CRYSTALS.length)];
  el.style.setProperty("--img", `url('${pick.id}.png')`);
  el.style.setProperty("--c1", pick.c1);
  const nameEl = document.getElementById("hub-orb-name");
  if (nameEl) nameEl.textContent = pick.name;
  const linkEl = document.getElementById("hub-orb-link");
  if (linkEl && typeof crystalSearchUrl === "function") linkEl.href = crystalSearchUrl(pick);
}

/* 每個頁面有 2 張插畫背景可選,隨機挑一張,疊上一層淡淡的米色調
   讓插畫不會蓋過文字可讀性,也維持整體暖色調一致。 */
const BG_IMAGES = {
  hub: ["bg-hub-1.jpg", "bg-hub-2.jpg"],
  fortune: ["bg-fortune-1.jpg", "bg-fortune-2.jpg"],
  draw: ["bg-draw-1.jpg", "bg-draw-2.jpg"],
  chakra: ["bg-chakra-1.jpg", "bg-chakra-2.jpg"],
  match: ["bg-match-1.jpg", "bg-match-2.jpg"],
};

function renderBodyBackground() {
  const el = document.getElementById("stars");
  const theme = el ? (el.dataset.decoTheme || "hub") : "hub";
  const options = BG_IMAGES[theme] || BG_IMAGES.hub;
  const pick = options[Math.floor(Math.random() * options.length)];
  document.body.style.backgroundImage =
    `linear-gradient(180deg, rgba(251,246,234,0.45) 0%, rgba(245,234,210,0.35) 55%, rgba(239,224,191,0.55) 100%), url('${pick}')`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderDeco();
  renderHubOrb();
  renderBodyBackground();
});
