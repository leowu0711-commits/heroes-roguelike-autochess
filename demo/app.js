const HEROES = [
  hero("jing-ke", "荆轲", 1, "秦汉", "刺客", 70, 18, 150, "物理"),
  hero("zhang-liang", "张良", 1, "秦汉", "文臣", 80, 12, 90, "魔法"),
  hero("li-guang", "李广", 1, "秦汉", "射手", 82, 18, 115, "物理"),
  hero("lian-po", "廉颇", 1, "先秦", "步兵", 135, 14, 90, "物理"),
  hero("diaochan", "貂蝉", 1, "三国", "刺客", 75, 16, 120, "物理"),
  hero("cao-ren", "曹仁", 1, "三国", "步兵", 125, 15, 100, "物理"),
  hero("qin-qiong", "秦琼", 1, "盛唐", "武将", 120, 20, 130, "物理"),
  hero("yang-yuhuan", "杨玉环", 1, "盛唐", "异士", 75, 10, 70, "魔法"),
  hero("bao-zheng", "包拯", 1, "大宋", "文臣", 95, 12, 80, "魔法"),
  hero("xin-qiji", "辛弃疾", 1, "大宋", "武将", 115, 18, 120, "物理"),
  hero("jingwei", "精卫", 1, "山海", "射手", 75, 16, 100, "神话"),
  hero("daji", "妲己", 1, "妖族", "异士", 70, 10, 80, "魔法"),
  hero("qu-yuan", "屈原", 1, "楚汉", "文臣", 78, 12, 95, "魔法"),
  hero("lu-ban", "鲁班", 1, "先秦", "工匠", 85, 13, 85, "物理"),
  hero("wang-zhaojun", "王昭君", 2, "秦汉", "文臣", 86, 13, 125, "魔法"),
  hero("huo-qubing", "霍去病", 2, "秦汉", "骑兵", 130, 22, 165, "物理"),
  hero("huang-zhong", "黄忠", 2, "三国", "射手", 95, 23, 155, "物理"),
  hero("xiao-qiao", "小乔", 2, "三国", "文臣", 82, 12, 120, "魔法"),
  hero("li-bai", "李白", 2, "盛唐", "刺客", 90, 20, 160, "物理"),
  hero("li-shimin", "李世民", 2, "盛唐", "帝王", 130, 18, 130, "魔法"),
  hero("zhao-kuangyin", "赵匡胤", 2, "大宋", "帝王", 135, 18, 140, "魔法"),
  hero("jiang-ziya", "姜子牙", 2, "神话", "方士", 85, 12, 135, "魔法"),
  hero("nezha", "哪吒", 2, "神话", "刺客", 95, 22, 170, "神话"),
  hero("yinglong", "应龙", 2, "山海", "武将", 135, 20, 150, "神话"),
  hero("xiang-yu", "项羽", 2, "楚汉", "武将", 155, 24, 175, "物理"),
  hero("ji-kang", "嵇康", 2, "魏晋", "异士", 82, 12, 110, "魔法"),
  hero("hua-mulan", "花木兰", 2, "隋唐", "骑兵", 118, 21, 150, "物理"),
  hero("han-xin", "韩信", 3, "秦汉", "武将", 150, 24, 210, "物理"),
  hero("wei-qing", "卫青", 3, "秦汉", "骑兵", 155, 23, 205, "物理"),
  hero("cao-cao", "曹操", 3, "三国", "帝王", 150, 22, 180, "魔法"),
  hero("guan-yu", "关羽", 3, "三国", "武将", 170, 26, 260, "物理"),
  hero("zhou-yu", "周瑜", 3, "三国", "方士", 115, 15, 235, "魔法"),
  hero("yue-fei", "岳飞", 3, "大宋", "武将", 165, 24, 230, "物理"),
  hero("shen-kuo", "沈括", 3, "大宋", "工匠", 115, 15, 185, "魔法"),
  hero("sun-wukong", "孙悟空", 3, "神话", "刺客", 130, 28, 230, "神话"),
  hero("hou-yi", "后羿", 3, "神话", "射手", 120, 27, 220, "神话"),
  hero("bai-qi", "白起", 3, "先秦", "步兵", 180, 24, 220, "物理"),
  hero("qi-jiguang", "戚继光", 3, "明清", "步兵", 150, 22, 210, "物理"),
  hero("qin-shihuang", "秦始皇", 4, "秦汉", "帝王", 190, 26, 320, "魔法"),
  hero("zhuge-liang", "诸葛亮", 4, "三国", "文臣", 120, 14, 180, "魔法"),
  hero("wu-zetian", "武则天", 4, "盛唐", "帝王", 150, 20, 285, "魔法"),
  hero("li-jing", "李靖", 4, "隋唐", "骑兵", 175, 27, 295, "物理"),
  hero("xingtian", "刑天", 4, "山海", "武将", 220, 30, 360, "神话"),
  hero("jiuweihu", "九尾狐", 4, "妖族", "异士", 130, 18, 270, "神话"),
  hero("zhang-sanfeng", "张三丰", 4, "仙门", "方士", 135, 16, 300, "魔法"),
  hero("liu-bowen", "刘伯温", 4, "明清", "文臣", 125, 15, 260, "魔法"),
  hero("xuanyuan", "轩辕黄帝", 5, "神话", "帝王", 230, 32, 420, "神话"),
  hero("nuwa", "女娲", 5, "神话", "方士", 165, 18, 460, "神话"),
  hero("chiyou", "蚩尤", 5, "山海", "武将", 260, 36, 450, "神话"),
  hero("taishang", "太上老君", 5, "仙门", "方士", 170, 16, 430, "魔法"),
  hero("zheng-he", "郑和", 5, "明清", "射手", 180, 34, 390, "物理"),
  hero("liu-bei", "刘备", 5, "三国", "帝王", 205, 26, 380, "魔法"),
];

