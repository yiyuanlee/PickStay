# PickStay 目录结构

一眼看懂仓库里「该看哪、别碰哪」。

```
PickStay/
├── src/                 # 应用代码（日常开发几乎只改这里）
├── tests/               # E2E（Playwright）
├── fixtures/            # 离线回归基线（ranking Top-3）
├── supabase/            # Schema + 正式 seed
├── scripts/             # 数据提取 / 排序回归
├── docs/                # 产品、贡献、面试与 ADR
├── config/              # ESLint / Vitest / Playwright（不堆在根目录）
├── legacy/              # v1 静态站归档（只读参考）
├── public/              # 静态资源
├── package.json         # 依赖与 npm scripts
├── next.config.ts       # Next 必需根配置
├── tsconfig.json
├── postcss.config.mjs   # Tailwind/PostCSS（Next 默认从根读取）
├── README.md / LICENSE
└── AGENTS.md / CLAUDE.md  # 指向 docs/AGENTS.md 的薄入口
```

**根目录刻意保留的：** Next / TypeScript / PostCSS / npm 清单（工具约定必须在根）。
**已收进子目录的：** 测试与 lint 配置 → `config/`；贡献与长文档 → `docs/`。

---

## `src/` — 应用

| 路径 | 职责 |
|------|------|
| `src/app/` | Next.js App Router：页面、Route Handlers、layout |
| `src/components/` | UI 组件（探索流、卡片、Admin 表单包装） |
| `src/components/ui/` | 底层 primitive（button / slider / dialog） |
| `src/lib/recommendation/` | 排序引擎、人格预设、分享深链 |
| `src/lib/maps/` | Maps provider + POI→分映射 |
| `src/lib/redis/` | POI 缓存 |
| `src/lib/supabase/` | Auth 客户端 / server / middleware helper |
| `src/lib/actions/` | Server Actions（用户 / Admin） |
| `src/lib/data/` | Supabase 或本地 JSON 双数据源 |
| `src/data/` | 本地 `cities.json` + 英文 overlay |
| `src/i18n/` | 中英消息与 locale cookie |
| `src/middleware.ts` | Session 刷新 |

**读代码建议顺序：** `app/explore` → `ExploreClient` → `lib/recommendation/engine` → `api/maps/enrich`。

---

## `config/` — 工具配置

| 文件 | 对应脚本 |
|------|----------|
| `eslint.config.mjs` | `npm run lint` |
| `vitest.config.ts` | `npm run test` |
| `playwright.config.ts` | `npm run test:e2e` |

---

## `supabase/` — 数据库

```
supabase/
├── migrations/001_initial_schema.sql
├── seed.sql
└── seed-chunks/*.sql
```

临时 `_payloads/` / `_exec/` 已删除且被 `.gitignore` 忽略。

---

## `docs/` — 文档

| 文件 | 用途 |
|------|------|
| `STRUCTURE.md` | 本文件 |
| `CONTRIBUTING.md` | 贡献指南（根目录不再堆全文） |
| `CASE_STUDY.md` | 作品集一页纸 |
| `INTERVIEW_QA.md` / `DEMO_SCRIPT.md` | 面试口述 |
| `PRODUCTION.md` | 上线检查 |
| `AGENTS.md` | Agent 说明（CLAUDE.md / AGENTS.md 入口指向这里） |
| `adr/` | 架构决策 |

---

## `legacy/` / `scripts/` / `fixtures/`

- **`legacy/`** — GitHub Pages v1
- **`scripts/`** — seed 提取、排序回归
- **`fixtures/ranking-baseline.json`** — Top-3 基线

---

## 刻意不做的事

没有强行把 `next.config.ts` / `postcss.config.mjs` 塞进 `config/`（Next 默认从仓库根解析）。也没有把 `src/` 拆成 monorepo——当前规模单层 `lib` + `app` 更清晰。
