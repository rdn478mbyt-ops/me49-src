import { site } from "@/config/site"
import {
  formatFrenchDate,
  formatLabel,
  getPublicSessionTitle,
  getUpcomingCafes,
} from "@/lib/content"
import { cn } from "@/lib/utils"

export function CafeSchedule({
  className,
  highlightFirst = true,
}: {
  className?: string
  highlightFirst?: boolean
}) {
  const sessions = getUpcomingCafes()

  if (sessions.length === 0) {
    return (
      <p className={cn("text-muted-foreground", className)}>
        {site.cafe.cadence}. Les prochaines dates seront publiées ici.
      </p>
    )
  }

  return (
    <ol className={cn("divide-y divide-border border-y border-border", className)}>
      {sessions.map((session, index) => {
        const isNext = highlightFirst && index === 0
        return (
          <li
            key={session.date}
            className={cn(
              "grid gap-2 py-5 sm:grid-cols-[minmax(0,12rem)_1fr] sm:items-baseline",
              isNext && "border-l-4 border-l-me-gold bg-me-paper px-4"
            )}
          >
            <p className="text-sm font-medium text-me-navy">
              {formatFrenchDate(session.date)}
              <span className="mt-1 block font-normal text-muted-foreground">
                {site.cafe.timeLabel}
              </span>
            </p>
            <div>
              <p className="text-lg font-semibold tracking-tight">
                {getPublicSessionTitle(session)}
              </p>
              {formatLabel(session.format) || session.note ? (
                <p className="mt-1 text-sm text-muted-foreground">
                  {[formatLabel(session.format), session.note]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              ) : null}
              {isNext ? (
                <p className="mt-2 text-xs font-semibold tracking-[0.16em] text-me-navy uppercase">
                  {site.cafe.nextLabel}
                </p>
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
