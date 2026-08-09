/* ===== 共用礦石資料庫(依 crystarest.com 實際商品品項整理) =====
   traits: love(愛情) / wealth(財富) / calm(平靜) / protect(防護)
           wisdom(智慧) / courage(勇氣) / connect(溝通/人際)
   chakra: root(海底輪) / sacral(臍輪) / solar(太陽神經叢) / heart(心輪)
           throat(喉輪) / thirdEye(眉心輪) / crown(頂輪)
   圖片與所有 html/js/css 都放在同一層(扁平結構,方便用 GitHub 網頁版上傳),
   檔名對應 id,例如 rose-quartz.png,CSS 的 --img 插槽會自動套用。
*/

const CRYSTALS = [
  { id: "rose-quartz", name: "粉晶", c1: "#ffb3c6", c2: "#c94f7c", chakra: "heart", traits: ["love", "connect"], desc: "象徵愛與自我接納,常用於滋養親密關係的能量意象" },
  { id: "amethyst", name: "紫水晶", c1: "#c9a2ff", c2: "#6a3fb5", chakra: "thirdEye", traits: ["calm", "wisdom"], desc: "象徵靜心與直覺,常用於靈性覺察與內在探索的意象" },
  { id: "citrine", name: "黃水晶", c1: "#ffe08a", c2: "#e0a92e", chakra: "solar", traits: ["wealth"], desc: "象徵豐盛與自信,常用於行動力與正向氣場的能量意象" },
  { id: "obsidian", name: "黑曜石", c1: "#5a5a66", c2: "#0e0e14", chakra: "root", traits: ["protect"], desc: "象徵防護與界線,常用於接地與內在整理的意象" },
  { id: "tiger-eye", name: "虎眼石", c1: "#e0b25a", c2: "#7a4c14", chakra: "solar", traits: ["courage"], desc: "象徵勇氣與意志,常用於增添行動力的能量意象" },
  { id: "clear-quartz", name: "白水晶", c1: "#f3f3ff", c2: "#b9b9d6", chakra: "crown", traits: ["wisdom", "calm"], desc: "象徵清晰與整體平衡,常用於淨化磁場與意念設定" },
  { id: "smoky-quartz", name: "茶晶", c1: "#a98f75", c2: "#4a3a2a", chakra: "root", traits: ["protect", "calm"], desc: "象徵接地與沉著,常用於釋放沉重感的能量意象" },
  { id: "strawberry-quartz", name: "草莓晶", c1: "#ffb0c0", c2: "#e0567a", chakra: "heart", traits: ["love"], desc: "象徵愛與魅力,常用於人際親和的能量意象" },
  { id: "labradorite", name: "拉長石", c1: "#8fb8c9", c2: "#2e4a5c", chakra: "thirdEye", traits: ["wisdom", "protect"], desc: "象徵轉化與直覺,常用於靈感與探索未知的意象" },
  { id: "lapis-lazuli", name: "青金石", c1: "#5a7bd6", c2: "#1c2c6b", chakra: "thirdEye", traits: ["wisdom", "connect"], desc: "象徵智慧與洞察,常用於真誠表達與學習的意象" },
  { id: "green-aventurine", name: "東菱玉", c1: "#a8e0a0", c2: "#3f8f4a", chakra: "heart", traits: ["wealth", "love"], desc: "象徵機會與成長,常用於豐盛與心輪能量的意象" },

  { id: "rainbow-fluorite", name: "彩螢石", c1: "#b8e6c9", c2: "#7a5cc4", chakra: "thirdEye", traits: ["wisdom", "calm"], desc: "象徵條理與清晰,常用於學習與思緒整理的意象" },
  { id: "garnet", name: "石榴石", c1: "#e0596b", c2: "#7a1f2b", chakra: "root", traits: ["courage", "love"], desc: "象徵熱情與生命力,常用於勇氣與踏實行動的意象" },
  { id: "black-rutilated-quartz", name: "黑髮晶", c1: "#d9d9e3", c2: "#2b2b33", chakra: "root", traits: ["protect", "wealth"], desc: "象徵防護與聚焦,常用於財富與意志的能量意象" },
  { id: "blue-calcite", name: "藍方解石", c1: "#bcdff0", c2: "#5f9cc4", chakra: "throat", traits: ["calm", "connect"], desc: "象徵柔和表達,常用於靜心與想像力的意象" },
  { id: "desert-rose", name: "沙漠玫瑰石", c1: "#e8cfa0", c2: "#a97c4f", chakra: "root", traits: ["protect", "calm"], desc: "象徵淨化與自我探索,常用於靜心與精神成長的意象" },
  { id: "amazonite", name: "天河石", c1: "#9fe0cf", c2: "#3f9c82", chakra: "throat", traits: ["connect", "courage"], desc: "象徵真誠表達,常用於和諧溝通的能量意象" },
  { id: "blue-apatite", name: "藍磷灰", c1: "#7fd8e0", c2: "#1f8a99", chakra: "throat", traits: ["connect", "wisdom"], desc: "象徵靈感與求知,常用於目標意識與表達的意象" },
  { id: "crazy-lace-agate", name: "瘋狂瑪瑙", c1: "#f0d9a8", c2: "#b5793f", chakra: "sacral", traits: ["calm", "connect"], desc: "象徵活力與樂觀,常用於生活熱情的能量意象" },
  { id: "rainbow-garnet", name: "煙花石榴石", c1: "#d9e08a", c2: "#7a8f2e", chakra: "root", traits: ["courage", "wealth"], desc: "象徵熱情與行動,常用於內在力量的能量意象" },
  { id: "rainbow-obsidian", name: "彩曜石", c1: "#8a7fbf", c2: "#1a1a22", chakra: "root", traits: ["protect", "calm"], desc: "象徵防護與轉化,常用於內在覺察的能量意象" },
  { id: "red-agate", name: "紅膠花", c1: "#f0a08a", c2: "#b5452f", chakra: "sacral", traits: ["love", "courage"], desc: "象徵活力與熱情,常用於創造力的能量意象" },
  { id: "pyrite", name: "黃鐵礦", c1: "#f0d068", c2: "#a8811c", chakra: "solar", traits: ["wealth", "courage"], desc: "象徵豐盛與自信,常用於行動力與成就的意象" },
  { id: "agate", name: "瑪瑙", c1: "#e8ded0", c2: "#a8967f", chakra: "sacral", traits: ["calm", "connect"], desc: "象徵穩定與和諧,常用於接地與持續前進的意象" },
  { id: "peach-moonstone", name: "橙月光石", c1: "#ffd9b8", c2: "#e0a06f", chakra: "sacral", traits: ["love", "calm"], desc: "象徵柔和新生,常用於感性與創造力的能量意象" },
  { id: "moss-agate", name: "水草瑪瑙", c1: "#a8d99a", c2: "#4f7a3f", chakra: "heart", traits: ["wealth", "calm"], desc: "象徵自然生長,常用於豐盛與大地連結的意象" },
  { id: "black-tourmaline", name: "黑碧璽", c1: "#4a4a52", c2: "#0d0d10", chakra: "root", traits: ["protect"], desc: "象徵防護與界線,常用於接地與穩定感的意象" },
  { id: "black-sunstone", name: "黑太陽石", c1: "#6f5a4a", c2: "#1f1712", chakra: "solar", traits: ["courage", "protect"], desc: "象徵自信與行動,常用於內在力量的能量意象" },
  { id: "prehnite", name: "葡萄石", c1: "#d9e8a8", c2: "#8fa85f", chakra: "heart", traits: ["calm", "wisdom"], desc: "象徵平靜與直覺,常用於內在整理的能量意象" },
  { id: "dragon-bloodstone", name: "龍血石", c1: "#5f8f5a", c2: "#8a2f2f", chakra: "root", traits: ["courage", "protect"], desc: "象徵勇氣與生命力,常用於堅定意志的能量意象" },
  { id: "lepidolite", name: "紫雲母", c1: "#d9b8e0", c2: "#8a5f9c", chakra: "crown", traits: ["calm"], desc: "象徵靜心與轉化,常用於內在覺察的能量意象" },
  { id: "sodalite", name: "蘇打石", c1: "#6f8fd9", c2: "#2a3a7a", chakra: "throat", traits: ["wisdom", "connect"], desc: "象徵理性表達,常用於思考與洞察的能量意象" },
  { id: "watermelon-tourmaline", name: "梅花碧璽", c1: "#ffb8c9", c2: "#7ac48f", chakra: "heart", traits: ["love", "calm"], desc: "象徵愛與柔韌,常用於情感連結的能量意象" },
  { id: "green-tourmaline", name: "綠碧璽", c1: "#8fd9a0", c2: "#2f7a4a", chakra: "heart", traits: ["wealth", "calm"], desc: "象徵成長與愛,常用於豐盛與自然連結的意象" },
  { id: "gold-mica", name: "金雲母", c1: "#f0dca0", c2: "#b58f3f", chakra: "solar", traits: ["wealth", "courage"], desc: "象徵自信與光明,常用於創造力與自我覺察的意象" },
  { id: "selenite", name: "透石膏", c1: "#fbf6ea", c2: "#d9cdb0", chakra: "crown", traits: ["wisdom", "calm"], desc: "象徵淨化與清晰,常用於靜心與空間淨化的意象" },
];

