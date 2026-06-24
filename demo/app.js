const PREP_SECONDS = 30;
const BATTLE_SECONDS = 30;

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
let prepTimer = null;
let battleTimer = null;

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
    streak: { type: "none", count: 0 },
    firstRefreshUsed: false,
    isBattling: false,
    gameOver: false,
    prepRemaining: PREP_SECONDS,
    battleRemaining: BATTLE_SECONDS,
    pendingBattleResult: null,
    battleLog: [],
    lastResult: null,
  };
}

export function getSellValue(owned) {
  const config = HEROES.find((candidate) => candidate.id === owned.id);
  const copies = owned.star === 1 ? 1 : owned.star === 2 ? 3 : 9;
  return (config?.cost ?? 1) * copies;
}

export function getInterestGold(gold) {
  return Math.min(4, Math.floor(gold / 10));
}

export function resolveRoundIncome(input) {
  const baseGold = 5;
  const nextStreak = getNextStreak(input.previousStreak, input.won);
  const streakGold = getStreakGold(nextStreak);
  const creepGold = input.creepGold ?? 0;
  const relicGold = input.relicGold ?? 0;
  const interest = getInterestGold(input.goldBeforeIncome + baseGold + creepGold + streakGold);
  return {
    baseGold,
    creepGold,
    streakGold,
    interest,
    relicGold,
    total: baseGold + creepGold + streakGold + interest + relicGold,
    nextStreak,
  };
}

function getNextStreak(previous, won) {
  const type = won ? "win" : "loss";
  return previous.type === type
    ? { type, count: previous.count + 1 }
    : { type, count: 1 };
}

function getStreakGold(streak) {
  if (streak.count >= 6) return 3;
  if (streak.count >= 4) return 2;
  if (streak.count >= 2) return 1;
  return 0;
}

export function settleHp(currentHp, hpLost) {
  const hp = Math.max(0, currentHp - hpLost);
  return { hp, gameOver: hp === 0 };
}

export function getBattleSecondsRemaining(totalMs, elapsedMs) {
  return Math.max(0, Math.ceil((totalMs - elapsedMs) / 1000));
}

export function shouldAutoStartBattle(input) {
  return !input.gameOver
    && !input.isBattling
    && !input.hasResult
    && input.prepRemaining <= 0
    && input.boardCount > 0;
}

export function getHeroSynergyTags(heroLike, boardLike) {
  const counts = getCounts(boardLike);
  const yishi = counts["异士"] >= 2 ? 1 : 0;
  return [heroLike.race, heroLike.job].map((name) => {
    const count = counts[name] ?? 0;
    const threshold = getFirstThreshold(name, yishi);
    return {
      name,
      count,
      threshold,
      active: count >= threshold,
      text: `2人: +12% / 4人: +18%`,
    };
  });
}

export function mergeRosterCopies(roster) {
  let board = roster.board.map((owned) => ({ ...owned }));
  let bench = roster.bench.map((owned) => ({ ...owned }));
  let changed = true;

  while (changed) {
    changed = false;
    for (const star of [1, 2]) {
      const all = [...board, ...bench];
      const id = all.find((owned) => all.filter((candidate) => candidate.id === owned.id && candidate.star === star).length >= 3)?.id;
      if (!id) continue;

      let removed = 0;
      let keepOnBoard = false;
      board = board.filter((owned) => {
        if (owned.id === id && owned.star === star && removed < 3) {
          removed += 1;
          keepOnBoard = true;
          return false;
        }
        return true;
      });
      bench = bench.filter((owned) => {
        if (owned.id === id && owned.star === star && removed < 3) {
          removed += 1;
          return false;
        }
        return true;
      });

      const merged = { id, star: star + 1 };
      if (keepOnBoard) board.push(merged);
      else bench.push(merged);
      changed = true;
      break;
    }
  }

  return { board, bench };
}

