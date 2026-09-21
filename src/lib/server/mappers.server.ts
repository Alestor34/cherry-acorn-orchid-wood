import { parseJsonArray, parseJsonObject } from "@/lib/utils";
import { DEFAULT_SETTINGS, type Category, type HomepageSection, type Product, type SiteSettings } from "@/lib/types";

export type ProductRow = {
  id: number;
  name: string;
  description: string;
  price: number;
  special_price: number | null;
  image_url: string;
  extra_images: string;
  category_id: number | null;
  available: boolean;
  featured: boolean;
  visible: boolean;
  tags: string;
  ordering_notes: string;
  sort_order: number;
};

export type CategoryRow = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  visible: boolean;
  sort_order: number;
};

export type SectionRow = {
  id: number;
  key: string;
  enabled: boolean;
  title: string;
  description: string;
  image_url: string;
  button_text: string;
  button_link: string;
  extra: string;
  sort_order: number;
};

export function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    specialPrice: row.special_price == null ? null : Number(row.special_price),
    imageUrl: row.image_url,
    extraImages: parseJsonArray(row.extra_images),
    categoryId: row.category_id,
    available: Boolean(row.available),
    featured: Boolean(row.featured),
    visible: Boolean(row.visible),
    tags: row.tags ?? "",
    orderingNotes: row.ordering_notes ?? "",
    sortOrder: Number(row.sort_order),
  };
}

export function mapCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    imageUrl: row.image_url,
    visible: Boolean(row.visible),
    sortOrder: Number(row.sort_order),
  };
}

export function mapSection(row: SectionRow): HomepageSection {
  return {
    id: row.id,
    key: row.key,
    enabled: Boolean(row.enabled),
    title: row.title,
    description: row.description,
    imageUrl: row.image_url,
    buttonText: row.button_text,
    buttonLink: row.button_link,
    extra: parseJsonObject(row.extra),
    sortOrder: Number(row.sort_order),
  };
}

export function mapSettings(rows: { key: string; value: string }[]): SiteSettings {
  const dict = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  return {
    siteName: dict.site_name || DEFAULT_SETTINGS.siteName,
    tagline: dict.tagline || DEFAULT_SETTINGS.tagline,
    phone: dict.phone || DEFAULT_SETTINGS.phone,
    instagram: dict.instagram || DEFAULT_SETTINGS.instagram,
    aboutText: dict.about_text || DEFAULT_SETTINGS.aboutText,
    orderClosed: dict.order_closed === "true",
    orderClosedTitle: dict.order_closed_title || DEFAULT_SETTINGS.orderClosedTitle,
    orderClosedMessage: dict.order_closed_message || DEFAULT_SETTINGS.orderClosedMessage,
    orderReopenDate: dict.order_reopen_date || "",
    footerNote: dict.footer_note || DEFAULT_SETTINGS.footerNote,
  };
}
