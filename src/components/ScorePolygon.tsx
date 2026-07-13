"use client";

import { DIMENSION_LIST } from "@/lib/dimensions";
import {
  getLabelPoint,
  getRadarPoints,
  pointsToPolygon,
  POLYGON_SIZES,
  type ScorePolygonSize,
} from "@/lib/radar-geometry";
import { DIMENSION_KEYS } from "@/lib/recommendation/types";
import type { Scores, Weights } from "@/lib/recommendation/types";
import { cn } from "@/lib/utils";

interface ScorePolygonProps {
  scores: Scores;
  weights?: Weights;
  size?: ScorePolygonSize;
  showLabels?: boolean;
  showLegend?: boolean;
  animate?: boolean;
  delayMs?: number;
  className?: string;
  matchScore?: number;
}

export function ScorePolygon({
  scores,
  weights,
  size = "md",
  showLabels,
  showLegend = false,
  animate = true,
  delayMs = 0,
  className,
  matchScore,
}: ScorePolygonProps) {
  const config = POLYGON_SIZES[size];
  const { width, height, radius, labelRadius, fontSize } = config;
  const centerX = width / 2;
  const centerY = height / 2;
  const shouldShowLabels = showLabels ?? size !== "sm";

  const scorePoints = getRadarPoints(scores, centerX, centerY, radius);
  const scorePolygon = pointsToPolygon(scorePoints);

  const weightPolygon = weights
    ? pointsToPolygon(getRadarPoints(weights, centerX, centerY, radius))
    : null;

  const gridLevels = size === "sm" ? [5, 10] : [2, 4, 6, 8, 10];

  return (
    <div
      className={cn("relative inline-flex flex-col items-center", className)}
      style={animate ? { animationDelay: `${delayMs}ms` } : undefined}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={cn(
          "w-full",
          size === "sm" && "max-w-[128px]",
          size === "md" && "max-w-[200px]",
          size === "lg" && "max-w-[320px]",
          animate && "animate-polygon-in"
        )}
        style={animate ? { animationDelay: `${delayMs}ms` } : undefined}
        role="img"
        aria-label="七维偏好得分多边形图"
      >
        {gridLevels.map((level) => (
          <polygon
            key={level}
            points={pointsToPolygon(
              getRadarPoints(
                Object.fromEntries(DIMENSION_KEYS.map((k) => [k, level])) as Scores,
                centerX,
                centerY,
                radius
              )
            )}
            fill="none"
            stroke="var(--polygon-grid)"
            strokeWidth="1"
            className="animate-grid-fade"
          />
        ))}

        {DIMENSION_KEYS.map((_, index) => {
          const outer = getLabelPoint(
            index,
            DIMENSION_KEYS.length,
            centerX,
            centerY,
            radius
          );
          return (
            <line
              key={index}
              x1={centerX}
              y1={centerY}
              x2={outer.x}
              y2={outer.y}
              stroke="var(--polygon-grid)"
              strokeWidth="1"
            />
          );
        })}

        {weightPolygon && (
          <polygon
            points={weightPolygon}
            fill="rgba(175, 82, 222, 0.08)"
            stroke="#af52de"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            className={animate ? "animate-polygon-stroke" : undefined}
            style={animate ? { animationDelay: `${delayMs + 120}ms` } : undefined}
          />
        )}

        <polygon
          points={scorePolygon}
          fill="rgba(0, 113, 227, 0.18)"
          stroke="#0071e3"
          strokeWidth="2"
          strokeLinejoin="round"
          className={animate ? "animate-polygon-stroke" : undefined}
          style={animate ? { animationDelay: `${delayMs + 60}ms` } : undefined}
        />

        {scorePoints.map((point, index) => (
          <circle
            key={point.key}
            cx={point.x}
            cy={point.y}
            r={size === "sm" ? 2.5 : 3.5}
            fill="#0071e3"
            className={animate ? "animate-dot-pop" : undefined}
            style={animate ? { animationDelay: `${delayMs + 180 + index * 40}ms` } : undefined}
          />
        ))}

        {shouldShowLabels &&
          DIMENSION_LIST.map(({ key, shortLabel }, index) => {
            const labelPt = getLabelPoint(
              index,
              DIMENSION_KEYS.length,
              centerX,
              centerY,
              labelRadius
            );
            return (
              <text
                key={key}
                x={labelPt.x}
                y={labelPt.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--text-secondary)"
                fontSize={fontSize}
                fontWeight="500"
              >
                {shortLabel}
              </text>
            );
          })}

        {matchScore !== undefined && size !== "sm" && (
          <text
            x={centerX}
            y={centerY}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#0071e3"
            fontSize={size === "lg" ? 18 : 14}
            fontWeight="600"
          >
            {matchScore}%
          </text>
        )}
      </svg>

      {showLegend && (
        <p className="mt-2 text-center text-[10px] text-[var(--text-muted)]">
          实线=街区得分 · 虚线=偏好权重
        </p>
      )}
    </div>
  );
}
