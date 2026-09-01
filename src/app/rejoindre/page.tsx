import type { Metadata } from "next"

import { CafePanel } from "@/components/cafe-panel"
import { Container, Kicker, Section } from "@/components/layout"
import { LinkButton } from "@/components/link-button"
import { PageHeader } from "@/components/page-header"
import { RegisterCta } from "@/components/register-cta"
import { site } from "@/config/site"
import { getConfirmedVenue } from "@/lib/content"

export const metadata: Metadata = {
  title: "Rejoindre la communauté",
  description:
    "Pour rejoindre le Mouvement européen Maine-et-Loire, le plus simple est de venir à un soir d'Europe, à 20h à La Cour. Premier rendez-vous : mardi 8 septembre, puis un mercredi sur deux.",
}

export default function RejoindrePage() {
  const venue = getConfirmedVenue()
  return (
    <>
      <PageHeader kicker="Communauté" title="Venez à La Cour">
        Pour nous rejoindre, le plus simple est de venir à un soir d&apos;Europe.
        {` ${site.cafe.rhythm}`} L&apos;adhésion se fait sur le site national du
        Mouvement européen.
      </PageHeader>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <Kicker>Par où commencer</Kicker>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Un mercredi à 20h suffit
            </h2>
            <p className="mt-6 text-lg leading-relaxed">
              La plupart des personnes commencent par venir
              {venue ? `, à ${venue.name}` : " à Angers"}, un mercredi à 20h.
              Le premier rendez-vous de rentrée est mardi 8 septembre. Si la
              soirée vous plaît, vous pouvez revenir, puis contribuer à votre
              rythme.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <RegisterCta />
              <LinkButton
                href={site.adhererUrl}
                variant="outline"
                target="_blank"
                rel="noreferrer"
              >
                Adhérer
              </LinkButton>
            </div>
          </div>
          <CafePanel />
        </Container>
      </Section>

      <Section className="bg-white">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Qui peut venir
          </h2>
          <p className="mt-4 text-lg leading-relaxed">
            Habitantes et habitants du Maine-et-Loire, Européens qui vivent
            ici, étudiants internationaux, anciens Erasmus et curieux&nbsp;: la
            table est ouverte.
          </p>
        </Container>
      </Section>
    </>
  )
}
