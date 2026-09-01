import { mkdir, appendFile, readFile } from "node:fs/promises"
import path from "node:path"

import { site } from "@/config/site"

export type Inscription = {
  id: string
  createdAt: string
  eventDate: string
  eventTitle: string
  prenom: string
  nom: string
  email: string
  personnes: number
  premiereFois: boolean
  commentaire: string
}

export type PersistResult = {
  file: boolean
  blob: boolean
  email: boolean
  notion: boolean
}

const EVENT_DATE = site.registration.eventDate
const EVENT_TITLE = "Les soirs d'Europe — 8 septembre"

/** Base «ée par William pour le 8 septembre. */
export const NOTION_DATABASE_ID =
  process.env.NOTION_DATABASE_ID ?? "0113b1a0e499473082b72c86ab838ae6"
const NOTION_DATA_SOURCE_ID =
  process.env.NOTION_DATA_SOURCE_ID ?? "887f207e-5d49-44cd-8d1d-0ef48f4083c1"
const NOTION_VERSION = "2022-06-28"

export function localStoreDir(): string {
  if (process.env.VERCEL) return "/tmp/me49-inscriptions"
  return path.join(process.cwd(), "data")
}

function jsonlPath(): string {
  return path.join(localStoreDir(), `inscriptions-${EVENT_DATE}.jsonl`)
}

export function newInscriptionId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export function isEphemeralRuntime(): boolean {
  return Boolean(process.env.VERCEL)
}

/**
 * Un canal que William peut vraiment lire : Notion ou e-mail.
 * Blob /tmp ne compte pas : le visiteur ne doit pas voir un succès.
 */
export function hasDurableChannel(result: PersistResult): boolean {
  return result.notion || result.email
}

export async function persistInscription(
  record: Inscription
): Promise<PersistResult> {
  const file = await persistToFile(record).catch((error) => {
    console.error("inscription:file", error)
    return false
  })
  const blob = await persistToBlob(record).catch((error) => {
    console.error("inscription:blob", error)
    return false
  })

  const notion = await persistToNotion(record).catch((error) => {
    console.error("inscription:notion", error)
    return false
  })

  const email = await notifyByEmail(record).catch((error) => {
    console.error("inscription:email", error)
    return false
  })

  const result = { file, blob, email, notion }

  if (!hasDurableChannel(result)) {
    throw new Error(
      "Aucun canal durable (Notion ou e-mail) n'a enregistré l'inscription."
    )
  }

  return result
}

async function persistToFile(record: Inscription): Promise<boolean> {
  const dir = localStoreDir()
  await mkdir(dir, { recursive: true })
  await appendFile(jsonlPath(), `${JSON.stringify(record)}\n`, "utf8")
  return true
}

async function persistToBlob(record: Inscription): Promise<boolean> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return false
  const { put } = await import("@vercel/blob")
  await put(
    `inscriptions/${record.eventDate}/${record.id}.json`,
    JSON.stringify(record, null, 2),
    {
      access: "private",
      addRandomSuffix: false,
      contentType: "application/json",
    }
  )
  return true
}

async function persistToNotion(record: Inscription): Promise<boolean> {
  const token = process.env.NOTION_TOKEN
  if (!token) {
    console.error("inscription:notion missing NOTION_TOKEN")
    return false
  }

  const properties: Record<string, unknown> = {
    Nom: {
      title: [{ type: "text", text: { content: clip(record.nom, 200) } }],
    },
    "Prénom": {
      rich_text: [{ type: "text", text: { content: clip(record.prenom, 200) } }],
    },
    "E-mail": { email: record.email },
    Personnes: { number: record.personnes },
    "Première fois": {
      select: { name: record.premiereFois ? "oui" : "non" },
    },
    Source: { select: { name: "site" } },
    Soir: { date: { start: record.eventDate } },
  }

  if (record.commentaire) {
    properties.Commentaire = {
      rich_text: [
        { type: "text", text: { content: clip(record.commentaire, 1900) } },
      ],
    }
  }

  const parents = [
    { database_id: NOTION_DATABASE_ID.replaceAll("-", "") },
    { data_source_id: NOTION_DATA_SOURCE_ID.replaceAll("-", "") },
  ]

  let lastError = ""
  for (const parent of parents) {
    const created = await createNotionPage(token, parent, properties)
    if (created.ok) return true
    lastError = created.body
    if (created.body.includes("Soir") && created.status === 400) {
      const withoutSoir = { ...properties }
      delete withoutSoir.Soir
      const retry = await createNotionPage(token, parent, withoutSoir)
      if (retry.ok) return true
      lastError = retry.body
    }
  }

  console.error("inscription:notion", lastError)
  return false
}

async function createNotionPage(
  token: string,
  parent: { database_id: string } | { data_source_id: string },
  properties: Record<string, unknown>
): Promise<{ ok: boolean; status: number; body: string }> {
  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Notion-Version": NOTION_VERSION,
    },
    body: JSON.stringify({ parent, properties }),
  })
  if (response.ok) return { ok: true, status: response.status, body: "" }
  return {
    ok: false,
    status: response.status,
    body: await response.text(),
  }
}

function clip(value: string, max: number): string {
  return value.length <= max ? value : value.slice(0, max)
}

