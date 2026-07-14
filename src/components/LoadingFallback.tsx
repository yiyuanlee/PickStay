"use client";

import { useI18n } from "@/components/I18nProvider";

export function LoadingFallback() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-apple-text-secondary">
      {t("auth.loading")}
    </div>
  );
}
