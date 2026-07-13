import { mapPoiCountsToScores } from "./scoring";
import type { DynamicScores } from "@/lib/recommendation/types";

export async function fetchGooglePoiCounts(
  lat: number,
  lng: number
): Promise<{ transitCount: number; shoppingCount: number; cafeCount: number }> {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) throw new Error("Google Maps API key not configured");
  const apiKey = key;

  async function nearby(type: string): Promise<number> {
    const url = new URL(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    );
    url.searchParams.set("location", `${lat},${lng}`);
    url.searchParams.set("radius", "1500");
    url.searchParams.set("type", type);
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString());
    const data = await res.json();
    return data.results?.length ?? 0;
  }

  const [transitCount, shoppingCount, cafeCount] = await Promise.all([
    nearby("subway_station"),
    nearby("shopping_mall"),
    nearby("cafe"),
  ]);

  return { transitCount, shoppingCount, cafeCount };
}

export async function fetchAmapPoiCounts(
  lat: number,
  lng: number
): Promise<{ transitCount: number; shoppingCount: number; cafeCount: number }> {
  const key = process.env.AMAP_KEY;
  if (!key) throw new Error("AMap API key not configured");
  const apiKey = key;

  async function nearby(type: string): Promise<number> {
    const url = new URL("https://restapi.amap.com/v3/place/around");
    url.searchParams.set("key", apiKey);
    url.searchParams.set("location", `${lng},${lat}`);
    url.searchParams.set("radius", "1500");
    url.searchParams.set("types", type);
    url.searchParams.set("offset", "50");
    url.searchParams.set("page", "1");

    const res = await fetch(url.toString());
    const data = await res.json();
    return Number(data.count) || data.pois?.length || 0;
  }

  const [transitCount, shoppingCount, cafeCount] = await Promise.all([
    nearby("150500"),
    nearby("060100|060200"),
    nearby("050500"),
  ]);

  return { transitCount, shoppingCount, cafeCount };
}

export async function enrichNeighborhood(
  neighborhoodId: string,
  lat: number,
  lng: number,
  provider: "google" | "amap" | "mock"
): Promise<DynamicScores | null> {
  if (provider === "mock") return null;

  try {
    const counts =
      provider === "amap"
        ? await fetchAmapPoiCounts(lat, lng)
        : await fetchGooglePoiCounts(lat, lng);
    return mapPoiCountsToScores(provider, counts);
  } catch (error) {
    console.error(`POI enrich failed for ${neighborhoodId}:`, error);
    return null;
  }
}
