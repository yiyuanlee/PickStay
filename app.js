// PickStay - 核心交互逻辑与推荐引擎

// 全局状态管理
const state = {
  currentCityId: "tokyo",
  activePreset: null,
  weights: {
    budget: 5,
    safety: 5,
    transit: 5,
    shopping: 5,
    nightlife: 5,
    quiet: 5,
    cafe: 5
  },
  comparisonList: [], // 存储选中的街区ID
  mapLoaded: { amap: false, google: false },
  dynamicScores: {}, // 存储 API 抓取后的实时动态评分 { neighborhoodId: { cafe: X, transit: Y, shopping: Z } }
  isApiLoading: false,
  apiError: null,
  apiSuccessMessage: ""
};

// 各种偏好预设的权重数据
const PERSONA_PRESETS = {
  firstTime: { budget: 5, safety: 9, transit: 10, shopping: 8, nightlife: 6, quiet: 6, cafe: 6 },
  backpacker: { budget: 10, safety: 7, transit: 9, shopping: 5, nightlife: 7, quiet: 5, cafe: 6 },
  family: { budget: 5, safety: 10, transit: 7, shopping: 6, nightlife: 2, quiet: 10, cafe: 7 },
  chill: { budget: 5, safety: 9, transit: 7, shopping: 8, nightlife: 4, quiet: 9, cafe: 10 },
  nightOwl: { budget: 5, safety: 7, transit: 8, shopping: 8, nightlife: 10, quiet: 3, cafe: 7 }
};

// 页面加载初始化
document.addEventListener("DOMContentLoaded", () => {
  // 从 localStorage 读取 API 配置
  loadMapConfigFromStorage();
  loadPreferencesFromStorage();
  applyHashToState();
  
  // 初始化界面事件监听
  initCitySelector();
  applyRestoredCityUI();
  initSliders();
  initPresetButtons();
  applyRestoredPresetUI();
  initApiSettings();
  initComparisonDrawer();
  
  syncHashFromState();
  
  // 执行首次计算和渲染
  calculateRecommendations();
  showProviderSuggestion();
});

// 加载 localStorage 中的 API 密钥配置
function loadMapConfigFromStorage() {
  const savedConfig = localStorage.getItem("pickstay_map_config");
  if (savedConfig) {
    try {
      window.MAP_CONFIG = JSON.parse(savedConfig);
    } catch (e) {
      console.error("解析本地存储的地图配置失败", e);
    }
  }
}

// 保存 API 密钥配置到 localStorage
function saveMapConfigToStorage() {
  localStorage.setItem("pickstay_map_config", JSON.stringify(window.MAP_CONFIG));
}

const PREFERENCES_STORAGE_KEY = "pickstay_preferences";

// 从 localStorage 恢复用户偏好
function loadPreferencesFromStorage() {
  const saved = localStorage.getItem(PREFERENCES_STORAGE_KEY);
  if (!saved) return;
  try {
    const prefs = JSON.parse(saved);
    if (prefs.currentCityId && window.CITIES_DATA[prefs.currentCityId]) {
      state.currentCityId = prefs.currentCityId;
    }
    if (prefs.weights && typeof prefs.weights === "object") {
      state.weights = { ...state.weights, ...prefs.weights };
    }
    if (prefs.activePreset && PERSONA_PRESETS[prefs.activePreset]) {
      state.activePreset = prefs.activePreset;
    }
  } catch (e) {
    console.error("解析本地存储的偏好配置失败", e);
  }
}

// 保存用户偏好到 localStorage
function savePreferencesToStorage() {
  localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify({
    currentCityId: state.currentCityId,
    weights: state.weights,
    activePreset: state.activePreset
  }));
  syncHashFromState();
}

// 从 URL hash 恢复状态（优先级高于 localStorage）
function applyHashToState() {
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return;
  const params = new URLSearchParams(hash);
  const cityId = params.get("city");
  const preset = params.get("preset");
  if (cityId && window.CITIES_DATA[cityId]) {
    state.currentCityId = cityId;
  }
  if (preset && PERSONA_PRESETS[preset]) {
    state.activePreset = preset;
    state.weights = { ...PERSONA_PRESETS[preset] };
  }
}

// 将当前状态同步到 URL hash
function syncHashFromState() {
  const params = new URLSearchParams();
  params.set("city", state.currentCityId);
  if (state.activePreset) {
    params.set("preset", state.activePreset);
  }
  const newHash = `#${params.toString()}`;
  if (window.location.hash !== newHash) {
    history.replaceState(null, "", newHash);
  }
}

// 恢复城市选择 UI
function applyRestoredCityUI() {
  document.querySelectorAll(".city-card").forEach(card => {
    card.classList.toggle("active", card.dataset.city === state.currentCityId);
  });
}

// 恢复预设按钮 UI
function applyRestoredPresetUI() {
  document.querySelectorAll(".preset-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.preset === state.activePreset);
  });
}

