import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import {
  AdminActionForm,
  AdminBoundActionForm,
} from "@/components/AdminActionForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { getServerT, getLocale } from "@/i18n/server";
import { getDimensionList } from "@/lib/dimensions";
import { getCities } from "@/lib/data";
import {
  deleteCity,
  deleteNeighborhood,
  upsertCity,
  warmCityPoiCache,
} from "@/lib/actions/admin";
import { clearAllPoiCacheAction } from "@/lib/actions/admin-cache";
import { getUserProfile } from "@/lib/supabase/server";

export default async function AdminPage() {
  const [t, locale] = await Promise.all([getServerT(), getLocale()]);
  const dimensionList = getDimensionList(locale);
  const profile = await getUserProfile();
  if (!profile || profile.role !== "admin") redirect("/dashboard");

  const cities = await getCities();

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <Header />

      <h2 className="mb-6 font-display text-3xl font-semibold tracking-tight text-apple-text">
        {t("admin.title")}
      </h2>

      <div className="mb-8 flex flex-wrap gap-3">
        <AdminBoundActionForm action={clearAllPoiCacheAction}>
          <Button variant="outline" type="submit">
            {t("admin.clearCache")}
          </Button>
        </AdminBoundActionForm>
      </div>

      <div className="space-y-8">
        {cities.map((city) => (
          <Card key={city.id}>
            <CardHeader>
              <CardTitle>{city.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <AdminActionForm
                action={upsertCity}
                className="grid gap-3 sm:grid-cols-3"
              >
                <input type="hidden" name="id" value={city.id} />
                <div>
                  <Label>{t("admin.name")}</Label>
                  <Input name="name" defaultValue={city.name} />
                </div>
                <div>
                  <Label>{t("admin.description")}</Label>
                  <Input name="description" defaultValue={city.description} />
                </div>
                <div>
                  <Label>{t("admin.mapProvider")}</Label>
                  <Input
                    name="preferred_provider"
                    defaultValue={city.preferredProvider}
                  />
                </div>
                <input type="hidden" name="center_lat" value={city.center.lat} />
                <input type="hidden" name="center_lng" value={city.center.lng} />
                <Button type="submit" size="sm">
                  {t("admin.saveCity")}
                </Button>
              </AdminActionForm>

              <div className="flex flex-wrap gap-3">
                <AdminBoundActionForm action={() => deleteCity(city.id)}>
                  <Button
                    variant="ghost"
                    size="sm"
                    type="submit"
                    className="text-red-500"
                  >
                    {t("admin.deleteCity")}
                  </Button>
                </AdminBoundActionForm>

                <AdminBoundActionForm action={() => warmCityPoiCache(city.id)}>
                  <Button variant="outline" size="sm" type="submit">
                    {t("admin.warmCache")}
                  </Button>
                </AdminBoundActionForm>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-black/8 text-left text-apple-text-secondary">
                      <th className="py-2">{t("admin.neighborhood")}</th>
                      {dimensionList.map((d) => (
                        <th key={d.key}>{d.shortLabel}</th>
                      ))}
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {city.neighborhoods.map((n) => (
                      <tr
                        key={n.id}
                        className="border-b border-black/5 text-apple-text-secondary"
                      >
                        <td className="py-2 font-medium text-apple-text">
                          {n.name}
                        </td>
                        {dimensionList.map((d) => (
                          <td key={d.key}>{n.scores[d.key]}</td>
                        ))}
                        <td>
                          <AdminBoundActionForm
                            action={() => deleteNeighborhood(n.id)}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              type="submit"
                              className="text-red-500"
                            >
                              {t("admin.delete")}
                            </Button>
                          </AdminBoundActionForm>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
