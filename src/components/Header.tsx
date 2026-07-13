import Link from "next/link";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export async function Header() {
  const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL
    ? await createClient()
    : null;

  let user = null;
  let profile = null;

  if (supabase) {
    const { data } = await supabase.auth.getUser();
    user = data.user;
    if (user) {
      const { data: p } = await supabase
        .from("user_profiles")
        .select("role, display_name")
        .eq("id", user.id)
        .single();
      profile = p;
    }
  }

  return (
    <header className="sticky top-0 z-30 -mx-4 mb-10 px-4 py-3 sm:-mx-6 sm:px-6">
      <div className="apple-surface flex items-center justify-between rounded-2xl px-5 py-3 shadow-sm">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-apple-blue shadow-sm">
            <MapPin className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="font-display text-lg font-semibold text-apple-text">
              PickStay
            </h1>
            <p className="text-xs text-apple-text-secondary">
              个性化旅行住宿街区推荐
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/compare">对比</Link>
          </Button>
          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">我的</Link>
              </Button>
              {profile?.role === "admin" && (
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin">管理</Link>
                </Button>
              )}
            </>
          ) : (
            <Button variant="default" size="sm" asChild>
              <Link href="/login">登录</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
