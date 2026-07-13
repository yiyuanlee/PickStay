import { Redis } from "@upstash/redis";
import type { DynamicScores } from "@/lib/recommendation/types";

let redis: Redis | null = null;

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

const CACHE_TTL_SECONDS = 86400; // 24h

export function cacheKey(provider: string, neighborhoodId: string) {
  return `poi:${provider}:${neighborhoodId}`;
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

export async function clearCache(provider?: string): Promise<number> {
  const client = getRedis();
  if (!client) return 0;
  const pattern = provider ? `poi:${provider}:*` : "poi:*";
  const keys = await client.keys(pattern);
  if (!keys.length) return 0;
  await client.del(...keys);
  return keys.length;
}
