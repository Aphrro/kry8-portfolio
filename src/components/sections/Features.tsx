'use client'

import { motion } from 'framer-motion'
import { Star, Shield, Zap } from 'lucide-react'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'

const features = [
  {
    icon: Star,
    title: 'Design Premium',
    description: 'Interfaces modernes et élégantes qui captivent vos visiteurs dès le premier regard.',
  },
  {
    icon: Shield,
    title: '100% Sécurisé',
    description: 'Applications robustes avec les meilleures pratiques de sécurité et protection des données.',
  },
  {
    icon: Zap,
    title: 'Performance Optimale',
    description: 'Sites ultra-rapides optimisés pour le SEO et une expérience utilisateur fluide.',
  },
]

export default function Features() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <Reveal>
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Vous avez l&apos;idée,
                <br />
                <span className="bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">
                  je la concrétise.
                </span>
              </h2>
              <p className="text-text-secondary text-lg mb-8 max-w-md">
                Avec les bonnes technologies et une approche sur mesure, je transforme vos concepts en applications web performantes qui génèrent des résultats.
              </p>
              <Button href="#contact" icon>
                Démarrer un projet
              </Button>
            </div>
          </Reveal>

          {/* Right - Feature cards */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 100} variant="slide">
                <motion.div
                  whileHover={{ x: 8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08] hover:border-accent/30 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:from-accent group-hover:to-accent-dark transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-accent group-hover:text-primary transition-colors" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-white font-semibold mb-1 group-hover:text-accent transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