// 根据当前地图 provider 或城市偏好生成地图链接
function getEffectiveMapProvider() {
  const active = window.MAP_CONFIG.activeProvider;
  if (active === "amap" || active === "google") return active;
  const cityData = window.CITIES_DATA[state.currentCityId];
  return cityData?.preferredProvider || "google";
}

function buildMapUrl(center, provider) {
  if (!center) return "#";
  if (provider === "amap") {
    return `https://uri.amap.com/marker?position=${center.lng},${center.lat}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`;
}

// 切换城市时提示建议的地图服务商
function showProviderSuggestion() {
  const cityData = window.CITIES_DATA[state.currentCityId];
  if (!cityData?.preferredProvider) return;
  const preferred = cityData.preferredProvider;
  const active = window.MAP_CONFIG.activeProvider;
  if (active === "mock" || active !== preferred) {
    const providerName = preferred === "amap" ? "高德地图" : "Google Maps";
    showApiStatusMessage(`建议切换为 ${providerName}，以获得 ${cityData.name} 的最佳地图体验`, "warning");
  }
}

// 1. 城市选择器初始化
function initCitySelector() {
  const cityCards = document.querySelectorAll(".city-card");
  cityCards.forEach(card => {
    card.addEventListener("click", () => {
      // 移除其他激活状态
      cityCards.forEach(c => c.classList.remove("active"));
      // 激活当前
      card.classList.add("active");
      state.currentCityId = card.dataset.city;
      
      // 清空对比和动态打分（切换城市时）
      state.comparisonList = [];
      updateComparisonDrawer();
      
      savePreferencesToStorage();
      showProviderSuggestion();
      
      // 如果配置了 API，尝试自动获取该城市街区的动态数据
      triggerDynamicApiAnalysis();
      
      calculateRecommendations();
    });
  });
}

// 2. 滑块滑块逻辑监听
function initSliders() {
  const sliders = document.querySelectorAll('.preference-slider');
  sliders.forEach(slider => {
    const key = slider.dataset.key;
    const valueDisplay = document.getElementById(`${key}-val`);
    
    // 设置初始值
    slider.value = state.weights[key];
    if (valueDisplay) valueDisplay.textContent = state.weights[key];
    
    slider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value);
      state.weights[key] = val;
      if (valueDisplay) valueDisplay.textContent = val;
      
      // 实时重新计算推荐并渲染
      calculateRecommendations();
      
      // 移除 Preset 按钮的 active 状态（因为用户手动改了）
      state.activePreset = null;
      document.querySelectorAll(".preset-btn").forEach(btn => btn.classList.remove("active"));
      savePreferencesToStorage();
    });
  });
}

// 3. 预设按钮事件
function initPresetButtons() {
  const presetButtons = document.querySelectorAll(".preset-btn");
  presetButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      presetButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const presetName = btn.dataset.preset;
      const targetWeights = PERSONA_PRESETS[presetName];
      if (targetWeights) {
        state.activePreset = presetName;
        // 更新全局状态权重
        state.weights = { ...targetWeights };
        
        // 同步修改滑块 UI
        Object.keys(state.weights).forEach(key => {
          const slider = document.querySelector(`.preference-slider[dataset-key="${key}"], [data-key="${key}"]`);
          const valueDisplay = document.getElementById(`${key}-val`);
          if (slider) slider.value = state.weights[key];
          if (valueDisplay) valueDisplay.textContent = state.weights[key];
        });
        
        savePreferencesToStorage();
        calculateRecommendations();
      }
    });
  });
}

// 4. API 设置与本地保存
function initApiSettings() {
  const apiToggleBtn = document.getElementById("toggle-api-settings");
  const apiModal = document.getElementById("api-settings-modal");
  const saveApiBtn = document.getElementById("save-api-keys");
  const closeApiBtn = document.getElementById("close-api-modal");
  
  // 表单输入框
  const providerSelect = document.getElementById("api-provider");
  const amapKeyInput = document.getElementById("amap-key");
  const amapSecInput = document.getElementById("amap-security");
  const googleKeyInput = document.getElementById("google-key");
  
  // 打开弹窗
  apiToggleBtn.addEventListener("click", () => {
    // 填充当前值
    providerSelect.value = window.MAP_CONFIG.activeProvider;
    amapKeyInput.value = window.MAP_CONFIG.amap.key || "";
    amapSecInput.value = window.MAP_CONFIG.amap.securityJsCode || "";
    googleKeyInput.value = window.MAP_CONFIG.google.apiKey || "";
    
    // 显示对应的输入框
    toggleKeyInputs(providerSelect.value);
    
    apiModal.classList.add("open");
  });
  
  // 切换服务商显示隐藏
  providerSelect.addEventListener("change", (e) => {
    toggleKeyInputs(e.target.value);
  });
  
  function toggleKeyInputs(provider) {
    const amapGroup = document.getElementById("amap-keys-group");
    const googleGroup = document.getElementById("google-keys-group");
    if (provider === "amap") {
      amapGroup.style.display = "block";
      googleGroup.style.display = "none";
    } else if (provider === "google") {
      amapGroup.style.display = "none";
      googleGroup.style.display = "block";
    } else {
      amapGroup.style.display = "none";
      googleGroup.style.display = "none";
    }
  }
  
  // 关闭弹窗
  closeApiBtn.addEventListener("click", () => {
    apiModal.classList.remove("open");
  });
  
  // 保存设置
  saveApiBtn.addEventListener("click", () => {
    window.MAP_CONFIG.activeProvider = providerSelect.value;
    window.MAP_CONFIG.amap.key = amapKeyInput.value.trim();
    window.MAP_CONFIG.amap.securityJsCode = amapSecInput.value.trim();
    window.MAP_CONFIG.google.apiKey = googleKeyInput.value.trim();
    
    saveMapConfigToStorage();
    apiModal.classList.remove("open");
    
    // 更新主界面 API 状态小组件
    updateApiStatusWidget();
    
    // 重新触发动态分析
    triggerDynamicApiAnalysis();
  });
  
  updateApiStatusWidget();
}

