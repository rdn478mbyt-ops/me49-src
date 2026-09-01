import type { Metadata } from "next"

import { Container } from "@/components/layout"
import { LinkButton } from "@/components/link-button"

export const metadata: Metadata = {
  title: "Page introuvable",
}

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="text-xs font-semibold tracking-[0.22em] text-me-navy uppercase">
        404
      </p>
      <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
        Cette page n&apos;existe pas.
      </h1>
      <p className="mt-4 max-w-lg text-lg text-muted-foreground">
        Elle a peut-être changé d&apos;adresse, ou elle n&apos;a pas encore
        été écrite. Vous pouvez revenir à l&apos;accueil ou nous retrouver un
        mercredi à La Cour.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <LinkButton href="/">Accueil</LinkButton>
        <LinkButton href="/nous-rencontrer" variant="outline">
          Nous rencontrer
        </LinkButton>
      </div>
    </Container>
  )
}
