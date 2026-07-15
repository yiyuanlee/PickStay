# Supabase

正式文件：

| 路径 | 说明 |
|------|------|
| `migrations/001_initial_schema.sql` | 表结构、RLS、signup trigger |
| `seed.sql` | 全量城市/街区种子 |
| `seed-chunks/*.sql` | 按城拆分，便于 SQL Editor 分批执行 |

本地无 Supabase 时，应用会回退到 `src/data/cities.json`，不必先跑 seed。

上线步骤见 [docs/PRODUCTION.md](../docs/PRODUCTION.md)。
