import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as ArrowLeft, c as Phone, h as Instagram } from "../_libs/lucide-react.mjs";
import { i as Button } from "./router-2mY8pX3E.mjs";
import { t as FoodImage } from "./food-image-BPdNpS4h.mjs";
import { a as instagramUrl, c as toTelHref, r as formatPhoneDisplay } from "./persian-CmQp06wC.mjs";
import { a as publicCategories, c as useStoreData, i as emptyStore, o as publicProducts, t as SiteShell } from "./site-shell-DIOMKKJ1.mjs";
import { t as ProductCard } from "./product-card-C0YvBimv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-ClOTpC7B.js
var import_jsx_runtime = require_jsx_runtime();
function HomeView({ store }) {
	const sections = store.sections.filter((s) => s.enabled).sort((a, b) => a.sortOrder - b.sortOrder);
	const orderingOpen = !store.settings.orderClosed;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-10",
		children: sections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeSection, {
			section,
			store,
			orderingOpen
		}, section.key))
	});
}
function HomeSection({ section, store, orderingOpen }) {
	switch (section.key) {
		case "hero": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSection, { section });
		case "featured": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedSection, {
			section,
			store,
			orderingOpen
		});
		case "categories": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoriesSection, {
			section,
			store
		});
		case "about": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutSection, { section });
		case "promo": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromoSection, { section });
		case "contact": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactSection, {
			section,
			store
		});
		case "instagram": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstagramSection, {
			section,
			store
		});
		default: return null;
	}
}
function CmsButton({ href, children, variant }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		variant: variant ?? "default",
		className: "w-full sm:w-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href,
			children
		})
	});
}
function SectionHead({ title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-xl font-semibold text-ink md:text-2xl",
			children: title
		}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm leading-7 text-muted",
			children: description
		}) : null]
	});
}
function HeroSection({ section }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "-mx-4 md:mx-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodImage, {
				src: section.imageUrl,
				alt: "",
				className: "h-[58vh] min-h-[320px] max-h-[560px] w-full md:rounded-lg",
				priority: true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/55 to-transparent p-4 pb-6 md:rounded-b-lg md:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.18em] text-paper/80",
					children: "NAZLI FINGER FOOD"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 max-w-lg text-3xl font-semibold text-paper md:text-5xl",
					children: section.title
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-4 -mt-5 rounded-lg bg-paper p-4 shadow-card md:mx-auto md:max-w-xl md:p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-7 text-muted md:text-base",
				children: section.description
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-2 sm:flex-row",
				children: [section.buttonText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CmsButton, {
					href: section.buttonLink || "/menu",
					children: section.buttonText
				}) : null, section.extra.secondaryText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CmsButton, {
					href: section.extra.secondaryLink || "/contact",
					variant: "outline",
					children: section.extra.secondaryText
				}) : null]
			})]
		})]
	});
}
function FeaturedSection({ section, store, orderingOpen }) {
	const items = publicProducts(store).filter((p) => p.featured).slice(0, 8);
	if (items.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-end justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
			title: section.title,
			description: section.description
		}), section.buttonText ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/menu",
			className: "mb-4 hidden items-center gap-1 text-sm text-orange md:flex",
			children: [section.buttonText, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })]
		}) : null]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-4",
		children: items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-[78%] shrink-0 snap-start md:w-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
				product: p,
				orderingOpen
			})
		}, p.id))
	})] });
}
function CategoriesSection({ section, store }) {
	const cats = publicCategories(store);
	if (cats.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
		title: section.title,
		description: section.description
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-3 md:grid-cols-5",
		children: cats.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/menu",
			search: { category: cat.slug },
			className: "group overflow-hidden rounded-md bg-paper shadow-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodImage, {
				src: cat.imageUrl,
				alt: cat.name,
				className: "aspect-[5/4]"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-ink group-hover:text-orange",
					children: cat.name
				})
			})]
		}, cat.id))
	})] });
}
function AboutSection({ section }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "overflow-hidden rounded-lg bg-paper shadow-card md:grid md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodImage, {
			src: section.imageUrl,
			alt: "",
			className: "aspect-[4/3] md:aspect-auto md:min-h-full"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5 md:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-green",
					children: "از آشپزخانه نازلی"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 text-xl font-semibold md:text-2xl",
					children: section.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-7 text-muted md:text-base",
					children: section.description
				}),
				section.buttonText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CmsButton, {
					href: section.buttonLink || "/about",
					variant: "secondary",
					children: section.buttonText
				}) : null
			]
		})]
	});
}
function PromoSection({ section }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden rounded-lg bg-orange text-paper",
		children: [section.imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: section.imageUrl,
			alt: "",
			className: "absolute inset-0 size-full object-cover opacity-25 outline-none"
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative p-6 md:p-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-semibold",
					children: section.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-lg text-sm leading-7 text-paper/90",
					children: section.description
				}),
				section.buttonText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CmsButton, {
					href: section.buttonLink || "/menu",
					variant: "cream",
					children: section.buttonText
				}) : null
			]
		})]
	});
}
function ContactSection({ section, store }) {
	const phone = store.settings.phone;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-lg border border-line bg-paper p-5 text-center shadow-card md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold",
				children: section.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-2 max-w-lg text-sm leading-7 text-muted",
				children: section.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: toTelHref(phone),
				className: "mt-5 inline-flex min-h-12 items-center justify-center gap-2 text-2xl font-semibold tabular-nums text-green",
				dir: "ltr",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-6" }), formatPhoneDisplay(phone)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col justify-center gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: toTelHref(phone),
						children: "تماس برای سفارش"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cart",
						children: "مشاهده سبد خرید"
					})
				})]
			})
		]
	});
}
function InstagramSection({ section, store }) {
	const shots = publicProducts(store).filter((p) => p.imageUrl).slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
			title: section.title,
			description: section.description
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-3 gap-1.5 overflow-hidden rounded-lg",
			children: shots.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodImage, {
				src: p.imageUrl,
				alt: p.name,
				className: "aspect-square"
			}, p.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "secondary",
			className: "mt-4 w-full sm:w-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: instagramUrl(store.settings.instagram),
				target: "_blank",
				rel: "noreferrer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-4" }), section.buttonText || "اینستاگرام"]
			})
		})
	] });
}
function Home() {
	const { data } = useStoreData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeView, { store: data ?? emptyStore }) });
}
//#endregion
export { Home as component };
