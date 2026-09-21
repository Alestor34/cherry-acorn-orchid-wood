import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { ensureSeeded } from "@/lib/server/seed.server";
import {
  mapCategory,
  mapProduct,
  mapSection,
  mapSettings,
  type CategoryRow,
  type ProductRow,
  type SectionRow,
} from "@/lib/server/mappers.server";
import type { StorePayload } from "@/lib/types";

export const getStoreData = createServerFn({ method: "GET" }).handler(async (): Promise<StorePayload> => {
  await ensureSeeded();
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

export const getProductById = createServerFn({ method: "GET" })
  .validator((d: unknown) => z.object({ id: z.number() }).parse(d))
  .handler(async ({ data }) => {
    await ensureSeeded();
    const sql = await getSql();
    const rows = await sql<ProductRow>`select * from products where id = ${data.id} limit 1`;
    return rows[0] ? mapProduct(rows[0]) : null;
  });
