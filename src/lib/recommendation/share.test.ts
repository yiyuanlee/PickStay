import { describe, it, expect } from "vitest";
import { mapPool } from "@/lib/async-pool";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  buildExploreSharePath,
  encodeWeights,
  parsePresetParam,
  parseWeightsParam,
} from "@/lib/recommendation/share";
import { DEFAULT_WEIGHTS, PERSONA_PRESETS } from "@/lib/recommendation/presets";

describe("mapPool", () => {
  it("preserves order with limited concurrency", async () => {
    const items = [1, 2, 3, 4, 5];
    const active = { n: 0, max: 0 };
    const results = await mapPool(items, 2, async (n) => {
      active.n += 1;
      active.max = Math.max(active.max, active.n);
      await new Promise((r) => setTimeout(r, 20));
      active.n -= 1;
      return n * 10;
    });
    expect(results).toEqual([10, 20, 30, 40, 50]);
    expect(active.max).toBeLessThanOrEqual(2);
  });
});

describe("checkRateLimit", () => {
  it("allows then blocks within the window", () => {
    const key = `test-${Math.random()}`;
    expect(checkRateLimit(key, 2, 60_000).ok).toBe(true);
    expect(checkRateLimit(key, 2, 60_000).ok).toBe(true);
    const blocked = checkRateLimit(key, 2, 60_000);
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) expect(blocked.retryAfterMs).toBeGreaterThan(0);
  });
});

describe("share URL helpers", () => {
  it("round-trips weights", () => {
    const encoded = encodeWeights(DEFAULT_WEIGHTS);
    expect(parseWeightsParam(encoded)).toEqual(DEFAULT_WEIGHTS);
  });

  it("rejects malformed weights", () => {
    expect(parseWeightsParam("1,2,3")).toBeNull();
    expect(parseWeightsParam("1,2,3,4,5,6,99")).toBeNull();
  });

  it("builds preset and weight share paths", () => {
    expect(buildExploreSharePath("tokyo", PERSONA_PRESETS.chill, "chill")).toBe(
      "/explore/tokyo?preset=chill"
    );
    expect(
      buildExploreSharePath("paris", DEFAULT_WEIGHTS, null)
    ).toMatch(/^\/explore\/paris\?w=/);
    expect(parsePresetParam("chill")).toBe("chill");
    expect(parsePresetParam("nope")).toBeNull();
  });
});
