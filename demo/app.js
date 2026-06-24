const HEROES = [
  hero("jing-ke", "荆轲", 1, "秦汉", "刺客", 70, 18, 150, "物理"),
  hero("zhang-liang", "张良", 1, "秦汉", "文臣", 80, 12, 90, "魔法"),
  hero("qin-qiong", "秦琼", 1, "盛唐", "武将", 120, 20, 130, "物理"),
  hero("yang-yuhuan", "杨玉环", 1, "盛唐", "异士", 75, 10, 70, "魔法"),
  hero("bao-zheng", "包拯", 1, "大宋", "文臣", 95, 12, 80, "魔法"),
  hero("xin-qiji", "辛弃疾", 1, "大宋", "武将", 115, 18, 120, "物理"),
  hero("daji", "妲己", 1, "神话", "异士", 70, 10, 80, "魔法"),
  hero("jiuweihu", "九尾狐", 1, "山海", "异士", 70, 10, 80, "神话"),
  hero("li-bai", "李白", 2, "盛唐", "刺客", 90, 20, 160, "物理"),
  hero("li-shimin", "李世民", 2, "盛唐", "帝王", 130, 18, 130, "魔法"),
  hero("nezha", "哪吒", 2, "神话", "刺客", 95, 22, 170, "神话"),
  hero("yinglong", "应龙", 2, "山海", "武将", 135, 20, 150, "神话"),
  hero("han-xin", "韩信", 3, "秦汉", "武将", 150, 24, 210, "物理"),
  hero("cao-cao", "曹操", 3, "三国", "帝王", 150, 22, 180, "魔法"),
  hero("guan-yu", "关羽", 3, "三国", "武将", 170, 26, 260, "物理"),
  hero("sun-wukong", "孙悟空", 3, "神话", "刺客", 130, 28, 230, "神话"),
  hero("qin-shihuang", "秦始皇", 4, "秦汉", "帝王", 190, 26, 320, "魔法"),
  hero("zhuge-liang", "诸葛亮", 4, "三国", "文臣", 120, 14, 180, "魔法"),
  hero("xingtian", "刑天", 4, "山海", "武将", 220, 30, 360, "神话"),
];

const EQUIPMENT = [
  ["青龙偃月刀", "物理技能 +20%"],
  ["羽扇", "魔法技能 +20%"],
  ["山海残卷", "技能变为神话"],
  ["封神榜", "开局法力 +25"],
  ["金丝甲", "环境伤害 -20%"],
  ["风火轮", "普攻 +15%"],
];

const RELICS = [
  ["聚宝盆", "每关结算 +1 金"],
  ["招贤榜", "每关首次刷新 1 金"],
  ["太学令", "每关额外 +1 经验"],
  ["续命符", "失败少掉 2 血"],
];

const raceColors = {
  "秦汉": "#7f3d35",
  "三国": "#315f82",
  "盛唐": "#9b7834",
  "大宋": "#4d7a67",
  "神话": "#6d5794",
  "山海": "#356b5d",
};

let state = createState();

function hero(id, name, cost, race, job, hp, attack, skill, type) {
  return { id, name, cost, race, job, hp, attack, skill, type };
}

function createState() {
  return {
    stage: 1,
    hp: 100,
    gold: 3,
    level: 2,
    xp: 0,
    shop: [],
    bench: [],
    board: [],
    rewards: [],
    equipment: [],
    relics: [],
    firstRefreshUsed: false,
    lastResult: null,
  };
}

function rollShop() {
  const pool = HEROES.filter((candidate) => candidate.cost <= Math.min(4, Math.ceil(state.level / 2) + 1));
  state.shop = Array.from({ length: 5 }, (_, index) => pool[(state.stage + index * 3 + state.gold) % pool.length]);
}

function render() {
  if (state.shop.length === 0) rollShop();
  renderStats();
  renderShop();
  renderBoard();
  renderBench();
  renderRewards();
  renderInventory();
  renderBattle();
}

