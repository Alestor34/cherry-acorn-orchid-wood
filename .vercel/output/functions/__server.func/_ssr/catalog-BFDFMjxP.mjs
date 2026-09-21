import { a as number, o as object } from "../_libs/zod.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { a as mapCategory, c as mapSettings, n as ensureSeeded, o as mapProduct, r as getSql, s as mapSection, t as createServerRpc } from "./mappers.server-BsqisPA-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-BFDFMjxP.js
var getStoreData_createServerFn_handler = createServerRpc({
	id: "df25a0367ce3e8e24faac32151716fe4370d8fd573f4ce809cdfe1f1c90fc466",
	name: "getStoreData",
	filename: "src/lib/functions/catalog.ts"
}, (opts) => getStoreData.__executeServer(opts));
var getStoreData = createServerFn({ method: "GET" }).handler(getStoreData_createServerFn_handler, async () => {
	await ensureSeeded();
	const sql = await getSql();
	const [settingRows, categoryRows, productRows, sectionRows] = await Promise.all([
		sql`select key, value from site_settings`,
		sql`select * from categories order by sort_order, id`,
		sql`select * from products order by sort_order, id`,
		sql`select * from homepage_sections order by sort_order, id`
	]);
	return {
		settings: mapSettings(settingRows),
		categories: categoryRows.map(mapCategory),
		products: productRows.map(mapProduct),
		sections: sectionRows.map(mapSection)
	};
});
var getProductById_createServerFn_handler = createServerRpc({
	id: "9ea9490447df60ca0f0917ba984180b8d0227003bd72ca28993f333bda1d1f06",
	name: "getProductById",
	filename: "src/lib/functions/catalog.ts"
}, (opts) => getProductById.__executeServer(opts));
var getProductById = createServerFn({ method: "GET" }).validator((d) => object({ id: number() }).parse(d)).handler(getProductById_createServerFn_handler, async ({ data }) => {
	await ensureSeeded();
	const rows = await (await getSql())`select * from products where id = ${data.id} limit 1`;
	return rows[0] ? mapProduct(rows[0]) : null;
});
//#endregion
export { getProductById_createServerFn_handler, getStoreData_createServerFn_handler };
