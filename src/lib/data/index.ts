import { createClient } from "@supabase/supabase-js";
import type { Locale } from "@/i18n/types";
import { DEFAULT_LOCALE } from "@/i18n/types";
import type { City, Neighborhood, Scores } from "@/lib/recommendation/types";
import { getLocalCities, getLocalCity, getLocalNeighborhood } from "./local";
import {
  localizeCities,
  localizeCity,
  localizeNeighborhood,
  localizeNeighborhoods,
} from "./localize";

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

export async function getCities(locale: Locale = DEFAULT_LOCALE): Promise<City[]> {
  let cities: City[];

  if (!isSupabaseConfigured()) {
    cities = getLocalCities();
  } else {
    const supabase = getAdminClient();
    const { data: cityRows, error: citiesError } = await supabase
      .from("cities")
      .select("*")
      .order("name");

    if (citiesError || !cityRows?.length) {
      cities = getLocalCities();
    } else {
      const { data: neighborhoods, error: nError } = await supabase
        .from("neighborhoods")
        .select("*");

      if (nError) {
        cities = getLocalCities();
      } else {
        cities = cityRows.map((city) => ({
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
    }
  }

  return localizeCities(cities, locale);
}

export async function getCity(
  cityId: string,
  locale: Locale = DEFAULT_LOCALE
): Promise<City | null> {
  let city: City | null;

  if (!isSupabaseConfigured()) {
    city = getLocalCity(cityId);
  } else {
    const supabase = getAdminClient();
    const { data: cityRow, error } = await supabase
      .from("cities")
      .select("*")
      .eq("id", cityId)
      .single();

    if (error || !cityRow) {
      city = getLocalCity(cityId);
    } else {
      const { data: neighborhoods } = await supabase
        .from("neighborhoods")
        .select("*")
        .eq("city_id", cityId);

      city = {
        id: cityRow.id,
        name: cityRow.name,
        description: cityRow.description,
        preferredProvider: cityRow.preferred_provider as City["preferredProvider"],
        center: { lat: cityRow.center_lat, lng: cityRow.center_lng },
        neighborhoods: (neighborhoods || []).map(mapNeighborhood),
      };
    }
  }

  return city ? localizeCity(city, locale) : null;
}

export async function getNeighborhood(
  neighborhoodId: string,
  locale: Locale = DEFAULT_LOCALE
): Promise<Neighborhood | null> {
  let neighborhood: Neighborhood | null;

  if (!isSupabaseConfigured()) {
    neighborhood = getLocalNeighborhood(neighborhoodId);
  } else {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("neighborhoods")
      .select("*")
      .eq("id", neighborhoodId)
      .single();

    if (error || !data) {
      neighborhood = getLocalNeighborhood(neighborhoodId);
    } else {
      neighborhood = mapNeighborhood(data);
    }
  }

  return neighborhood ? localizeNeighborhood(neighborhood, locale) : null;
}

export async function getNeighborhoodsByIds(
  ids: string[],
  locale: Locale = DEFAULT_LOCALE
): Promise<Neighborhood[]> {
  const results = await Promise.all(ids.map((id) => getNeighborhood(id, locale)));
  return results.filter((n): n is Neighborhood => n !== null);
}
