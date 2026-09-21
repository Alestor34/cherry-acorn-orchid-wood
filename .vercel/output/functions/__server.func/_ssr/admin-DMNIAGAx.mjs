import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as formatToman } from "./persian-CmQp06wC.mjs";
import { t as useAdminData } from "./admin-query-DQSxaPyT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DMNIAGAx.js
var import_jsx_runtime = require_jsx_runtime();
function AdminHome() {
	const { data, isPending, error } = useAdminData();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "در حال بارگذاری…"
	});
	if (error || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-accent-red",
		children: "دسترسی نامعتبر است. دوباره وارد شوید."
	});
	const visibleProducts = data.products.filter((p) => p.visible).length;
	const featured = data.products.filter((p) => p.featured).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-xl font-semibold",
			children: "خلاصه فروشگاه"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "از اینجا منو، متن‌ها و وضعیت سفارش را بدون تغییر کد مدیریت کنید."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid grid-cols-2 gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "محصولات",
					value: String(data.products.length),
					hint: `${visibleProducts} نمایش‌داده‌شده`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "دسته‌ها",
					value: String(data.categories.length)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "پیشنهادی",
					value: String(featured)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "سفارش",
					value: data.settings.orderClosed ? "بسته" : "باز",
					hint: data.settings.orderClosed ? data.settings.orderClosedTitle : "مشتری می‌تواند به سبد اضافه کند"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					className: "rounded-md bg-paper px-4 py-3 text-sm shadow-card",
					to: "/admin/products",
					children: "مدیریت محصولات"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					className: "rounded-md bg-paper px-4 py-3 text-sm shadow-card",
					to: "/admin/settings",
					children: "تماس، اینستاگرام و بستن سفارش"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					className: "rounded-md bg-paper px-4 py-3 text-sm shadow-card",
					to: "/admin/sections",
					children: "ویرایش بخش‌های صفحه اصلی"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-6 text-xs text-muted",
			children: ["نمونه قیمت پک ۳۵ نفره: ", formatToman(135e5)]
		})
	] });
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-paper p-4 shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-2xl font-semibold tabular-nums",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: hint
			}) : null
		]
	});
}
//#endregion
export { AdminHome as component };
