export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  visible: boolean;
  sortOrder: number;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  specialPrice: number | null;
  imageUrl: string;
  extraImages: string[];
  categoryId: number | null;
  available: boolean;
  featured: boolean;
  visible: boolean;
  tags: string;
  orderingNotes: string;
  sortOrder: number;
};

export type HomepageSection = {
  id: number;
  key: string;
  enabled: boolean;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  extra: Record<string, string>;
  sortOrder: number;
};

export type SiteSettings = {
  siteName: string;
  tagline: string;
  phone: string;
  instagram: string;
  aboutText: string;
  orderClosed: boolean;
  orderClosedTitle: string;
  orderClosedMessage: string;
  orderReopenDate: string;
  footerNote: string;
};

export type StorePayload = {
  settings: SiteSettings;
  categories: Category[];
  products: Product[];
  sections: HomepageSection[];
};

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  unitLabel?: string;
};

export function effectivePrice(product: Pick<Product, "price" | "specialPrice">): number {
  if (product.specialPrice != null && product.specialPrice > 0 && product.specialPrice < product.price) {
    return product.specialPrice;
  }
  return product.price;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "نازلی فینگر فود",
  tagline: "فینگر فود خونگی برای مهمونی‌های به‌یادماندنی",
  phone: "+989129564648",
  instagram: "fingerfood.nazli",
  aboutText:
    "نازلی فینگر فود با عشق و دقت، فینگر فود تازه و خونگی برای تولد، دورهمی و پذیرایی‌های شما آماده می‌کند. از مینی‌پیتزا و بورک تا پک‌های کامل مهمانی، همه چیز با مواد تازه و ظاهر مرتب سرو می‌شود.",
  orderClosed: false,
  orderClosedTitle: "ثبت سفارش موقتاً بسته است",
  orderClosedMessage: "ثبت سفارش از تاریخ {date} مجدداً فعال خواهد شد.",
  orderReopenDate: "",
  footerNote: "سفارش‌ها معمولاً از ۲۴ ساعت قبل هماهنگ می‌شوند.",
};
