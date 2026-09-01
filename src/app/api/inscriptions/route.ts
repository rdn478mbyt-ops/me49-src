import { NextResponse } from "next/server"

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
    const header = "id,createdAt,prenom,nom,email,personnes,premiereFois,commentaire"
    const lines = summary.rows.map((row) =>
      [
        row.id,
        row.createdAt,
        csv(row.prenom),
        csv(row.nom),
        csv(row.email),
        row.personnes,
        row.premiereFois ? "oui" : "non",
        csv(row.commentaire),
      ].join(",")
    )
    const csvBody = [header, ...lines].join("\n")
    return new NextResponse(csvBody, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="inscriptions-8-septembre.csv"`,
      },
    })
  }

  return NextResponse.json({
    event: "Les soirs d'Europe · 8 septembre 2026",
    inscriptions: summary.count,
    tetes: summary.heads,
    rows: summary.rows,
  })
}

function csv(value: string): string {
  const escaped = value.replaceAll('"', '""')
  return `"${escaped}"`
}
