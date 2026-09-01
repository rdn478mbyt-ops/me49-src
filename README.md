# Mouvement Européen · Maine-et-Loire (ME49)

Site du Mouvement européen Maine-et-Loire. Interface en français. Le rendez-vous public s’appelle **Les soirs d'Europe** : un mercredi sur deux, à 20h, à La Cour (Angers). Exception de rentrée : **mardi 8 septembre 2026**.

Signature (une seule fois, à l’accueil) : **L’Europe se vit ici.**

Identité : charte du [Mouvement Européen – France](https://mouvement-europeen.eu/) (Work Sans, bleu `#0061AF` / `#0c3f98`, or `#FFE600`, orange `#ff8d33`). Logo national officiel, source `mouvement-europeen.eu`.

## Lancer en local

```bash
npm install
npm run dev
```

Le serveur écoute sur [http://127.0.0.1:4349](http://127.0.0.1:4349).

```bash
npm run build
npm start -- --port 4349
```

Variable optionnelle pour le domaine public (sitemap, Open Graph) :

```bash
NEXT_PUBLIC_SITE_URL=https://votre-domaine.fr
```

## Inscriptions (8 septembre)

Page publique : **`/8-septembre`**.

Chaque envoi réel doit atterrir dans la base Notion **Inscriptions — Soir d’Europe 8 sept** et, si `RESEND_API_KEY` est posé, dans la boîte `william.benaissa@gmail.com`. Un fichier local `data/` sert seulement en développement. Sur Vercel, un écriture dans `/tmp` ne compte pas : le formulaire n’affiche un succès que si Notion, Resend ou Blob a bien enregistré la ligne.

Variables côté serveur (Vercel, projet **`me49`**, celui de [me49.vercel.app](https://me49.vercel.app/)) :

```bash
NOTION_TOKEN=secret_ou_ntn_…
NOTION_DATABASE_ID=0113b1a0e499473082b72c86ab838ae6
RESEND_API_KEY=re_…          # optionnel, pour le mail
NEXT_PUBLIC_SITE_URL=https://me49.vercel.app
```

L’intégration Notion doit avoir accès à cette seule base (pas besoin de tout le workspace).

Pour compter les têtes (JSON ou CSV) :

```bash
curl -H "Authorization: Bearer $INSCRIPTIONS_SECRET" https://votre-domaine.fr/api/inscriptions
curl "https://votre-domaine.fr/api/inscriptions?key=$INSCRIPTIONS_SECRET&format=csv"
```

## Mettre à jour Les soirs d'Europe

Tout se règle dans **`src/config/site.ts`**.

Le nom public du format est `cafe.name` (« Les soirs d'Europe », décidé le 25 août 2026) et l’accroche `cafe.tagline` (« Un verre, l'Europe. »). Ne pas publier « Café européen » sur le site public : ce nom est déjà porté par la Maison de l'Europe (séance thématique, un mardi par mois, Le Punch).

### Prochain як soir et calendrier

Le prochain soir affiché est la **première date encore à venir** de `cafeCalendar`. Pour ajouter ou corriger une soirée, éditer ce tableau :

```ts
{
  date: "2026-09-08",     // AAAA-MM-JJ
  title: "Hello Europe",          // nom de travail, non affiché
  publicTitle: "Premier soir de la rentrée",
  note: "Sans invité.",
  format: "libre",        // optionnel : "libre" | "conversation"
},
```

Formats internes : **Soir libre** (`libre`) et **Soir + conversation** (`conversation`). Quand une date est passée, elle disparaît d’elle-même de l’accueil, de Nous rencontrer et de l’agenda.

### Lieu

Le lieu public est `cafe.venue`. Tant que `confirmed` est `true`, Accueil, Agenda et Nous rencontrer affichent La Cour.

```ts
venue: {
  confirmed: true,
  name: "La Cour",
  qualifier: "Bar & Restaurant",
  address: "23 rue de la Roë",
  postalCode: "49100",
  city: "Angers",
  url: "https://www.lacour-angers.com",
  phone: "02 41 96 05 88", // listing public Destination Angers
},
```

Pour retirer le lieu de l’interface (réservation en suspens), passer `confirmed` à `false`. Ne pas inventer de téléphone : n’en renseigner un que s’il figure sur une source publique.

## Remplacer le logo

Fichier actuel : `public/brand/logo-me-france.svg` (logo officiel national).

Quand le logo local officiel ME49 sera disponible :

1. Déposer le fichier dans `public/brand/logo-me49.svg` (ou `.png`).
2. Dans `src/config/site.ts`, passer `logo.useLocal` à `true`.
3. Ajuster `logo.localSrc` et `logo.localAlt` si le nom de fichier change.

Le wordmark « Maine-et-Loire » reste à côté du logo, en mention de section locale.

## Autres champs du même fichier

| Champ | Effet |
| --- | --- |
| `contactEmail` | Vide = libellé `contact@ (à renseigner)`, sans lien. Une adresse active le `mailto:`. |
| `adhererUrl` | Lien d’adhésion : site national du Mouvement européen (`https://mouvement-europeen.eu/adherer/`). Pas HelloAsso. |
| `partners` | Partenaires locaux confirmés uniquement. |
| `extraMoments` | Cartes « En ce moment » en plus des soirs d'Europe (conférences, projets). Laisser vide tant qu’il n’y a rien de réel. Maximum 2 en plus du rendez-vous récurrent. |
| `president` | Seule personne nommée à ce jour : William Benaïssa. |

Ne pas inventer de membres de bureau, de partenaires, d’adresses de siège, de citations ou d’événements passés.

## Pages

- `/` Accueil
- `/nous-rencontrer` Les soirs d'Europe, prochaine date, FAQ, accès (entrée de nav)
- `/nos-idees` Mon Europe, idées, notes, contributions (états vides)
- `/agir` Proposer → aider → adhérer
- `/agenda` Soirs d’automne + états vides (conférences, projets, visites)
- `/le-mouvement` Association, histoire, réseau, équipe, contact, adhésion
- `/rejoindre` Comment nous rejoindre

## Technique

Next.js App Router, TypeScript, Tailwind, shadcn/ui, locale `fr`. Contenu statique, pas de faux CMS. Prêt à déployer (Vercel ou tout hébergeur Node).