export function moveBoardHeroToBench(roster, boardIndex, benchLimit = 8) {
  const moved = roster.board[boardIndex];
  if (!moved) return roster;
  const merged = mergeRosterCopies({
    board: roster.board.filter((_, index) => index !== boardIndex),
    bench: [...roster.bench, moved],
  });
  return merged.bench.length > benchLimit ? roster : merged;
}

export function moveShopHeroToBench(roster, hero, benchLimit = 8) {
  const merged = mergeRosterCopies({
    board: roster.board,
    bench: [...roster.bench, hero],
  });
  return merged.bench.length > benchLimit ? roster : merged;
}

function rollShop() {
  const maxCost = Math.min(4, Math.ceil(state.level / 2) + 1);
  const pool = HEROES.filter((candidate) => candidate.cost <= maxCost);
  state.shop = Array.from({ length: 5 }, (_, index) => pool[(state.stage + index * 3 + state.gold) % pool.length]);
}

function render() {
  if (state.shop.length === 0) rollShop();
  renderStats();
  renderShop();
  renderBoard();
  renderSynergies();
  renderBench();
  renderRewards();
  renderInventory();
  renderCompendium();
  renderBattle();
}

function renderStats() {
  const countdown = state.isBattling ? `${state.battleRemaining}s` : state.lastResult ? "-" : `${state.prepRemaining}s`;
  const stats = [
    ["关卡", state.stage],
    ["血量", state.hp],
    ["金币", state.gold],
    ["人口", `${state.board.length}/${state.level}`],
    ["经验", `${state.xp}/${xpNeeded()}`],
    ["倒计时", countdown],
  ];

  document.querySelector("#stats").innerHTML = stats.map(([label, value]) => `
    <div class="stat"><span>${label}</span><strong>${value}</strong></div>
  `).join("");
  document.querySelector("#phaseText").textContent = state.gameOver ? "游戏结束" : state.isBattling ? "战斗阶段" : state.lastResult ? "结算阶段" : "准备阶段";
  document.querySelector("#refreshBtn").disabled = state.gameOver || state.isBattling || Boolean(state.lastResult);
  document.querySelector("#xpBtn").disabled = state.gameOver || state.isBattling || Boolean(state.lastResult);
  document.querySelector("#nextBtn").disabled = state.gameOver || !state.lastResult || state.isBattling;
  document.querySelector("#battleBtn").disabled = state.gameOver || state.board.length === 0 || state.isBattling || Boolean(state.lastResult);
}

function renderShop() {
  document.querySelector("#shop").innerHTML = state.shop.map((shopHero, index) => `
    <article class="hero-card" style="--race:${raceColors[shopHero.race]}">
      <div class="portrait">${shopHero.name.slice(0, 1)}</div>
      <div>
        <div class="hero-name">${shopHero.name}</div>
        ${heroSynergyChips(shopHero)}
      </div>
      <button type="button" data-buy="${index}"><span class="cost">${shopHero.cost}金</span></button>
    </article>
  `).join("");
}

function renderBoard() {
  const slots = Array.from({ length: Math.max(4, state.level) }, (_, index) => state.board[index]);
  document.querySelector("#board").innerHTML = slots.map((owned, index) => {
    if (!owned) return `<div class="slot empty">空位</div>`;
    return `
      <div class="slot">
        ${heroMini(owned)}
        <button type="button" data-unfield="${index}">下阵</button>
        <button type="button" data-sell-board="${index}">出售 +${getSellValue(owned)}金</button>
      </div>
    `;
  }).join("");
}

function renderBench() {
  const slots = Array.from({ length: 8 }, (_, index) => state.bench[index]);
  document.querySelector("#bench").innerHTML = slots.map((owned, index) => {
    if (!owned) return `<div class="slot empty">空位</div>`;
    const disabled = state.board.length >= state.level ? "disabled" : "";
    return `
      <div class="slot">
        ${heroMini(owned)}
        <button type="button" data-field="${index}" ${disabled}>上阵</button>
        <button type="button" data-sell-bench="${index}">出售 +${getSellValue(owned)}金</button>
      </div>
    `;
  }).join("");
}

