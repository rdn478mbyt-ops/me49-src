import type { Metadata } from "next"

import { InscriptionForm } from "@/components/inscription-form"
import { Container, Kicker, Section } from "@/components/layout"
import { PageHeader } from "@/components/page-header"
import { VenueBlock } from "@/components/venue-block"
import { cafeCalendar, site } from "@/config/site"
import { formatFrenchDate, getSessionAfter } from "@/lib/content"

export const metadata: Metadata = {
  title: "S'inscrire au 8 septembre",
  description:
    "Nous vous invitons au premier soir de la rentrée, mardi 8 septembre 2026 à 20h, à La Cour, 23 rue de la Roë à Angers.",
}

export default async function HuitSeptembrePage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; erreur?: string }>
}) {
  const params = await searchParams
  const following = getSessionAfter(site.registration.eventDate)
  const laterDates = cafeCalendar
    .filter((session) => session.date > site.registration.eventDate)
    .map((session) => formatFrenchDate(session.date))

  return (
    <>
      <PageHeader kicker={site.cafe.name} title="Premier soir de la rentrée">
        Nous vous invitons mardi 8 septembre 2026 à 20h, à La Cour, 23 rue de
        la Roë à Angers. On ouvre l&apos;automne autour d&apos;un verre, sans
        invité particulier.
      </PageHeader>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <Kicker>Mardi 8 septembre</Kicker>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Dites-nous si vous venez
            </h2>
            <p className="mt-4 text-lg leading-relaxed">
              Un petit mot d&apos;inscription nous aide à prévenir La Cour, le
              matin du 8, du nombre de personnes autour des tables. Si vous
              hésitez encore, inscrivez-vous tout de même&nbsp;: mieux vaut une
              chaise de trop.
            </p>
            <VenueBlock className="mt-8" />
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              Les soirs suivants auront lieu au même endroit, à la même
              heure, un mercredi sur deux&nbsp;: {laterDates.join(", ")}.
              {following
                ? ` Le rendez-vous d'après le 8 sera le ${formatFrenchDate(following.date)}.`
                : null}
            </p>
          </div>
          <div className="border border-border bg-white p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.18em] text-me-navy uppercase">
              Inscription
            </p>
            <p className="mt-2 text-lg font-semibold tracking-tight">
              {site.registration.cta}
            </p>
            <div className="mt-6">
              <InscriptionForm
                ok={params.ok === "1"}
                error={params.erreur}
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
