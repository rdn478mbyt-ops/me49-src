import { site } from "@/config/site"
import { cn } from "@/lib/utils"

export function BrandMark({
  className,
  priority = false,
}: {
  className?: string
  priority?: boolean
}) {
  const src = site.logo.useLocal ? site.logo.localSrc : site.logo.nationalSrc
  const alt = site.logo.useLocal ? site.logo.localAlt : site.logo.nationalAlt

  return (
    <span className={cn("flex min-w-0 items-center gap-3", className)}>
      {}
      <img
        src={src}
        alt={alt}
        width={175}
        height={74}
        className="h-10 w-auto sm:h-11"
        {...(priority ? { fetchPriority: "high" as const } : {})}
      />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="text-[11px] font-semibold tracking-[0.14em] text-me-navy uppercase">
          Section locale
        </span>
        <span className="truncate text-sm font-semibold text-foreground sm:text-base">
          Maine-et-Loire
        </span>
      </span>
    </span>
  )
}

export function GoldStar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={cn("inline-block size-3 fill-me-gold", className)}
    >
      <polygon points="6,0.4 7.4,4.2 11.4,4.4 8.2,7.1 9.2,11 6,8.9 2.8,11 3.8,7.1 0.6,4.4 4.6,4.2" />
    </svg>
  )
}
