import { getCafeDisplay } from "@/lib/content"
import { LinkButton } from "@/components/link-button"
import { GoldStar } from "@/components/brand-mark"
import { VenueBlock } from "@/components/venue-block"
import { site } from "@/config/site"
import { cn } from "@/lib/utils"

export function CafePanel({
  variant = "hero",
  className,
}: {
  variant?: "hero" | "compact"
  className?: string
}) {
  const cafe = getCafeDisplay()
  const isHero = variant === "hero"

  return (
    <aside
      className={cn(
        "border border-white/15 bg-me-navy text-white",
        isHero ? "p-6 sm:p-8" : "p-5 sm:p-6",
        className
      )}
    >
      <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-me-gold uppercase">
        <GoldStar />
        {site.cafe.name}
      </p>
      <p className="mt-3 text-xs font-semibold tracking-[0.18em] text-white/70 uppercase">
        {cafe.hasDate ? site.cafe.nextLabel : "Nous rencontrer"}
      </p>
      <h2
        className={cn(
          "mt-2 font-semibold tracking-tight text-balance",
          isHero ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
        )}
      >
        {cafe.title}
      </h2>
      <p className={cn("mt-3 text-white/90", isHero ? "text-lg sm:text-xl" : "text-base")}>
        {cafe.headline}
      </p>
      {cafe.session?.note ? (
        <p className="mt-2 text-sm text-white/80">{cafe.session.note}</p>
      ) : null}
      <div className="mt-3 text-sm text-white/80">
        <VenueBlock compact className="text-white/80 [&_span]:text-white" />
      </div>
      <p className="mt-1 text-sm text-white/70">{cafe.cadence}</p>
      {isHero ? (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <LinkButton
            href={site.registration.path}
            size="xl"
            className="bg-white text-me-navy hover:bg-me-gold hover:text-me-navy"
          >
            {site.registration.cta}
          </LinkButton>
          <LinkButton
            href="/nous-rencontrer"
            size="xl"
            variant="outline"
            className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            Comment venir
          </LinkButton>
        </div>
      ) : (
        <LinkButton
          href={site.registration.path}
          size="lg"
          className="mt-5 bg-white text-me-navy hover:bg-me-gold hover:text-me-navy"
        >
          {site.registration.cta}
        </LinkButton>
      )}
    </aside>
  )
}