function renderStats() {
  const stats = [
    ["关卡", state.stage],
    ["血量", state.hp],
    ["金币", state.gold],
    ["人口", `${state.board.length}/${state.level}`],
    ["经验", `${state.xp}/${xpNeeded()}`],
    ["战力", getBoardPower()],
  ];
  document.querySelector("#stats").innerHTML = stats.map(([label, value]) => `
    <div class="stat"><span>${label}</span><strong>${value}</strong></div>
  `).join("");
  document.querySelector("#phaseText").textContent = state.lastResult ? "结算阶段" : "准备阶段";
  document.querySelector("#nextBtn").disabled = !state.lastResult;
  document.querySelector("#battleBtn").disabled = state.board.length === 0 || Boolean(state.lastResult);
}

function renderShop() {
  document.querySelector("#shop").innerHTML = state.shop.map((shopHero, index) => `
    <article class="hero-card" style="--race:${raceColors[shopHero.race]}">
      <div class="portrait">${shopHero.name.slice(0, 1)}</div>
      <div>
        <div class="hero-name">${shopHero.name}</div>
        <div class="tags">
          <span class="tag">${shopHero.race}</span>
          <span class="tag">${shopHero.job}</span>
          <span class="tag">${shopHero.type}</span>
        </div>
      </div>
      <button type="button" data-buy="${index}"><span class="cost">${shopHero.cost}金</span></button>
    </article>
  `).join("");
}

function renderBoard() {
  const slots = Array.from({ length: Math.max(4, state.level) }, (_, index) => state.board[index]);
  document.querySelector("#board").innerHTML = slots.map((owned, index) => {
    if (!owned) return `<div class="slot empty">空位</div>`;
    return `<div class="slot">${heroMini(owned)}<button type="button" data-unfield="${index}">下阵</button></div>`;
  }).join("");
}

function renderBench() {
  const slots = Array.from({ length: 8 }, (_, index) => state.bench[index]);
  document.querySelector("#bench").innerHTML = slots.map((owned, index) => {
    if (!owned) return `<div class="slot empty">空位</div>`;
    const disabled = state.board.length >= state.level ? "disabled" : "";
    return `<div class="slot">${heroMini(owned)}<button type="button" data-field="${index}" ${disabled}>上阵</button></div>`;
  }).join("");
}

function heroMini(owned) {
  const config = getHero(owned.id);
  return `
    <article class="hero-card" style="--race:${raceColors[config.race]}">
      <div class="portrait">${config.name.slice(0, 1)}</div>
      <div class="hero-name">${config.name} ${"★".repeat(owned.star)}</div>
      <div class="tags"><span class="tag">${config.race}</span><span class="tag">${config.job}</span></div>
    </article>
  `;
}

function renderRewards() {
  const rewards = state.rewards.length
    ? state.rewards.map((reward, index) => `
      <div class="reward">
        <strong>${reward.title}</strong>
        <div>${reward.text}</div>
        <button type="button" data-claim="${index}">领取</button>
      </div>
    `).join("")
    : `<div class="reward">暂无奖励</div>`;
  document.querySelector("#rewards").innerHTML = rewards;
}

function renderInventory() {
  document.querySelector("#equipment").innerHTML = state.equipment.length
    ? state.equipment.map((item) => `<div class="item-pill">${item[0]} · ${item[1]}</div>`).join("")
    : `<div class="item-pill">空</div>`;
  document.querySelector("#relics").innerHTML = state.relics.length
    ? state.relics.map((item) => `<div class="item-pill">${item[0]} · ${item[1]}</div>`).join("")
    : `<div class="item-pill">空</div>`;
}

