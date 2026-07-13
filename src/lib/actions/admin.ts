"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/supabase/server";
import type { Scores } from "@/lib/recommendation/types";
import { clearCache } from "@/lib/redis/cache";

export async function upsertCity(formData: FormData): Promise<void> {
  const profile = await getUserProfile();
  if (profile?.role !== "admin") return;

  const supabase = await createClient();
  const { error } = await supabase.from("cities").upsert({
    id: formData.get("id") as string,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    preferred_provider: formData.get("preferred_provider") as string,
    center_lat: Number(formData.get("center_lat")),
    center_lng: Number(formData.get("center_lng")),
  });

  if (error) return;
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteCity(cityId: string): Promise<void> {
  const profile = await getUserProfile();
  if (profile?.role !== "admin") return;

  const supabase = await createClient();
  const { error } = await supabase.from("cities").delete().eq("id", cityId);
  if (error) return;
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function upsertNeighborhood(formData: FormData): Promise<void> {
  const profile = await getUserProfile();
  if (profile?.role !== "admin") return;

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

  if (error) return;
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteNeighborhood(id: string): Promise<void> {
  const profile = await getUserProfile();
  if (profile?.role !== "admin") return;

  const supabase = await createClient();
  const { error } = await supabase.from("neighborhoods").delete().eq("id", id);
  if (error) return;
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function clearPoiCache(provider?: string): Promise<void> {
  const profile = await getUserProfile();
  if (profile?.role !== "admin") return;
  await clearCache(provider);
}
