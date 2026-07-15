import { DIMENSION_KEYS } from "./types";
import type {
  DimensionKey,
  DynamicScores,
  Neighborhood,
  RankOptions,
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

/**
 * Min-max normalize each dimension across the city to 1–10.
 * Same raw expert scores across cities are not comparable; within-city
 * relative rank is what the weighted match should use.
 */
export function normalizeScoresInCity(
  scoreList: Scores[]
): Scores[] {
  if (scoreList.length === 0) return [];

  const mins = {} as Scores;
  const maxs = {} as Scores;

  for (const key of DIMENSION_KEYS) {
    let min = Infinity;
    let max = -Infinity;
    for (const scores of scoreList) {
      const v = scores[key] ?? 0;
      if (v < min) min = v;
      if (v > max) max = v;
    }
    mins[key] = min;
    maxs[key] = max;
  }

  return scoreList.map((scores) => {
    const next = { ...scores };
    for (const key of DIMENSION_KEYS) {
      const min = mins[key];
      const max = maxs[key];
      if (max <= min) {
        next[key] = 5.5;
      } else {
        const scaled = 1 + ((scores[key] - min) / (max - min)) * 9;
        next[key] = Math.round(scaled * 10) / 10;
      }
    }
    return next;
  });
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

/** Contribution of each dimension to the weighted sum (unnormalized). */
export function dimensionContributions(
  scores: Scores,
  weights: Weights
): { key: DimensionKey; contribution: number }[] {
  return DIMENSION_KEYS.map((key) => ({
    key,
    contribution: weights[key] * (scores[key] || 0),
  })).sort((a, b) => b.contribution - a.contribution);
}

export function topMatchDrivers(
  scores: Scores,
  weights: Weights,
  count = 2
): DimensionKey[] {
  return dimensionContributions(scores, weights)
    .filter((d) => d.contribution > 0)
    .slice(0, count)
    .map((d) => d.key);
}

export function scoreSourceFor(
  dynamic?: DynamicScores | null
): "poi" | "static" {
  if (!dynamic) return "static";
  if (
    dynamic.cafe !== undefined ||
    dynamic.transit !== undefined ||
    dynamic.shopping !== undefined
  ) {
    return "poi";
  }
  return "static";
}

export function rankNeighborhoods(
  neighborhoods: Neighborhood[],
  weights: Weights,
  dynamicScores: Record<string, DynamicScores> = {},
  options: RankOptions = {}
): ScoredNeighborhood[] {
  const normalize = options.normalize ?? true;

  const mergedList = neighborhoods.map((neighborhood) =>
    mergeScores(neighborhood.scores, dynamicScores[neighborhood.id])
  );

  const rankingScores = normalize
    ? normalizeScoresInCity(mergedList)
    : mergedList;

  return neighborhoods
    .map((neighborhood, index) => {
      const computedScores = rankingScores[index];
      const matchScore = calculateMatchScore(computedScores, weights);
      const dynamic = dynamicScores[neighborhood.id];
      return {
        ...neighborhood,
        computedScores,
        matchScore,
        matchDrivers: topMatchDrivers(computedScores, weights, 2),
        scoreSource: scoreSourceFor(dynamic),
      };
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
