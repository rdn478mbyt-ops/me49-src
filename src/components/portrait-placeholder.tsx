import { GoldStar } from "@/components/brand-mark"

export function PortraitPlaceholder({ index }: { index: number }) {
  return (
    <figure className="flex flex-col border border-border bg-white">
      <div
        className="relative flex aspect-[4/5] items-end bg-me-paper"
        aria-hidden="true"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-28 items-center justify-center rounded-full border border-dashed border-me-navy/25 bg-white/70">
            <GoldStar className="size-6 opacity-80" />
          </div>
        </div>
        <span className="relative m-3 bg-me-navy px-2 py-1 text-[10px] font-semibold tracking-[0.14em] text-white uppercase">
          Portrait à venir
        </span>
      </div>
      <figcaption className="space-y-2 p-4">
        <p className="font-semibold text-me-navy">Portrait {index}</p>
      </figcaption>
    </figure>
  )
}
