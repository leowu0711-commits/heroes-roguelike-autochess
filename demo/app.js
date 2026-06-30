const HEROES = [
  hero("jing-ke", "荆轲", 1, "秦汉", "刺客", 70, 18, 150, "物理"),
  hero("zhang-liang", "张良", 1, "秦汉", "文臣", 80, 12, 90, "魔法"),
  hero("li-guang", "李广", 1, "秦汉", "射手", 82, 18, 115, "物理"),
  hero("xiao-he", "萧何", 1, "秦汉", "文臣", 78, 11, 95, "魔法"),
  hero("lian-po", "廉颇", 1, "春秋", "步兵", 135, 14, 90, "物理"),
  hero("diaochan", "貂蝉", 1, "三国", "刺客", 75, 16, 120, "物理"),
  hero("cao-ren", "曹仁", 1, "三国", "步兵", 125, 15, 100, "物理"),
  hero("qin-qiong", "秦琼", 1, "大唐", "武将", 120, 20, 130, "物理"),
  hero("yang-yuhuan", "杨玉环", 1, "大唐", "异士", 75, 10, 70, "魔法"),
  hero("bao-zheng", "包拯", 1, "大宋", "文臣", 95, 12, 80, "魔法"),
  hero("daji", "妲己", 1, "妖族", "异士", 70, 10, 80, "魔法"),
  hero("sun-bin", "孙膑", 1, "春秋", "方士", 74, 12, 95, "魔法"),
  hero("lu-ban", "鲁班", 1, "春秋", "工匠", 85, 13, 85, "物理"),
  hero("mo-zi", "墨子", 1, "春秋", "工匠", 92, 12, 100, "魔法"),
  hero("wang-zhaojun", "王昭君", 2, "秦汉", "文臣", 86, 13, 125, "魔法"),
  hero("huo-qubing", "霍去病", 2, "秦汉", "骑兵", 130, 22, 165, "物理"),
  hero("wu-zixu", "伍子胥", 2, "春秋", "武将", 135, 21, 155, "物理"),
  hero("bai-qi", "白起", 2, "春秋", "步兵", 150, 22, 165, "物理"),
  hero("huang-zhong", "黄忠", 2, "三国", "射手", 95, 23, 155, "物理"),
  hero("xiao-qiao", "小乔", 2, "三国", "文臣", 82, 12, 120, "魔法"),
  hero("yuan-chonghuan", "袁崇焕", 2, "明清", "射手", 96, 21, 150, "物理"),
  hero("li-bai", "李白", 2, "大唐", "刺客", 90, 20, 160, "物理"),
  hero("xue-rengui", "薛仁贵", 2, "大唐", "射手", 112, 22, 160, "物理"),
  hero("li-shimin", "李世民", 2, "大唐", "帝王", 130, 18, 130, "魔法"),
  hero("zhao-kuangyin", "赵匡胤", 2, "大宋", "帝王", 135, 18, 140, "魔法"),
  hero("zhuan-zhu", "专诸", 2, "春秋", "刺客", 92, 23, 150, "物理"),
  hero("shen-kuo", "沈括", 2, "大宋", "工匠", 88, 12, 135, "魔法"),
  hero("jiang-ziya", "姜子牙", 2, "神话", "方士", 85, 12, 135, "魔法"),
  hero("nezha", "哪吒", 2, "神话", "刺客", 95, 22, 170, "神话"),
  hero("xin-qiji", "辛弃疾", 2, "大宋", "武将", 115, 18, 120, "物理"),
  hero("wu-zetian", "武则天", 3, "大唐", "骑兵", 145, 18, 210, "魔法"),
  hero("du-fu", "杜甫", 3, "大唐", "文臣", 82, 13, 185, "魔法"),
  hero("gui-guzi", "鬼谷子", 2, "春秋", "异士", 82, 12, 150, "魔法"),
  hero("cao-cao", "曹操", 3, "三国", "帝王", 150, 22, 180, "魔法"),
  hero("guan-yu", "关羽", 3, "三国", "武将", 170, 26, 260, "物理"),
  hero("zhou-yu", "周瑜", 3, "三国", "方士", 115, 15, 235, "魔法"),
  hero("xun-yu", "荀彧", 3, "三国", "文臣", 96, 13, 210, "魔法"),
  hero("yue-fei", "岳飞", 3, "大宋", "武将", 165, 24, 230, "物理"),
  hero("jingwei", "精卫", 3, "山海", "射手", 105, 24, 205, "神话"),
  hero("yinglong", "应龙", 3, "山海", "武将", 155, 23, 220, "神话"),
  hero("xiang-yu", "项羽", 3, "西楚", "武将", 155, 24, 175, "物理"),
  hero("yu-ji", "虞姬", 3, "西楚", "射手", 92, 23, 175, "物理"),
  hero("hua-mulan", "花木兰", 3, "大隋", "骑兵", 130, 24, 205, "物理"),
  hero("han-xin", "韩信", 4, "秦汉", "骑兵", 165, 28, 285, "物理"),
  hero("bai-suzhen", "白素贞", 4, "妖族", "方士", 125, 17, 300, "神话"),
  hero("zhuge-liang", "诸葛亮", 4, "三国", "文臣", 120, 14, 180, "魔法"),
  hero("sun-wukong", "孙悟空", 4, "神话", "刺客", 140, 29, 285, "神话"),
  hero("hou-yi", "后羿", 4, "神话", "射手", 130, 28, 275, "神话"),
  hero("xingtian", "刑天", 4, "山海", "武将", 220, 30, 360, "神话"),
  hero("xie-an", "谢安", 4, "魏晋", "文臣", 125, 15, 260, "魔法"),
  hero("li-jing", "李靖", 5, "大隋", "骑兵", 190, 31, 360, "物理"),
  hero("ji-kang", "嵇康", 3, "魏晋", "异士", 120, 15, 250, "魔法"),
  hero("jiuweihu", "九尾狐", 5, "妖族", "刺客", 165, 26, 380, "神话"),
  hero("di-qing", "狄青", 5, "大宋", "步兵", 225, 30, 340, "物理"),
  hero("kong-zi", "孔子", 5, "春秋", "文臣", 155, 17, 410, "魔法"),
  hero("lubandashi", "鲁班大师", 5, "春秋", "工匠", 180, 24, 390, "物理"),
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
  ["青龙偃月刀", "通用：物理事件 ×1.18；特殊：若携带者打出物理技能，追加一次40%普攻", 1],
  ["羽扇", "通用：技能事件 ×1.16；特殊：若本轮有复制效果，复制倍率上限 +0.2", 1],
  ["虎符", "通用：携带者首次普攻后 +10 法力；特殊：若因此提前放技能，追加一次小技能", 1],
  ["七星匕首", "通用：暴击倍率 +0.25；特殊：若暴击后有追击，追击额外生成 ×1.15", 1],
  ["战鼓", "通用：前三次普攻事件 ×1.12；特殊：同排单位也获得一次弱化战鼓", 1],
  ["端砚", "通用：首次技能复制20%；特殊：若复制到倍率事件，复制值提高到35%", 1],
  ["连弩", "通用：普攻追加一段35%连射；特殊：连射如果暴击，会生成一个小倍率", 1],
  ["壮行酒", "通用：1-2费英雄升星后，本关总分 ×1.08；特殊：三星时再追加一次小加分", 1],
  ["星砂", "通用：携带者升到2星/3星时，本关追加 +300/+900分；特殊：三星后该加分可被复制", 1],
  ["税册", "通用：胜利后 +1金，最多每3关触发1次；特殊：利息满额时额外 +1经验", 1],
  ["山海残卷", "通用：伤害类型改为神话；特殊：神话事件可暴击且无视减伤", 2],
  ["封神榜", "通用：开局 +25 法力；特殊：若首个技能为神话事件，追加一次神威小倍率", 2],
  ["风火轮", "通用：开局 +15 法力；特殊：若首段输出后触发追击，追击倍率 +0.15", 2],
  ["云旗", "通用：首次输出 ×1.25；特殊：每2个冲锋事件让该倍率 +0.05", 2],
  ["摄魂铃", "通用：技能后返还 20 法力；特殊：若连续施法，第二次技能可被复制", 2],
  ["马铠", "通用：物理事件 ×1.18，并减少陨石/地震伤害15%；特殊：首段物理事件可触发冲锋", 2],
  ["笏板", "通用：技能事件 ×1.2；特殊：若本轮已有复制事件，复制对象优先选择倍率", 2],
  ["锻锤", "通用：重铸保留同级装备概率 +25%；特殊：重铸后首件装备倍率 +0.1", 2],
  ["金丝甲", "通用：环境伤害 -20%；特殊：生命低于80的携带者免疫第一次环境伤害", 3],
  ["玉玺", "通用：本关总分 ×1.12；特殊：若已激活4个以上羁绊，再追加号令小倍率", 3],
  ["青铜盾", "通用：保护最低生命单位，首次环境伤害免疫；特殊：保护成功后追加护阵倍率", 3],
  ["龙鳞", "通用：神话事件 ×1.12；特殊：若伤害由装备转为神话，额外生成一次小暴击", 3],
  ["阵图", "通用：每个已激活羁绊让本关总分 ×1.02，最多 ×1.16；特殊：6人口羁绊额外计一次", 3],
  ["凤羽", "通用：失败时保留35%分数缺口为下关加分；特殊：残血时保留比例提高", 3],
  ["阴阳镜", "通用：首次技能复制1次，复制技能造成60%分数；特殊：若复制到倍率，按弱化倍率结算", 4],
  ["破阵枪", "通用：目标分高于当前战力时，携带者事件 ×1.35；特殊：破关失败后下关仍保留一半", 4],
  ["龟甲", "通用：全队环境伤害 -30%；特殊：环境伤害被免疫时追加一次守势倍率", 4],
  ["傩面", "通用：技能改为神话伤害，并获得暴击率 +20%；特殊：神话暴击生成小倍率", 4],
  ["令旗", "通用：8/9/10人口时，本关总分分别 ×1.08/×1.14/×1.22；特殊：10人口额外强化最高费事件", 4],
  ["天工炉", "通用：装备倍率收益翻倍；特殊：每件装备从 ×1.08 提升到约 ×1.16", 4],
];

