"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import { CitySelector } from "@/components/CitySelector";
import { ComparisonDrawer } from "@/components/ComparisonDrawer";
import { NeighborhoodCard } from "@/components/NeighborhoodCard";
import { NeighborhoodDetail } from "@/components/NeighborhoodDetail";
import { PersonaPresets } from "@/components/PersonaPresets";
import { PreferenceSliders } from "@/components/PreferenceSliders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { rankNeighborhoods } from "@/lib/recommendation/engine";
import { DEFAULT_WEIGHTS, PERSONA_PRESETS } from "@/lib/recommendation/presets";
import type {
  City,
  DynamicScores,
  PersonaPresetId,
  Weights,
} from "@/lib/recommendation/types";
import { savePreferences } from "@/lib/actions/user";
import { cn } from "@/lib/utils";

const PREFERENCES_KEY = "pickstay_preferences";

interface ExploreClientProps {
  cities: City[];
  initialCityId?: string;
  initialPreset?: PersonaPresetId | null;
  isAuthenticated?: boolean;
}

function loadLocalPreferences() {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(PREFERENCES_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveLocalPreferences(data: {
  currentCityId: string;
  weights: Weights;
  activePreset: PersonaPresetId | null;
}) {
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(data));
}

function resolveInitialWeights(initialPreset?: PersonaPresetId | null): {
  weights: Weights;
  activePreset: PersonaPresetId | null;
} {
  if (initialPreset && PERSONA_PRESETS[initialPreset]) {
    return { weights: PERSONA_PRESETS[initialPreset], activePreset: initialPreset };
  }
  const local = loadLocalPreferences();
  if (local?.weights) {
    return {
      weights: { ...DEFAULT_WEIGHTS, ...local.weights },
      activePreset: local.activePreset ?? null,
    };
  }
  return { weights: DEFAULT_WEIGHTS, activePreset: null };
}

function buildExplorePath(cityId: string, preset: PersonaPresetId | null) {
  const params = new URLSearchParams();
  if (preset) params.set("preset", preset);
  const query = params.toString();
  return `/explore/${cityId}${query ? `?${query}` : ""}`;
}

function replaceExploreUrl(cityId: string, preset: PersonaPresetId | null) {
  const nextUrl = buildExplorePath(cityId, preset);
  window.history.replaceState(window.history.state, "", nextUrl);
}

export function ExploreClient({
  cities,
  initialCityId = "tokyo",
  initialPreset = null,
  isAuthenticated = false,
}: ExploreClientProps) {
  const initial = resolveInitialWeights(initialPreset);

  const [cityId, setCityId] = useState(initialCityId);
  const [weights, setWeights] = useState<Weights>(initial.weights);
  const [activePreset, setActivePreset] = useState<PersonaPresetId | null>(
    initial.activePreset
  );
  const [comparisonIds, setComparisonIds] = useState<string[]>([]);
  const [dynamicScores, setDynamicScores] = useState<Record<string, DynamicScores>>({});
  const [detailId, setDetailId] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<string | null>(null);
  const [isEnriching, setIsEnriching] = useState(false);
  const enrichRequestId = useRef(0);

  const city = useMemo(
    () => cities.find((c) => c.id === cityId) ?? cities[0],
    [cities, cityId]
  );

  const mapProvider =
    city?.preferredProvider === "amap" ? "amap" : "google";

  const ranked = useMemo(
    () =>
      city
        ? rankNeighborhoods(city.neighborhoods, weights, dynamicScores)
        : [],
    [city, weights, dynamicScores]
  );

  const comparisonNeighborhoods = ranked.filter((n) =>
    comparisonIds.includes(n.id)
  );

  const detailNeighborhood = ranked.find((n) => n.id === detailId) ?? null;

  const persistPreferences = useCallback(
    (nextCityId: string, nextWeights: Weights, nextPreset: PersonaPresetId | null) => {
      saveLocalPreferences({
        currentCityId: nextCityId,
        weights: nextWeights,
        activePreset: nextPreset,
      });

      if (isAuthenticated) {
        savePreferences(nextCityId, nextWeights, nextPreset);
      }

      replaceExploreUrl(nextCityId, nextPreset);
    },
    [isAuthenticated]
  );

  const enrichMapData = useCallback(async (targetCityId: string) => {
    const requestId = ++enrichRequestId.current;
    setIsEnriching(true);
    setApiStatus("正在通过地图 API 实测周边设施...");
    try {
      const res = await fetch("/api/maps/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cityId: targetCityId }),
      });
      const data = await res.json();
      if (requestId !== enrichRequestId.current) return;

      if (data.dynamicScores && Object.keys(data.dynamicScores).length > 0) {
        setDynamicScores(data.dynamicScores);
        setApiStatus(`${data.provider} API 实时增强完成`);
      } else {
        setApiStatus("使用本地预置评分（Mock 模式或未配置 API Key）");
      }
    } catch {
      if (requestId === enrichRequestId.current) {
        setApiStatus("API 增强失败，已使用本地数据");
      }
    } finally {
      if (requestId === enrichRequestId.current) {
        setIsEnriching(false);
        setTimeout(() => setApiStatus(null), 6000);
      }
    }
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const match = window.location.pathname.match(/\/explore\/([^/]+)/);
      if (match?.[1]) {
        setCityId(match[1]);
        setDynamicScores({});
        setComparisonIds([]);
      }
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    void enrichMapData(cityId);
  }, [cityId, enrichMapData]);

  const handleCityChange = (nextCityId: string) => {
    setCityId(nextCityId);
    setDynamicScores({});
    setComparisonIds([]);
    persistPreferences(nextCityId, weights, activePreset);
  };

  const handleWeightsChange = (nextWeights: Weights) => {
    setWeights(nextWeights);
    setActivePreset(null);
    persistPreferences(cityId, nextWeights, null);
  };

  const handlePresetSelect = (
    preset: PersonaPresetId,
    presetWeights: Weights
  ) => {
    setActivePreset(preset);
    setWeights(presetWeights);
    persistPreferences(cityId, presetWeights, preset);
  };

  const toggleComparison = (id: string) => {
    setComparisonIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  return (
    <div className="pb-32">
      {apiStatus && (
        <div className="mb-4 rounded-2xl border border-apple-blue/20 bg-[#e8f4fd] px-4 py-3 text-sm text-apple-blue transition-opacity duration-300">
          {isEnriching && (
            <RefreshCw className="mr-2 inline h-3.5 w-3.5 animate-spin" />
          )}
          {apiStatus}
        </div>
      )}

      <section className="mb-8">
        <h2 className="mb-3 font-display text-xl font-semibold text-apple-text">选择城市</h2>
        <CitySelector
          cities={cities}
          selectedCityId={cityId}
          onSelect={handleCityChange}
        />
        {city && (
          <p className="mt-3 text-sm leading-relaxed text-apple-text-secondary">{city.description}</p>
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>旅行人格预设</CardTitle>
            </CardHeader>
            <CardContent>
              <PersonaPresets
                activePreset={activePreset}
                onSelect={handlePresetSelect}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>偏好权重</CardTitle>
            </CardHeader>
            <CardContent>
              <PreferenceSliders weights={weights} onChange={handleWeightsChange} />
            </CardContent>
          </Card>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => enrichMapData(cityId)}
            disabled={isEnriching}
          >
            <RefreshCw className={cn("h-4 w-4", isEnriching && "animate-spin")} />
            {isEnriching ? "分析中..." : "刷新地图数据"}
          </Button>
        </aside>

        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-apple-text">
            推荐街区 · {city?.name}
          </h2>
          <div key={cityId} className="space-y-4">
            {ranked.map((n, i) => (
              <NeighborhoodCard
                key={n.id}
                neighborhood={n}
                rank={i + 1}
                weights={weights}
                mapProvider={mapProvider}
                isCompared={comparisonIds.includes(n.id)}
                onDetail={() => setDetailId(n.id)}
                onCompare={() => toggleComparison(n.id)}
              />
            ))}
          </div>
        </section>
      </div>

      <NeighborhoodDetail
        neighborhood={detailNeighborhood}
        weights={weights}
        dynamic={detailId ? dynamicScores[detailId] : undefined}
        mapProvider={mapProvider}
        open={!!detailId}
        onOpenChange={(open) => !open && setDetailId(null)}
      />

      <ComparisonDrawer
        neighborhoods={comparisonNeighborhoods}
        weights={weights}
        onRemove={toggleComparison}
        onClear={() => setComparisonIds([])}
      />
    </div>
  );
}
