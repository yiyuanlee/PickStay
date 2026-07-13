import { describe, it, expect } from "vitest";
import { mapPoiCountsToScores } from "@/lib/maps/scoring";

describe("mapPoiCountsToScores", () => {
  it("maps amap counts correctly", () => {
    const result = mapPoiCountsToScores("amap", {
      cafeCount: 20,
      transitCount: 5,
      shoppingCount: 8,
    });
    expect(result.cafe).toBe(10);
    expect(result.transit).toBe(10);
    expect(result.shopping).toBe(10);
  });

  it("maps google counts correctly", () => {
    const result = mapPoiCountsToScores("google", {
      cafeCount: 10,
      transitCount: 2,
      shoppingCount: 3,
    });
    expect(result.cafe).toBe(5);
    expect(result.transit).toBe(5);
    expect(result.shopping).toBe(5);
  });

  it("enforces minimum score of 2", () => {
    const result = mapPoiCountsToScores("google", {
      cafeCount: 0,
      transitCount: 0,
      shoppingCount: 0,
    });
    expect(result.cafe).toBe(2);
    expect(result.transit).toBe(2);
    expect(result.shopping).toBe(2);
  });
});
