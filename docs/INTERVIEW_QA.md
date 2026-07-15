# PickStay — 面试口述题卡（全栈）

对着镜子练习：每个问题 45–90 秒，再准备 30 秒 dig-deeper。

---

## 1. 为什么不用前端 Maps SDK / 客户端 Key？

浏览器任何资源都能被提取。我们把 Google/高德调用收进 `POST /api/maps/enrich`：Zod 校验 → Redis 读 → 并发池拉取 miss → 写回 TTL 24h。Key 只在服务端；失败时返回已有缓存 + `failedIds`，UI 仍用专家静态分，演示不挂。

**Dig deeper：** rate limit 是进程内滑窗，Serverless 多实例不共享——生产若被刷会加 Upstash 或边缘限流；目前足够说明威胁模型与降级。

---

## 2. 为什么用 RLS？Service Role 呢？

用户偏好/收藏挂在 `user_id` 上，RLS 保证即便 anon key 泄露，用户也只能碰自己的行。Admin 写城市/街区走已登录且 `role=admin` 的 Server Action；需要 bypass 时才用 service role（文档中明确不进前端）。

---

## 3. Redis 挂了会怎样？

`getCachedScores` / `setCachedScores` 吞掉异常 → 每次 enrich 直打 Maps 或走 mock。排名路径不依赖 Redis，缓存是成本/时延优化，不是正确性依赖。Admin「预热」是为减轻 cold-start stampede。

---

## 4. 归一化前后排序差在哪？为什么不做协同过滤？

专家分跨城不可比。同城 min-max 到 1–10 后再加权，表达的是「这座城里谁更相对突出」。Legacy 测试 `normalize: false` 锁住 v1 行为；默认 UI 走归一化。协同过滤需要点击/停留/收藏后的反馈矩阵，我们没有诚实数据就不装 AI。

---

## 5. Enrich 怎么控制时延与失败？

串行会把 7–8 个街区打成串行 RTT。现在 `mapPool` 并发 4，响应带 `cached/fresh/failed`；结构化日志记 `cityId`、`hitRate`、`durationMs`。客户端请求带 requestId，城市切换可丢弃过期响应。

---

## 6. 你这个项目的 trade-off 顶层总结？

选了 **可交付的诚实工程**（代理、缓存、归一化、深链、可观测），而不是虚高算法。代价是推荐仍依赖专家标注；当有真实 outcome 再谈 LTR。

---

## 白板 2 分钟架构口述顺序

1. 用户调权重 → 客户端 `rankNeighborhoods`（纯函数，可单测）
2. 并行 `enrich` 更新 café/transit/shopping
3. Auth 用户 `savePreferences` → Supabase + RLS
4. 分享 URL `preset`/`w` 复现
5. 指出失败点：Maps 超时、Redis miss、429 限流
