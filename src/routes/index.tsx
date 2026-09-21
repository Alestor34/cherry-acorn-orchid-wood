import { createFileRoute } from "@tanstack/react-router";
import { HomeView } from "@/components/home-view";
import { SiteShell } from "@/components/site-shell";
import { emptyStore, useStoreData } from "@/lib/store-query";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { data } = useStoreData();
  const store = data ?? emptyStore;
  return (
    <SiteShell>
      <HomeView store={store} />
    </SiteShell>
  );
}
