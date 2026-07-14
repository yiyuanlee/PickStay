import enLocale from "@/data/locales/en.json";
import type { City, Neighborhood } from "@/lib/recommendation/types";
import type { Locale } from "@/i18n/types";

type CityOverlay = { name?: string; description?: string };
type NeighborhoodOverlay = {
  name?: string;
  tagline?: string;
  pros?: string[];
  cons?: string[];
  priceLevel?: string;
  bestFor?: string;
  detailText?: string;
};

type LocaleOverlay = {
  cities: Record<string, CityOverlay>;
  neighborhoods: Record<string, NeighborhoodOverlay>;
};

const overlays: Record<Exclude<Locale, "zh">, LocaleOverlay> = {
  en: enLocale as LocaleOverlay,
};

function applyCityOverlay(
  city: City,
  overlay: LocaleOverlay,
  cityOverlay?: CityOverlay
): City {
  if (!cityOverlay) return city;
  return {
    ...city,
    name: cityOverlay.name ?? city.name,
    description: cityOverlay.description ?? city.description,
    neighborhoods: city.neighborhoods.map((n) =>
      applyNeighborhoodOverlay(n, overlay.neighborhoods[n.id])
    ),
  };
}

function applyNeighborhoodOverlay(
  neighborhood: Neighborhood,
  overlay?: NeighborhoodOverlay
): Neighborhood {
  if (!overlay) return neighborhood;
  return {
    ...neighborhood,
    name: overlay.name ?? neighborhood.name,
    tagline: overlay.tagline ?? neighborhood.tagline,
    pros: overlay.pros ?? neighborhood.pros,
    cons: overlay.cons ?? neighborhood.cons,
    priceLevel: overlay.priceLevel ?? neighborhood.priceLevel,
    bestFor: overlay.bestFor ?? neighborhood.bestFor,
    detailText: overlay.detailText ?? neighborhood.detailText,
  };
}

export function localizeCity(city: City, locale: Locale): City {
  if (locale === "zh") return city;
  const overlay = overlays[locale];
  return applyCityOverlay(city, overlay, overlay.cities[city.id]);
}

export function localizeCities(cities: City[], locale: Locale): City[] {
  if (locale === "zh") return cities;
  return cities.map((city) => localizeCity(city, locale));
}

export function localizeNeighborhood(
  neighborhood: Neighborhood,
  locale: Locale
): Neighborhood {
  if (locale === "zh") return neighborhood;
  const overlay = overlays[locale].neighborhoods[neighborhood.id];
  return applyNeighborhoodOverlay(neighborhood, overlay);
}

export function localizeNeighborhoods(
  neighborhoods: Neighborhood[],
  locale: Locale
): Neighborhood[] {
  if (locale === "zh") return neighborhoods;
  return neighborhoods.map((n) => localizeNeighborhood(n, locale));
}
