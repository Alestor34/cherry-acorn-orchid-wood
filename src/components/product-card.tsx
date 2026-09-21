import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";
import { FoodImage } from "@/components/food-image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-store";
import { formatToman } from "@/lib/persian";
import { effectivePrice, type Product } from "@/lib/types";

export function ProductCard({
  product,
  orderingOpen,
}: {
  product: Product;
  orderingOpen: boolean;
}) {
  const add = useCart((s) => s.add);
  const price = effectivePrice(product);
  const onSale = price < product.price;

  function addItem() {
    if (!product.available || !orderingOpen) return;
    add(product, 1);
    toast.success(`${product.name} به سبد اضافه شد`);
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-lg bg-paper shadow-card">
      <Link to="/product/$id" params={{ id: String(product.id) }} className="relative block">
        <FoodImage src={product.imageUrl} alt={product.name} className="aspect-[4/3]" />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {product.featured ? <Badge tone="orange">پیشنهادی</Badge> : null}
          {!product.available ? <Badge tone="muted">ناموجود</Badge> : null}
          {onSale ? <Badge tone="red">قیمت ویژه</Badge> : null}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <Link to="/product/$id" params={{ id: String(product.id) }} className="text-base font-semibold leading-snug text-ink">
          {product.name}
        </Link>
        <p className="line-clamp-2 text-sm leading-6 text-muted">{product.description}</p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div>
            {onSale ? (
              <p className="text-xs text-muted line-through">{formatToman(product.price)}</p>
            ) : null}
            <p className="text-sm font-semibold tabular-nums text-orange-dark">{formatToman(price)}</p>
          </div>
          <Button
            size="sm"
            className="px-3"
            disabled={!product.available || !orderingOpen}
            onClick={addItem}
            aria-label={`افزودن ${product.name} به سبد`}
          >
            <ShoppingBag className="size-4" />
            افزودن
          </Button>
        </div>
      </div>
    </article>
  );
}
