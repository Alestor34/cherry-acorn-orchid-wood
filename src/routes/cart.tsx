import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FileDown, Phone, Trash2 } from "lucide-react";
import { QuantityStepper } from "@/components/quantity-stepper";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { cartCount, cartTotal, useCart } from "@/lib/cart-store";
import { downloadCartPdf } from "@/lib/pdf-cart";
import { formatToman, toTelHref, toWhatsAppHref } from "@/lib/persian";
import { emptyStore, useStoreData } from "@/lib/store-query";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const { data } = useStoreData();
  const settings = (data ?? emptyStore).settings;
  const [busy, setBusy] = useState(false);
  const total = cartTotal(items);
  const count = cartCount(items);
  const orderingOpen = !settings.orderClosed;

  const orderText = items
    .map((i) => `${i.name} × ${i.quantity}`)
    .concat([`جمع کل: ${total}`])
    .join("\n");

  async function pdf() {
    setBusy(true);
    try {
      await downloadCartPdf(items, settings);
    } finally {
      setBusy(false);
    }
  }

  return (
    <SiteShell>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-wide text-green">سبد خرید</p>
          <h1 className="text-2xl font-semibold">سفارش شما</h1>
        </div>
        {items.length > 0 ? (
          <button type="button" className="text-sm text-accent-red" onClick={clear}>
            خالی کردن سبد
          </button>
        ) : null}
      </div>

      {items.length === 0 ? (
        <div className="mt-8 rounded-lg bg-paper px-4 py-12 text-center shadow-card">
          <p className="text-lg font-medium">سبد خرید خالی است</p>
          <p className="mt-2 text-sm text-muted">از منو آیتم اضافه کنید و بعد فهرست را به صورت PDF بگیرید.</p>
          <Button asChild className="mt-5">
            <Link to="/menu">مشاهده منو</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <article key={item.productId} className="flex gap-3 rounded-lg bg-paper p-3 shadow-card">
              <img src={item.imageUrl} alt="" className="size-20 shrink-0 rounded-sm object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-medium leading-snug">{item.name}</h2>
                  <button type="button" className="flex size-11 items-center justify-center text-muted" onClick={() => remove(item.productId)} aria-label="حذف">
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <p className="text-sm tabular-nums text-muted">واحد: {formatToman(item.price)}</p>
                <div className="mt-2 flex items-center justify-between">
                  <QuantityStepper value={item.quantity} min={0} onChange={(n) => setQty(item.productId, n)} />
                  <p className="text-sm font-semibold tabular-nums text-orange-dark">{formatToman(item.price * item.quantity)}</p>
                </div>
              </div>
            </article>
          ))}

          <div className="sticky bottom-16 z-20 rounded-lg bg-paper p-4 shadow-card md:bottom-4">
            <div className="flex items-center justify-between text-sm text-muted">
              <span>تعداد اقلام</span>
              <span className="tabular-nums">{count}</span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="font-medium">جمع کل</span>
              <span className="text-lg font-semibold tabular-nums text-orange-dark">{formatToman(total)}</span>
            </div>
            <Button className="mt-4 w-full" size="lg" onClick={pdf} disabled={busy}>
              <FileDown className="size-4" />
              دریافت لیست سبد خرید به صورت PDF
            </Button>
            {orderingOpen ? (
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button asChild variant="secondary">
                  <a href={toTelHref(settings.phone)}>
                    <Phone className="size-4" />
                    تماس
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={toWhatsAppHref(settings.phone, `سلام، سفارش فینگر فود:\n${orderText}`)}>واتساپ</a>
                </Button>
              </div>
            ) : (
              <p className="mt-3 text-center text-sm text-accent-red">{settings.orderClosedTitle}</p>
            )}
            <Button asChild variant="ghost" className="mt-1 w-full">
              <Link to="/menu">ادامه خرید</Link>
            </Button>
          </div>
        </div>
      )}
    </SiteShell>
  );
}
