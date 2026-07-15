# 贡献指南

感谢你对 PickStay 的关注！以下是参与贡献的方式。

## 添加新城市/街区

### 方式一：管理后台（推荐，需 admin 角色）

1. 登录后在 Supabase 中将你的 `user_profiles.role` 设为 `admin`
2. 访问 `/admin` 进行城市/街区 CRUD

### 方式二：Seed 脚本

1. 编辑 `legacy/data.js` 中的 `window.CITIES_DATA`
2. 运行 `npm run seed:extract` 重新生成 `src/data/cities.json` 和 `supabase/seed.sql`
3. 在 Supabase 中执行更新后的 seed SQL

### 方式三：直接编辑本地数据

编辑 `src/data/cities.json`（开发模式 fallback 数据源）

## 开发流程

```bash
npm install
npm run dev
npm run test
npm run lint
```

## Pull Request 规范

- 确保 `npm run test` 和 `npm run build` 通过
- 新功能请补充 Vitest 测试
- UI 变更请确保响应式布局正常

## 数据格式

每个街区需包含：

- `id`, `name`, `tagline`, `center`, `scores` (7 维 1-10 分)
- `pros[]`, `cons[]`, `priceLevel`, `bestFor`, `detailText`

## 原始 Legacy 代码

v1 纯前端版本保留在 `legacy/` 目录，供参考和对照。
