import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00040F",
}

export const metadata: Metadata = {
  title: "KRY8 | Développeur Web & Solutions SaaS",
  description: "Je transforme vos idées en applications web modernes et performantes. Spécialisé Next.js, React, et solutions SaaS sur mesure en Suisse et France.",
  keywords: ["développeur web", "Next.js", "React", "SaaS", "Suisse", "France", "freelance", "Vercel", "applications web"],
  authors: [{ name: "KRY8" }],
  creator: "KRY8",
  publisher: "KRY8",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kry8.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KRY8 | Développeur Web & Solutions SaaS",
    description: "Je transforme vos idées en applications web modernes et performantes.",
    type: "website",
    locale: "fr_FR",
    siteName: "KRY8",
  },
  twitter: {
    card: "summary_large_image",
    title: "KRY8 | Développeur Web & Solutions SaaS",
    description: "Je transforme vos idées en applications web modernes et performantes.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        {children}
      </body>
    </html>
  )
}
