import { Link } from "@tanstack/react-router";
import { ArrowLeft, Instagram, Phone } from "lucide-react";
import { FoodImage } from "@/components/food-image";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { formatPhoneDisplay, instagramUrl, toTelHref } from "@/lib/persian";
import { publicCategories, publicProducts } from "@/lib/store-query";
import type { HomepageSection, StorePayload } from "@/lib/types";

export function HomeView({ store }: { store: StorePayload }) {
  const sections = store.sections.filter((s) => s.enabled).sort((a, b) => a.sortOrder - b.sortOrder);
  const orderingOpen = !store.settings.orderClosed;
  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <HomeSection key={section.key} section={section} store={store} orderingOpen={orderingOpen} />
      ))}
    </div>
  );
}

function HomeSection({
  section,
  store,
  orderingOpen,
}: {
  section: HomepageSection;
  store: StorePayload;
  orderingOpen: boolean;
}) {
  switch (section.key) {
    case "hero":
      return <HeroSection section={section} />;
    case "featured":
      return <FeaturedSection section={section} store={store} orderingOpen={orderingOpen} />;
    case "categories":
      return <CategoriesSection section={section} store={store} />;
    case "about":
      return <AboutSection section={section} />;
    case "promo":
      return <PromoSection section={section} />;
    case "contact":
      return <ContactSection section={section} store={store} />;
    case "instagram":
      return <InstagramSection section={section} store={store} />;
    default:
      return null;
  }
}

function CmsButton({ href, children, variant }: { href: string; children: string; variant?: "default" | "outline" | "secondary" | "cream" }) {
  return (
    <Button asChild variant={variant ?? "default"} className="w-full sm:w-auto">
      <a href={href}>{children}</a>
    </Button>
  );
}

function SectionHead({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold text-ink md:text-2xl">{title}</h2>
      {description ? <p className="mt-1 text-sm leading-7 text-muted">{description}</p> : null}
    </div>
  );
}

