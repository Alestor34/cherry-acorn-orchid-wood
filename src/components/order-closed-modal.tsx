import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatJalaliFromIso } from "@/lib/persian";
import type { SiteSettings } from "@/lib/types";

export function OrderClosedModal({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!settings.orderClosed) {
      setOpen(false);
      return;
    }
    const key = `nazli-closed-${settings.orderReopenDate}`;
    if (sessionStorage.getItem(key) === "1") return;
    setOpen(true);
  }, [settings.orderClosed, settings.orderReopenDate]);

  function dismiss() {
    sessionStorage.setItem(`nazli-closed-${settings.orderReopenDate}`, "1");
    setOpen(false);
  }

  const dateText = settings.orderReopenDate ? formatJalaliFromIso(settings.orderReopenDate) : "به‌زودی";
  const message = (settings.orderClosedMessage || "").replace("{date}", dateText);

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : dismiss())}>
      <DialogContent className="text-center">
        <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-md bg-orange-soft text-orange">
          <span className="text-lg font-semibold">!</span>
        </div>
        <DialogTitle>{settings.orderClosedTitle || "ثبت سفارش موقتاً بسته است"}</DialogTitle>
        <DialogDescription>{message}</DialogDescription>
        <p className="mt-2 text-sm text-muted">می‌توانید منو را ببینید؛ ثبت سفارش فعلاً غیرفعال است.</p>
        <Button className="mt-4 w-full" onClick={dismiss}>
          متوجه شدم
        </Button>
      </DialogContent>
    </Dialog>
  );
}
