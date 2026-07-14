import { cookies } from "next/headers";
import { createTranslator } from "./translator";
import { DEFAULT_LOCALE, LOCALE_COOKIE, type Locale } from "./types";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return value === "en" ? "en" : DEFAULT_LOCALE;
}

export async function getServerT() {
  const locale = await getLocale();
  return createTranslator(locale);
}

export async function getServerMessages() {
  const locale = await getLocale();
  const t = createTranslator(locale);
  return { locale, t };
}
