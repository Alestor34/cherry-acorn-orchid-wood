import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as Trash2, l as Pencil, s as Plus, v as ChevronUp, y as ChevronDown } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Button } from "./router-2mY8pX3E.mjs";
import { n as Label, t as Input } from "./label-BrmqiiCH.mjs";
import { c as reorderCategory, d as saveCategory, i as deleteCategory } from "./admin-i7IBbW5w.mjs";
import { t as useAdminData } from "./admin-query-DQSxaPyT.mjs";
import { t as ImageField } from "./image-field-BzJum9bZ.mjs";
import { n as Textarea, t as Switch } from "./textarea-H0Gu5jFb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categories-C6vXiBNF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyForm = () => ({
	name: "",
	slug: "",
	description: "",
	imageUrl: "",
	visible: true
});
function CategoriesAdmin() {
	const { data, isPending } = useAdminData();
	const qc = useQueryClient();
	const [form, setForm] = (0, import_react.useState)(null);
	const save = useMutation({
		mutationFn: () => {
			if (!form) throw new Error("form");
			return saveCategory({ data: {
				id: form.id,
				name: form.name,
				slug: form.slug || form.name,
				description: form.description,
				imageUrl: form.imageUrl,
				visible: form.visible
			} });
		},
		onSuccess: async () => {
			toast.success("دسته ذخیره شد");
			setForm(null);
			await Promise.all([qc.invalidateQueries({ queryKey: ["admin-data"] }), qc.invalidateQueries({ queryKey: ["store"] })]);
		},
		onError: (err) => toast.error(err instanceof Error ? err.message : "خطا")
	});
	const remove = useMutation({
		mutationFn: (id) => deleteCategory({ data: { id } }),
		onSuccess: async () => {
			toast.success("حذف شد");
			await Promise.all([qc.invalidateQueries({ queryKey: ["admin-data"] }), qc.invalidateQueries({ queryKey: ["store"] })]);
		}
	});
	async function move(id, direction) {
		await reorderCategory({ data: {
			id,
			direction
		} });
		await Promise.all([qc.invalidateQueries({ queryKey: ["admin-data"] }), qc.invalidateQueries({ queryKey: ["store"] })]);
	}
	if (isPending || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "در حال بارگذاری…"
	});
	if (form) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-3",
		onSubmit: (e) => {
			e.preventDefault();
			save.mutate();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: form.id ? "ویرایش دسته" : "دسته جدید"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					onClick: () => setForm(null),
					children: "انصراف"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "نام" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: form.name,
				onChange: (e) => setForm({
					...form,
					name: e.target.value
				}),
				required: true
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "نامک انگلیسی (slug)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: form.slug,
				onChange: (e) => setForm({
					...form,
					slug: e.target.value
				}),
				placeholder: "hot",
				dir: "ltr"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "توضیح" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: form.description,
				onChange: (e) => setForm({
					...form,
					description: e.target.value
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageField, {
				label: "تصویر",
				value: form.imageUrl,
				onChange: (imageUrl) => setForm({
					...form,
					imageUrl
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-12 items-center justify-between rounded-md bg-cream px-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm",
					children: "نمایش در سایت"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: form.visible,
					onCheckedChange: (visible) => setForm({
						...form,
						visible
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full",
				type: "submit",
				disabled: save.isPending,
				children: "ذخیره دسته"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-xl font-semibold",
			children: "دسته‌ها"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			onClick: () => setForm(emptyForm()),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "جدید"]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-4 space-y-2",
		children: data.categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center gap-3 rounded-lg bg-paper p-3 shadow-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: c.imageUrl,
					alt: "",
					className: "size-14 rounded-sm object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: c.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							c.slug,
							" ",
							c.visible ? "" : "· مخفی"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "size-9",
					onClick: () => move(c.id, "up"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "mx-auto size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "size-9",
					onClick: () => move(c.id, "down"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "mx-auto size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "size-11",
					onClick: () => setForm(c),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "mx-auto size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "size-11 text-accent-red",
					onClick: () => {
						if (confirm("این دسته حذف شود؟ محصولات بدون دسته می‌مانند.")) remove.mutate(c.id);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mx-auto size-4" })
				})
			]
		}, c.id))
	})] });
}
//#endregion
export { CategoriesAdmin as component };
