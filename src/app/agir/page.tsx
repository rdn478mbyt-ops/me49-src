import type { Metadata } from "next"

import { Container, Kicker, Section } from "@/components/layout"
import { LinkButton } from "@/components/link-button"
import { PageHeader } from "@/components/page-header"
import { RegisterCta } from "@/components/register-cta"
import { site } from "@/config/site"
import { getContactLabel } from "@/lib/content"

export const metadata: Metadata = {
  title: "Agir",
  description:
    "Proposer un projet au Mouvement européen Maine-et-Loire, se faire aider, puis adhérer si l'envie de rester se confirme.",
}

const steps = [
  {
    n: "01",
    title: "Proposer un projet",
    body: "Une idée née un soir d'Europe, dans un amphi ou dans une rue d'Angers peut suffire. On l'écrit, on la pose sur la table, et l'on voit ensemble comment l'aider à exister.",
  },
  {
    n: "02",
    title: "Se faire aider",
    body: "Le Mouvement peut prêter des mains, un calendrier et le réseau national. On avance concrètement, à un rythme que l'on peut tenir.",
  },
  {
    n: "03",
    title: "Adhérer, plus tard",
    body: "Quand vous voudrez rester et porter quelque chose, l'adhésion se fait sur le site national du Mouvement européen.",
  },
]

export default function AgirPage() {
  const contact = getContactLabel()

  return (
    <>
      <PageHeader kicker="Agir" title="Faire exister une idée">
        Si vous avez un projet, dites-le-nous. On commence souvent autour d&apos;un
        verre, à La Cour, puis on voit comment aider.
      </PageHeader>

      <Section>
        <Container>
          <ol className="grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <li
                key={step.n}
                className="border-t-4 border-me-gold bg-white p-6 sm:p-8"
              >
                <p className="text-sm font-semibold text-me-navy">{step.n}</p>
                <h2 className="mt-3 text-2xl font-semibold">{step.title}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Kicker>Proposer</Kicker>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Écrivez-nous, ou dites-le à table
            </h2>
            <p className="mt-4 text-lg leading-relaxed">
              Un message suffit, et venir le dire un mercredi aussi. Les projets
              prennent forme plus facilement quand on se voit.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Contact : {site.city}.{" "}
              {contact.href ? (
                <a href={contact.href} className="text-me-navy underline">
                  {contact.label}
                </a>
              ) : (
                <span>{contact.label}</span>
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <RegisterCta size="lg" />
              <LinkButton href="/nous-rencontrer" variant="outline">
                Nous rencontrer
              </LinkButton>
            </div>
          </div>
          <div className="border border-border p-6 sm:p-8">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Beaucoup commencent par un soir à La Cour. Celles et ceux qui
              s&apos;y plaisent reviennent, puis, s&apos;ils le souhaitent,
              proposent un projet.
            </p>
          </div>
        </Container>
      </Section>

      <Section id="adherer">
        <Container className="max-w-3xl">
          <Kicker>Ensuite</Kicker>
          <h2 className="text-3xl font-semibold tracking-tight">Adhérer</h2>
          <p className="mt-4 text-lg leading-relaxed">
            L&apos;adhésion se fait sur le site national du Mouvement européen.
          </p>
          <p className="mt-8">
            <a
              href={site.adhererUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center bg-me-navy px-6 text-base font-medium text-white hover:bg-me-navy/90"
            >
              Adhérer
            </a>
          </p>
        </Container>
      </Section>
    </>
  )
}
