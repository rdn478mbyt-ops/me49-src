import {
  cafeCalendar,
  site,
  type CafeSession,
  type MomentInput,
  type MomentKind,
} from "@/config/site"

export type CafeDisplay = {
  hasDate: boolean
  session: CafeSession | null
  title: string
  headline: string
  detail: string
  when: string
  cadence: string
}

export function getConfirmedVenue() {
  const venue = site.cafe.venue
  return venue.confirmed ? venue : null
}

export function getPublicPlaceLabel(): string {
  const venue = getConfirmedVenue()
  if (!venue) return site.cafe.cadence
  return `${venue.name}, ${venue.address}, ${venue.city}`
}

export function getPhoneHref(phone: string): string {
  return `tel:+33${phone.replace(/\s/g, "").replace(/^0/, "")}`
}

export function getCafeDisplay(): CafeDisplay {
  const session = getNextCafeSession()
  const place = getPublicPlaceLabel()
  const cadence = site.cafe.cadence

  if (!session) {
    return {
      hasDate: false,
      session: null,
      title: site.cafe.name,
      headline: cadence,
      detail: "Prochaine date à confirmer.",
      when: cadence,
      cadence,
    }
  }

  const formatted = formatFrenchDate(session.date)
  const headline = `${formatted}, ${site.cafe.timeLabel}`
  const title = getPublicSessionTitle(session)

  return {
    hasDate: true,
    session,
    title,
    headline,
    detail: place,
    when: `${title} · ${headline}`,
    cadence,
  }
}

/** Titre montré au public. Les noms de travail restent dans `session.title`. */
export function getPublicSessionTitle(session: CafeSession): string {
  const published = session.publicTitle?.trim()
  if (published) return published
  return site.cafe.name
}

export function formatFrenchDate(isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00`)
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

function startOfToday(): Date {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

export function getUpcomingCafes(): CafeSession[] {
  const today = startOfToday()
  return cafeCalendar.filter((session) => {
    return new Date(`${session.date}T12:00:00`) >= today
  })
}

export function getNextCafeSession(): CafeSession | null {
  return getUpcomingCafes()[0] ?? null
}

export function getSessionByDate(isoDate: string): CafeSession | null {
  return cafeCalendar.find((session) => session.date === isoDate) ?? null
}

export function getSessionAfter(isoDate: string): CafeSession | null {
  return (
    cafeCalendar.find(
      (session) =>
        new Date(`${session.date}T12:00:00`) >
        new Date(`${isoDate}T12:00:00`)
    ) ?? null
  )
}

export type Moment = {
  id: string
  kind: MomentKind
  kindLabel: string
  title: string
  summary: string
  href: string
  dateLabel: string
}

const kindLabels: Record<MomentKind, string> = {
  cafe: site.cafe.name,
  conference: "Conférence",
  projet: "Projet communautaire",
}

export function getHomepageMoments(): Moment[] {
  const upcoming = getUpcomingCafes().slice(0, 3)
  const extras: Moment[] = site.extraMoments.map((moment: MomentInput) => ({
    id: moment.id,
    kind: moment.kind,
    kindLabel: kindLabels[moment.kind],
    title: moment.title,
    summary: moment.summary,
    href: moment.href,
    dateLabel: moment.date ? formatFrenchDate(moment.date) : "Date à confirmer",
  }))

  if (upcoming.length === 0) {
    return extras.slice(0, 3)
  }

  const cafeMoments: Moment[] = upcoming.map((session) => {
    const isFirst = session.date === site.registration.eventDate
    return {
      id: `cafe-${session.date}`,
      kind: "cafe" as const,
      kindLabel: kindLabels.cafe,
      title: getPublicSessionTitle(session),
      summary: [session.note, getPublicPlaceLabel()].filter(Boolean).join(" "),
      href: isFirst ? site.registration.path : "/agenda",
      dateLabel: `${formatFrenchDate(session.date)}, ${site.cafe.timeLabel}`,
    }
  })

  return [...cafeMoments, ...extras].slice(0, 3)
}

export function getContactLabel(): { href: string | null; label: string } {
  if (site.contactEmail) {
    return { href: `mailto:${site.contactEmail}`, label: site.contactEmail }
  }
  return { href: null, label: site.contactEmailPlaceholder }
}

export function formatLabel(format: CafeSession["format"]): string | null {
  if (format === "conversation") return site.cafe.formats.conversation
  if (format === "libre") return site.cafe.formats.libre
  return null
}
