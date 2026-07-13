"use client";

import { Check, ExternalLink, X } from "lucide-react";
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
          <p className="text-sm text-apple-text-secondary">
            &ldquo;{neighborhood.tagline}&rdquo;
          </p>
        </DialogHeader>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-apple-text-secondary">
              {neighborhood.detailText}
            </p>
            <div className="inline-flex rounded-full bg-[#e8f4fd] px-4 py-2 text-sm font-semibold text-apple-blue">
              契合度 {neighborhood.matchScore}%
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-apple-text">优势</h4>
              <ul className="space-y-1.5 text-sm text-apple-text-secondary">
                {neighborhood.pros.map((pro) => (
                  <li key={pro} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-apple-green" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-apple-text">劣势</h4>
              <ul className="space-y-1.5 text-sm text-apple-text-secondary">
                {neighborhood.cons.map((con) => (
                  <li key={con} className="flex items-start gap-2">
                    <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-apple-text-secondary" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-1 text-sm text-apple-text-secondary">
              <p><span className="text-apple-text">适合：</span>{neighborhood.bestFor}</p>
              <p><span className="text-apple-text">价位：</span>{neighborhood.priceLevel}</p>
            </div>
            <Button variant="outline" asChild>
              <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                在{mapProvider === "amap" ? "高德" : "Google"}地图中打开
              </a>
            </Button>
          </div>

          <div className="flex flex-col items-center">
            <RadarChart scores={neighborhood.computedScores} weights={weights} />
            {dynamic && (
              <div className="mt-4 w-full rounded-2xl border border-black/8 bg-[#f5f5f7] p-4 text-sm">
                <p className="mb-2 font-semibold text-apple-text">
                  地图 API 动态分析 (1.5km)
                </p>
                <ul className="space-y-1 text-apple-text-secondary">
                  <li>咖啡店: <strong className="text-apple-text">{dynamic.rawCafeCount ?? 0}</strong> 家 ({dynamic.cafe}/10)</li>
                  <li>交通点: <strong className="text-apple-text">{dynamic.rawTransitCount ?? 0}</strong> 个 ({dynamic.transit}/10)</li>
                  <li>商圈: <strong className="text-apple-text">{dynamic.rawShoppingCount ?? 0}</strong> 个 ({dynamic.shopping}/10)</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
