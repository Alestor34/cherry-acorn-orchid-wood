import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-line bg-paper px-3 text-base text-ink outline-none",
        "placeholder:text-muted focus-visible:ring-2 focus-visible:ring-orange/35",
        "disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