function HeroSection({ section }: { section: HomepageSection }) {
  return (
    <section className="-mx-4 md:mx-0">
      <div className="relative">
        <FoodImage src={section.imageUrl} alt="" className="h-[58vh] min-h-[320px] max-h-[560px] w-full md:rounded-lg" priority />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/55 to-transparent p-4 pb-6 md:rounded-b-lg md:p-8">
          <p className="text-xs tracking-[0.18em] text-paper/80">NAZLI FINGER FOOD</p>
          <h1 className="mt-1 max-w-lg text-3xl font-semibold text-paper md:text-5xl">{section.title}</h1>
        </div>
      </div>
      <div className="relative mx-4 -mt-5 rounded-lg bg-paper p-4 shadow-card md:mx-auto md:max-w-xl md:p-6">
        <p className="text-sm leading-7 text-muted md:text-base">{section.description}</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          {section.buttonText ? <CmsButton href={section.buttonLink || "/menu"}>{section.buttonText}</CmsButton> : null}
          {section.extra.secondaryText ? (
            <CmsButton href={section.extra.secondaryLink || "/contact"} variant="outline">
              {section.extra.secondaryText}
            </CmsButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function FeaturedSection({
  section,
  store,
  orderingOpen,
}: {
  section: HomepageSection;
  store: StorePayload;
  orderingOpen: boolean;
}) {
  const items = publicProducts(store).filter((p) => p.featured).slice(0, 8);
  if (items.length === 0) return null;
  return (
    <section>
      <div className="flex items-end justify-between gap-3">
        <SectionHead title={section.title} description={section.description} />
        {section.buttonText ? (
          <Link to="/menu" className="mb-4 hidden items-center gap-1 text-sm text-orange md:flex">
            {section.buttonText}
            <ArrowLeft className="size-4" />
          </Link>
        ) : null}
      </div>
      <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-4">
        {items.map((p) => (
          <div key={p.id} className="w-[78%] shrink-0 snap-start md:w-auto">
            <ProductCard product={p} orderingOpen={orderingOpen} />
          </div>
        ))}
      </div>
    </section>
  );
}

function CategoriesSection({ section, store }: { section: HomepageSection; store: StorePayload }) {
  const cats = publicCategories(store);
  if (cats.length === 0) return null;
  return (
    <section>
      <SectionHead title={section.title} description={section.description} />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {cats.map((cat) => (
          <Link
            key={cat.id}
            to="/menu"
            search={{ category: cat.slug }}
            className="group overflow-hidden rounded-md bg-paper shadow-card"
          >
            <FoodImage src={cat.imageUrl} alt={cat.name} className="aspect-[5/4]" />
            <div className="p-3">
              <p className="text-sm font-semibold text-ink group-hover:text-orange">{cat.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function AboutSection({ section }: { section: HomepageSection }) {
  return (
    <section className="overflow-hidden rounded-lg bg-paper shadow-card md:grid md:grid-cols-2">
      <FoodImage src={section.imageUrl} alt="" className="aspect-[4/3] md:aspect-auto md:min-h-full" />
      <div className="p-5 md:p-8">
        <p className="text-xs font-medium tracking-wide text-green">از آشپزخانه نازلی</p>
        <h2 className="mt-1 text-xl font-semibold md:text-2xl">{section.title}</h2>
        <p className="mt-3 text-sm leading-7 text-muted md:text-base">{section.description}</p>
        {section.buttonText ? <CmsButton href={section.buttonLink || "/about"} variant="secondary">{section.buttonText}</CmsButton> : null}
      </div>
    </section>
  );
}

function PromoSection({ section }: { section: HomepageSection }) {
  return (
    <section className="relative overflow-hidden rounded-lg bg-orange text-paper">
      {section.imageUrl ? (
        <img src={section.imageUrl} alt="" className="absolute inset-0 size-full object-cover opacity-25 outline-none" />
      ) : null}
      <div className="relative p-6 md:p-10">
        <h2 className="text-2xl font-semibold">{section.title}</h2>
        <p className="mt-2 max-w-lg text-sm leading-7 text-paper/90">{section.description}</p>
        {section.buttonText ? <CmsButton href={section.buttonLink || "/menu"} variant="cream">{section.buttonText}</CmsButton> : null}
      </div>
    </section>
  );
}

function ContactSection({ section, store }: { section: HomepageSection; store: StorePayload }) {
  const phone = store.settings.phone;
  return (
    <section className="rounded-lg border border-line bg-paper p-5 text-center shadow-card md:p-8">
      <h2 className="text-xl font-semibold">{section.title}</h2>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-7 text-muted">{section.description}</p>
      <a
        href={toTelHref(phone)}
        className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 text-2xl font-semibold tabular-nums text-green"
        dir="ltr"
      >
        <Phone className="size-6" />
        {formatPhoneDisplay(phone)}
      </a>
      <div className="mt-4 flex flex-col justify-center gap-2 sm:flex-row">
        <Button asChild size="lg">
          <a href={toTelHref(phone)}>تماس برای سفارش</a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to="/cart">مشاهده سبد خرید</Link>
        </Button>
      </div>
    </section>
  );
}

function InstagramSection({ section, store }: { section: HomepageSection; store: StorePayload }) {
  const shots = publicProducts(store)
    .filter((p) => p.imageUrl)
    .slice(0, 6);
  return (
    <section>
      <SectionHead title={section.title} description={section.description} />
      <div className="grid grid-cols-3 gap-1.5 overflow-hidden rounded-lg">
        {shots.map((p) => (
          <FoodImage key={p.id} src={p.imageUrl} alt={p.name} className="aspect-square" />
        ))}
      </div>
      <Button asChild variant="secondary" className="mt-4 w-full sm:w-auto">
        <a href={instagramUrl(store.settings.instagram)} target="_blank" rel="noreferrer">
          <Instagram className="size-4" />
          {section.buttonText || "اینستاگرام"}
        </a>
      </Button>
    </section>
  );
}
