"use client";

import { cn } from "@/lib/utils";
import type { City } from "@/lib/recommendation/types";

interface CitySelectorProps {
  cities: City[];
  selectedCityId: string;
  onSelect: (cityId: string) => void;
}

export function CitySelector({
  cities,
  selectedCityId,
  onSelect,
}: CitySelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
      {cities.map((city) => (
        <button
          key={city.id}
          type="button"
          onClick={() => onSelect(city.id)}
          className={cn(
            "rounded-2xl border p-3 text-left transition-all",
            selectedCityId === city.id
              ? "border-teal-500/50 bg-white shadow-md ring-2 ring-teal-500/20"
              : "border-black/5 bg-white/60 hover:bg-white/90"
          )}
        >
          <div className="text-sm font-semibold text-slate-800">{city.name.split(" ")[0]}</div>
          <div className="mt-1 text-xs text-slate-500">
            {city.neighborhoods.length} 街区
          </div>
        </button>
      ))}
    </div>
  );
}
