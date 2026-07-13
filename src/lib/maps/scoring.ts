import type { DynamicScores } from "@/lib/recommendation/types";

export function mapPoiCountsToScores(
  provider: "google" | "amap" | "mock",
  counts: {
    transitCount: number;
    shoppingCount: number;
    cafeCount: number;
  }
): DynamicScores {
  if (provider === "amap") {
    return {
      rawCafeCount: counts.cafeCount,
      rawTransitCount: counts.transitCount,
      rawShoppingCount: counts.shoppingCount,
      cafe: Math.min(10, Math.max(2, Math.round((counts.cafeCount / 20) * 10))),
      transit: Math.min(
        10,
        Math.max(2, Math.round((counts.transitCount / 5) * 10))
      ),
      shopping: Math.min(
        10,
        Math.max(2, Math.round((counts.shoppingCount / 8) * 10))
      ),
    };
  }

  return {
    rawCafeCount: counts.cafeCount,
    rawTransitCount: counts.transitCount,
    rawShoppingCount: counts.shoppingCount,
    cafe: Math.min(10, Math.max(2, Math.round((counts.cafeCount / 20) * 10))),
    transit: Math.min(
      10,
      Math.max(2, Math.round((counts.transitCount / 4) * 10))
    ),
    shopping: Math.min(
      10,
      Math.max(2, Math.round((counts.shoppingCount / 6) * 10))
    ),
  };
}

export function getMapProvider(
  preferred: "google" | "amap" | "mock"
): "google" | "amap" | "mock" {
  const hasAmap = Boolean(process.env.AMAP_KEY);
  const hasGoogle = Boolean(process.env.GOOGLE_MAPS_API_KEY);

  if (preferred === "amap" && hasAmap) return "amap";
  if (preferred === "google" && hasGoogle) return "google";
  if (hasGoogle) return "google";
  if (hasAmap) return "amap";
  return "mock";
}
