import { DIMENSION_KEYS } from "@/lib/recommendation/types";
import type {
  PersonaPresetId,
  Weights,
} from "@/lib/recommendation/types";
import { DEFAULT_WEIGHTS, PERSONA_PRESETS } from "@/lib/recommendation/presets";

const VALID_PRESETS = new Set<string>(Object.keys(PERSONA_PRESETS));

/** Serialize weights as comma-separated values in DIMENSION_KEYS order. */
export function encodeWeights(weights: Weights): string {
  return DIMENSION_KEYS.map((key) => weights[key]).join(",");
}

export function parseWeightsParam(raw: string | null | undefined): Weights | null {
  if (!raw) return null;
  const parts = raw.split(",").map((p) => Number(p.trim()));
  if (parts.length !== DIMENSION_KEYS.length) return null;
  if (parts.some((n) => !Number.isFinite(n) || n < 0 || n > 10)) return null;

  const weights = { ...DEFAULT_WEIGHTS };
  DIMENSION_KEYS.forEach((key, i) => {
    weights[key] = parts[i];
  });
  return weights;
}

export function parsePresetParam(
  raw: string | null | undefined
): PersonaPresetId | null {
  if (!raw || !VALID_PRESETS.has(raw)) return null;
  return raw as PersonaPresetId;
}

export function buildExploreSharePath(
  cityId: string,
  weights: Weights,
  preset: PersonaPresetId | null
): string {
  const params = new URLSearchParams();
  if (preset) {
    params.set("preset", preset);
  } else {
    params.set("w", encodeWeights(weights));
  }
  const query = params.toString();
  return `/explore/${cityId}${query ? `?${query}` : ""}`;
}

export function buildExploreShareUrl(
  origin: string,
  cityId: string,
  weights: Weights,
  preset: PersonaPresetId | null
): string {
  return `${origin.replace(/\/$/, "")}${buildExploreSharePath(cityId, weights, preset)}`;
}
