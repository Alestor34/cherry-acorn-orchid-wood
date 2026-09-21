import { a as number, c as string, n as array, o as object, r as boolean, s as record, t as _enum } from "../_libs/zod.mjs";
import { a as setCookie$1, i as getCookie, t as createServerFn } from "./ssr.mjs";
import { a as mapCategory, c as mapSettings, i as hashPassword, n as ensureSeeded, o as mapProduct, r as getSql, s as mapSection, t as createServerRpc } from "./mappers.server-BsqisPA-.mjs";
import { n as jwtVerify, t as SignJWT } from "../_libs/jose.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DImLq5sK.js
var COOKIE = "nazli_admin";
var WEEK = 604800;
async function getSetting(key) {
	return (await (await getSql())`select value from site_settings where key = ${key}`)[0]?.value ?? null;
}
async function secretKey() {
	const secret = await getSetting("session_secret");
	if (!secret) throw new Error("missing session secret");
	return new TextEncoder().encode(secret);
}
async function verifyAdminPassword(username, password) {
	const expectedUser = await getSetting("admin_username") ?? "admin";
	if (username.trim() !== expectedUser) return false;
	const salt = await getSetting("admin_salt");
	const hash = await getSetting("admin_password_hash");
	if (!salt || !hash) return false;
	const incoming = await hashPassword(password, salt);
	if (incoming.length !== hash.length) return false;
	let diff = 0;
	for (let i = 0; i < incoming.length; i += 1) diff |= incoming.charCodeAt(i) ^ hash.charCodeAt(i);
	return diff === 0;
}
async function issueAdminCookie() {
	const token = await new SignJWT({ role: "admin" }).setProtectedHeader({ alg: "HS256" }).setSubject("admin").setIssuedAt().setExpirationTime("7d").sign(await secretKey());
	setCookie$1(COOKIE, token, {
		path: "/",
		httpOnly: true,
		sameSite: "lax",
		secure: false,
		maxAge: WEEK
	});
}
async function clearAdminCookie() {
	setCookie$1(COOKIE, "", {
		path: "/",
		httpOnly: true,
		sameSite: "lax",
		secure: false,
		maxAge: 0
	});
}
async function isAdminSession() {
	const token = getCookie(COOKIE);
	if (!token) return false;
	try {
		const { payload } = await jwtVerify(token, await secretKey());
		return payload.sub === "admin";
	} catch {
		return false;
	}
}
async function requireAdmin() {
	if (!await isAdminSession()) throw new Error("برای دسترسی به پنل مدیریت وارد شوید.");
}
async function updateAdminPassword(nextPassword) {
	if (nextPassword.trim().length < 6) throw new Error("رمز عبور باید حداقل ۶ کاراکتر باشد.");
	const salt = crypto.randomUUID().replace(/-/g, "");
	const hash = await hashPassword(nextPassword.trim(), salt);
	const sql = await getSql();
	await sql`insert into site_settings (key, value) values ('admin_salt', ${salt})
    on conflict (key) do update set value = excluded.value`;
	await sql`insert into site_settings (key, value) values ('admin_password_hash', ${hash})
    on conflict (key) do update set value = excluded.value`;
}
var productInput = object({
	id: number().optional(),
	name: string().trim().min(1).max(120),
	description: string().trim().max(2e3).default(""),
	price: number().int().min(0).max(1e9),
	specialPrice: number().int().min(0).max(1e9).nullable().optional(),
	imageUrl: string().max(2e6).default(""),
	extraImages: array(string().max(2e6)).max(6).default([]),
	categoryId: number().int().nullable().optional(),
	available: boolean().default(true),
	featured: boolean().default(false),
	visible: boolean().default(true),
	tags: string().max(200).default(""),
	orderingNotes: string().max(400).default(""),
	sortOrder: number().int().optional()
});
var categoryInput = object({
	id: number().optional(),
	name: string().trim().min(1).max(80),
	slug: string().trim().min(1).max(80),
	description: string().trim().max(400).default(""),
	imageUrl: string().max(2e6).default(""),
	visible: boolean().default(true),
	sortOrder: number().int().optional()
});
var sectionInput = object({
	id: number(),
	enabled: boolean(),
	title: string().max(160),
	description: string().max(2e3),
	imageUrl: string().max(2e6),
	buttonText: string().max(80),
	buttonLink: string().max(300),
	extra: record(string(), string()).default({}),
	sortOrder: number().int().optional()
});
var settingsInput = object({
	siteName: string().trim().min(1).max(80),
	tagline: string().max(200),
	phone: string().trim().min(8).max(20),
	instagram: string().trim().min(1).max(80),
	aboutText: string().max(4e3),
	orderClosed: boolean(),
	orderClosedTitle: string().max(160),
	orderClosedMessage: string().max(500),
	orderReopenDate: string().max(32),
	footerNote: string().max(300)
});
var adminLogin_createServerFn_handler = createServerRpc({
	id: "629bb5da3b7d7c22bdc6b259848b56bf4bc81225b4389f62fcec77ac4ae93151",
	name: "adminLogin",
	filename: "src/lib/functions/admin.ts"
}, (opts) => adminLogin.__executeServer(opts));
var adminLogin = createServerFn({ method: "POST" }).validator((d) => object({
	username: string().min(1).max(40),
	password: string().min(1).max(80)
}).parse(d)).handler(adminLogin_createServerFn_handler, async ({ data }) => {
	await ensureSeeded();
	if (!await verifyAdminPassword(data.username, data.password)) throw new Error("نام کاربری یا رمز عبور نادرست است.");
	await issueAdminCookie();
	return { ok: true };
});
var adminLogout_createServerFn_handler = createServerRpc({
	id: "3f07bddb4511699258bbc6bf904f20e189044f61ccc79d2b09813808dfff597c",
	name: "adminLogout",
	filename: "src/lib/functions/admin.ts"
}, (opts) => adminLogout.__executeServer(opts));
var adminLogout = createServerFn({ method: "POST" }).handler(adminLogout_createServerFn_handler, async () => {
	await clearAdminCookie();
	return { ok: true };
});
var getAdminSession_createServerFn_handler = createServerRpc({
	id: "9543d04c46a62881d73e93b32366436ab4c56d59f0e6d93ba0a15a76bc368f18",
	name: "getAdminSession",
	filename: "src/lib/functions/admin.ts"
}, (opts) => getAdminSession.__executeServer(opts));
var getAdminSession = createServerFn({ method: "GET" }).handler(getAdminSession_createServerFn_handler, async () => {
	await ensureSeeded();
	return { authenticated: await isAdminSession() };
});
var getAdminData_createServerFn_handler = createServerRpc({
	id: "aec7b062c196486a8686f89eb1b380ed34101e209c1d7c4590575df5f8fe5599",
	name: "getAdminData",
	filename: "src/lib/functions/admin.ts"
}, (opts) => getAdminData.__executeServer(opts));
var getAdminData = createServerFn({ method: "GET" }).handler(getAdminData_createServerFn_handler, async () => {
	await ensureSeeded();
	await requireAdmin();
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
var saveProduct_createServerFn_handler = createServerRpc({
	id: "fb599ad27cfa1440073e2fadf6ffbd43be587bd8777dc9f12616ee7e7f8ea021",
	name: "saveProduct",
	filename: "src/lib/functions/admin.ts"
}, (opts) => saveProduct.__executeServer(opts));
var saveProduct = createServerFn({ method: "POST" }).validator((d) => productInput.parse(d)).handler(saveProduct_createServerFn_handler, async ({ data }) => {
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
	const max = await sql`select coalesce(max(sort_order), -1)::int as n from products`;
	const sort = data.sortOrder ?? (max[0]?.n ?? -1) + 1;
	return { id: (await sql`insert into products (
      name, description, price, special_price, image_url, extra_images, category_id,
      available, featured, visible, tags, ordering_notes, sort_order
    ) values (
      ${data.name}, ${data.description}, ${data.price}, ${special}, ${data.imageUrl}, ${extra},
      ${data.categoryId ?? null}, ${data.available}, ${data.featured}, ${data.visible},
      ${data.tags}, ${data.orderingNotes}, ${sort}
    ) returning id`)[0].id };
});
var deleteProduct_createServerFn_handler = createServerRpc({
	id: "1dbf151a4ca59dcc71cfeb0881f60da857e8e429259797b967085f008efad450",
	name: "deleteProduct",
	filename: "src/lib/functions/admin.ts"
}, (opts) => deleteProduct.__executeServer(opts));
var deleteProduct = createServerFn({ method: "POST" }).validator((d) => object({ id: number() }).parse(d)).handler(deleteProduct_createServerFn_handler, async ({ data }) => {
	await requireAdmin();
	await (await getSql())`delete from products where id = ${data.id}`;
	return { ok: true };
});
var reorderProduct_createServerFn_handler = createServerRpc({
	id: "51edfd6cd35d0a46d078d42f541ee2b363de06dd1c0fdc3ae271c4100bf7f604",
	name: "reorderProduct",
	filename: "src/lib/functions/admin.ts"
}, (opts) => reorderProduct.__executeServer(opts));
var reorderProduct = createServerFn({ method: "POST" }).validator((d) => object({
	id: number(),
	direction: _enum(["up", "down"])
}).parse(d)).handler(reorderProduct_createServerFn_handler, async ({ data }) => {
	await requireAdmin();
	const sql = await getSql();
	const rows = await sql`select id, sort_order from products order by sort_order, id`;
	const idx = rows.findIndex((r) => r.id === data.id);
	if (idx < 0) return { ok: false };
	const swapWith = data.direction === "up" ? idx - 1 : idx + 1;
	if (swapWith < 0 || swapWith >= rows.length) return { ok: true };
	const a = rows[idx];
	const b = rows[swapWith];
	await sql`update products set sort_order = ${b.sort_order} where id = ${a.id}`;
	await sql`update products set sort_order = ${a.sort_order} where id = ${b.id}`;
	return { ok: true };
});
var saveCategory_createServerFn_handler = createServerRpc({
	id: "4e96ae88482f4d9b2610bfec2ee2e7b823c76f00c762b188df2afa9fc0fb6dc0",
	name: "saveCategory",
	filename: "src/lib/functions/admin.ts"
}, (opts) => saveCategory.__executeServer(opts));
var saveCategory = createServerFn({ method: "POST" }).validator((d) => categoryInput.parse(d)).handler(saveCategory_createServerFn_handler, async ({ data }) => {
	await requireAdmin();
	const sql = await getSql();
	const slug = data.slug.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\u0600-\u06FF-]/g, "");
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
	const max = await sql`select coalesce(max(sort_order), -1)::int as n from categories`;
	const sort = data.sortOrder ?? (max[0]?.n ?? -1) + 1;
	return { id: (await sql`insert into categories (name, slug, description, image_url, visible, sort_order)
      values (${data.name}, ${slug}, ${data.description}, ${data.imageUrl}, ${data.visible}, ${sort})
      returning id`)[0].id };
});
var deleteCategory_createServerFn_handler = createServerRpc({
	id: "602b61220273ba78a72a6e9cddff5af56e655c6b3fb5b80d5bb478e7c436ef8e",
	name: "deleteCategory",
	filename: "src/lib/functions/admin.ts"
}, (opts) => deleteCategory.__executeServer(opts));
var deleteCategory = createServerFn({ method: "POST" }).validator((d) => object({ id: number() }).parse(d)).handler(deleteCategory_createServerFn_handler, async ({ data }) => {
	await requireAdmin();
	const sql = await getSql();
	await sql`update products set category_id = null where category_id = ${data.id}`;
	await sql`delete from categories where id = ${data.id}`;
	return { ok: true };
});
var reorderCategory_createServerFn_handler = createServerRpc({
	id: "4b7d0d625a025e86e94b9fc120c0c70465d3341a17f159f5a7259ca8dfdd6996",
	name: "reorderCategory",
	filename: "src/lib/functions/admin.ts"
}, (opts) => reorderCategory.__executeServer(opts));
var reorderCategory = createServerFn({ method: "POST" }).validator((d) => object({
	id: number(),
	direction: _enum(["up", "down"])
}).parse(d)).handler(reorderCategory_createServerFn_handler, async ({ data }) => {
	await requireAdmin();
	const sql = await getSql();
	const rows = await sql`select id, sort_order from categories order by sort_order, id`;
	const idx = rows.findIndex((r) => r.id === data.id);
	if (idx < 0) return { ok: false };
	const swapWith = data.direction === "up" ? idx - 1 : idx + 1;
	if (swapWith < 0 || swapWith >= rows.length) return { ok: true };
	const a = rows[idx];
	const b = rows[swapWith];
	await sql`update categories set sort_order = ${b.sort_order} where id = ${a.id}`;
	await sql`update categories set sort_order = ${a.sort_order} where id = ${b.id}`;
	return { ok: true };
});
var saveSection_createServerFn_handler = createServerRpc({
	id: "84e0b3bd7557ecf577c07a6be2346851f83d7ab84c1146a06a3f15b74352e85b",
	name: "saveSection",
	filename: "src/lib/functions/admin.ts"
}, (opts) => saveSection.__executeServer(opts));
var saveSection = createServerFn({ method: "POST" }).validator((d) => sectionInput.parse(d)).handler(saveSection_createServerFn_handler, async ({ data }) => {
	await requireAdmin();
	await (await getSql())`update homepage_sections set
      enabled = ${data.enabled},
      title = ${data.title},
      description = ${data.description},
      image_url = ${data.imageUrl},
      button_text = ${data.buttonText},
      button_link = ${data.buttonLink},
      extra = ${JSON.stringify(data.extra ?? {})}
      where id = ${data.id}`;
	return { ok: true };
});
var reorderSection_createServerFn_handler = createServerRpc({
	id: "322cd35da66f4b35ae1779402af5d31e968aec312af43d5f01ccf5420c5b4333",
	name: "reorderSection",
	filename: "src/lib/functions/admin.ts"
}, (opts) => reorderSection.__executeServer(opts));
var reorderSection = createServerFn({ method: "POST" }).validator((d) => object({
	id: number(),
	direction: _enum(["up", "down"])
}).parse(d)).handler(reorderSection_createServerFn_handler, async ({ data }) => {
	await requireAdmin();
	const sql = await getSql();
	const rows = await sql`select id, sort_order from homepage_sections order by sort_order, id`;
	const idx = rows.findIndex((r) => r.id === data.id);
	if (idx < 0) return { ok: false };
	const swapWith = data.direction === "up" ? idx - 1 : idx + 1;
	if (swapWith < 0 || swapWith >= rows.length) return { ok: true };
	const a = rows[idx];
	const b = rows[swapWith];
	await sql`update homepage_sections set sort_order = ${b.sort_order} where id = ${a.id}`;
	await sql`update homepage_sections set sort_order = ${a.sort_order} where id = ${b.id}`;
	return { ok: true };
});
var saveSettings_createServerFn_handler = createServerRpc({
	id: "2de7264422f4cf9cfbce3ba8fcc5fc65a8cc162324a2b758d2b87695920877f4",
	name: "saveSettings",
	filename: "src/lib/functions/admin.ts"
}, (opts) => saveSettings.__executeServer(opts));
var saveSettings = createServerFn({ method: "POST" }).validator((d) => settingsInput.parse(d)).handler(saveSettings_createServerFn_handler, async ({ data }) => {
	await requireAdmin();
	const sql = await getSql();
	const pairs = {
		site_name: data.siteName,
		tagline: data.tagline,
		phone: data.phone,
		instagram: data.instagram.replace(/^@/, ""),
		about_text: data.aboutText,
		order_closed: data.orderClosed ? "true" : "false",
		order_closed_title: data.orderClosedTitle,
		order_closed_message: data.orderClosedMessage,
		order_reopen_date: data.orderReopenDate,
		footer_note: data.footerNote
	};
	for (const [key, value] of Object.entries(pairs)) await sql`insert into site_settings (key, value) values (${key}, ${value})
        on conflict (key) do update set value = excluded.value`;
	return { ok: true };
});
var changeAdminPassword_createServerFn_handler = createServerRpc({
	id: "b5460cca4b57702ed7b3ca1d266fddb54efcd8454c905242c21b835f16274192",
	name: "changeAdminPassword",
	filename: "src/lib/functions/admin.ts"
}, (opts) => changeAdminPassword.__executeServer(opts));
var changeAdminPassword = createServerFn({ method: "POST" }).validator((d) => object({
	currentPassword: string().min(1),
	nextPassword: string().min(6).max(80)
}).parse(d)).handler(changeAdminPassword_createServerFn_handler, async ({ data }) => {
	await requireAdmin();
	if (!await verifyAdminPassword("admin", data.currentPassword)) throw new Error("رمز فعلی نادرست است.");
	await updateAdminPassword(data.nextPassword);
	return { ok: true };
});
//#endregion
export { adminLogin_createServerFn_handler, adminLogout_createServerFn_handler, changeAdminPassword_createServerFn_handler, deleteCategory_createServerFn_handler, deleteProduct_createServerFn_handler, getAdminData_createServerFn_handler, getAdminSession_createServerFn_handler, reorderCategory_createServerFn_handler, reorderProduct_createServerFn_handler, reorderSection_createServerFn_handler, saveCategory_createServerFn_handler, saveProduct_createServerFn_handler, saveSection_createServerFn_handler, saveSettings_createServerFn_handler };
