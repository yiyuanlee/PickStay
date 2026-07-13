"use client";

import { Slider } from "@/components/ui/slider";
import { DIMENSION_KEYS } from "@/lib/recommendation/types";
import type { Weights } from "@/lib/recommendation/types";

const DIM_CONFIG: Record<string, { label: string; icon: string }> = {
  budget: { label: "预算友好", icon: "💰" },
  safety: { label: "安全环境", icon: "🛡️" },
  transit: { label: "交通便利", icon: "🚇" },
  shopping: { label: "美食购物", icon: "🛍️" },
  nightlife: { label: "夜生活", icon: "✨" },
  quiet: { label: "安静舒适", icon: "🤫" },
  cafe: { label: "咖啡/Chill", icon: "☕" },
};

interface PreferenceSlidersProps {
  weights: Weights;
  onChange: (weights: Weights) => void;
}

export function PreferenceSliders({ weights, onChange }: PreferenceSlidersProps) {
  return (
    <div className="space-y-4">
      {DIMENSION_KEYS.map((key) => (
        <div key={key} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">
              {DIM_CONFIG[key].icon} {DIM_CONFIG[key].label}
            </span>
            <span className="tabular-nums text-teal-700">{weights[key]}</span>
          </div>
          <Slider
            value={[weights[key]]}
            min={0}
            max={10}
            step={1}
            onValueChange={([val]) =>
              onChange({ ...weights, [key]: val })
            }
          />
        </div>
      ))}
    </div>
  );
}
