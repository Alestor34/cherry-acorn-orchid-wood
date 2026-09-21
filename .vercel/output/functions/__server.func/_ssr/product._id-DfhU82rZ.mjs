import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, z as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Button, n as Route } from "./router-2mY8pX3E.mjs";
import { t as FoodImage } from "./food-image-BPdNpS4h.mjs";
import { n as effectivePrice } from "./types-BjybHRwl.mjs";
import { i as formatToman } from "./persian-CmQp06wC.mjs";
import { c as useStoreData, i as emptyStore, o as publicProducts, s as useCart, t as SiteShell } from "./site-shell-DIOMKKJ1.mjs";
import { t as QuantityStepper } from "./quantity-stepper-48kO-_N7.mjs";
import { t as Badge } from "./badge-CPuZPRKB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._id-DfhU82rZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { id } = Route.useParams();
	const { data } = useStoreData();
	const store = data ?? emptyStore;
	const product = publicProducts(store).find((p) => String(p.id) === id);
	const [qty, setQty] = (0, import_react.useState)(1);
	const [photo, setPhoto] = (0, import_react.useState)(0);
	const add = useCart((s) => s.add);
	const orderingOpen = !store.settings.orderClosed;
	if (data && !product) throw notFound();
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 animate-pulse rounded-lg bg-line" }) });
	const item = product;
	const gallery = [item.imageUrl, ...item.extraImages].filter(Boolean);
	const price = effectivePrice(item);
	const category = store.categories.find((c) => c.id === item.categoryId);
	const related = publicProducts(store, item.categoryId).filter((p) => p.id !== item.id).slice(0, 4);
	function addItem() {
		if (!item.available || !orderingOpen) return;
		add(item, qty);
		toast.success(`${item.name} به سبد اضافه شد`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "mb-3 text-sm text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/menu",
				children: "منو"
			}), category ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mx-1",
				children: "/"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/menu",
				search: { category: category.slug },
				children: category.name
			})] }) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodImage, {
				src: gallery[photo] || product.imageUrl,
				alt: product.name,
				className: "aspect-[4/3] rounded-lg",
				priority: true
			}), gallery.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex gap-2",
				children: gallery.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setPhoto(i),
					className: `size-16 overflow-hidden rounded-sm ${i === photo ? "ring-2 ring-orange" : ""}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src,
						alt: "",
						className: "size-full object-cover"
					})
				}, src + i))
			}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						product.featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "پیشنهادی" }) : null,
						!product.available ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "muted",
							children: "ناموجود"
						}) : null,
						price < product.price ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "red",
							children: "قیمت ویژه"
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-2xl font-semibold",
					children: product.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-7 text-muted",
					children: product.description
				}),
				product.orderingNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 rounded-md bg-green-soft/60 px-3 py-2 text-sm text-green-dark",
					children: product.orderingNotes
				}) : null,
				product.tags ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-muted",
					children: product.tags.split("،").join(" · ")
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5",
					children: [price < product.price ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted line-through",
						children: formatToman(product.price)
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-2xl font-semibold tabular-nums text-orange-dark",
						children: formatToman(price)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuantityStepper, {
						value: qty,
						onChange: setQty
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "flex-1",
						size: "lg",
						disabled: !product.available || !orderingOpen,
						onClick: addItem,
						children: "افزودن به سبد"
					})]
				}),
				!orderingOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-accent-red",
					children: "ثبت سفارش فعلاً بسته است."
				}) : null
			] })]
		}),
		related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-lg font-semibold",
				children: "در همین دسته"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: related.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/product/$id",
					params: { id: String(p.id) },
					className: "flex gap-3 rounded-lg bg-paper p-2 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodImage, {
						src: p.imageUrl,
						alt: p.name,
						className: "size-20 shrink-0 rounded-sm"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: p.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm tabular-nums text-orange-dark",
						children: formatToman(effectivePrice(p))
					})] })]
				}, p.id))
			})]
		}) : null
	] });
}
//#endregion
export { ProductPage as component };
