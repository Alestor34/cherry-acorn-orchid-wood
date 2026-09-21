import { n as parseJsonArray, r as parseJsonObject } from "./utils-CYBaDj9o.mjs";
import { n as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { t as DEFAULT_SETTINGS } from "./types-BjybHRwl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mappers.server-BsqisPA-.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var _0002_catalog_default = "create table if not exists site_settings (\n  key text primary key,\n  value text not null\n);\n\ncreate table if not exists categories (\n  id serial primary key,\n  name text not null,\n  slug text not null unique,\n  description text not null default '',\n  image_url text not null default '',\n  visible boolean not null default true,\n  sort_order integer not null default 0\n);\n\ncreate table if not exists products (\n  id serial primary key,\n  name text not null,\n  description text not null default '',\n  price integer not null,\n  special_price integer,\n  image_url text not null default '',\n  extra_images text not null default '[]',\n  category_id integer references categories(id) on delete set null,\n  available boolean not null default true,\n  featured boolean not null default false,\n  visible boolean not null default true,\n  tags text not null default '',\n  ordering_notes text not null default '',\n  sort_order integer not null default 0\n);\n\ncreate table if not exists homepage_sections (\n  id serial primary key,\n  key text not null unique,\n  enabled boolean not null default true,\n  title text not null default '',\n  description text not null default '',\n  image_url text not null default '',\n  button_text text not null default '',\n  button_link text not null default '',\n  extra text not null default '{}',\n  sort_order integer not null default 0\n);\n\ncreate index if not exists products_category_id_idx on products (category_id);\ncreate index if not exists products_sort_idx on products (sort_order, id);\ncreate index if not exists categories_sort_idx on categories (sort_order, id);\ncreate index if not exists homepage_sections_sort_idx on homepage_sections (sort_order, id);\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef$1 = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef$1.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef$1.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef$1.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef$1.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef$1.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef$1.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({ "/migrations/0002_catalog.sql": _0002_catalog_default });
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef$1.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef$1.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
async function sha256Hex(value) {
	const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
	return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function hashPassword(password, salt) {
	return sha256Hex(`${salt}:${password}`);
}
var globalRef = globalThis;
function randomSecret() {
	const bytes = /* @__PURE__ */ new Uint8Array(32);
	crypto.getRandomValues(bytes);
	return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
var CATEGORIES = [
	{
		name: "فینگر فود گرم",
		slug: "hot",
		description: "مینی پیتزا، برگر، بورک و مزه‌های گرم مهمانی",
		image: "/images/cat-hot.jpg"
	},
	{
		name: "سوخاری",
		slug: "fried",
		description: "فیله، ناگت و رول‌های طلایی و ترد",
		image: "/images/cat-fried.jpg"
	},
	{
		name: "مزه و سالاد",
		slug: "salad",
		description: "شات کشک بادمجان، الویه و تارت‌های مزه‌ای",
		image: "/images/cat-salad.jpg"
	},
	{
		name: "پک مهمانی",
		slug: "pack",
		description: "پک‌های آماده برای ۲۰ تا ۳۵ نفر",
		image: "/images/cat-pack.jpg"
	},
	{
		name: "تارت و دسر",
		slug: "dessert",
		description: "تارت میوه و شیرینی‌های انگشتی",
		image: "/images/cat-dessert.jpg"
	}
];
var PRODUCTS = [
	{
		name: "مینی پیتزا",
		description: "بسته ۱۰ عددی مینی‌پیتزا با خمیر نازک، سس خانگی و پنیر کش‌دار. مناسب پذیرایی گرم.",
		price: 185e3,
		image: "/images/p-pizza.jpg",
		category: "hot",
		featured: true,
		tags: "محبوب، تولد",
		notes: "حداقل سفارش یک بسته ۱۰ عددی"
	},
	{
		name: "مینی برگر",
		description: "۱۰ عدد مینی‌برگر با نان نرم، گوشت آبدار و پنیر. سیرکننده و مرتب برای سینی مهمانی.",
		price: 21e4,
		image: "/images/p-burger.jpg",
		category: "hot",
		featured: true,
		tags: "محبوب"
	},
	{
		name: "بورک گوشت",
		description: "بورک یوفکا با فیلینگ گوشت ادویه‌دار، برشته و طلایی. بسته ۱۰ عددی.",
		price: 195e3,
		image: "/images/p-borek.jpg",
		category: "hot",
		tags: "یوفکا"
	},
	{
		name: "سمبوسه",
		description: "سمبوسه مثلثی با پوسته ترد و فیلینگ گوشت و سبزی. بسته ۱۰ عددی همراه با سس.",
		price: 165e3,
		image: "/images/p-samosa.jpg",
		category: "hot"
	},
	{
		name: "پیراشکی گوشت",
		description: "پیراشکی نرم و طلایی با گوشت چرخ‌کرده. مناسب سینی عصرانه و تولد.",
		price: 175e3,
		image: "/images/p-piroshki.jpg",
		category: "hot"
	},
	{
		name: "مینی هات‌داگ",
		description: "۱۰ عدد مینی هات‌داگ در نان کوچک، با خردل و سس. انتخاب اقتصادی و محبوب بچه‌ها.",
		price: 155e3,
		image: "/images/p-hotdog.jpg",
		category: "hot"
	},
	{
		name: "رول تست سوخاری",
		description: "نان تست رول‌شده با فیلینگ خامه‌ای، سوخاری‌شده تا پوسته طلایی. بسته ۱۰ عددی.",
		price: 168e3,
		image: "/images/p-toast.jpg",
		category: "fried",
		featured: true,
		tags: "سوخاری"
	},
	{
		name: "کلاب ژامبون",
		description: "کلاب سه‌لایه با ژامبون، پنیر و کاهو، برش‌خورده برای سرو انگشتی. بسته ۸ عددی.",
		price: 19e4,
		image: "/images/p-club.jpg",
		category: "hot"
	},
	{
		name: "فیله سوخاری",
		description: "فیله مرغ تازه با پوشش ترد خانگی. بسته ۱۰ عددی، همراه لیمو.",
		price: 245e3,
		special: 225e3,
		image: "/images/p-fillet.jpg",
		category: "fried",
		featured: true,
		tags: "ویژه"
	},
	{
		name: "ناگت مرغ",
		description: "ناگت‌های یک‌اندازه و ترد. بسته ۱۰ عددی، مناسب پک کودک و تولد.",
		price: 175e3,
		image: "/images/p-nugget.jpg",
		category: "fried"
	},
	{
		name: "ناگت میگو",
		description: "میگوی سوخاری با پوشش طلایی. بسته ۱۰ عددی برای پذیرایی خاص‌تر.",
		price: 285e3,
		image: "/images/p-shrimp.jpg",
		category: "fried",
		tags: "ویژه"
	},
	{
		name: "شات کشک بادمجان",
		description: "کشک بادمجان دودی در شات‌های تک‌نفره، با نعنا داغ و گردو. بسته ۱۰ عدد.",
		price: 145e3,
		image: "/images/p-kashk.jpg",
		category: "salad",
		featured: true,
		tags: "مزه"
	},
	{
		name: "الویه خانگی",
		description: "الویه خامه‌ای با مرغ و سیب‌زمینی، یک کیلو. قابل سرو در کاسه یا روی تست.",
		price: 32e4,
		image: "/images/p-olivieh.jpg",
		category: "salad",
		notes: "قیمت برای یک کیلوگرم"
	},
	{
		name: "سالاد ماکارونی",
		description: "سالاد ماکارونی خانگی، یک کیلو. خنک، سیرکننده و مناسب کنار سینی فینگر فود.",
		price: 28e4,
		image: "/images/p-macaroni.jpg",
		category: "salad",
		notes: "قیمت برای یک کیلوگرم"
	},
	{
		name: "تارت میرزاقاسمی",
		description: "تارت‌های کوچک با میرزاقاسمی دودی. بسته ۱۰ عددی برای مزه گرم.",
		price: 195e3,
		image: "/images/p-mirza.jpg",
		category: "salad"
	},
	{
		name: "پک ۲۰ نفره",
		description: "پک کامل برای حدود ۲۰ نفر: مینی‌برگر، بورک، رول تست، شات کشک و الویه. ظاهر مرتب روی سینی.",
		price: 78e5,
		image: "/images/p-pack20.jpg",
		category: "pack",
		featured: true,
		tags: "پک، تولد",
		notes: "هماهنگی حداقل ۲۴ ساعت قبل"
	},
	{
		name: "پک ۳۵ نفره",
		description: "پک سیرکننده حدود ۳۵ نفر شامل چند مدل فینگر فود گرم، سوخاری و مزه. مناسب تولد و دورهمی.",
		price: 135e5,
		image: "/images/p-pack35.jpg",
		category: "pack",
		featured: true,
		tags: "پک",
		notes: "هماهنگی حداقل ۲۴ ساعت قبل"
	},
	{
		name: "پک اقتصادی ۳۰ نفره",
		description: "پک اقتصادی شامل مینی‌پیتزا، مینی‌برگر، رول تست سوخاری، ناگت، الویه و کشک بادمجان.",
		price: 15e6,
		image: "/images/p-pack.jpg",
		category: "pack",
		tags: "پک، اقتصادی"
	},
	{
		name: "تارت میوه",
		description: "تارت‌های کوچک با خامه و میوه فصل. بسته ۱۰ عددی برای شیرینی پایانی مهمانی.",
		price: 165e3,
		image: "/images/p-tart.jpg",
		category: "dessert"
	},
	{
		name: "مینی چیزکیک",
		description: "چیزکیک‌های تک‌نفره با بافت خامه‌ای. بسته ۱۰ عددی.",
		price: 185e3,
		image: "/images/p-cheesecake.jpg",
		category: "dessert",
		featured: true
	}
];
var SECTIONS = [
	{
		key: "hero",
		title: "نازلی فینگر فود",
		description: "فینگر فود خونگی، مرتب و تازه برای تولد و مهمانی",
		image: "/images/hero.jpg",
		buttonText: "مشاهده منو",
		buttonLink: "/menu",
		extra: {
			secondaryText: "تماس برای سفارش",
			secondaryLink: "/contact"
		}
	},
	{
		key: "featured",
		title: "انتخاب‌های امروز",
		description: "آیتم‌هایی که بیشتر برای تولد و دورهمی سفارش داده می‌شوند.",
		image: "",
		buttonText: "همه محصولات",
		buttonLink: "/menu",
		extra: {}
	},
	{
		key: "categories",
		title: "دسته‌بندی منو",
		description: "از فینگر فود گرم تا پک کامل مهمانی.",
		image: "",
		buttonText: "",
		buttonLink: "",
		extra: {}
	},
	{
		key: "about",
		title: "داستان نازلی",
		description: "ما فینگر فود را مثل پذیرایی خانه آماده می‌کنیم: مواد تازه، طعم آشنا و چیدمان مرتب روی سینی. برای تولد، نامزدی و دورهمی‌های خانوادگی کنار شما هستیم.",
		image: "/images/about.jpg",
		buttonText: "درباره ما",
		buttonLink: "/about",
		extra: {}
	},
	{
		key: "promo",
		title: "پک مهمانی، بدون دردسر",
		description: "پک‌های ۲۰ و ۳۵ نفره را انتخاب کنید تا منو، تعداد و چیدمان از قبل هماهنگ شده باشد.",
		image: "/images/promo.jpg",
		buttonText: "دیدن پک‌ها",
		buttonLink: "/menu?category=pack",
		extra: {}
	},
	{
		key: "contact",
		title: "ثبت سفارش",
		description: "برای هماهنگی تعداد، تم رنگ و زمان تحویل تماس بگیرید یا از اینستاگرام پیام بدهید.",
		image: "",
		buttonText: "تماس تلفنی",
		buttonLink: "tel:+989129564648",
		extra: {}
	},
	{
		key: "instagram",
		title: "از آشپزخانه نازلی",
		description: "نمونه کارها و پک‌های روز را در اینستاگرام ببینید.",
		image: "/images/p-pack.jpg",
		buttonText: "اینستاگرام نازلی",
		buttonLink: "https://www.instagram.com/fingerfood.nazli",
		extra: {}
	}
];
async function ensureSeeded() {
	if (!globalRef.__nazliSeedPromise__) globalRef.__nazliSeedPromise__ = seedOnce().catch((err) => {
		globalRef.__nazliSeedPromise__ = void 0;
		throw err;
	});
	await globalRef.__nazliSeedPromise__;
}
async function seedOnce() {
	const sql = await getSql();
	if ((await sql`select value from site_settings where key = ${"seeded"}`)[0]?.value === "true") return;
	const salt = randomSecret().slice(0, 24);
	const passwordHash = await hashPassword("Nazli1405", salt);
	const sessionSecret = await sha256Hex(randomSecret());
	const settings = {
		seeded: "true",
		site_name: DEFAULT_SETTINGS.siteName,
		tagline: DEFAULT_SETTINGS.tagline,
		phone: DEFAULT_SETTINGS.phone,
		instagram: DEFAULT_SETTINGS.instagram,
		about_text: DEFAULT_SETTINGS.aboutText,
		order_closed: "false",
		order_closed_title: DEFAULT_SETTINGS.orderClosedTitle,
		order_closed_message: DEFAULT_SETTINGS.orderClosedMessage,
		order_reopen_date: "",
		footer_note: DEFAULT_SETTINGS.footerNote,
		admin_username: "admin",
		admin_salt: salt,
		admin_password_hash: passwordHash,
		session_secret: sessionSecret
	};
	for (const [key, value] of Object.entries(settings)) await sql`insert into site_settings (key, value) values (${key}, ${value})
      on conflict (key) do nothing`;
	if (((await sql`select count(*)::int as n from categories`)[0]?.n ?? 0) === 0) for (let i = 0; i < CATEGORIES.length; i += 1) {
		const c = CATEGORIES[i];
		await sql`insert into categories (name, slug, description, image_url, visible, sort_order)
        values (${c.name}, ${c.slug}, ${c.description}, ${c.image}, ${true}, ${i})`;
	}
	const cats = await sql`select id, slug from categories`;
	const catBySlug = new Map(cats.map((c) => [c.slug, c.id]));
	if (((await sql`select count(*)::int as n from products`)[0]?.n ?? 0) === 0) for (let i = 0; i < PRODUCTS.length; i += 1) {
		const p = PRODUCTS[i];
		const categoryId = catBySlug.get(p.category) ?? null;
		await sql`insert into products (
        name, description, price, special_price, image_url, extra_images, category_id,
        available, featured, visible, tags, ordering_notes, sort_order
      ) values (
        ${p.name}, ${p.description}, ${p.price}, ${p.special ?? null}, ${p.image}, ${"[]"},
        ${categoryId}, ${true}, ${Boolean(p.featured)}, ${true}, ${p.tags ?? ""}, ${p.notes ?? ""}, ${i}
      )`;
	}
	if (((await sql`select count(*)::int as n from homepage_sections`)[0]?.n ?? 0) === 0) for (let i = 0; i < SECTIONS.length; i += 1) {
		const s = SECTIONS[i];
		await sql`insert into homepage_sections (
        key, enabled, title, description, image_url, button_text, button_link, extra, sort_order
      ) values (
        ${s.key}, ${true}, ${s.title}, ${s.description}, ${s.image}, ${s.buttonText}, ${s.buttonLink},
        ${JSON.stringify(s.extra)}, ${i}
      )`;
	}
}
function mapProduct(row) {
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
		sortOrder: Number(row.sort_order)
	};
}
function mapCategory(row) {
	return {
		id: row.id,
		name: row.name,
		slug: row.slug,
		description: row.description,
		imageUrl: row.image_url,
		visible: Boolean(row.visible),
		sortOrder: Number(row.sort_order)
	};
}
function mapSection(row) {
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
		sortOrder: Number(row.sort_order)
	};
}
function mapSettings(rows) {
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
		footerNote: dict.footer_note || DEFAULT_SETTINGS.footerNote
	};
}
//#endregion
export { mapCategory as a, mapSettings as c, hashPassword as i, ensureSeeded as n, mapProduct as o, getSql as r, mapSection as s, createServerRpc as t };
