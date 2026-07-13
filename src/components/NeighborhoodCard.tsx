"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { buildMapUrl } from "@/lib/recommendation/engine";
import type { ScoredNeighborhood } from "@/lib/recommendation/types";
import { cn } from "@/lib/utils";

interface NeighborhoodCardProps {
  neighborhood: ScoredNeighborhood;
  rank: number;
  mapProvider: "google" | "amap";
  isCompared: boolean;
  onDetail: () => void;
  onCompare: () => void;
}

export function NeighborhoodCard({
  neighborhood,
  rank,
  mapProvider,
  isCompared,
  onDetail,
  onCompare,
}: NeighborhoodCardProps) {
  const scoreClass =
    neighborhood.matchScore >= 80
      ? "bg-teal-100 text-teal-800"
      : neighborhood.matchScore >= 60
        ? "bg-amber-100 text-amber-800"
        : "bg-slate-100 text-slate-600";

  const mapUrl = buildMapUrl(neighborhood.center, mapProvider);
  const mapLabel = mapProvider === "amap" ? "高德" : "Google";

  return (
    <Card className="animate-in fade-in slide-in-from-bottom-2 duration-300 hover:bg-white/95 hover:shadow-md transition-all">
      <CardContent className="p-0">
        <div className="flex items-center justify-between border-b border-black/5 px-4 py-2">
          <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
            #{rank}
          </span>
          <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", scoreClass)}>
            契合度 {neighborhood.matchScore}%
          </span>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="text-lg font-bold text-slate-800">{neighborhood.name}</h3>
            <p className="text-sm text-slate-500 italic">&ldquo;{neighborhood.tagline}&rdquo;</p>
          </div>

          <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-7">
            {[
              ["🤫", neighborhood.computedScores.quiet, "安静"],
              ["🛡️", neighborhood.computedScores.safety, "安全"],
              ["🚇", neighborhood.computedScores.transit, "交通"],
              ["🛍️", neighborhood.computedScores.shopping, "购物"],
              ["✨", neighborhood.computedScores.nightlife, "夜生活"],
              ["💰", neighborhood.computedScores.budget, "预算"],
              ["☕", neighborhood.computedScores.cafe, "咖啡"],
            ].map(([icon, score, label]) => (
              <div
                key={label as string}
                title={`${label}: ${score}/10`}
                className={cn(
                  "rounded-lg bg-slate-50 px-1 py-1 text-center text-xs",
                  label === "咖啡" && "bg-teal-50 text-teal-700 font-medium"
                )}
              >
                {icon} {score}
              </div>
            ))}
          </div>

          <p className="text-sm text-slate-600">
            <strong>优势：</strong>
            {neighborhood.pros.slice(0, 2).join("，")}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <span className="text-xs text-slate-500">{neighborhood.priceLevel}</span>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                  🗺️ {mapLabel}
                </a>
              </Button>
              <Button variant="secondary" size="sm" onClick={onCompare}>
                {isCompared ? "取消对比" : "加入对比"}
              </Button>
              <Button size="sm" onClick={onDetail}>
                查看详情
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
