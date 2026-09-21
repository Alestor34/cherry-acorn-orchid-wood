import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Phone, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { cartCount, useCart } from "@/lib/cart-store";
import { toFaDigits } from "@/lib/persian";
import { cn } from "@/lib/utils";

const TABS = [
  { to: "/", label: "خانه", icon: Home },
  { to: "/menu", label: "منو", icon: UtensilsCrossed },
  { to: "/cart", label: "سبد خرید", icon: ShoppingBag },
  { to: "/contact", label: "تماس", icon: Phone },
] as const;

export function MobileTabbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const count = cartCount(useCart((s) => s.items));

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
      <ul className="grid grid-cols-4">
        {TABS.map((tab) => {
          const active = tab.to === "/" ? pathname === "/" : pathname.startsWith(tab.to);
          const Icon = tab.icon;
          return (
            <li key={tab.to}>
              <Link
                to={tab.to}
                className={cn(
                  "relative flex h-14 flex-col items-center justify-center gap-0.5 text-[11px]",
                  active ? "text-orange" : "text-muted",
                )}
              >
                <span className="relative">
                  <Icon className="size-5" />
                  {tab.to === "/cart" && count > 0 ? (
                    <span className="absolute -top-1.5 -left-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-red px-1 text-[9px] font-semibold text-paper tabular-nums">
                      {toFaDigits(count > 9 ? "9+" : count)}
                    </span>
                  ) : null}
                </span>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
