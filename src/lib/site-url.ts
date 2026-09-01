const LOCAL_DEV = "http://127.0.0.1:4349"
const LIVE = "https://me49.vercel.app"

function isLocalhost(url: string): boolean {
  return /127\.0\.0\.1|localhost/.test(url)
}

/** URL publique du site. En production Vercel, jamais localhost. */
export function publicSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  if (explicit && !isLocalhost(explicit)) return explicit

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(
    /^https?:\/\//,
    ""
  )
  if (vercelHost && !isLocalhost(vercelHost)) {
    return `https://${vercelHost}`
  }

  if (process.env.VERCEL) return LIVE
  return explicit || LOCAL_DEV
}
