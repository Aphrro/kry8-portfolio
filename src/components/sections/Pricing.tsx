'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { pricing } from '@/lib/data'
import SectionTitle from '../ui/SectionTitle'
import Button from '../ui/Button'
import GradientText from '../ui/GradientText'

export default function Pricing() {
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
    <section id="tarifs" className="py-20 md:py-32 relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[128px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle>Tarifs Indicatifs</SectionTitle>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {pricing.map((plan) => (
            <motion.div
              key={plan.title}
              variants={item}
              className={`glass-card p-6 lg:p-8 relative ${
                plan.popular
                  ? 'border-accent/50 md:scale-105 md:-my-4'
                  : ''
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
              <h3 className="text-xl font-semibold text-white mb-4 text-center">
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
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
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
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-text-muted text-sm text-center mt-8 max-w-2xl mx-auto"
        >
          * Tarifs indicatifs. Chaque projet fait l&apos;objet d&apos;un devis personnalisé selon vos besoins spécifiques.
        </motion.p>
      </div>
    </section>
  )
}
