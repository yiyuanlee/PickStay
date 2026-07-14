import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { LoadingFallback } from "@/components/LoadingFallback";
import { ExploreClient } from "@/components/ExploreClient";
import { getCities, getCity } from "@/lib/data";
import { getServerT } from "@/i18n/server";
import { getUser } from "@/lib/supabase/server";

interface ExplorePageProps {
  params: Promise<{ cityId: string }>;
  searchParams: Promise<{ preset?: string }>;
}

export async function generateStaticParams() {
  const cities = await getCities();
  return cities.map((city) => ({ cityId: city.id }));
}

export async function generateMetadata({ params }: ExplorePageProps) {
  const { cityId } = await params;
  const [city, t] = await Promise.all([getCity(cityId), getServerT()]);
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
  const { preset } = await searchParams;
  const [cities, city, user] = await Promise.all([
    getCities(),
    getCity(cityId),
    getUser(),
  ]);

  if (!city) notFound();

  const validPresets = ["firstTime", "backpacker", "family", "chill", "nightOwl"];
  const initialPreset = validPresets.includes(preset ?? "")
    ? (preset as "firstTime" | "backpacker" | "family" | "chill" | "nightOwl")
    : null;

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <ExploreClient
          cities={cities}
          initialCityId={cityId}
          initialPreset={initialPreset}
          isAuthenticated={!!user}
        />
      </Suspense>
    </main>
  );
}