function heroMini(owned) {
  const config = getHero(owned.id);
  return `
    <article class="hero-card compact" style="--race:${raceColors[config.race]}">
      <div class="portrait">${config.name.slice(0, 1)}</div>
      <div class="hero-name">${config.name} ${"★".repeat(owned.star)}</div>
      ${heroSynergyChips(config)}
    </article>
  `;
}

function heroSynergyChips(config) {
  return `
    <div class="synergy-chips">
      ${getHeroSynergyTags(config, boardUnits()).map((tag) => `
        <span class="synergy-chip ${tag.active ? "active" : ""}" title="${tag.text}">
          ${tag.name} ${tag.count}/${tag.threshold}
        </span>
      `).join("")}
    </div>
  `;
}

function renderSynergies() {
  const rows = getSynergyRows();
  const active = rows.filter((row) => row.active);
  const pending = rows.filter((row) => !row.active);
  document.querySelector("#synergies").innerHTML = rows.length
    ? `
      ${active.map(synergyRow).join("")}
      ${pending.map(synergyRow).join("")}
    `
    : `<div class="synergy">上阵英雄后显示羁绊</div>`;
}

function synergyRow(row) {
  return `
    <div class="synergy ${row.active ? "active" : ""}">
      <strong>${row.name} ${row.count}/${row.threshold}</strong>
      <span>${row.active ? "已触发" : `还差 ${row.threshold - row.count}`} · ${row.text}</span>
    </div>
  `;
}

function renderRewards() {
  document.querySelector("#rewards").innerHTML = state.rewards.length
    ? state.rewards.map((reward, index) => `
      <div class="reward">
        <strong>${reward.title}</strong>
        <div>${reward.text}</div>
        <button type="button" data-claim="${index}">领取</button>
      </div>
    `).join("")
    : `<div class="reward">暂无奖励</div>`;
}

function renderInventory() {
  document.querySelector("#equipment").innerHTML = state.equipment.length
    ? state.equipment.map((item) => `<div class="item-pill">${item[0]} · ${item[1]}</div>`).join("")
    : `<div class="item-pill">空</div>`;
  document.querySelector("#relics").innerHTML = state.relics.length
    ? state.relics.map((item) => `<div class="item-pill">${item[0]} · ${item[1]}</div>`).join("")
    : `<div class="item-pill">空</div>`;
}

function renderCompendium() {
  document.querySelector("#codexHeroes").innerHTML = HEROES.map((config) => `
    <article class="codex-card" style="--race:${raceColors[config.race]}">
      <div class="portrait">${config.name.slice(0, 1)}</div>
      <div>
        <strong>${config.name} · ${config.cost}金</strong>
        <div class="codex-tags">
          <span>${config.race}</span>
          <span>${config.job}</span>
          <span>${config.type}</span>
        </div>
        <p>生命 ${config.hp} · 普攻 ${config.attack} · 技能 ${config.skill}</p>
        <p>${config.race}/${config.job}：2人 +12%，4人 +18%；异士会降低其他羁绊门槛。</p>
      </div>
    </article>
  `).join("");
  document.querySelector("#codexEquipment").innerHTML = EQUIPMENT.map((item) => `
    <div class="codex-line"><strong>${item[0]}</strong><span>${item[1]}</span></div>
  `).join("");
  document.querySelector("#codexRelics").innerHTML = RELICS.map((item) => `
    <div class="codex-line"><strong>${item[0]}</strong><span>${item[1]}</span></div>
  `).join("");
}

