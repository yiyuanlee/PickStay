import type { MetadataRoute } from "next";
import { getAppUrl } from "@/lib/env";
import { getCities } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getAppUrl();
  const cities = await getCities();

  const cityPages = cities.map((city) => ({
    url: `${base}/explore/${city.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/compare`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/login`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...cityPages,
  ];
}
