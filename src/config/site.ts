export type CafeFormat = "libre" | "conversation"

export type CafeSession = {
  date: string
  /** Nom de travail interne. Ne pas afficher tel quel s'il sonne brouillon. */
  title: string
  /** Libellé public. À défaut : « Les soirs d'Europe ». */
  publicTitle?: string
  note: string
  format?: CafeFormat
}

export const site = {
  name: "Mouvement Européen · Maine-et-Loire",
  shortName: "ME49",
  signature: "L'Europe se vit ici.",
  promise: "Rencontrer. Comprendre. Agir.",
  city: "Angers",
  department: "Maine-et-Loire",
  president: "William Benaïssa",
  nationalUrl: "https://mouvement-europeen.eu/",
  nationalName: "Mouvement Européen – France",

  
  contactEmail: "william.benaissa@gmail.com",
  contactEmailPlaceholder: "contact@ (à renseigner)",

  
  registration: {
    path: "/8-septembre",
    eventDate: "2026-09-08",
    cta: "S'inscrire au 8 septembre",
    notifyEmail: "william.benaissa@gmail.com",
    maxParty: 6,
  },

  
  adhererUrl: "https://mouvement-europeen.eu/adherer/",

  partners: [
    {
      name: "Maison de l’Europe Angers & Maine-et-Loire (EUROPE DIRECT)",
      url: "http://www.maisondeleurope49.eu/",
    },
    {
      name: "Les Jeunes Européens – Angers",
      url: "https://www.jeunes-europeens.org/Les-Jeunes-Europeens-Angers",
    },
  ] as { name: string; url: string }[],

  logo: {
    
    nationalSrc: "/brand/logo-me-france.svg",
    nationalAlt: "Mouvement Européen – France",
    
    useLocal: false,
    localSrc: "/brand/logo-me49.svg",
    localAlt: "Mouvement Européen · Maine-et-Loire",
  },

  cafe: {
    name: "Les soirs d'Europe",
    tagline: "Un verre, l'Europe.",
    nextLabel: "Prochain soir d'Europe",
    formats: {
      libre: "Soir libre",
      conversation: "Soir + conversation",
    },
    timeLabel: "20h",
    cadence: "Un mercredi sur deux, 20h à Angers",
    rhythm:
      "Le premier rendez-vous de rentrée est mardi 8 septembre. À partir du 16 septembre, c’est un mercredi sur deux, à 20h, à La Cour.",
    
    venue: {
      confirmed: true,
      name: "La Cour",
      qualifier: "Bar & Restaurant",
      address: "23 rue de la Roë",
      postalCode: "49100",
      city: "Angers",
      url: "https://www.lacour-angers.com",
      phone: "02 41 96 05 88",
    },
  },

  
  extraMoments: [] as MomentInput[],
}

export const cafeCalendar: CafeSession[] = [
  {
    date: "2026-09-08",
    title: "Hello Europe",
    publicTitle: "Premier soir de la rentrée",
    note: "Sans invité.",
    format: "libre",
  },
  {
    date: "2026-09-16",
    title: "Les soirs d'Europe",
    note: "",
  },
  {
    date: "2026-09-30",
    title: "Les soirs d'Europe",
    note: "",
  },
  {
    date: "2026-10-14",
    title: "Les soirs d'Europe",
    note: "",
  },
  {
    date: "2026-10-28",
    title: "Les soirs d'Europe",
    note: "",
  },
  {
    date: "2026-11-11",
    title: "Les soirs d'Europe",
    note: "",
  },
  {
    date: "2026-11-25",
    title: "Les soirs d'Europe",
    note: "",
  },
]

export type MomentKind = "cafe" | "conference" | "projet"

export type MomentInput = {
  id: string
  kind: Exclude<MomentKind, "cafe">
  title: string
  summary: string
  href: string
  date: string | null
}

export const nav = [
  { href: "/", label: "Accueil" },
  { href: "/nous-rencontrer", label: "Nous rencontrer" },
  { href: "/agenda", label: "Agenda" },
  { href: "/le-mouvement", label: "Le Mouvement" },
] as const

export const communityPath = [
  "Découvrir",
  "Venir",
  "Revenir",
  "Contribuer",
  "Porter",
] as const
