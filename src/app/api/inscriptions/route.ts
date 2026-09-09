import { NextResponse } from "next/server"

import { site } from "@/config/site"
import { getRegistrationEventTitle } from "@/lib/content"
import { summarizeInscriptions } from "@/lib/inscriptions"

export const dynamic = "force-dynamic"

function authorized(request: Request): boolean {
  const secret = process.env.INSCRIPTIONS_SECRET
  if (!secret) return false
  const header = request.headers.get("authorization")
  const bearer = header?.startsWith("Bearer ") ? header.slice(7) : ""
  const query = new URL(request.url).searchParams.get("key")
  return bearer === secret || query === secret
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 })
  }

  const summary = await summarizeInscriptions()
  const format = new URL(request.url).searchParams.get("format")

  if (format === "csv") {
    const header = "id,createdAt,eventDate,prenom,nom,email,personnes,premiereFois,commentaire"
    const lines = summary.rows.map((row) =>
      [
        row.id,
        row.createdAt,
        row.eventDate,
        csv(row.prenom),
        csv(row.nom),
        csv(row.email),
        row.personnes,
        row.premiereFois ? "oui" : "non",
        csv(row.commentaire),
      ].join(",")
    )
    const csvBody = [header, ...lines].join("\n")
    const slug = site.registration.path.replace(/^\//, "")
    return new NextResponse(csvBody, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="inscriptions-${slug}.csv"`,
      },
    })
  }

  return NextResponse.json({
    event: getRegistrationEventTitle(),
    inscriptions: summary.count,
    tetes: summary.heads,
    rows: summary.rows,
  })
}

function csv(value: string): string {
  const escaped = value.replaceAll('"', '""')
  return `"${escaped}"`
}
