"use client";

import Link from "next/link";
import { ScorePolygon } from "@/components/ScorePolygon";
import { Card, CardContent } from "@/components/ui/card";
import { DIMENSION_LIST } from "@/lib/dimensions";
import type { ScoredNeighborhood } from "@/lib/recommendation/types";
import { DEFAULT_WEIGHTS } from "@/lib/recommendation/presets";

interface CompareVisualProps {
  neighborhoods: ScoredNeighborhood[];
}

export function CompareVisual({ neighborhoods }: CompareVisualProps) {
  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-8">
        {neighborhoods.map((n, i) => (
          <div key={n.id} className="flex flex-col items-center gap-3">
            <ScorePolygon
              scores={n.computedScores}
              weights={DEFAULT_WEIGHTS}
              size="md"
              showLabels
              delayMs={i * 120}
            />
            <div className="text-center">
              <p className="font-semibold text-apple-text">{n.name}</p>
              <p className="text-xs text-apple-text-secondary">{n.tagline}</p>
            </div>
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="overflow-x-auto p-6">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-black/8">
                <th className="py-3 text-left text-apple-text-secondary">维度</th>
                {neighborhoods.map((n) => (
                  <th key={n.id} className="px-4 py-3 text-left font-bold text-apple-text">
                    {n.name.split(" ")[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DIMENSION_LIST.map(({ key, shortLabel, Icon }) => (
                <tr key={key} className="border-b border-black/5">
                  <td className="py-3 text-apple-text-secondary">
                    <span className="inline-flex items-center gap-1.5">
                      <Icon className="h-3 w-3 text-apple-blue" />
                      {shortLabel}
                    </span>
                  </td>
                  {neighborhoods.map((n) => (
                    <td key={n.id} className="px-4 py-3 tabular-nums text-apple-text">
                      {n.computedScores[key]}/10
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="py-3 text-apple-text-secondary">价位</td>
                {neighborhoods.map((n) => (
                  <td key={n.id} className="px-4 py-3 text-apple-text-secondary">
                    {n.priceLevel}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </>
  );
}

export function CompareEmpty() {
  return (
    <Card>
      <CardContent className="p-12 text-center text-apple-text-secondary">
        <p className="mb-4">请先选择 2-3 个街区进行对比</p>
        <Link href="/explore/tokyo" className="text-apple-blue hover:underline">
          前往探索
        </Link>
      </CardContent>
    </Card>
  );
}
