import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { queryClient } from "@/lib/query";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        dir="rtl"
        position="top-center"
        toastOptions={{
          className: "font-[Vazirmatn] text-sm",
          style: {
            background: "#fffaf2",
            color: "#2a2218",
            border: "1px solid #e4d5c3",
            fontFamily: "Vazirmatn, Tahoma, sans-serif",
          },
        }}
      />
    </QueryClientProvider>
  );
}
