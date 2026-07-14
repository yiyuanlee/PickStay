"use client";

import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "@/i18n/types";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
}

function setLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;SameSite=Lax`;
}

export function LanguageSwitcher({
  currentLocale,
  className,
}: LanguageSwitcherProps) {
  const router = useRouter();

  const switchLocale = (locale: Locale) => {
    if (locale === currentLocale) return;
    setLocaleCookie(locale);
    router.refresh();
  };

  return (
    <div
      className={cn(
        "flex items-center rounded-full bg-[#f5f5f7] p-0.5 text-xs font-medium",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {(["zh", "en"] as const).map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => switchLocale(locale)}
          className={cn(
            "rounded-full px-2.5 py-1 transition-all duration-200",
            currentLocale === locale
              ? "bg-white text-apple-text shadow-sm"
              : "text-apple-text-secondary hover:text-apple-text"
          )}
          aria-pressed={currentLocale === locale}
        >
          {locale === "zh" ? "中文" : "EN"}
        </button>
      ))}
    </div>
  );
}
