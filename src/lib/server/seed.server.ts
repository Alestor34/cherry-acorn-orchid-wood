import { getSql } from "@/lib/db";
import { hashPassword, sha256Hex } from "./hash.server";
import { DEFAULT_SETTINGS } from "@/lib/types";

const globalRef = globalThis as typeof globalThis & {
  __nazliSeedPromise__?: Promise<void>;
};

function randomSecret(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const CATEGORIES = [
  { name: "فینگر فود گرم", slug: "hot", description: "مینی پیتزا، برگر، بورک و مزه‌های گرم مهمانی", image: "/images/cat-hot.jpg" },
  { name: "سوخاری", slug: "fried", description: "فیله، ناگت و رول‌های طلایی و ترد", image: "/images/cat-fried.jpg" },
  { name: "مزه و سالاد", slug: "salad", description: "شات کشک بادمجان، الویه و تارت‌های مزه‌ای", image: "/images/cat-salad.jpg" },
  { name: "پک مهمانی", slug: "pack", description: "پک‌های آماده برای ۲۰ تا ۳۵ نفر", image: "/images/cat-pack.jpg" },
  { name: "تارت و دسر", slug: "dessert", description: "تارت میوه و شیرینی‌های انگشتی", image: "/images/cat-dessert.jpg" },
];

type SeedProduct = {
  name: string;
  description: string;
  price: number;
  special?: number;
  image: string;
  category: string;
  featured?: boolean;
  tags?: string;
  notes?: string;
};

const PRODUCTS: SeedProduct[] = [
  {
    name: "مینی پیتزا",
    description: "بسته ۱۰ عددی مینی‌پیتزا با خمیر نازک، سس خانگی و پنیر کش‌دار. مناسب پذیرایی گرم.",
    price: 185000,
    image: "/images/p-pizza.jpg",
    category: "hot",
    featured: true,
    tags: "محبوب، تولد",
    notes: "حداقل سفارش یک بسته ۱۰ عددی",
  },
  {
    name: "مینی برگر",
    description: "۱۰ عدد مینی‌برگر با نان نرم، گوشت آبدار و پنیر. سیرکننده و مرتب برای سینی مهمانی.",
    price: 210000,
    image: "/images/p-burger.jpg",
    category: "hot",
    featured: true,
    tags: "محبوب",
  },
  {
    name: "بورک گوشت",
    description: "بورک یوفکا با فیلینگ گوشت ادویه‌دار، برشته و طلایی. بسته ۱۰ عددی.",
    price: 195000,
    image: "/images/p-borek.jpg",
    category: "hot",
    tags: "یوفکا",
  },
  {
    name: "سمبوسه",
    description: "سمبوسه مثلثی با پوسته ترد و فیلینگ گوشت و سبزی. بسته ۱۰ عددی همراه با سس.",
    price: 165000,
    image: "/images/p-samosa.jpg",
    category: "hot",
  },
  {
    name: "پیراشکی گوشت",
    description: "پیراشکی نرم و طلایی با گوشت چرخ‌کرده. مناسب سینی عصرانه و تولد.",
    price: 175000,
    image: "/images/p-piroshki.jpg",
    category: "hot",
  },
  {
    name: "مینی هات‌داگ",
    description: "۱۰ عدد مینی هات‌داگ در نان کوچک، با خردل و سس. انتخاب اقتصادی و محبوب بچه‌ها.",
    price: 155000,
    image: "/images/p-hotdog.jpg",
    category: "hot",
  },
  {
    name: "رول تست سوخاری",
    description: "نان تست رول‌شده با فیلینگ خامه‌ای، سوخاری‌شده تا پوسته طلایی. بسته ۱۰ عددی.",
    price: 168000,
    image: "/images/p-toast.jpg",
    category: "fried",
    featured: true,
    tags: "سوخاری",
  },
  {
    name: "کلاب ژامبون",
    description: "کلاب سه‌لایه با ژامبون، پنیر و کاهو، برش‌خورده برای سرو انگشتی. بسته ۸ عددی.",
    price: 190000,
    image: "/images/p-club.jpg",
    category: "hot",
  },
  {
    name: "فیله سوخاری",
    description: "فیله مرغ تازه با پوشش ترد خانگی. بسته ۱۰ عددی، همراه لیمو.",
    price: 245000,
    special: 225000,
    image: "/images/p-fillet.jpg",
    category: "fried",
    featured: true,
    tags: "ویژه",
  },
  {
    name: "ناگت مرغ",
    description: "ناگت‌های یک‌اندازه و ترد. بسته ۱۰ عددی، مناسب پک کودک و تولد.",
    price: 175000,
    image: "/images/p-nugget.jpg",
    category: "fried",
  },
  {
    name: "ناگت میگو",
    description: "میگوی سوخاری با پوشش طلایی. بسته ۱۰ عددی برای پذیرایی خاص‌تر.",
    price: 285000,
    image: "/images/p-shrimp.jpg",
    category: "fried",
    tags: "ویژه",
  },
  {
    name: "شات کشک بادمجان",
    description: "کشک بادمجان دودی در شات‌های تک‌نفره، با نعنا داغ و گردو. بسته ۱۰ عدد.",
    price: 145000,
    image: "/images/p-kashk.jpg",
    category: "salad",
    featured: true,
    tags: "مزه",
  },
  {
    name: "الویه خانگی",
    description: "الویه خامه‌ای با مرغ و سیب‌زمینی، یک کیلو. قابل سرو در کاسه یا روی تست.",
    price: 320000,
    image: "/images/p-olivieh.jpg",
    category: "salad",
    notes: "قیمت برای یک کیلوگرم",
  },
  {
    name: "سالاد ماکارونی",
    description: "سالاد ماکارونی خانگی، یک کیلو. خنک، سیرکننده و مناسب کنار سینی فینگر فود.",
    price: 280000,
    image: "/images/p-macaroni.jpg",
    category: "salad",
    notes: "قیمت برای یک کیلوگرم",
  },
  {
    name: "تارت میرزاقاسمی",
    description: "تارت‌های کوچک با میرزاقاسمی دودی. بسته ۱۰ عددی برای مزه گرم.",
    price: 195000,
    image: "/images/p-mirza.jpg",
    category: "salad",
  },
  {
    name: "پک ۲۰ نفره",
    description: "پک کامل برای حدود ۲۰ نفر: مینی‌برگر، بورک، رول تست، شات کشک و الویه. ظاهر مرتب روی سینی.",
    price: 7800000,
    image: "/images/p-pack20.jpg",
    category: "pack",
    featured: true,
    tags: "پک، تولد",
    notes: "هماهنگی حداقل ۲۴ ساعت قبل",
  },
  {
    name: "پک ۳۵ نفره",
    description: "پک سیرکننده حدود ۳۵ نفر شامل چند مدل فینگر فود گرم، سوخاری و مزه. مناسب تولد و دورهمی.",
    price: 13500000,
    image: "/images/p-pack35.jpg",
    category: "pack",
    featured: true,
    tags: "پک",
    notes: "هماهنگی حداقل ۲۴ ساعت قبل",
  },
  {
    name: "پک اقتصادی ۳۰ نفره",
    description: "پک اقتصادی شامل مینی‌پیتزا، مینی‌برگر، رول تست سوخاری، ناگت، الویه و کشک بادمجان.",
    price: 15000000,
    image: "/images/p-pack.jpg",
    category: "pack",
    tags: "پک، اقتصادی",
  },
  {
    name: "تارت میوه",
    description: "تارت‌های کوچک با خامه و میوه فصل. بسته ۱۰ عددی برای شیرینی پایانی مهمانی.",
    price: 165000,
    image: "/images/p-tart.jpg",
    category: "dessert",
  },
  {
    name: "مینی چیزکیک",
    description: "چیزکیک‌های تک‌نفره با بافت خامه‌ای. بسته ۱۰ عددی.",
    price: 185000,
    image: "/images/p-cheesecake.jpg",
    category: "dessert",
    featured: true,
  },
];

const SECTIONS = [
  {
    key: "hero",
    title: "نازلی فینگر فود",
    description: "فینگر فود خونگی، مرتب و تازه برای تولد و مهمانی",
    image: "/images/hero.jpg",
    buttonText: "مشاهده منو",
    buttonLink: "/menu",
    extra: { secondaryText: "تماس برای سفارش", secondaryLink: "/contact" },
  },
  {
    key: "featured",
    title: "انتخاب‌های امروز",
    description: "آیتم‌هایی که بیشتر برای تولد و دورهمی سفارش داده می‌شوند.",
    image: "",
    buttonText: "همه محصولات",
    buttonLink: "/menu",
    extra: {},
  },
  {
    key: "categories",
    title: "دسته‌بندی منو",
    description: "از فینگر فود گرم تا پک کامل مهمانی.",
    image: "",
    buttonText: "",
    buttonLink: "",
    extra: {},
  },
  {
    key: "about",
    title: "داستان نازلی",
    description:
      "ما فینگر فود را مثل پذیرایی خانه آماده می‌کنیم: مواد تازه، طعم آشنا و چیدمان مرتب روی سینی. برای تولد، نامزدی و دورهمی‌های خانوادگی کنار شما هستیم.",
    image: "/images/about.jpg",
    buttonText: "درباره ما",
    buttonLink: "/about",
    extra: {},
  },
  {
    key: "promo",
    title: "پک مهمانی، بدون دردسر",
    description: "پک‌های ۲۰ و ۳۵ نفره را انتخاب کنید تا منو، تعداد و چیدمان از قبل هماهنگ شده باشد.",
    image: "/images/promo.jpg",
    buttonText: "دیدن پک‌ها",
    buttonLink: "/menu?category=pack",
    extra: {},
  },
  {
    key: "contact",
    title: "ثبت سفارش",
    description: "برای هماهنگی تعداد، تم رنگ و زمان تحویل تماس بگیرید یا از اینستاگرام پیام بدهید.",
    image: "",
    buttonText: "تماس تلفنی",
    buttonLink: "tel:+989129564648",
    extra: {},
  },
  {
    key: "instagram",
    title: "از آشپزخانه نازلی",
    description: "نمونه کارها و پک‌های روز را در اینستاگرام ببینید.",
    image: "/images/p-pack.jpg",
    buttonText: "اینستاگرام نازلی",
    buttonLink: "https://www.instagram.com/fingerfood.nazli",
    extra: {},
  },
];

export async function ensureSeeded(): Promise<void> {
  if (!globalRef.__nazliSeedPromise__) {
    globalRef.__nazliSeedPromise__ = seedOnce().catch((err) => {
      globalRef.__nazliSeedPromise__ = undefined;
      throw err;
    });
  }
  await globalRef.__nazliSeedPromise__;
}

async function seedOnce(): Promise<void> {
  const sql = await getSql();
  const existing = await sql<{ value: string }>`select value from site_settings where key = ${"seeded"}`;
  if (existing[0]?.value === "true") return;

  const salt = randomSecret().slice(0, 24);
  const passwordHash = await hashPassword("Nazli1405", salt);
  const sessionSecret = await sha256Hex(randomSecret());

  const settings: Record<string, string> = {
    seeded: "true",
    site_name: DEFAULT_SETTINGS.siteName,
    tagline: DEFAULT_SETTINGS.tagline,
    phone: DEFAULT_SETTINGS.phone,
    instagram: DEFAULT_SETTINGS.instagram,
    about_text: DEFAULT_SETTINGS.aboutText,
    order_closed: "false",
    order_closed_title: DEFAULT_SETTINGS.orderClosedTitle,
    order_closed_message: DEFAULT_SETTINGS.orderClosedMessage,
    order_reopen_date: "",
    footer_note: DEFAULT_SETTINGS.footerNote,
    admin_username: "admin",
    admin_salt: salt,
    admin_password_hash: passwordHash,
    session_secret: sessionSecret,
  };

  for (const [key, value] of Object.entries(settings)) {
    await sql`insert into site_settings (key, value) values (${key}, ${value})
      on conflict (key) do nothing`;
  }

  const catCount = await sql<{ n: number }>`select count(*)::int as n from categories`;
  if ((catCount[0]?.n ?? 0) === 0) {
    for (let i = 0; i < CATEGORIES.length; i += 1) {
      const c = CATEGORIES[i];
      await sql`insert into categories (name, slug, description, image_url, visible, sort_order)
        values (${c.name}, ${c.slug}, ${c.description}, ${c.image}, ${true}, ${i})`;
    }
  }

  const cats = await sql<{ id: number; slug: string }>`select id, slug from categories`;
  const catBySlug = new Map(cats.map((c) => [c.slug, c.id]));

  const prodCount = await sql<{ n: number }>`select count(*)::int as n from products`;
  if ((prodCount[0]?.n ?? 0) === 0) {
    for (let i = 0; i < PRODUCTS.length; i += 1) {
      const p = PRODUCTS[i];
      const categoryId = catBySlug.get(p.category) ?? null;
      await sql`insert into products (
        name, description, price, special_price, image_url, extra_images, category_id,
        available, featured, visible, tags, ordering_notes, sort_order
      ) values (
        ${p.name}, ${p.description}, ${p.price}, ${p.special ?? null}, ${p.image}, ${"[]"},
        ${categoryId}, ${true}, ${Boolean(p.featured)}, ${true}, ${p.tags ?? ""}, ${p.notes ?? ""}, ${i}
      )`;
    }
  }

  const secCount = await sql<{ n: number }>`select count(*)::int as n from homepage_sections`;
  if ((secCount[0]?.n ?? 0) === 0) {
    for (let i = 0; i < SECTIONS.length; i += 1) {
      const s = SECTIONS[i];
      await sql`insert into homepage_sections (
        key, enabled, title, description, image_url, button_text, button_link, extra, sort_order
      ) values (
        ${s.key}, ${true}, ${s.title}, ${s.description}, ${s.image}, ${s.buttonText}, ${s.buttonLink},
        ${JSON.stringify(s.extra)}, ${i}
      )`;
    }
  }
}
