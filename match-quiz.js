/* 第 1 題決定進入哪個主題(感情/事業/內心平靜/自我覺察),
   選了不同主題之後,後面 6 題會完全是那個主題專屬的題目——
   四個主題各自有一套題庫,彼此不重複,每人測驗共 7 題。
   每一題的選項都會為某顆礦石加分,最後分數最高的礦石獲勝。 */

const QUIZ_ROOT = {
  text: "最近,你最想調整生活中的哪個部分?",
  options: [
    { label: "感情與人際關係", domain: "love" },
    { label: "事業與財務", domain: "wealth" },
    { label: "情緒與內心平靜", domain: "calm" },
    { label: "自我覺察與方向", domain: "wisdom" },
  ],
};

const QUIZ_DOMAINS = {
  love: [
    { text: "在感情裡,你目前比較需要的是?", options: [
      { label: "更多的自我疼愛與被愛", result: "rose-quartz" },
      { label: "增加個人魅力,吸引良緣", result: "strawberry-quartz" },
      { label: "感情裡也希望帶來好運與豐盛", result: "green-aventurine" },
      { label: "溫柔療癒過去的感情創傷", result: "peach-moonstone" },
      { label: "與對方更深層的心靈連結", result: "prehnite" } ] },
    { text: "如果你的感情狀態是一種天氣,你希望它是?", options: [
      { label: "溫暖晴朗,充滿被愛的感覺", result: "rose-quartz" },
      { label: "帶點粉紅泡泡的浪漫微風", result: "strawberry-quartz" },
      { label: "萬里無雲,幸運常伴左右", result: "green-aventurine" },
      { label: "雨後放晴,溫柔而療癒", result: "peach-moonstone" },
      { label: "平靜清澈,心有靈犀", result: "prehnite" } ] },
    { text: "在關係裡,你比較常扮演的角色是?", options: [
      { label: "渴望被寵愛、被呵護的一方", result: "rose-quartz" },
      { label: "用魅力吸引對方靠近的一方", result: "strawberry-quartz" },
      { label: "帶來好運與正能量的一方", result: "green-aventurine" },
      { label: "溫柔包容、給予療癒的一方", result: "peach-moonstone" },
      { label: "憑直覺理解對方心思的一方", result: "prehnite" } ] },
    { text: "一段好的關係,對你來說最重要的是?", options: [
      { label: "溫柔與安全感", result: "rose-quartz" },
      { label: "心動與吸引力", result: "strawberry-quartz" },
      { label: "順利與好運", result: "green-aventurine" },
      { label: "願意療癒彼此過去的傷", result: "peach-moonstone" },
      { label: "心靈相通、默契十足", result: "prehnite" } ] },
    { text: "如果現在能許一個關於感情的願望?", options: [
      { label: "更愛自己,也更容易被愛", result: "rose-quartz" },
      { label: "提升魅力,吸引對的人靠近", result: "strawberry-quartz" },
      { label: "感情裡也順帶帶來好運", result: "green-aventurine" },
      { label: "放下過去,迎接新的開始", result: "peach-moonstone" },
      { label: "和對方的心更靠近一些", result: "prehnite" } ] },
    { text: "想到「愛」這個字,你第一個聯想到的畫面是?", options: [
      { label: "溫暖的擁抱", result: "rose-quartz" },
      { label: "盛開的花朵與粉色泡泡", result: "strawberry-quartz" },
      { label: "兩人一起迎接好運降臨", result: "green-aventurine" },
      { label: "雨過天青後的溫柔陽光", result: "peach-moonstone" },
      { label: "心有靈犀的一個眼神", result: "prehnite" } ] },
  ],
  wealth: [
    { text: "在事業與財務上,你最想要?", options: [
      { label: "招財聚財,提升財運", result: "citrine" },
      { label: "增強意志力,克服拖延", result: "tiger-eye" },
      { label: "穩紮穩打累積財富", result: "pyrite" },
      { label: "更多創造力與行動力去執行計畫", result: "rainbow-garnet" },
      { label: "自信與領導力,獲得認可與機會", result: "gold-mica" } ] },
    { text: "面對一個新機會,你通常?", options: [
      { label: "先觀察時機,等待對的時刻出手", result: "citrine" },
      { label: "逼自己咬牙也要抓住", result: "tiger-eye" },
      { label: "一步一步紮實地累積", result: "pyrite" },
      { label: "馬上動手嘗試,邊做邊調整", result: "rainbow-garnet" },
      { label: "自信展現自己,主動爭取", result: "gold-mica" } ] },
    { text: "你理想中的財富狀態是?", options: [
      { label: "細水長流,穩定豐盛", result: "citrine" },
      { label: "靠意志力打拼出來的成果", result: "tiger-eye" },
      { label: "像挖到寶藏一樣扎實累積", result: "pyrite" },
      { label: "靠創意與行動力賺到的錢", result: "rainbow-garnet" },
      { label: "因為個人魅力與領導力而來的機會", result: "gold-mica" } ] },
    { text: "工作上你最容易卡關的地方是?", options: [
      { label: "財運或資源總是差一點", result: "citrine" },
      { label: "容易拖延、意志力不足", result: "tiger-eye" },
      { label: "累積速度太慢,缺乏耐心", result: "pyrite" },
      { label: "想法很多但缺乏行動力", result: "rainbow-garnet" },
      { label: "不夠自信,不敢主動爭取", result: "gold-mica" } ] },
    { text: "如果可以許一個事業願望?", options: [
      { label: "財源廣進,不再為錢煩惱", result: "citrine" },
      { label: "戰勝拖延,說到做到", result: "tiger-eye" },
      { label: "財富穩穩地累積、不再流失", result: "pyrite" },
      { label: "想法能順利落地實現", result: "rainbow-garnet" },
      { label: "成為受人肯定的領導者", result: "gold-mica" } ] },
    { text: "想到「成功」這個字,你聯想到的畫面是?", options: [
      { label: "荷包滿滿、生活富足", result: "citrine" },
      { label: "咬牙撐過難關後的成就感", result: "tiger-eye" },
      { label: "金光閃閃的寶藏", result: "pyrite" },
      { label: "一個個計畫被實現的過程", result: "rainbow-garnet" },
      { label: "站在台前,被眾人肯定", result: "gold-mica" } ] },
  ],
  calm: [
    { text: "你更需要的平靜類型是?", options: [
      { label: "深度冥想,提升直覺與靈性覺察", result: "amethyst" },
      { label: "溫和接地,慢慢釋放壓力", result: "smoky-quartz" },
      { label: "強力隔絕負能量,像一道結界", result: "obsidian" },
      { label: "舒緩情緒後理性溝通", result: "blue-calcite" },
      { label: "從根本舒緩焦慮、穩定情緒", result: "lepidolite" },
      { label: "徹底淨化,重新歸零", result: "selenite" } ] },
    { text: "最近讓你感到不平靜的原因是?", options: [
      { label: "思緒太亂,靜不下心", result: "amethyst" },
      { label: "壓力累積,身心疲憊", result: "smoky-quartz" },
      { label: "覺得被外界負能量影響", result: "obsidian" },
      { label: "情緒一激動就說不清楚話", result: "blue-calcite" },
      { label: "容易焦慮、胡思亂想", result: "lepidolite" },
      { label: "感覺磁場很亂、需要淨化", result: "selenite" } ] },
    { text: "理想中放鬆的畫面是?", options: [
      { label: "靜坐冥想,腦中一片清明", result: "amethyst" },
      { label: "赤腳踩在泥土上", result: "smoky-quartz" },
      { label: "躲進一個安全結界裡", result: "obsidian" },
      { label: "泡在溫水裡,慢慢放鬆", result: "blue-calcite" },
      { label: "躺在床上,什麼都不想", result: "lepidolite" },
      { label: "在灑滿月光的房間裡", result: "selenite" } ] },
    { text: "面對外界的紛擾,你希望自己能?", options: [
      { label: "保持清醒的直覺判斷", result: "amethyst" },
      { label: "把壓力好好釋放掉", result: "smoky-quartz" },
      { label: "完全不被負能量影響", result: "obsidian" },
      { label: "先冷靜下來,再好好溝通", result: "blue-calcite" },
      { label: "情緒不再輕易被牽動", result: "lepidolite" },
      { label: "隨時清空,重新開始", result: "selenite" } ] },
    { text: "如果能許一個關於內心的願望?", options: [
      { label: "更相信自己的直覺", result: "amethyst" },
      { label: "卸下長期累積的壓力", result: "smoky-quartz" },
      { label: "徹底屏蔽負能量的干擾", result: "obsidian" },
      { label: "好好把心裡話說出口", result: "blue-calcite" },
      { label: "情緒可以更穩定", result: "lepidolite" },
      { label: "隨時保持乾淨清新的磁場", result: "selenite" } ] },
    { text: "想到「平靜」這個字,你聯想到的畫面是?", options: [
      { label: "深夜獨自靜思的時刻", result: "amethyst" },
      { label: "森林裡的泥土氣息", result: "smoky-quartz" },
      { label: "一道無形的保護結界", result: "obsidian" },
      { label: "一場溫柔的對話", result: "blue-calcite" },
      { label: "無風無浪的湖面", result: "lepidolite" },
      { label: "潔白純淨的月光", result: "selenite" } ] },
  ],
  wisdom: [
    { text: "在自我覺察上,你想要?", options: [
      { label: "淨化思緒,回歸清晰的萬用能量", result: "clear-quartz" },
      { label: "蛻變轉化,強化直覺", result: "labradorite" },
      { label: "開啟智慧,提升表達與學習力", result: "lapis-lazuli" },
      { label: "理清邏輯,看清事情的真相", result: "sodalite" } ] },
    { text: "你目前最想釐清的是?", options: [
      { label: "腦中紛亂的思緒", result: "clear-quartz" },
      { label: "正在經歷的轉變與蛻變", result: "labradorite" },
      { label: "該如何更有智慧地表達自己", result: "lapis-lazuli" },
      { label: "一件一直想不通的事", result: "sodalite" } ] },
    { text: "理想中的自己是?", options: [
      { label: "思緒清明、萬事通透", result: "clear-quartz" },
      { label: "能自在蛻變、跟隨直覺前進", result: "labradorite" },
      { label: "學識淵博、表達有力", result: "lapis-lazuli" },
      { label: "邏輯清晰、看事情很準", result: "sodalite" } ] },
    { text: "面對改變,你通常?", options: [
      { label: "先讓自己靜下來,重新歸零", result: "clear-quartz" },
      { label: "相信這是蛻變的必經過程", result: "labradorite" },
      { label: "想辦法學習、找到解方", result: "lapis-lazuli" },
      { label: "冷靜分析,找出邏輯脈絡", result: "sodalite" } ] },
    { text: "如果能許一個關於成長的願望?", options: [
      { label: "思緒永遠清晰、不受干擾", result: "clear-quartz" },
      { label: "能更順利地蛻變與轉化", result: "labradorite" },
      { label: "智慧與表達力大幅提升", result: "lapis-lazuli" },
      { label: "想法更有邏輯、說服力更強", result: "sodalite" } ] },
    { text: "想到「智慧」這個字,你聯想到的畫面是?", options: [
      { label: "清澈見底的水晶", result: "clear-quartz" },
      { label: "蛻變中閃耀七彩光芒的礦石", result: "labradorite" },
      { label: "深藍夜空中閃爍的星辰", result: "lapis-lazuli" },
      { label: "條理分明的一張地圖", result: "sodalite" } ] },
  ],
};

