import { describe, it, expect } from "vitest";
import {
  calculateMatchScore,
  mergeScores,
  rankNeighborhoods,
} from "@/lib/recommendation/engine";
import { DEFAULT_WEIGHTS, PERSONA_PRESETS } from "@/lib/recommendation/presets";
import { getLocalCity } from "@/lib/data/local";

describe("calculateMatchScore", () => {
  it("returns 100 when all weights and scores are max", () => {
    const scores = {
      budget: 10,
      safety: 10,
      transit: 10,
      shopping: 10,
      nightlife: 10,
      quiet: 10,
      cafe: 10,
    };
    expect(calculateMatchScore(scores, DEFAULT_WEIGHTS)).toBe(100);
  });

  it("returns 0 when total weight is 0", () => {
    const zeroWeights = {
      budget: 0,
      safety: 0,
      transit: 0,
      shopping: 0,
      nightlife: 0,
      quiet: 0,
      cafe: 0,
    };
    expect(
      calculateMatchScore(
        { budget: 5, safety: 5, transit: 5, shopping: 5, nightlife: 5, quiet: 5, cafe: 5 },
        zeroWeights
      )
    ).toBe(0);
  });
});

describe("mergeScores", () => {
  it("overrides dynamic dimensions only", () => {
    const base = {
      budget: 5,
      safety: 7,
      transit: 8,
      shopping: 9,
      nightlife: 6,
      quiet: 7,
      cafe: 6,
    };
    const merged = mergeScores(base, { cafe: 10, transit: 9 });
    expect(merged.cafe).toBe(10);
    expect(merged.transit).toBe(9);
    expect(merged.safety).toBe(7);
  });
});

describe("rankNeighborhoods legacy snapshot", () => {
  it("produces stable tokyo ranking with default weights", () => {
    const city = getLocalCity("tokyo")!;
    const ranked = rankNeighborhoods(city.neighborhoods, DEFAULT_WEIGHTS);
    expect(ranked.map((n) => n.id)).toEqual([
      "shimokitazawa",
      "koenji",
      "nakameguro",
      "shibuya",
      "ginza",
      "ueno",
      "shinjuku",
      "asakusa",
    ]);
    expect(ranked[0].matchScore).toBe(81);
  });

  it("produces stable tokyo ranking with chill preset", () => {
    const city = getLocalCity("tokyo")!;
    const ranked = rankNeighborhoods(
      city.neighborhoods,
      PERSONA_PRESETS.chill
    );
    expect(ranked[0].id).toBe("shimokitazawa");
    expect(ranked[1].id).toBe("nakameguro");
  });

  it("reorders when dynamic scores applied", () => {
    const city = getLocalCity("tokyo")!;
    const dynamic = {
      shinjuku: { cafe: 10, transit: 10, shopping: 10 },
    };
    const ranked = rankNeighborhoods(
      city.neighborhoods,
      PERSONA_PRESETS.chill,
      dynamic
    );
    expect(ranked[0].computedScores.cafe).toBe(10);
  });
});
