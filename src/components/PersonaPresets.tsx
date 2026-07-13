"use client";

import { cn } from "@/lib/utils";
import { PERSONA_LABELS, PERSONA_PRESETS } from "@/lib/recommendation/presets";
import type { PersonaPresetId, Weights } from "@/lib/recommendation/types";

interface PersonaPresetsProps {
  activePreset: PersonaPresetId | null;
  onSelect: (preset: PersonaPresetId, weights: Weights) => void;
}

const PRESET_IDS = Object.keys(PERSONA_PRESETS) as PersonaPresetId[];

export function PersonaPresets({ activePreset, onSelect }: PersonaPresetsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {PRESET_IDS.map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelect(id, PERSONA_PRESETS[id])}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
            activePreset === id
              ? "bg-gradient-to-r from-teal-600 to-sky-500 text-white shadow-md"
              : "bg-white/70 text-slate-600 border border-black/5 hover:bg-white"
          )}
        >
          {PERSONA_LABELS[id]}
        </button>
      ))}
    </div>
  );
}
