import Link from "next/link"

import { CafePanel } from "@/components/cafe-panel"
import { Container, Kicker, Section } from "@/components/layout"
import { LinkButton } from "@/components/link-button"
import { RegisterCta } from "@/components/register-cta"
import { site } from "@/config/site"
import { getHomepageMoments, getConfirmedVenue } from "@/lib/content"

export default function HomePage() {
  const moments = getHomepageMoments()
  const venue = getConfirmedVenue()
  const place = venue
    ? `${venue.name}, ${venue.address}`
    : "Angers"

  return (
    <>
      <section className="border-b border-border bg-white">
        <Container className="grid gap-10 py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:py-20">
          <div>
            <Kicker>{site.name}</Kicker>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
              {site.signature}
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed">
              Le Mouvement européen Maine-et-Loire rassemble celles et ceux qui
              ont envie de vivre l&apos;Europe à Angers. On se retrouve à{" "}
              {place}, à 20h. {site.cafe.rhythm}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <RegisterCta />
              <LinkButton href="/agenda" variant="outline">
                Voir l&apos;agenda
              </LinkButton>
            </div>
          </div>
          <CafePanel />
        </Container>
      </section>

      <Section>
        <Container>
          <Kicker>Les soirs d&apos;Europe</Kicker>
          <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Un rendez-vous régulier, à La Cour
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">
            À partir du 16 septembre, un mercredi sur deux, à 20h, nous
            ouvrons une table au bar-restaurant La Cour, 23 rue de la Roë. Le
            premier rendez-vous de rentrée reste mardi 8 septembre. On y parle
            de ce qui se passe ici et en Europe.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="border border-border bg-white p-6 sm:p-8">
              <h3 className="text-2xl font-semibold">
                {site.cafe.formats.libre}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                La plupart des soirs, on se retrouve simplement. Chacun arrive,
                s&apos;assoit, et la conversation se fait au fil de la table.
              </p>
            </article>
            <article className="border border-border bg-white p-6 sm:p-8">
              <h3 className="text-2xl font-semibold">
                {site.cafe.formats.conversation}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                De temps en temps, un invité nous expose un sujet qui pourra
                ensuite alimenter nos discussions.
              </p>
            </article>
          </div>
          <p className="mt-8">
            <RegisterCta />
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <Kicker>À venir</Kicker>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Les prochaines dates
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {site.cafe.rhythm} Les soirs suivants restent à La Cour, à la
            même heure.
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {moments.map((moment) => (
              <li key={moment.id}>
                <Link
                  href={moment.href}
                  className="flex h-full flex-col border border-border bg-me-paper p-6 transition-colors hover:border-me-navy"
                >
                  <p className="text-xs font-semibold tracking-[0.18em] text-me-navy uppercase">
                    {moment.kindLabel}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold">{moment.title}</h3>
                  <p className="mt-2 text-sm font-medium text-me-navy">
                    {moment.dateLabel}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {moment.summary}
                  </p>
                  <span className="mt-5 text-sm font-medium text-me-navy">
                    {moment.href === site.registration.path
                      ? "S'inscrire →"
                      : "Voir l'agenda →"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="border-t border-border bg-white">
        <Container>
          <Kicker>Le Mouvement</Kicker>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Une association citoyenne à Angers
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">
            Nous sommes la section locale du Mouvement Européen – France.
            Retrouvez toutes les informations sur le site du Mouvement
            européen – France.
          </p>
          <p className="mt-8">
            <LinkButton
              href={site.nationalUrl}
              variant="outline"
              target="_blank"
              rel="noreferrer"
            >
              Mouvement européen – France
            </LinkButton>
          </p>
        </Container>
      </Section>
    </>
  )
}
