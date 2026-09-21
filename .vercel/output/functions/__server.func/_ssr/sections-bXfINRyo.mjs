import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { v as ChevronUp, y as ChevronDown } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Button } from "./router-2mY8pX3E.mjs";
import { n as Label, t as Input } from "./label-BrmqiiCH.mjs";
import { p as saveSection, u as reorderSection } from "./admin-i7IBbW5w.mjs";
import { t as useAdminData } from "./admin-query-DQSxaPyT.mjs";
import { t as ImageField } from "./image-field-BzJum9bZ.mjs";
import { n as Textarea, t as Switch } from "./textarea-H0Gu5jFb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sections-bXfINRyo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LABELS = {
	hero: "سربرگ",
	featured: "محصولات پیشنهادی",
	categories: "دسته‌ها",
	about: "درباره",
	promo: "بنر تبلیغاتی",
	contact: "تماس",
	instagram: "اینستاگرام"
};
function SectionsAdmin() {
	const { data, isPending } = useAdminData();
	const qc = useQueryClient();
	const [drafts, setDrafts] = (0, import_react.useState)({});
	const save = useMutation({
		mutationFn: (section) => saveSection({ data: {
			id: section.id,
			enabled: section.enabled,
			title: section.title,
			description: section.description,
			imageUrl: section.imageUrl,
			buttonText: section.buttonText,
			buttonLink: section.buttonLink,
			extra: section.extra
		} }),
		onSuccess: async () => {
			toast.success("بخش ذخیره شد");
			await Promise.all([qc.invalidateQueries({ queryKey: ["admin-data"] }), qc.invalidateQueries({ queryKey: ["store"] })]);
		},
		onError: (err) => toast.error(err instanceof Error ? err.message : "خطا")
	});
	if (isPending || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "در حال بارگذاری…"
	});
	function current(section) {
		return drafts[section.id] ?? section;
	}
	function patch(section, partial) {
		const next = {
			...current(section),
			...partial
		};
		setDrafts((d) => ({
			...d,
			[section.id]: next
		}));
	}
	async function move(id, direction) {
		await reorderSection({ data: {
			id,
			direction
		} });
		await Promise.all([qc.invalidateQueries({ queryKey: ["admin-data"] }), qc.invalidateQueries({ queryKey: ["store"] })]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-xl font-semibold",
			children: "بخش‌های صفحه اصلی"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "هر بخش را خاموش کنید، متن و تصویرش را عوض کنید یا جابه‌جا کنید."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 space-y-4",
			children: data.sections.map((section) => {
				const s = current(section);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-lg bg-paper p-4 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: LABELS[section.key] || section.key
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "size-9",
									onClick: () => move(section.id, "up"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "mx-auto size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "size-9",
									onClick: () => move(section.id, "down"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "mx-auto size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: s.enabled,
									onCheckedChange: (enabled) => patch(section, { enabled })
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "عنوان" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: s.title,
								onChange: (e) => patch(section, { title: e.target.value })
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "توضیح" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: s.description,
								onChange: (e) => patch(section, { description: e.target.value })
							})] }),
							section.key === "hero" || section.key === "about" || section.key === "promo" || section.key === "instagram" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageField, {
								label: "تصویر",
								value: s.imageUrl,
								onChange: (imageUrl) => patch(section, { imageUrl })
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "متن دکمه" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: s.buttonText,
									onChange: (e) => patch(section, { buttonText: e.target.value })
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "لینک دکمه" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									dir: "ltr",
									value: s.buttonLink,
									onChange: (e) => patch(section, { buttonLink: e.target.value })
								})] })]
							}),
							section.key === "hero" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "دکمه دوم" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: s.extra.secondaryText ?? "",
									onChange: (e) => patch(section, { extra: {
										...s.extra,
										secondaryText: e.target.value
									} })
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "لینک دوم" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									dir: "ltr",
									value: s.extra.secondaryLink ?? "",
									onChange: (e) => patch(section, { extra: {
										...s.extra,
										secondaryLink: e.target.value
									} })
								})] })]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: () => save.mutate(s),
								disabled: save.isPending,
								children: "ذخیره این بخش"
							})
						]
					})]
				}, section.id);
			})
		})
	] });
}
//#endregion
export { SectionsAdmin as component };
