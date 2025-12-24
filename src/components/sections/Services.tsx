'use client'

import { motion } from 'framer-motion'
import { Globe, Smartphone, Rocket } from 'lucide-react'
import { services } from '@/lib/data'
import SectionTitle from '../ui/SectionTitle'
import GlassCard from '../ui/GlassCard'

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Rocket,
}

export default function Services() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="services" className="py-20 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Mes Services</SectionTitle>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Globe

            return (
              <motion.div key={service.title} variants={item}>
                <GlassCard className="h-full text-center">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent-dark/20 flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-secondary text-sm mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-text-secondary text-sm flex items-center justify-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
