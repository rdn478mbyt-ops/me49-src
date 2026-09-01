import { cn } from "@/lib/utils"

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full border border-border bg-white px-3 text-base outline-none",
        "focus-visible:border-me-navy focus-visible:ring-2 focus-visible:ring-me-navy/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}
