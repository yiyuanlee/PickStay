"use server";

import { clearPoiCache } from "@/lib/actions/admin";
import type { ActionResult } from "@/lib/actions/types";

export async function clearAllPoiCacheAction(): Promise<ActionResult> {
  return clearPoiCache();
}
