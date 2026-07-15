import { NextResponse } from "next/server";
import { z } from "zod";
import { mapPool } from "@/lib/async-pool";
import { getCity } from "@/lib/data";
import { enrichNeighborhood } from "@/lib/maps/providers";
import { getMapProvider } from "@/lib/maps/scoring";
import { getCachedScores, setCachedScores } from "@/lib/redis/cache";
import { checkRateLimit, clientIpFromRequest } from "@/lib/rate-limit";
import type { DynamicScores } from "@/lib/recommendation/types";

const ENRICH_CONCURRENCY = 4;
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 60_000;

const enrichSchema = z.object({
  cityId: z.string(),
  neighborhoodIds: z.array(z.string()).optional(),
});

type EnrichOutcome =
  | { id: string; status: "cached"; scores: DynamicScores }
  | { id: string; status: "fresh"; scores: DynamicScores }
  | { id: string; status: "failed" };

export async function POST(request: Request) {
  const started = Date.now();
  const ip = clientIpFromRequest(request);
  const rate = checkRateLimit(`enrich:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!rate.ok) {
    return NextResponse.json(
      { error: "Too many requests", retryAfterMs: rate.retryAfterMs },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(rate.retryAfterMs / 1000)),
        },
      }
    );
  }

  try {
    const body = await request.json();
    const parsed = enrichSchema.parse(body);

    const city = await getCity(parsed.cityId);
    if (!city) {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }

    const provider = getMapProvider(city.preferredProvider);
    const targets = parsed.neighborhoodIds?.length
      ? city.neighborhoods.filter((n) =>
          parsed.neighborhoodIds!.includes(n.id)
        )
      : city.neighborhoods;

    const outcomes = await mapPool(
      targets,
      ENRICH_CONCURRENCY,
      async (neighborhood): Promise<EnrichOutcome> => {
        const cached = await getCachedScores(provider, neighborhood.id);
        if (cached) {
          return { id: neighborhood.id, status: "cached", scores: cached };
        }

        const scores = await enrichNeighborhood(
          neighborhood.id,
          neighborhood.center.lat,
          neighborhood.center.lng,
          provider
        );

        if (scores) {
          await setCachedScores(provider, neighborhood.id, scores);
          return { id: neighborhood.id, status: "fresh", scores };
        }

        return { id: neighborhood.id, status: "failed" };
      }
    );

    const results: Record<string, DynamicScores> = {};
    const failedIds: string[] = [];
    let cached = 0;
    let fresh = 0;
    let failed = 0;

    for (const outcome of outcomes) {
      if (outcome.status === "failed") {
        failed += 1;
        failedIds.push(outcome.id);
        continue;
      }
      results[outcome.id] = outcome.scores;
      if (outcome.status === "cached") cached += 1;
      else fresh += 1;
    }

    const durationMs = Date.now() - started;
    const hitRate =
      cached + fresh + failed > 0
        ? Math.round((cached / (cached + fresh + failed)) * 100)
        : 0;

    console.info(
      JSON.stringify({
        event: "maps.enrich",
        cityId: parsed.cityId,
        provider,
        targetCount: targets.length,
        cached,
        fresh,
        failed,
        hitRate,
        durationMs,
        ip,
      })
    );

    return NextResponse.json({
      provider,
      dynamicScores: results,
      meta: {
        cached,
        fresh,
        failed,
        failedIds,
        hitRate,
        durationMs,
        concurrency: ENRICH_CONCURRENCY,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    console.error(
      JSON.stringify({
        event: "maps.enrich.error",
        message: error instanceof Error ? error.message : String(error),
        durationMs: Date.now() - started,
      })
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
