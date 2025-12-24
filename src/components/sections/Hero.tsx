'use client'

import { motion } from 'framer-motion'
import Button from '../ui/Button'
import GradientText from '../ui/GradientText'
import { siteConfig } from '@/lib/data'

export default function Hero() {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[128px]" />

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full bg-accent/60"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-6 h-6 rounded-full bg-accent/40"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-3 h-3 rounded-full bg-accent/50"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-text-secondary text-sm">Disponible pour de nouveaux projets</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Développeur Web
              <br />
              & Créateur de
              <br />
              <GradientText>Solutions SaaS</GradientText>
            </h1>

            <p className="text-text-secondary text-lg mb-8 max-w-lg">
              {siteConfig.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href="#projets" icon>
                Voir mes projets
              </Button>
              <Button href="#contact" variant="secondary">
                Me contacter
              </Button>
            </div>
          </motion.div>

          {/* Right content - Floating mockups */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main card mockup */}
            <motion.div
              className="relative z-10"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="glass-card p-6 max-w-sm ml-auto">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                    <span className="text-primary font-bold">K8</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">KRY8 Studio</p>
                    <p className="text-text-secondary text-sm">Next.js Expert</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-white/10 rounded-full w-full" />
                  <div className="h-2 bg-white/10 rounded-full w-4/5" />
                  <div className="h-2 bg-white/10 rounded-full w-3/5" />
                </div>
              </div>
            </motion.div>

            {/* Secondary floating card - Projet livré */}
            <motion.div
              className="absolute -top-4 -left-12 z-20"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="glass-card p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 text-xl">✓</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Projet livré</p>
                    <p className="text-text-muted text-xs">100% satisfait</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tech stack floating card */}
            <motion.div
              className="absolute -bottom-8 -left-4 z-20"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="glass-card p-3 flex gap-2">
                {['Next.js', 'React', 'Tailwind'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Decorative sphere */}
            <motion.div
              className="absolute -top-8 right-0 w-24 h-24 rounded-full bg-gradient-to-br from-accent/40 to-transparent blur-sm"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
