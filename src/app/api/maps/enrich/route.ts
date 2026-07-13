import { NextResponse } from "next/server";
import { z } from "zod";
import { getCity } from "@/lib/data";
import { enrichNeighborhood } from "@/lib/maps/providers";
import { getMapProvider } from "@/lib/maps/scoring";
import { getCachedScores, setCachedScores } from "@/lib/redis/cache";
import type { DynamicScores } from "@/lib/recommendation/types";

const enrichSchema = z.object({
  cityId: z.string(),
  neighborhoodIds: z.array(z.string()).optional(),
});

export async function POST(request: Request) {
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

    const results: Record<string, DynamicScores> = {};

    for (const neighborhood of targets) {
      const cached = await getCachedScores(provider, neighborhood.id);
      if (cached) {
        results[neighborhood.id] = cached;
        continue;
      }

      const scores = await enrichNeighborhood(
        neighborhood.id,
        neighborhood.center.lat,
        neighborhood.center.lng,
        provider
      );

      if (scores) {
        results[neighborhood.id] = scores;
        await setCachedScores(provider, neighborhood.id, scores);
      }
    }

    return NextResponse.json({
      provider,
      dynamicScores: results,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    console.error("Map enrich error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