function renderBattle() {
  document.querySelector("#battleField").innerHTML = state.board.length
    ? state.board.map((owned) => {
      const config = getHero(owned.id);
      return `
        <div class="battle-card" style="--race:${raceColors[config.race]}">
          <div class="portrait">${config.name.slice(0, 1)}</div>
          <div class="hero-name">${config.name}</div>
          <div class="tags"><span class="tag">${config.race}</span><span class="tag">${config.job}</span></div>
          <p>普攻 ${config.attack * owned.star}</p>
          <p>技能 ${config.skill * owned.star}</p>
        </div>
      `;
    }).join("")
    : `<div class="battle-card">未上阵</div>`;

  const report = state.lastResult
    ? `
      <strong class="${state.lastResult.won ? "log-win" : "log-loss"}">${state.lastResult.won ? "胜利" : "失败"}</strong>
      <div>分数 ${state.lastResult.score} / ${state.lastResult.target}</div>
      <div>金币 +${state.lastResult.goldGain}</div>
      <div>经验 +${state.lastResult.xpGain}</div>
      <div>掉血 ${state.lastResult.hpLost}</div>
    `
    : `<strong>第 ${state.stage} 关</strong><div>目标分 ${targetScore()}</div><div>上阵后开始战斗</div>`;
  document.querySelector("#battleReport").innerHTML = report;
}

function buy(index) {
  const shopHero = state.shop[index];
  if (!shopHero || state.gold < shopHero.cost || state.bench.length >= 8) return;
  state.gold -= shopHero.cost;
  state.bench.push({ id: shopHero.id, star: 1 });
  state.shop.splice(index, 1);
  mergeBench();
  render();
}

function refreshShop() {
  const cost = hasRelic("招贤榜") && !state.firstRefreshUsed ? 1 : 2;
  if (state.gold < cost) return;
  state.gold -= cost;
  state.firstRefreshUsed = true;
  rollShop();
  render();
}

function buyXp() {
  if (state.gold < 4) return;
  state.gold -= 4;
  gainXp(4);
  render();
}

function field(index) {
  if (state.board.length >= state.level) return;
  const [owned] = state.bench.splice(index, 1);
  if (owned) state.board.push(owned);
  render();
}

function unfield(index) {
  if (state.bench.length >= 8) return;
  const [owned] = state.board.splice(index, 1);
  if (owned) state.bench.push(owned);
  render();
}

function startBattle() {
  if (state.board.length === 0 || state.lastResult) return;
  const score = getBoardPower();
  const target = targetScore();
  const won = score >= target;
  const hpLost = won ? 0 : Math.max(1, Math.ceil(((target - score) / target) * 10) - (hasRelic("续命符") ? 2 : 0));
  const creepGold = stageCreepGold();
  const winGold = isNormalStage() && won ? 1 : 0;
  const interest = Math.min(4, Math.floor((state.gold + winGold + creepGold) / 10));
  const relicGold = hasRelic("聚宝盆") ? 1 : 0;
  const goldGain = creepGold + winGold + interest + relicGold;
  const xpGain = hasRelic("太学令") ? 2 : 1;

  state.gold += goldGain;
  state.hp = Math.max(0, state.hp - hpLost);
  gainXp(xpGain);
  addStageRewards(won);
  state.lastResult = { won, score, target, goldGain, xpGain, hpLost };
  render();
}

function nextStage() {
  if (!state.lastResult) return;
  state.stage += 1;
  state.firstRefreshUsed = false;
  state.lastResult = null;
  rollShop();
  render();
}

function claim(index) {
  const [reward] = state.rewards.splice(index, 1);
  if (!reward) return;
  if (reward.type === "equipment") {
    state.equipment.push(EQUIPMENT[(state.stage + state.equipment.length) % EQUIPMENT.length]);
  }
  if (reward.type === "relic") {
    const relic = RELICS[(state.stage + state.relics.length) % RELICS.length];
    if (!hasRelic(relic[0])) state.relics.push(relic);
  }
  render();
}

