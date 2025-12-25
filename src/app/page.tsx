import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/sections/Hero"
import Features from "@/components/sections/Features"
import Projects from "@/components/sections/Projects"
import Services from "@/components/sections/Services"
import Pricing from "@/components/sections/Pricing"
import Testimonials from "@/components/sections/Testimonials"
import Contact from "@/components/sections/Contact"
import JsonLd from "@/components/seo/JsonLd"
import AnimatedBackground from "@/components/ui/AnimatedBackground"
import ScrollProgress from "@/components/ui/ScrollProgress"
import CursorGlow from "@/components/ui/CursorGlow"
import BackToTop from "@/components/ui/BackToTop"

export default function Home() {
  return (
    <>
      <JsonLd />
      <ScrollProgress />
      <CursorGlow />
      <AnimatedBackground />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Features />
        <Projects />
        <Services />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
