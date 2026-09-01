import { getConfirmedVenue, getPhoneHref } from "@/lib/content"
import { cn } from "@/lib/utils"

export function VenueBlock({
  compact = false,
  className,
}: {
  compact?: boolean
  className?: string
}) {
  const venue = getConfirmedVenue()
  if (!venue) return null

  const mapsQuery = encodeURIComponent(
    `${venue.name} ${venue.address} ${venue.postalCode} ${venue.city}`
  )

  if (compact) {
    return (
      <p className={cn("text-sm", className)}>
        <span className="font-medium">{venue.name}</span>
        {" · "}
        {venue.address}, {venue.city}
        {" · "}
        <a
          href={venue.url}
          className="underline decoration-white/40 underline-offset-2 hover:decoration-me-gold"
        >
          {venue.url.replace(/^https?:\/\//, "")}
        </a>
      </p>
    )
  }

  return (
    <address className={cn("not-italic", className)}>
      <p className="text-xs font-semibold tracking-[0.18em] text-me-navy uppercase">
        Lieu
      </p>
      <p className="mt-2 text-xl font-semibold tracking-tight">{venue.name}</p>
      <p className="text-sm text-muted-foreground">{venue.qualifier}</p>
      <p className="mt-3 leading-relaxed">
        {venue.address}
        <br />
        {venue.postalCode} {venue.city}
      </p>
      <p className="mt-4 flex flex-col gap-1 text-sm">
        <a
          href={venue.url}
          className="font-medium text-me-navy underline decoration-me-gold decoration-2 underline-offset-4"
        >
          {venue.url.replace(/^https?:\/\//, "")}
        </a>
        {venue.phone ? (
          <a href={getPhoneHref(venue.phone)} className="hover:text-me-navy">
            {venue.phone}
          </a>
        ) : null}
        <a
          href={`https://www.openstreetmap.org/search?query=${mapsQuery}`}
          className="text-muted-foreground hover:text-me-navy"
        >
          Itinéraire
        </a>
      </p>
    </address>
  )
}
