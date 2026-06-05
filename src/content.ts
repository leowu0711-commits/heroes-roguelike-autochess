import type { DamageType } from "./rules.ts";

export type Race = "秦汉" | "三国" | "盛唐" | "大宋" | "神话" | "山海";
export type Job = "武将" | "文臣" | "帝王" | "刺客" | "异士";

export type HeroConfig = {
  id: string;
  name: string;
  cost: 1 | 2 | 3 | 4;
  race: Race;
  job: Job;
  maxHp: number;
  attackDamage: number;
  attackInterval: number;
  manaPerAttack: number;
  manaMax: number;
  skill: {
    name: string;
    damage: number;
    type: DamageType;
    note: string;
  };
  artKeywords: string[];
};

export type EquipmentConfig = {
  id: string;
  name: string;
  role: string;
  levels: [number, number, number, number];
};

export type RelicConfig = {
  id: string;
  name: string;
  effect: string;
};

export const HEROES: HeroConfig[] = [
  hero("jing-ke", "荆轲", 1, "秦汉", "刺客", 70, 18, 1, 10, "图穷匕见", 150, "physical", "暴击后额外回蓝", ["黑衣刺客", "匕首", "秦风"]),
  hero("zhang-liang", "张良", 1, "秦汉", "文臣", 80, 12, 1, 12, "运筹帷幄", 90, "magic", "提高全队短时回蓝", ["白袍谋士", "竹简", "星盘"]),
  hero("qin-qiong", "秦琼", 1, "盛唐", "武将", 120, 20, 1, 10, "门神破阵", 130, "physical", "穿戴装备时技能增伤", ["门神", "双锏", "唐甲"]),
  hero("yang-yuhuan", "杨玉环", 1, "盛唐", "异士", 75, 10, 1, 12, "霓裳羽衣", 70, "magic", "给最低法力友军回蓝", ["霓裳", "琵琶", "金粉"]),
  hero("bao-zheng", "包拯", 1, "大宋", "文臣", 95, 12, 1, 11, "明镜断案", 80, "magic", "本战失败扣血降低一次", ["乌纱帽", "明镜", "宋代官服"]),
  hero("xin-qiji", "辛弃疾", 1, "大宋", "武将", 115, 18, 1, 10, "破阵词", 120, "physical", "技能后短时提高攻速", ["青衫武将", "长枪", "词卷"]),
  hero("daji", "妲己", 1, "神话", "异士", 70, 10, 1, 12, "魅心", 80, "magic", "强化下一次友军技能", ["狐影", "魅惑", "殷商纹样"]),
  hero("jiuweihu", "九尾狐", 1, "山海", "异士", 70, 10, 1, 12, "九尾惑影", 80, "mythic", "触发种族羁绊后自身成长", ["九尾", "妖火", "山海纹"]),
  hero("jingwei", "精卫", 1, "山海", "文臣", 75, 10, 1, 12, "填海", 65, "mythic", "本局永久提高自身基础伤害", ["青羽", "海浪", "神鸟"]),
  hero("diaochan", "貂蝉", 1, "三国", "刺客", 75, 16, 1, 11, "闭月回旋", 120, "physical", "强化下一名释放技能的友军", ["红袖", "月影", "环刃"]),
  hero("li-bai", "李白", 2, "盛唐", "刺客", 90, 20, 1, 10, "醉剑成诗", 160, "physical", "暴击追加一次魔法诗酒伤害", ["青莲剑客", "酒壶", "飞墨"]),
  hero("li-shimin", "李世民", 2, "盛唐", "帝王", 130, 18, 1, 10, "贞观令", 130, "magic", "叠加盛唐与帝王伤害", ["唐皇", "金甲", "龙纹"]),
  hero("zhao-kuangyin", "赵匡胤", 2, "大宋", "帝王", 135, 18, 1, 10, "黄袍加身", 140, "magic", "人口未满时强化友军", ["黄袍", "宋旗", "拳势"]),
  hero("nezha", "哪吒", 2, "神话", "刺客", 95, 22, 1, 10, "风火突袭", 170, "mythic", "开战自带额外法力", ["风火轮", "火尖枪", "少年战神"]),
  hero("jiang-ziya", "姜子牙", 2, "神话", "文臣", 85, 12, 1, 12, "封神敕令", 100, "magic", "随机两名友军回蓝", ["白发仙师", "封神榜", "钓竿"]),
  hero("yinglong", "应龙", 2, "山海", "武将", 135, 20, 1, 10, "云雨龙息", 150, "mythic", "击杀野怪后额外回蓝", ["龙翼", "云雨", "金鳞"]),
  hero("han-xin", "韩信", 3, "秦汉", "武将", 150, 24, 1, 10, "背水连兵", 210, "physical", "多段攻击并给自身回蓝", ["背水军阵", "长戟", "汉甲"]),
  hero("cao-cao", "曹操", 3, "三国", "帝王", 150, 22, 1, 10, "魏武号令", 180, "magic", "全队短时攻速提升", ["魏王", "黑金甲", "战旗"]),
  hero("guan-yu", "关羽", 3, "三国", "武将", 170, 26, 1, 10, "青龙斩", 260, "physical", "分数缺口大时技能增伤", ["青龙刀", "绿袍", "赤面"]),
  hero("yue-fei", "岳飞", 3, "大宋", "武将", 165, 24, 1, 10, "精忠枪阵", 230, "physical", "最后10秒技能更强", ["银枪", "精忠旗", "宋甲"]),
  hero("sun-wukong", "孙悟空", 3, "神话", "刺客", 130, 28, 1, 10, "大圣分身", 230, "mythic", "生成分身追加伤害", ["金箍棒", "火眼金睛", "祥云"]),
  hero("qin-shihuang", "秦始皇", 4, "秦汉", "帝王", 190, 26, 1, 10, "六合一统", 320, "magic", "本战叠加全队最终伤害", ["玄黑帝袍", "十二金人", "龙气"]),
  hero("zhuge-liang", "诸葛亮", 4, "三国", "文臣", 120, 14, 1, 12, "七星借风", 180, "magic", "复制上一个友军技能部分伤害", ["羽扇纶巾", "七星灯", "东风"]),
  hero("xingtian", "刑天", 4, "山海", "武将", 220, 30, 1, 10, "断首战魂", 360, "mythic", "最后5秒释放时追加伤害", ["无首战神", "巨斧", "血色战纹"]),
];

