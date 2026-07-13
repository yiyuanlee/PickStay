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
    <header className="mb-8 flex items-center justify-between border-b border-black/5 pb-4">
      <Link href="/" className="group">
        <div className="flex items-center gap-2">
          <MapPin className="h-7 w-7 text-teal-600" />
          <div>
            <h1 className="bg-gradient-to-br from-teal-700 to-sky-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
              PickStay
            </h1>
            <p className="text-sm text-slate-500">
              个性化旅行住宿街区推荐
            </p>
          </div>
        </div>
      </Link>

      <nav className="flex items-center gap-2">
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
          <Button variant="secondary" size="sm" asChild>
            <Link href="/login">登录</Link>
          </Button>
        )}
      </nav>
    </header>
  );
}