// 更新主界面上的 API 状态指示器
function updateApiStatusWidget() {
  const statusIndicator = document.getElementById("api-status-indicator");
  const providerText = document.getElementById("api-status-text");
  
  if (window.MAP_CONFIG.activeProvider === "mock") {
    statusIndicator.className = "status-badge status-mock";
    providerText.textContent = "本地 Mock 数据分析模式";
  } else if (window.MAP_CONFIG.activeProvider === "amap") {
    if (window.MAP_CONFIG.amap.key) {
      statusIndicator.className = "status-badge status-active";
      providerText.textContent = "高德地图 API 动态增强中";
    } else {
      statusIndicator.className = "status-badge status-warning";
      providerText.textContent = "高德地图 API 未填入 Key";
    }
  } else if (window.MAP_CONFIG.activeProvider === "google") {
    if (window.MAP_CONFIG.google.apiKey) {
      statusIndicator.className = "status-badge status-active";
      providerText.textContent = "Google 地图 API 动态增强中";
    } else {
      statusIndicator.className = "status-badge status-warning";
      providerText.textContent = "Google 地图 API 未填入 Key";
    }
  }
}

// 5. 核心算法：推荐得分计算
function calculateRecommendations() {
  const cityData = window.CITIES_DATA[state.currentCityId];
  if (!cityData) return;
  
  const totalWeight = Object.values(state.weights).reduce((sum, w) => sum + w, 0);
  
  const scoredNeighborhoods = cityData.neighborhoods.map(neighborhood => {
    // 优先读取 API 动态获取的分数，若无则使用本地默认分数
    const scores = { ...neighborhood.scores };
    const dynamic = state.dynamicScores[neighborhood.id];
    
    if (dynamic) {
      if (dynamic.cafe !== undefined) scores.cafe = dynamic.cafe;
      if (dynamic.transit !== undefined) scores.transit = dynamic.transit;
      if (dynamic.shopping !== undefined) scores.shopping = dynamic.shopping;
    }
    
    // 核心评分逻辑: 加权得分 (0 - 100)
    let weightedSum = 0;
    if (totalWeight > 0) {
      Object.keys(state.weights).forEach(key => {
        weightedSum += state.weights[key] * (scores[key] || 0);
      });
    }
    
    const matchScore = totalWeight > 0 ? Math.round((weightedSum / (totalWeight * 10)) * 100) : 0;
    
    return {
      ...neighborhood,
      computedScores: scores,
      matchScore: matchScore
    };
  });
  
  // 按得分降序排列
  scoredNeighborhoods.sort((a, b) => b.matchScore - a.matchScore);
  
  // 渲染卡片列表
  renderNeighborhoodList(scoredNeighborhoods);
}

