import type { Metadata } from "next"
import Link from "next/link"

import { CafePanel } from "@/components/cafe-panel"
import { CafeSchedule } from "@/components/cafe-schedule"
import { EmptyState } from "@/components/empty-state"
import { Container, Kicker, Section } from "@/components/layout"
import { PageHeader } from "@/components/page-header"
import { RegisterCta } from "@/components/register-cta"
import { VenueBlock } from "@/components/venue-block"
import { site } from "@/config/site"
import { getCafeDisplay, getConfirmedVenue } from "@/lib/content"

export const metadata: Metadata = {
  title: "Agenda",
  description:
    "Agenda des soirs d'Europe à Angers : un mercredi sur deux à 20h, à La Cour. Premier rendez-vous de rentrée : mardi 8 septembre 2026.",
}

export default function AgendaPage() {
  const cafe = getCafeDisplay()
  const venue = getConfirmedVenue()

  return (
    <>
      <PageHeader kicker="Agenda" title="Les rendez-vous de l'automne">
        {site.cafe.rhythm}
        {cafe.hasDate
          ? ` Nous vous attendons le ${cafe.when}.`
          : ` ${site.cafe.cadence}.`}
      </PageHeader>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <Kicker>Récurrent</Kicker>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {site.cafe.name}
            </h2>
            <p className="mt-4 text-lg leading-relaxed">
              {site.cafe.rhythm}
              {venue ? ` À ${venue.name}, ${venue.address}.` : " À Angers."}{" "}
              La plupart des soirs sont libres. Parfois, un invité nous
              expose un sujet qui pourra ensuite alimenter nos discussions.
            </p>
            {venue ? <VenueBlock className="mt-8" /> : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <RegisterCta size="lg" />
              <Link
                href="/nous-rencontrer#faq"
                className="inline-flex items-center font-medium text-me-navy underline decoration-me-gold decoration-2 underline-offset-4"
              >
                Questions fréquentes →
              </Link>
            </div>
          </div>
          <CafePanel variant="compact" />
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <Kicker>{site.cafe.name}</Kicker>
          <h2 className="text-3xl font-semibold tracking-tight">
            Automne 2026
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Mardi 8 septembre, puis les mercredis 16 et 30 septembre, 14 et
            28 octobre, 11 et 25 novembre, toujours à 20h
            {venue ? `, à ${venue.name}.` : "."}
          </p>
          <CafeSchedule className="mt-8" />
        </Container>
      </Section>

      <Section>
        <Container>
          <Kicker>Plus tard</Kicker>
          <h2 className="mb-8 text-3xl font-semibold tracking-tight">
            Conférences, projets, visites
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <EmptyState title="Conférences">
              <p>
                Dès qu&apos;une conférence sera confirmée, elle apparaîtra
                ici, avec la date et le lieu.
              </p>
            </EmptyState>
            <EmptyState title="Projets" href="/agir" cta="Proposer un projet">
              <p>
                Les projets portés par des membres seront publiés ici, au fur
                et à mesure.
              </p>
            </EmptyState>
            <EmptyState title="Visites">
              <p>
                Les déplacements organisés ensemble seront annoncés ici.
              </p>
            </EmptyState>
          </div>
        </Container>
      </Section>
    </>
  )
}
