export const DIMENSION_KEYS = [
  "budget",
  "safety",
  "transit",
  "shopping",
  "nightlife",
  "quiet",
  "cafe",
] as const;

export type DimensionKey = (typeof DIMENSION_KEYS)[number];

export type Weights = Record<DimensionKey, number>;
export type Scores = Record<DimensionKey, number>;

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface DynamicScores {
  cafe?: number;
  transit?: number;
  shopping?: number;
  rawCafeCount?: number;
  rawTransitCount?: number;
  rawShoppingCount?: number;
}

export interface Neighborhood {
  id: string;
  cityId: string;
  name: string;
  tagline: string;
  scores: Scores;
  pros: string[];
  cons: string[];
  center: Coordinates;
  priceLevel: string;
  bestFor: string;
  detailText: string;
}

export type ScoreSource = "static" | "poi";

export interface ScoredNeighborhood extends Neighborhood {
  computedScores: Scores;
  matchScore: number;
  /** Top dimensions driving the match score (for UI explanation). */
  matchDrivers?: DimensionKey[];
  /** Whether cafe/transit/shopping came from live POI enrichment. */
  scoreSource?: ScoreSource;
}

export interface RankOptions {
  /** When true (default), min-max normalize scores within the city first. */
  normalize?: boolean;
}

export interface City {
  id: string;
  name: string;
  description: string;
  preferredProvider: "google" | "amap" | "mock";
  center: Coordinates;
  neighborhoods: Neighborhood[];
}

export type PersonaPresetId =
  | "firstTime"
  | "backpacker"
  | "family"
  | "chill"
  | "nightOwl";
