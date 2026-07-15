import Link from "next/link";
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getLocale, getServerT } from "@/i18n/server";
import { getNeighborhoodsByIds } from "@/lib/data";
import {
  getFavorites,
  getPreferences,
  getSavedComparisons,
  signOut,
} from "@/lib/actions/user";
import { DEFAULT_WEIGHTS } from "@/lib/recommendation/presets";
import { buildExploreSharePath } from "@/lib/recommendation/share";
import type { PersonaPresetId, Weights } from "@/lib/recommendation/types";
import { getUser, getUserProfile } from "@/lib/supabase/server";

function asWeights(raw: unknown): Weights {
  if (!raw || typeof raw !== "object") return DEFAULT_WEIGHTS;
  return { ...DEFAULT_WEIGHTS, ...(raw as Partial<Weights>) };
}

export default async function DashboardPage() {
  const [t, locale] = await Promise.all([getServerT(), getLocale()]);
  const user = await getUser();
  if (!user) redirect("/login?redirect=/dashboard");

  const [profile, preferences, favorites, comparisons] = await Promise.all([
    getUserProfile(),
    getPreferences(),
    getFavorites(),
    getSavedComparisons(),
  ]);

  const favoriteNeighborhoods = favorites.length
    ? await getNeighborhoodsByIds(favorites.map((f) => f.neighborhood_id), locale)
    : [];

  const continueHref = preferences
    ? buildExploreSharePath(
        preferences.city_id || "tokyo",
        asWeights(preferences.weights),
        (preferences.active_preset as PersonaPresetId | null) ?? null
      )
    : "/explore/tokyo";

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <Header />

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-apple-text">
            {t("dashboard.title")}
          </h2>
          <p className="text-apple-text-secondary">
            {profile?.display_name || user.email}
          </p>
        </div>
        <form action={signOut}>
          <Button variant="secondary" type="submit">
            {t("nav.logout")}
          </Button>
        </form>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.preferences")}</CardTitle>
          </CardHeader>
          <CardContent>
            {preferences ? (
              <div className="space-y-2 text-sm text-apple-text-secondary">
                <p>
                  {t("dashboard.currentCity")}: {preferences.city_id || t("dashboard.notSet")}
                </p>
                <p>
                  {t("dashboard.preset")}: {preferences.active_preset || t("dashboard.custom")}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href={continueHref} data-testid="continue-explore">
                    {t("dashboard.continueExplore")}
                  </Link>
                </Button>
              </div>
            ) : (
              <p className="text-sm text-apple-text-secondary">
                {t("dashboard.noPreferences")}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {t("dashboard.favorites")} ({favoriteNeighborhoods.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {favoriteNeighborhoods.length === 0 ? (
              <p className="text-sm text-apple-text-secondary">
                {t("dashboard.noFavorites")}
              </p>
            ) : (
              <ul className="space-y-2">
                {favoriteNeighborhoods.map((n) => (
                  <li key={n.id}>
                    <Link
                      href={`/explore/${n.cityId}`}
                      className="text-sm text-apple-blue hover:underline"
                    >
                      {n.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {t("dashboard.savedComparisons")} ({comparisons.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {comparisons.length === 0 ? (
              <p className="text-sm text-apple-text-secondary">
                {t("dashboard.noComparisons")}
              </p>
            ) : (
              <ul className="space-y-3">
                {comparisons.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-center justify-between rounded-2xl border border-black/8 bg-[#f5f5f7] px-4 py-3"
                  >
                    <span className="font-medium text-apple-text">{c.name}</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/compare?ids=${c.neighborhood_ids.join(",")}`}>
                        {t("dashboard.viewCompare")}
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