export const EQUIPMENT: EquipmentConfig[] = [
  { id: "green-dragon-blade", name: "青龙偃月刀", role: "物理技能伤害", levels: [10, 20, 35, 55] },
  { id: "feather-fan", name: "羽扇", role: "魔法技能伤害与回蓝", levels: [10, 20, 35, 55] },
  { id: "shanhai-scroll", name: "山海残卷", role: "技能伤害类型变为神话", levels: [1, 2, 3, 4] },
  { id: "fengshen-register", name: "封神榜", role: "技能后给低法力友军回蓝", levels: [8, 14, 22, 35] },
  { id: "golden-armor", name: "金丝甲", role: "降低环境伤害", levels: [15, 25, 40, 60] },
  { id: "wind-fire-wheel", name: "风火轮", role: "开战法力", levels: [15, 25, 40, 60] },
  { id: "tiger-tally", name: "虎符", role: "平A回蓝", levels: [1, 2, 3, 5] },
  { id: "poetry-wine-flask", name: "诗酒壶", role: "暴击与暴击伤害", levels: [10, 20, 35, 55] },
  { id: "yin-yang-mirror", name: "阴阳镜", role: "首次技能复制", levels: [25, 40, 60, 90] },
  { id: "formation-breaker", name: "破阵枪", role: "降低目标较高减伤", levels: [8, 14, 22, 35] },
];

export const RELICS: RelicConfig[] = [
  { id: "wealth-basin", name: "聚宝盆", effect: "每关结算额外+1金" },
  { id: "recruitment-board", name: "招贤榜", effect: "每关第一次刷新商店-1金" },
  { id: "academy-order", name: "太学令", effect: "每关额外+1经验" },
  { id: "forge", name: "铸兵炉", effect: "Boss后重铸三选一可刷新一次" },
  { id: "life-charm", name: "续命符", effect: "失败扣血-2，最低仍扣1" },
  { id: "destiny-lot", name: "天命签", effect: "4费概率+3%，从1费概率扣除" },
];

function hero(
  id: string,
  name: string,
  cost: 1 | 2 | 3 | 4,
  race: Race,
  job: Job,
  maxHp: number,
  attackDamage: number,
  attackInterval: number,
  manaPerAttack: number,
  skillName: string,
  skillDamage: number,
  skillType: DamageType,
  note: string,
  artKeywords: string[],
): HeroConfig {
  return {
    id,
    name,
    cost,
    race,
    job,
    maxHp,
    attackDamage,
    attackInterval,
    manaPerAttack,
    manaMax: 100,
    skill: { name: skillName, damage: skillDamage, type: skillType, note },
    artKeywords,
  };
}
