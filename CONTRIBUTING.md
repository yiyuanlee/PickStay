# 贡献指南

感谢你对 PickStay 的关注！本项目是纯前端静态应用，欢迎通过 Pull Request 扩展城市与街区数据。

## 如何添加新城市

1. 在 `data.js` 的 `window.CITIES_DATA` 中新增城市对象，字段包括：
   - `name`、`description`、`center`（城市中心坐标）
   - `preferredProvider`：`"amap"`（国内）或 `"google"`（海外）
   - `neighborhoods`：街区数组，每个街区需包含 `id`、`name`、`tagline`、`center`、`scores`（7 维 1–10 分）、`pros`、`cons`、`priceLevel`、`bestFor`、`detailText`

2. 在 `index.html` 的城市选择区增加对应的 `.city-card`，`data-city` 与 `data.js` 中的 key 一致。

3. 本地双击 `index.html` 或用静态服务器预览，确认推荐排序、详情弹窗、地图链接与对比功能正常。

## 开发约定

- 保持最小改动，匹配现有代码风格（原生 JS，无构建工具）
- 坐标使用 `{ lat, lng }` 格式
- 每个城市建议 6–8 个代表性街区，保持数据质量而非数量堆砌
