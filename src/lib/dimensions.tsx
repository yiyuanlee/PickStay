import {
  Coffee,
  Shield,
  ShoppingBag,
  Sparkles,
  TrainFront,
  Volume2,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { getMessages } from "@/i18n/messages";
import { DIMENSION_KEYS } from "@/lib/recommendation/types";
import type { DimensionKey } from "@/lib/recommendation/types";
import type { Locale } from "@/i18n/types";

const ICONS: Record<DimensionKey, LucideIcon> = {
  budget: Wallet,
  safety: Shield,
  transit: TrainFront,
  shopping: ShoppingBag,
  nightlife: Sparkles,
  quiet: Volume2,
  cafe: Coffee,
};

export function getDimensionList(locale: Locale) {
  const dims = getMessages(locale).dimensions;
  return DIMENSION_KEYS.map((key) => ({
    key,
    label: dims[key].label,
    shortLabel: dims[key].short,
    Icon: ICONS[key],
  }));
}

/** @deprecated Use getDimensionList(locale) instead */
export const DIMENSION_LIST = getDimensionList("zh");
