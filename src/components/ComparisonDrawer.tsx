"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { ScorePolygon } from "@/components/ScorePolygon";
import { useI18n } from "@/components/I18nProvider";
import { Button } from "@/components/ui/button";
import { getDimensionList } from "@/lib/dimensions";
import type { ScoredNeighborhood, Weights } from "@/lib/recommendation/types";
import { cn } from "@/lib/utils";

interface ComparisonDrawerProps {
  neighborhoods: ScoredNeighborhood[];
  weights: Weights;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function ComparisonDrawer({
  neighborhoods,
  weights,
  onRemove,
  onClear,
}: ComparisonDrawerProps) {
  const { locale, t } = useI18n();
  const dimensionList = getDimensionList(locale);

  if (neighborhoods.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 animate-fade-up border-t border-black/8 bg-white/80 backdrop-blur-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.08)]">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-apple-text">
            {t("compare.drawerTitle")} ({neighborhoods.length}/3)
          </h3>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" asChild>
              <Link
                href={`/compare?ids=${neighborhoods.map((n) => n.id).join(",")}`}
              >
                {t("compare.expand")}
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={onClear}>
              {t("compare.clear")}
            </Button>
          </div>
        </div>

        <div className="mb-4 flex justify-center gap-6 overflow-x-auto pb-2">
          {neighborhoods.map((n, i) => (
            <div key={n.id} className="flex flex-col items-center gap-2">
              <div className="relative">
                <ScorePolygon
                  scores={n.computedScores}
                  weights={weights}
                  size="sm"
                  delayMs={i * 100}
                />
                <button
                  type="button"
                  onClick={() => onRemove(n.id)}
                  className="absolute -right-1 -top-1 rounded-full bg-[#f5f5f7] p-1 text-apple-text-secondary hover:bg-[#e8e8ed] hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
              <span className="max-w-[100px] truncate text-xs font-medium text-apple-text">
                {n.name.split(" ")[0]}
              </span>
              <span className="text-xs font-semibold text-apple-blue">
                {n.matchScore}%
              </span>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-black/8">
                <th className="py-2 text-left text-apple-text-secondary">
                  {t("compare.dimension")}
                </th>
                {neighborhoods.map((n) => (
                  <th key={n.id} className="px-3 py-2 text-left font-semibold text-apple-text">
                    {n.name.split(" ")[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dimensionList.map(({ key, shortLabel, Icon }) => (
                <tr key={key} className="border-b border-black/5">
                  <td className="py-2 text-apple-text-secondary">
                    <span className="inline-flex items-center gap-1.5">
                      <Icon className="h-3 w-3 text-apple-blue" />
                      {shortLabel}
                    </span>
                  </td>
                  {neighborhoods.map((n) => (
                    <td
                      key={n.id}
                      className={cn(
                        "px-3 py-2 tabular-nums text-apple-text",
                        key === "cafe" && "font-semibold text-apple-blue"
                      )}
                    >
                      {n.computedScores[key]}/10
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
