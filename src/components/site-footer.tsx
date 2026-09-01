import Link from "next/link"

import { BrandMark } from "@/components/brand-mark"
import { Container } from "@/components/layout"
import { nav, site } from "@/config/site"
import { getContactLabel } from "@/lib/content"

export function SiteFooter() {
  const contact = getContactLabel()

  return (
    <footer className="mt-auto border-t border-border bg-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <BrandMark />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Section locale du{" "}
            <a
              href={site.nationalUrl}
              className="underline decoration-me-gold underline-offset-2 hover:text-me-navy"
            >
              {site.nationalName}
            </a>
            . Association citoyenne à {site.city}, autour des soirs
            d&apos;Europe et de projets ouverts.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-me-navy uppercase">
            Aller
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-me-navy">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={site.registration.path} className="hover:text-me-navy">
                {site.registration.cta}
              </Link>
            </li>
            <li>
              <a
                href={site.adhererUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-me-navy"
              >
                Adhérer
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-me-navy uppercase">
            Contact
          </p>
          <p className="mt-3 text-sm">{site.city}</p>
          <p className="mt-2 text-sm">
            {contact.href ? (
              <a href={contact.href} className="hover:text-me-navy">
                {contact.label}
              </a>
            ) : (
              <span className="text-muted-foreground">
                {contact.label}
                <span className="mt-1 block text-xs">
                  Placeholder — aucune adresse e-mail n&apos;est publiée tant
                  qu&apos;elle n&apos;est pas ouverte.
                </span>
              </span>
            )}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Présidence : {site.president}
          </p>
        </div>
      </Container>
      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {site.shortName} · {site.name}</p>
          <p>{site.cafe.name} · un mercredi sur deux à Angers</p>
        </Container>
      </div>
    </footer>
  )
}
