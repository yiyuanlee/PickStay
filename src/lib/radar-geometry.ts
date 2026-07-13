import { DIMENSION_KEYS } from "@/lib/recommendation/types";
import type { DimensionKey, Scores, Weights } from "@/lib/recommendation/types";

export interface RadarPoint {
  x: number;
  y: number;
  key: DimensionKey;
}

export function getRadarPoints(
  values: Record<DimensionKey, number>,
  centerX: number,
  centerY: number,
  radius: number,
  keys: readonly DimensionKey[] = DIMENSION_KEYS
): RadarPoint[] {
  const angleStep = (2 * Math.PI) / keys.length;
  return keys.map((key, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (values[key] / 10) * radius;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
      key,
    };
  });
}

export function pointsToPolygon(points: { x: number; y: number }[]) {
  return points.map((p) => `${p.x},${p.y}`).join(" ");
}

export function getLabelPoint(
  index: number,
  total: number,
  centerX: number,
  centerY: number,
  radius: number
) {
  const angle = index * ((2 * Math.PI) / total) - Math.PI / 2;
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  };
}

export type ScorePolygonSize = "sm" | "md" | "lg";

export const POLYGON_SIZES: Record<
  ScorePolygonSize,
  { width: number; height: number; radius: number; labelRadius: number; fontSize: number }
> = {
  sm: { width: 128, height: 128, radius: 42, labelRadius: 0, fontSize: 0 },
  md: { width: 200, height: 200, radius: 68, labelRadius: 82, fontSize: 9 },
  lg: { width: 320, height: 320, radius: 100, labelRadius: 125, fontSize: 10 },
};

export interface ScorePolygonInput {
  scores: Scores;
  weights?: Weights;
}
