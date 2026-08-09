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

function getTodayFortune() {
  const key = todayKey();
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
        <div style="width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:1px dashed var(--card-border);margin-bottom:6px;">
          <span style="font-size:22px;color:var(--gold);">✦</span>
        </div>
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
