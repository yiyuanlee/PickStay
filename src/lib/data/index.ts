import { createClient } from "@supabase/supabase-js";
import type { City, Neighborhood, Scores } from "@/lib/recommendation/types";
import { getLocalCities, getLocalCity, getLocalNeighborhood } from "./local";

function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

function mapNeighborhood(row: Record<string, unknown>): Neighborhood {
  return {
    id: row.id as string,
    cityId: row.city_id as string,
    name: row.name as string,
    tagline: row.tagline as string,
    scores: row.scores as Scores,
    pros: row.pros as string[],
    cons: row.cons as string[],
    center: { lat: row.center_lat as number, lng: row.center_lng as number },
    priceLevel: row.price_level as string,
    bestFor: row.best_for as string,
    detailText: row.detail_text as string,
  };
}

export async function getCities(): Promise<City[]> {
  if (!isSupabaseConfigured()) return getLocalCities();

  const supabase = getAdminClient();
  const { data: cities, error: citiesError } = await supabase
    .from("cities")
    .select("*")
    .order("name");

  if (citiesError || !cities?.length) return getLocalCities();

  const { data: neighborhoods, error: nError } = await supabase
    .from("neighborhoods")
    .select("*");

  if (nError) return getLocalCities();

  return cities.map((city) => ({
    id: city.id,
    name: city.name,
    description: city.description,
    preferredProvider: city.preferred_provider as City["preferredProvider"],
    center: { lat: city.center_lat, lng: city.center_lng },
    neighborhoods: (neighborhoods || [])
      .filter((n) => n.city_id === city.id)
      .map(mapNeighborhood),
  }));
}

export async function getCity(cityId: string): Promise<City | null> {
  if (!isSupabaseConfigured()) return getLocalCity(cityId);

  const supabase = getAdminClient();
  const { data: city, error } = await supabase
    .from("cities")
    .select("*")
    .eq("id", cityId)
    .single();

  if (error || !city) return getLocalCity(cityId);

  const { data: neighborhoods } = await supabase
    .from("neighborhoods")
    .select("*")
    .eq("city_id", cityId);

  return {
    id: city.id,
    name: city.name,
    description: city.description,
    preferredProvider: city.preferred_provider as City["preferredProvider"],
    center: { lat: city.center_lat, lng: city.center_lng },
    neighborhoods: (neighborhoods || []).map(mapNeighborhood),
  };
}

export async function getNeighborhood(
  neighborhoodId: string
): Promise<Neighborhood | null> {
  if (!isSupabaseConfigured()) return getLocalNeighborhood(neighborhoodId);

  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from("neighborhoods")
    .select("*")
    .eq("id", neighborhoodId)
    .single();

  if (error || !data) return getLocalNeighborhood(neighborhoodId);
  return mapNeighborhood(data);
}

export async function getNeighborhoodsByIds(
  ids: string[]
): Promise<Neighborhood[]> {
  const results = await Promise.all(ids.map((id) => getNeighborhood(id)));
  return results.filter((n): n is Neighborhood => n !== null);
}
