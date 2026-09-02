const LOCAL_DEV = "http://127.0.0.1:4349"
const LIVE = "https://mouvement-europeen49.fr"

function isLocalhost(url: string): boolean {
  return /127\.0\.0\.1|localhost/.test(url)
}

function isLegacyVercelHost(url: string): boolean {
  return /(?:^|[/.])me49\.vercel\.app(?:\/|$)/.test(url)
}

/** URL publique du site. En production Vercel, jamais localhost. */
export function publicSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  if (explicit && !isLocalhost(explicit) && !isLegacyVercelHost(explicit)) {
    return explicit
  }

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(
    /^https?:\/\//,
    ""
  )
  if (
    vercelHost &&
    !isLocalhost(vercelHost) &&
    !isLegacyVercelHost(vercelHost)
  ) {
    return `https://${vercelHost}`
  }

  if (process.env.VERCEL) return LIVE
  return explicit && !isLegacyVercelHost(explicit) ? explicit : LOCAL_DEV
}
