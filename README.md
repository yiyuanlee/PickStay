# PickStay 📍

> **全栈旅行住宿街区推荐平台** | Next.js · TypeScript · Supabase · Redis

[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE)

## Live Demo

**Production:** https://pickstay.vercel.app

**Legacy (v1 静态版):** https://yiyuanlee.github.io/PickStay/ — 纯前端 SPA，偏好存储在 `localStorage`，无需登录。

---

## 项目简介

PickStay 帮助旅行者通过 **7 维偏好权重**（安全、交通、美食、夜生活、安静、预算、咖啡/Chill）实时推荐最适合的城市宿区。支持地图 API 动态 POI 增强、多街区对比、用户云端同步。

在规划旅行时，选择**住在哪个区域**往往比选择「住哪家具体酒店」更为关键。每个街区都有它独特的性格——有些繁华喧嚣适合彻夜狂欢，有些充满独立咖啡店和古着店适合漫步，有些则是历史悠久的静谧居民区。
### 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS 4 |
| 后端 | Next.js Route Handlers · Server Actions |
| 数据库 | Supabase PostgreSQL + Row Level Security |
| 认证 | Supabase Auth (Email + GitHub OAuth) |
| 缓存 | Upstash Redis (POI 24h TTL) |
| 测试 | Vitest · Playwright · GitHub Actions CI |
| 部署 | Vercel + Supabase Cloud |

### 架构

```mermaid
flowchart TB
  Client[Next.js Client] --> SA[Server Actions]
  Client --> API[Route Handlers]
  SA --> Supabase[(Supabase PostgreSQL)]
  API --> Redis[(Upstash Redis)]
  API --> Maps[Google / 高德 Maps API]
  Auth[Supabase Auth] --> Supabase
```

---

## 核心特性

- **7 维加权推荐引擎** — 同城归一化后实时排序，SVG 雷达图 + 匹配驱动解释
- **偏好深链分享** — `?preset=` / `?w=` 零登录复现排序；Dashboard 一键回流
- **地图 API 服务端代理** — Key 零暴露，并发池 + 部分失败 + IP 限流 + Redis 24h
- **用户体系** — 偏好云端同步、收藏、对比方案持久化 (RLS)
- **管理后台** — 城市/街区 CRUD（错误上屏）、POI 缓存清理与预热
- **Mock 降级** — 无 API Key 时使用本地预置评分，开箱即用

文档：[Case Study](docs/CASE_STUDY.md) · [面试题卡](docs/INTERVIEW_QA.md) · [Demo 脚本](docs/DEMO_SCRIPT.md) · [ADR](docs/adr/)

### 覆盖城市 (8 城 57 街区)

| 城市 | 街区数 | 地图服务商 |
|------|--------|------------|
| 东京 Tokyo | 8 | Google |
| 北京 Beijing | 7 | 高德 |
| 巴黎 Paris | 7 | Google |
| 墨尔本 Melbourne | 7 | Google |
| 皇后镇 Queenstown | 7 | Google |
| 悉尼 Sydney | 7 | Google |
| 广州 Guangzhou | 7 | 高德 |
| 大阪 Osaka | 7 | Google |

---

## 快速开始

### 1. 克隆并安装

```bash
git clone https://github.com/yiyuanlee/PickStay.git
cd PickStay
npm install
cp .env.example .env.local
```

### 2. 本地开发（无需 Supabase）

不配置环境变量时，应用自动使用内置 `src/data/cities.json` 本地数据：

```bash
npm run dev
# 访问 http://localhost:3000
```

### 3. 配置 Supabase（完整功能）

1. 在 [supabase.com](https://supabase.com) 创建项目
2. 运行 `supabase/migrations/001_initial_schema.sql`
3. 运行 `supabase/seed.sql`（或 `npm run seed:extract` 重新生成）
4. 填入 `.env.local` 中的 Supabase URL 和 Keys
5. 在 Supabase Auth 中启用 Email 和 GitHub OAuth

### 4. 配置地图 API 与 Redis（可选）

```env
GOOGLE_MAPS_API_KEY=...
AMAP_KEY=...
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

---

## API 端点

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/maps/enrich` | POI 动态增强（Redis 缓存 + Mock 降级） |
| GET | `/auth/callback` | OAuth 回调 |

---

## 测试

```bash
npm run test          # Vitest 单元测试
npm run test:e2e      # Playwright E2E
npm run typecheck     # TypeScript 检查
npm run lint          # ESLint
npm run build         # 生产构建
```

---

## 部署

### Vercel

1. 导入 GitHub 仓库到 [vercel.com](https://vercel.com)
2. 配置环境变量（参考 [docs/PRODUCTION.md](docs/PRODUCTION.md)）
3. Deploy

部署后访问 `/api/health` 检查各服务配置状态。

### Render（备选）

使用 Web Service，确保绑定 `0.0.0.0:$PORT`。

---

## 作品集 / Case Study

完整项目说明见 **[docs/CASE_STUDY.md](docs/CASE_STUDY.md)**（含简历 bullet、架构决策、Demo 录制指南）。

**推荐展示方式：**
1. README 顶部 Live Demo 链接
2. 30 秒 GIF：选城市 → 调偏好 → 看多边形变化 → 对比（保存为 `docs/demo.gif`）
3. 分享链接测试 OG 预览（Twitter Card / Slack unfurl）
4. 面试时打开 `/api/health` 说明生产配置完整性

---

## 目录结构

```text
PickStay/
├── legacy/                 # v1 纯前端版本（归档）
├── src/
│   ├── app/                # Next.js App Router 页面与 API
│   ├── components/         # React 组件
│   ├── data/               # 本地 fallback 数据
│   └── lib/                # 推荐引擎、Supabase、Maps、Redis
├── supabase/
│   ├── migrations/         # 数据库 Schema + RLS
│   └── seed.sql            # 8 城 57 街区种子数据
├── tests/                  # E2E 测试
├── scripts/                # 数据迁移脚本
└── .github/workflows/      # CI/CD
```

---

## 推荐算法

偏好权重向量 W = {W₁...W₇}（0-10），街区得分 S = {S₁...S₇}（1-10）：

**Match Score = Σ(Wᵢ × Sᵢ) / (ΣWᵢ × 10) × 100**

---

## 简历 Bullet Points

> **PickStay** — 全栈旅行住宿街区推荐平台 | Next.js, TypeScript, Supabase, Redis  
> **Live Demo:** https://pickstay.vercel.app

- 设计 7 维加权推荐引擎，8 城 57 街区实时排序 + 七边形得分可视化
- Supabase Auth 用户体系，偏好/收藏/对比云端同步（PostgreSQL + RLS）
- Map API 服务端代理 + Upstash Redis 缓存，API Key 零暴露，Mock 降级
- Vitest + Playwright + GitHub Actions CI；Vercel Analytics / Speed Insights 监控

完整中英文版本见 [docs/CASE_STUDY.md](docs/CASE_STUDY.md)。

---

## 监控与可观测性

| 能力 | 状态 | 说明 |
|------|------|------|
| `/api/health` | ✅ 已内置 | 检查 Supabase / Redis / Maps / Sentry 配置 |
| Vercel Analytics | ✅ 已集成 | 部署到 Vercel 自动启用 |
| Speed Insights | ✅ 已集成 | Core Web Vitals |
| Sentry | 可选 | 设置 `NEXT_PUBLIC_SENTRY_DSN` 后自动初始化 |

生产配置步骤见 [docs/PRODUCTION.md](docs/PRODUCTION.md)。

---

## 开源协议

[MIT License](LICENSE)
