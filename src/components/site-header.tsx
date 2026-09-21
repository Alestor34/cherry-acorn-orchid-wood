import { Link, useRouterState } from "@tanstack/react-router";
import { Instagram, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPhoneDisplay, instagramUrl, toTelHref } from "@/lib/persian";
import type { SiteSettings } from "@/lib/types";
import { CartBadge } from "@/components/cart-badge";

const NAV = [
  { to: "/", label: "خانه" },
  { to: "/menu", label: "منو" },
  { to: "/about", label: "درباره" },
  { to: "/contact", label: "تماس" },
];

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 md:h-16">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <img src="/logo.svg" alt="" className="size-9 rounded-[10px] outline-none" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight text-ink">{settings.siteName}</p>
            <p className="hidden truncate text-[11px] text-muted sm:block">Finger Food</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors duration-150",
                  active ? "bg-orange-soft text-orange-dark" : "text-muted hover:bg-paper hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-1">
          <a
            href={toTelHref(settings.phone)}
            className="hidden h-11 items-center gap-2 rounded-md px-2 text-sm text-green md:flex"
            aria-label={`تماس ${formatPhoneDisplay(settings.phone)}`}
          >
            <Phone className="size-4" />
            <span className="tabular-nums" dir="ltr">
              {formatPhoneDisplay(settings.phone)}
            </span>
          </a>
          <a
            href={instagramUrl(settings.instagram)}
            target="_blank"
            rel="noreferrer"
            className="flex size-11 items-center justify-center rounded-md text-ink hover:bg-paper"
            aria-label="اینستاگرام"
          >
            <Instagram className="size-5" />
          </a>
          <CartBadge />
        </div>
      </div>
    </header>
  );
}
