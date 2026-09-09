import type { MetadataRoute } from "next"

import { nav, site } from "@/config/site"
import { publicSiteUrl } from "@/lib/site-url"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = publicSiteUrl()
  const routes = [
    ...nav.map((item) => item.href),
    site.registration.path,
    site.archive.path,
    "/rejoindre",
  ]

  return routes.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority:
      path === "/" || path === "/nous-rencontrer" || path === site.registration.path
        ? 1
        : path === site.archive.path
          ? 0.3
          : 0.6,
  }))
}
