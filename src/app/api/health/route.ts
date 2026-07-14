import { NextResponse } from "next/server";
import { getServiceStatus } from "@/lib/env";

export const dynamic = "force-dynamic";

export async function GET() {
  const services = getServiceStatus();
  const coreReady = services.supabase;

  return NextResponse.json(
    {
      status: coreReady ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      services,
      hints: {
        auth: services.supabase
          ? "Configure Supabase Auth redirect URLs in dashboard"
          : "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY",
        maps: services.googleMaps || services.amap
          ? "Map API keys configured"
          : "Add GOOGLE_MAPS_API_KEY and/or AMAP_KEY for live POI enrichment",
        cache: services.redis
          ? "Redis cache active"
          : "Add Upstash Redis to cache POI results (optional)",
        admin: services.supabaseServiceRole
          ? "Service role key set"
          : "Add SUPABASE_SERVICE_ROLE_KEY for server-side admin writes",
      },
    },
    { status: coreReady ? 200 : 503 }
  );
}
