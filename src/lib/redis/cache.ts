/**
 * POI enrich cache (Upstash Redis)
 *
 * Key schema:  `poi:{provider}:{neighborhoodId}`
 *   provider = google | amap | mock
 *   value    = DynamicScores JSON
 *
 * TTL: 24h (CACHE_TTL_SECONDS). Admin "clear cache" deletes `poi:*`
 * or `poi:{provider}:*`. Cold-start warm writes the same keys via
 * warmCityCache / admin warmCityPoiCache to avoid stampede on first explore.
 *
 * Failure mode: get/set errors are swallowed → enrich falls back to live
 * Maps API or mock, so Redis outage never breaks ranking.
 */

import { Redis } from "@upstash/redis";
import type { DynamicScores } from "@/lib/recommendation/types";

let redis: Redis | null = null;

/** Exported for docs / health references. */
export const CACHE_TTL_SECONDS = 86400; // 24h
export const CACHE_KEY_PREFIX = "poi";

function getRedis(): Redis | null {
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return null;
  }
  if (!redis) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
  return redis;
}

export function cacheKey(provider: string, neighborhoodId: string) {
  return `${CACHE_KEY_PREFIX}:${provider}:${neighborhoodId}`;
}

export async function getCachedScores(
  provider: string,
  neighborhoodId: string
): Promise<DynamicScores | null> {
  const client = getRedis();
  if (!client) return null;
  try {
    return await client.get<DynamicScores>(cacheKey(provider, neighborhoodId));
  } catch {
    return null;
  }
}

export async function setCachedScores(
  provider: string,
  neighborhoodId: string,
  scores: DynamicScores
): Promise<void> {
  const client = getRedis();
  if (!client) return;
  try {
    await client.set(cacheKey(provider, neighborhoodId), scores, {
      ex: CACHE_TTL_SECONDS,
    });
  } catch {
    // ignore cache write failures
  }
}

/** Alias used by admin warm path — same write semantics. */
export async function warmCityCache(
  provider: string,
  neighborhoodId: string,
  scores: DynamicScores
): Promise<void> {
  await setCachedScores(provider, neighborhoodId, scores);
}

export async function clearCache(provider?: string): Promise<number> {
  const client = getRedis();
  if (!client) return 0;
  const pattern = provider
    ? `${CACHE_KEY_PREFIX}:${provider}:*`
    : `${CACHE_KEY_PREFIX}:*`;
  const keys = await client.keys(pattern);
  if (!keys.length) return 0;
  await client.del(...keys);
  return keys.length;
}
