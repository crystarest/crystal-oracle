const CHAKRA_QUESTIONS = [
  { chakra: "root", text: "我對目前的生活與經濟狀況感到穩定安心。" },
  { chakra: "root", text: "即使遇到變動,我依然感覺腳踏實地、有安全感。" },
  { chakra: "root", text: "當生活出現變動時,我通常能很快找到新的立足點。" },
  { chakra: "sacral", text: "我能自在地表達與感受自己的情緒。" },
  { chakra: "sacral", text: "我常有源源不絕的創意靈感,享受生活中的樂趣。" },
  { chakra: "sacral", text: "我允許自己享受身體的感官愉悅(美食、按摩、舞蹈等)。" },
  { chakra: "solar", text: "我對自己的能力與決定有足夠的自信。" },
  { chakra: "solar", text: "遇到挑戰時,我通常能主動採取行動而不是拖延。" },
  { chakra: "solar", text: "我能清楚設定目標,並持續朝目標前進。" },
  { chakra: "heart", text: "我能輕鬆地愛人也自在地接受被愛。" },
  { chakra: "heart", text: "我對身邊的人事物常懷抱感恩與同理心。" },
  { chakra: "heart", text: "我很容易對陌生人或動植物產生同理與關懷。" },
  { chakra: "throat", text: "我能清楚且自在地表達自己的想法與需求。" },
  { chakra: "throat", text: "別人常常能準確理解我想表達的意思。" },
  { chakra: "throat", text: "我不害怕在衝突中誠實說出自己的立場。" },
  { chakra: "thirdEye", text: "我常常能相信並跟隨自己的直覺做決定。" },
  { chakra: "thirdEye", text: "我對自己的人生方向有清晰的洞察與想法。" },
  { chakra: "thirdEye", text: "我常常在夢境或靈感中得到有意義的訊息。" },
  { chakra: "crown", text: "我常感覺自己與更大的世界或宇宙有所連結。" },
  { chakra: "crown", text: "我容易感到內心的平靜與生命的意義感。" },
  { chakra: "crown", text: "我相信生命中發生的事情背後都有更深的意義。" },
];

const LIKERT_OPTIONS = [
  { value: 1, label: "非常不同意" },
  { value: 2, label: "不同意" },
  { value: 3, label: "普通" },
  { value: 4, label: "同意" },
  { value: 5, label: "非常同意" },
];

let currentQ = 0;
const answers = new Array(CHAKRA_QUESTIONS.length).fill(null);

function renderQuestion() {
  const q = CHAKRA_QUESTIONS[currentQ];
  document.getElementById("q-text").textContent = q.text;
  document.getElementById("progress-label").textContent = `第 ${currentQ + 1} 題 / 共 ${CHAKRA_QUESTIONS.length} 題`;
  document.getElementById("progress-fill").style.width = `${(currentQ / CHAKRA_QUESTIONS.length) * 100}%`;

  const list = document.getElementById("option-list");
  list.innerHTML = "";
  LIKERT_OPTIONS.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt.label;
    btn.addEventListener("click", () => selectAnswer(opt.value));
    list.appendChild(btn);
  });
}

function selectAnswer(value) {
  answers[currentQ] = value;
  currentQ++;
  if (currentQ < CHAKRA_QUESTIONS.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("progress-fill").style.width = "100%";
  document.getElementById("progress-label").textContent = "測驗完成";
  document.getElementById("quiz-body").style.display = "none";

  const scores = {};
  Object.keys(CHAKRAS).forEach(k => scores[k] = 0);
  CHAKRA_QUESTIONS.forEach((q, i) => {
    scores[q.chakra] += answers[i];
  });

  const minScore = Math.min(...Object.values(scores));
  const weakest = Object.keys(scores).filter(k => scores[k] === minScore);
  const focusChakra = weakest[0];
  const chakraInfo = CHAKRAS[focusChakra];

  const recoCrystals = CRYSTALS.filter(c => c.chakra === focusChakra);

  const resultEl = document.getElementById("quiz-result");
  resultEl.innerHTML = `
    <div class="result-tag">你最需要關注的脈輪</div>
    <div class="result-title">${chakraInfo.name}・${chakraInfo.sub}</div>
    <p class="result-desc">在脈輪系統的說法裡,這個脈輪目前的傾向較弱,你可以參考以下對應的礦石。</p>
    <div class="crystal-reco-list">
      ${recoCrystals.map(c => `
        <a class="crystal-reco crystal-link" href="${crystalSearchUrl(c)}" target="_blank" rel="noopener">
          <div class="crystal-icon" style="--c1:${c.c1}; --c2:${c.c2}; --img:url('${c.id}.png');"></div>
          <h4>${c.name}</h4>
          <p>${c.desc}</p>
        </a>
      `).join("")}
    </div>
    <p class="cta-note">點擊礦石可以到官網看看目前有的相關寶貝喔</p>
  `;
  resultEl.style.display = "block";
  document.getElementById("retry-btn").style.display = "block";
}

function resetQuiz() {
  currentQ = 0;
  answers.fill(null);
  document.getElementById("quiz-body").style.display = "block";
  document.getElementById("quiz-result").style.display = "none";
  document.getElementById("retry-btn").style.display = "none";
  renderQuestion();
}

document.addEventListener("DOMContentLoaded", () => {
  renderQuestion();
  document.getElementById("retry-btn").addEventListener("click", resetQuiz);
});
