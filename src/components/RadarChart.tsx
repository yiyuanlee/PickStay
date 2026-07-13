import { ScorePolygon } from "@/components/ScorePolygon";
import type { Scores, Weights } from "@/lib/recommendation/types";

interface RadarChartProps {
  scores: Scores;
  weights: Weights;
}

export function RadarChart({ scores, weights }: RadarChartProps) {
  return (
    <ScorePolygon
      scores={scores}
      weights={weights}
      size="lg"
      showLabels
      showLegend
      animate
    />
  );
}
