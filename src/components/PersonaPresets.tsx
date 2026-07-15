"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/components/I18nProvider";
import { PERSONA_PRESETS } from "@/lib/recommendation/presets";
import type { PersonaPresetId, Weights } from "@/lib/recommendation/types";

interface PersonaPresetsProps {
  activePreset: PersonaPresetId | null;
  onSelect: (preset: PersonaPresetId, weights: Weights) => void;
}

const PRESET_IDS = Object.keys(PERSONA_PRESETS) as PersonaPresetId[];

export function PersonaPresets({ activePreset, onSelect }: PersonaPresetsProps) {
  const { t } = useI18n();

  return (
    <div className="flex flex-wrap gap-2">
      {PRESET_IDS.map((id) => (
        <button
          key={id}
          type="button"
          data-testid={`persona-${id}`}
          onClick={() => onSelect(id, PERSONA_PRESETS[id])}
          className={cn(
            "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300 active:scale-[0.97]",
            activePreset === id
              ? "bg-apple-blue text-white shadow-sm"
              : "bg-[#f5f5f7] text-apple-text-secondary hover:bg-[#e8e8ed] hover:text-apple-text"
          )}
        >
          {t(`personas.${id}`)}
        </button>
      ))}
    </div>
  );
}