function addStageRewards(won) {
  if (!won) return;
  if (state.stage === 1 || state.stage === 2) {
    state.rewards.push({ type: "equipment", title: "1级装备宝箱", text: "获得一件随机装备" });
  }
  if (state.stage > 0 && state.stage % 10 === 0) {
    state.rewards.push({ type: "relic", title: "圣物宝箱", text: "获得一个全局增益" });
  }
  if (state.stage >= 15 && state.stage % 5 === 0) {
    state.rewards.push({ type: "equipment", title: "Boss装备宝箱", text: "获得一件高阶装备" });
  }
}

function getBoardPower() {
  const base = state.board.reduce((sum, owned) => {
    const config = getHero(owned.id);
    return sum + (config.attack * 30 + config.skill * 3 + config.hp * 0.25) * owned.star;
  }, 0);
  const synergy = getSynergyBonus();
  const equipmentBonus = state.equipment.length * 70;
  return Math.round((base + equipmentBonus) * synergy);
}

function getSynergyBonus() {
  const counts = {};
  for (const owned of state.board) {
    const config = getHero(owned.id);
    counts[config.race] = (counts[config.race] ?? 0) + 1;
    counts[config.job] = (counts[config.job] ?? 0) + 1;
  }
  const yishi = counts["异士"] >= 2 ? 1 : 0;
  let bonus = 1;
  for (const [name, count] of Object.entries(counts)) {
    const threshold = name === "异士" ? 2 : 2 - yishi;
    if (count >= Math.max(1, threshold)) bonus += 0.12;
    if (count >= Math.max(3, 4 - yishi)) bonus += 0.18;
  }
  return bonus;
}

function mergeBench() {
  let changed = true;
  while (changed) {
    changed = false;
    for (const star of [1, 2]) {
      const id = state.bench.find((owned) => state.bench.filter((candidate) => candidate.id === owned.id && candidate.star === star).length >= 3)?.id;
      if (!id) continue;
      let removed = 0;
      state.bench = state.bench.filter((owned) => {
        if (owned.id === id && owned.star === star && removed < 3) {
          removed += 1;
          return false;
        }
        return true;
      });
      state.bench.push({ id, star: star + 1 });
      changed = true;
      break;
    }
  }
}

function gainXp(amount) {
  state.xp += amount;
  while (state.level < 8 && state.xp >= xpNeeded()) {
    state.xp -= xpNeeded();
    state.level += 1;
  }
  if (state.level >= 8) state.xp = 0;
}

function xpNeeded() {
  return [0, 1, 1, 2, 4, 8, 16, 24][state.level] ?? 999;
}

function targetScore() {
  return state.stage <= 3 ? 900 : Math.round(900 * 1.18 ** (state.stage - 3));
}

function stageCreepGold() {
  if (state.stage === 1) return 2;
  if (state.stage === 2) return 3;
  if (state.stage === 3) return 6;
  if (state.stage === 10) return 6;
  if (state.stage === 15) return 7;
  if (state.stage === 20 || state.stage === 25) return 6;
  return 0;
}

function isNormalStage() {
  return ![1, 2, 3].includes(state.stage) && state.stage % 5 !== 0;
}

function hasRelic(name) {
  return state.relics.some((relic) => relic[0] === name);
}

function getHero(id) {
  return HEROES.find((candidate) => candidate.id === id);
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) return;
  if (target.dataset.buy !== undefined) buy(Number(target.dataset.buy));
  if (target.dataset.field !== undefined) field(Number(target.dataset.field));
  if (target.dataset.unfield !== undefined) unfield(Number(target.dataset.unfield));
  if (target.dataset.claim !== undefined) claim(Number(target.dataset.claim));
});

document.querySelector("#refreshBtn").addEventListener("click", refreshShop);
document.querySelector("#xpBtn").addEventListener("click", buyXp);
document.querySelector("#battleBtn").addEventListener("click", startBattle);
document.querySelector("#nextBtn").addEventListener("click", nextStage);

render();