// 6. 渲染推荐街区卡片列表
function renderNeighborhoodList(neighborhoods) {
  const listContainer = document.getElementById("recommendations-list");
  listContainer.innerHTML = "";
  
  if (neighborhoods.length === 0) {
    listContainer.innerHTML = '<div class="no-results">暂无区域数据。</div>';
    return;
  }
  
  neighborhoods.forEach((item, index) => {
    const isCompared = state.comparisonList.includes(item.id);
    const card = document.createElement("div");
    card.className = "neighborhood-card animate-fade-in";
    card.style.animationDelay = `${index * 80}ms`;
    
    // 评分色彩分级
    let scoreClass = "score-high";
    if (item.matchScore < 60) scoreClass = "score-low";
    else if (item.matchScore < 80) scoreClass = "score-med";
    
    // 生成卡片 HTML
    const mapProvider = getEffectiveMapProvider();
    const mapUrl = buildMapUrl(item.center, mapProvider);
    const mapLabel = mapProvider === "amap" ? "高德" : "Google";
    card.innerHTML = `
      <div class="card-header-bar">
        <span class="rank-badge">#${index + 1}</span>
        <span class="match-badge ${scoreClass}">契合度 ${item.matchScore}%</span>
      </div>
      <div class="card-body">
        <h3 class="neighborhood-title">${item.name}</h3>
        <p class="neighborhood-tagline">“${item.tagline}”</p>
        
        <!-- 7维度简易进度条展示 -->
        <div class="mini-dimensions-grid">
          <div class="mini-dim" title="安静静谧: ${item.computedScores.quiet}/10">🤫 ${item.computedScores.quiet}</div>
          <div class="mini-dim" title="安全环境: ${item.computedScores.safety}/10">🛡️ ${item.computedScores.safety}</div>
          <div class="mini-dim" title="交通便利: ${item.computedScores.transit}/10">🚇 ${item.computedScores.transit}</div>
          <div class="mini-dim" title="美食购物: ${item.computedScores.shopping}/10">🛍️ ${item.computedScores.shopping}</div>
          <div class="mini-dim" title="夜生活: ${item.computedScores.nightlife}/10">✨ ${item.computedScores.nightlife}</div>
          <div class="mini-dim" title="预算友好: ${item.computedScores.budget}/10">💰 ${item.computedScores.budget}</div>
          <div class="mini-dim highlight-cafe" title="咖啡/Chill: ${item.computedScores.cafe}/10">☕ ${item.computedScores.cafe}</div>
        </div>
        
        <p class="pros-summary"><strong>优势：</strong>${item.pros[0]}，${item.pros[1] || ''}</p>
        
        <div class="card-footer">
          <span class="price-indicator">${item.priceLevel}</span>
          <div class="card-actions">
            <a class="btn-map-link" href="${mapUrl}" target="_blank" rel="noopener noreferrer" title="在${mapLabel}地图中打开">🗺️ 地图</a>
            <button class="btn-secondary btn-compare" data-id="${item.id}">
              ${isCompared ? "取消对比" : "加入对比"}
            </button>
            <button class="btn-primary btn-detail" data-id="${item.id}">查看详情</button>
          </div>
        </div>
      </div>
    `;
    
    // 绑定事件
    card.querySelector(".btn-detail").addEventListener("click", () => showNeighborhoodDetails(item.id));
    
    const compareBtn = card.querySelector(".btn-compare");
    compareBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleComparison(item.id);
    });
    
    listContainer.appendChild(card);
  });
}