function renderBattle() {
  const enemies = getEnemyWave();
  const timerLabel = state.isBattling ? "战斗倒计时" : state.lastResult ? "结算" : "准备倒计时";
  const timerValue = state.isBattling ? `${state.battleRemaining}s` : state.lastResult ? "完成" : `${state.prepRemaining}s`;
  document.querySelector("#battleField").innerHTML = `
    <div class="battle-side heroes">
      ${state.board.length ? state.board.map((owned, index) => battleHeroCard(owned, index)).join("") : `<div class="battle-card">未上阵</div>`}
    </div>
    <div class="battle-center">
      <div class="score-target">${timerLabel}<strong>${timerValue}</strong><span>目标 ${targetScore()}</span></div>
      <div class="clash-line ${state.isBattling ? "active" : ""}"></div>
    </div>
    <div class="battle-side enemies">
      ${enemies.map((enemy, index) => `
        <div class="enemy-card ${state.isBattling ? "taking-hit" : ""}" style="animation-delay:${index * 120}ms">
          <div class="enemy-icon">${enemy.icon}</div>
          <strong>${enemy.name}</strong>
          <span>${enemy.value}分</span>
        </div>
      `).join("")}
    </div>
  `;

  const report = state.gameOver
    ? `<strong class="log-loss">游戏结束</strong><div>血量已经归零</div><div>最终到达第 ${state.stage} 关</div>`
    : state.isBattling
      ? `<strong>战斗进行中 · ${state.battleRemaining}s</strong>${state.battleLog.map((line) => `<div>${line}</div>`).join("")}`
      : state.lastResult
        ? `
          <strong class="${state.lastResult.won ? "log-win" : "log-loss"}">${state.lastResult.won ? "胜利" : "失败"}</strong>
          <div>分数 ${state.lastResult.score} / ${state.lastResult.target}</div>
          <div>固定 +${state.lastResult.income.baseGold}</div>
          <div>野怪 +${state.lastResult.income.creepGold}</div>
          <div>连胜/连败 +${state.lastResult.income.streakGold}</div>
          <div>利息 +${state.lastResult.income.interest}</div>
          <div>圣物 +${state.lastResult.income.relicGold}</div>
          <div>金币合计 +${state.lastResult.goldGain}</div>
          <div>经验 +${state.lastResult.xpGain}</div>
          <div>掉血 ${state.lastResult.hpLost}</div>
        `
        : `<strong>第 ${state.stage} 关</strong><div>准备时间 ${state.prepRemaining}s</div><div>${state.board.length ? "可手动开战，倒计时归零也会自动开战" : "上阵英雄后才能开战"}</div>`;
  document.querySelector("#battleReport").innerHTML = report;
}

function battleHeroCard(owned, index) {
  const config = getHero(owned.id);
  return `
    <div class="battle-card fighter ${state.isBattling ? "attacking" : ""}" style="--race:${raceColors[config.race]}; animation-delay:${index * 90}ms">
      <div class="portrait">${config.name.slice(0, 1)}</div>
      <div class="hero-name">${config.name} ${"★".repeat(owned.star)}</div>
      ${heroSynergyChips(config)}
      <p>普攻 ${config.attack * owned.star}</p>
      <p>技能 ${config.skill * owned.star}</p>
    </div>
  `;
}

function buy(index) {
  if (isPrepLocked()) return;
  const shopHero = state.shop[index];
  if (!shopHero || state.gold < shopHero.cost) return;
  const moved = moveShopHeroToBench({ board: state.board, bench: state.bench }, { id: shopHero.id, star: 1 });
  if (moved === undefined || moved.bench === state.bench) return;
  state.gold -= shopHero.cost;
  state.board = moved.board;
  state.bench = moved.bench;
  state.shop.splice(index, 1);
  render();
  maybeAutoStartBattle();
}

function refreshShop() {
  if (isPrepLocked()) return;
  const cost = hasRelic("招贤榜") && !state.firstRefreshUsed ? 1 : 2;
  if (state.gold < cost) return;
  state.gold -= cost;
  state.firstRefreshUsed = true;
  rollShop();
  render();
}

function buyXp() {
  if (isPrepLocked() || state.gold < 4) return;
  state.gold -= 4;
  gainXp(4);
  render();
}

function field(index) {
  if (isPrepLocked() || state.board.length >= state.level) return;
  const [owned] = state.bench.splice(index, 1);
  if (owned) state.board.push(owned);
  mergeRoster();
  render();
  maybeAutoStartBattle();
}

