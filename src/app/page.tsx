import Link from "next/link";
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

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <Header />

      <section className="mb-12 text-center">
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl">
          找到最适合你的
          <span className="bg-gradient-to-r from-teal-600 to-sky-500 bg-clip-text text-transparent">
            {" "}旅行宿区
          </span>
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-500">
          通过 7 维偏好权重，实时推荐 {cities.length} 座城市 {totalNeighborhoods} 个街区的最佳住宿选择。
          支持地图 API 动态增强与多街区对比。
        </p>
        <Button size="lg" asChild>
          <Link href="/explore/tokyo">开始探索 →</Link>
        </Button>
      </section>

      <section className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: "⚙️", title: "7 维偏好引擎", desc: "安全、交通、美食、夜生活等实时加权排序" },
          { icon: "🗺️", title: "地图 API 增强", desc: "服务端代理 + Redis 缓存，POI 数据实时更新" },
          { icon: "⚖️", title: "街区对比", desc: "2-3 个街区全维度 PK，一键分享" },
          { icon: "☁️", title: "云端同步", desc: "登录后偏好、收藏、对比方案跨设备同步" },
        ].map((f) => (
          <Card key={f.title}>
            <CardContent className="p-5">
              <div className="mb-2 text-2xl">{f.icon}</div>
              <h3 className="font-bold text-slate-800">{f.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{f.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <h3 className="mb-4 text-xl font-bold text-slate-800">覆盖城市</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/explore/${city.id}`}
              className="glass-card rounded-2xl p-4 text-center transition-all hover:shadow-md hover:bg-white/90"
            >
              <div className="font-semibold text-slate-800">
                {city.name.split(" ")[0]}
              </div>
              <div className="mt-1 text-xs text-slate-500">
                {city.neighborhoods.length} 街区
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
