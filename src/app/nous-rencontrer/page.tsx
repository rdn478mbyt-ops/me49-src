import type { Metadata } from "next"

import { CafePanel } from "@/components/cafe-panel"
import { CafeSchedule } from "@/components/cafe-schedule"
import { Container, Kicker, Section } from "@/components/layout"
import { RegisterCta } from "@/components/register-cta"
import { PageHeader } from "@/components/page-header"
import { VenueBlock } from "@/components/venue-block"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { site } from "@/config/site"
import { getCafeDisplay, getConfirmedVenue } from "@/lib/content"

export const metadata: Metadata = {
  title: "Nous rencontrer",
  description:
    "Les soirs d'Europe se tiennent un mercredi sur deux à 20h, à La Cour, 23 rue de la Roë à Angers. Premier rendez-vous de rentrée : mardi 8 septembre 2026.",
}

export default function NousRencontrerPage() {
  const cafe = getCafeDisplay()
  const venue = getConfirmedVenue()

  const faqs = [
    {
      value: "jour",
      question: "Quel jour ?",
      answer: site.cafe.rhythm,
    },
    {
      value: "soiree",
      question: "À quoi ressemble la soirée ?",
      answer:
        "On se retrouve à La Cour. Certains soirs, un invité nous expose un sujet qui pourra par la suite alimenter nos discussions. Le 8 septembre, premier soir de la rentrée, se passe sans invité.",
    },
    {
      value: "membre",
      question: "Faut-il être adhérent ?",
      answer:
        "Vous pouvez venir sans adhérer. L'adhésion se fait sur le site national du Mouvement européen.",
    },
    {
      value: "expertise",
      question: "Faut-il s'y connaître sur l'Union européenne ?",
      answer:
        "On se forme ensemble. Une envie de parler d'Europe suffit.",
    },
    {
      value: "inscription",
      question: "Faut-il s'inscrire ?",
      answer:
        "Pour le 8 septembre, un formulaire court nous aide à prévenir La Cour le matin même. Les dates suivantes sont publiées ici, à l'agenda.",
    },
  ]

  return (
    <>
      <PageHeader kicker={site.cafe.name} title="Nous rencontrer">
        {site.cafe.rhythm}
        {cafe.hasDate
          ? ` Le prochain, c'est le ${cafe.title.toLowerCase()}, le ${cafe.headline}.`
          : ` ${site.cafe.cadence}.`}
      </PageHeader>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <CafePanel variant="compact" />
          <div>
            <Kicker>Le rythme</Kicker>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Un mercredi sur deux, 20h
            </h2>
            <p className="mt-4 text-lg leading-relaxed">
              {site.cafe.rhythm} La plupart du temps, c&apos;est un soir
              libre&nbsp;: on se retrouve et l&apos;on parle. Quand un invité
              nous rejoint, il nous expose un sujet qui pourra par la suite
              alimenter nos discussions.
              {cafe.session?.format === "libre" && cafe.session.date === site.registration.eventDate
                ? " Le 8 septembre sera un soir libre, sans invité."
                : cafe.session?.format === "libre" && cafe.session.note
                  ? ` ${cafe.session.note}`
                  : null}
            </p>
            <p className="mt-6">
              <RegisterCta size="lg" />
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container className="grid gap-10 lg:grid-cols-2">
          <article className="border-t-4 border-me-gold pt-6">
            <h2 className="text-2xl font-semibold">{site.cafe.formats.libre}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              On arrive, on s&apos;assoit, et l&apos;on parle de ce qui nous
              arrive ici, en Europe, ou entre les deux. La conversation se
              fait au fil de la table.
            </p>
          </article>
          <article className="border-t-4 border-me-gold pt-6">
            <h2 className="text-2xl font-semibold">
              {site.cafe.formats.conversation}
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Même heure, même simplicité : un invité nous expose un sujet qui
              pourra par la suite alimenter nos discussions.
            </p>
          </article>
        </Container>
      </Section>

      <Section id="faq" className="scroll-mt-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Kicker>Y aller</Kicker>
            <h2 className="text-3xl font-semibold tracking-tight">
              La Cour, en centre-ville
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {venue ? (
                <>
                  Nous nous retrouvons à {venue.name}, {venue.address},{" "}
                  {venue.city}.
                </>
              ) : (
                <>
                  Le lieu exact sera annoncé ici dès qu&apos;il sera confirmé.
                  En attendant, retenez le rythme&nbsp;: {site.cafe.cadence}.
                </>
              )}
            </p>
            {venue ? <VenueBlock className="mt-8" /> : null}
          </div>
          <Accordion multiple className="border-t border-border">
            {faqs.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger className="py-4 text-base font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  <p>{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <Kicker>Calendrier</Kicker>
          <h2 className="text-3xl font-semibold tracking-tight">
            L&apos;automne à La Cour
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {site.cafe.rhythm}
            {venue ? ` À ${venue.name}.` : " À Angers."}
          </p>
          <CafeSchedule className="mt-8" />
        </Container>
      </Section>
    </>
  )
}
