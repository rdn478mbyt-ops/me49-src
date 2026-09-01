import { LinkButton } from "@/components/link-button"
import { site } from "@/config/site"
import { cn } from "@/lib/utils"

export function RegisterCta({
  className,
  variant = "default",
  size = "xl",
}: {
  className?: string
  variant?: "default" | "outline"
  size?: "lg" | "xl"
}) {
  return (
    <LinkButton
      href={site.registration.path}
      size={size}
      variant={variant}
      className={cn(className)}
    >
      {site.registration.cta}
    </LinkButton>
  )
}
