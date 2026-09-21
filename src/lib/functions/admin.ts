import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { ensureSeeded } from "@/lib/server/seed.server";
import {
  clearAdminCookie,
  isAdminSession,
  issueAdminCookie,
  requireAdmin,
  updateAdminPassword,
  verifyAdminPassword,
} from "@/lib/server/session.server";
import {
  mapCategory,
  mapProduct,
  mapSection,
  mapSettings,
  type CategoryRow,
  type ProductRow,
  type SectionRow,
} from "@/lib/server/mappers.server";

const productInput = z.object({
  id: z.number().optional(),
  name: z.string().trim().min(1).max(120),
  description: z.string().trim().max(2000).default(""),
  price: z.number().int().min(0).max(1_000_000_000),
  specialPrice: z.number().int().min(0).max(1_000_000_000).nullable().optional(),
  imageUrl: z.string().max(2_000_000).default(""),
  extraImages: z.array(z.string().max(2_000_000)).max(6).default([]),
  categoryId: z.number().int().nullable().optional(),
  available: z.boolean().default(true),
  featured: z.boolean().default(false),
  visible: z.boolean().default(true),
  tags: z.string().max(200).default(""),
  orderingNotes: z.string().max(400).default(""),
  sortOrder: z.number().int().optional(),
});

const categoryInput = z.object({
  id: z.number().optional(),
  name: z.string().trim().min(1).max(80),
  slug: z.string().trim().min(1).max(80),
  description: z.string().trim().max(400).default(""),
  imageUrl: z.string().max(2_000_000).default(""),
  visible: z.boolean().default(true),
  sortOrder: z.number().int().optional(),
});

const sectionInput = z.object({
  id: z.number(),
  enabled: z.boolean(),
  title: z.string().max(160),
  description: z.string().max(2000),
  imageUrl: z.string().max(2_000_000),
  buttonText: z.string().max(80),
  buttonLink: z.string().max(300),
  extra: z.record(z.string(), z.string()).default({}),
  sortOrder: z.number().int().optional(),
});

const settingsInput = z.object({
  siteName: z.string().trim().min(1).max(80),
  tagline: z.string().max(200),
  phone: z.string().trim().min(8).max(20),
  instagram: z.string().trim().min(1).max(80),
  aboutText: z.string().max(4000),
  orderClosed: z.boolean(),
  orderClosedTitle: z.string().max(160),
  orderClosedMessage: z.string().max(500),
  orderReopenDate: z.string().max(32),
  footerNote: z.string().max(300),
});

export const adminLogin = createServerFn({ method: "POST" })
  .validator((d: unknown) => z.object({ username: z.string().min(1).max(40), password: z.string().min(1).max(80) }).parse(d))
  .handler(async ({ data }) => {
    await ensureSeeded();
    const ok = await verifyAdminPassword(data.username, data.password);
    if (!ok) throw new Error("نام کاربری یا رمز عبور نادرست است.");
    await issueAdminCookie();
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  await clearAdminCookie();
  return { ok: true as const };
});

export const getAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  await ensureSeeded();
  return { authenticated: await isAdminSession() };
});

export const getAdminData = createServerFn({ method: "GET" }).handler(async () => {
  await ensureSeeded();
  await requireAdmin();
  const sql = await getSql();
  const [settingRows, categoryRows, productRows, sectionRows] = await Promise.all([
    sql<{ key: string; value: string }>`select key, value from site_settings`,
    sql<CategoryRow>`select * from categories order by sort_order, id`,
    sql<ProductRow>`select * from products order by sort_order, id`,
    sql<SectionRow>`select * from homepage_sections order by sort_order, id`,
  ]);
  return {
    settings: mapSettings(settingRows),
    categories: categoryRows.map(mapCategory),
    products: productRows.map(mapProduct),
    sections: sectionRows.map(mapSection),
  };
});

