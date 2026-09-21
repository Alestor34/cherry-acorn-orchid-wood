import { t as cn } from "./utils-CYBaDj9o.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as Route$6 } from "./router-2mY8pX3E.mjs";
import { a as publicCategories, c as useStoreData, i as emptyStore, o as publicProducts, t as SiteShell } from "./site-shell-DIOMKKJ1.mjs";
import { t as ProductCard } from "./product-card-C0YvBimv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/menu-BwPG1bNg.js
var import_jsx_runtime = require_jsx_runtime();
function MenuPage() {
	const { category } = Route$6.useSearch();
	const { data } = useStoreData();
	const store = data ?? emptyStore;
	const cats = publicCategories(store);
	const active = cats.find((c) => c.slug === category);
	const products = publicProducts(store, active?.id);
	const orderingOpen = !store.settings.orderClosed;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-green",
					children: "منو"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold",
					children: active ? active.name : "همه محصولات"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm leading-7 text-muted",
					children: active?.description || "فینگر فود گرم، سوخاری، مزه و پک مهمانی. تعداد را انتخاب کنید و به سبد اضافه کنید."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "no-scrollbar -mx-4 mb-5 flex gap-2 overflow-x-auto px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/menu",
				className: cn("shrink-0 rounded-full px-4 py-2 text-sm", !category ? "bg-orange text-paper" : "bg-paper text-ink shadow-card"),
				children: "همه"
			}), cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/menu",
				search: { category: c.slug },
				className: cn("shrink-0 rounded-full px-4 py-2 text-sm", c.slug === category ? "bg-orange text-paper" : "bg-paper text-ink shadow-card"),
				children: c.name
			}, c.id))]
		}),
		products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-lg bg-paper p-8 text-center text-sm text-muted shadow-card",
			children: "محصولی در این دسته نیست."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3",
			children: products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
				product: p,
				orderingOpen
			}, p.id))
		})
	] });
}
//#endregion
export { MenuPage as component };
