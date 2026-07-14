"use client";

import { Slider } from "@/components/ui/slider";
import { useI18n } from "@/components/I18nProvider";
import { getDimensionList } from "@/lib/dimensions";
import type { Weights } from "@/lib/recommendation/types";

interface PreferenceSlidersProps {
  weights: Weights;
  onChange: (weights: Weights) => void;
}

export function PreferenceSliders({ weights, onChange }: PreferenceSlidersProps) {
  const { locale, t } = useI18n();
  const dimensionList = getDimensionList(locale);

  return (
    <div className="space-y-5">
      {dimensionList.map(({ key, label, Icon }) => (
        <div key={key} className="space-y-2.5">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 font-medium text-apple-text">
              <Icon className="h-3.5 w-3.5 text-apple-blue" />
              {label}
            </span>
            <span className="tabular-nums font-semibold text-apple-blue">
              {weights[key]}
            </span>
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
