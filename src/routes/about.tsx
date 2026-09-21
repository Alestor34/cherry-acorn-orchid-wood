import { createFileRoute, Link } from "@tanstack/react-router";
import { FoodImage } from "@/components/food-image";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { emptyStore, useStoreData } from "@/lib/store-query";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  const { data } = useStoreData();
  const store = data ?? emptyStore;
  const about = store.sections.find((s) => s.key === "about");

  return (
    <SiteShell>
      <p className="text-xs font-medium tracking-wide text-green">درباره</p>
      <h1 className="mt-1 text-2xl font-semibold">{store.settings.siteName}</h1>
      <FoodImage
        src={about?.imageUrl || "/images/about.jpg"}
        alt=""
        className="mt-4 aspect-[16/9] rounded-lg"
        priority
      />
      <div className="mt-5 space-y-4 text-sm leading-7 text-muted md:text-base">
        {store.settings.aboutText.split("\n").map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p>
          سفارش‌ها معمولاً از یک روز قبل هماهنگ می‌شوند تا سینی‌ها تازه، مرتب و به‌موقع آماده باشند. تعداد مهمان، تم رنگ و زمان تحویل را با ما در میان بگذارید.
        </p>
      </div>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Button asChild>
          <Link to="/menu">دیدن منو</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/contact">هماهنگی سفارش</Link>
        </Button>
      </div>
    </SiteShell>
  );
}
