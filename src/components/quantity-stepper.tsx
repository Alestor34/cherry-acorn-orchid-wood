import { Minus, Plus } from "lucide-react";
import { toFaDigits } from "@/lib/persian";
import { cn } from "@/lib/utils";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex h-11 items-center rounded-md border border-line bg-paper", className)}>
      <button
        type="button"
        className="flex size-11 items-center justify-center text-ink disabled:text-muted"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="کاهش تعداد"
      >
        <Minus className="size-4" />
      </button>
      <span className="min-w-8 text-center tabular-nums text-sm font-medium">{toFaDigits(value)}</span>
      <button
        type="button"
        className="flex size-11 items-center justify-center text-ink disabled:text-muted"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="افزایش تعداد"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
