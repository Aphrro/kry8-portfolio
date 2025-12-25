import { siteConfig } from '@/lib/data'

export default function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kry8.studio'

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: 'Développeur Web & SaaS',
    description: siteConfig.description,
    url: baseUrl,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CH',
    },
    sameAs: [],
    knowsAbout: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'SaaS Development',
      'Web Development',
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: baseUrl,
    description: siteConfig.description,
    inLanguage: 'fr-FR',
    author: {
      '@type': 'Person',
      name: siteConfig.name,
    },
  }

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${siteConfig.name} - ${siteConfig.title}`,
    description: siteConfig.description,
    url: baseUrl,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    priceRange: '€€€',
    areaServed: [
      {
        '@type': 'Country',
        name: 'Suisse',
      },
      {
        '@type': 'Country',
        name: 'France',
      },
    ],
    serviceType: [
      'Développement Web',
      'Applications SaaS',
      'Sites Vitrine',
      'Applications Web',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
    </>
  )
}