export const saveProduct = createServerFn({ method: "POST" })
  .validator((d: unknown) => productInput.parse(d))
  .handler(async ({ data }) => {
    await requireAdmin();
    const sql = await getSql();
    const extra = JSON.stringify(data.extraImages ?? []);
    const special = data.specialPrice && data.specialPrice > 0 ? data.specialPrice : null;
    if (data.id) {
      await sql`update products set
        name = ${data.name},
        description = ${data.description},
        price = ${data.price},
        special_price = ${special},
        image_url = ${data.imageUrl},
        extra_images = ${extra},
        category_id = ${data.categoryId ?? null},
        available = ${data.available},
        featured = ${data.featured},
        visible = ${data.visible},
        tags = ${data.tags},
        ordering_notes = ${data.orderingNotes}
        where id = ${data.id}`;
      return { id: data.id };
    }
    const max = await sql<{ n: number }>`select coalesce(max(sort_order), -1)::int as n from products`;
    const sort = data.sortOrder ?? (max[0]?.n ?? -1) + 1;
    const rows = await sql<{ id: number }>`insert into products (
      name, description, price, special_price, image_url, extra_images, category_id,
      available, featured, visible, tags, ordering_notes, sort_order
    ) values (
      ${data.name}, ${data.description}, ${data.price}, ${special}, ${data.imageUrl}, ${extra},
      ${data.categoryId ?? null}, ${data.available}, ${data.featured}, ${data.visible},
      ${data.tags}, ${data.orderingNotes}, ${sort}
    ) returning id`;
    return { id: rows[0].id };
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .validator((d: unknown) => z.object({ id: z.number() }).parse(d))
  .handler(async ({ data }) => {
    await requireAdmin();
    const sql = await getSql();
    await sql`delete from products where id = ${data.id}`;
    return { ok: true as const };
  });

export const reorderProduct = createServerFn({ method: "POST" })
  .validator((d: unknown) => z.object({ id: z.number(), direction: z.enum(["up", "down"]) }).parse(d))
  .handler(async ({ data }) => {
    await requireAdmin();
    const sql = await getSql();
    const rows = await sql<{ id: number; sort_order: number }>`select id, sort_order from products order by sort_order, id`;
    const idx = rows.findIndex((r) => r.id === data.id);
    if (idx < 0) return { ok: false as const };
    const swapWith = data.direction === "up" ? idx - 1 : idx + 1;
    if (swapWith < 0 || swapWith >= rows.length) return { ok: true as const };
    const a = rows[idx];
    const b = rows[swapWith];
    await sql`update products set sort_order = ${b.sort_order} where id = ${a.id}`;
    await sql`update products set sort_order = ${a.sort_order} where id = ${b.id}`;
    return { ok: true as const };
  });

export const saveCategory = createServerFn({ method: "POST" })
  .validator((d: unknown) => categoryInput.parse(d))
  .handler(async ({ data }) => {
    await requireAdmin();
    const sql = await getSql();
    const slug = data.slug
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\u0600-\u06FF-]/g, "");
    if (data.id) {
      await sql`update categories set
        name = ${data.name},
        slug = ${slug},
        description = ${data.description},
        image_url = ${data.imageUrl},
        visible = ${data.visible}
        where id = ${data.id}`;
      return { id: data.id };
    }
    const max = await sql<{ n: number }>`select coalesce(max(sort_order), -1)::int as n from categories`;
    const sort = data.sortOrder ?? (max[0]?.n ?? -1) + 1;
    const rows = await sql<{ id: number }>`insert into categories (name, slug, description, image_url, visible, sort_order)
      values (${data.name}, ${slug}, ${data.description}, ${data.imageUrl}, ${data.visible}, ${sort})
      returning id`;
    return { id: rows[0].id };
  });

export const deleteCategory = createServerFn({ method: "POST" })
  .validator((d: unknown) => z.object({ id: z.number() }).parse(d))
  .handler(async ({ data }) => {
    await requireAdmin();
    const sql = await getSql();
    await sql`update products set category_id = null where category_id = ${data.id}`;
    await sql`delete from categories where id = ${data.id}`;
    return { ok: true as const };
  });

