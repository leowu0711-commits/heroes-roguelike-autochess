# 周末开发交接

这份文档用于在不同电脑之间切换开发。Codex 对话本身不保证跨电脑互通，所以项目里的文档就是“记忆”。

## 新电脑上的 Codex 先读这些

在家里电脑打开项目后，对 Codex 说：

```text
请先读取 README.md、docs/handoff.md、docs/conversation-summary.md 和 docs/art-direction.md，然后继续这个游戏项目。
```

## 当前目标

做出一个可以上线开始玩的微信小游戏 / 小程序游戏原型：单人 roguelike 自走棋，题材是中国历史人物、神话传说和山海经混战。

第一阶段目标不是完整商业版，而是先做出能跑通的 playable demo：

- 准备阶段可以买棋子、刷新商店、升人口、上阵下阵、穿装备、领奖励。
- 战斗阶段自动打 30 秒并结算分数。
- 分数达到目标就过关，否则掉血。
- Boss / 野怪关能给金币、装备、圣物和重铸机会。

## 当前已完成

- 纯 TypeScript 规则核心。
- 24 个英雄、10 件装备、6 个圣物。
- 物理、魔法、神话三种伤害类型。
- 30 秒自动战斗。
- 环境伤害和本关死亡，下关恢复。
- 主要羁绊战斗效果：
  - 异士
  - 武将
  - 盛唐
  - 刺客
  - 秦汉
  - 大宋
  - 神话
  - 山海
  - 文臣
  - 帝王
- 经济规则：
  - 普通关胜利金币
  - 失败无胜利金币
  - 利息，10 金 1 利息，最多 4
  - 野怪逐只掉钱
  - Boss 节点奖励
  - Boss 概率额外掉装备宝箱
- 商店和棋子池：
  - 5 格商店
  - 1 到 8 人口概率
  - 有限棋子池
  - 买入、出售、备战席、上阵下阵
  - 三合一升星
- 经验和人口：
  - 每关自然经验
  - 4 金买 4 经验
  - 1 到 8 人口升级曲线
- 装备系统：
  - 装备宝箱三选一
  - 装备库存
  - 穿戴、卸下
  - 每英雄最多 3 件
  - 装备重铸
  - 山海残卷把技能伤害变神话
- 圣物系统：
  - 圣物宝箱三选一
  - 重复圣物不重复添加
  - 聚宝盆、招贤榜、太学令、续命符已接入

## 当前验证

命令：

```bash
npm.cmd test
```

当前预期：31 个测试通过。

注意：PowerShell 里 `npm.ps1` 可能因为执行策略被拦截，所以用 `npm.cmd test`。

## 当前还没完成

高优先级：

- 英雄技能只是第一版数值，还没做精细设计。
- 装备和英雄技能的化学反应还需要系统设计。
- 奖励选择还没有 UI 状态。
- 还没有 Cocos Creator / 微信小游戏前端工程。
- 还没有可视化战斗表现、美术资源导入和上线配置。

中优先级：

- 圣物目前按永久生效实现，最初讨论过持续 10 关，之后需要确认最终设计。
- 多人共享棋子池 / 同行 / 抬人是自走棋核心，但第一版单人 demo 还没做多人。
- 关卡目标分和环境伤害数值还只是原型曲线，需要试玩后调。

## 周五从工作电脑交给家里电脑

大白话目的：把当前项目变成一个 Git 版本，然后上传到私有仓库。

风险：

- `git commit` 只是本地保存版本，不访问外部账号。
- `git push` 会把项目上传到你设置的远程仓库，建议仓库设成私有。
- 不要把账号密码、token、密钥写进项目。

工作电脑上：

```bash
git status
npm.cmd test
git add .
git commit -m "init heroes roguelike autochess prototype"
git branch -M main
git remote add origin <你的私有仓库地址>
git push -u origin main
```

如果已经有远程仓库，以后只需要：

```bash
git status
npm.cmd test
git add .
git commit -m "说明这次改了什么"
git push
```

## 周末家里电脑开始

大白话目的：把同一份项目拉到家里电脑，并验证能跑。

家里电脑上：

```bash
git clone <你的私有仓库地址>
cd <项目目录>
npm.cmd test
```

然后让 Codex 读文档：

```text
请先读取 README.md、docs/handoff.md、docs/conversation-summary.md 和 docs/art-direction.md，然后继续这个游戏项目。
```

## 周末家里电脑结束

家里电脑离开前：

```bash
git status
npm.cmd test
git add .
git commit -m "说明周末完成了什么"
git push
```

## 下周一回到工作电脑

工作电脑开始前：

```bash
git pull
npm.cmd test
```

然后对 Codex 说：

```text
请先读取 README.md、docs/handoff.md 和 docs/conversation-summary.md，总结周末改动，然后继续下一步。
```

## 周末建议做的小目标

最推荐的小目标：

1. 设计每个英雄的具体技能数值和装备联动。
2. 建一个极简 HTML / Canvas / Cocos 原型界面。
3. 跑 `npm.cmd test`。
4. 更新 `README.md` 和本文件的“当前已完成 / 当前还没完成”。

如果想做更有体感的小目标：

1. 建一个极简 HTML / Canvas / Cocos 原型界面。
2. 展示商店、备战席、上阵区、金币、人口、关卡和战斗结果。
3. 先不追求好看，只追求能点、能买、能上阵、能打下一关。
