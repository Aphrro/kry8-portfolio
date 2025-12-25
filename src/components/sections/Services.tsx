'use client'

import { motion } from 'framer-motion'
import { Globe, Smartphone, Rocket, type LucideIcon } from 'lucide-react'
import { services, type ServiceIconName } from '@/lib/data'
import Reveal from '../ui/Reveal'

const iconMap: Record<ServiceIconName, LucideIcon> = {
  Globe,
  Smartphone,
  Rocket,
}

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Service cards with floating mockup */}
          <div className="relative order-2 lg:order-1">
            {/* Service cards */}
            <div className="space-y-4 lg:pl-20">
              {services.map((service, index) => {
                const Icon = iconMap[service.icon]
                return (
                  <Reveal key={service.title} delay={index * 100} variant="slide">
                    <motion.div
                      whileHover={{ x: 8 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="group p-5 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08] hover:border-accent/30 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:from-accent group-hover:to-accent-dark transition-all duration-300">
                          <Icon className="w-6 h-6 text-accent group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold mb-1 group-hover:text-accent transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-text-secondary text-sm mb-3">
                            {service.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {service.features.slice(0, 3).map((feature) => (
                              <span
                                key={feature}
                                className="px-2 py-0.5 rounded-md bg-white/5 text-text-muted text-xs"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Reveal>
                )
              })}
            </div>
          </div>

          {/* Right content */}
          <Reveal className="order-1 lg:order-2">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Contrôlez facilement
                <br />
                <span className="bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">
                  votre projet web.
                </span>
              </h2>
              <p className="text-text-secondary text-lg mb-8 max-w-md">
                Du site vitrine à l&apos;application complexe, je propose des solutions adaptées à chaque besoin et budget.
              </p>

              {/* Floating analytics card */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 max-w-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-white font-medium">Analyse en ligne</p>
                  <span className="text-accent text-xs">1 mois</span>
                </div>
                <div className="flex items-end justify-between gap-2 mb-3">
                  <div>
                    <p className="text-text-muted text-xs mb-1">Visiteurs</p>
                    <p className="text-2xl font-bold text-white">2,234</p>
                  </div>
                  <div className="flex items-end gap-1">
                    {[30, 45, 35, 60, 50, 80, 65].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h * 0.5}px` }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="w-4 rounded-t bg-gradient-to-t from-accent/50 to-accent"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs">+15%</span>
                  <span className="text-text-muted text-xs">vs mois dernier</span>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
