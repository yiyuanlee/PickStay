/**
 * Offline ranking regression — prints Top-3 per persona for each city.
 * Run: npm run test:ranking
 *
 * Compare against fixtures/ranking-baseline.json after intentional score changes.
 */
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { getLocalCities } from "../src/lib/data/local";
import { rankNeighborhoods } from "../src/lib/recommendation/engine";
import { PERSONA_PRESETS } from "../src/lib/recommendation/presets";
import type { PersonaPresetId } from "../src/lib/recommendation/types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const baselinePath = resolve(__dirname, "../fixtures/ranking-baseline.json");

type Snapshot = Record<string, Record<string, string[]>>;

function buildSnapshot(): Snapshot {
  const cities = getLocalCities();
  const snapshot: Snapshot = {};

  for (const city of cities) {
    snapshot[city.id] = {};
    for (const [presetId, weights] of Object.entries(PERSONA_PRESETS) as [
      PersonaPresetId,
      (typeof PERSONA_PRESETS)[PersonaPresetId],
    ][]) {
      const ranked = rankNeighborhoods(city.neighborhoods, weights, {}, {
        normalize: true,
      });
      snapshot[city.id][presetId] = ranked.slice(0, 3).map((n) => n.id);
    }
  }

  return snapshot;
}

const current = buildSnapshot();
const update = process.argv.includes("--update");

if (update || !existsSync(baselinePath)) {
  mkdirSync(dirname(baselinePath), { recursive: true });
  writeFileSync(baselinePath, JSON.stringify(current, null, 2) + "\n");
  console.log(`Wrote baseline → ${baselinePath}`);
  process.exit(0);
}

const baseline = JSON.parse(readFileSync(baselinePath, "utf8")) as Snapshot;
const diffs: string[] = [];

for (const cityId of Object.keys(current)) {
  for (const presetId of Object.keys(current[cityId])) {
    const a = (baseline[cityId]?.[presetId] ?? []).join(",");
    const b = current[cityId][presetId].join(",");
    if (a !== b) {
      diffs.push(`${cityId}/${presetId}: ${a || "(missing)"} → ${b}`);
    }
  }
}

if (diffs.length) {
  console.error("Ranking regression detected:");
  for (const line of diffs) console.error(`  - ${line}`);
  console.error("\nIf intentional, re-run: npm run test:ranking -- --update");
  process.exit(1);
}

console.log("Ranking regression OK — Top-3 matches baseline for all personas/cities.");
console.log(
  JSON.stringify(
    Object.fromEntries(
      Object.entries(current).map(([id, presets]) => [
        id,
        Object.fromEntries(
          Object.entries(presets).map(([p, top]) => [p, top.slice(0, 3)])
        ),
      ])
    ),
    null,
    2
  )
);
