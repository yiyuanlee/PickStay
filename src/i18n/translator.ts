import { getMessages } from "./messages";
import type { Locale } from "./types";

type Params = Record<string, string | number>;

function interpolate(text: string, params?: Params) {
  if (!params) return text;
  return Object.entries(params).reduce(
    (result, [key, value]) =>
      result.replaceAll(`{${key}}`, String(value)),
    text
  );
}

export function createTranslator(locale: Locale) {
  const m = getMessages(locale);

  return function t(
    key: string,
    params?: Params
  ): string {
    const parts = key.split(".");
    let value: unknown = m;
    for (const part of parts) {
      if (value && typeof value === "object" && part in value) {
        value = (value as Record<string, unknown>)[part];
      } else {
        return key;
      }
    }
    return typeof value === "string" ? interpolate(value, params) : key;
  };
}

export type Translator = ReturnType<typeof createTranslator>;
