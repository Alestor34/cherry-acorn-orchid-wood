import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Phone } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { formatPhoneDisplay, instagramUrl, toTelHref, toWhatsAppHref } from "@/lib/persian";
import { emptyStore, useStoreData } from "@/lib/store-query";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  const { data } = useStoreData();
  const settings = (data ?? emptyStore).settings;

  return (
    <SiteShell>
      <p className="text-xs font-medium tracking-wide text-green">تماس</p>
      <h1 className="mt-1 text-2xl font-semibold">ثبت سفارش و هماهنگی</h1>
      <p className="mt-2 text-sm leading-7 text-muted">
        سبد خرید را آماده کنید، فهرست را به صورت PDF بگیرید و برای نهایی‌کردن سفارش تماس بگیرید یا در اینستاگرام پیام بدهید.
      </p>
      <a
        href={toTelHref(settings.phone)}
        className="mt-6 flex min-h-16 items-center justify-center gap-3 rounded-lg bg-green text-xl font-semibold text-paper"
      >
        <Phone className="size-6" />
        <span className="tabular-nums" dir="ltr">
          {formatPhoneDisplay(settings.phone)}
        </span>
      </a>
      <div className="mt-3 grid gap-2">
        <Button asChild size="lg" variant="outline" className="w-full">
          <a href={toWhatsAppHref(settings.phone, "سلام، برای سفارش فینگر فود پیام می‌دهم.")}>ارسال پیام در واتساپ</a>
        </Button>
        <Button asChild size="lg" variant="secondary" className="w-full">
          <a href={instagramUrl(settings.instagram)} target="_blank" rel="noreferrer">
            <Instagram className="size-4" />
            اینستاگرام @{settings.instagram.replace(/^@/, "")}
          </a>
        </Button>
      </div>
      <p className="mt-6 text-sm text-muted">{settings.footerNote}</p>
    </SiteShell>
  );
}
