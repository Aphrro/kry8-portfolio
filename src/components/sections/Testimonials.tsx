'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import GlassCard from '../ui/GlassCard'
import Reveal from '../ui/Reveal'

const testimonials = [
  {
    id: 1,
    name: 'Sophie Martin',
    role: 'Fondatrice, Suryoodaya',
    content: "KRY8 a parfaitement compris ma vision pour mon cabinet. Le site est élégant, rapide et mes clients adorent la réservation en ligne.",
    rating: 5,
  },
  {
    id: 2,
    name: 'Marc Dubois',
    role: 'Directeur, Cap Toi M\'aime',
    content: "Professionnalisme et réactivité. Notre plateforme d'annuaire a été livrée dans les temps avec toutes les fonctionnalités demandées.",
    rating: 5,
  },
  {
    id: 3,
    name: 'Claire Leroy',
    role: 'CEO, StartUp Santé',
    content: "Une collaboration exceptionnelle. KRY8 maîtrise parfaitement Next.js et a su rendre notre application scalable et performante.",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[128px] -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Reveal>
          <SectionTitle>Ce qu&apos;ils disent</SectionTitle>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 100} variant="slide">
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <GlassCard className="h-full relative">
                  {/* Quote icon */}
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-accent/20" />

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-accent text-accent"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    &quot;{testimonial.content}&quot;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-text-muted text-xs">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