const QUIZ_TOTAL = 7;
let step = 0;
let domainKey = null;
let scores = {};

function currentQuestion() {
  return step === 0 ? QUIZ_ROOT : QUIZ_DOMAINS[domainKey][step - 1];
}

function renderMatchQuestion() {
  const q = currentQuestion();
  document.getElementById("q-text").textContent = q.text;
  document.getElementById("progress-label").textContent = `第 ${step + 1} 題 / 共 ${QUIZ_TOTAL} 題`;
  document.getElementById("progress-fill").style.width = `${(step / QUIZ_TOTAL) * 100}%`;

  const list = document.getElementById("option-list");
  list.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt.label;
    btn.addEventListener("click", () => selectMatchAnswer(opt));
    list.appendChild(btn);
  });
}

function selectMatchAnswer(opt) {
  if (step === 0) {
    domainKey = opt.domain;
    step = 1;
    renderMatchQuestion();
    return;
  }
  scores[opt.result] = (scores[opt.result] || 0) + 1;
  step++;
  if (step <= QUIZ_DOMAINS[domainKey].length) {
    renderMatchQuestion();
  } else {
    showMatchResult();
  }
}

function showMatchResult() {
  document.getElementById("progress-fill").style.width = "100%";
  document.getElementById("progress-label").textContent = "配對完成";
  document.getElementById("quiz-body").style.display = "none";

  const rankedIds = Object.entries(scores).sort((a, b) => b[1] - a[1]).map(([id]) => id);
  const crystal = CRYSTALS.find(c => c.id === rankedIds[0]);
  const chakra = CHAKRAS[crystal.chakra];
  const others = rankedIds.slice(1, 4).map(id => CRYSTALS.find(c => c.id === id));

  const el = document.getElementById("quiz-result");
  el.innerHTML = `
    <div class="result-tag">你的專屬礦石</div>
    <a class="crystal-link" href="${crystalSearchUrl(crystal)}" target="_blank" rel="noopener">
      <div class="crystal-icon" style="--c1:${crystal.c1}; --c2:${crystal.c2}; --img:url('${crystal.id}.png'); width:110px; height:110px; margin-bottom:12px;"></div>
      <div class="result-title">${crystal.name}</div>
    </a>
    <p class="result-desc">${crystal.desc}(對應 ${chakra.name}・${chakra.sub})</p>
    <p class="cta-note">點擊礦石可以到官網看看目前有的「${crystal.name}」相關寶貝喔</p>
    ${others.length ? `
      <p class="cta-note" style="margin-top:20px; margin-bottom:10px;">你也很適合這些礦石</p>
      <div class="crystal-reco-list">
        ${others.map(c => `
          <a class="crystal-reco crystal-link" href="${crystalSearchUrl(c)}" target="_blank" rel="noopener">
            <div class="crystal-icon" style="--c1:${c.c1}; --c2:${c.c2}; --img:url('${c.id}.png');"></div>
            <h4>${c.name}</h4>
            <p>${c.desc}</p>
          </a>
        `).join("")}
      </div>
    ` : ""}
  `;
  el.style.display = "block";
  document.getElementById("retry-btn").style.display = "block";
}

function resetMatchQuiz() {
  step = 0;
  domainKey = null;
  scores = {};
  document.getElementById("quiz-body").style.display = "block";
  document.getElementById("quiz-result").style.display = "none";
  document.getElementById("retry-btn").style.display = "none";
  renderMatchQuestion();
}

document.addEventListener("DOMContentLoaded", () => {
  renderMatchQuestion();
  document.getElementById("retry-btn").addEventListener("click", resetMatchQuiz);
});
