import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { LayoutGrid, Layers, LogOut, Package, Settings2, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminLogin, adminLogout, getAdminSession } from "@/lib/functions/admin";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({ component: AdminLayout });

const NAV = [
  { to: "/admin", label: "خلاصه", icon: LayoutGrid, exact: true },
  { to: "/admin/products", label: "محصولات", icon: UtensilsCrossed },
  { to: "/admin/categories", label: "دسته‌ها", icon: Package },
  { to: "/admin/sections", label: "بخش‌های صفحه", icon: Layers },
  { to: "/admin/settings", label: "تنظیمات", icon: Settings2 },
];

function AdminLayout() {
  const { data, isPending } = useQuery({
    queryKey: ["admin-session"],
    queryFn: () => getAdminSession(),
  });

  if (isPending) {
    return <div className="bg-linen flex min-h-dvh items-center justify-center text-muted">در حال بارگذاری…</div>;
  }
  if (!data?.authenticated) return <AdminLogin />;
  return <AdminChrome />;
}

function AdminLogin() {
  const qc = useQueryClient();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useMutation({
    mutationFn: () => adminLogin({ data: { username, password } }),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["admin-session"] });
    },
    onError: (err) => setError(err instanceof Error ? err.message : "ورود ناموفق بود"),
  });

  return (
    <div className="bg-linen flex min-h-dvh items-center justify-center px-4">
      <form
        className="w-full max-w-sm rounded-lg bg-paper p-6 shadow-card"
        onSubmit={(e) => {
          e.preventDefault();
          setError("");
          login.mutate();
        }}
      >
        <img src="/logo.svg" alt="" className="mx-auto size-12 rounded-[12px] outline-none" />
        <h1 className="mt-3 text-center text-xl font-semibold">ورود مدیریت</h1>
        <p className="mt-1 text-center text-sm text-muted">نازلی فینگر فود</p>
        <div className="mt-5">
          <Label htmlFor="user">نام کاربری</Label>
          <Input id="user" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
        </div>
        <div className="mt-3">
          <Label htmlFor="pass">رمز عبور</Label>
          <Input id="pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
        </div>
        {error ? <p className="mt-3 text-sm text-accent-red">{error}</p> : null}
        <Button className="mt-5 w-full" type="submit" disabled={login.isPending}>
          ورود
        </Button>
        <p className="mt-4 text-center text-xs leading-6 text-muted">
          ورود پیش‌فرض: <span dir="ltr">admin / Nazli1405</span>
          <br />
          رمز را از تنظیمات عوض کنید.
        </p>
      </form>
    </div>
  );
}

function AdminChrome() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const qc = useQueryClient();
  const logout = useMutation({
    mutationFn: () => adminLogout(),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["admin-session"] });
    },
  });

  return (
    <div className="bg-linen min-h-dvh pb-20 md:pb-0">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-paper px-4 py-3">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="" className="size-8 rounded-[8px] outline-none" />
          <div>
            <p className="text-sm font-semibold">پنل نازلی</p>
            <Link to="/" className="text-xs text-muted">
              مشاهده سایت
            </Link>
          </div>
        </div>
        <button type="button" className="flex h-11 items-center gap-1 text-sm text-muted" onClick={() => logout.mutate()}>
          <LogOut className="size-4" />
          خروج
        </button>
      </header>
      <div className="mx-auto flex max-w-6xl gap-6 px-4 py-4">
        <aside className="hidden w-52 shrink-0 md:block">
          <nav className="sticky top-20 space-y-1">
            {NAV.map((item) => {
              const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex h-11 items-center gap-2 rounded-md px-3 text-sm",
                    active ? "bg-orange-soft text-orange-dark" : "text-muted hover:bg-paper",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-paper pb-[env(safe-area-inset-bottom)] md:hidden">
        {NAV.map((item) => {
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link key={item.to} to={item.to} className={cn("flex h-14 flex-col items-center justify-center gap-0.5 text-[10px]", active ? "text-orange" : "text-muted")}>
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
