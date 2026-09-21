import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { ProductCard } from "@/components/product-card";
import { SiteShell } from "@/components/site-shell";
import { cn } from "@/lib/utils";
import { emptyStore, publicCategories, publicProducts, useStoreData } from "@/lib/store-query";

const searchSchema = z.object({
  category: z.string().optional(),
});

export const Route = createFileRoute("/menu")({
  validateSearch: (search) => searchSchema.parse(search),
  component: MenuPage,
});

function MenuPage() {
  const { category } = Route.useSearch();
  const { data } = useStoreData();
  const store = data ?? emptyStore;
  const cats = publicCategories(store);
  const active = cats.find((c) => c.slug === category);
  const products = publicProducts(store, active?.id);
  const orderingOpen = !store.settings.orderClosed;

  return (
    <SiteShell>
      <header className="mb-4">
        <p className="text-xs font-medium tracking-wide text-green">منو</p>
        <h1 className="text-2xl font-semibold">{active ? active.name : "همه محصولات"}</h1>
        <p className="mt-1 text-sm leading-7 text-muted">
          {active?.description || "فینگر فود گرم، سوخاری، مزه و پک مهمانی. تعداد را انتخاب کنید و به سبد اضافه کنید."}
        </p>
      </header>
      <div className="no-scrollbar -mx-4 mb-5 flex gap-2 overflow-x-auto px-4">
        <Link
          to="/menu"
          className={cn(
            "shrink-0 rounded-full px-4 py-2 text-sm",
            !category ? "bg-orange text-paper" : "bg-paper text-ink shadow-card",
          )}
        >
          همه
        </Link>
        {cats.map((c) => (
          <Link
            key={c.id}
            to="/menu"
            search={{ category: c.slug }}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm",
              c.slug === category ? "bg-orange text-paper" : "bg-paper text-ink shadow-card",
            )}
          >
            {c.name}
          </Link>
        ))}
      </div>
      {products.length === 0 ? (
        <p className="rounded-lg bg-paper p-8 text-center text-sm text-muted shadow-card">محصولی در این دسته نیست.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} orderingOpen={orderingOpen} />
          ))}
        </div>
      )}
    </SiteShell>
  );
}