function unfield(index) {
  if (isPrepLocked()) return;
  const moved = moveBoardHeroToBench({ board: state.board, bench: state.bench }, index);
  state.board = moved.board;
  state.bench = moved.bench;
  render();
}

function sellBench(index) {
  if (isPrepLocked()) return;
  const [owned] = state.bench.splice(index, 1);
  if (!owned) return;
  state.gold += getSellValue(owned);
  render();
}

function sellBoard(index) {
  if (isPrepLocked()) return;
  const [owned] = state.board.splice(index, 1);
  if (!owned) return;
  state.gold += getSellValue(owned);
  render();
}

function startBattle() {
  if (state.gameOver || state.board.length === 0 || state.lastResult || state.isBattling) return;
  stopPrepTimer();
  state.pendingBattleResult = resolveBattleResult();
  state.isBattling = true;
  state.battleRemaining = BATTLE_SECONDS;
  state.battleLog = buildBattleLog(state.pendingBattleResult);
  render();
  startBattleTimer();
}

function finishBattle() {
  const result = state.pendingBattleResult;
  if (!result) return;
  stopBattleTimer();
  state.gold += result.goldGain;
  state.streak = result.income.nextStreak;
  const hpState = settleHp(state.hp, result.hpLost);
  state.hp = hpState.hp;
  state.gameOver = hpState.gameOver;
  gainXp(result.xpGain);
  if (!state.gameOver) addStageRewards(result.won);
  state.isBattling = false;
  state.pendingBattleResult = null;
  state.lastResult = result;
  render();
}

function resolveBattleResult() {
  const score = getBoardPower();
  const target = targetScore();
  const won = score >= target;
  const hpLost = won ? 0 : Math.max(1, Math.ceil(((target - score) / target) * 10) - (hasRelic("续命符") ? 2 : 0));
  const creepGold = stageCreepGold();
  const relicGold = hasRelic("聚宝盆") ? 1 : 0;
  const income = resolveRoundIncome({
    won,
    goldBeforeIncome: state.gold,
    previousStreak: state.streak,
    creepGold,
    relicGold,
  });
  const xpGain = hasRelic("太学令") ? 2 : 1;
  return { won, score, target, goldGain: income.total, income, xpGain, hpLost };
}

function buildBattleLog(result) {
  return state.board.slice(0, 5).map((owned) => {
    const config = getHero(owned.id);
    const output = Math.round((config.attack * 30 + config.skill * 3) * owned.star);
    return `${config.name} 造成 ${output} 分`;
  }).concat(result.won ? ["敌阵崩溃，过关"] : ["输出不足，扣除血量"]);
}

function nextStage() {
  if (state.gameOver || !state.lastResult || state.isBattling) return;
  state.stage += 1;
  state.firstRefreshUsed = false;
  state.lastResult = null;
  state.battleLog = [];
  state.prepRemaining = PREP_SECONDS;
  rollShop();
  render();
  startPrepTimer();
}

function claim(index) {
  if (state.gameOver || state.isBattling) return;
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
  return Math.round((base + state.equipment.length * 70) * getSynergyBonus());
}

function getSynergyBonus() {
  return getSynergyRows().reduce((bonus, row) => bonus + (row.active ? row.bonus : 0), 1);
}

function getSynergyRows() {
  const counts = getCounts(boardUnits());
  const yishi = counts["异士"] >= 2 ? 1 : 0;
  return Object.keys(counts).sort().flatMap((name) => {
    const count = counts[name];
    const first = getFirstThreshold(name, yishi);
    const second = Math.max(3, 4 - yishi);
    return [
      { name, count, threshold: first, active: count >= first, bonus: 0.12, text: "基础加成 +12%" },
      { name, count, threshold: second, active: count >= second, bonus: 0.18, text: "进阶加成 +18%" },
    ];
  });
}

function getFirstThreshold(name, yishi) {
  return Math.max(1, name === "异士" ? 2 : 2 - yishi);
}

