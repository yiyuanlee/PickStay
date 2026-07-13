"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadarChart } from "@/components/RadarChart";
import { Button } from "@/components/ui/button";
import { buildMapUrl } from "@/lib/recommendation/engine";
import type {
  DynamicScores,
  ScoredNeighborhood,
  Weights,
} from "@/lib/recommendation/types";

interface NeighborhoodDetailProps {
  neighborhood: ScoredNeighborhood | null;
  weights: Weights;
  dynamic?: DynamicScores;
  mapProvider: "google" | "amap";
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NeighborhoodDetail({
  neighborhood,
  weights,
  dynamic,
  mapProvider,
  open,
  onOpenChange,
}: NeighborhoodDetailProps) {
  if (!neighborhood) return null;

  const mapUrl = buildMapUrl(neighborhood.center, mapProvider);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{neighborhood.name}</DialogTitle>
          <p className="text-sm italic text-slate-500">&ldquo;{neighborhood.tagline}&rdquo;</p>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-600">
              {neighborhood.detailText}
            </p>
            <div className="rounded-xl bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800">
              契合度 {neighborhood.matchScore}%
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-slate-700">优势</h4>
              <ul className="space-y-1 text-sm text-slate-600">
                {neighborhood.pros.map((pro) => (
                  <li key={pro}>✅ {pro}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-slate-700">劣势</h4>
              <ul className="space-y-1 text-sm text-slate-600">
                {neighborhood.cons.map((con) => (
                  <li key={con}>❌ {con}</li>
                ))}
              </ul>
            </div>
            <div className="text-sm text-slate-600">
              <p><strong>适合：</strong>{neighborhood.bestFor}</p>
              <p><strong>价位：</strong>{neighborhood.priceLevel}</p>
            </div>
            <Button variant="outline" asChild>
              <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                🗺️ 在{mapProvider === "amap" ? "高德" : "Google"}地图中打开
              </a>
            </Button>
          </div>

          <div>
            <RadarChart scores={neighborhood.computedScores} weights={weights} />
            {dynamic && (
              <div className="mt-4 rounded-xl border border-teal-200 bg-teal-50/50 p-4 text-sm">
                <p className="font-semibold text-teal-800 mb-2">
                  📍 地图 API 动态分析 (1.5km)
                </p>
                <ul className="space-y-1 text-slate-600">
                  <li>☕ 咖啡店: <strong>{dynamic.rawCafeCount ?? 0}</strong> 家 ({dynamic.cafe}/10)</li>
                  <li>🚇 交通点: <strong>{dynamic.rawTransitCount ?? 0}</strong> 个 ({dynamic.transit}/10)</li>
                  <li>🛍️ 商圈: <strong>{dynamic.rawShoppingCount ?? 0}</strong> 个 ({dynamic.shopping}/10)</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
