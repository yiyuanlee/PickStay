# PickStay 目录结构

一眼看懂仓库里「该看哪、别碰哪」。

```
PickStay/
├── src/                     # 应用代码（日常开发几乎只改这里）
├── tests/                   # E2E（Playwright）
├── fixtures/                # 离线回归基线（ranking Top-3）
├── supabase/                # Schema + 正式 seed（无临时垃圾）
├── scripts/                 # 数据提取 / 排序回归
├── docs/                    # 产品与面试文档
├── legacy/                  # v1 静态站归档（只读参考）
├── public/                  # 静态资源
└── …配置文件（Next / ESLint / Vitest / Playwright / Vercel）
```

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

## `supabase/` — 数据库（已清理）

正式保留：

```
supabase/
├── migrations/001_initial_schema.sql   # Schema + RLS
├── seed.sql                            # 一键全量 seed
└── seed-chunks/*.sql                     # 按城拆分（SQL Editor / MCP 分批执行）
```

**已删除、不要再提交：**

- `_exec/`、`_payloads/` — 一次性 MCP/导入残骸（曾占约 15MB）
- `_*.sql.txt`、`seed-chunks/_tmp_*.sql` — 临时导出

`.gitignore` 已忽略 `supabase/_exec/`、`supabase/_payloads/`、`supabase/_*.sql.txt`。

---

## `docs/` — 求职与运维

| 文件 | 用途 |
|------|------|
| `CASE_STUDY.md` | 作品集一页纸 + 简历 bullet |
| `INTERVIEW_QA.md` | 面试口述题卡 |
| `DEMO_SCRIPT.md` | 90 秒 Demo 脚本 |
| `PRODUCTION.md` | 环境变量与上线检查 |
| `adr/` | 架构决策记录 |

---

## `legacy/` / `scripts/` / `fixtures/`

- **`legacy/`** — GitHub Pages v1；行为用 Vitest 快照锁在引擎测试里，一般不用改
- **`scripts/extract-legacy-data.mjs`** — 从数据源再生 seed
- **`scripts/ranking-regression.mts`** — `npm run test:ranking`
- **`scripts/seed-remote-chunks.mjs`** — 提示按城执行 seed-chunks
- **`fixtures/ranking-baseline.json`** — 归一化排序 Top-3 基线

---

## 刻意不做的事

没有把 `src/` 拆成 `features/*` 或 monorepo：当前规模单层 `lib` + `app` 更易讲清。等模块再涨一倍再考虑按领域切开。