function crystalSearchUrl(crystal) {
  return `https://www.crystarest.com/search?q=${encodeURIComponent(crystal.name)}`;
}

const CHAKRAS = {
  root:      { name: "海底輪", sub: "根基與安全感", color: "#ff5c5c" },
  sacral:    { name: "臍輪",   sub: "情感與創造力", color: "#ff9a4d" },
  solar:     { name: "太陽神經叢", sub: "自信與行動力", color: "#ffd84d" },
  heart:     { name: "心輪",   sub: "愛與人際關係", color: "#5cd67a" },
  throat:    { name: "喉輪",   sub: "表達與溝通",   color: "#4dc7ff" },
  thirdEye:  { name: "眉心輪", sub: "直覺與智慧",   color: "#7a5cff" },
  crown:     { name: "頂輪",   sub: "靈性與連結",   color: "#d8b3ff" },
};

const TRAITS = {
  love:    { name: "愛情", desc: "渴望更深的連結與親密關係" },
  wealth:  { name: "財富", desc: "追求豐盛與物質上的安全感" },
  calm:    { name: "平靜", desc: "需要安定情緒、釋放壓力" },
  protect: { name: "防護", desc: "需要屏蔽負能量、穩住陣腳" },
  wisdom:  { name: "智慧", desc: "追求清晰思緒與內在覺察" },
  courage: { name: "勇氣", desc: "需要行動力與突破的膽識" },
  connect: { name: "人際", desc: "重視溝通表達與人際和諧" },
};