const RELICS = [
  ["聚宝盆", "10回合内每关结算 +1金，适合快速上人口"],
  ["招募榜", "10回合内每关首次刷新只要1金，适合搜低费三星"],
  ["太学令", "10回合内每关额外 +1经验，提前到8/9人口"],
  ["铸兵炉", "10回合内Boss后多1次免费重铸，装备更容易对阵容"],
  ["续命符", "10回合内失败少掉2血，容错换运营空间"],
  ["天命签", "10回合内商店高费概率 +20%，走高人口五费核心"],
  ["息壤印", "10回合内利息上限 +1，存钱上人口路线"],
  ["追星誓", "10回合内买已有同名棋子返1金，低人口追三星"],
  ["万军旗", "10回合内每个激活羁绊让总分额外 ×1.03，多羁绊路线"],
  ["刺客契", "10回合内刺客暴击率 +20%，暴击分数 ×1.5"],
  ["神兆", "10回合内神话/山海英雄输出 +18%，并让山海残卷更容易成核心"],
  ["匠火", "10回合内装备重铸费用 -1，4级装备出现权重 +15%"],
];

const raceColors = {
  "秦汉": "#7f3d35",
  "三国": "#315f82",
  "大唐": "#9b7834",
  "大宋": "#4d7a67",
  "神话": "#6d5794",
  "山海": "#356b5d",
  "春秋": "#6f5140",
  "西楚": "#8d3f4d",
  "魏晋": "#6d7188",
  "大隋": "#a46337",
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

const costRarities = {
  1: { className: "cost-1", label: "1费", color: "#e8ece5" },
  2: { className: "cost-2", label: "2费", color: "#64c87a" },
  3: { className: "cost-3", label: "3费", color: "#5ba7ff" },
  4: { className: "cost-4", label: "4费", color: "#b47cff" },
  5: { className: "cost-5", label: "5费", color: "#ffad3b" },
};

const SYNERGY_DEFINITIONS = {
  "秦汉": synergy("种族", [
    tier(3, 0.35, "秦汉破阵：秦汉棋子叠加易伤，每层后续输出 ×1.03，最多6层"),
    tier(6, 0.65, "秦汉军势共享：破阵易伤上限提高到12层，服务全队后续输出"),
  ]),
  "三国": synergy("种族", [
    tier(3, 0.3, "三国协同，技能连携输出 ×1.30"),
    tier(6, 0.7, "三国连携链成型，技能连携输出 ×1.70"),
    tier(9, 1.1, "三国计策爆发，连携结算 ×2.10"),
  ]),
  "大唐": synergy("种族", [
    tier(2, 0.25, "大唐暴击伤害 ×1.25"),
    tier(4, 0.75, "大唐、刺客、射手暴击伤害 ×1.75"),
    tier(6, 1.25, "6大唐成型：全队暴击后追击，大唐追击可再次暴击 ×2.25"),
  ]),
  "大宋": synergy("种族", [
    tier(2, 0.18, "大宋稳血，环境伤害降低并让稳定输出 ×1.18"),
    tier(4, 0.45, "大宋守势成型，未崩盘时最终分 ×1.45"),
  ]),
  "神话": synergy("种族", [
    tier(2, 0.3, "神话第一轮技能 ×1.30"),
    tier(4, 0.75, "神话爆发技成型，技能分 ×1.75"),
    tier(6, 1.3, "神话连爆，第二轮技能结算 ×2.30"),
  ]),
  "山海": synergy("种族", [
    tier(2, 0.28, "山海成长，山海输出 ×1.28"),
    tier(4, 0.75, "山海成长共享，全队神话/山海输出 ×1.75"),
  ]),
  "春秋": synergy("种族", [
    tier(2, 0.65, "1费、2费春秋英雄基础分 ×1.65"),
    tier(3, 1.35, "春秋三星阵容成型，低费三星最终分 ×2.35"),
  ]),
  "西楚": synergy("种族", [
    tier(2, 0.65, "西楚破釜，低血时最终分 ×1.65"),
  ]),
  "魏晋": synergy("种族", [
    tier(1, 0.25, "魏晋单挂：每个已激活羁绊强化最终分，基础 ×1.25"),
  ]),
  "大隋": synergy("种族", [
    tier(2, 0.5, "大隋骑兵冲锋分 ×1.50"),
  ]),
  "明清": synergy("种族", [
    tier(2, 0.55, "明清火器：射手连击次数 +1，类似矮人后期射手辅助"),
  ]),
  "仙门": synergy("种族", [
    tier(1, 0.35, "仙门单挂，开局法力与连续施法循环 ×1.35"),
  ]),
  "妖族": synergy("种族", [
    tier(1, 0.75, "单妖族核心最终分 ×1.75"),
    tier(2, 0.45, "妖族易伤，后续全队输出 ×1.45"),
  ]),
  "武将": synergy("职业", [
    tier(3, 0.35, "武将普攻 ×1.35"),
    tier(6, 0.75, "武将物理技能 ×1.75"),
    tier(9, 1.25, "武将战意爆发，物理结算 ×2.25"),
  ]),
  "文臣": synergy("职业", [
    tier(2, 0.28, "文臣计策复制 ×1.28"),
    tier(4, 0.7, "文臣复制分数吃羁绊倍率 ×1.70"),
    tier(6, 1.1, "文臣战术放大，最终计策结算 ×2.10"),
  ]),
  "帝王": synergy("职业", [
    tier(2, 0.35, "帝王号令，全队最终分 ×1.35"),
    tier(4, 0.85, "帝王九五成型，多羁绊最终分 ×1.85"),
  ]),
  "刺客": synergy("职业", [
    tier(3, 0.55, "刺客暴击伤害 ×1.55"),
    tier(6, 0.95, "刺客追加暴击成型，刺客结算 ×1.95"),
  ]),
  "异士": synergy("职业", [
    tier(2, 0.08, "所有非异士羁绊需求 -1"),
    tier(3, 0.35, "异士偷档，已触发羁绊额外 ×1.35"),
  ]),
  "骑兵": synergy("职业", [
    tier(2, 0.35, "骑兵开局冲锋：骑兵先造成一次冲锋分"),
    tier(4, 0.8, "骑兵冲锋再结算：冲锋分可被后续物理、易伤和最终乘区放大"),
  ]),
  "步兵": synergy("职业", [
    tier(2, 0.2, "步兵基础阵线：上阵棋子获得固定基础分，三星更多"),
    tier(4, 0.55, "步兵三星阵线：每个三星棋子追加阵线加分，进入后续结算链"),
  ]),
  "射手": synergy("职业", [
    tier(3, 0.45, "射手连射，普攻输出 ×1.45"),
    tier(5, 1, "射手连射成型，连射结算 ×2.00"),
  ]),
  "方士": synergy("职业", [
    tier(3, 0.5, "方士技能 ×1.50"),
    tier(5, 1.2, "方士法印成型，技能结算 ×2.20"),
  ]),
  "工匠": synergy("职业", [
    tier(2, 1.5, "工匠装备流成型，装备倍率 ×2.50"),
  ]),
};

const HERO_BURST_MS = 1000;
const SCORE_CHECK_MS = 3000;

let state = createState();
let battleRevealTimer = null;
let codexHeroView = "cost";
let codexTraitFilter = null;

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
    gold: getStageStartGold(1),
    level: 1,
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
    resultRevealed: false,
    feedbackEvents: [],
  };
}

