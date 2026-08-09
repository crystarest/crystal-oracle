let lastCrystalId = null;

function pickCrystal() {
  let pick;
  do {
    pick = CRYSTALS[Math.floor(Math.random() * CRYSTALS.length)];
  } while (CRYSTALS.length > 1 && pick.id === lastCrystalId);
  lastCrystalId = pick.id;
  return pick;
}

function renderCrystal(crystal) {
  const el = document.getElementById("draw-result");
  const chakra = CHAKRAS[crystal.chakra];
  el.innerHTML = `
    <a class="crystal-link" href="${crystalSearchUrl(crystal)}" target="_blank" rel="noopener">
      <div class="crystal-icon" style="--c1:${crystal.c1}; --c2:${crystal.c2}; --img:url('${crystal.id}.png'); width:100px; height:100px;"></div>
      <div class="result-title">${crystal.name}</div>
    </a>
    <div class="result-tag">對應 ${chakra.name}・${chakra.sub}</div>
    <p class="result-desc">${crystal.desc}</p>
    <p class="cta-note">點擊礦石可以到官網看看目前有的「${crystal.name}」相關寶貝喔</p>
  `;
  el.style.display = "block";
}

function buildSparkles(container, count) {
  container.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const s = document.createElement("div");
    s.className = "sparkle";
    s.style.setProperty("--angle", (360 / count) * i + "deg");
    s.style.setProperty("--delay", (Math.random() * 0.8).toFixed(2) + "s");
    container.appendChild(s);
  }
}

const DRAW_THINK_MS = 2400;

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("draw-btn");
  const orb = document.getElementById("draw-orb");
  const sparkles = document.getElementById("draw-sparkles");
  const resultEl = document.getElementById("draw-result");

  buildSparkles(sparkles, 10);

  btn.addEventListener("click", () => {
    resultEl.style.display = "none";
    btn.disabled = true;
    orb.classList.add("pulse");
    sparkles.classList.add("active");
    btn.textContent = "凝視水晶,靜心感應中...";

    setTimeout(() => {
      btn.textContent = "能量正在凝聚...";
    }, DRAW_THINK_MS * 0.55);

    setTimeout(() => {
      orb.classList.remove("pulse");
      sparkles.classList.remove("active");
      const crystal = pickCrystal();
      renderCrystal(crystal);
      btn.disabled = false;
      btn.textContent = "再抽一次";
    }, DRAW_THINK_MS);
  });
});
