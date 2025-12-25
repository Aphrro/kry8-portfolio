'use client'

import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { pricing } from '@/lib/data'
import Button from '../ui/Button'
import GradientText from '../ui/GradientText'
import Reveal from '../ui/Reveal'

export default function Pricing() {
  return (
    <section id="tarifs" className="py-20 md:py-32 relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Trouvez l&apos;offre
            <br />
            <GradientText>adaptée à vos besoins.</GradientText>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Des tarifs transparents pour des projets de qualité. Chaque devis est personnalisé selon vos besoins.
          </p>
        </Reveal>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {pricing.map((plan, index) => (
            <Reveal
              key={plan.title}
              delay={index * 100}
              variant="slide"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`relative p-6 lg:p-8 rounded-2xl transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30'
                    : 'bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08] hover:border-accent/20'
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-accent to-accent-dark text-primary text-xs font-bold uppercase">
                      Populaire
                    </span>
                  </div>
                )}

                {/* Plan title */}
                <h3 className="text-xl font-semibold text-white mb-2 text-center">
                  {plan.title}
                </h3>

                {/* Price */}
                <div className="text-center mb-6">
                  <span className="text-3xl md:text-4xl font-bold">
                    <GradientText>{plan.price}</GradientText>
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-text-secondary text-sm"
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        plan.popular ? 'bg-accent/30' : 'bg-accent/20'
                      }`}>
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  href="#contact"
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                  icon
                >
                  Demander un devis
                </Button>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Disclaimer */}
        <Reveal delay={400} variant="fade" className="mt-12">
          <p className="text-text-muted text-sm text-center max-w-2xl mx-auto">
            * Tarifs indicatifs. Chaque projet fait l&apos;objet d&apos;un devis personnalisé selon vos besoins spécifiques.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
