import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { cartCount, useCart } from "@/lib/cart-store";
import { toFaDigits } from "@/lib/persian";
import { cn } from "@/lib/utils";

export function CartBadge({ className }: { className?: string }) {
  const items = useCart((s) => s.items);
  const bump = useCart((s) => s.bump);
  const count = cartCount(items);
  const [anim, setAnim] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setAnim(true);
    const t = window.setTimeout(() => setAnim(false), 400);
    return () => window.clearTimeout(t);
  }, [bump]);

  return (
    <Link
      to="/cart"
      className={cn("relative flex size-11 items-center justify-center rounded-md text-ink hover:bg-paper", className)}
      aria-label="سبد خرید"
    >
      <ShoppingBag className={cn("size-5", anim && "cart-bump")} />
      {count > 0 ? (
        <span className="absolute top-1.5 left-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-red px-1 text-[10px] font-semibold text-paper tabular-nums">
          {toFaDigits(count > 9 ? "9+" : count)}
        </span>
      ) : null}
    </Link>
  );
}
