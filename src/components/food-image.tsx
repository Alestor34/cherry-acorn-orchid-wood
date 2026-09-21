import { useState } from "react";
import { cn } from "@/lib/utils";

export function FoodImage({
  src,
  alt,
  className,
  imgClassName,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  if (!src) {
    return <div className={cn("bg-orange-soft/60", className)} aria-hidden />;
  }
  return (
    <div className={cn("relative overflow-hidden bg-orange-soft/50", className)}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-line/70" />}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn(
          "size-full object-cover transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
          imgClassName,
        )}
      />
    </div>
  );
}
