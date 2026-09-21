import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as Button } from "./router-2mY8pX3E.mjs";
import { t as FoodImage } from "./food-image-BPdNpS4h.mjs";
import { c as useStoreData, i as emptyStore, t as SiteShell } from "./site-shell-DIOMKKJ1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-Lc3hjPpO.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	const { data } = useStoreData();
	const store = data ?? emptyStore;
	const about = store.sections.find((s) => s.key === "about");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium tracking-wide text-green",
			children: "درباره"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 text-2xl font-semibold",
			children: store.settings.siteName
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodImage, {
			src: about?.imageUrl || "/images/about.jpg",
			alt: "",
			className: "mt-4 aspect-[16/9] rounded-lg",
			priority: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 space-y-4 text-sm leading-7 text-muted md:text-base",
			children: [store.settings.aboutText.split("\n").map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, p)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "سفارش‌ها معمولاً از یک روز قبل هماهنگ می‌شوند تا سینی‌ها تازه، مرتب و به‌موقع آماده باشند. تعداد مهمان، تم رنگ و زمان تحویل را با ما در میان بگذارید." })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex flex-col gap-2 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/menu",
					children: "دیدن منو"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/contact",
					children: "هماهنگی سفارش"
				})
			})]
		})
	] });
}
//#endregion
export { AboutPage as component };
