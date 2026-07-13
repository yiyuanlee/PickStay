import citiesJson from "@/data/cities.json";
import type { City, Neighborhood, Scores } from "@/lib/recommendation/types";

interface LegacyCity {
  name: string;
  description: string;
  preferredProvider: "google" | "amap" | "mock";
  center: { lat: number; lng: number };
  neighborhoods: Array<{
    id: string;
    name: string;
    tagline: string;
    center: { lat: number; lng: number };
    scores: Scores;
    pros: string[];
    cons: string[];
    priceLevel: string;
    bestFor: string;
    detailText: string;
  }>;
}

const legacyData = citiesJson as Record<string, LegacyCity>;

function toNeighborhood(cityId: string, n: LegacyCity["neighborhoods"][0]): Neighborhood {
  return {
    id: n.id,
    cityId,
    name: n.name,
    tagline: n.tagline,
    scores: n.scores,
    pros: n.pros,
    cons: n.cons,
    center: n.center,
    priceLevel: n.priceLevel,
    bestFor: n.bestFor,
    detailText: n.detailText,
  };
}

export function getLocalCities(): City[] {
  return Object.entries(legacyData).map(([id, city]) => ({
    id,
    name: city.name,
    description: city.description,
    preferredProvider: city.preferredProvider,
    center: city.center,
    neighborhoods: city.neighborhoods.map((n) => toNeighborhood(id, n)),
  }));
}

export function getLocalCity(cityId: string): City | null {
  const city = legacyData[cityId];
  if (!city) return null;
  return {
    id: cityId,
    name: city.name,
    description: city.description,
    preferredProvider: city.preferredProvider,
    center: city.center,
    neighborhoods: city.neighborhoods.map((n) => toNeighborhood(cityId, n)),
  };
}

export function getLocalNeighborhood(
  neighborhoodId: string
): Neighborhood | null {
  for (const [cityId, city] of Object.entries(legacyData)) {
    const found = city.neighborhoods.find((n) => n.id === neighborhoodId);
    if (found) return toNeighborhood(cityId, found);
  }
  return null;
}

export const CITY_IDS = Object.keys(legacyData);
