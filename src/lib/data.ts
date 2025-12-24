// Type-safe icon names for services
export type ServiceIconName = 'Globe' | 'Smartphone' | 'Rocket'

export interface Service {
  icon: ServiceIconName
  title: string
  description: string
  features: string[]
}

export const siteConfig = {
  name: "KRY8",
  title: "Développeur Web & Créateur de Solutions SaaS",
  description: "Je transforme vos idées en applications web modernes et performantes.",
  email: "kry8.studio@protonmail.com",
  phone: "+33 6 03 56 18 32",
  location: "Suisse / France",
}

export const stats = [
  { value: "2+", label: "Projets livrés" },
  { value: "100%", label: "Clients satisfaits" },
  { value: "Next.js", label: "Spécialité" },
  { value: "CH/FR", label: "Marché" },
]

export const projects = [
  {
    id: 1,
    title: "Suryoodaya",
    description: "Site vitrine pour un cabinet de massage et thérapie ayurvédique",
    image: "/projects/suryoodaya.png",
    tags: ["Next.js", "Tailwind", "Stripe"],
    url: "https://www.suryoodaya.com/",
    featured: true,
  },
  {
    id: 2,
    title: "Cap Toi M'aime",
    description: "Plateforme annuaire de thérapeutes spécialisés dans le refus scolaire anxieux",
    image: "/projects/captoimaime.png",
    tags: ["Next.js", "Supabase", "Stripe"],
    url: "#",
  },
  {
    id: 3,
    title: "ProSanté/Kidzen",
    description: "Annuaire de professionnels de santé pour enfants avec réservation",
    image: "/projects/prosante.png",
    tags: ["Next.js", "MySQL", "GitHub Actions"],
    url: "#",
  },
  {
    id: 4,
    title: "CleanMind",
    description: "Application de bien-être mental avec analyse de pensées par IA",
    image: "/projects/cleanmind.png",
    tags: ["Next.js", "Supabase", "OpenAI"],
    url: "#",
  },
]

export const services: Service[] = [
  {
    icon: "Globe",
    title: "Sites Vitrine",
    description: "Sites modernes et responsive pour présenter votre activité",
    features: ["Design sur mesure", "Responsive", "SEO optimisé", "Formulaire contact"],
  },
  {
    icon: "Smartphone",
    title: "Applications Web",
    description: "Apps avec authentification, dashboard et paiements",
    features: ["Authentification", "Dashboard", "Paiements Stripe", "Base de données"],
  },
  {
    icon: "Rocket",
    title: "Solutions SaaS",
    description: "Plateformes multi-tenant et scalables sur mesure",
    features: ["Multi-tenant", "Analytics", "API custom", "Scalable"],
  },
]

export const pricing = [
  {
    title: "Site Vitrine",
    price: "Dès 800 CHF",
    features: [
      "Design moderne",
      "100% Responsive",
      "SEO optimisé",
      "Formulaire de contact",
    ],
    popular: false,
  },
  {
    title: "Application Web",
    price: "Dès 5'000 CHF",
    features: [
      "Tout Site Vitrine +",
      "Authentification users",
      "Dashboard admin",
      "Intégration paiements",
      "Base de données",
    ],
    popular: true,
  },
  {
    title: "Solution SaaS",
    price: "Dès 10'000 CHF",
    features: [
      "Tout App Web +",
      "Architecture multi-tenant",
      "Analytics avancés",
      "API personnalisée",
      "Infrastructure scalable",
    ],
    popular: false,
  },
]

export const navLinks = [
  { href: "#accueil", label: "Accueil" },
  { href: "#projets", label: "Projets" },
  { href: "#services", label: "Services" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#contact", label: "Contact" },
]