function getCounts(units) {
  const counts = {};
  for (const unit of uniqueUnits(units)) {
    counts[unit.race] = (counts[unit.race] ?? 0) + 1;
    counts[unit.job] = (counts[unit.job] ?? 0) + 1;
  }
  return counts;
}

function boardUnits() {
  return state.board.map((owned) => {
    const config = getHero(owned.id);
    return { id: owned.id, race: config.race, job: config.job };
  });
}

function uniqueUnits(units) {
  const seen = new Set();
  return units.filter((unit) => {
    if (!unit.id) return true;
    if (seen.has(unit.id)) return false;
    seen.add(unit.id);
    return true;
  });
}

function mergeRoster() {
  const merged = mergeRosterCopies({ board: state.board, bench: state.bench });
  state.board = merged.board;
  state.bench = merged.bench;
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

function getEnemyWave() {
  if (state.stage <= 3) return [
    { icon: "卒", name: "野怪", value: 300 },
    { icon: "卒", name: "野怪", value: 300 },
    { icon: "将", name: "精英", value: 300 },
  ];
  if (state.stage % 5 === 0) return [
    { icon: "王", name: "Boss", value: targetScore() },
    { icon: "卫", name: "护卫", value: Math.round(targetScore() * 0.25) },
  ];
  return [
    { icon: "兵", name: "前军", value: Math.round(targetScore() * 0.34) },
    { icon: "弓", name: "中军", value: Math.round(targetScore() * 0.33) },
    { icon: "骑", name: "后军", value: Math.round(targetScore() * 0.33) },
  ];
}

function hasRelic(name) {
  return state.relics.some((relic) => relic[0] === name);
}

function getHero(id) {
  return HEROES.find((candidate) => candidate.id === id);
}

function isPrepLocked() {
  return state.gameOver || state.isBattling || Boolean(state.lastResult);
}

function startPrepTimer() {
  stopPrepTimer();
  if (state.gameOver || state.lastResult || state.isBattling) return;
  prepTimer = setInterval(() => {
    if (state.gameOver || state.lastResult || state.isBattling) {
      stopPrepTimer();
      return;
    }
    state.prepRemaining = Math.max(0, state.prepRemaining - 1);
    render();
    maybeAutoStartBattle();
  }, 1000);
}

function maybeAutoStartBattle() {
  if (shouldAutoStartBattle({
    gameOver: state.gameOver,
    isBattling: state.isBattling,
    hasResult: Boolean(state.lastResult),
    prepRemaining: state.prepRemaining,
    boardCount: state.board.length,
  })) {
    startBattle();
  }
}

function startBattleTimer() {
  stopBattleTimer();
  battleTimer = setInterval(() => {
    state.battleRemaining = Math.max(0, state.battleRemaining - 1);
    render();
    if (state.battleRemaining === 0) finishBattle();
  }, 1000);
}

function stopPrepTimer() {
  clearInterval(prepTimer);
  prepTimer = null;
}

function stopBattleTimer() {
  clearInterval(battleTimer);
  battleTimer = null;
}

function bindDemo() {
  document.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (!target) return;
    if (target.dataset.buy !== undefined) buy(Number(target.dataset.buy));
    if (target.dataset.field !== undefined) field(Number(target.dataset.field));
    if (target.dataset.unfield !== undefined) unfield(Number(target.dataset.unfield));
    if (target.dataset.sellBench !== undefined) sellBench(Number(target.dataset.sellBench));
    if (target.dataset.sellBoard !== undefined) sellBoard(Number(target.dataset.sellBoard));
    if (target.dataset.claim !== undefined) claim(Number(target.dataset.claim));
  });

  document.querySelector("#refreshBtn").addEventListener("click", refreshShop);
  document.querySelector("#xpBtn").addEventListener("click", buyXp);
  document.querySelector("#battleBtn").addEventListener("click", startBattle);
  document.querySelector("#nextBtn").addEventListener("click", nextStage);

  render();
  startPrepTimer();
}

if (typeof document !== "undefined") {
  bindDemo();
}
