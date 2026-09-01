import type { Metadata, Viewport } from "next"
import { Work_Sans } from "next/font/google"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { site } from "@/config/site"
import { publicSiteUrl } from "@/lib/site-url"

import "./globals.css"

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL(publicSiteUrl()),
  title: {
    default: `${site.name} — ${site.signature}`,
    template: `%s · ${site.shortName}`,
  },
  description:
    "Le Mouvement européen Maine-et-Loire rassemble celles et ceux qui ont envie de vivre l'Europe à Angers. Les soirs d'Europe ont lieu un mercredi sur deux à 20h, à La Cour. Premier rendez-vous de rentrée : mardi 8 septembre 2026.",
  applicationName: site.name,
  authors: [{ name: site.name }],
  openGraph: {
    locale: "fr_FR",
    type: "website",
    siteName: site.name,
    title: `${site.signature} — ${site.name}`,
    description:
      "Les soirs d'Europe à Angers : un mercredi sur deux, 20h, à La Cour. Premier rendez-vous de rentrée le mardi 8 septembre 2026.",
  },
}

export const viewport: Viewport = {
  themeColor: "#0c3f98",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${workSans.variable} h-full antialiased`}>
      <body className={`${workSans.className} flex min-h-full flex-col`}>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-me-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
