"use client";

import { ExternalLink } from "lucide-react";
import { ScorePolygon } from "@/components/ScorePolygon";
import { useI18n } from "@/components/I18nProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { buildMapUrl } from "@/lib/recommendation/engine";
import type { ScoredNeighborhood, Weights } from "@/lib/recommendation/types";
import { cn } from "@/lib/utils";

interface NeighborhoodCardProps {
  neighborhood: ScoredNeighborhood;
  rank: number;
  weights: Weights;
  mapProvider: "google" | "amap";
  isCompared: boolean;
  onDetail: () => void;
  onCompare: () => void;
}

function matchBadgeClass(score: number) {
  if (score >= 80) return "bg-[#e8f4fd] text-apple-blue";
  if (score >= 60) return "bg-[#f5f0ff] text-apple-purple";
  return "bg-[#f5f5f7] text-apple-text-secondary";
}

export function NeighborhoodCard({
  neighborhood,
  rank,
  weights,
  mapProvider,
  isCompared,
  onDetail,
  onCompare,
}: NeighborhoodCardProps) {
  const { t } = useI18n();
  const mapUrl = buildMapUrl(neighborhood.center, mapProvider);
  const mapLabel = mapProvider === "amap" ? "AMap" : "Google";

  return (
    <Card
      className={cn(
        "animate-fade-up overflow-hidden hover:-translate-y-0.5",
        isCompared && "ring-2 ring-apple-blue/30"
      )}
      style={{ animationDelay: `${Math.min(rank * 70, 560)}ms` }}
    >
      <CardContent className="p-0">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex shrink-0 flex-col items-center sm:w-[148px]">
            <ScorePolygon
              scores={neighborhood.computedScores}
              weights={weights}
              size="md"
              showLabels
              delayMs={rank * 80}
            />
            <span className="mt-2 text-[11px] text-apple-text-secondary">
              {t("explore.polygonCaption")}
            </span>
          </div>

          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded-full bg-[#f5f5f7] px-2.5 py-0.5 text-xs font-semibold tabular-nums text-apple-text-secondary">
                    #{rank}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums",
                      matchBadgeClass(neighborhood.matchScore)
                    )}
                  >
                    {t("explore.matchScore")} {neighborhood.matchScore}%
                  </span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-apple-text">
                  {neighborhood.name}
                </h3>
                <p className="mt-1 text-sm text-apple-text-secondary">
                  &ldquo;{neighborhood.tagline}&rdquo;
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-apple-text-secondary">
              <span className="font-medium text-apple-text">
                {t("explore.advantages")} ·{" "}
              </span>
              {neighborhood.pros.slice(0, 2).join(", ")}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <span className="text-xs text-apple-text-secondary">
                {neighborhood.priceLevel}
              </span>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3.5 w-3.5" />
                    {mapLabel}
                  </a>
                </Button>
                <Button
                  variant={isCompared ? "default" : "secondary"}
                  size="sm"
                  onClick={onCompare}
                >
                  {isCompared ? t("explore.added") : t("explore.addCompare")}
                </Button>
                <Button size="sm" onClick={onDetail}>
                  {t("explore.details")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
