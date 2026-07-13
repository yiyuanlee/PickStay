"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DIMENSION_KEYS } from "@/lib/recommendation/types";
import type { ScoredNeighborhood } from "@/lib/recommendation/types";
import { cn } from "@/lib/utils";

const DIM_LABELS: Record<string, string> = {
  budget: "💰 预算",
  safety: "🛡️ 安全",
  transit: "🚇 交通",
  shopping: "🛍️ 购物",
  nightlife: "✨ 夜生活",
  quiet: "🤫 安静",
  cafe: "☕ 咖啡",
};

interface ComparisonDrawerProps {
  neighborhoods: ScoredNeighborhood[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function ComparisonDrawer({
  neighborhoods,
  onRemove,
  onClear,
}: ComparisonDrawerProps) {
  if (neighborhoods.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-black/5 bg-white/90 backdrop-blur-xl shadow-2xl">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">
            街区对比 ({neighborhoods.length}/3)
          </h3>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" asChild>
              <Link
                href={`/compare?ids=${neighborhoods.map((n) => n.id).join(",")}`}
              >
                展开对比
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={onClear}>
              清空
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-black/5">
                <th className="py-2 text-left text-slate-500">维度</th>
                {neighborhoods.map((n) => (
                  <th key={n.id} className="px-3 py-2 text-left font-semibold text-slate-800">
                    <div className="flex items-center gap-2">
                      {n.name.split(" ")[0]}
                      <button
                        type="button"
                        onClick={() => onRemove(n.id)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black/5 bg-teal-50/50">
                <td className="py-2 font-medium">契合度</td>
                {neighborhoods.map((n) => (
                  <td key={n.id} className="px-3 py-2 font-bold text-teal-700">
                    {n.matchScore}%
                  </td>
                ))}
              </tr>
              {DIMENSION_KEYS.map((key) => (
                <tr key={key} className="border-b border-black/5">
                  <td className="py-2 text-slate-600">{DIM_LABELS[key]}</td>
                  {neighborhoods.map((n) => (
                    <td
                      key={n.id}
                      className={cn(
                        "px-3 py-2",
                        key === "cafe" && "font-semibold text-teal-700"
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
