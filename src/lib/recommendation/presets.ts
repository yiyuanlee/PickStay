import type { PersonaPresetId, Weights } from "./types";

export const PERSONA_PRESETS: Record<PersonaPresetId, Weights> = {
  firstTime: {
    budget: 5,
    safety: 9,
    transit: 10,
    shopping: 8,
    nightlife: 6,
    quiet: 6,
    cafe: 6,
  },
  backpacker: {
    budget: 10,
    safety: 7,
    transit: 9,
    shopping: 5,
    nightlife: 7,
    quiet: 5,
    cafe: 6,
  },
  family: {
    budget: 5,
    safety: 10,
    transit: 7,
    shopping: 6,
    nightlife: 2,
    quiet: 10,
    cafe: 7,
  },
  chill: {
    budget: 5,
    safety: 9,
    transit: 7,
    shopping: 8,
    nightlife: 4,
    quiet: 9,
    cafe: 10,
  },
  nightOwl: {
    budget: 5,
    safety: 7,
    transit: 8,
    shopping: 8,
    nightlife: 10,
    quiet: 3,
    cafe: 7,
  },
};

export const PERSONA_LABELS: Record<PersonaPresetId, string> = {
  firstTime: "初旅探索",
  backpacker: "特种背包",
  family: "家庭出行",
  chill: "文艺/咖啡控",
  nightOwl: "夜猫一族",
};

export const DEFAULT_WEIGHTS: Weights = {
  budget: 5,
  safety: 5,
  transit: 5,
  shopping: 5,
  nightlife: 5,
  quiet: 5,
  cafe: 5,
};