export function getSellValue(owned) {
  const config = getHeroConfig(owned.id);
  const copies = owned.star === 1 ? 1 : owned.star === 2 ? 3 : 9;
  return Math.max(1, Math.floor(((config?.cost ?? 1) * copies) / 2));
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

export function getSynergyCatalog() {
  return Object.entries(SYNERGY_DEFINITIONS).map(([name, definition]) => ({
    name,
    kind: definition.kind,
    tiers: definition.tiers.map((tierConfig) => ({ ...tierConfig })),
  }));
}

export function getInterestGold(gold) {
  return Math.min(4, Math.floor(gold / 10));
}

export function resolveRoundIncome(input) {
  const baseGold = 0;
  const canPayStreak = isNormalStageNumber(input.stage);
  const nextStreak = canPayStreak ? getNextStreak(input.previousStreak, input.won) : input.previousStreak;
  const streakGold = canPayStreak ? getStreakGold(nextStreak) : 0;
  const winGold = input.won && isNormalStageNumber(input.stage) ? 1 : 0;
  const creepGold = input.creepGold ?? 0;
  const relicGold = input.relicGold ?? 0;
  const interest = getInterestGold(input.goldBeforeIncome + winGold + creepGold + streakGold);
  return {
    baseGold,
    creepGold,
    winGold,
    streakGold,
    interest,
    relicGold,
    total: baseGold + winGold + creepGold + streakGold + interest + relicGold,
    nextStreak,
  };
}

export function getStageStartGold(stage) {
  if (stage === 1 || stage === 2) return 1;
  if (stage === 3) return 2;
  if (stage === 4) return 4;
  return 5;
}

function isNormalStageNumber(stage) {
  return ![1, 2, 3].includes(stage) && stage % 5 !== 0;
}

function getNextStreak(previous, won) {
  const type = won ? "win" : "loss";
  return previous.type === type
    ? { type, count: previous.count + 1 }
    : { type, count: 1 };
}

function getStreakGold(streak) {
  if (streak.count >= 6) return 3;
  if (streak.count >= 5) return 3;
  if (streak.count >= 4) return 2;
  if (streak.count >= 3) return 1;
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

export function groupHeroesForCompendium(heroes, view = "cost") {
  if (view === "job" || view === "race") {
    const key = view;
    const order = view === "job" ? Object.keys(jobColors) : Object.keys(raceColors);
    return order
      .map((name) => ({
        key: name,
        title: name,
        heroes: heroes.filter((config) => config[key] === name),
      }))
      .filter((group) => group.heroes.length > 0);
  }
  return groupHeroesByCost(heroes).map((group) => ({
    key: String(group.cost),
    title: `${group.cost}费`,
    heroes: group.heroes,
  }));
}

export function heroMatchesTraitFilter(config, filter) {
  if (!filter) return true;
  if (filter.kind === "race") return config.race === filter.name;
  if (filter.kind === "job") return config.job === filter.name;
  return true;
}

export function getTraitTone(name, kind) {
  if (kind === "race") return raceColors[name] ?? "#6f766f";
  if (kind === "job") return jobColors[name] ?? "#6f766f";
  return damageColors[name] ?? "#6f766f";
}

export function getCostRarity(cost) {
  return costRarities[cost] ?? costRarities[1];
}

export function shouldRollWildcard(roll) {
  return roll < 0.01;
}

export function getRollableShopHeroes(cost, board = [], bench = []) {
  const completedThreeStarIds = new Set(
    [...board, ...bench].filter((owned) => owned.star === 3).map((owned) => owned.id),
  );
  return HEROES.filter((candidate) => candidate.cost === cost && !completedThreeStarIds.has(candidate.id));
}

export function buildScoreBursts(board, synergyMultiplier = 1, flatBonus = 0) {
  const totalStartMs = board.length * HERO_BURST_MS;
  const baseValues = board.map((owned, index) => {
    const config = getHeroConfig(owned.id);
    const attackScore = config.attack * 30 * owned.star;
    const skillScore = config.skill * 3 * owned.star;
    return {
      slotIndex: index,
      heroId: owned.id,
      heroName: config.name,
      damageType: config.type,
      actionLabel: skillScore >= attackScore * 0.25 ? "发动技能" : "普攻",
      amount: attackScore + skillScore + config.hp * 0.25 * owned.star,
    };
  });
  const expectedTotal = Math.round((baseValues.reduce((sum, item) => sum + item.amount, 0) + flatBonus) * synergyMultiplier);
  const totalStepMs = baseValues.length ? Math.round(SCORE_CHECK_MS / baseValues.length) : SCORE_CHECK_MS;
  let runningTotal = 0;
  return baseValues.map((item, index) => {
    const amount = index === baseValues.length - 1
      ? expectedTotal - runningTotal
      : Math.max(1, Math.round(item.amount * synergyMultiplier));
    runningTotal += amount;
    return {
      slotIndex: item.slotIndex,
      heroId: item.heroId,
      heroName: item.heroName,
      damageType: item.damageType,
      actionLabel: item.actionLabel,
      amount,
      runningTotal,
      delayMs: index * HERO_BURST_MS,
      durationMs: HERO_BURST_MS,
      totalDelayMs: totalStartMs + index * totalStepMs,
      totalDurationMs: totalStepMs,
    };
  });
}

export function getBattleRevealDelayMs(heroCount) {
  return heroCount * HERO_BURST_MS + SCORE_CHECK_MS;
}

function getEquipmentScoreMultiplier(equipmentCount) {
  return 1 + equipmentCount * 0.08;
}

function formatMultiplier(value) {
  return value.toFixed(2).replace(/\.?0+$/, "");
}

export function buildScoreComboSteps({ bursts, chainSteps = [], activeSynergies = [], equipmentCount = 0, score, target }) {
  let runningTotal = bursts.at(-1)?.runningTotal ?? 0;
  const heroSteps = bursts.map((burst) => ({
    kind: "hero",
    operator: "+",
    title: burst.heroName,
    detail: burst.actionLabel ?? "基础输出",
    amountText: `+${burst.amount}`,
    runningTotal: burst.runningTotal,
    delayMs: burst.delayMs,
    durationMs: burst.durationMs,
  }));
  const triggerStart = bursts.length * HERO_BURST_MS;
  const calculatedSteps = chainSteps.map((step, index) => {
    runningTotal = step.runningTotal;
    const operator = step.operator ?? (step.amount != null ? "+" : "×");
    return {
      kind: step.kind ?? "multiplier",
      operator,
      title: step.title,
      detail: step.detail,
      amountText: operator === "+"
        ? `+${step.amount}`
        : `×${formatMultiplier(step.multiplier)}`,
      runningTotal,
      delayMs: triggerStart + index * 420,
      durationMs: 820,
    };
  });
  const triggerSteps = chainSteps.length ? calculatedSteps : activeSynergies.map((row, index) => {
    const multiplier = 1 + row.bonus;
    runningTotal = Math.round(runningTotal * multiplier);
    return {
      kind: "synergy",
      operator: "×",
      title: `${row.name} ${row.threshold}`,
      detail: "羁绊触发",
      amountText: `×${formatMultiplier(multiplier)}`,
      runningTotal,
      delayMs: triggerStart + index * 420,
      durationMs: 820,
    };
  });
  const equipmentStep = chainSteps.length ? [] : equipmentCount > 0
    ? (() => {
        const multiplier = getEquipmentScoreMultiplier(equipmentCount);
        runningTotal = Math.round(runningTotal * multiplier);
        return [{
        kind: "equipment",
        operator: "×",
        title: "装备加成",
        detail: `${equipmentCount} 件装备参与结算`,
        amountText: `×${formatMultiplier(multiplier)}`,
        runningTotal,
        delayMs: triggerStart + triggerSteps.length * 420,
        durationMs: 820,
      }];
      })()
    : [];
  return [
    ...heroSteps,
    ...triggerSteps,
    ...equipmentStep,
    {
      kind: "final",
      operator: "=",
      title: score >= target ? "破阵成功" : "输出不足",
      detail: score >= target ? `超过目标 ${score - target}` : `还差 ${target - score}`,
      amountText: `${score}/${target}`,
      runningTotal: score,
      delayMs: getBattleRevealDelayMs(bursts.length) - 900,
      durationMs: 900,
    },
  ];
}

export function getXpNeededForLevel(level) {
  return {
    1: 1,
    2: 1,
    3: 4,
    4: 8,
    5: 16,
    6: 32,
    7: 48,
    8: 56,
    9: 64,
  }[level] ?? 999;
}

export function getOwnedHeroCount(heroId, board, bench) {
  return [...board, ...bench]
    .filter((owned) => owned.id === heroId)
    .reduce((total, owned) => total + (owned.star === 1 ? 1 : owned.star === 2 ? 3 : 9), 0);
}

export function getSynergyBadges(rows) {
  const byName = new Map();
  for (const row of rows) {
    const badge = byName.get(row.name) ?? {
      name: row.name,
      count: row.count,
      active: false,
      activeThreshold: 0,
      nextThreshold: null,
    };
    if (row.active && row.threshold >= badge.activeThreshold) {
      badge.active = true;
      badge.activeThreshold = row.threshold;
    }
    if (!row.active && (badge.nextThreshold === null || row.threshold < badge.nextThreshold)) {
      badge.nextThreshold = row.threshold;
    }
    byName.set(row.name, badge);
  }
  return [...byName.values()].map((badge) => ({
    ...badge,
    label: badge.nextThreshold ? `${badge.count}/${badge.nextThreshold}` : `${badge.count}/${badge.activeThreshold}`,
  })).sort((a, b) => Number(b.active) - Number(a.active) || a.name.localeCompare(b.name));
}

function getBuyXpCost() {
  return 4;
}

function getBuyXpAmount() {
  return 4;
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

export function buildRosterFeedbackEvents(before, after) {
  const events = [];
  const beforeStars = getMaxStarsByHero(before);
  const afterStars = getMaxStarsByHero(after);
  for (const [id, star] of afterStars.entries()) {
    if (star <= (beforeStars.get(id) ?? 0) || star <= 1) continue;
    const config = getHeroConfig(id);
    events.push({
      kind: "star",
      id,
      title: `${config.name} 升至 ${"★".repeat(star)}`,
      text: star >= 3 ? "名将觉醒，核心成型" : "升星成功，输出提高",
    });
  }

  const beforeSynergies = getActiveSynergyKeys(before.board);
  const afterSynergies = getActiveSynergyKeys(after.board);
  for (const key of afterSynergies) {
    if (beforeSynergies.has(key)) continue;
    const [name, thresholdText] = key.split(":");
    const threshold = Number(thresholdText);
    const definition = SYNERGY_DEFINITIONS[name];
    const tierConfig = definition?.tiers.find((tier) => tier.count === threshold);
    events.push({
      kind: "synergy",
      id: name,
      title: `${name} ${threshold} 已激活`,
      text: tierConfig?.text ?? "羁绊效果已生效",
    });
  }
  return events;
}

function getMaxStarsByHero(roster) {
  const stars = new Map();
  for (const owned of [...roster.board, ...roster.bench]) {
    stars.set(owned.id, Math.max(stars.get(owned.id) ?? 0, owned.star));
  }
  return stars;
}

function getActiveSynergyKeys(board) {
  const counts = getCounts(board.map((owned) => getHeroConfig(owned.id)));
  const keys = new Set();
  for (const [name, count] of Object.entries(counts)) {
    const definition = SYNERGY_DEFINITIONS[name];
    if (!definition) continue;
    for (const tierConfig of definition.tiers) {
      const threshold = getReducedThreshold(name, tierConfig.count, counts);
      if (count >= threshold) keys.add(`${name}:${tierConfig.count}`);
    }
  }
  return keys;
}

export function mergeRosterCopies(roster) {
  let board = roster.board.map((owned) => ({ ...owned }));
  let bench = roster.bench.map((owned) => ({ ...owned }));
  let changed = true;

  while (changed) {
    changed = false;
    const wildcardTwoStar = findWildcardTwoStarMerge(board, bench);
    if (wildcardTwoStar) {
      ({ board, bench } = wildcardTwoStar);
      changed = true;
      continue;
    }

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

function findWildcardTwoStarMerge(board, bench) {
  const all = [...board, ...bench];
  const targetId = all.find((owned) => {
    if (owned.id === WILDCARD_ID || owned.star !== 1) return false;
    const matchingOnes = all.filter((candidate) => candidate.id === owned.id && candidate.star === 1).length;
    const wildcardOnes = all.filter((candidate) => candidate.id === WILDCARD_ID && candidate.star === 1).length;
    return matchingOnes === 2 && wildcardOnes >= 1;
  })?.id;

  if (!targetId) return null;

  let removedTargets = 0;
  let removedWildcard = false;
  let keepOnBoard = false;
  const nextBoard = board.filter((owned) => {
    if (owned.id === targetId && owned.star === 1 && removedTargets < 2) {
      removedTargets += 1;
      keepOnBoard = true;
      return false;
    }
    if (owned.id === WILDCARD_ID && owned.star === 1 && !removedWildcard) {
      removedWildcard = true;
      return false;
    }
    return true;
  });
  const nextBench = bench.filter((owned) => {
    if (owned.id === targetId && owned.star === 1 && removedTargets < 2) {
      removedTargets += 1;
      return false;
    }
    if (owned.id === WILDCARD_ID && owned.star === 1 && !removedWildcard) {
      removedWildcard = true;
      return false;
    }
    return true;
  });

  const merged = { id: targetId, star: 2 };
  if (keepOnBoard) nextBoard.push(merged);
  else nextBench.push(merged);
  return { board: nextBoard, bench: nextBench };
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

export function applyShopBuyState(stateLike, index) {
  const shopHero = stateLike.shop[index];
  if (stateLike.gameOver || !shopHero || stateLike.gold < shopHero.cost) {
    return { bought: false, state: stateLike };
  }

  const before = { board: stateLike.board, bench: stateLike.bench };
  const moved = moveShopHeroToBench(before, { id: shopHero.id, star: 1 });
  if (moved === before) return { bought: false, state: stateLike };

  return {
    bought: true,
    state: {
      ...stateLike,
      gold: stateLike.gold - shopHero.cost,
      board: moved.board,
      bench: moved.bench,
      shop: stateLike.shop.filter((_, shopIndex) => shopIndex !== index),
    },
  };
}

function rollShop() {
  state.shop = Array.from({ length: 5 }, () => {
    const cost = rollShopCost(state.level, Math.random());
    const pool = getRollableShopHeroes(cost, state.board, state.bench);
    return pool[Math.floor(Math.random() * pool.length)];
  }).filter(Boolean);
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
  renderFeedback();
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
  document.querySelector("#shopGold").textContent = `${state.gold}金`;
  document.querySelector("#phaseText").textContent = state.lastResult && !state.resultRevealed ? "总分核算" : state.gameOver ? "游戏结束" : state.lastResult ? "结算阶段" : "布阵阶段";
  document.querySelector("#refreshBtn").disabled = state.gameOver || Boolean(state.lastResult);
  document.querySelector("#xpBtn").disabled = state.gameOver || Boolean(state.lastResult);
  document.querySelector("#nextBtn").disabled = state.gameOver || !state.lastResult || !state.resultRevealed;
  document.querySelector("#battleBtn").disabled = state.gameOver || state.board.length === 0 || Boolean(state.lastResult);
}

function renderFeedback() {
  const host = document.querySelector("#feedback");
  if (!host) return;
  host.innerHTML = state.feedbackEvents.map((event, index) => `
    <div class="feedback-card ${event.kind}" style="animation-delay:${index * 120}ms">
      <strong>${event.title}</strong>
      <span>${event.text}</span>
    </div>
  `).join("");
}

function renderShop() {
  document.querySelector("#shop").innerHTML = state.shop.map((shopHero, index) => {
    const ownedCount = getOwnedHeroCount(shopHero.id, state.board, state.bench);
    const chaseClass = ownedCount >= 2 ? "chase-ready" : ownedCount > 0 ? "chase-owned" : "";
    const rarity = getCostRarity(shopHero.cost);
    return `
      <article class="hero-card star-1 ${rarity.className} ${shopHero.special ? "wildcard-card" : ""} ${chaseClass}" style="--race:${raceColors[shopHero.race]}; --cost:${rarity.color}">
        <div class="portrait">${shopHero.name.slice(0, 1)}</div>
        <div>
          <div class="hero-name">${shopHero.name}<span class="cost-badge">${rarity.label}</span></div>
          ${ownedCount > 0 ? `<div class="chase-mark">${ownedCount >= 2 ? "可追" : "已有"} ${ownedCount}</div>` : ""}
          ${heroSynergyChips(shopHero)}
        </div>
        <button type="button" data-buy="${index}" class="buy-button ${rarity.className}"><span class="cost">${shopHero.cost}金</span></button>
      </article>
    `;
  }).join("");
}

function renderBoard() {
  const slots = Array.from({ length: state.level }, (_, index) => state.board[index]);
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
  const rarity = getCostRarity(config.cost);
  return `
    <article class="hero-card compact star-${owned.star} ${rarity.className} ${config.special ? "wildcard-card" : ""}" style="--race:${raceColors[config.race]}; --cost:${rarity.color}">
      <div class="portrait">${config.name.slice(0, 1)}</div>
      <div class="hero-name">${config.name} ${owned.star}星<span class="cost-badge">${rarity.label}</span></div>
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
  const badges = getSynergyBadges(getSynergyRows());
  document.querySelector("#synergies").innerHTML = badges.length
    ? badges.map(synergyBadge).join("")
    : `<div class="synergy-empty">上阵后显示羁绊</div>`;
}

function synergyBadge(row) {
  const definition = SYNERGY_DEFINITIONS[row.name];
  const kind = definition?.kind === "绉嶆棌" ? "race" : "job";
  return `
    <div class="synergy-badge ${row.active ? "active" : ""}" style="--trait:${getTraitTone(row.name, kind)}" title="${row.name}">
      <strong>${row.name.slice(0, 2)}</strong>
      <span>${row.label}</span>
    </div>
  `;
}

export function createRewardChoices(reward) {
  const seed = reward.seed ?? 0;
  if (reward.type === "equipment") {
    const level = reward.level ?? 1;
    const pool = EQUIPMENT.filter((item) => (item[2] ?? 1) === level);
    const source = pool.length ? pool : EQUIPMENT;
    return [0, 1, 2].map((offset) => source[(seed + offset) % source.length]);
  }
  if (reward.type === "relic") {
    return [0, 1, 2].map((offset) => RELICS[(seed + offset) % RELICS.length]);
  }
  return [];
}

export function getStageRewards(stage, won) {
  if (!won) return [];
  const rewards = [];
  if (stage === 1 || stage === 2) {
    rewards.push({ type: "equipment", level: 1, title: "1级装备宝箱", text: "装备三选一" });
  }
  if (stage === 3) {
    rewards.push({ type: "equipment", level: 2, title: "2级装备宝箱", text: "装备三选一" });
  }
  if (stage > 0 && stage % 10 === 0) {
    rewards.push({ type: "relic", title: "圣物宝箱", text: "圣物三选一，替换旧圣物" });
  }
  if (stage >= 15 && stage % 10 === 5) {
    const level = equipmentRewardLevel(stage);
    rewards.push({ type: "equipment", level, title: `${level}级装备宝箱`, text: "装备三选一" });
  }
  return rewards;
}

function renderRewards() {
  document.querySelector("#rewards").innerHTML = state.rewards.length
    ? state.rewards.map((reward, index) => `
      <div class="reward">
        <strong>${reward.title}</strong>
        <div>${reward.text}</div>
        <div class="reward-choice-list">
          ${createRewardChoices({ ...reward, seed: state.stage + index }).map((choice, choiceIndex) => `
            <button type="button" data-claim="${index}" data-choice="${choiceIndex}">
              <strong>${choice[0]}</strong>
              <span>${choice[1]}</span>
            </button>
          `).join("")}
        </div>
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
  document.querySelector("#codexSynergies").innerHTML = ["种族", "职业"].map((kind) => `
    <section class="codex-group">
      <h4>${kind}羁绊</h4>
      <div class="codex-strip synergy-codex-strip">
        ${getSynergyCatalog().filter((item) => item.kind === kind).map(synergyCodexCard).join("")}
      </div>
    </section>
  `).join("");
  document.querySelector("#codexHeroControls").innerHTML = heroCodexControls();
  document.querySelector("#codexHeroes").innerHTML = groupHeroesForCompendium([...HEROES, WILDCARD], codexHeroView).map((group) => `
    <section class="codex-group">
      <h4>${group.title}<span>${group.heroes.length}张</span></h4>
      <div class="codex-strip hero-codex-strip${codexTraitFilter ? " filtered" : ""}">
        ${group.heroes.map((config) => heroCodexCard(config, codexTraitFilter)).join("")}
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

function heroCodexControls() {
  const viewLabel = { cost: "按费用", job: "按职业", race: "按种族" };
  return `
    <div class="codex-toolbar">
      <div class="segmented">
        ${["cost", "job", "race"].map((view) => `
          <button type="button" class="${codexHeroView === view ? "active" : ""}" data-codex-view="${view}">${viewLabel[view]}</button>
        `).join("")}
      </div>
      <div class="codex-filter-readout">
        ${codexTraitFilter ? `<span style="--trait:${getTraitTone(codexTraitFilter.name, codexTraitFilter.kind)}">${codexTraitFilter.name}</span><button type="button" data-codex-clear-filter="1">清除高亮</button>` : "点击棋子标签高亮同羁绊"}
      </div>
    </div>
  `;
}

function heroCodexCard(config, filter = null) {
  const rarity = getCostRarity(config.cost);
  const dimClass = heroMatchesTraitFilter(config, filter) ? "" : " codex-dim";
  return `
    <article class="codex-card ${rarity.className}${dimClass}" data-race="${config.race}" data-job="${config.job}" style="--race:${raceColors[config.race]}; --cost:${rarity.color}">
      <div class="portrait">${config.name.slice(0, 1)}</div>
      <div>
        <strong>${config.name}<span class="cost-badge">${rarity.label}</span></strong>
        ${codexTraitTags(config, filter)}
        <p>生命 ${config.hp} · 普攻 ${config.attack} · 技能 ${config.skill}</p>
        <p>${getHeroSynergySummary(config)}</p>
      </div>
    </article>
  `;
}

function synergyCodexCard(item) {
  return `
    <article class="codex-line synergy-codex-card" style="--trait:${getTraitTone(item.name, item.kind === "种族" ? "race" : "job")}">
      <strong>${item.name} · ${item.kind}</strong>
      ${item.tiers.map((tierConfig) => `<span>${tierConfig.count}人：${tierConfig.text}</span>`).join("")}
    </article>
  `;
}

function getHeroSynergySummary(config) {
  if (config.special) return "特殊棋子：不能上阵，只参与合成。";
  return [config.race, config.job].map((name) => {
    const definition = SYNERGY_DEFINITIONS[name];
    if (!definition) return "";
    return `${name}：${definition.tiers.map((tierConfig) => `${tierConfig.count}人`).join(" / ")}：${definition.tiers[0].text}`;
  }).filter(Boolean).join("；");
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
  const isResolving = Boolean(state.lastResult) && !state.resultRevealed;
  const centerLabel = state.lastResult ? isResolving ? "总分核算" : "战斗结果" : "目标分";
  const centerValue = state.lastResult ? isResolving ? "核算中" : getBattleOutcomeTitle(state.lastResult.won) : targetScore();
  const bursts = state.lastResult?.bursts ?? [];
  const comboSteps = state.lastResult?.comboSteps ?? bursts.map((burst) => ({
    title: burst.heroName,
    amountText: `+${burst.runningTotal}`,
    delayMs: burst.totalDelayMs,
    durationMs: burst.totalDurationMs,
  }));
  document.querySelector("#battleField").innerHTML = `
    <div class="battle-side heroes">
      ${state.board.length ? state.board.map((owned, index) => battleHeroCard(owned, index)).join("") : `<div class="battle-card">未上阵</div>`}
    </div>
    <div class="battle-center">
      <div class="score-target ${state.lastResult && state.resultRevealed ? state.lastResult.won ? "score-win" : "score-loss" : ""}">${centerLabel}<strong>${centerValue}</strong><span>目标 ${targetScore()}</span></div>
      ${bursts.length ? `
        <div class="score-rush" aria-label="score burst total">
          ${comboSteps.map((step) => `<span class="${step.kind ?? "hero"}" style="--delay:${step.delayMs}ms; --duration:${step.durationMs}ms"><small>${step.title}</small>${step.amountText}</span>`).join("")}
        </div>
        <div class="score-chain" aria-label="score settlement chain">
          <div class="score-chain-title">结算链</div>
          ${comboSteps.map(scoreChainRow).join("")}
        </div>
      ` : ""}
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

  const report = state.lastResult && !state.resultRevealed
    ? `
      <div class="result-banner resolving">
        <span>本关结果</span>
        <strong>总分核算中</strong>
        <small>棋子输出结束后，正在判定是否通关</small>
      </div>
    `
    : state.gameOver
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
          <div>胜利 +${state.lastResult.income.winGold}</div>
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

function scoreChainRow(step) {
  const delay = Math.max(0, step.delayMs ?? 0);
  const duration = step.durationMs ?? 780;
  return `
    <div class="score-chain-row ${step.kind ?? "hero"}" style="--delay:${delay}ms; --duration:${duration}ms">
      <span class="score-chain-label">${step.title}</span>
      <strong>${step.operator ?? "+"}${step.amountText.replace(/^[+×=]/, "")}</strong>
      <small>${step.detail ?? ""}</small>
      <em>${step.runningTotal ?? ""}</em>
    </div>
  `;
}

function codexTraitTags(config, filter = null) {
  const traitButton = (kind, name, className) => {
    const active = filter?.kind === kind && filter.name === name ? " active" : "";
    return `<button type="button" class="${className}${active}" data-codex-trait-kind="${kind}" data-codex-trait-name="${name}" style="--trait:${getTraitTone(name, kind)}">${name}</button>`;
  };
  return `
    <div class="codex-tags">
      ${traitButton("race", config.race, "race-chip")}
      ${traitButton("job", config.job, "job-chip")}
      <span class="damage-chip" style="--trait:${getTraitTone(config.type, "damage")}">${config.type}</span>
    </div>
  `;
}

function battleHeroCard(owned, index) {
  const config = getHeroConfig(owned.id);
  const burst = state.lastResult?.bursts?.find((item) => item.slotIndex === index);
  return `
    <div class="battle-card fighter star-${owned.star}" style="--race:${raceColors[config.race]}; animation-delay:${index * 90}ms">
      <div class="portrait">${config.name.slice(0, 1)}</div>
      <div class="hero-name">${config.name} ${owned.star}星</div>
      ${heroSynergyChips(config)}
      <p>普攻 ${config.attack * owned.star}</p>
      <p>技能 ${config.skill * owned.star}</p>
      ${burst ? `<div class="damage-pop" style="--damage:${getTraitTone(burst.damageType, "damage")}; --delay:${burst.delayMs}ms; --duration:${burst.durationMs}ms"><small>${burst.actionLabel}</small><strong>+${burst.amount}</strong></div>` : ""}
    </div>
  `;
}

function buy(index) {
  const before = rosterSnapshot();
  const result = applyShopBuyState(state, index);
  if (!result.bought) return;
  state.gold = result.state.gold;
  state.board = result.state.board;
  state.bench = result.state.bench;
  state.shop = result.state.shop;
  showRosterFeedback(before);
  render();
}

function refreshShop() {
  if (isPrepLocked()) return;
  const cost = hasRelic("招募榜") && !state.firstRefreshUsed ? 1 : 2;
  if (state.gold < cost) return;
  state.gold -= cost;
  state.firstRefreshUsed = true;
  rollShop();
  render();
}

function buyXp() {
  if (isPrepLocked() || state.gold < getBuyXpCost()) return;
  state.gold -= getBuyXpCost();
  gainXp(getBuyXpAmount());
  render();
}

function field(index) {
  if (isPrepLocked() || state.board.length >= state.level) return;
  const before = rosterSnapshot();
  const [owned] = state.bench.splice(index, 1);
  if (owned?.id === WILDCARD_ID) {
    state.bench.splice(index, 0, owned);
    return;
  }
  if (owned) state.board.push(owned);
  mergeRoster();
  showRosterFeedback(before);
  render();
}

function unfield(index) {
  if (isPrepLocked()) return;
  const before = rosterSnapshot();
  const moved = moveBoardHeroToBench(before, index);
  state.board = moved.board;
  state.bench = moved.bench;
  showRosterFeedback(before);
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
  clearBattleRevealTimer();
  state.gold += result.goldGain;
  state.streak = result.income.nextStreak;
  const hpState = settleHp(state.hp, result.hpLost);
  state.hp = hpState.hp;
  state.gameOver = hpState.gameOver;
  gainXp(result.xpGain);
  if (!state.gameOver) addStageRewards(result.won);
  state.lastResult = result;
  state.resultRevealed = false;
  render();
  battleRevealTimer = setTimeout(() => {
    if (state.lastResult !== result) return;
    state.resultRevealed = true;
    battleRevealTimer = null;
    render();
  }, getBattleRevealDelayMs(result.bursts.length));
}

function resolveBattleResult() {
  const scoring = calculateBoardScore({
    board: state.board,
    playerHp: state.hp,
    equipmentCount: state.equipment.length,
  });
  const score = scoring.score;
  const target = targetScore();
  const won = score >= target;
  const hpLost = won ? 0 : Math.max(1, Math.ceil(((target - score) / target) * 10) - (hasRelic("续命符") ? 2 : 0));
  const creepGold = stageCreepGold();
  const relicGold = hasRelic("聚宝盆") ? 1 : 0;
  const income = resolveRoundIncome({
    stage: state.stage,
    won,
    goldBeforeIncome: state.gold,
    previousStreak: state.streak,
    creepGold,
    relicGold,
  });
  const xpGain = hasRelic("太学令") ? 2 : 1;
  const bursts = buildScoreBursts(state.board);
  const comboSteps = buildScoreComboSteps({
    bursts,
    chainSteps: scoring.steps,
    activeSynergies: getSynergyRows().filter((row) => row.active),
    equipmentCount: state.equipment.length,
    score,
    target,
  });
  return { won, score, target, goldGain: income.total, income, xpGain, hpLost, bursts, comboSteps };
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
  clearBattleRevealTimer();
  state.stage += 1;
  state.firstRefreshUsed = false;
  state.lastResult = null;
  state.resultRevealed = false;
  state.feedbackEvents = [];
  state.battleLog = [];
  state.gold += getStageStartGold(state.stage);
  rollShop();
  render();
}

function clearBattleRevealTimer() {
  if (battleRevealTimer === null) return;
  clearTimeout(battleRevealTimer);
  battleRevealTimer = null;
}

function claim(index, choiceIndex = 0) {
  if (state.gameOver) return;
  const [reward] = state.rewards.splice(index, 1);
  if (!reward) return;
  const choices = createRewardChoices({ ...reward, seed: state.stage + index });
  const chosen = choices[choiceIndex];
  if (!chosen) return;
  if (reward.type === "equipment") {
    state.equipment.push(chosen);
  }
  if (reward.type === "relic") {
    state.relics = [chosen];
  }
  render();
}

function equipmentRewardLevel(stage) {
  if (stage >= 35) return 4;
  if (stage >= 25) return 3;
  if (stage >= 15) return 2;
  return 1;
}

function addStageRewards(won) {
  state.rewards.push(...getStageRewards(state.stage, won));
}

function getBoardPower() {
  return calculateBoardScore({
    board: state.board,
    playerHp: state.hp,
    equipmentCount: state.equipment.length,
  }).score;
}

export function calculateBoardScore({ board, playerHp = 100, equipmentCount = 0 }) {
  const counts = getCounts(board.map((owned) => {
    const config = getHeroConfig(owned.id);
    return { id: owned.id, race: config.race, job: config.job };
  }));
  const active = (name, count) => (counts[name] ?? 0) >= getReducedThreshold(name, count, counts);
  const baseEvents = board.map((owned) => {
    const config = getHeroConfig(owned.id);
    return {
      owned,
      config,
      amount: (config.attack * 30 + config.skill * 3 + config.hp * 0.25) * owned.star,
    };
  });
  const base = board.reduce((sum, owned) => {
    const config = getHeroConfig(owned.id);
    return sum + (config.attack * 30 + config.skill * 3 + config.hp * 0.25) * owned.star;
  }, 0);
  let runningTotal = Math.max(1, Math.round(base));
  const steps = [];
  const add = (amount, title, detail, heroId = null, kind = "copy") => {
    runningTotal += Math.round(amount);
    steps.push({
      kind,
      operator: "+",
      title,
      detail,
      heroId,
      amount: Math.round(amount),
      runningTotal,
    });
  };
  const multiply = (multiplier, title, detail, heroId = null) => {
    runningTotal = Math.round(runningTotal * multiplier);
    steps.push({
      kind: "multiplier",
      operator: "×",
      title,
      detail,
      heroId,
      multiplier,
      runningTotal,
    });
  };
  const equipmentMultiplier = getEquipmentScoreMultiplier(equipmentCount);
  if (equipmentMultiplier > 1) {
    multiply(equipmentMultiplier, "装备结算", `${equipmentCount}件装备进入结算链`);
  }

  const hasAssassin6 = active("刺客", 6);
  const hasTang4 = active("大唐", 4);
  const hasTangHigh = active("大唐", 6);
  const hasXichu2 = active("西楚", 2);
  const wenchenCopyRatio = active("文臣", 6) ? 0.65 : active("文臣", 4) ? 0.45 : active("文臣", 2) ? 0.25 : 0;
  const hasQinhan3 = active("秦汉", 3);
  const hasQinhan6 = active("秦汉", 6);
  const hasInfantry2 = active("步兵", 2);
  const hasInfantry4 = active("步兵", 4);
  const hasCavalry2 = active("骑兵", 2);
  const hasCavalry4 = active("骑兵", 4);

  if (hasInfantry2) {
    const baseline = board.reduce((sum, owned) => sum + (owned.star >= 3 ? 420 : 140) * owned.star, 0);
    add(baseline, "步兵 基础阵线", "全队获得固定基础分，三星单位获得更多", null, "synergy");
  }

  if (hasInfantry4) {
    const starBonus = board
      .filter((owned) => owned.star >= 3)
      .reduce((sum, owned) => {
        const config = getHeroConfig(owned.id);
        return sum + (config.attack * 12 + config.skill) * owned.star;
      }, 0);
    if (starBonus > 0) {
      add(starBonus, "步兵 三星阵线", "每个三星棋子追加一次阵线加分", null, "synergy");
    }
  }

  if (hasCavalry2) {
    const cavalryEvents = baseEvents.filter((event) => event.config.job === "骑兵");
    const charge = cavalryEvents.reduce((sum, event) => {
      const chargeAmount = (event.config.attack * 24 + event.config.skill * 2) * event.owned.star;
      return sum + (event.config.race === "大隋" ? chargeAmount * 1.5 : chargeAmount);
    }, 0);
    if (charge > 0) {
      add(charge, "骑兵 开局冲锋", "骑兵先造成一次冲锋分，大隋骑兵获得更高冲锋", null, "synergy");
    }
    if (hasCavalry4 && charge > 0) {
      add(charge * 0.65, "骑兵 冲锋再结算", "4骑兵让冲锋分再次进入结算链", null, "synergy");
    }
  }

  if (wenchenCopyRatio > 0 && baseEvents.length) {
    const strongest = baseEvents.reduce((best, event) => event.amount > best.amount ? event : best, baseEvents[0]);
    add(
      strongest.amount * wenchenCopyRatio,
      "文臣 复制",
      `${strongest.config.name}的${strongest.config.type}输出事件被复制${Math.round(wenchenCopyRatio * 100)}%`,
      strongest.owned.id,
    );
  }

  if (hasQinhan3) {
    const maxLayers = hasQinhan6 ? 12 : 6;
    const layers = Math.min(maxLayers, board.reduce((sum, owned) => {
      const config = getHeroConfig(owned.id);
      return config.race === "秦汉" ? sum + owned.star : sum;
    }, 0));
    if (layers > 0) {
      multiply(1.03 ** layers, "秦汉 破阵易伤", `秦汉军阵叠加${layers}层易伤，后续输出放大`);
    }
  }

  for (const owned of board) {
    const config = getHeroConfig(owned.id);
    const isAssassin = config.job === "刺客";
    const isTang = config.race === "大唐";
    const isShooter = config.job === "射手";
    const canTangChase = hasTangHigh || (hasAssassin6 && hasTang4 && (isTang || isAssassin || isShooter));

    if (hasAssassin6) {
      multiply(1.12, "刺客 全队暴击", `${config.name} 获得6刺客全局暴击乘区`, owned.id);
    }
    if (hasAssassin6 && isAssassin) {
      multiply(1.25, "刺客 暴击", `${config.name} 刺客暴击强化`, owned.id);
    }
    if (hasAssassin6 && isAssassin && owned.star >= 3) {
      multiply(1.8, "刺客 三星暴击", `${config.name} 三星刺客追加暴击判定`, owned.id);
    }
    if (canTangChase) {
      multiply(hasTangHigh && isTang ? 1.3 : 1.18, "大唐 追击", `${config.name} 暴击后追击`, owned.id);
    }
    if (canTangChase && hasTangHigh && isTang && owned.star >= 3) {
      multiply(1.5, "大唐 三星追击", `${config.name} 三星大唐追击再结算`, owned.id);
    }
  }

  if (hasXichu2) {
    const missingHp = Math.max(0, 100 - playerHp);
    const multiplier = 1.08 ** Math.floor(missingHp / 10);
    if (multiplier > 1) {
      multiply(multiplier, "西楚 破釜", `玩家已损失${missingHp}血`);
      if (board.some((owned) => owned.star >= 3 && getHeroConfig(owned.id).race === "西楚")) {
        multiply(multiplier, "西楚 三星破釜", "三星西楚棋子让破釜倍率再结算一次");
      }
    }
  }

  return {
    score: runningTotal,
    steps,
    playerHp,
  };
}

function getSynergyBonus() {
  return getSynergyMultiplier(getSynergyRows());
}

export function getSynergyMultiplier(rows) {
  return rows.reduce((multiplier, row) => row.active ? multiplier * (1 + row.bonus) : multiplier, 1);
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

function rosterSnapshot() {
  return {
    board: state.board.map((owned) => ({ ...owned })),
    bench: state.bench.map((owned) => ({ ...owned })),
  };
}

function showRosterFeedback(before) {
  const events = buildRosterFeedbackEvents(before, rosterSnapshot());
  if (events.length === 0) return;
  state.feedbackEvents = events;
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
  return getXpNeededForLevel(state.level);
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
    if (target.dataset.codexView !== undefined) {
      codexHeroView = target.dataset.codexView;
      renderCompendium();
    }
    if (target.dataset.codexTraitKind !== undefined) {
      const nextFilter = {
        kind: target.dataset.codexTraitKind,
        name: target.dataset.codexTraitName,
      };
      codexTraitFilter = codexTraitFilter?.kind === nextFilter.kind && codexTraitFilter.name === nextFilter.name
        ? null
        : nextFilter;
      renderCompendium();
    }
    if (target.dataset.codexClearFilter !== undefined) {
      codexTraitFilter = null;
      renderCompendium();
    }
    if (target.dataset.claim !== undefined) {
      claim(Number(target.dataset.claim), Number(target.dataset.choice ?? 0));
    }
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