const FORTUNES = [
  { keyword: "新生", message: "今天適合放下舊有的包袱,迎接一個全新的開始。", luckyColor: "白色" },
  { keyword: "豐盛", message: "財運悄悄靠近,留意身邊意外出現的小機會。", luckyColor: "金色" },
  { keyword: "沉澱", message: "適合安靜獨處,傾聽內心真正的聲音。", luckyColor: "靛藍色" },
  { keyword: "勇氣", message: "別猶豫了,今天是踏出那一步的好時機。", luckyColor: "橘紅色" },
  { keyword: "療癒", message: "情緒需要被溫柔對待,允許自己休息一下。", luckyColor: "粉色" },
  { keyword: "連結", message: "與重要的人聊聊天,會帶來意想不到的溫暖。", luckyColor: "淺藍色" },
  { keyword: "直覺", message: "相信你的第一直覺,答案其實一直都在心裡。", luckyColor: "紫色" },
  { keyword: "轉化", message: "一段關係或狀態正在悄悄轉變,順勢而為就好。", luckyColor: "墨綠色" },
  { keyword: "自信", message: "今天特別適合展現自己,別把光芒藏起來。", luckyColor: "黃色" },
  { keyword: "守護", message: "有股安穩的力量在保護著你,放心前進。", luckyColor: "黑色" },
  { keyword: "感恩", message: "留意生活中的小確幸,幸運會因感謝而放大。", luckyColor: "淺綠色" },
  { keyword: "清晰", message: "混亂的思緒即將撥雲見日,答案就快出現。", luckyColor: "透明白" },
  { keyword: "行動", message: "想很久的計畫,今天是付諸行動的好日子。", luckyColor: "紅色" },
  { keyword: "放鬆", message: "別把自己逼太緊,允許自己慢下來一天。", luckyColor: "薄荷綠" },
  { keyword: "機緣", message: "一個不經意的對話,可能帶來重要的契機。", luckyColor: "天藍色" },
  { keyword: "內省", message: "適合寫下心情或日記,整理紛亂的思緒。", luckyColor: "深紫色" },
  { keyword: "豐收", message: "過去的努力即將看見成果,再堅持一下。", luckyColor: "金黃色" },
  { keyword: "溫柔", message: "對自己溫柔一點,你已經做得很好了。", luckyColor: "櫻花粉" },
  { keyword: "突破", message: "卡住很久的事情,今天會出現關鍵轉機。", luckyColor: "亮橘色" },
  { keyword: "平衡", message: "工作與生活需要一點調整,別讓天秤傾斜太久。", luckyColor: "灰藍色" },
  { keyword: "吸引力", message: "你的氣場正強,容易吸引好事發生。", luckyColor: "玫瑰金" },
  { keyword: "淨化", message: "適合斷捨離,清空不再需要的人事物。", luckyColor: "純白色" },
  { keyword: "浪漫", message: "感情運上升,單身者有機會遇見心動對象。", luckyColor: "珊瑚粉" },
  { keyword: "專注", message: "今天特別容易進入心流,把握效率高峰。", luckyColor: "深藍色" },
  { keyword: "安穩", message: "不需要著急,穩穩地走,你的步調就是對的。", luckyColor: "大地棕" },
  { keyword: "覺察", message: "留意反覆出現的念頭,那是內心給的提示。", luckyColor: "靛紫色" },
  { keyword: "支持", message: "身邊的人比你想像中更願意伸出援手。", luckyColor: "暖黃色" },
  { keyword: "蛻變", message: "你正在經歷一場看不見的成長,請相信過程。", luckyColor: "煙灰色" },
  { keyword: "喜悅", message: "找一件會讓自己開心的小事,今天就去做。", luckyColor: "陽光黃" },
  { keyword: "流動", message: "別執著於單一結果,順著情勢流動反而更好。", luckyColor: "水藍色" },
  { keyword: "重生", message: "結束是為了更好的開始,放下並不可惜。", luckyColor: "嫩綠色" },
  { keyword: "祝福", message: "今天說出口的善意,會加倍回到你身上。", luckyColor: "粉紫色" },
  { keyword: "根基", message: "先把基礎顧好,急不得的事情就放一放。", luckyColor: "深棕色" },
  { keyword: "靈感", message: "創意能量正旺,把腦中的點子記錄下來。", luckyColor: "橙黃色" },
  { keyword: "包容", message: "對他人多一點理解,也是在善待自己。", luckyColor: "淺粉色" },
  { keyword: "決心", message: "猶豫的事情可以做決定了,你比想像中準備好。", luckyColor: "酒紅色" },
  { keyword: "輕盈", message: "放下不必要的責任感,今天允許自己輕鬆一點。", luckyColor: "淡黃色" },
  { keyword: "共鳴", message: "你會遇到一個很懂你的人或訊息,別忽略它。", luckyColor: "紫藍色" },
  { keyword: "顯化", message: "你想要的正在靠近,持續保持正向的念頭。", luckyColor: "金白色" },
  { keyword: "回歸", message: "適合回到熟悉、讓你感到安全的人事物身邊。", luckyColor: "米白色" },
];
