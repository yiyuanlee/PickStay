# PickStay — 项目 Case Study

> 一页纸版本，可直接用于作品集、面试自我介绍或 Obsidian 归档。

---

## 一句话

PickStay 是一个帮助旅行者通过 **7 维偏好权重** 在 **8 城 57 街区** 中找到最佳住宿区域的 full-stack 推荐平台。

**Live Demo:** https://pickstay.vercel.app

---

## 问题

旅行规划时，「住在哪个区域」比「住哪家酒店」更影响体验，但：

- 攻略信息分散、主观、难对比
- 不同旅行者偏好差异大（预算 vs 夜生活 vs 咖啡文化）
- 地图 POI 数据若在前端调用会暴露 API Key

---

## 方案

| 模块 | 实现 |
|------|------|
| 推荐引擎 | 7 维加权算法，Vitest 快照保证与 legacy 一致 |
| 可视化 | 每个街区七边形得分图 + 偏好权重虚线叠加 |
| 数据层 | Supabase PostgreSQL + RLS，8 城 57 街区 seed |
| 用户体系 | Email + GitHub OAuth，偏好/收藏/对比云端同步 |
| 地图增强 | Server-side POI 代理 + Upstash Redis 24h 缓存 |
| 管理后台 | Admin CRUD + 缓存清理 |
| 部署 | Vercel + Supabase Cloud，CI/CD via GitHub Actions |

---

## 架构亮点

```
Browser → Next.js App Router
           ├── Server Actions（偏好持久化）
           ├── Route Handlers（/api/maps/enrich 代理）
           └── Supabase Auth Middleware（路由保护）
                    ↓
           Supabase PostgreSQL (RLS)
           Upstash Redis (POI cache)
           Google / 高德 Maps API
```

**关键决策：**
- **Map API 服务端代理** — Key 零暴露，统一 Mock 降级
- **本地 JSON fallback** — 无 Supabase 时仍可 demo 核心推荐
- **history.replaceState 切换城市** — 避免路由重挂载导致动画重复

---

## 技术栈

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Supabase · Upstash Redis · Vitest · Playwright · Vercel

---

## 成果指标（可写入简历）

- **8** 城市、**57** 个街区结构化数据
- **7** 维实时加权排序，契合度 0–100%
- **9** 单元测试 + **3** E2E + GitHub Actions CI
- 生产部署：https://pickstay.vercel.app
- 健康检查：`/api/health` 服务状态自检

---

## 简历 Bullet Points（中英文）

**中文：**
- 设计 7 维加权推荐引擎，支持 8 城 57 街区实时排序与七边形得分可视化
- 构建 Supabase Auth 用户体系，偏好/收藏/对比方案云端同步（RLS 行级安全）
- 开发 Map API 服务端代理 + Redis 缓存，API Key 零暴露，Mock 降级开箱即用
- Vitest + Playwright + GitHub Actions CI；Vercel 生产部署与 Analytics 监控

**English:**
- Built a 7-dimension weighted recommendation engine ranking 57 neighborhoods across 8 cities with heptagon radar visualization
- Implemented Supabase Auth with RLS-protected user preferences, favorites, and saved comparisons
- Developed server-side Map API proxy with Upstash Redis caching and graceful mock fallback
- Shipped with Vitest/Playwright tests, GitHub Actions CI, and Vercel production deployment

---

## Demo 录制建议（30 秒 GIF）

1. 首页 → 点击「开始探索」
2. 选择东京 → 切换「文艺/咖啡控」预设
3. 拖动「咖啡/Chill」滑块，观察排序与多边形变化
4. 加入 2 个街区对比 → 展开对比页
5. 导出 GIF：OBS / ScreenToGif / Chrome DevTools Recorder

保存至 `docs/demo.gif`，在 README 中引用。

---

## 后续可扩展

- 收藏 / 保存对比 UI 闭环
- 分享链接一键复制
- 更多城市与季节性标签
- 移动端 Bottom Sheet 对比体验
