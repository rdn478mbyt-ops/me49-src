import type { Metadata } from "next"

import { Container, Kicker, Section } from "@/components/layout"
import { LinkButton } from "@/components/link-button"
import { PageHeader } from "@/components/page-header"
import { RegisterCta } from "@/components/register-cta"
import { VenueBlock } from "@/components/venue-block"
import { site } from "@/config/site"
import { formatFrenchDate, getUpcomingCafeDateList } from "@/lib/content"

export const metadata: Metadata = {
  title: "8 septembre — premier soir de la rentrée",
  description:
    "Le premier soir d'Europe de la rentrée a eu lieu le mardi 8 septembre 2026 à La Cour, à Angers. Le prochain rendez-vous est mercredi 16 septembre, puis un mercredi sur deux.",
}

export default function HuitSeptembreArchivePage() {
  const laterDates = getUpcomingCafeDateList()

  return (
    <>
      <PageHeader kicker={site.cafe.name} title={site.archive.label}>
        Le mardi 8 septembre 2026 a ouvert l&apos;automne à La Cour, 23 rue de
        la Roë à Angers. La suite des soirs d&apos;Europe commence le{" "}
        {formatFrenchDate(site.registration.eventDate)}, puis un mercredi sur
        deux, à 20h.
      </PageHeader>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <Kicker>Archive</Kicker>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Le prochain soir, c&apos;est le 16 septembre
            </h2>
            <p className="mt-4 text-lg leading-relaxed">
              Les inscriptions pour le 8 septembre sont closes. Pour venir au
              prochain rendez-vous, dites-nous simplement si vous serez à La
              Cour le mercredi 16 septembre.
            </p>
            <VenueBlock className="mt-8" />
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              Un mercredi sur deux, à la même heure, au même endroit
              {laterDates ? ` : ${laterDates}.` : "."}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <RegisterCta />
              <LinkButton href="/agenda" variant="outline">
                Voir l&apos;agenda
              </LinkButton>
            </div>
          </div>
          <aside className="border border-border bg-white p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.18em] text-me-navy uppercase">
              Prochain soir
            </p>
            <p className="mt-2 text-lg font-semibold tracking-tight">
              {formatFrenchDate(site.registration.eventDate)},{" "}
              {site.cafe.timeLabel}
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              On ouvre la table à La Cour. À partir de ce mercredi-là, le
              rythme est simple : un mercredi sur deux, à 20h.
            </p>
            <p className="mt-6">
              <RegisterCta />
            </p>
          </aside>
        </Container>
      </Section>
    </>
  )
}
