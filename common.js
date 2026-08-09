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

const DECO_THEMES = {
  hub: () => {
    const items = [{ type: "moon", left: "78%", top: "5%" }];
    for (let i = 0; i < 5; i++) items.push({ type: "star", left: Math.random() * 100 + "%", top: Math.random() * 45 + "%" });
    for (let i = 0; i < 3; i++) items.push({ type: "leaf", left: Math.random() * 100 + "%", top: 55 + Math.random() * 40 + "%" });
    return items;
  },
  fortune: () => {
    const items = [{ type: "moon", left: "76%", top: "4%" }];
    for (let i = 0; i < 9; i++) items.push({ type: "star", left: Math.random() * 100 + "%", top: Math.random() * 42 + "%" });
    return items;
  },
  draw: () => scatterInSafeBands(["leaf", "petal"], 8),
  chakra: () => {
    const colors = ["#ff5c5c", "#ff9a4d", "#ffd84d", "#5cd67a", "#4dc7ff", "#7a5cff", "#d8b3ff"];
    return colors.map((c, i) => ({ type: "blob", color: c, left: (6 + i * 13) + "%", top: (Math.random() * 65) + "%" }));
  },
  match: () => scatterInSafeBands(["heart", "sparkle"], 8),
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

document.addEventListener("DOMContentLoaded", () => {
  renderDeco();
  renderHubOrb();
});
