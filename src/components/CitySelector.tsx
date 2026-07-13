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
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-8">
      {cities.map((city) => (
        <button
          key={city.id}
          type="button"
          onClick={() => onSelect(city.id)}
          className={cn(
            "rounded-2xl border px-3 py-3 text-left transition-all duration-300 active:scale-[0.97]",
            selectedCityId === city.id
              ? "border-apple-blue/40 bg-white shadow-md ring-2 ring-apple-blue/15"
              : "border-black/8 bg-white/80 hover:border-black/12 hover:shadow-sm"
          )}
        >
          <div className="text-sm font-semibold text-apple-text">
            {city.name.split(" ")[0]}
          </div>
          <div className="mt-0.5 text-xs text-apple-text-secondary">
            {city.neighborhoods.length} 街区
          </div>
        </button>
      ))}
    </div>
  );
}
