import { DIMENSION_KEYS } from "@/lib/recommendation/types";
import type { Scores, Weights } from "@/lib/recommendation/types";

const DIM_LABELS: Record<string, string> = {
  safety: "🛡️ 安全",
  transit: "🚇 交通",
  shopping: "🛍️ 购物",
  nightlife: "✨ 夜生活",
  quiet: "🤫 安静",
  budget: "💰 预算",
  cafe: "☕ 咖啡",
};

interface RadarChartProps {
  scores: Scores;
  weights: Weights;
}

export function RadarChart({ scores, weights }: RadarChartProps) {
  const width = 320;
  const height = 320;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 100;

  const dims = DIMENSION_KEYS.map((key) => ({
    key,
    label: DIM_LABELS[key],
  }));

  const angleStep = (2 * Math.PI) / dims.length;

  const getPoint = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / 10) * radius;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
    };
  };

  const scorePoints = dims
    .map((d, i) => {
      const p = getPoint(scores[d.key], i);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  const weightPoints = dims
    .map((d, i) => {
      const p = getPoint(weights[d.key], i);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  const gridLevels = [2, 4, 6, 8, 10];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="mx-auto w-full max-w-xs">
      {gridLevels.map((level) => {
        const pts = dims
          .map((_, i) => {
            const p = getPoint(level, i);
            return `${p.x},${p.y}`;
          })
          .join(" ");
        return (
          <polygon
            key={level}
            points={pts}
            fill="none"
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="1"
          />
        );
      })}

      {dims.map((d, i) => {
        const outer = getPoint(10, i);
        return (
          <line
            key={d.key}
            x1={centerX}
            y1={centerY}
            x2={outer.x}
            y2={outer.y}
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="1"
          />
        );
      })}

      <polygon
        points={weightPoints}
        fill="rgba(14, 165, 233, 0.08)"
        stroke="rgba(14, 165, 233, 0.4)"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <polygon
        points={scorePoints}
        fill="rgba(13, 148, 136, 0.2)"
        stroke="#0d9488"
        strokeWidth="2"
      />

      {dims.map((d, i) => {
        const labelPt = getPoint(12.5, i);
        return (
          <text
            key={d.key}
            x={labelPt.x}
            y={labelPt.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-600 text-[10px]"
          >
            {d.label}
          </text>
        );
      })}

      <text x={centerX} y={height - 10} textAnchor="middle" className="fill-slate-400 text-[9px]">
        实线=街区得分 · 虚线=你的偏好权重
      </text>
    </svg>
  );
}
