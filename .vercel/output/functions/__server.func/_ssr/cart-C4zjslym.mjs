import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as FileDown, c as Phone, i as Trash2 } from "../_libs/lucide-react.mjs";
import { i as Button } from "./router-2mY8pX3E.mjs";
import { c as toTelHref, i as formatToman, l as toWhatsAppHref, r as formatPhoneDisplay, s as toFaDigits, t as formatJalaliDateTime } from "./persian-CmQp06wC.mjs";
import { c as useStoreData, i as emptyStore, n as cartCount, r as cartTotal, s as useCart, t as SiteShell } from "./site-shell-DIOMKKJ1.mjs";
import { t as QuantityStepper } from "./quantity-stepper-48kO-_N7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-C4zjslym.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function downloadCartPdf(items, settings) {
	if (items.length === 0) return;
	const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("../_libs/html2canvas.mjs").then((n) => (n.n(), n.t)), import("../_libs/jspdf.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()))]);
	const host = document.createElement("div");
	host.style.cssText = "position:fixed;left:-10000px;top:0;width:720px;background:#fffaf2;color:#2a2218;font-family:Vazirmatn,Tahoma,sans-serif;direction:rtl;text-align:right;";
	host.setAttribute("dir", "rtl");
	const total = cartTotal(items);
	const rows = items.map((item, i) => `
      <tr>
        <td>${toFaDigits(i + 1)}</td>
        <td>${escapeHtml(item.name)}</td>
        <td>${toFaDigits(item.quantity)}</td>
        <td>${formatToman(item.price)}</td>
        <td>${formatToman(item.price * item.quantity)}</td>
      </tr>`).join("");
	host.innerHTML = `
    <div style="padding:28px 32px 36px;box-sizing:border-box;">
      <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #c45c26;padding-bottom:16px;margin-bottom:18px;">
        <div>
          <div style="font-size:22px;font-weight:700;">${escapeHtml(settings.siteName)}</div>
          <div style="font-size:12px;color:#6b5e4f;margin-top:4px;">لیست سبد خرید / پیش‌فاکتور سفارش</div>
        </div>
        <div style="text-align:left;font-size:12px;color:#6b5e4f;">
          <div>تاریخ: ${formatJalaliDateTime()}</div>
        </div>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr style="background:#f3eadc;">
            <th style="padding:8px;border:1px solid #e4d5c3;width:40px;">ردیف</th>
            <th style="padding:8px;border:1px solid #e4d5c3;">نام محصول</th>
            <th style="padding:8px;border:1px solid #e4d5c3;width:70px;">تعداد</th>
            <th style="padding:8px;border:1px solid #e4d5c3;width:120px;">قیمت واحد</th>
            <th style="padding:8px;border:1px solid #e4d5c3;width:130px;">جمع</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div style="margin-top:18px;display:flex;justify-content:space-between;align-items:flex-end;">
        <div style="font-size:12px;color:#6b5e4f;line-height:1.8;">
          <div>تلفن: ${formatPhoneDisplay(settings.phone)}</div>
          <div>اینستاگرام: @${escapeHtml(settings.instagram.replace(/^@/, ""))}</div>
          <div>${escapeHtml(settings.footerNote)}</div>
        </div>
        <div style="background:#c45c26;color:#fffaf2;padding:10px 16px;font-weight:700;font-size:15px;">
          جمع کل: ${formatToman(total)}
        </div>
      </div>
      <p style="margin-top:22px;font-size:11px;color:#6b5e4f;">این برگه رسید پرداخت نیست؛ فهرست سفارش برای هماهنگی تلفنی است.</p>
    </div>
  `;
	document.body.appendChild(host);
	try {
		const canvas = await html2canvas(host, {
			scale: 2,
			backgroundColor: "#fffaf2",
			useCORS: true
		});
		const pdf = new jsPDF({
			orientation: "portrait",
			unit: "mm",
			format: "a4"
		});
		const pageWidth = pdf.internal.pageSize.getWidth();
		const pageHeight = pdf.internal.pageSize.getHeight();
		const imgWidth = pageWidth;
		const imgHeight = canvas.height * imgWidth / canvas.width;
		const img = canvas.toDataURL("image/jpeg", .92);
		let heightLeft = imgHeight;
		let position = 0;
		pdf.addImage(img, "JPEG", 0, position, imgWidth, imgHeight);
		heightLeft -= pageHeight;
		while (heightLeft > 0) {
			position = heightLeft - imgHeight;
			pdf.addPage();
			pdf.addImage(img, "JPEG", 0, position, imgWidth, imgHeight);
			heightLeft -= pageHeight;
		}
		pdf.save("nazli-cart.pdf");
	} finally {
		host.remove();
	}
}
function escapeHtml(value) {
	return value.replace(/[&<>"']/g, (ch) => {
		if (ch === "&") return "&amp;";
		if (ch === "<") return "&lt;";
		if (ch === ">") return "&gt;";
		if (ch === "\"") return "&quot;";
		return "&#39;";
	});
}
function CartPage() {
	const items = useCart((s) => s.items);
	const setQty = useCart((s) => s.setQty);
	const remove = useCart((s) => s.remove);
	const clear = useCart((s) => s.clear);
	const { data } = useStoreData();
	const settings = (data ?? emptyStore).settings;
	const [busy, setBusy] = (0, import_react.useState)(false);
	const total = cartTotal(items);
	const count = cartCount(items);
	const orderingOpen = !settings.orderClosed;
	const orderText = items.map((i) => `${i.name} × ${i.quantity}`).concat([`جمع کل: ${total}`]).join("\n");
	async function pdf() {
		setBusy(true);
		try {
			await downloadCartPdf(items, settings);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium tracking-wide text-green",
			children: "سبد خرید"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-semibold",
			children: "سفارش شما"
		})] }), items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "text-sm text-accent-red",
			onClick: clear,
			children: "خالی کردن سبد"
		}) : null]
	}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8 rounded-lg bg-paper px-4 py-12 text-center shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg font-medium",
				children: "سبد خرید خالی است"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "از منو آیتم اضافه کنید و بعد فهرست را به صورت PDF بگیرید."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/menu",
					children: "مشاهده منو"
				})
			})
		]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 space-y-3",
		children: [items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "flex gap-3 rounded-lg bg-paper p-3 shadow-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: item.imageUrl,
				alt: "",
				className: "size-20 shrink-0 rounded-sm object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-medium leading-snug",
							children: item.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex size-11 items-center justify-center text-muted",
							onClick: () => remove(item.productId),
							"aria-label": "حذف",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm tabular-nums text-muted",
						children: ["واحد: ", formatToman(item.price)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuantityStepper, {
							value: item.quantity,
							min: 0,
							onChange: (n) => setQty(item.productId, n)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold tabular-nums text-orange-dark",
							children: formatToman(item.price * item.quantity)
						})]
					})
				]
			})]
		}, item.productId)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky bottom-16 z-20 rounded-lg bg-paper p-4 shadow-card md:bottom-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-sm text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تعداد اقلام" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: count
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: "جمع کل"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg font-semibold tabular-nums text-orange-dark",
						children: formatToman(total)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "mt-4 w-full",
					size: "lg",
					onClick: pdf,
					disabled: busy,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, { className: "size-4" }), "دریافت لیست سبد خرید به صورت PDF"]
				}),
				orderingOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: toTelHref(settings.phone),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), "تماس"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: toWhatsAppHref(settings.phone, `سلام، سفارش فینگر فود:\n${orderText}`),
							children: "واتساپ"
						})
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-center text-sm text-accent-red",
					children: settings.orderClosedTitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					className: "mt-1 w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/menu",
						children: "ادامه خرید"
					})
				})
			]
		})]
	})] });
}
//#endregion
export { CartPage as component };