// 7. 展示地区详情模态框
function showNeighborhoodDetails(id) {
  const cityData = window.CITIES_DATA[state.currentCityId];
  if (!cityData) return;
  const neighborhood = cityData.neighborhoods.find(n => n.id === id);
  if (!neighborhood) return;
  
  // 查找计算好的匹配分和最终维度分
  const scores = { ...neighborhood.scores };
  const dynamic = state.dynamicScores[neighborhood.id];
  if (dynamic) {
    if (dynamic.cafe !== undefined) scores.cafe = dynamic.cafe;
    if (dynamic.transit !== undefined) scores.transit = dynamic.transit;
    if (dynamic.shopping !== undefined) scores.shopping = dynamic.shopping;
  }
  
  const totalWeight = Object.values(state.weights).reduce((sum, w) => sum + w, 0);
  let weightedSum = 0;
  if (totalWeight > 0) {
    Object.keys(state.weights).forEach(key => {
      weightedSum += state.weights[key] * (scores[key] || 0);
    });
  }
  const matchScore = totalWeight > 0 ? Math.round((weightedSum / (totalWeight * 10)) * 100) : 0;
  
  // 准备弹窗 DOM
  const modal = document.getElementById("detail-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalTagline = document.getElementById("modal-tagline");
  const modalDesc = document.getElementById("modal-desc");
  const modalPros = document.getElementById("modal-pros");
  const modalCons = document.getElementById("modal-cons");
  const modalBestFor = document.getElementById("modal-best-for");
  const modalPrice = document.getElementById("modal-price");
  const matchPercent = document.getElementById("modal-match-percent");
  
  modalTitle.textContent = neighborhood.name;
  modalTagline.textContent = `“${neighborhood.tagline}”`;
  modalDesc.textContent = neighborhood.detailText || "暂无详细描述。";
  modalBestFor.textContent = neighborhood.bestFor;
  modalPrice.textContent = neighborhood.priceLevel;
  matchPercent.textContent = `契合度 ${matchScore}%`;
  
  const mapProvider = getEffectiveMapProvider();
  const modalMapLink = document.getElementById("modal-map-link");
  if (modalMapLink) {
    modalMapLink.href = buildMapUrl(neighborhood.center, mapProvider);
    modalMapLink.textContent = mapProvider === "amap" ? "🗺️ 在高德地图中打开" : "🗺️ 在 Google 地图中打开";
  }
  
  // 渲染优势与劣势
  modalPros.innerHTML = neighborhood.pros.map(pro => `<li>✅ ${pro}</li>`).join("");
  modalCons.innerHTML = neighborhood.cons.map(con => `<li>❌ ${con}</li>`).join("");
  
  // 绘制 SVG 雷达图
  drawRadarChart("radar-chart-container", scores, state.weights);
  
  // 如果处于 API 模式，显示 API 实测周边状态
  const apiSection = document.getElementById("modal-api-status");
  if (dynamic) {
    apiSection.style.display = "block";
    apiSection.innerHTML = `
      <div class="api-realtime-badge">
        <span>📍 地图 API 动态分析实测 (1.5km 范围内):</span>
        <ul>
          <li>☕️ 精致咖啡店数: <strong>${dynamic.rawCafeCount || 0}</strong> 家 (打分: ${dynamic.cafe}/10)</li>
          <li>🚇 核心地铁/交通点: <strong>${dynamic.rawTransitCount || 0}</strong> 个 (打分: ${dynamic.transit}/10)</li>
          <li>🛍️ 餐饮购物配套商圈数: <strong>${dynamic.rawShoppingCount || 0}</strong> 个 (打分: ${dynamic.shopping}/10)</li>
        </ul>
      </div>
    `;
  } else {
    apiSection.style.display = "none";
  }
  
  modal.classList.add("open");
  
  // 关闭弹窗监听
  const closeBtn = document.getElementById("close-detail-modal");
  const closeHandler = () => {
    modal.classList.remove("open");
    closeBtn.removeEventListener("click", closeHandler);
  };
  closeBtn.addEventListener("click", closeHandler);
}

// 8. 绘制精美、自适应的 SVG 雷达图 (Radar Chart)
function drawRadarChart(containerId, scores, weights) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  
  const width = 320;
  const height = 320;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 100; // 满分 10 分的像素距离
  
  // 7维定义
  const dims = [
    { key: "safety", label: "🛡️ 安全环境" },
    { key: "transit", label: "🚇 交通便利" },
    { key: "shopping", label: "🛍️ 美食购物" },
    { key: "nightlife", label: "✨ 夜生活" },
    { key: "quiet", label: "🤫 安静舒适" },
    { key: "budget", label: "💰 预算友好" },
    { key: "cafe", label: "☕ 咖啡/Chill" }
  ];
  
  const angleStep = (Math.PI * 2) / dims.length;
  
  // 计算顶点坐标的辅助函数 (0点朝上，按顺时针旋转)
  const getCoordinates = (index, value) => {
    const angle = angleStep * index - Math.PI / 2;
    const distance = (value / 10) * radius;
    return {
      x: centerX + Math.cos(angle) * distance,
      y: centerY + Math.sin(angle) * distance
    };
  };
  
  // 1. 创建网格背景 (圆形雷达线，每 2 分一圈，共 5 圈)
  let gridSvg = "";
  for (let i = 2; i <= 10; i += 2) {
    const r = (i / 10) * radius;
    gridSvg += `<circle cx="${centerX}" cy="${centerY}" r="${r}" fill="none" stroke="rgba(15, 23, 42, 0.08)" stroke-width="1" />`;
    // 刻度数值
    gridSvg += `<text x="${centerX}" y="${centerY - r + 3}" font-size="8" fill="rgba(15, 23, 42, 0.35)" text-anchor="middle">${i}</text>`;
  }
  
  // 2. 绘制轴线和文字
  let axisSvg = "";
  let textSvg = "";
  dims.forEach((dim, index) => {
    // 满分终点
    const endCoord = getCoordinates(index, 10);
    axisSvg += `<line x1="${centerX}" y1="${centerY}" x2="${endCoord.x}" y2="${endCoord.y}" stroke="rgba(15, 23, 42, 0.08)" stroke-width="1.5" />`;
    
    // 文字摆放位置偏外侧一点
    const labelDistance = radius + 22;
    const angle = angleStep * index - Math.PI / 2;
    const textX = centerX + Math.cos(angle) * labelDistance;
    const textY = centerY + Math.sin(angle) * labelDistance + 4;
    
    // 决定文字对齐方式
    let anchor = "middle";
    if (Math.cos(angle) > 0.1) anchor = "start";
    else if (Math.cos(angle) < -0.1) anchor = "end";
    
    textSvg += `<text x="${textX}" y="${textY}" fill="#475569" font-size="10.5" text-anchor="${anchor}">${dim.label}</text>`;
  });
  
  // 3. 绘制街区评分折线区域
  const areaPoints = dims.map((dim, idx) => {
    const val = scores[dim.key] || 0;
    const coord = getCoordinates(idx, val);
    return `${coord.x},${coord.y}`;
  }).join(" ");
  
  // 4. 绘制用户期望折线区域（对比）
  const expectedPoints = dims.map((dim, idx) => {
    const val = weights[dim.key] || 0;
    const coord = getCoordinates(idx, val);
    return `${coord.x},${coord.y}`;
  }).join(" ");
  
  // 整合完整 SVG
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <radialGradient id="grad-area" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(13, 148, 136, 0.1)" />
          <stop offset="100%" stop-color="rgba(14, 165, 233, 0.45)" />
        </radialGradient>
      </defs>
      
      <!-- 雷达网格 background -->
      ${gridSvg}
      ${axisSvg}
      
      <!-- 期望范围 polygon (虚线边框，轻微发光) -->
      <polygon points="${expectedPoints}" fill="none" stroke="#2563eb" stroke-dasharray="3,3" stroke-width="2" opacity="0.8" />
      
      <!-- 实际评分 polygon -->
      <polygon points="${areaPoints}" fill="url(#grad-area)" stroke="#0d9488" stroke-width="2.5" />
      
      <!-- 实际评分折点小圆圈 -->
      ${dims.map((dim, idx) => {
        const val = scores[dim.key] || 0;
        const coord = getCoordinates(idx, val);
        return `<circle cx="${coord.x}" cy="${coord.y}" r="3.5" fill="#ffffff" stroke="#0d9488" stroke-width="2" />`;
      }).join("")}
      
      <!-- 维度文字 -->
      ${textSvg}
    </svg>
  `;
  
  container.innerHTML = svg;
}

// 9. 对比栏功能逻辑
function initComparisonDrawer() {
  const drawerHeader = document.getElementById("compare-drawer-header");
  const drawer = document.getElementById("compare-drawer");
  
  if (drawerHeader && drawer) {
    drawerHeader.addEventListener("click", () => {
      drawer.classList.toggle("open");
    });
  }
  
  const closeBtn = document.getElementById("close-compare-drawer");
  if (closeBtn && drawer) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      drawer.classList.remove("open");
    });
  }
}

// 切换对比状态
function toggleComparison(neighborhoodId) {
  const index = state.comparisonList.indexOf(neighborhoodId);
  if (index === -1) {
    if (state.comparisonList.length >= 3) {
      alert("最多支持同时对比 3 个街区！");
      return;
    }
    state.comparisonList.push(neighborhoodId);
  } else {
    state.comparisonList.splice(index, 1);
  }
  
  // 更新对比栏界面与主卡片的按钮文字
  updateComparisonDrawer();
  calculateRecommendations(); // 重新渲染主列表更新按钮状态
}

// 渲染/更新底部对比栏
function updateComparisonDrawer() {
  const drawer = document.getElementById("compare-drawer");
  const drawerBody = document.getElementById("compare-drawer-body");
  const countBadge = document.getElementById("compare-count-badge");
  
  // 更新徽章数字
  countBadge.textContent = state.comparisonList.length;
  
  if (state.comparisonList.length === 0) {
    drawerBody.innerHTML = `<div class="empty-compare">暂无选中对比街区，在推荐卡片中点击“加入对比”。</div>`;
    // 隐藏/收回 Drawer
    drawer.classList.remove("open");
    return;
  }
  
  // 查找选中街区的数据
  const cityData = window.CITIES_DATA[state.currentCityId];
  if (!cityData) return;
  
  const selectedNeighborhoods = state.comparisonList.map(id => {
    const neighborhood = cityData.neighborhoods.find(n => n.id === id);
    // 附加实时分
    const scores = { ...neighborhood.scores };
    const dynamic = state.dynamicScores[id];
    if (dynamic) {
      if (dynamic.cafe !== undefined) scores.cafe = dynamic.cafe;
      if (dynamic.transit !== undefined) scores.transit = dynamic.transit;
      if (dynamic.shopping !== undefined) scores.shopping = dynamic.shopping;
    }
    
    // 重新计算契合度
    const totalWeight = Object.values(state.weights).reduce((sum, w) => sum + w, 0);
    let weightedSum = 0;
    if (totalWeight > 0) {
      Object.keys(state.weights).forEach(key => {
        weightedSum += state.weights[key] * (scores[key] || 0);
      });
    }
    const matchScore = totalWeight > 0 ? Math.round((weightedSum / (totalWeight * 10)) * 100) : 0;
    
    return {
      ...neighborhood,
      scores,
      matchScore
    };
  });
  
  // 自动弹出抽屉展示
  drawer.classList.add("open");
  
  // 构建对比表格结构
  let tableHeader = `<th>特性 / 街区</th>`;
  let scoreRows = {
    match: `<tr><td><strong>契合度 %</strong></td>`,
    price: `<tr><td><strong>平均消费</strong></td>`,
    safety: `<tr><td>🛡️ 安全环境</td>`,
    transit: `<tr><td>🚇 交通便利</td>`,
    shopping: `<tr><td>🛍️ 美食购物</td>`,
    cafe: `<tr><td>☕ 咖啡/Chill</td>`,
    quiet: `<tr><td>🤫 安静舒适</td>`,
    nightlife: `<tr><td>✨ 夜生活</td>`,
    budget: `<tr><td>💰 预算友好</td>`,
    pros: `<tr><td>✅ 优势</td>`,
    cons: `<tr><td>❌ 劣势</td>`,
    actions: `<tr><td>操作</td>`
  };
  
  selectedNeighborhoods.forEach(n => {
    tableHeader += `<th>${n.name}</th>`;
    scoreRows.match += `<td><span class="compare-match">${n.matchScore}%</span></td>`;
    scoreRows.price += `<td>${n.priceLevel}</td>`;
    scoreRows.safety += `<td>${n.scores.safety}/10</td>`;
    scoreRows.transit += `<td>${n.scores.transit}/10</td>`;
    scoreRows.shopping += `<td>${n.scores.shopping}/10</td>`;
    scoreRows.cafe += `<td><span class="highlight-compare-cafe">${n.scores.cafe}/10</span></td>`;
    scoreRows.quiet += `<td>${n.scores.quiet}/10</td>`;
    scoreRows.nightlife += `<td>${n.scores.nightlife}/10</td>`;
    scoreRows.budget += `<td>${n.scores.budget}/10</td>`;
    
    scoreRows.pros += `<td><ul class="compare-bullets">${n.pros.map(p => `<li>${p}</li>`).join("")}</ul></td>`;
    scoreRows.cons += `<td><ul class="compare-bullets">${n.cons.map(c => `<li>${c}</li>`).join("")}</ul></td>`;
    
    scoreRows.actions += `<td><button class="btn-compare-remove" onclick="window.removeCompareItem('${n.id}')">移除</button></td>`;
  });
  
  tableHeader += ``;
  Object.keys(scoreRows).forEach(key => {
    scoreRows[key] += `</tr>`;
  });
  
  const tableHtml = `
    <div class="table-responsive">
      <table class="compare-table">
        <thead>
          <tr>${tableHeader}</tr>
        </thead>
        <tbody>
          ${scoreRows.match}
          ${scoreRows.price}
          ${scoreRows.cafe}
          ${scoreRows.transit}
          ${scoreRows.shopping}
          ${scoreRows.safety}
          ${scoreRows.quiet}
          ${scoreRows.nightlife}
          ${scoreRows.budget}
          ${scoreRows.pros}
          ${scoreRows.cons}
          ${scoreRows.actions}
        </tbody>
      </table>
    </div>
  `;
  
  drawerBody.innerHTML = tableHtml;
}

// 注册全局移除方法，方便对比表内移除按钮调用
window.removeCompareItem = function(id) {
  toggleComparison(id);
};

// 10. 地图 API 动态分析逻辑 (Google Maps 与高德 API 脚本动态加载)
function triggerDynamicApiAnalysis() {
  const provider = window.MAP_CONFIG.activeProvider;
  
  // 每次城市切换或保存 Key 时清除当前城市的动态数据
  state.dynamicScores = {};
  
  if (provider === "mock") {
    // mock 模式不拉取接口
    calculateRecommendations();
    return;
  }
  
  showApiStatusMessage("正在通过地图 API 实测周边设施...", "loading");
  
  if (provider === "amap") {
    const key = window.MAP_CONFIG.amap.key;
    const security = window.MAP_CONFIG.amap.securityJsCode;
    
    if (!key) {
      showApiStatusMessage("未配置高德地图 API Key，已自动使用本地数据。", "warning");
      return;
    }
    
    // 设置高德安全密钥
    window._AMapSecurityConfig = { securityJsCode: security };
    
    loadAmapSdk(key).then(() => {
      fetchAmapNeighborhoodsData();
    }).catch(err => {
      console.error(err);
      showApiStatusMessage("高德 API 加载失败，请检查网络与 Key 权限。", "error");
    });
  } else if (provider === "google") {
    const key = window.MAP_CONFIG.google.apiKey;
    
    if (!key) {
      showApiStatusMessage("未配置 Google Maps API Key，已自动使用本地数据。", "warning");
      return;
    }
    
    loadGoogleSdk(key).then(() => {
      fetchGoogleNeighborhoodsData();
    }).catch(err => {
      console.error(err);
      showApiStatusMessage("Google API 加载失败，请检查网络与 Key 权限。", "error");
    });
  }
}

// 显示 API 通用提示横幅
function showApiStatusMessage(msg, type) {
  const banner = document.getElementById("api-status-banner");
  if (!banner) return;
  
  banner.className = `api-banner api-banner-${type}`;
  banner.innerHTML = `
    <span class="banner-icon">${type === 'loading' ? '⏳' : type === 'active' ? '✅' : '⚠️'}</span>
    <span class="banner-text">${msg}</span>
  `;
  banner.style.display = "flex";
  
  // 成功或警告状态可在 5 秒后消失
  if (type === "active" || type === "warning") {
    setTimeout(() => {
      if (banner.className.includes(`api-banner-${type}`)) {
        banner.style.display = "none";
      }
    }, 6000);
  }
}

// 动态加载高德地图 JS SDK
function loadAmapSdk(key) {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve();
      return;
    }
    
    // 清理可能已有的 script
    const existing = document.getElementById("amap-js-sdk");
    if (existing) existing.remove();
    
    const script = document.createElement("script");
    script.id = "amap-js-sdk";
    script.type = "text/javascript";
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${key}`;
    script.onload = () => {
      // 检查 AMap 对象是否生成
      if (window.AMap) {
        resolve();
      } else {
        reject(new Error("高德 SDK 加载异常"));
      }
    };
    script.onerror = () => reject(new Error("高德 SDK 加载网络错误"));
    document.head.appendChild(script);
  });
}

