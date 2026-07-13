import { readFileSync, writeFileSync, mkdirSync } from "fs";
import vm from "vm";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const code = readFileSync(path.join(root, "legacy/data.js"), "utf8");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const data = sandbox.window.CITIES_DATA;
mkdirSync(path.join(root, "src/data"), { recursive: true });
writeFileSync(
  path.join(root, "src/data/cities.json"),
  JSON.stringify(data, null, 2)
);

// Generate seed SQL
const lines = [];
lines.push("-- Auto-generated from legacy/data.js");
lines.push("BEGIN;");

for (const [cityId, city] of Object.entries(data)) {
  lines.push(`
INSERT INTO cities (id, name, description, preferred_provider, center_lat, center_lng)
VALUES ('${cityId}', '${city.name.replace(/'/g, "''")}', '${city.description.replace(/'/g, "''")}', '${city.preferredProvider}', ${city.center.lat}, ${city.center.lng})
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  preferred_provider = EXCLUDED.preferred_provider,
  center_lat = EXCLUDED.center_lat,
  center_lng = EXCLUDED.center_lng;`);

  for (const n of city.neighborhoods) {
    const pros = `{${n.pros.map((p) => `"${p.replace(/"/g, '\\"')}"`).join(",")}}`;
    const cons = `{${n.cons.map((c) => `"${c.replace(/"/g, '\\"')}"`).join(",")}}`;
    lines.push(`
INSERT INTO neighborhoods (id, city_id, name, tagline, scores, pros, cons, center_lat, center_lng, price_level, best_for, detail_text)
VALUES ('${n.id}', '${cityId}', '${n.name.replace(/'/g, "''")}', '${n.tagline.replace(/'/g, "''")}', '${JSON.stringify(n.scores)}'::jsonb, '${pros}', '${cons}', ${n.center.lat}, ${n.center.lng}, '${n.priceLevel.replace(/'/g, "''")}', '${n.bestFor.replace(/'/g, "''")}', '${n.detailText.replace(/'/g, "''")}')
ON CONFLICT (id) DO UPDATE SET
  city_id = EXCLUDED.city_id,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  scores = EXCLUDED.scores,
  pros = EXCLUDED.pros,
  cons = EXCLUDED.cons,
  center_lat = EXCLUDED.center_lat,
  center_lng = EXCLUDED.center_lng,
  price_level = EXCLUDED.price_level,
  best_for = EXCLUDED.best_for,
  detail_text = EXCLUDED.detail_text;`);
  }
}

lines.push("COMMIT;");
mkdirSync(path.join(root, "supabase"), { recursive: true });
writeFileSync(path.join(root, "supabase/seed.sql"), lines.join("\n"));

console.log(`Extracted ${Object.keys(data).length} cities`);
console.log(
  `Total neighborhoods: ${Object.values(data).reduce((s, c) => s + c.neighborhoods.length, 0)}`
);
