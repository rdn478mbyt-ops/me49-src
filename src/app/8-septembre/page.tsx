import type { Metadata } from "next"

import { Container, Kicker, Section } from "@/components/layout"
import { LinkButton } from "@/components/link-button"
import { PageHeader } from "@/components/page-header"
import { RegisterCta } from "@/components/register-cta"
import { VenueBlock } from "@/components/venue-block"
import { site } from "@/config/site"
import { formatFrenchDate } from "@/lib/content"

export const metadata: Metadata = {
  title: "8 septembre — premier soir de la rentrée",
  description:
    "Le premier soir de la rentrée a eu lieu mardi 8 septembre 2026 à La Cour. Le rendez-vous suivant : mercredi 16 septembre, 20h, même lieu.",
}

export default function HuitSeptembreArchivePage() {
  return (
    <>
      <PageHeader kicker={site.cafe.name} title="Premier soir de la rentrée">
        Le mardi 8 septembre 2026 a ouvert l&apos;automne à La Cour. Les
        inscriptions pour cette date sont closes. On se retrouve le mercredi
        suivant.
      </PageHeader>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <Kicker>Archive</Kicker>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Rendez-vous le 16 septembre
            </h2>
            <p className="mt-4 text-lg leading-relaxed">
              Les soirs d&apos;Europe continuent un mercredi sur deux, à 20h,
              à La Cour, 23 rue de la Roë. Prochain soir&nbsp;:{" "}
              {formatFrenchDate(site.registration.eventDate)},{" "}
              {site.cafe.timeLabel}.
            </p>
            <VenueBlock className="mt-8" />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <RegisterCta />
              <LinkButton href="/agenda" variant="outline">
                Voir l&apos;agenda
              </LinkButton>
            </div>
          </div>
          <aside className="border border-border bg-white p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.18em] text-me-navy uppercase">
              Suite de l&apos;automne
            </p>
            <p className="mt-3 text-lg leading-relaxed">
              {site.cafe.rhythm}
            </p>
            <p className="mt-6">
              <LinkButton href={site.registration.path} size="lg">
                {site.registration.cta}
              </LinkButton>
            </p>
          </aside>
        </Container>
      </Section>
    </>
  )
}