const WILDCARD_ID = "wildcard";
const WILDCARD = {
  id: WILDCARD_ID,
  name: "万能棋子",
  cost: 5,
  race: "天命",
  job: "英魂",
  type: "特殊",
  hp: 0,
  attack: 0,
  skill: 0,
  special: true,
};

const EQUIPMENT = [
  ["青龙偃月刀", "物理技能 +20%", 1],
  ["羽扇", "魔法技能 +20%", 1],
  ["山海残卷", "技能变为神话", 2],
  ["封神榜", "开局法力 +25", 2],
  ["金丝甲", "环境伤害 -20%", 3],
  ["风火轮", "普攻 +15%", 3],
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
  "先秦": "#6f5140",
  "楚汉": "#8d3f4d",
  "魏晋": "#6d7188",
  "隋唐": "#a46337",
  "明清": "#3f647c",
  "仙门": "#5f7f9f",
  "妖族": "#8a4f7b",
  "天命": "#c6b36a",
};

const jobColors = {
  "刺客": "#8f5fcb",
  "文臣": "#4e8ec8",
  "武将": "#bf5b45",
  "帝王": "#c49b42",
  "异士": "#5d9b76",
  "骑兵": "#b7773f",
  "步兵": "#87906f",
  "射手": "#618f58",
  "方士": "#7a6fbb",
  "工匠": "#9d7b55",
  "英魂": "#c6c8d1",
};

const damageColors = {
  "物理": "#a98562",
  "魔法": "#5f82c7",
  "神话": "#8b65c9",
  "特殊": "#c6b36a",
};