async function notifyByEmail(record: Inscription): Promise<boolean> {
  const to = site.registration.notifyEmail
  const subject = `[ME49] +${record.personnes} · ${record.prenom} ${record.nom} · ${EVENT_TITLE}`
  const body = formatInscriptionEmail(record)
  return notifyViaResend(to, subject, body)
}

export function formatInscriptionEmail(record: Inscription): string {
  return [
    `Nouvelle inscription — ${EVENT_TITLE}`,
    `Mardi 8 septembre 2026, 20h, La Cour, Angers.`,
    "",
    `Prénom : ${record.prenom}`,
    `Nom : ${record.nom}`,
    `E-mail : ${record.email}`,
    `Personnes : ${record.personnes}`,
    `Première fois : ${record.premiereFois ? "oui" : "non"}`,
    `Commentaire : ${record.commentaire || "—"}`,
    "",
    `Reçu le ${record.createdAt}`,
    `Réf. ${record.id}`,
  ].join("\n")
}

async function notifyViaResend(
  to: string,
  subject: string,
  body: string
): Promise<boolean> {
  const key = process.env.RESEND_API_KEY
  if (!key) return false
  const from =
    process.env.RESEND_FROM ?? "Les soirs d'Europe <onboarding@resend.dev>"
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], subject, text: body }),
  })
  if (!response.ok) {
    console.error("inscription:resend", response.status, await response.text())
    return false
  }
  return true
}

export async function listLocalInscriptions(): Promise<Inscription[]> {
  try {
    const raw = await readFile(jsonlPath(), "utf8")
    return raw
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as Inscription)
  } catch {
    return []
  }
}

export async function listBlobInscriptions(): Promise<Inscription[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return []
  const { list, get } = await import("@vercel/blob")
  const { blobs } = await list({ prefix: `inscriptions/${EVENT_DATE}/` })
  const rows: Inscription[] = []
  for (const blob of blobs) {
    const file = await get(blob.pathname ?? blob.url, {
      access: "private",
      useCache: false,
    })
    if (!file || file.statusCode === 304 || !file.stream) continue
    const text = await streamToString(file.stream)
    rows.push(JSON.parse(text) as Inscription)
  }
  return rows
}

export async function listNotionInscriptions(): Promise<Inscription[]> {
  const token = process.env.NOTION_TOKEN
  if (!token) return []

  const response = await fetch(
    `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID.replaceAll("-", "")}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({ page_size: 100 }),
    }
  )
  if (!response.ok) {
    console.error("inscription:notion-list", response.status, await response.text())
    return []
  }

  const data = (await response.json()) as {
    results?: Array<{
      id: string
      created_time?: string
      properties?: Record<string, NotionProperty>
    }>
  }

  return (data.results ?? [])
    .map((page) => notionPageToInscription(page))
    .filter((row): row is Inscription => row !== null)
}

type NotionProperty = {
  type?: string
  title?: Array<{ plain_text?: string }>
  rich_text?: Array<{ plain_text?: string }>
  email?: string | null
  number?: number | null
  select?: { name?: string } | null
}

function notionPageToInscription(page: {
  id: string
  created_time?: string
  properties?: Record<string, NotionProperty>
}): Inscription | null {
  const props = page.properties ?? {}
  const nom = plain(props.Nom)
  const prenom = plain(props["Prénom"])
  const email = props["E-mail"]?.email ?? ""
  if (!nom && !prenom && !email) return null
  return {
    id: page.id,
    createdAt: page.created_time ?? new Date().toISOString(),
    eventDate: EVENT_DATE,
    eventTitle: EVENT_TITLE,
    prenom,
    nom,
    email,
    personnes: props.Personnes?.number ?? 1,
    premiereFois: props["Première fois"]?.select?.name === "oui",
    commentaire: plain(props.Commentaire),
  }
}

function plain(property?: NotionProperty): string {
  if (!property) return ""
  if (property.title) {
    return property.title.map((part) => part.plain_text ?? "").join("")
  }
  if (property.rich_text) {
    return property.rich_text.map((part) => part.plain_text ?? "").join("")
  }
  return ""
}

async function streamToString(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader()
  const chunks: Uint8Array[] = []
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    if (value) chunks.push(value)
  }
  const total = chunks.reduce((n, c) => n + c.length, 0)
  const merged = new Uint8Array(total)
  let offset = 0
  for (const chunk of chunks) {
    merged.set(chunk, offset)
    offset += chunk.length
  }
  return new TextDecoder().decode(merged)
}

export async function summarizeInscriptions(): Promise<{
  count: number
  heads: number
  rows: Inscription[]
}> {
  const [fromFile, fromBlob, fromNotion] = await Promise.all([
    listLocalInscriptions(),
    listBlobInscriptions(),
    listNotionInscriptions(),
  ])
  const byId = new Map<string, Inscription>()
  for (const row of [...fromFile, ...fromBlob, ...fromNotion]) {
    byId.set(row.id, row)
  }
  const rows = [...byId.values()].sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt)
  )
  return {
    count: rows.length,
    heads: rows.reduce((sum, row) => sum + row.personnes, 0),
    rows,
  }
}

export function buildInscription(input: {
  prenom: string
  nom: string
  email: string
  personnes: number
  premiereFois: boolean
  commentaire: string
}): Inscription {
  return {
    id: newInscriptionId(),
    createdAt: new Date().toISOString(),
    eventDate: EVENT_DATE,
    eventTitle: EVENT_TITLE,
    ...input,
  }
}
