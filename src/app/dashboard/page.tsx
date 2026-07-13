import Link from "next/link";
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getNeighborhoodsByIds } from "@/lib/data";
import {
  getFavorites,
  getPreferences,
  getSavedComparisons,
  signOut,
} from "@/lib/actions/user";
import { getUser, getUserProfile } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) redirect("/login?redirect=/dashboard");

  const [profile, preferences, favorites, comparisons] = await Promise.all([
    getUserProfile(),
    getPreferences(),
    getFavorites(),
    getSavedComparisons(),
  ]);

  const favoriteNeighborhoods = favorites.length
    ? await getNeighborhoodsByIds(favorites.map((f) => f.neighborhood_id))
    : [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <Header />

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-apple-text">
            我的 PickStay
          </h2>
          <p className="text-apple-text-secondary">
            {profile?.display_name || user.email}
          </p>
        </div>
        <form action={signOut}>
          <Button variant="secondary" type="submit">
            退出登录
          </Button>
        </form>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>偏好设置</CardTitle>
          </CardHeader>
          <CardContent>
            {preferences ? (
              <div className="space-y-2 text-sm text-apple-text-secondary">
                <p>当前城市: {preferences.city_id || "未设置"}</p>
                <p>预设: {preferences.active_preset || "自定义"}</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/explore/${preferences.city_id || "tokyo"}`}>
                    继续探索
                  </Link>
                </Button>
              </div>
            ) : (
              <p className="text-sm text-apple-text-secondary">暂无保存的偏好</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>收藏的街区 ({favoriteNeighborhoods.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {favoriteNeighborhoods.length === 0 ? (
              <p className="text-sm text-apple-text-secondary">还没有收藏任何街区</p>
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
            <CardTitle>保存的对比方案 ({comparisons.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {comparisons.length === 0 ? (
              <p className="text-sm text-apple-text-secondary">还没有保存对比方案</p>
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
                        查看对比
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
