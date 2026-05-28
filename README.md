# PickStay 📍

> **个性化旅行住宿地区推荐器** | *A personalized travel neighborhood recommender based on user-defined priorities and live Map APIs.*

---

## 📖 项目简介 (Introduction)

在规划旅行时，选择**住在哪个区域**往往比选择“住哪家具体酒店”更为关键。每个街区都有它独特的性格——有些繁华喧嚣适合彻夜狂欢，有些充满独立咖啡店和古着店适合漫步，有些则是历史悠久的静谧居民区。

**PickStay** 是一个高颜值、强交互的前端 Web 单页面应用（SPA）。它专注于帮助旅行者通过微调 **7 个偏好维度**（安全、交通、美食、夜生活、安静度、预算、以及独创的 **咖啡馆/Chill氛围指数**），实时重排并推荐最适合的城市宿区，同时支持 **高德地图** 与 **Google Maps API** 实时增强，以及多区域并排对比大 PK。

---

## ✨ 核心特性 (Features)

* 🎨 **清新浅色调 UI 设计**：采用现代化的微透毛玻璃（Glassmorphism）质感与柔和的海洋青绿色系，视觉轻盈活泼，完美适配跨端设备。
* ⚙️ **7 维交互式偏好滑块**：实时调整 7 个住宿维度的权重，毫秒级响应并自动重排最契合的区域。
* 🎒 **旅行人格一键预设**：内置“初旅探索”、“特种背包”、“家庭出行”、“夜猫一族”及“文艺/咖啡控 ☕”五种预设权重。
* ⚖️ **街区多维大 PK 对比栏**：支持选择 2-3 个感兴趣的街区放入底部抽屉，展开一键生成全维度数据的大PK表格。
* 📊 **SVG 雷达沙盘展示**：点击详情可渲染该区域的 7 维度实际得分与用户期望权重的 SVG 雷达对比图。
* 🌐 **第三方地图 API 动态分析**：支持在界面配置高德地图（国内城市）或 Google Maps（海外城市）API：
  - 动态检索宿区中心点 1.5km 范围内的地铁、商场、咖啡馆的真实数量；
  - 实时更新交通、美食、咖啡Chill得分并重排列表；
  - **降级 Mock 机制**：若无 API Key，自动读取本地深度预置评分，确保开箱即用。
* 🔒 **隐私本地化**：API Key 完全保存在浏览器 `localStorage` 中，绝不上传至任何服务器。

---

## 🛠️ 技术栈 (Tech Stack)

* **结构层**：HTML5 (语义化标记)
* **表现层**：Vanilla CSS3 (CSS 变量控制主题、响应式 Grid/Flex 布局、Glassmorphism、Keyframe 动效)
* **逻辑层**：原生 JavaScript (ES6+，DOM 驱动，动态 SDK 注入加载器，SVG 动态拼接渲染)
* **无需任何构建工具或依赖，双击 `index.html` 即可在本地完美运行！**

---

## 📂 目录结构 (Directory Structure)

```text
PickStay/
├── index.html          # 主页面结构与语义化布局
├── style.css           # 核心设计系统、UI配色、响应式样式与动效
├── data.js             # 内置 4 个城市 (东京、北京、巴黎、墨尔本) 共 29 个街区的特征数据库
├── app.js              # 推荐打分算法、SVG 雷达图生成、对比抽屉与地图 API 检索逻辑
└── README.md           # 项目自述文档
```

---

## 🚀 快速开始 (Quick Start)

1. 克隆本项目到本地：
   ```bash
   git clone https://github.com/YOUR_USERNAME/PickStay.git
   ```
2. 直接双击打开 `index.html`，或使用本地服务器（如 VS Code 的 Live Server 插件）启动。
3. 如果需要启用真实的 API 数据检索：
   - 点击右上角的 **“地图 API 配置”** 按钮；
   - 填入对应服务商的 API Key 并保存；
   - 切换城市或保存后，系统即可实时拉取周边 POI。

---

## 📝 推荐计算公式 (Algorithm)

偏好权重向量 $\vec{W} = \{W_1, W_2, \dots, W_7\}$（0-10 分），街区实际得分 $\vec{S} = \{S_1, S_2, \dots, S_7\}$（1-10 分）。
最终契合度计算如下（折算为百分比）：

$$\text{Match Score} = \frac{\sum_{i=1}^{7} (W_i \times S_i)}{\sum_{i=1}^{7} W_i} \times 10$$

---

## 📄 开源协议 (License)

本项目采用 [MIT License](LICENSE) 协议开源。
