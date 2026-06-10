import { SubscriptionItemDto } from "@/types/Subscriptions";

export const SUBSCRIBE_SELECTION_STORAGE_KEY = "everin.subscribe.selection.v1";

export type SubscribeSelectionItem = SubscriptionItemDto & {
  name: string;
  amount: number;
  unitPrice: number;
  modelSeq?: number;
  appYm?: string;
  smPriceType?: number;
};

export type SubscribeSelectionSnapshot = {
  selected: Record<string, boolean>;
  plans: Record<string, string>;
  headcounts: Record<string, number>;
  items: SubscribeSelectionItem[];
  total: number;
  hasQuoteOnly: boolean;
  portalId: string;
  savedAt: string;
};

export function readSubscribeSelectionSnapshot(): SubscribeSelectionSnapshot | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(SUBSCRIBE_SELECTION_STORAGE_KEY);
    if (!raw) return null;

    return JSON.parse(raw) as SubscribeSelectionSnapshot;
  } catch {
    return null;
  }
}

export function writeSubscribeSelectionSnapshot(snapshot: SubscribeSelectionSnapshot) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    SUBSCRIBE_SELECTION_STORAGE_KEY,
    JSON.stringify(snapshot)
  );
}

export function clearSubscribeSelectionSnapshot() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(SUBSCRIBE_SELECTION_STORAGE_KEY);
}
