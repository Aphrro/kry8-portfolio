'use client'

import { Globe, Smartphone, Rocket, type LucideIcon } from 'lucide-react'
import { services, type ServiceIconName } from '@/lib/data'
import SectionTitle from '../ui/SectionTitle'
import GlassCard from '../ui/GlassCard'
import Reveal from '../ui/Reveal'

// Type-safe icon mapping
const iconMap: Record<ServiceIconName, LucideIcon> = {
  Globe,
  Smartphone,
  Rocket,
}

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle>Mes Services</SectionTitle>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon]

            return (
              <Reveal key={service.title} delay={index * 100} variant="slide">
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
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
