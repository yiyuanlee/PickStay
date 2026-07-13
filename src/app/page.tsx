import Link from "next/link";
import { Cloud, GitCompare, Map, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCities } from "@/lib/data";

export default async function HomePage() {
  const cities = await getCities();
  const totalNeighborhoods = cities.reduce(
    (sum, c) => sum + c.neighborhoods.length,
    0
  );

  const features = [
    {
      Icon: SlidersHorizontal,
      title: "7 维偏好引擎",
      desc: "安全、交通、美食、夜生活等实时加权排序",
      stagger: "stagger-1",
    },
    {
      Icon: Map,
      title: "地图 API 增强",
      desc: "服务端代理 + Redis 缓存，POI 数据实时更新",
      stagger: "stagger-2",
    },
    {
      Icon: GitCompare,
      title: "街区对比",
      desc: "2-3 个街区全维度 PK，一键分享",
      stagger: "stagger-3",
    },
    {
      Icon: Cloud,
      title: "云端同步",
      desc: "登录后偏好、收藏、对比方案跨设备同步",
      stagger: "stagger-4",
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <Header />

      <section className="mb-20 pt-4 text-center">
        <p className="animate-fade-up mb-4 text-sm font-medium text-apple-blue">
          智能旅行宿区推荐
        </p>
        <h2 className="animate-fade-up stagger-1 font-display mb-5 text-5xl font-semibold tracking-tight text-apple-text sm:text-7xl">
          找到最适合你的
          <span className="block hero-shimmer">旅行宿区</span>
        </h2>
        <p className="animate-fade-up stagger-2 mx-auto mb-10 max-w-xl text-xl leading-relaxed text-apple-text-secondary">
          通过 7 维偏好权重，实时推荐 {cities.length} 座城市 {totalNeighborhoods}{" "}
          个街区的最佳住宿选择。
        </p>
        <div className="animate-fade-up stagger-3">
          <Button size="lg" asChild>
            <Link href="/explore/tokyo">开始探索</Link>
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
            覆盖城市
          </h3>
          <span className="text-sm text-apple-text-secondary">
            {cities.length} 座城市
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
                {city.neighborhoods.length} 街区
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
