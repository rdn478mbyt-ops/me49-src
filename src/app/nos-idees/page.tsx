import type { Metadata } from "next"

import { EmptyState } from "@/components/empty-state"
import { Container, Kicker, Section } from "@/components/layout"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Nos idées",
  description:
    "Portraits Mon Europe, idées, notes et contributions du Mouvement européen Maine-et-Loire. La page se remplira au fil des rencontres.",
}

export default function NosIdeesPage() {
  return (
    <>
      <PageHeader kicker="Comprendre" title="Nos idées">
        Cette page accueillera des portraits, des notes et des contributions
        au fil des rencontres.
      </PageHeader>

      <Section className="bg-white">
        <Container>
          <Kicker>Portraits</Kicker>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Mon Europe
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Des récits du Maine-et-Loire trouveront leur place ici, au fil des
            mois.
          </p>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-6 lg:grid-cols-3">
          <EmptyState
            title="Idées européennes"
            href="/agir"
            cta="Proposer une idée"
          >
            <p>
              Les premières idées publiées ici viendront de membres, après
              avoir été discutées un soir d&apos;Europe ou portées en projet.
            </p>
          </EmptyState>
          <EmptyState
            title="Notes de conférence"
            href="/agenda"
            cta="Voir l'agenda"
          >
            <p>
              Les notes seront ajoutées après les soirées, lorsqu&apos;il y
              aura quelque chose à relire.
            </p>
          </EmptyState>
          <EmptyState
            title="Contributions"
            href="/rejoindre"
            cta="Nous rejoindre"
          >
            <p>
              Textes, reco et comptes rendus trouveront leur place ici dès
              qu&apos;ils auront été écrits.
            </p>
          </EmptyState>
        </Container>
      </Section>
    </>
  )
}
