import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AppProviders } from "@/components/providers";
import { Button } from "@/components/ui/button";
import appCss from "../styles.css?url";

const APP_NAME = "نازلی فینگر فود";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: APP_NAME },
      { name: "description", content: "فینگر فود خونگی برای تولد و مهمانی — نازلی فینگر فود" },
      { name: "theme-color", content: "#C45C26" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700&display=swap",
      },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  notFoundComponent: () => (
    <main className="bg-linen flex min-h-dvh flex-col items-center justify-center gap-3 px-6 text-center">
      <p className="text-lg font-semibold">این صفحه پیدا نشد</p>
      <Button asChild>
        <Link to="/">بازگشت به خانه</Link>
      </Button>
    </main>
  ),
  component: () => (
    <html lang="fa" dir="rtl" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-cream text-ink">
        <PreviewHostBridge />
        <AuthProvider>
          <AppProviders>
            <Outlet />
          </AppProviders>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
