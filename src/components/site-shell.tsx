import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileTabbar } from "@/components/mobile-tabbar";
import { OrderClosedModal } from "@/components/order-closed-modal";
import { Skeleton } from "@/components/ui/skeleton";
import { emptyStore, useStoreData } from "@/lib/store-query";
import { DEFAULT_SETTINGS } from "@/lib/types";

export function SiteShell({ children }: { children: ReactNode }) {
  const { data, isPending } = useStoreData();
  const store = data ?? emptyStore;
  const settings = store.settings ?? DEFAULT_SETTINGS;

  return (
    <div className="bg-linen min-h-dvh">
      <SiteHeader settings={settings} />
      {settings.orderClosed ? (
        <div className="bg-accent-red px-4 py-2 text-center text-sm text-paper">{settings.orderClosedTitle}</div>
      ) : null}
      <main className="mx-auto min-h-[60vh] max-w-6xl px-4 pb-24 pt-4 md:pb-10">
        {isPending && !data ? (
          <div className="space-y-4">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-8 w-40" />
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-48 rounded-lg" />
              <Skeleton className="h-48 rounded-lg" />
            </div>
          </div>
        ) : (
          children
        )}
      </main>
      <SiteFooter settings={settings} />
      <MobileTabbar />
      <OrderClosedModal settings={settings} />
    </div>
  );
}
