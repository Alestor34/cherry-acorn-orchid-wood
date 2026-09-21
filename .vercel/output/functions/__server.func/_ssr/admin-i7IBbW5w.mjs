import { a as number, c as string, n as array, o as object, r as boolean, s as record, t as _enum } from "../_libs/zod.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-i7IBbW5w.js
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
var adminLogin = createServerFn({ method: "POST" }).validator((d) => object({
	username: string().min(1).max(40),
	password: string().min(1).max(80)
}).parse(d)).handler(createSsrRpc("629bb5da3b7d7c22bdc6b259848b56bf4bc81225b4389f62fcec77ac4ae93151"));
var adminLogout = createServerFn({ method: "POST" }).handler(createSsrRpc("3f07bddb4511699258bbc6bf904f20e189044f61ccc79d2b09813808dfff597c"));
var getAdminSession = createServerFn({ method: "GET" }).handler(createSsrRpc("9543d04c46a62881d73e93b32366436ab4c56d59f0e6d93ba0a15a76bc368f18"));
var getAdminData = createServerFn({ method: "GET" }).handler(createSsrRpc("aec7b062c196486a8686f89eb1b380ed34101e209c1d7c4590575df5f8fe5599"));
var saveProduct = createServerFn({ method: "POST" }).validator((d) => productInput.parse(d)).handler(createSsrRpc("fb599ad27cfa1440073e2fadf6ffbd43be587bd8777dc9f12616ee7e7f8ea021"));
var deleteProduct = createServerFn({ method: "POST" }).validator((d) => object({ id: number() }).parse(d)).handler(createSsrRpc("1dbf151a4ca59dcc71cfeb0881f60da857e8e429259797b967085f008efad450"));
var reorderProduct = createServerFn({ method: "POST" }).validator((d) => object({
	id: number(),
	direction: _enum(["up", "down"])
}).parse(d)).handler(createSsrRpc("51edfd6cd35d0a46d078d42f541ee2b363de06dd1c0fdc3ae271c4100bf7f604"));
var saveCategory = createServerFn({ method: "POST" }).validator((d) => categoryInput.parse(d)).handler(createSsrRpc("4e96ae88482f4d9b2610bfec2ee2e7b823c76f00c762b188df2afa9fc0fb6dc0"));
var deleteCategory = createServerFn({ method: "POST" }).validator((d) => object({ id: number() }).parse(d)).handler(createSsrRpc("602b61220273ba78a72a6e9cddff5af56e655c6b3fb5b80d5bb478e7c436ef8e"));
var reorderCategory = createServerFn({ method: "POST" }).validator((d) => object({
	id: number(),
	direction: _enum(["up", "down"])
}).parse(d)).handler(createSsrRpc("4b7d0d625a025e86e94b9fc120c0c70465d3341a17f159f5a7259ca8dfdd6996"));
var saveSection = createServerFn({ method: "POST" }).validator((d) => sectionInput.parse(d)).handler(createSsrRpc("84e0b3bd7557ecf577c07a6be2346851f83d7ab84c1146a06a3f15b74352e85b"));
var reorderSection = createServerFn({ method: "POST" }).validator((d) => object({
	id: number(),
	direction: _enum(["up", "down"])
}).parse(d)).handler(createSsrRpc("322cd35da66f4b35ae1779402af5d31e968aec312af43d5f01ccf5420c5b4333"));
var saveSettings = createServerFn({ method: "POST" }).validator((d) => settingsInput.parse(d)).handler(createSsrRpc("2de7264422f4cf9cfbce3ba8fcc5fc65a8cc162324a2b758d2b87695920877f4"));
var changeAdminPassword = createServerFn({ method: "POST" }).validator((d) => object({
	currentPassword: string().min(1),
	nextPassword: string().min(6).max(80)
}).parse(d)).handler(createSsrRpc("b5460cca4b57702ed7b3ca1d266fddb54efcd8454c905242c21b835f16274192"));
//#endregion
export { deleteProduct as a, reorderCategory as c, saveCategory as d, saveProduct as f, deleteCategory as i, reorderProduct as l, saveSettings as m, adminLogout as n, getAdminData as o, saveSection as p, changeAdminPassword as r, getAdminSession as s, adminLogin as t, reorderSection as u };
