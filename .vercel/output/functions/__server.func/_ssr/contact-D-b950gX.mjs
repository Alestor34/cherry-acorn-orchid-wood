import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as Phone, h as Instagram } from "../_libs/lucide-react.mjs";
import { i as Button } from "./router-2mY8pX3E.mjs";
import { a as instagramUrl, c as toTelHref, l as toWhatsAppHref, r as formatPhoneDisplay } from "./persian-CmQp06wC.mjs";
import { c as useStoreData, i as emptyStore, t as SiteShell } from "./site-shell-DIOMKKJ1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-D-b950gX.js
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const { data } = useStoreData();
	const settings = (data ?? emptyStore).settings;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium tracking-wide text-green",
			children: "تماس"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 text-2xl font-semibold",
			children: "ثبت سفارش و هماهنگی"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-7 text-muted",
			children: "سبد خرید را آماده کنید، فهرست را به صورت PDF بگیرید و برای نهایی‌کردن سفارش تماس بگیرید یا در اینستاگرام پیام بدهید."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href: toTelHref(settings.phone),
			className: "mt-6 flex min-h-16 items-center justify-center gap-3 rounded-lg bg-green text-xl font-semibold text-paper",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular-nums",
				dir: "ltr",
				children: formatPhoneDisplay(settings.phone)
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "lg",
				variant: "outline",
				className: "w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: toWhatsAppHref(settings.phone, "سلام، برای سفارش فینگر فود پیام می‌دهم."),
					children: "ارسال پیام در واتساپ"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "lg",
				variant: "secondary",
				className: "w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: instagramUrl(settings.instagram),
					target: "_blank",
					rel: "noreferrer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-4" }),
						"اینستاگرام @",
						settings.instagram.replace(/^@/, "")
					]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm text-muted",
			children: settings.footerNote
		})
	] });
}
//#endregion
export { ContactPage as component };
