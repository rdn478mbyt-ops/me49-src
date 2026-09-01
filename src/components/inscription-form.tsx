import { site } from "@/config/site"
import {
  formatFrenchDate,
  getPublicSessionTitle,
  getSessionAfter,
  getSessionByDate,
} from "@/lib/content"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function InscriptionForm({
  ok,
  error,
}: {
  ok?: boolean
  error?: string
}) {
  if (ok) {
    return (
      <div
        role="status"
        className="border-t-4 border-me-gold bg-white p-6 sm:p-8"
      >
        <p className="text-xs font-semibold tracking-[0.18em] text-me-navy uppercase">
          Inscription reçue
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          Merci, on vous attend.
        </h2>
        <p className="mt-4 text-lg leading-relaxed">{thankYouLabel()}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          On se retrouve à La Cour, mardi 8 septembre à 20h.
        </p>
      </div>
    )
  }

  return (
    <form action="/api/inscrire" method="post" className="space-y-5" noValidate>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Site web</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="prenom" label="Prénom" required>
          <Input
            id="prenom"
            name="prenom"
            autoComplete="given-name"
            required
            maxLength={80}
          />
        </Field>
        <Field id="nom" label="Nom" required>
          <Input
            id="nom"
            name="nom"
            autoComplete="family-name"
            required
            maxLength={80}
          />
        </Field>
      </div>

      <Field id="email" label="E-mail" required>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          maxLength={120}
        />
      </Field>

      <Field id="personnes" label="Nombre de personnes" required>
        <select
          id="personnes"
          name="personnes"
          defaultValue="1"
          required
          className="h-11 w-full border border-border bg-white px-3 text-base outline-none focus-visible:border-me-navy focus-visible:ring-2 focus-visible:ring-me-navy/20"
        >
          {Array.from({ length: site.registration.maxParty }, (_, i) => i + 1).map(
            (n) => (
              <option key={n} value={n}>
                {n === 1 ? "1 personne" : `${n} personnes`}
              </option>
            )
          )}
        </select>
      </Field>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-me-navy">
          C&apos;est une première fois&nbsp;?
        </legend>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="premiereFois" value="oui" required />
            Oui
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="premiereFois" value="non" />
            Non, je reviens
          </label>
        </div>
      </fieldset>

      <Field id="commentaire" label="Un mot, si vous voulez (optionnel)">
        <Textarea
          id="commentaire"
          name="commentaire"
          maxLength={500}
          placeholder="Allergies, langue, un ami qui vous amène…"
        />
      </Field>

      {error ? (
        <div role="alert" className="space-y-2 text-sm font-medium text-red-700">
          <p>{error}</p>
          <p>
            <a
              className="underline underline-offset-2"
              href={`mailto:${site.registration.notifyEmail}?subject=${encodeURIComponent("Inscription — Soir d'Europe 8 septembre")}`}
            >
              Écrire à {site.registration.notifyEmail}
            </a>
          </p>
        </div>
      ) : null}

      <Button type="submit" size="xl" className="w-full sm:w-auto">
        {site.registration.cta}
      </Button>
      <p className="text-xs text-muted-foreground">
        Ces informations servent à prévenir La Cour, le matin du 8, du nombre
        de personnes.
      </p>
    </form>
  )
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required ? (
          <span className="text-muted-foreground"> · obligatoire</span>
        ) : null}
      </Label>
      {children}
    </div>
  )
}

function thankYouLabel(): string {
  const current = getSessionByDate(site.registration.eventDate)
  const following = getSessionAfter(site.registration.eventDate)
  const currentLabel = current
    ? `${getPublicSessionTitle(current)}, ${formatFrenchDate(current.date)}, ${site.cafe.timeLabel}`
    : `mardi 8 septembre 2026, ${site.cafe.timeLabel}`
  const followingLabel = following
    ? `${formatFrenchDate(following.date)}, ${site.cafe.timeLabel}`
    : "mercredi 16 septembre 2026, 20h"
  return `On vous attend le ${currentLabel}. Le soir suivant : ${followingLabel}, même lieu.`
}
