import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { LoadingFallback } from "@/components/LoadingFallback";
import { ExploreClient } from "@/components/ExploreClient";
import { getCities, getCity } from "@/lib/data";
import { getLocale, getServerT } from "@/i18n/server";
import { parsePresetParam, parseWeightsParam } from "@/lib/recommendation/share";
import { getUser } from "@/lib/supabase/server";

interface ExplorePageProps {
  params: Promise<{ cityId: string }>;
  searchParams: Promise<{ preset?: string; w?: string }>;
}

export async function generateStaticParams() {
  const cities = await getCities();
  return cities.map((city) => ({ cityId: city.id }));
}

export async function generateMetadata({ params }: ExplorePageProps) {
  const { cityId } = await params;
  const [city, t] = await Promise.all([getCity(cityId, await getLocale()), getServerT()]);
  if (!city) return { title: t("explore.cityNotFound") };
  return {
    title: `${city.name} — ${t("meta.titleSuffix")}`,
    description: city.description,
  };
}

export default async function ExplorePage({
  params,
  searchParams,
}: ExplorePageProps) {
  const { cityId } = await params;
  const { preset, w } = await searchParams;
  const locale = await getLocale();
  const [cities, city, user] = await Promise.all([
    getCities(locale),
    getCity(cityId, locale),
    getUser(),
  ]);

  if (!city) notFound();

  const initialPreset = parsePresetParam(preset);
  const initialWeights = initialPreset ? null : parseWeightsParam(w);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <ExploreClient
          cities={cities}
          initialCityId={cityId}
          initialPreset={initialPreset}
          initialWeights={initialWeights}
          isAuthenticated={!!user}
        />
      </Suspense>
    </main>
  );
}
