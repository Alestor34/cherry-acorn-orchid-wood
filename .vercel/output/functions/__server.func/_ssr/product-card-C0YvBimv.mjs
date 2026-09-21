import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as ShoppingBag } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Button } from "./router-2mY8pX3E.mjs";
import { t as FoodImage } from "./food-image-BPdNpS4h.mjs";
import { n as effectivePrice } from "./types-BjybHRwl.mjs";
import { i as formatToman } from "./persian-CmQp06wC.mjs";
import { s as useCart } from "./site-shell-DIOMKKJ1.mjs";
import { t as Badge } from "./badge-CPuZPRKB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product-card-C0YvBimv.js
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ product, orderingOpen }) {
	const add = useCart((s) => s.add);
	const price = effectivePrice(product);
	const onSale = price < product.price;
	function addItem() {
		if (!product.available || !orderingOpen) return;
		add(product, 1);
		toast.success(`${product.name} به سبد اضافه شد`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex flex-col overflow-hidden rounded-lg bg-paper shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/product/$id",
			params: { id: String(product.id) },
			className: "relative block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodImage, {
				src: product.imageUrl,
				alt: product.name,
				className: "aspect-[4/3]"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute top-2 right-2 flex flex-col gap-1",
				children: [
					product.featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "orange",
						children: "پیشنهادی"
					}) : null,
					!product.available ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "muted",
						children: "ناموجود"
					}) : null,
					onSale ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "red",
						children: "قیمت ویژه"
					}) : null
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-2 p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/product/$id",
					params: { id: String(product.id) },
					className: "text-base font-semibold leading-snug text-ink",
					children: product.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "line-clamp-2 text-sm leading-6 text-muted",
					children: product.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex items-end justify-between gap-2 pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [onSale ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted line-through",
						children: formatToman(product.price)
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold tabular-nums text-orange-dark",
						children: formatToman(price)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						className: "px-3",
						disabled: !product.available || !orderingOpen,
						onClick: addItem,
						"aria-label": `افزودن ${product.name} به سبد`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-4" }), "افزودن"]
					})]
				})
			]
		})]
	});
}
//#endregion
export { ProductCard as t };