// 动态加载 Google 地图 JS SDK
function loadGoogleSdk(key) {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve();
      return;
    }
    
    const existing = document.getElementById("google-js-sdk");
    if (existing) existing.remove();
    
    const script = document.createElement("script");
    script.id = "google-js-sdk";
    script.type = "text/javascript";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
    script.onload = () => {
      if (window.google && window.google.maps) {
        resolve();
      } else {
        reject(new Error("Google Maps SDK 加载异常"));
      }
    };
    script.onerror = () => reject(new Error("Google Maps SDK 网络加载失败"));
    document.head.appendChild(script);
  });
}

// 高德地图：多街区并发 POI 查询并重算分数
function fetchAmapNeighborhoodsData() {
  const cityData = window.CITIES_DATA[state.currentCityId];
  if (!cityData) return;
  
  AMap.plugin(["AMap.PlaceSearch"], () => {
    const promises = cityData.neighborhoods.map(n => {
      // 在 1500m 范围内查询地铁、餐饮商场、咖啡馆
      return Promise.all([
        queryAmapPoi(n.center, "地铁站", 1500),
        queryAmapPoi(n.center, "商场|超级市场|百货", 1500),
        queryAmapPoi(n.center, "咖啡厅", 1500)
      ]).then(([transitCount, shoppingCount, cafeCount]) => {
        // 计算映射后的 1-10 分（高德一般能搜出数十个，所以做一个对数或系数缩放）
        // 映射逻辑：比如 20 个咖啡馆即打满分 10 分，地铁站 5 个打满分，商圈 8 个打满分
        state.dynamicScores[n.id] = {
          rawCafeCount: cafeCount,
          rawTransitCount: transitCount,
          rawShoppingCount: shoppingCount,
          cafe: Math.min(10, Math.max(2, Math.round((cafeCount / 20) * 10))),
          transit: Math.min(10, Math.max(2, Math.round((transitCount / 5) * 10))),
          shopping: Math.min(10, Math.max(2, Math.round((shoppingCount / 8) * 10)))
        };
      }).catch(e => {
        console.warn(`街区 ${n.name} 地图数据查询失败`, e);
      });
    });
    
    Promise.all(promises).then(() => {
      showApiStatusMessage("高德 API 实时增强计算完成！", "active");
      calculateRecommendations();
    });
  });
}

