import { useQuery } from "@tanstack/react-query";
import { getStoreData } from "@/lib/functions/catalog";
import { DEFAULT_SETTINGS, type StorePayload } from "@/lib/types";

export const emptyStore: StorePayload = {
  settings: DEFAULT_SETTINGS,
  categories: [],
  products: [],
  sections: [],
};

export function useStoreData() {
  return useQuery({
    queryKey: ["store"],
    queryFn: () => getStoreData(),
  });
}

export function publicCategories(store: StorePayload) {
  return store.categories.filter((c) => c.visible);
}

export function publicProducts(store: StorePayload, categoryId?: number | null) {
  const hiddenCats = new Set(store.categories.filter((c) => !c.visible).map((c) => c.id));
  return store.products.filter((p) => {
    if (!p.visible) return false;
    if (p.categoryId && hiddenCats.has(p.categoryId)) return false;
    if (categoryId && p.categoryId !== categoryId) return false;
    return true;
  });
}
