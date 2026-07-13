import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { getCities } from "@/lib/data";
import {
  deleteCity,
  deleteNeighborhood,
  upsertCity,
} from "@/lib/actions/admin";
import { clearAllPoiCacheAction } from "@/lib/actions/admin-cache";
import { getUserProfile } from "@/lib/supabase/server";

export default async function AdminPage() {
  const profile = await getUserProfile();
  if (!profile || profile.role !== "admin") redirect("/dashboard");

  const cities = await getCities();

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <Header />

      <h2 className="mb-6 text-2xl font-bold text-slate-800">管理后台</h2>

      <div className="mb-8 flex gap-3">
        <form action={clearAllPoiCacheAction}>
          <Button variant="outline" type="submit">
            清除全部 POI 缓存
          </Button>
        </form>
      </div>

      <div className="space-y-8">
        {cities.map((city) => (
          <Card key={city.id}>
            <CardHeader>
              <CardTitle>{city.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form action={upsertCity} className="grid gap-3 sm:grid-cols-3">
                <input type="hidden" name="id" value={city.id} />
                <div>
                  <Label>名称</Label>
                  <Input name="name" defaultValue={city.name} />
                </div>
                <div>
                  <Label>描述</Label>
                  <Input name="description" defaultValue={city.description} />
                </div>
                <div>
                  <Label>地图服务商</Label>
                  <Input name="preferred_provider" defaultValue={city.preferredProvider} />
                </div>
                <input type="hidden" name="center_lat" value={city.center.lat} />
                <input type="hidden" name="center_lng" value={city.center.lng} />
                <Button type="submit" size="sm">保存城市</Button>
              </form>

              <form action={deleteCity.bind(null, city.id)}>
                <Button variant="ghost" size="sm" type="submit" className="text-red-600">
                  删除城市
                </Button>
              </form>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-slate-500">
                      <th className="py-2">街区</th>
                      <th>预算</th>
                      <th>安全</th>
                      <th>交通</th>
                      <th>购物</th>
                      <th>夜生活</th>
                      <th>安静</th>
                      <th>咖啡</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {city.neighborhoods.map((n) => (
                      <tr key={n.id} className="border-b border-black/5">
                        <td className="py-2 font-medium">{n.name.split(" ")[0]}</td>
                        {(["budget", "safety", "transit", "shopping", "nightlife", "quiet", "cafe"] as const).map((k) => (
                          <td key={k}>{n.scores[k]}</td>
                        ))}
                        <td>
                          <form action={deleteNeighborhood.bind(null, n.id)}>
                            <Button variant="ghost" size="sm" type="submit" className="text-red-500">
                              删
                            </Button>
                          </form>
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
