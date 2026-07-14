import Link from "next/link";
import { Cloud, GitCompare, Map, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getServerT } from "@/i18n/server";
import { getCities } from "@/lib/data";

export default async function HomePage() {
  const t = await getServerT();
  const cities = await getCities();
  const totalNeighborhoods = cities.reduce(
    (sum, c) => sum + c.neighborhoods.length,
    0
  );

  const features = [
    {
      Icon: SlidersHorizontal,
      title: t("home.features.engine.title"),
      desc: t("home.features.engine.desc"),
      stagger: "stagger-1",
    },
    {
      Icon: Map,
      title: t("home.features.maps.title"),
      desc: t("home.features.maps.desc"),
      stagger: "stagger-2",
    },
    {
      Icon: GitCompare,
      title: t("home.features.compare.title"),
      desc: t("home.features.compare.desc"),
      stagger: "stagger-3",
    },
    {
      Icon: Cloud,
      title: t("home.features.sync.title"),
      desc: t("home.features.sync.desc"),
      stagger: "stagger-4",
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <Header />

      <section className="mb-20 pt-4 text-center">
        <p className="animate-fade-up mb-4 text-sm font-medium text-apple-blue">
          {t("home.eyebrow")}
        </p>
        <h2 className="animate-fade-up stagger-1 font-display mb-5 text-5xl font-semibold tracking-tight text-apple-text sm:text-7xl">
          {t("home.titleLine1")}
          <span className="block hero-shimmer">{t("home.titleLine2")}</span>
        </h2>
        <p className="animate-fade-up stagger-2 mx-auto mb-10 max-w-xl text-xl leading-relaxed text-apple-text-secondary">
          {t("home.subtitle", {
            cities: cities.length,
            neighborhoods: totalNeighborhoods,
          })}
        </p>
        <div className="animate-fade-up stagger-3">
          <Button size="lg" asChild>
            <Link href="/explore/tokyo">{t("home.cta")}</Link>
          </Button>
        </div>
      </section>

      <section className="mb-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ Icon, title, desc, stagger }) => (
          <Card
            key={title}
            className={`animate-fade-up ${stagger} hover:-translate-y-1`}
          >
            <CardContent className="p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f5f5f7] text-apple-blue">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-apple-text">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-apple-text-secondary">
                {desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <div className="animate-fade-up stagger-4 mb-6 flex items-end justify-between">
          <h3 className="font-display text-2xl font-semibold text-apple-text">
            {t("home.citiesTitle")}
          </h3>
          <span className="text-sm text-apple-text-secondary">
            {t("home.citiesCount", { count: cities.length })}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {cities.map((city, i) => (
            <Link
              key={city.id}
              href={`/explore/${city.id}`}
              className="animate-scale-in apple-card group p-4 text-center hover:-translate-y-0.5"
              style={{ animationDelay: `${0.4 + i * 0.06}s` }}
            >
              <div className="font-semibold text-apple-text transition-colors group-hover:text-apple-blue">
                {city.name.split(" ")[0]}
              </div>
              <div className="mt-1 text-xs text-apple-text-secondary">
                {city.neighborhoods.length} {t("home.neighborhoods")}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
