import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-CYBaDj9o.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as number, o as object } from "../_libs/zod.mjs";
import { a as ShoppingBag, c as Phone, g as House, h as Instagram, n as UtensilsCrossed, t as X } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as DialogOverlay, i as DialogDescription$1, n as DialogClose, o as DialogPortal, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { i as Button } from "./router-2mY8pX3E.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { n as effectivePrice, t as DEFAULT_SETTINGS } from "./types-BjybHRwl.mjs";
import { a as instagramUrl, c as toTelHref, n as formatJalaliFromIso, r as formatPhoneDisplay, s as toFaDigits } from "./persian-CmQp06wC.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-shell-DIOMKKJ1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var useCart = create()(persist((set, get) => ({
	items: [],
	bump: 0,
	add: (product, quantity = 1) => {
		const qty = Math.max(1, Math.round(quantity));
		const items = [...get().items];
		const idx = items.findIndex((i) => i.productId === product.id);
		if (idx >= 0) items[idx] = {
			...items[idx],
			quantity: items[idx].quantity + qty
		};
		else items.push({
			productId: product.id,
			name: product.name,
			price: effectivePrice(product),
			imageUrl: product.imageUrl,
			quantity: qty
		});
		set({
			items,
			bump: get().bump + 1
		});
	},
	setQty: (productId, quantity) => {
		const qty = Math.round(quantity);
		if (qty <= 0) {
			set({ items: get().items.filter((i) => i.productId !== productId) });
			return;
		}
		set({ items: get().items.map((i) => i.productId === productId ? {
			...i,
			quantity: qty
		} : i) });
	},
	remove: (productId) => set({ items: get().items.filter((i) => i.productId !== productId) }),
	clear: () => set({ items: [] })
}), { name: "nazli-cart" }));
function cartCount(items) {
	return items.reduce((sum, i) => sum + i.quantity, 0);
}
function cartTotal(items) {
	return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}
