'use client'

import { motion } from 'framer-motion'
import Button from '../ui/Button'
import GradientText from '../ui/GradientText'
import TypeWriter from '../ui/TypeWriter'
import MagneticButton from '../ui/MagneticButton'

const heroWords = ['Solutions SaaS', 'Apps Web', 'Sites Vitrine', 'Plateformes']

export default function Hero() {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/10 to-transparent border border-accent/20 mb-6"
            >
              <span className="text-accent text-sm font-medium">✦</span>
              <span className="text-text-secondary text-sm">Disponible pour de nouveaux projets</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              La Nouvelle
              <br />
              <GradientText>Génération</GradientText>
              <br />
              <span className="text-white">
                <TypeWriter words={heroWords} />
              </span>
            </h1>

            <p className="text-text-secondary text-lg mb-8 max-w-lg leading-relaxed">
              Expert Next.js & React, je crée des applications web modernes et performantes pour les entreprises en Suisse et en France.
            </p>

            <div className="flex flex-wrap gap-4">
              <MagneticButton>
                <Button href="#projets" icon>
                  Voir mes projets
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button href="#contact" variant="secondary">
                  Me contacter
                </Button>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Right content - HooBank style floating elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block h-[500px]"
          >
            {/* Main dashboard card */}
            <motion.div
              className="absolute top-8 right-0 z-10"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-72 p-5 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-sm shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">K8</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">KRY8 Studio</p>
                      <p className="text-text-muted text-xs">Expert Next.js</p>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>
                {/* Code preview lines */}
                <div className="space-y-2 p-3 rounded-lg bg-primary/50">
                  <div className="flex items-center gap-2">
                    <span className="text-accent text-xs">const</span>
                    <span className="text-white text-xs">app</span>
                    <span className="text-text-muted text-xs">=</span>
                    <span className="text-green-400 text-xs">Next.js</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded w-4/5" />
                  <div className="h-1.5 bg-white/10 rounded w-3/5" />
                </div>
              </div>
            </motion.div>

            {/* Floating notification card */}
            <motion.div
              className="absolute top-0 left-4 z-20"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="p-4 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 text-lg">✓</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Projet livré !</p>
                    <p className="text-text-muted text-xs">Client satisfait</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tech stack card */}
            <motion.div
              className="absolute bottom-20 left-0 z-20"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="p-4 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-sm">
                <p className="text-text-muted text-xs mb-2 uppercase tracking-wider">Technologies</p>
                <div className="flex gap-2">
                  {['Next.js', 'React', 'Tailwind'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-xs font-medium border border-accent/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Analytics card */}
            <motion.div
              className="absolute bottom-0 right-8 z-20"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            >
              <div className="p-4 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-sm">
                <p className="text-text-muted text-xs mb-2">Performance</p>
                <div className="flex items-end gap-1">
                  {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <div
                      key={i}
                      className="w-2 rounded-t bg-gradient-to-t from-accent to-accent-dark"
                      style={{ height: `${h * 0.4}px` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-accent/20 blur-[60px]"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/4 w-20 h-20 rounded-full bg-accent/30 blur-[40px]"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Mobile mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:hidden flex justify-center mt-8"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-sm max-w-[280px]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">K8</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">KRY8 Studio</p>
                  <p className="text-text-muted text-xs">Expert Next.js</p>
                </div>
              </div>
              <div className="flex gap-2">
                {['Next.js', 'React', 'Tailwind'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded-lg bg-accent/10 text-accent text-xs border border-accent/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
