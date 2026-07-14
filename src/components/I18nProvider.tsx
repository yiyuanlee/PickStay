"use client";

import { createContext, useContext, useMemo } from "react";
import { getMessages } from "@/i18n/messages";
import { createTranslator, type Translator } from "@/i18n/translator";
import type { Locale, Messages } from "@/i18n/types";

const I18nContext = createContext<{
  locale: Locale;
  t: Translator;
  messages: Messages;
} | null>(null);

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const value = useMemo(
    () => ({
      locale,
      t: createTranslator(locale),
      messages: getMessages(locale),
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
