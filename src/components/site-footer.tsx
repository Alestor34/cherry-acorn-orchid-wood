import { Link } from "@tanstack/react-router";
import { Instagram, Phone } from "lucide-react";
import { formatPhoneDisplay, instagramUrl, toTelHref } from "@/lib/persian";
import type { SiteSettings } from "@/lib/types";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="mt-8 border-t border-line bg-green-dark text-paper">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="" className="size-9 rounded-[10px] outline-none" />
            <p className="font-semibold">{settings.siteName}</p>
          </div>
          <p className="mt-3 text-sm leading-7 text-paper/80">{settings.tagline}</p>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-medium">دسترسی</p>
          <div className="flex flex-col gap-2 text-paper/80">
            <Link to="/menu">منو و محصولات</Link>
            <Link to="/about">درباره نازلی</Link>
            <Link to="/cart">سبد خرید</Link>
            <Link to="/contact">تماس</Link>
          </div>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-medium">ارتباط</p>
          <a href={toTelHref(settings.phone)} className="flex items-center gap-2 text-paper/90">
            <Phone className="size-4" />
            <span className="tabular-nums" dir="ltr">
              {formatPhoneDisplay(settings.phone)}
            </span>
          </a>
          <a
            href={instagramUrl(settings.instagram)}
            target="_blank"
            rel="noreferrer"
            className="mt-2 flex items-center gap-2 text-paper/90"
          >
            <Instagram className="size-4" />
            @{settings.instagram.replace(/^@/, "")}
          </a>
          <p className="mt-3 text-paper/70">{settings.footerNote}</p>
        </div>
      </div>
    </footer>
  );
}
