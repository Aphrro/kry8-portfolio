import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/sections/Hero"
import Stats from "@/components/sections/Stats"
import Projects from "@/components/sections/Projects"
import Services from "@/components/sections/Services"
import Pricing from "@/components/sections/Pricing"
import Contact from "@/components/sections/Contact"
import JsonLd from "@/components/seo/JsonLd"

export default function Home() {
  return (
    <>
      <JsonLd />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Stats />
        <Projects />
        <Services />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
