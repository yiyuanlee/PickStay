# PickStay 生产环境配置指南

本文档用于将 PickStay 从「可演示」提升到「生产可用」。按顺序完成即可。

**Live Demo:** https://pickstay.vercel.app  
**健康检查:** https://pickstay.vercel.app/api/health

---

## 1. Vercel 环境变量（必做）

在 [Vercel Project Settings → Environment Variables](https://vercel.com) 为 **Production / Preview / Development** 配置：

| 变量 | 必填 | 说明 |
|------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase 项目 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon key（可公开） |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | 服务端写入 / Admin（**勿泄露**） |
| `NEXT_PUBLIC_APP_URL` | ✅ | `https://pickstay.vercel.app` |

**可选（增强功能）：**

| 变量 | 作用 |
|------|------|
| `GOOGLE_MAPS_API_KEY` | Google 城市 POI 实测 |
| `AMAP_KEY` | 高德 POI（北京/广州） |
| `UPSTASH_REDIS_REST_URL` | POI 结果 24h 缓存 |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Token |
| `NEXT_PUBLIC_SENTRY_DSN` | 生产错误监控 |

验证：部署后访问 `/api/health`，`services` 字段应显示各服务是否已配置。

---

## 2. Supabase Auth（必做）

打开 [Supabase Dashboard → Auth → URL Configuration](https://supabase.com/dashboard)：

**Site URL**
```
https://pickstay.vercel.app
```

**Redirect URLs**
```
https://pickstay.vercel.app/auth/callback
http://localhost:3000/auth/callback
```

### Email 登录
- Auth → Providers → Email：保持启用
- 注册后可在 Dashboard → Authentication → Users 查看用户

### GitHub OAuth（推荐）
1. GitHub → Settings → Developer settings → OAuth Apps → New
2. Homepage URL: `https://pickstay.vercel.app`
3. Callback URL: `https://<your-supabase-ref>.supabase.co/auth/v1/callback`
4. 将 Client ID / Secret 填入 Supabase Auth → GitHub Provider

---

## 3. 设置 Admin 用户

注册账号后，在 Supabase SQL Editor 执行：

```sql
UPDATE user_profiles
SET role = 'admin'
WHERE id = '<your-user-uuid>';
```

Admin 可访问 `/admin` 管理城市与街区数据。

---

## 4. 地图 API + Redis（可选但推荐）

### Google Maps
1. [Google Cloud Console](https://console.cloud.google.com/) 启用 Places API
2. 创建 API Key，限制为 Places API + 服务器 IP（Vercel 需用 HTTP referrer 或无限制测试）
3. 写入 Vercel：`GOOGLE_MAPS_API_KEY`

### 高德地图
1. [高德开放平台](https://lbs.amap.com/) 创建应用
2. 启用 Web 服务 API
3. 写入 Vercel：`AMAP_KEY`

### Upstash Redis
1. [Upstash Console](https://console.upstash.com/) 创建 Redis 数据库
2. 复制 REST URL 和 Token 到 Vercel
3. Admin 后台可「清除 POI 缓存」

无地图 Key 时应用自动降级为本地预置评分，不影响核心推荐功能。

---

## 5. 监控与可观测性

### Vercel Analytics（已集成）
部署到 Vercel 后自动采集页面访问，无需额外配置。

### Vercel Speed Insights（已集成）
自动上报 Core Web Vitals，在 Vercel Dashboard → Speed Insights 查看。

### Sentry（可选）
1. [sentry.io](https://sentry.io) 创建 Next.js 项目
2. 复制 DSN 到 `NEXT_PUBLIC_SENTRY_DSN`
3. 重新部署；`instrumentation.ts` 会在生产环境自动初始化

---

## 6. 部署后验证清单

- [ ] 首页加载 8 个城市
- [ ] `/explore/tokyo` 切换人格预设会改变 Top-1（`data-neighborhood-id`）
- [ ] `/explore/tokyo?w=5,9,7,8,4,9,10` 与 chill 预设排序一致
- [ ] `/api/health` 返回 `status: ok`
- [ ] 注册 / 登录成功，跳转 `/dashboard`，「继续探索」带权重回流
- [ ] GitHub OAuth 回调正常（若已配置）
- [ ] 分享链接 OG 预览正常（Twitter/Slack/微信开发者工具）
- [ ] `/sitemap.xml` 可访问

### 失败路径手工验证（面试 / 值班）

| 场景 | 操作 | 期望 |
|------|------|------|
| 无 Maps Key | 清空 `GOOGLE_*` / `AMAP_*` 后 enrich | UI 提示 Mock；排序仍可用专家分 |
| Redis 宕机 | 去掉 Upstash env | enrich 仍 200；`meta.cached`≈0、`fresh`/`failed` 增加；日志有 `maps.enrich` |
| 限流 | 短时间连打 enrich >30 次 | HTTP 429 + `explore.enrichRateLimited` 文案 |
| Admin 无权限 | 非 admin 调 warm/clear | Action 返回 `Unauthorized`，表单下方红字 |

相关 ADR：`docs/adr/001-maps-server-proxy.md`、`docs/adr/002-scoring-normalization.md`。

---

## 7. 常见问题

**登录后跳回 login**
→ 检查 Supabase Redirect URLs 是否包含 production 域名

**Admin 403**
→ 确认 `user_profiles.role = 'admin'`

**地图 API 始终 Mock**
→ 检查 `/api/health` 中 `googleMaps` / `amap` 是否为 `true`

**OAuth 报错**
→ GitHub OAuth App 的 callback 必须是 Supabase 提供的 URL，不是 pickstay.vercel.app
