"use server";

import { clearCache } from "@/lib/redis/cache";
import { getUserProfile } from "@/lib/supabase/server";

export async function clearAllPoiCacheAction(): Promise<void> {
  const profile = await getUserProfile();
  if (profile?.role !== "admin") return;
  await clearCache();
}
