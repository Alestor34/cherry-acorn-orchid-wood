import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { toast } from "sonner";
import { FoodImage } from "@/components/food-image";
import { QuantityStepper } from "@/components/quantity-stepper";
import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-store";
import { formatToman } from "@/lib/persian";
import { emptyStore, publicProducts, useStoreData } from "@/lib/store-query";
import { effectivePrice } from "@/lib/types";

export const Route = createFileRoute("/product/$id")({ component: ProductPage });

function ProductPage() {
  const { id } = Route.useParams();
  const { data } = useStoreData();
  const store = data ?? emptyStore;
  const product = publicProducts(store).find((p) => String(p.id) === id);
  const [qty, setQty] = useState(1);
  const [photo, setPhoto] = useState(0);
  const add = useCart((s) => s.add);
  const orderingOpen = !store.settings.orderClosed;

  if (data && !product) throw notFound();
  if (!product) {
    return (
      <SiteShell>
        <div className="h-64 animate-pulse rounded-lg bg-line" />
      </SiteShell>
    );
  }

  const item = product;
  const gallery = [item.imageUrl, ...item.extraImages].filter(Boolean);
  const price = effectivePrice(item);
  const category = store.categories.find((c) => c.id === item.categoryId);
  const related = publicProducts(store, item.categoryId)
    .filter((p) => p.id !== item.id)
    .slice(0, 4);

  function addItem() {
    if (!item.available || !orderingOpen) return;
    add(item, qty);
    toast.success(`${item.name} به سبد اضافه شد`);
  }

  return (
    <SiteShell>
      <nav className="mb-3 text-sm text-muted">
        <Link to="/menu">منو</Link>
        {category ? (
          <>
            <span className="mx-1">/</span>
            <Link to="/menu" search={{ category: category.slug }}>
              {category.name}
            </Link>
          </>
        ) : null}
      </nav>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <FoodImage src={gallery[photo] || product.imageUrl} alt={product.name} className="aspect-[4/3] rounded-lg" priority />
          {gallery.length > 1 ? (
            <div className="mt-2 flex gap-2">
              {gallery.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setPhoto(i)}
                  className={`size-16 overflow-hidden rounded-sm ${i === photo ? "ring-2 ring-orange" : ""}`}
                >
                  <img src={src} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            {product.featured ? <Badge>پیشنهادی</Badge> : null}
            {!product.available ? <Badge tone="muted">ناموجود</Badge> : null}
            {price < product.price ? <Badge tone="red">قیمت ویژه</Badge> : null}
          </div>
          <h1 className="mt-2 text-2xl font-semibold">{product.name}</h1>
          <p className="mt-3 text-sm leading-7 text-muted">{product.description}</p>
          {product.orderingNotes ? (
            <p className="mt-3 rounded-md bg-green-soft/60 px-3 py-2 text-sm text-green-dark">{product.orderingNotes}</p>
          ) : null}
          {product.tags ? (
            <p className="mt-3 text-xs text-muted">{product.tags.split("،").join(" · ")}</p>
          ) : null}
          <div className="mt-5">
            {price < product.price ? (
              <p className="text-sm text-muted line-through">{formatToman(product.price)}</p>
            ) : null}
            <p className="text-2xl font-semibold tabular-nums text-orange-dark">{formatToman(price)}</p>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <QuantityStepper value={qty} onChange={setQty} />
            <Button className="flex-1" size="lg" disabled={!product.available || !orderingOpen} onClick={addItem}>
              افزودن به سبد
            </Button>
          </div>
          {!orderingOpen ? <p className="mt-3 text-sm text-accent-red">ثبت سفارش فعلاً بسته است.</p> : null}
        </div>
      </div>
      {related.length > 0 ? (
        <section className="mt-10">
          <h2 className="mb-3 text-lg font-semibold">در همین دسته</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {related.map((p) => (
              <Link key={p.id} to="/product/$id" params={{ id: String(p.id) }} className="flex gap-3 rounded-lg bg-paper p-2 shadow-card">
                <FoodImage src={p.imageUrl} alt={p.name} className="size-20 shrink-0 rounded-sm" />
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm tabular-nums text-orange-dark">{formatToman(effectivePrice(p))}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </SiteShell>
  );
}