export const reorderCategory = createServerFn({ method: "POST" })
  .validator((d: unknown) => z.object({ id: z.number(), direction: z.enum(["up", "down"]) }).parse(d))
  .handler(async ({ data }) => {
    await requireAdmin();
    const sql = await getSql();
    const rows = await sql<{ id: number; sort_order: number }>`select id, sort_order from categories order by sort_order, id`;
    const idx = rows.findIndex((r) => r.id === data.id);
    if (idx < 0) return { ok: false as const };
    const swapWith = data.direction === "up" ? idx - 1 : idx + 1;
    if (swapWith < 0 || swapWith >= rows.length) return { ok: true as const };
    const a = rows[idx];
    const b = rows[swapWith];
    await sql`update categories set sort_order = ${b.sort_order} where id = ${a.id}`;
    await sql`update categories set sort_order = ${a.sort_order} where id = ${b.id}`;
    return { ok: true as const };
  });

export const saveSection = createServerFn({ method: "POST" })
  .validator((d: unknown) => sectionInput.parse(d))
  .handler(async ({ data }) => {
    await requireAdmin();
    const sql = await getSql();
    await sql`update homepage_sections set
      enabled = ${data.enabled},
      title = ${data.title},
      description = ${data.description},
      image_url = ${data.imageUrl},
      button_text = ${data.buttonText},
      button_link = ${data.buttonLink},
      extra = ${JSON.stringify(data.extra ?? {})}
      where id = ${data.id}`;
    return { ok: true as const };
  });

export const reorderSection = createServerFn({ method: "POST" })
  .validator((d: unknown) => z.object({ id: z.number(), direction: z.enum(["up", "down"]) }).parse(d))
  .handler(async ({ data }) => {
    await requireAdmin();
    const sql = await getSql();
    const rows = await sql<{ id: number; sort_order: number }>`select id, sort_order from homepage_sections order by sort_order, id`;
    const idx = rows.findIndex((r) => r.id === data.id);
    if (idx < 0) return { ok: false as const };
    const swapWith = data.direction === "up" ? idx - 1 : idx + 1;
    if (swapWith < 0 || swapWith >= rows.length) return { ok: true as const };
    const a = rows[idx];
    const b = rows[swapWith];
    await sql`update homepage_sections set sort_order = ${b.sort_order} where id = ${a.id}`;
    await sql`update homepage_sections set sort_order = ${a.sort_order} where id = ${b.id}`;
    return { ok: true as const };
  });

export const saveSettings = createServerFn({ method: "POST" })
  .validator((d: unknown) => settingsInput.parse(d))
  .handler(async ({ data }) => {
    await requireAdmin();
    const sql = await getSql();
    const pairs: Record<string, string> = {
      site_name: data.siteName,
      tagline: data.tagline,
      phone: data.phone,
      instagram: data.instagram.replace(/^@/, ""),
      about_text: data.aboutText,
      order_closed: data.orderClosed ? "true" : "false",
      order_closed_title: data.orderClosedTitle,
      order_closed_message: data.orderClosedMessage,
      order_reopen_date: data.orderReopenDate,
      footer_note: data.footerNote,
    };
    for (const [key, value] of Object.entries(pairs)) {
      await sql`insert into site_settings (key, value) values (${key}, ${value})
        on conflict (key) do update set value = excluded.value`;
    }
    return { ok: true as const };
  });

export const changeAdminPassword = createServerFn({ method: "POST" })
  .validator((d: unknown) =>
    z.object({ currentPassword: z.string().min(1), nextPassword: z.string().min(6).max(80) }).parse(d),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const ok = await verifyAdminPassword("admin", data.currentPassword);
    if (!ok) throw new Error("رمز فعلی نادرست است.");
    await updateAdminPassword(data.nextPassword);
    return { ok: true as const };
  });
