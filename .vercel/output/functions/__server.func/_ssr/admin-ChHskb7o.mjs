import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-CYBaDj9o.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { d as useRouterState, m as Outlet, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { f as LogOut, m as Layers, n as UtensilsCrossed, o as Settings2, p as LayoutGrid, u as Package } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { i as Button } from "./router-2mY8pX3E.mjs";
import { n as Label, t as Input } from "./label-BrmqiiCH.mjs";
import { n as adminLogout, s as getAdminSession, t as adminLogin } from "./admin-i7IBbW5w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-ChHskb7o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/admin",
		label: "خلاصه",
		icon: LayoutGrid,
		exact: true
	},
	{
		to: "/admin/products",
		label: "محصولات",
		icon: UtensilsCrossed
	},
	{
		to: "/admin/categories",
		label: "دسته‌ها",
		icon: Package
	},
	{
		to: "/admin/sections",
		label: "بخش‌های صفحه",
		icon: Layers
	},
	{
		to: "/admin/settings",
		label: "تنظیمات",
		icon: Settings2
	}
];
function AdminLayout() {
	const { data, isPending } = useQuery({
		queryKey: ["admin-session"],
		queryFn: () => getAdminSession()
	});
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-linen flex min-h-dvh items-center justify-center text-muted",
		children: "در حال بارگذاری…"
	});
	if (!data?.authenticated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLogin, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminChrome, {});
}
function AdminLogin() {
	const qc = useQueryClient();
	const [username, setUsername] = (0, import_react.useState)("admin");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const login = useMutation({
		mutationFn: () => adminLogin({ data: {
			username,
			password
		} }),
		onSuccess: async () => {
			await qc.invalidateQueries({ queryKey: ["admin-session"] });
		},
		onError: (err) => setError(err instanceof Error ? err.message : "ورود ناموفق بود")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-linen flex min-h-dvh items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "w-full max-w-sm rounded-lg bg-paper p-6 shadow-card",
			onSubmit: (e) => {
				e.preventDefault();
				setError("");
				login.mutate();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/logo.svg",
					alt: "",
					className: "mx-auto size-12 rounded-[12px] outline-none"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-center text-xl font-semibold",
					children: "ورود مدیریت"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-center text-sm text-muted",
					children: "نازلی فینگر فود"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "user",
						children: "نام کاربری"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "user",
						value: username,
						onChange: (e) => setUsername(e.target.value),
						autoComplete: "username"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "pass",
						children: "رمز عبور"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "pass",
						type: "password",
						value: password,
						onChange: (e) => setPassword(e.target.value),
						autoComplete: "current-password"
					})]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-accent-red",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-5 w-full",
					type: "submit",
					disabled: login.isPending,
					children: "ورود"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-center text-xs leading-6 text-muted",
					children: [
						"ورود پیش‌فرض: ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							dir: "ltr",
							children: "admin / Nazli1405"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"رمز را از تنظیمات عوض کنید."
					]
				})
			]
		})
	});
}
function AdminChrome() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const qc = useQueryClient();
	const logout = useMutation({
		mutationFn: () => adminLogout(),
		onSuccess: async () => {
			await qc.invalidateQueries({ queryKey: ["admin-session"] });
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-linen min-h-dvh pb-20 md:pb-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 flex items-center justify-between border-b border-line bg-paper px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.svg",
						alt: "",
						className: "size-8 rounded-[8px] outline-none"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: "پنل نازلی"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-xs text-muted",
						children: "مشاهده سایت"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex h-11 items-center gap-1 text-sm text-muted",
					onClick: () => logout.mutate(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), "خروج"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl gap-6 px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "hidden w-52 shrink-0 md:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "sticky top-20 space-y-1",
						children: NAV.map((item) => {
							const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex h-11 items-center gap-2 rounded-md px-3 text-sm", active ? "bg-orange-soft text-orange-dark" : "text-muted hover:bg-paper"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
							}, item.to);
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-paper pb-[env(safe-area-inset-bottom)] md:hidden",
				children: NAV.map((item) => {
					const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex h-14 flex-col items-center justify-center gap-0.5 text-[10px]", active ? "text-orange" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
					}, item.to);
				})
			})
		]
	});
}
//#endregion
export { AdminLayout as component };
