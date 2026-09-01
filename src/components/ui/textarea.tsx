import { cn } from "@/lib/utils"

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full border border-border bg-white px-3 py-2 text-base outline-none",
        "focus-visible:border-me-navy focus-visible:ring-2 focus-visible:ring-me-navy/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}