function CartBadge({ className }) {
	const items = useCart((s) => s.items);
	const bump = useCart((s) => s.bump);
	const count = cartCount(items);
	const [anim, setAnim] = (0, import_react.useState)(false);
	const first = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		if (first.current) {
			first.current = false;
			return;
		}
		setAnim(true);
		const t = window.setTimeout(() => setAnim(false), 400);
		return () => window.clearTimeout(t);
	}, [bump]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/cart",
		className: cn("relative flex size-11 items-center justify-center rounded-md text-ink hover:bg-paper", className),
		"aria-label": "سبد خرید",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: cn("size-5", anim && "cart-bump") }), count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute top-1.5 left-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-red px-1 text-[10px] font-semibold text-paper tabular-nums",
			children: toFaDigits(count > 9 ? "9+" : count)
		}) : null]
	});
}
var NAV = [
	{
		to: "/",
		label: "خانه"
	},
	{
		to: "/menu",
		label: "منو"
	},
	{
		to: "/about",
		label: "درباره"
	},
	{
		to: "/contact",
		label: "تماس"
	}
];
function SiteHeader({ settings }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-line/80 bg-cream/90 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 md:h-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex min-w-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.svg",
						alt: "",
						className: "size-9 rounded-[10px] outline-none"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-semibold leading-tight text-ink",
							children: settings.siteName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hidden truncate text-[11px] text-muted sm:block",
							children: "Finger Food"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 md:flex",
					children: NAV.map((item) => {
						const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							className: cn("rounded-md px-3 py-2 text-sm transition-colors duration-150", active ? "bg-orange-soft text-orange-dark" : "text-muted hover:bg-paper hover:text-ink"),
							children: item.label
						}, item.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: toTelHref(settings.phone),
							className: "hidden h-11 items-center gap-2 rounded-md px-2 text-sm text-green md:flex",
							"aria-label": `تماس ${formatPhoneDisplay(settings.phone)}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								dir: "ltr",
								children: formatPhoneDisplay(settings.phone)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: instagramUrl(settings.instagram),
							target: "_blank",
							rel: "noreferrer",
							className: "flex size-11 items-center justify-center rounded-md text-ink hover:bg-paper",
							"aria-label": "اینستاگرام",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartBadge, {})
					]
				})
			]
		})
	});
}
function SiteFooter({ settings }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mt-8 border-t border-line bg-green-dark text-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.svg",
						alt: "",
						className: "size-9 rounded-[10px] outline-none"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: settings.siteName
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-7 text-paper/80",
					children: settings.tagline
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 font-medium",
						children: "دسترسی"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 text-paper/80",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/menu",
								children: "منو و محصولات"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/about",
								children: "درباره نازلی"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/cart",
								children: "سبد خرید"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								children: "تماس"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 font-medium",
							children: "ارتباط"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: toTelHref(settings.phone),
							className: "flex items-center gap-2 text-paper/90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								dir: "ltr",
								children: formatPhoneDisplay(settings.phone)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: instagramUrl(settings.instagram),
							target: "_blank",
							rel: "noreferrer",
							className: "mt-2 flex items-center gap-2 text-paper/90",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-4" }),
								"@",
								settings.instagram.replace(/^@/, "")
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-paper/70",
							children: settings.footerNote
						})
					]
				})
			]
		})
	});
}
var TABS = [
	{
		to: "/",
		label: "خانه",
		icon: House
	},
	{
		to: "/menu",
		label: "منو",
		icon: UtensilsCrossed
	},
	{
		to: "/cart",
		label: "سبد خرید",
		icon: ShoppingBag
	},
	{
		to: "/contact",
		label: "تماس",
		icon: Phone
	}
];
function MobileTabbar() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const count = cartCount(useCart((s) => s.items));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid grid-cols-4",
			children: TABS.map((tab) => {
				const active = tab.to === "/" ? pathname === "/" : pathname.startsWith(tab.to);
				const Icon = tab.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: tab.to,
					className: cn("relative flex h-14 flex-col items-center justify-center gap-0.5 text-[11px]", active ? "text-orange" : "text-muted"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }), tab.to === "/cart" && count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute -top-1.5 -left-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-red px-1 text-[9px] font-semibold text-paper tabular-nums",
							children: toFaDigits(count > 9 ? "9+" : count)
						}) : null]
					}), tab.label]
				}) }, tab.to);
			})
		})
	});
}
var Dialog = Dialog$1;
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-ink/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-paper p-5 shadow-card", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-3 left-3 flex size-11 items-center justify-center rounded-md text-muted hover:bg-cream",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "بستن"
			})]
		})]
	})] });
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("text-lg font-semibold text-ink", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("mt-2 text-sm leading-6 text-muted", className),
		...props
	});
}
function OrderClosedModal({ settings }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!settings.orderClosed) {
			setOpen(false);
			return;
		}
		const key = `nazli-closed-${settings.orderReopenDate}`;
		if (sessionStorage.getItem(key) === "1") return;
		setOpen(true);
	}, [settings.orderClosed, settings.orderReopenDate]);
	function dismiss() {
		sessionStorage.setItem(`nazli-closed-${settings.orderReopenDate}`, "1");
		setOpen(false);
	}
	const dateText = settings.orderReopenDate ? formatJalaliFromIso(settings.orderReopenDate) : "به‌زودی";
	const message = (settings.orderClosedMessage || "").replace("{date}", dateText);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => v ? setOpen(true) : dismiss(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-3 flex size-12 items-center justify-center rounded-md bg-orange-soft text-orange",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg font-semibold",
						children: "!"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: settings.orderClosedTitle || "ثبت سفارش موقتاً بسته است" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: message }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "می‌توانید منو را ببینید؛ ثبت سفارش فعلاً غیرفعال است."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4 w-full",
					onClick: dismiss,
					children: "متوجه شدم"
				})
			]
		})
	});
}
function Skeleton({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("animate-pulse rounded-md bg-line/80", className) });
}
var getStoreData = createServerFn({ method: "GET" }).handler(createSsrRpc("df25a0367ce3e8e24faac32151716fe4370d8fd573f4ce809cdfe1f1c90fc466"));
createServerFn({ method: "GET" }).validator((d) => object({ id: number() }).parse(d)).handler(createSsrRpc("9ea9490447df60ca0f0917ba984180b8d0227003bd72ca28993f333bda1d1f06"));
var emptyStore = {
	settings: DEFAULT_SETTINGS,
	categories: [],
	products: [],
	sections: []
};
function useStoreData() {
	return useQuery({
		queryKey: ["store"],
		queryFn: () => getStoreData()
	});
}
function publicCategories(store) {
	return store.categories.filter((c) => c.visible);
}
function publicProducts(store, categoryId) {
	const hiddenCats = new Set(store.categories.filter((c) => !c.visible).map((c) => c.id));
	return store.products.filter((p) => {
		if (!p.visible) return false;
		if (p.categoryId && hiddenCats.has(p.categoryId)) return false;
		if (categoryId && p.categoryId !== categoryId) return false;
		return true;
	});
}
function SiteShell({ children }) {
	const { data, isPending } = useStoreData();
	const settings = (data ?? emptyStore).settings ?? DEFAULT_SETTINGS;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-linen min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { settings }),
			settings.orderClosed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-accent-red px-4 py-2 text-center text-sm text-paper",
				children: settings.orderClosedTitle
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto min-h-[60vh] max-w-6xl px-4 pb-24 pt-4 md:pb-10",
				children: isPending && !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 w-full rounded-lg" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-40" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-48 rounded-lg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-48 rounded-lg" })]
						})
					]
				}) : children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, { settings }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileTabbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderClosedModal, { settings })
		]
	});
}
//#endregion
export { publicCategories as a, useStoreData as c, emptyStore as i, cartCount as n, publicProducts as o, cartTotal as r, useCart as s, SiteShell as t };
