export function getAppUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    "https://pickstay.vercel.app"
  );
}

export type ServiceStatus = {
  supabase: boolean;
  supabaseServiceRole: boolean;
  redis: boolean;
  googleMaps: boolean;
  amap: boolean;
  sentry: boolean;
};

export function getServiceStatus(): ServiceStatus {
  return {
    supabase: Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ),
    supabaseServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    redis: Boolean(
      process.env.UPSTASH_REDIS_REST_URL &&
        process.env.UPSTASH_REDIS_REST_TOKEN
    ),
    googleMaps: Boolean(process.env.GOOGLE_MAPS_API_KEY),
    amap: Boolean(process.env.AMAP_KEY),
    sentry: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
  };
}

export function isProductionReady(): boolean {
  const s = getServiceStatus();
  return s.supabase && s.supabaseServiceRole;
}
