"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/supabase/server";
import type { Scores } from "@/lib/recommendation/types";
import { clearCache, warmCityCache } from "@/lib/redis/cache";
import type { ActionResult } from "./types";
import { getCity } from "@/lib/data";
import { enrichNeighborhood } from "@/lib/maps/providers";
import { getMapProvider } from "@/lib/maps/scoring";

export async function upsertCity(formData: FormData): Promise<ActionResult> {
  const profile = await getUserProfile();
  if (profile?.role !== "admin") {
    return { success: false, error: "Unauthorized" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("cities").upsert({
    id: formData.get("id") as string,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    preferred_provider: formData.get("preferred_provider") as string,
    center_lat: Number(formData.get("center_lat")),
    center_lng: Number(formData.get("center_lng")),
  });

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true, message: "City saved" };
}

export async function deleteCity(cityId: string): Promise<ActionResult> {
  const profile = await getUserProfile();
  if (profile?.role !== "admin") {
    return { success: false, error: "Unauthorized" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("cities").delete().eq("id", cityId);
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true, message: "City deleted" };
}

export async function upsertNeighborhood(
  formData: FormData
): Promise<ActionResult> {
  const profile = await getUserProfile();
  if (profile?.role !== "admin") {
    return { success: false, error: "Unauthorized" };
  }

  const scores: Scores = {
    budget: Number(formData.get("budget")),
    safety: Number(formData.get("safety")),
    transit: Number(formData.get("transit")),
    shopping: Number(formData.get("shopping")),
    nightlife: Number(formData.get("nightlife")),
    quiet: Number(formData.get("quiet")),
    cafe: Number(formData.get("cafe")),
  };

  const supabase = await createClient();
  const { error } = await supabase.from("neighborhoods").upsert({
    id: formData.get("id") as string,
    city_id: formData.get("city_id") as string,
    name: formData.get("name") as string,
    tagline: formData.get("tagline") as string,
    scores,
    pros: (formData.get("pros") as string).split("\n").filter(Boolean),
    cons: (formData.get("cons") as string).split("\n").filter(Boolean),
    center_lat: Number(formData.get("center_lat")),
    center_lng: Number(formData.get("center_lng")),
    price_level: formData.get("price_level") as string,
    best_for: formData.get("best_for") as string,
    detail_text: formData.get("detail_text") as string,
  });

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true, message: "Neighborhood saved" };
}

export async function deleteNeighborhood(id: string): Promise<ActionResult> {
  const profile = await getUserProfile();
  if (profile?.role !== "admin") {
    return { success: false, error: "Unauthorized" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("neighborhoods").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true, message: "Neighborhood deleted" };
}

export async function clearPoiCache(provider?: string): Promise<ActionResult> {
  const profile = await getUserProfile();
  if (profile?.role !== "admin") {
    return { success: false, error: "Unauthorized" };
  }
  try {
    const deleted = await clearCache(provider);
    return {
      success: true,
      message: `Cleared ${deleted} cache key(s)`,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Cache clear failed",
    };
  }
}

export async function warmCityPoiCache(cityId: string): Promise<ActionResult> {
  const profile = await getUserProfile();
  if (profile?.role !== "admin") {
    return { success: false, error: "Unauthorized" };
  }

  const city = await getCity(cityId);
  if (!city) return { success: false, error: "City not found" };

  const provider = getMapProvider(city.preferredProvider);
  let warmed = 0;
  let failed = 0;

  for (const neighborhood of city.neighborhoods) {
    try {
      const scores = await enrichNeighborhood(
        neighborhood.id,
        neighborhood.center.lat,
        neighborhood.center.lng,
        provider
      );
      if (scores) {
        await warmCityCache(provider, neighborhood.id, scores);
        warmed += 1;
      } else {
        failed += 1;
      }
    } catch {
      failed += 1;
    }
  }

  return {
    success: true,
    message: `Warmed ${warmed} neighborhood(s); ${failed} failed (${provider})`,
  };
}
