import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as Trash2, l as Pencil, s as Plus, v as ChevronUp, y as ChevronDown } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as queryClient, i as Button } from "./router-2mY8pX3E.mjs";
import { i as formatToman, o as toEnDigits } from "./persian-CmQp06wC.mjs";
import { n as Label, t as Input } from "./label-BrmqiiCH.mjs";
import { a as deleteProduct, f as saveProduct, l as reorderProduct } from "./admin-i7IBbW5w.mjs";
import { t as useAdminData } from "./admin-query-DQSxaPyT.mjs";
import { t as ImageField } from "./image-field-BzJum9bZ.mjs";
import { n as Textarea, t as Switch } from "./textarea-H0Gu5jFb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-Mm8bM0qs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyForm = () => ({
	name: "",
	description: "",
	price: "",
	specialPrice: "",
	imageUrl: "",
	categoryId: "",
	available: true,
	featured: false,
	visible: true,
	tags: "",
	orderingNotes: ""
});
function fromProduct(p) {
	return {
		id: p.id,
		name: p.name,
		description: p.description,
		price: String(p.price),
		specialPrice: p.specialPrice ? String(p.specialPrice) : "",
		imageUrl: p.imageUrl,
		categoryId: p.categoryId ? String(p.categoryId) : "",
		available: p.available,
		featured: p.featured,
		visible: p.visible,
		tags: p.tags,
		orderingNotes: p.orderingNotes
	};
}
function ProductsAdmin() {
	const { data, isPending } = useAdminData();
	const qc = useQueryClient();
	const [form, setForm] = (0, import_react.useState)(null);
	const save = useMutation({
		mutationFn: () => {
			if (!form) throw new Error("form");
			return saveProduct({ data: {
				id: form.id,
				name: form.name,
				description: form.description,
				price: Number(toEnDigits(form.price)) || 0,
				specialPrice: form.specialPrice ? Number(toEnDigits(form.specialPrice)) : null,
				imageUrl: form.imageUrl,
				extraImages: [],
				categoryId: form.categoryId ? Number(form.categoryId) : null,
				available: form.available,
				featured: form.featured,
				visible: form.visible,
				tags: form.tags,
				orderingNotes: form.orderingNotes
			} });
		},
		onSuccess: async () => {
			toast.success("محصول ذخیره شد");
			setForm(null);
			await Promise.all([qc.invalidateQueries({ queryKey: ["admin-data"] }), qc.invalidateQueries({ queryKey: ["store"] })]);
		},
		onError: (err) => toast.error(err instanceof Error ? err.message : "خطا در ذخیره")
	});
	const remove = useMutation({
		mutationFn: (id) => deleteProduct({ data: { id } }),
		onSuccess: async () => {
			toast.success("حذف شد");
			await Promise.all([qc.invalidateQueries({ queryKey: ["admin-data"] }), qc.invalidateQueries({ queryKey: ["store"] })]);
		}
	});
	async function move(id, direction) {
		await reorderProduct({ data: {
			id,
			direction
		} });
		await Promise.all([queryClient.invalidateQueries({ queryKey: ["admin-data"] }), queryClient.invalidateQueries({ queryKey: ["store"] })]);
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
					children: form.id ? "ویرایش محصول" : "محصول جدید"
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "توضیح فارسی" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: form.description,
				onChange: (e) => setForm({
					...form,
					description: e.target.value
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "قیمت (تومان)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					inputMode: "numeric",
					value: form.price,
					onChange: (e) => setForm({
						...form,
						price: e.target.value
					}),
					required: true
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "قیمت ویژه (اختیاری)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					inputMode: "numeric",
					value: form.specialPrice,
					onChange: (e) => setForm({
						...form,
						specialPrice: e.target.value
					})
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageField, {
				label: "تصویر اصلی",
				value: form.imageUrl,
				onChange: (imageUrl) => setForm({
					...form,
					imageUrl
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "دسته" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				className: "h-11 w-full rounded-md border border-line bg-paper px-3 text-sm",
				value: form.categoryId,
				onChange: (e) => setForm({
					...form,
					categoryId: e.target.value
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "بدون دسته"
				}), data.categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: c.id,
					children: c.name
				}, c.id))]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "برچسب‌ها" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: form.tags,
				onChange: (e) => setForm({
					...form,
					tags: e.target.value
				}),
				placeholder: "تولد، محبوب"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "یادداشت سفارش" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: form.orderingNotes,
				onChange: (e) => setForm({
					...form,
					orderingNotes: e.target.value
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
				label: "موجود",
				checked: form.available,
				onChange: (available) => setForm({
					...form,
					available
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
				label: "نمایش در سایت",
				checked: form.visible,
				onChange: (visible) => setForm({
					...form,
					visible
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
				label: "پیشنهادی",
				checked: form.featured,
				onChange: (featured) => setForm({
					...form,
					featured
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full",
				type: "submit",
				disabled: save.isPending,
				children: "ذخیره محصول"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-xl font-semibold",
			children: "محصولات"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			onClick: () => setForm(emptyForm()),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "جدید"]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-4 space-y-2",
		children: data.products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex gap-3 rounded-lg bg-paper p-3 shadow-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: p.imageUrl,
					alt: "",
					className: "size-16 rounded-sm object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: p.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							formatToman(p.price),
							" ",
							p.visible ? "" : "· مخفی",
							" ",
							p.available ? "" : "· ناموجود"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-9 items-center justify-center",
						onClick: () => move(p.id, "up"),
						"aria-label": "بالا",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-9 items-center justify-center",
						onClick: () => move(p.id, "down"),
						"aria-label": "پایین",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "flex size-11 items-center justify-center",
					onClick: () => setForm(fromProduct(p)),
					"aria-label": "ویرایش",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "flex size-11 items-center justify-center text-accent-red",
					onClick: () => {
						if (confirm("این محصول حذف شود؟")) remove.mutate(p.id);
					},
					"aria-label": "حذف",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
				})
			]
		}, p.id))
	})] });
}
function ToggleRow({ label, checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-12 items-center justify-between rounded-md bg-cream px-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked,
			onCheckedChange: onChange
		})]
	});
}
//#endregion
export { ProductsAdmin as component };
