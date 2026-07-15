import { describe, it, expect } from "vitest";
import {
  calculateMatchScore,
  mergeScores,
  normalizeScoresInCity,
  rankNeighborhoods,
  topMatchDrivers,
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
        {
          budget: 5,
          safety: 5,
          transit: 5,
          shopping: 5,
          nightlife: 5,
          quiet: 5,
          cafe: 5,
        },
        zeroWeights
      )
    ).toBe(0);
  });

  it("ignores low-weight dimensions in match percentage", () => {
    const scores = {
      budget: 10,
      safety: 1,
      transit: 1,
      shopping: 1,
      nightlife: 1,
      quiet: 1,
      cafe: 1,
    };
    const weights = {
      budget: 10,
      safety: 0,
      transit: 0,
      shopping: 0,
      nightlife: 0,
      quiet: 0,
      cafe: 0,
    };
    expect(calculateMatchScore(scores, weights)).toBe(100);
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

  it("returns a shallow copy when dynamic is null", () => {
    const base = {
      budget: 5,
      safety: 7,
      transit: 8,
      shopping: 9,
      nightlife: 6,
      quiet: 7,
      cafe: 6,
    };
    const merged = mergeScores(base, null);
    expect(merged).toEqual(base);
    expect(merged).not.toBe(base);
  });
});

describe("normalizeScoresInCity", () => {
  it("maps min to 1 and max to 10 for each dimension", () => {
    const normalized = normalizeScoresInCity([
      {
        budget: 2,
        safety: 5,
        transit: 1,
        shopping: 3,
        nightlife: 4,
        quiet: 6,
        cafe: 8,
      },
      {
        budget: 8,
        safety: 5,
        transit: 9,
        shopping: 7,
        nightlife: 4,
        quiet: 2,
        cafe: 2,
      },
    ]);
    expect(normalized[0].budget).toBe(1);
    expect(normalized[1].budget).toBe(10);
    expect(normalized[0].safety).toBe(5.5);
    expect(normalized[1].safety).toBe(5.5);
  });
});

describe("topMatchDrivers", () => {
  it("returns dimensions with highest weight×score", () => {
    const scores = {
      budget: 10,
      safety: 10,
      transit: 5,
      shopping: 5,
      nightlife: 5,
      quiet: 5,
      cafe: 5,
    };
    const weights = {
      budget: 10,
      safety: 1,
      transit: 1,
      shopping: 1,
      nightlife: 1,
      quiet: 1,
      cafe: 1,
    };
    expect(topMatchDrivers(scores, weights, 2)).toEqual(["budget", "safety"]);
  });
});

describe("rankNeighborhoods legacy snapshot", () => {
  it("produces stable tokyo ranking with default weights (legacy raw)", () => {
    const city = getLocalCity("tokyo")!;
    const ranked = rankNeighborhoods(
      city.neighborhoods,
      DEFAULT_WEIGHTS,
      {},
      { normalize: false }
    );
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

  it("produces stable tokyo ranking with chill preset (legacy raw)", () => {
    const city = getLocalCity("tokyo")!;
    const ranked = rankNeighborhoods(
      city.neighborhoods,
      PERSONA_PRESETS.chill,
      {},
      { normalize: false }
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
      dynamic,
      { normalize: false }
    );
    expect(ranked[0].computedScores.cafe).toBe(10);
    expect(ranked.find((n) => n.id === "shinjuku")?.scoreSource).toBe("poi");
  });

  it("keeps deterministic order under city normalization", () => {
    const city = getLocalCity("tokyo")!;
    const a = rankNeighborhoods(city.neighborhoods, DEFAULT_WEIGHTS);
    const b = rankNeighborhoods(city.neighborhoods, DEFAULT_WEIGHTS);
    expect(a.map((n) => n.id)).toEqual(b.map((n) => n.id));
    expect(a[0].matchDrivers?.length).toBeGreaterThan(0);
  });

  it("changes top neighborhood between family and nightOwl presets", () => {
    const city = getLocalCity("tokyo")!;
    const family = rankNeighborhoods(
      city.neighborhoods,
      PERSONA_PRESETS.family,
      {},
      { normalize: false }
    );
    const night = rankNeighborhoods(
      city.neighborhoods,
      PERSONA_PRESETS.nightOwl,
      {},
      { normalize: false }
    );
    expect(family[0].id).not.toBe(night[0].id);
  });
});
