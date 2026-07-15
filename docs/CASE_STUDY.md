# PickStay — 项目 Case Study（求职版）

> 一页纸版本，可直接用于作品集、面试自我介绍或 Obsidian 归档。

---

## 一句话

PickStay 是一个帮助旅行者通过 **7 维偏好权重** 在 **8 城 57 街区** 中找到最佳住宿区域的 full-stack 推荐平台；服务端代理地图 POI、Redis 缓存、同城分数归一化与可分享偏好深链，排序行为可测可解释。

**Live Demo:** https://pickstay.vercel.app

---

## 问题

旅行规划时，「住在哪个区域」比「住哪家酒店」更影响体验，但：

- 攻略信息分散、主观、难对比
- 不同旅行者偏好差异大（预算 vs 夜生活 vs 咖啡文化）
- 地图 POI 数据若在前端调用会暴露 API Key
- 专家打分跨城不可比，直接加权会过度宣称精度

---

## 方案

| 模块 | 实现 |
|------|------|
| 推荐引擎 | 同城 min-max 归一化 + 7 维加权；legacy 快照锁定 v1 排序 |
| 可解释性 | Top 贡献维度 + 静态专家分 / POI 动态分溯源 |
| 可视化 | 每个街区七边形得分图 + 偏好权重虚线叠加 |
| 数据层 | Supabase PostgreSQL + RLS，本地 JSON fallback |
| 用户体系 | Email + GitHub OAuth，偏好/收藏/对比云端同步 |
| 地图增强 | Server-side POI 代理、并发池、部分失败语义、IP 限流、Redis 24h |
| 分享 | 偏好深链 `?preset=` / `?w=`，零登录可复现排序 |
| 管理后台 | CRUD 错误回传、缓存清理与城市预热 |
| 部署 | Vercel + Supabase，GitHub Actions CI |

---

## 架构亮点

```
Browser → Next.js App Router
           ├── Server Actions（偏好持久化 / Admin）
           ├── Route Handlers（/api/maps/enrich 代理）
           └── Supabase Auth Middleware（路由保护）
                    ↓
           Supabase PostgreSQL (RLS)
           Upstash Redis (POI cache)
           Google / 高德 Maps API
```

**关键决策（详见 ADR）：**
- [ADR 001](adr/001-maps-server-proxy.md) — Map API 服务端代理，Key 零暴露
- [ADR 002](adr/002-scoring-normalization.md) — 同城归一化，明确不做伪 ML 协同过滤
- **本地 JSON fallback** — 无 Supabase 时仍可 demo 核心推荐
- **history.replaceState + 深链** — 城市切换不重挂载；分享可复现排序

---

## 技术栈

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Supabase · Upstash Redis · Zod · Vitest · Playwright · Vercel · Sentry

---

## 成果指标（可写入简历）

- **8** 城市、**57** 个街区结构化数据
- **7** 维实时加权排序（同城归一化），契合度 0–100%，Top 驱动维度可解释
- 单元测试覆盖引擎边界 / 并发池 / 限流 / 深链编解码；Playwright 断言 Top-1 随人格预设变化
- 离线回归：`npm run test:ranking` 锁定各人格 Top-3
- Enrich API：`meta.cached|fresh|failed` + 结构化日志；`POST` IP 限流 30/min
- 生产部署：https://pickstay.vercel.app · 健康检查 `/api/health`

---

## 简历 Bullet Points（中英文）

**中文：**
- 将静态街区推荐原型重构为 Next.js 全栈应用：Supabase Auth/RLS 云端同步、服务端 Maps 代理 + Redis 缓存、CI（Vitest/Playwright）阻断错误合并
- 实现同城分数归一化与离线 Top-3 回归，UI 展示匹配驱动维度与 POI/静态分溯源，保证排序可测可解释
- 设计偏好深链分享（`preset`/`w` query）与 Dashboard 一键回流，零登录即可复现同一排序结果
- Enrich API 受限并发、部分失败语义与 IP 限流；Admin 支持缓存清理/预热与显式错误回传

**English:**
- Rebuilt a static neighborhood picker into a Next.js full-stack app with Supabase Auth/RLS, server-side Maps proxy + Redis cache, and Vitest/Playwright CI gates
- Added within-city score normalization, offline Top-3 regression snapshots, and explainable match drivers with POI vs expert-score provenance
- Shipped shareable preference deep links and dashboard resume-explore flows so rankings are reproducible without login
- Hardened `/api/maps/enrich` with bounded concurrency, partial-failure metadata, IP rate limits, and admin cache warm/clear with surfaced errors

---

## 90 秒 Demo 脚本

见 [DEMO_SCRIPT.md](DEMO_SCRIPT.md)。面试口述题卡见 [INTERVIEW_QA.md](INTERVIEW_QA.md)。

---

## Demo 录制建议（30 秒 GIF）

1. 首页 →「开始探索」
2. 东京 →「家庭出行」→ 切「夜猫一族」，观察 Top-1 与「高匹配因」变化
3. 点「复制偏好链接」→ 新标签打开，排序一致
4. 加入 2 个街区对比 → Dashboard（如已登录）继续探索带回权重

保存至 `docs/demo.gif`，在 README 中引用。
