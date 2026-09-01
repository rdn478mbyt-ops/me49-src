import { NextResponse } from "next/server"

import { site } from "@/config/site"
import { buildInscription, persistInscription } from "@/lib/inscriptions"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function clean(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : ""
}

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function publicOrigin(request: Request): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  const hostHeader =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? ""
  const host = hostHeader.split(",")[0]?.trim() ?? ""
  const proto = request.headers.get("x-forwarded-proto") ?? "https"

  if (host.startsWith("127.0.0.1") || host.startsWith("localhost")) {
    return `${proto}://${host}`
  }
  if (host === "me49.vercel.app" || host.endsWith(".me49.vercel.app")) {
    return `${proto}://${host}`
  }
  return configured || "https://me49.vercel.app"
}

function fail(origin: string, message: string) {
  const url = new URL(site.registration.path, origin)
  url.searchParams.set("erreur", message)
  return NextResponse.redirect(url, 303)
}

export async function POST(request: Request) {
  const origin = publicOrigin(request)
  const formData = await request.formData()

  if (clean(formData.get("website"))) {
    const url = new URL(site.registration.path, origin)
    url.searchParams.set("ok", "1")
    return NextResponse.redirect(url, 303)
  }

  const prenom = clean(formData.get("prenom"))
  const nom = clean(formData.get("nom"))
  const email = clean(formData.get("email")).toLowerCase()
  const commentaire = clean(formData.get("commentaire"))
  const premiereRaw = clean(formData.get("premiereFois"))
  const personnes = Number(clean(formData.get("personnes")))

  if (prenom.length < 2 || prenom.length > 80) {
    return fail(origin, "Indiquez un prénom.")
  }
  if (nom.length < 1 || nom.length > 80) {
    return fail(origin, "Indiquez un nom.")
  }
  if (!validEmail(email) || email.length > 120) {
    return fail(origin, "Indiquez un e-mail valide.")
  }
  if (
    !Number.isInteger(personnes) ||
    personnes < 1 ||
    personnes > site.registration.maxParty
  ) {
    return fail(
      origin,
      `Le nombre de personnes va de 1 à ${site.registration.maxParty}.`
    )
  }
  if (premiereRaw !== "oui" && premiereRaw !== "non") {
    return fail(origin, "Dites-nous si c'est une première fois.")
  }
  if (commentaire.length > 500) {
    return fail(origin, "Le commentaire est un peu long (500 caractères).")
  }

  const record = buildInscription({
    prenom,
    nom,
    email,
    personnes,
    premiereFois: premiereRaw === "oui",
    commentaire,
  })

  try {
    const stored = await persistInscription(record)
    console.info("inscription:ok", {
      id: record.id,
      notion: stored.notion,
      email: stored.email,
      blob: stored.blob,
    })
  } catch (error) {
    console.error("inscription:persist", error)
    return fail(
      origin,
      "L'inscription n'a pas été enregistrée. Réessayez, ou écrivez-nous à william.benaissa@gmail.com."
    )
  }

  const url = new URL(site.registration.path, origin)
  url.searchParams.set("ok", "1")
  return NextResponse.redirect(url, 303)
}
