import type { ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-[background-color,color,box-shadow,scale,opacity] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-orange/40",
  {
    variants: {
      variant: {
        default: "bg-orange text-paper hover:bg-orange-dark",
        secondary: "bg-green text-paper hover:bg-green-dark",
        outline: "border border-line bg-paper text-ink hover:bg-orange-soft/50",
        ghost: "text-ink hover:bg-orange-soft/40",
        danger: "bg-accent-red text-paper hover:bg-accent-red/90",
        cream: "bg-paper text-ink shadow-card hover:bg-orange-soft/40",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
