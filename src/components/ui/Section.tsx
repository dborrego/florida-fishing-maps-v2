import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function Section({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-20 sm:py-28 relative", className)} {...props}>
      {(eyebrow || title || subtitle) && (
        <div
          className={cn(
            "mb-14 max-w-3xl",
            align === "center" && "mx-auto text-center"
          )}
        >
          {eyebrow && (
            <p className="mb-3 text-xs uppercase tracking-[0.25em] font-mono text-plotter">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-foam leading-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-4 text-base sm:text-lg text-foam/70 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
