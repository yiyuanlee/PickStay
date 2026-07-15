# ADR 001: Map API server-side proxy

## Status

Accepted

## Context

Neighborhood enrichment needs live POI counts (transit / shopping / café) from Google Places or AMap. Calling those SDKs from the browser would:

- Expose API keys to anyone viewing page source
- Make rate limiting and cost control harder
- Leak provider-specific error payloads to end users

## Decision

All map enrichment goes through `POST /api/maps/enrich`:

1. Validate body with Zod
2. Resolve provider from city preference + env keys
3. Read Upstash Redis cache (`poi:{provider}:{neighborhoodId}`, TTL 24h)
4. Fetch missing neighborhoods with bounded concurrency
5. Return `dynamicScores` plus `meta` (`cached` / `fresh` / `failed`)
6. Fall back to local expert scores when keys / Redis / Maps fail

Admin can clear or warm cache without touching the Maps APIs from the client.

## Consequences

**Positive**

- Keys stay server-only
- Interview / ops story is clear: authz, cache, partial failure
- Mock mode keeps demos working without credentials

**Negative / trade-offs**

- Extra hop and serverless cold starts on first miss
- In-memory rate limit is per-instance (not global) on Vercel
- Enrich still best-effort; ranking must tolerate missing POI
