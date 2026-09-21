import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Button } from "./router-2mY8pX3E.mjs";
import { t as DEFAULT_SETTINGS } from "./types-BjybHRwl.mjs";
import { n as Label, t as Input } from "./label-BrmqiiCH.mjs";
import { m as saveSettings, r as changeAdminPassword } from "./admin-i7IBbW5w.mjs";
import { t as useAdminData } from "./admin-query-DQSxaPyT.mjs";
import { n as Textarea, t as Switch } from "./textarea-H0Gu5jFb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-DCOeHilN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsAdmin() {
	const { data, isPending } = useAdminData();
	const qc = useQueryClient();
	const [form, setForm] = (0, import_react.useState)(DEFAULT_SETTINGS);
	const [currentPassword, setCurrentPassword] = (0, import_react.useState)("");
	const [nextPassword, setNextPassword] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (data?.settings) setForm(data.settings);
	}, [data]);
	const save = useMutation({
		mutationFn: () => saveSettings({ data: form }),
		onSuccess: async () => {
			toast.success("تنظیمات ذخیره شد");
			await Promise.all([qc.invalidateQueries({ queryKey: ["admin-data"] }), qc.invalidateQueries({ queryKey: ["store"] })]);
		},
		onError: (err) => toast.error(err instanceof Error ? err.message : "خطا")
	});
	const password = useMutation({
		mutationFn: () => changeAdminPassword({ data: {
			currentPassword,
			nextPassword
		} }),
		onSuccess: () => {
			toast.success("رمز عوض شد");
			setCurrentPassword("");
			setNextPassword("");
		},
		onError: (err) => toast.error(err instanceof Error ? err.message : "خطا")
	});
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "در حال بارگذاری…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-semibold",
				children: "تنظیمات سایت"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-3",
				onSubmit: (e) => {
					e.preventDefault();
					save.mutate();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "نام سایت" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.siteName,
						onChange: (e) => setForm({
							...form,
							siteName: e.target.value
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "شعار" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.tagline,
						onChange: (e) => setForm({
							...form,
							tagline: e.target.value
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "شماره تماس" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						dir: "ltr",
						value: form.phone,
						onChange: (e) => setForm({
							...form,
							phone: e.target.value
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "آیدی اینستاگرام" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						dir: "ltr",
						value: form.instagram,
						onChange: (e) => setForm({
							...form,
							instagram: e.target.value
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "متن درباره ما" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: form.aboutText,
						onChange: (e) => setForm({
							...form,
							aboutText: e.target.value
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "یادداشت پایین سایت" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.footerNote,
						onChange: (e) => setForm({
							...form,
							footerNote: e.target.value
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-line bg-cream p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: "بستن موقت سفارش"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: "پنجره اطلاع‌رسانی برای مشتری نمایش داده می‌شود."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: form.orderClosed,
									onCheckedChange: (orderClosed) => setForm({
										...form,
										orderClosed
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "عنوان پنجره" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.orderClosedTitle,
									onChange: (e) => setForm({
										...form,
										orderClosedTitle: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [
									"پیام (از ",
									"{date}",
									" برای تاریخ استفاده کنید)"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: form.orderClosedMessage,
									onChange: (e) => setForm({
										...form,
										orderClosedMessage: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "تاریخ بازگشایی" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									dir: "ltr",
									value: form.orderReopenDate,
									onChange: (e) => setForm({
										...form,
										orderReopenDate: e.target.value
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						type: "submit",
						disabled: save.isPending,
						children: "ذخیره تنظیمات"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-3 rounded-lg bg-paper p-4 shadow-card",
				onSubmit: (e) => {
					e.preventDefault();
					password.mutate();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "تغییر رمز مدیریت"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "رمز فعلی" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "password",
						value: currentPassword,
						onChange: (e) => setCurrentPassword(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "رمز جدید" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "password",
						value: nextPassword,
						onChange: (e) => setNextPassword(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						variant: "outline",
						disabled: password.isPending,
						children: "به‌روزرسانی رمز"
					})
				]
			})
		]
	});
}
//#endregion
export { SettingsAdmin as component };