// 高德 POI 检索辅助封装
function queryAmapPoi(center, type, radius) {
  return new Promise((resolve) => {
    const placeSearch = new AMap.PlaceSearch({
      pageSize: 50,
      pageIndex: 1,
      type: type
    });
    
    const c = new AMap.LngLat(center.lng, center.lat);
    placeSearch.searchNearBy("", c, radius, (status, result) => {
      if (status === "complete" && result.info === "OK") {
        resolve(result.poiList.count || result.poiList.pois.length || 0);
      } else {
        resolve(0);
      }
    });
  });
}

// Google 地图：多街区并发 POI 查询并重算分数
function fetchGoogleNeighborhoodsData() {
  const cityData = window.CITIES_DATA[state.currentCityId];
  if (!cityData) return;
  
  // 创建一个隐藏的 Map DOM 对象，Google PlacesService 实例化必须传入一个 DOM 或 map 实例
  let dummyDiv = document.getElementById("dummy-map-container");
  if (!dummyDiv) {
    dummyDiv = document.createElement("div");
    dummyDiv.id = "dummy-map-container";
    dummyDiv.style.display = "none";
    document.body.appendChild(dummyDiv);
  }
  const map = new google.maps.Map(dummyDiv, {
    center: cityData.center,
    zoom: 12
  });
  
  const service = new google.maps.places.PlacesService(map);
  
  const promises = cityData.neighborhoods.map(n => {
    const c = new google.maps.LatLng(n.center.lat, n.center.lng);
    return Promise.all([
      queryGooglePoi(service, c, "subway_station", 1500),
      queryGooglePoi(service, c, "shopping_mall", 1500),
      queryGooglePoi(service, c, "cafe", 1500)
    ]).then(([transitCount, shoppingCount, cafeCount]) => {
      // 映射逻辑：Google 限制单次检索最多返回 20-60 个，按 20 个封顶换算 1-10 分
      state.dynamicScores[n.id] = {
        rawCafeCount: cafeCount,
        rawTransitCount: transitCount,
        rawShoppingCount: shoppingCount,
        cafe: Math.min(10, Math.max(2, Math.round((cafeCount / 20) * 10))),
        transit: Math.min(10, Math.max(2, Math.round((transitCount / 4) * 10))),
        shopping: Math.min(10, Math.max(2, Math.round((shoppingCount / 6) * 10)))
      };
    }).catch(e => {
      console.warn(`街区 ${n.name} Google 地图数据查询失败`, e);
    });
  });
  
  Promise.all(promises).then(() => {
    showApiStatusMessage("Google API 实时增强计算完成！", "active");
    calculateRecommendations();
  });
}

// Google Places POI 检索辅助封装
function queryGooglePoi(service, centerLatlng, type, radius) {
  return new Promise((resolve) => {
    service.nearbySearch({
      location: centerLatlng,
      radius: radius,
      type: type
    }, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        resolve(results.length || 0);
      } else {
        resolve(0);
      }
    });
  });
}
