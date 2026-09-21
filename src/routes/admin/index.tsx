import { createFileRoute, Link } from "@tanstack/react-router";
import { useAdminData } from "@/lib/admin-query";
import { formatToman } from "@/lib/persian";

export const Route = createFileRoute("/admin/")({ component: AdminHome });

function AdminHome() {
  const { data, isPending, error } = useAdminData();
  if (isPending) return <p className="text-sm text-muted">در حال بارگذاری…</p>;
  if (error || !data) return <p className="text-sm text-accent-red">دسترسی نامعتبر است. دوباره وارد شوید.</p>;

  const visibleProducts = data.products.filter((p) => p.visible).length;
  const featured = data.products.filter((p) => p.featured).length;

  return (
    <div>
      <h1 className="text-xl font-semibold">خلاصه فروشگاه</h1>
      <p className="mt-1 text-sm text-muted">از اینجا منو، متن‌ها و وضعیت سفارش را بدون تغییر کد مدیریت کنید.</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Stat label="محصولات" value={String(data.products.length)} hint={`${visibleProducts} نمایش‌داده‌شده`} />
        <Stat label="دسته‌ها" value={String(data.categories.length)} />
        <Stat label="پیشنهادی" value={String(featured)} />
        <Stat
          label="سفارش"
          value={data.settings.orderClosed ? "بسته" : "باز"}
          hint={data.settings.orderClosed ? data.settings.orderClosedTitle : "مشتری می‌تواند به سبد اضافه کند"}
        />
      </div>
      <div className="mt-6 grid gap-2">
        <Link className="rounded-md bg-paper px-4 py-3 text-sm shadow-card" to="/admin/products">
          مدیریت محصولات
        </Link>
        <Link className="rounded-md bg-paper px-4 py-3 text-sm shadow-card" to="/admin/settings">
          تماس، اینستاگرام و بستن سفارش
        </Link>
        <Link className="rounded-md bg-paper px-4 py-3 text-sm shadow-card" to="/admin/sections">
          ویرایش بخش‌های صفحه اصلی
        </Link>
      </div>
      <p className="mt-6 text-xs text-muted">نمونه قیمت پک ۳۵ نفره: {formatToman(13500000)}</p>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-lg bg-paper p-4 shadow-card">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}
