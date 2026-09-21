import type { CartItem, SiteSettings } from "@/lib/types";
import { cartTotal } from "@/lib/cart-store";
import {
  formatJalaliDateTime,
  formatPhoneDisplay,
  formatToman,
  toFaDigits,
} from "@/lib/persian";

export async function downloadCartPdf(items: CartItem[], settings: SiteSettings) {
  if (items.length === 0) return;
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);

  const host = document.createElement("div");
  host.style.cssText = "position:fixed;left:-10000px;top:0;width:720px;background:#fffaf2;color:#2a2218;font-family:Vazirmatn,Tahoma,sans-serif;direction:rtl;text-align:right;";
  host.setAttribute("dir", "rtl");
  const total = cartTotal(items);
  const rows = items
    .map(
      (item, i) => `
      <tr>
        <td>${toFaDigits(i + 1)}</td>
        <td>${escapeHtml(item.name)}</td>
        <td>${toFaDigits(item.quantity)}</td>
        <td>${formatToman(item.price)}</td>
        <td>${formatToman(item.price * item.quantity)}</td>
      </tr>`,
    )
    .join("");

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
      useCORS: true,
    });
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const img = canvas.toDataURL("image/jpeg", 0.92);
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

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (ch) => {
    if (ch === "&") return "\u0026amp;";
    if (ch === "<") return "\u0026lt;";
    if (ch === ">") return "\u0026gt;";
    if (ch === '"') return "\u0026quot;";
    return "\u0026#39;";
  });
}

