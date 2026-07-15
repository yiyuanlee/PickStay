/**
 * Seeds Supabase via MCP execute_sql chunks.
 * Run after: node scripts/extract-legacy-data.mjs (generates seed-chunks)
 * Usage: node scripts/seed-remote-chunks.mjs
 * Requires SUPABASE_ACCESS_TOKEN or use Supabase MCP execute_sql manually.
 */
import { readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const chunksDir = path.join(__dirname, "../supabase/seed-chunks");

const files = readdirSync(chunksDir)
  .filter((f) => f.endsWith(".sql") && !f.startsWith("_tmp_"))
  .sort();
console.log(`Found ${files.length} seed chunks in supabase/seed-chunks/`);
console.log("Execute each file via Supabase SQL Editor or MCP execute_sql:");
files.forEach((f) => console.log(`  - supabase/seed-chunks/${f}`));
