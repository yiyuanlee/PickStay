"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { PersonaPresetId, Weights } from "@/lib/recommendation/types";

export async function savePreferences(
  cityId: string,
  weights: Weights,
  activePreset: PersonaPresetId | null
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("user_preferences").upsert({
    user_id: user.id,
    city_id: cityId,
    weights,
    active_preset: activePreset,
    updated_at: new Date().toISOString(),
  });

  if (error) return { error: error.message };
  revalidatePath("/dashboard");
  return { success: true };
}

export async function getPreferences() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return data;
}

export async function toggleFavorite(neighborhoodId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { data: existing } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user.id)
    .eq("neighborhood_id", neighborhoodId)
    .single();

  if (existing) {
    await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("neighborhood_id", neighborhoodId);
    revalidatePath("/dashboard");
    return { favorited: false };
  }

  const { error } = await supabase.from("favorites").insert({
    user_id: user.id,
    neighborhood_id: neighborhoodId,
  });

  if (error) return { error: error.message };
  revalidatePath("/dashboard");
  return { favorited: true };
}

export async function getFavorites() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("favorites")
    .select("neighborhood_id, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return data || [];
}

export async function saveComparison(name: string, neighborhoodIds: string[]) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("saved_comparisons").insert({
    user_id: user.id,
    name,
    neighborhood_ids: neighborhoodIds,
  });

  if (error) return { error: error.message };
  revalidatePath("/dashboard");
  return { success: true };
}

export async function getSavedComparisons() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("saved_comparisons")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return data || [];
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
