import { DIMENSION_KEYS } from "./types";
import type {
  DynamicScores,
  Neighborhood,
  ScoredNeighborhood,
  Scores,
  Weights,
} from "./types";

export function mergeScores(
  base: Scores,
  dynamic?: DynamicScores | null
): Scores {
  const merged = { ...base };
  if (!dynamic) return merged;
  if (dynamic.cafe !== undefined) merged.cafe = dynamic.cafe;
  if (dynamic.transit !== undefined) merged.transit = dynamic.transit;
  if (dynamic.shopping !== undefined) merged.shopping = dynamic.shopping;
  return merged;
}

export function calculateMatchScore(
  scores: Scores,
  weights: Weights
): number {
  const totalWeight = DIMENSION_KEYS.reduce((sum, key) => sum + weights[key], 0);
  if (totalWeight <= 0) return 0;

  const weightedSum = DIMENSION_KEYS.reduce(
    (sum, key) => sum + weights[key] * (scores[key] || 0),
    0
  );

  return Math.round((weightedSum / (totalWeight * 10)) * 100);
}

export function rankNeighborhoods(
  neighborhoods: Neighborhood[],
  weights: Weights,
  dynamicScores: Record<string, DynamicScores> = {}
): ScoredNeighborhood[] {
  return neighborhoods
    .map((neighborhood) => {
      const computedScores = mergeScores(
        neighborhood.scores,
        dynamicScores[neighborhood.id]
      );
      const matchScore = calculateMatchScore(computedScores, weights);
      return { ...neighborhood, computedScores, matchScore };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}

export function buildMapUrl(
  center: { lat: number; lng: number },
  provider: "google" | "amap"
): string {
  if (provider === "amap") {
    return `https://uri.amap.com/marker?position=${center.lng},${center.lat}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`;
}
