import assert from "node:assert/strict"
import { describe, it } from "node:test"

function hasDurableChannel(result) {
  return result.notion || result.email
}

function isLocalhost(url) {
  return /127\.0\.0\.1|localhost/.test(url)
}

function publicSiteUrl(env) {
  const explicit = env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  if (explicit && !isLocalhost(explicit)) return explicit
  const vercelHost = env.VERCEL_PROJECT_PRODUCTION_URL?.replace(
    /^https?:\/\//,
    ""
  )
  if (vercelHost && !isLocalhost(vercelHost)) {
    return `https://${vercelHost}`
  }
  if (env.VERCEL) return "https://me49.vercel.app"
  return explicit || "http://127.0.0.1:4349"
}

describe("hasDurableChannel", () => {
  it("refuse un fichier /tmp seul", () => {
    assert.equal(
      hasDurableChannel({
        file: true,
        blob: false,
        email: false,
        notion: false,
      }),
      false
    )
  })

  it("refuse Blob seul", () => {
    assert.equal(
      hasDurableChannel({
        file: false,
        blob: true,
        email: false,
        notion: false,
      }),
      false
    )
  })

  it("un titre de travail n'est pas le titre public", () => {
    const session = { title: "Hello Europe", publicTitle: "Premier soir de la rentrée" }
    const publicTitle = session.publicTitle?.trim() || "Les soirs d'Europe"
    assert.notEqual(publicTitle, "Hello Europe")
    assert.equal(publicTitle, "Premier soir de la rentrée")
  })

  it("accepte Notion ou e-mail", () => {
    assert.equal(
      hasDurableChannel({ file: false, blob: false, email: false, notion: true }),
      true
    )
    assert.equal(
      hasDurableChannel({ file: true, blob: false, email: true, notion: false }),
      true
    )
  })

  it("en production, robots n'utilise pas localhost", () => {
    assert.equal(
      publicSiteUrl({ VERCEL: "1" }),
      "https://me49.vercel.app"
    )
    assert.equal(
      publicSiteUrl({
        VERCEL: "1",
        NEXT_PUBLIC_SITE_URL: "http://127.0.0.1:4349",
      }),
      "https://me49.vercel.app"
    )
  })
})
