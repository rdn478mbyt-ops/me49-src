import Link from "next/link"

import { GoldStar } from "@/components/brand-mark"
import { cn } from "@/lib/utils"

export function EmptyState({
  title,
  children,
  href,
  cta,
  className,
}: {
  title: string
  children: React.ReactNode
  href?: string
  cta?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "border border-dashed border-me-navy/25 bg-white px-6 py-10",
        className
      )}
    >
      <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-me-navy uppercase">
        <GoldStar />
        Bientôt
      </p>
      <h2 className="mt-3 text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 max-w-prose text-muted-foreground">{children}</div>
      {href && cta ? (
        <p className="mt-5">
          <Link
            href={href}
            className="font-medium text-me-navy underline decoration-me-gold decoration-2 underline-offset-4 hover:decoration-me-orange"
          >
            {cta}
          </Link>
        </p>
      ) : null}
    </div>
  )
}
