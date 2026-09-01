import type { Metadata } from "next"

import { Container, Kicker, Section } from "@/components/layout"
import { LinkButton } from "@/components/link-button"
import { PageHeader } from "@/components/page-header"
import { RegisterCta } from "@/components/register-cta"
import { site } from "@/config/site"
import { getContactLabel } from "@/lib/content"

export const metadata: Metadata = {
  title: "Le Mouvement",
  description:
    "Le Mouvement européen Maine-et-Loire est une association citoyenne à Angers, section locale du Mouvement Européen – France.",
}

export default function LeMouvementPage() {
  const contact = getContactLabel()

  return (
    <>
      <PageHeader kicker="Le Mouvement" title="Qui nous sommes">
        Le Mouvement européen Maine-et-Loire est une association citoyenne. Nous
        rapprochons l&apos;Europe des habitants d&apos;Angers et du département
        à travers des rendez-vous ouverts, à commencer par Les soirs
        d&apos;Europe.
      </PageHeader>

      <Section id="association">
        <Container className="max-w-3xl">
          <Kicker>L&apos;association</Kicker>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Une section locale à Angers
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed">
            <p>
              Le ME49 est ouvert aux habitants du Maine-et-Loire, aux Européens
              qui vivent ici, aux étudiants internationaux, aux anciens Erasmus
              et à toutes celles et ceux que le sujet intéresse. On se forme
              ensemble, autour de tables et de projets concrets.
            </p>
            <p>
              Notre rendez-vous le plus régulier s&apos;appelle Les soirs
              d&apos;Europe&nbsp;: un mercredi sur deux, à 20h, à La Cour. Le
              premier rendez-vous de rentrée est mardi 8 septembre. Après
              quelques soirées, celles et ceux qui le souhaitent peuvent
              contribuer ou porter un projet.
            </p>
          </div>
        </Container>
      </Section>

      <Section id="histoire" className="bg-white">
        <Container className="max-w-3xl">
          <Kicker>Histoire</Kicker>
          <h2 className="text-3xl font-semibold tracking-tight">
            Un mouvement né en 1948
          </h2>
          <p className="mt-6 text-lg leading-relaxed">
            Le Mouvement Européen – France existe depuis 1948. Il rassemble des
            sections locales, le plus souvent à l&apos;échelle départementale,
            pour faire vivre le débat public sur l&apos;Europe.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            Le ME49 en est la section en Maine-et-Loire, avec Angers pour
            centre de gravité. Cette page raconte l&apos;essentiel&nbsp;;
            l&apos;histoire se continue surtout autour de la table.
          </p>
        </Container>
      </Section>

      <Section id="reseau">
        <Container className="max-w-3xl">
          <Kicker>Réseau</Kicker>
          <h2 className="text-3xl font-semibold tracking-tight">
            Un réseau national et européen
          </h2>
          <p className="mt-6 text-lg leading-relaxed">
            Nous sommes une section du{" "}
            <a
              href={site.nationalUrl}
              className="font-medium text-me-navy underline decoration-me-gold underline-offset-4"
            >
              Mouvement Européen – France
            </a>
            , lui-même membre du Mouvement Européen International. Les Jeunes
            Européens – France en sont la branche jeunesse nationale.
          </p>
        </Container>
      </Section>

      <Section id="equipe" className="bg-white">
        <Container>
          <Kicker>Équipe</Kicker>
          <h2 className="text-3xl font-semibold tracking-tight">
            Qui porte, aujourd&apos;hui
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Le bureau se présentera ici avec les autres membres, au fil de la
            rentrée.
          </p>
          <article className="mt-8 max-w-md border border-border bg-me-paper p-6">
            <p className="text-xs font-semibold tracking-[0.18em] text-me-navy uppercase">
              Présidence
            </p>
            <p className="mt-3 text-2xl font-semibold">{site.president}</p>
          </article>
        </Container>
      </Section>

      <Section id="gouvernance">
        <Container className="max-w-3xl">
          <Kicker>Gouvernance</Kicker>
          <h2 className="text-3xl font-semibold tracking-tight">
            Une association qui se transmet
          </h2>
          <p className="mt-6 text-lg leading-relaxed">
            Les décisions se prennent avec celles et ceux qui viennent,
            reviennent et contribuent. Le bureau se constitue au fil du temps,
            et les clés se transmettent progressivement.
          </p>
        </Container>
      </Section>

      <Section id="partenaires" className="bg-white">
        <Container>
          <Kicker>Partenaires</Kicker>
          <h2 className="text-3xl font-semibold tracking-tight">
            En Maine-et-Loire
          </h2>
          <ul className="mt-8 max-w-2xl space-y-4">
            {site.partners.map((partner) => (
              <li key={partner.url}>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg font-medium text-me-navy underline decoration-me-gold underline-offset-4"
                >
                  {partner.name}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="contact">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <Kicker>Contact</Kicker>
            <h2 className="text-3xl font-semibold tracking-tight">Angers</h2>
            <p className="mt-4 text-lg leading-relaxed">
              Pour nous écrire ou pour nous rejoindre un mercredi, c&apos;est
              ici. Le rendez-vous habituel reste Les soirs d&apos;Europe, à La
              Cour.
            </p>
            <p className="mt-4">
              {contact.href ? (
                <a
                  href={contact.href}
                  className="font-medium text-me-navy underline decoration-me-gold underline-offset-4"
                >
                  {contact.label}
                </a>
              ) : (
                <span className="text-muted-foreground">
                  {contact.label}
                </span>
              )}
            </p>
            <p className="mt-6">
              <RegisterCta size="lg" />
            </p>
          </div>
          <div id="adhesion">
            <Kicker>Adhésion</Kicker>
            <h2 className="text-3xl font-semibold tracking-tight">
              Soutenez la section en adhérant à l&apos;association
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              L&apos;adhésion se fait sur le site national du Mouvement
              européen.
            </p>
            <p className="mt-6">
              <LinkButton
                href={site.adhererUrl}
                target="_blank"
                rel="noreferrer"
              >
                Adhérer
              </LinkButton>
            </p>
            <p className="mt-6">
              <LinkButton href="/agir" variant="outline">
                Proposer un projet
              </LinkButton>
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}
