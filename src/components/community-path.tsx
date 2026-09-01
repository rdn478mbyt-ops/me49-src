import { communityPath } from "@/config/site"
import { cn } from "@/lib/utils"

export function CommunityPath({
  current = "Venir",
  className,
}: {
  current?: (typeof communityPath)[number]
  className?: string
}) {
  return (
    <ol
      className={cn(
        "flex flex-wrap gap-x-1 gap-y-2 text-sm font-medium",
        className
      )}
    >
      {communityPath.map((step, index) => {
        const isCurrent = step === current
        return (
          <li key={step} className="flex items-center gap-1">
            {index > 0 ? (
              <span aria-hidden="true" className="px-1 text-me-navy/40">
                →
              </span>
            ) : null}
            <span
              className={cn(
                "px-1",
                isCurrent
                  ? "bg-me-gold text-me-navy"
                  : "text-muted-foreground"
              )}
            >
              {step}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
