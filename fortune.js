const LUCKY_COLOR_HEX = {
  "白色": "#ffffff", "金色": "#d4af37", "靛藍色": "#4b3f9e", "橘紅色": "#ff5a36",
  "粉色": "#ffc0cb", "淺藍色": "#a9d8f0", "紫色": "#9b59b6", "墨綠色": "#1f3a2e",
  "黃色": "#ffd700", "黑色": "#2a2a2a", "淺綠色": "#a8e0a0", "透明白": "#f5f5f5",
  "紅色": "#e0304a", "薄荷綠": "#9ff0c8", "天藍色": "#87ceeb", "深紫色": "#5d3fa3",
  "金黃色": "#e6b800", "櫻花粉": "#ffb7c5", "亮橘色": "#ff8c1a", "灰藍色": "#7a92ae",
  "玫瑰金": "#c78e94", "純白色": "#ffffff", "珊瑚粉": "#ff8a7a", "深藍色": "#1e3a8a",
  "大地棕": "#8a5a34", "靛紫色": "#6a5acd", "暖黃色": "#f0c04a", "煙灰色": "#9a9a9a",
  "陽光黃": "#ffd23f", "水藍色": "#7ec8e3", "嫩綠色": "#b6e2a1", "粉紫色": "#c9a0dc",
  "深棕色": "#5a4030", "橙黃色": "#ffa500", "淺粉色": "#ffdde1", "酒紅色": "#8a1f3d",
  "淡黃色": "#f5e6a0", "紫藍色": "#7070c8", "金白色": "#f0e6c8", "米白色": "#f0e8d8",
};

function seedFromString(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

/* 每個瀏覽器/裝置有自己專屬的訪客編號,讓不同人看到不同運勢,
   同一人同一天內結果維持不變(重整頁面不會亂跳),隔天才會換新的。 */
function getVisitorId() {
  let id = localStorage.getItem("fortune-visitor-id");
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("fortune-visitor-id", id);
  }
  return id;
}

function getTodayFortune() {
  const key = todayKey() + "-" + getVisitorId();
  const seed = seedFromString(key);
  const fortune = FORTUNES[seed % FORTUNES.length];
  const crystal = CRYSTALS[seed % CRYSTALS.length];
  return { fortune, crystal };
}

function renderResult() {
  const { fortune, crystal } = getTodayFortune();
  const resultEl = document.getElementById("fortune-result");
  resultEl.innerHTML = `
    <div class="result-tag">今日關鍵字・${fortune.keyword}</div>
    <p class="result-desc" style="font-size:15px;color:var(--text-main);margin-bottom:16px;">${fortune.message}</p>
    <div style="display:flex; justify-content:center; gap:24px; margin-bottom:6px;">
      <a class="crystal-link" href="${crystalSearchUrl(crystal)}" target="_blank" rel="noopener" style="text-align:center;">
        <div class="crystal-icon" style="--c1:${crystal.c1}; --c2:${crystal.c2}; --img:url('${crystal.id}.png'); width:64px; height:64px; margin-bottom:6px;"></div>
        <div style="font-size:12px; color:var(--text-sub);">幸運礦石</div>
        <div style="font-size:13px;">${crystal.name}</div>
      </a>
      <div style="text-align:center;">
        <div style="width:64px;height:64px;border-radius:50%;background:${LUCKY_COLOR_HEX[fortune.luckyColor] || "#e8ded0"};border:1px solid rgba(91,70,54,0.2);box-shadow:0 4px 10px rgba(91,70,54,0.2);margin-bottom:6px;"></div>
        <div style="font-size:12px; color:var(--text-sub);">幸運色</div>
        <div style="font-size:13px;">${fortune.luckyColor}</div>
      </div>
    </div>
    <p class="cta-note">點擊礦石可以到官網看看目前有的「${crystal.name}」相關寶貝喔</p>
  `;
  resultEl.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  const orb = document.getElementById("fortune-orb");
  const prompt = document.getElementById("fortune-prompt");
  const revealed = todayKey() === localStorage.getItem("fortune-last-view");

  function reveal() {
    localStorage.setItem("fortune-last-view", todayKey());
    orb.classList.add("revealed");
    prompt.textContent = "今日運勢已顯現";
    renderResult();
  }

  if (revealed) {
    reveal();
  }

  orb.addEventListener("click", () => {
    if (orb.classList.contains("revealed")) return;
    orb.classList.add("pulse");
    setTimeout(() => {
      orb.classList.remove("pulse");
      reveal();
    }, 900);
  });
});