const SYNERGY_DEFINITIONS = {
  "秦汉": synergy("种族", [
    tier(3, 0.16, "秦汉棋子物理伤害提高，低费三星更能顶关"),
    tier(6, 0.28, "秦汉棋子额外获得军阵护甲和物理增伤"),
    tier(9, 0.46, "秦汉每次普攻叠军势，结算分数继续滚高"),
  ]),
  "三国": synergy("种族", [
    tier(3, 0.15, "三国棋子放技能后给一名三国友军回蓝"),
    tier(6, 0.3, "号令扩大，技能后给两名友军回蓝"),
    tier(9, 0.52, "三国技能有概率引发弱化版连携技能"),
  ]),
  "盛唐": synergy("种族", [
    tier(2, 0.12, "盛唐棋子获得暴击率"),
    tier(4, 0.24, "暴击伤害提高，适合刺客和射手"),
    tier(6, 0.42, "暴击时触发诗酒追击并回蓝"),
  ]),
  "大宋": synergy("种族", [
    tier(2, 0.1, "减少环境伤害并提高稳定收益"),
    tier(4, 0.22, "大宋棋子开局获得护盾"),
    tier(6, 0.38, "护盾触发时给全队回蓝，防守转输出"),
  ]),
  "神话": synergy("种族", [
    tier(2, 0.14, "神话棋子开局获得法力"),
    tier(4, 0.28, "第一次技能伤害提高"),
    tier(6, 0.48, "第一次技能后返还法力，形成开局连爆"),
  ]),
  "山海": synergy("种族", [
    tier(2, 0.12, "击杀后山海棋子本关成长"),
    tier(4, 0.26, "击杀成长影响全队"),
    tier(6, 0.45, "击杀有概率让山海棋子立刻回满法力"),
  ]),
  "先秦": synergy("种族", [
    tier(2, 0.12, "1费、2费先秦棋子伤害提高"),
    tier(4, 0.3, "先秦三星棋子额外获得最终伤害和护甲"),
  ]),
  "楚汉": synergy("种族", [
    tier(2, 0.14, "生命越低伤害越高"),
    tier(4, 0.34, "首次濒死保留1血并立刻释放技能"),
  ]),
  "魏晋": synergy("种族", [
    tier(2, 0.12, "魏晋棋子获得闪避"),
    tier(4, 0.32, "闪避后回蓝，并提高下一次技能伤害"),
  ]),
  "隋唐": synergy("种族", [
    tier(2, 0.13, "开局前几秒攻速提高"),
    tier(4, 0.33, "开局第一次普攻或技能必定暴击"),
  ]),
  "明清": synergy("种族", [
    tier(2, 0.12, "后排普攻附带火器伤害"),
    tier(4, 0.35, "每隔数秒按后排人数发射火器齐射"),
  ]),
  "仙门": synergy("种族", [
    tier(2, 0.14, "仙门棋子回蓝提高"),
    tier(4, 0.3, "第一次技能后给最低法力友军回蓝"),
    tier(6, 0.5, "技能有概率不清空法力，直接循环"),
  ]),
  "妖族": synergy("种族", [
    tier(1, 0.12, "场上只有一种妖族时，该妖族获得强力加成"),
    tier(2, 0.22, "妖族技能附带魅惑和易伤"),
    tier(4, 0.42, "妖族不再冲突，并放大异常伤害"),
  ]),
  "武将": synergy("职业", [
    tier(3, 0.16, "武将普攻提高"),
    tier(6, 0.32, "武将物理技能提高"),
    tier(9, 0.55, "武将普攻叠战意，技能消耗战意爆发"),
  ]),
  "文臣": synergy("职业", [
    tier(2, 0.12, "全队回蓝提高"),
    tier(4, 0.28, "文臣技能复制上一个友军技能部分伤害"),
    tier(6, 0.48, "文臣技能给全队分摊回蓝，形成技能链"),
  ]),
  "帝王": synergy("职业", [
    tier(2, 0.14, "全队最终伤害提高"),
    tier(4, 0.36, "定期发布号令，让全队获得法力或攻速"),
  ]),
  "刺客": synergy("职业", [
    tier(3, 0.18, "刺客获得暴击率和暴击伤害"),
    tier(6, 0.42, "刺客暴击后追加一次攻击"),
  ]),
  "异士": synergy("职业", [
    tier(2, 0.08, "所有非异士羁绊需求 -1"),
    tier(3, 0.24, "战斗开始时随机一个已触发羁绊临时提高一档"),
  ]),
  "骑兵": synergy("职业", [
    tier(2, 0.12, "开局攻速提高"),
    tier(4, 0.28, "开局造成一次冲锋伤害"),
    tier(6, 0.46, "冲锋后获得护盾，并让敌方易伤"),
  ]),
  "步兵": synergy("职业", [
    tier(2, 0.1, "步兵获得护甲"),
    tier(4, 0.24, "步兵受伤时给后排回蓝"),
    tier(6, 0.42, "步兵死亡时触发死守，给全队护盾"),
  ]),
  "射手": synergy("职业", [
    tier(3, 0.16, "射手普攻伤害提高"),
    tier(6, 0.4, "射手每数次攻击连射，优先高价值目标"),
  ]),
  "方士": synergy("职业", [
    tier(3, 0.18, "敌方法术减伤降低"),
    tier(6, 0.44, "方士技能叠法印，后续技能按层数增伤"),
  ]),
  "工匠": synergy("职业", [
    tier(2, 0.14, "装备效果提高"),
    tier(4, 0.34, "每件装备额外触发回蓝、护盾或追击副效果"),
  ]),
};

