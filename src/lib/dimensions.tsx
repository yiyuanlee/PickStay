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
import { DIMENSION_KEYS } from "@/lib/recommendation/types";
import type { DimensionKey } from "@/lib/recommendation/types";

export const DIMENSION_CONFIG: Record<
  DimensionKey,
  { label: string; shortLabel: string; Icon: LucideIcon }
> = {
  budget: { label: "预算友好", shortLabel: "预算", Icon: Wallet },
  safety: { label: "安全环境", shortLabel: "安全", Icon: Shield },
  transit: { label: "交通便利", shortLabel: "交通", Icon: TrainFront },
  shopping: { label: "美食购物", shortLabel: "购物", Icon: ShoppingBag },
  nightlife: { label: "夜生活", shortLabel: "夜生活", Icon: Sparkles },
  quiet: { label: "安静舒适", shortLabel: "安静", Icon: Volume2 },
  cafe: { label: "咖啡 Chill", shortLabel: "咖啡", Icon: Coffee },
};

export const DIMENSION_LIST = DIMENSION_KEYS.map((key) => ({
  key,
  ...DIMENSION_CONFIG[key],
}));
