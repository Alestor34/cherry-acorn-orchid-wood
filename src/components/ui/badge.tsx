import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "orange",
  children,
}: {
  className?: string;
  tone?: "orange" | "green" | "red" | "muted";
  children: ReactNode;
}) {
  const tones = {
    orange: "bg-orange-soft text-orange-dark",
    green: "bg-green-soft text-green-dark",
    red: "bg-accent-red-soft text-accent-red",
    muted: "bg-line/70 text-muted",
  };
  return (
    <span className={cn("inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium", tones[tone], className)}>
      {children}
    </span>
  );
}