let state = createState();

function hero(id, name, cost, race, job, hp, attack, skill, type) {
  return { id, name, cost, race, job, hp, attack, skill, type };
}

function synergy(kind, tiers) {
  return { kind, tiers };
}

function tier(count, bonus, text) {
  return { count, bonus, text };
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
    gameOver: false,
    battleLog: [],
    lastResult: null,
  };
}

export function getSellValue(owned) {
  const config = getHeroConfig(owned.id);
  const copies = owned.star === 1 ? 1 : owned.star === 2 ? 3 : 9;
  return (config?.cost ?? 1) * copies;
}

export function getPlayableHeroes() {
  return HEROES.map((heroConfig) => ({ ...heroConfig }));
}

export function getSynergyDefinitions() {
  return Object.fromEntries(Object.entries(SYNERGY_DEFINITIONS).map(([name, definition]) => [
    name,
    {
      kind: definition.kind,
      tiers: definition.tiers.map((tierConfig) => ({ ...tierConfig })),
    },
  ]));
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

export function getBattleOutcomeTitle(won) {
  return won ? "胜利" : "失败";
}

export function groupHeroesByCost(heroes) {
  const costs = [...new Set(heroes.map((config) => config.cost))].sort((a, b) => a - b);
  return costs.map((cost) => ({
    cost,
    heroes: heroes.filter((config) => config.cost === cost),
  }));
}

export function getTraitTone(name, kind) {
  if (kind === "race") return raceColors[name] ?? "#6f766f";
  if (kind === "job") return jobColors[name] ?? "#6f766f";
  return damageColors[name] ?? "#6f766f";
}

export function shouldRollWildcard(roll) {
  return roll < 0.01;
}

function rollShopCost(level, roll) {
  const odds = getShopCostOdds(level);
  let cursor = 0;
  for (const [cost, chance] of odds) {
    cursor += chance;
    if (roll < cursor) return cost;
  }
  return odds[odds.length - 1][0];
}

function getShopCostOdds(level) {
  const table = {
    1: [[1, 1], [2, 0], [3, 0], [4, 0], [5, 0]],
    2: [[1, 0.7], [2, 0.3], [3, 0], [4, 0], [5, 0]],
    3: [[1, 0.6], [2, 0.3], [3, 0.1], [4, 0], [5, 0]],
    4: [[1, 0.5], [2, 0.35], [3, 0.15], [4, 0], [5, 0]],
    5: [[1, 0.4], [2, 0.35], [3, 0.23], [4, 0.02], [5, 0]],
    6: [[1, 0.33], [2, 0.3], [3, 0.3], [4, 0.07], [5, 0]],
    7: [[1, 0.3], [2, 0.3], [3, 0.3], [4, 0.1], [5, 0]],
    8: [[1, 0.24], [2, 0.3], [3, 0.3], [4, 0.15], [5, 0.01]],
    9: [[1, 0.22], [2, 0.25], [3, 0.3], [4, 0.2], [5, 0.03]],
    10: [[1, 0.19], [2, 0.25], [3, 0.25], [4, 0.25], [5, 0.06]],
  };
  return table[Math.min(10, Math.max(1, level))];
}

export function getHeroSynergyTags(heroLike, boardLike) {
  const counts = getCounts(boardLike);
  return [heroLike.race, heroLike.job].map((name) => {
    const count = counts[name] ?? 0;
    const threshold = getNextSynergyThreshold(name, count, counts);
    const activeTier = getActiveSynergyTier(name, count, counts);
    return {
      name,
      count,
      threshold,
      active: activeTier !== null,
      text: getSynergyDefinitionText(name),
    };
  });
}

export function mergeRosterCopies(roster) {
  let board = roster.board.map((owned) => ({ ...owned }));
  let bench = roster.bench.map((owned) => ({ ...owned }));
  let changed = true;

  while (changed) {
    changed = false;
    const wildcardUpgrade = findWildcardThreeStarMerge(board, bench);
    if (wildcardUpgrade) {
      ({ board, bench } = wildcardUpgrade);
      changed = true;
      continue;
    }

    for (const star of [1, 2]) {
      const all = [...board, ...bench];
      const id = all.find((owned) => {
        if (owned.id === WILDCARD_ID && star === 2) return false;
        return all.filter((candidate) => candidate.id === owned.id && candidate.star === star).length >= 3;
      })?.id;
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

function findWildcardThreeStarMerge(board, bench) {
  const all = [...board, ...bench];
  const targetId = all.find((owned) => {
    if (owned.id === WILDCARD_ID || owned.star !== 2) return false;
    const matchingTwos = all.filter((candidate) => candidate.id === owned.id && candidate.star === 2).length;
    const wildcardTwos = all.filter((candidate) => candidate.id === WILDCARD_ID && candidate.star === 2).length;
    return matchingTwos >= 2 && wildcardTwos >= 1;
  })?.id;

  if (!targetId) return null;

  let removedTargets = 0;
  let removedWildcard = false;
  let keepOnBoard = false;
  const nextBoard = board.filter((owned) => {
    if (owned.id === targetId && owned.star === 2 && removedTargets < 2) {
      removedTargets += 1;
      keepOnBoard = true;
      return false;
    }
    if (owned.id === WILDCARD_ID && owned.star === 2 && !removedWildcard) {
      removedWildcard = true;
      return false;
    }
    return true;
  });
  const nextBench = bench.filter((owned) => {
    if (owned.id === targetId && owned.star === 2 && removedTargets < 2) {
      removedTargets += 1;
      return false;
    }
    if (owned.id === WILDCARD_ID && owned.star === 2 && !removedWildcard) {
      removedWildcard = true;
      return false;
    }
    return true;
  });

  const merged = { id: targetId, star: 3 };
  if (keepOnBoard) nextBoard.push(merged);
  else nextBench.push(merged);
  return { board: nextBoard, bench: nextBench };
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
  state.shop = Array.from({ length: 5 }, () => {
    const cost = rollShopCost(state.level, Math.random());
    const pool = HEROES.filter((candidate) => candidate.cost === cost);
    return pool[Math.floor(Math.random() * pool.length)];
  });
  if (shouldRollWildcard(Math.random())) {
    state.shop[(state.stage + state.gold) % state.shop.length] = WILDCARD;
  }
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
  document.querySelector("#phaseText").textContent = state.gameOver ? "游戏结束" : state.lastResult ? "结算阶段" : "布阵阶段";
  document.querySelector("#refreshBtn").disabled = state.gameOver || Boolean(state.lastResult);
  document.querySelector("#xpBtn").disabled = state.gameOver || Boolean(state.lastResult);
  document.querySelector("#nextBtn").disabled = state.gameOver || !state.lastResult;
  document.querySelector("#battleBtn").disabled = state.gameOver || state.board.length === 0 || Boolean(state.lastResult);
}

function renderShop() {
  document.querySelector("#shop").innerHTML = state.shop.map((shopHero, index) => `
    <article class="hero-card star-1 ${shopHero.special ? "wildcard-card" : ""}" style="--race:${raceColors[shopHero.race]}">
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
    const disabled = state.board.length >= state.level || owned.id === WILDCARD_ID ? "disabled" : "";
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
  const config = getHeroConfig(owned.id);
  return `
    <article class="hero-card compact star-${owned.star} ${config.special ? "wildcard-card" : ""}" style="--race:${raceColors[config.race]}">
      <div class="portrait">${config.name.slice(0, 1)}</div>
      <div class="hero-name">${config.name} ${"★".repeat(owned.star)}</div>
      ${heroSynergyChips(config)}
    </article>
  `;
}

function heroSynergyChips(config) {
  if (config.special) {
    return `
      <div class="synergy-chips">
        <span class="synergy-chip race-chip" style="--trait:${getTraitTone(config.race, "race")}">万能</span>
        <span class="synergy-chip job-chip" style="--trait:${getTraitTone(config.job, "job")}">合成素材</span>
      </div>
    `;
  }
  return `
    <div class="synergy-chips">
      ${getHeroSynergyTags(config, boardUnits()).map((tag) => `
        <span class="synergy-chip ${tag.active ? "active" : ""} ${tag.name === config.race ? "race-chip" : "job-chip"}" style="--trait:${getTraitTone(tag.name, tag.name === config.race ? "race" : "job")}" title="${tag.text}">
          ${tag.name} ${tag.count}/${tag.threshold}
        </span>
      `).join("")}
    </div>
  `;
}

function traitTags(config) {
  return `
    <div class="codex-tags">
      <span class="race-chip" style="--trait:${getTraitTone(config.race, "race")}">${config.race}</span>
      <span class="job-chip" style="--trait:${getTraitTone(config.job, "job")}">${config.job}</span>
      <span class="damage-chip" style="--trait:${getTraitTone(config.type, "damage")}">${config.type}</span>
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
  document.querySelector("#codexHeroes").innerHTML = groupHeroesByCost([...HEROES, WILDCARD]).map((group) => `
    <section class="codex-group">
      <h4>${group.cost}费英雄</h4>
      <div class="codex-strip">
        ${group.heroes.map(heroCodexCard).join("")}
      </div>
    </section>
  `).join("");
  document.querySelector("#codexEquipment").innerHTML = groupEquipmentByTier(EQUIPMENT).map((group) => `
    <section class="codex-group">
      <h4>${group.tier}级装备</h4>
      <div class="codex-strip">
        ${group.items.map(equipmentCodexCard).join("")}
      </div>
    </section>
  `).join("");
  document.querySelector("#codexRelics").innerHTML = `
    <section class="codex-group">
      <h4>圣物</h4>
      <div class="codex-strip">
        ${RELICS.map(relicCodexCard).join("")}
      </div>
    </section>
  `;
}

function heroCodexCard(config) {
  return `
    <article class="codex-card" style="--race:${raceColors[config.race]}">
      <div class="portrait">${config.name.slice(0, 1)}</div>
      <div>
        <strong>${config.name} · ${config.cost}金</strong>
        ${traitTags(config)}
        <p>生命 ${config.hp} · 普攻 ${config.attack} · 技能 ${config.skill}</p>
        <p>${config.race}/${config.job}：2人 +12%，4人 +18%；异士会降低其他羁绊门槛。</p>
      </div>
    </article>
  `;
}

function groupEquipmentByTier(items) {
  const tiers = [...new Set(items.map((item) => item[2] ?? 1))].sort((a, b) => a - b);
  return tiers.map((tier) => ({
    tier,
    items: items.filter((item) => (item[2] ?? 1) === tier),
  }));
}

function equipmentCodexCard(item) {
  return `<div class="codex-line"><strong>${item[0]}</strong><span>${item[1]}</span></div>`;
}

function relicCodexCard(item) {
  return `<div class="codex-line"><strong>${item[0]}</strong><span>${item[1]}</span></div>`;
}

function renderBattle() {
  const enemies = getEnemyWave();
  const centerLabel = state.lastResult ? "战斗结果" : "目标分";
  const centerValue = state.lastResult ? getBattleOutcomeTitle(state.lastResult.won) : targetScore();
  document.querySelector("#battleField").innerHTML = `
    <div class="battle-side heroes">
      ${state.board.length ? state.board.map((owned, index) => battleHeroCard(owned, index)).join("") : `<div class="battle-card">未上阵</div>`}
    </div>
    <div class="battle-center">
      <div class="score-target ${state.lastResult ? state.lastResult.won ? "score-win" : "score-loss" : ""}">${centerLabel}<strong>${centerValue}</strong><span>目标 ${targetScore()}</span></div>
      <div class="clash-line"></div>
    </div>
    <div class="battle-side enemies">
      ${enemies.map((enemy, index) => `
        <div class="enemy-card" style="animation-delay:${index * 120}ms">
          <div class="enemy-icon">${enemy.icon}</div>
          <strong>${enemy.name}</strong>
          <span>${enemy.value}分</span>
        </div>
      `).join("")}
    </div>
  `;

  const report = state.gameOver
    ? `<strong class="log-loss">游戏结束</strong><div>血量已经归零</div><div>最终到达第 ${state.stage} 关</div>`
    : state.lastResult
        ? `
          <div class="result-banner ${state.lastResult.won ? "win" : "loss"}">
            <span>本关结果</span>
            <strong>${getBattleOutcomeTitle(state.lastResult.won)}</strong>
            <small>分数 ${state.lastResult.score} / ${state.lastResult.target}</small>
          </div>
          ${state.battleLog.map((line) => `<div>${line}</div>`).join("")}
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
        : `<strong>第 ${state.stage} 关</strong><div>${state.board.length ? "点击开始战斗后立即结算" : "上阵英雄后才能开战"}</div>`;
  document.querySelector("#battleReport").innerHTML = report;
}

function battleHeroCard(owned, index) {
  const config = getHeroConfig(owned.id);
  return `
    <div class="battle-card fighter star-${owned.star}" style="--race:${raceColors[config.race]}; animation-delay:${index * 90}ms">
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
  if (owned?.id === WILDCARD_ID) {
    state.bench.splice(index, 0, owned);
    return;
  }
  if (owned) state.board.push(owned);
  mergeRoster();
  render();
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
  if (state.gameOver || state.board.length === 0 || state.lastResult) return;
  const result = resolveBattleResult();
  state.battleLog = buildBattleLog(result);
  finishBattle(result);
}

function finishBattle(result) {
  state.gold += result.goldGain;
  state.streak = result.income.nextStreak;
  const hpState = settleHp(state.hp, result.hpLost);
  state.hp = hpState.hp;
  state.gameOver = hpState.gameOver;
  gainXp(result.xpGain);
  if (!state.gameOver) addStageRewards(result.won);
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
    const config = getHeroConfig(owned.id);
    const output = Math.round((config.attack * 30 + config.skill * 3) * owned.star);
    return `${config.name} 造成 ${output} 分`;
  }).concat(result.won ? ["敌阵崩溃，过关"] : ["输出不足，扣除血量"]);
}

function nextStage() {
  if (state.gameOver || !state.lastResult) return;
  state.stage += 1;
  state.firstRefreshUsed = false;
  state.lastResult = null;
  state.battleLog = [];
  rollShop();
  render();
}

function claim(index) {
  if (state.gameOver) return;
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
    const config = getHeroConfig(owned.id);
    return sum + (config.attack * 30 + config.skill * 3 + config.hp * 0.25) * owned.star;
  }, 0);
  return Math.round((base + state.equipment.length * 70) * getSynergyBonus());
}

function getSynergyBonus() {
  return getSynergyRows().reduce((bonus, row) => bonus + (row.active ? row.bonus : 0), 1);
}

function getSynergyRows() {
  const counts = getCounts(boardUnits());
  return Object.keys(counts).sort().flatMap((name) => {
    const definition = SYNERGY_DEFINITIONS[name];
    if (!definition) return [];
    const count = counts[name];
    return definition.tiers.map((tierConfig) => {
      const threshold = getReducedThreshold(name, tierConfig.count, counts);
      return {
        name,
        count,
        threshold,
        active: count >= threshold,
        bonus: tierConfig.bonus,
        text: tierConfig.text,
      };
    });
  });
}

function getNextSynergyThreshold(name, count, counts) {
  const definition = SYNERGY_DEFINITIONS[name];
  if (!definition) return 1;
  const thresholds = definition.tiers.map((tierConfig) => getReducedThreshold(name, tierConfig.count, counts));
  return thresholds.find((threshold) => count < threshold) ?? thresholds[thresholds.length - 1];
}

function getActiveSynergyTier(name, count, counts) {
  const definition = SYNERGY_DEFINITIONS[name];
  if (!definition) return null;
  return definition.tiers.findLast((tierConfig) => count >= getReducedThreshold(name, tierConfig.count, counts)) ?? null;
}

function getReducedThreshold(name, count, counts) {
  const yishiReduction = name !== "异士" && (counts["异士"] ?? 0) >= 2 ? 1 : 0;
  return Math.max(1, count - yishiReduction);
}

function getSynergyDefinitionText(name) {
  const definition = SYNERGY_DEFINITIONS[name];
  if (!definition) return "";
  return definition.tiers.map((tierConfig) => `${tierConfig.count}人: ${tierConfig.text}`).join(" / ");
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
    const config = getHeroConfig(owned.id);
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
  while (state.level < 10 && state.xp >= xpNeeded()) {
    state.xp -= xpNeeded();
    state.level += 1;
  }
  if (state.level >= 10) state.xp = 0;
}

function xpNeeded() {
  return [0, 1, 1, 2, 4, 8, 16, 24, 32, 40][state.level] ?? 999;
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
  return getHeroConfig(id);
}

function getHeroConfig(id) {
  if (id === WILDCARD_ID) return WILDCARD;
  return HEROES.find((candidate) => candidate.id === id);
}

function isPrepLocked() {
  return state.gameOver || Boolean(state.lastResult);
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
}

if (typeof document !== "undefined") {
  bindDemo();
}
