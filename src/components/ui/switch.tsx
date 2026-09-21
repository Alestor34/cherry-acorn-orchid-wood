import type { ComponentProps } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export function Switch({ className, ...props }: ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      dir="ltr"
      className={cn(
        "peer inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-line bg-line",
        "data-[state=checked]:border-green data-[state=checked]:bg-green",
        "transition-[background-color] duration-150 focus-visible:ring-2 focus-visible:ring-orange/35",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="pointer-events-none block size-5 translate-x-0.5 rounded-full bg-paper shadow-card transition-transform duration-150 data-[state=checked]:translate-x-5" />
    </SwitchPrimitive.Root>
  );
}
