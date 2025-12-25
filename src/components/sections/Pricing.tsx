'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Layers, Rocket } from 'lucide-react'
import Button from '../ui/Button'
import GradientText from '../ui/GradientText'
import Reveal from '../ui/Reveal'

const plans = [
  {
    id: 'vitrine',
    title: 'Site Vitrine',
    price: '800',
    icon: Sparkles,
    description: 'Présence web professionnelle',
    features: ['Design sur mesure', 'Responsive', 'SEO optimisé', 'Formulaire contact'],
    color: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'border-cyan-500/30',
  },
  {
    id: 'webapp',
    title: 'Application Web',
    price: "5'000",
    icon: Layers,
    description: 'Solution complète avec backend',
    features: ['Authentification', 'Dashboard admin', 'Paiements Stripe', 'Base de données'],
    popular: true,
    color: 'from-accent/30 to-cyan-500/20',
    borderColor: 'border-accent/50',
  },
  {
    id: 'saas',
    title: 'Solution SaaS',
    price: "10'000",
    icon: Rocket,
    description: 'Plateforme scalable',
    features: ['Multi-tenant', 'Analytics avancés', 'API custom', 'Infrastructure cloud'],
    color: 'from-purple-500/20 to-accent/20',
    borderColor: 'border-purple-500/30',
  },
]

export default function Pricing() {
  return (
    <section id="tarifs" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <Reveal className="text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-wider uppercase mb-4">Tarification</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Investissez dans votre
            <br />
            <GradientText>succès digital.</GradientText>
          </h2>
        </Reveal>

        {/* Bento Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Main featured plan - Large card */}
          <Reveal delay={100} className="lg:col-span-7 lg:row-span-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`relative h-full p-8 rounded-3xl bg-gradient-to-br ${plans[1].color} border-2 ${plans[1].borderColor} overflow-hidden`}
            >
              {/* Decorative grid pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'linear-gradient(rgba(0,246,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,246,255,0.3) 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }}
              />

              {/* Popular badge */}
              <div className="absolute top-6 right-6">
                <span className="px-4 py-2 rounded-full bg-accent text-primary text-xs font-bold uppercase tracking-wider">
                  Recommandé
                </span>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center">
                    <Layers className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{plans[1].title}</h3>
                    <p className="text-text-secondary text-sm">{plans[1].description}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <span className="text-text-muted text-sm">Dès</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl md:text-7xl font-bold">
                      <GradientText>{plans[1].price}</GradientText>
                    </span>
                    <span className="text-text-secondary text-xl">CHF</span>
                  </div>
                </div>

                {/* Features in 2 columns */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {plans[1].features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-text-secondary text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <Button href="#contact" className="w-full md:w-auto" icon>
                  Démarrer mon projet
                </Button>
              </div>

              {/* Floating decorative element */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full border border-accent/20"
              />
            </motion.div>
          </Reveal>

          {/* Smaller cards */}
          {[plans[0], plans[2]].map((plan, index) => (
            <Reveal key={plan.id} delay={200 + index * 100} className="lg:col-span-5">
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`relative h-full p-6 rounded-3xl bg-gradient-to-br ${plan.color} border ${plan.borderColor} overflow-hidden group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent/30 transition-all">
                    <plan.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-right">
                    <span className="text-text-muted text-xs">Dès</span>
                    <p className="text-2xl font-bold">
                      <GradientText>{plan.price}</GradientText>
                      <span className="text-text-secondary text-sm ml-1">CHF</span>
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{plan.title}</h3>
                <p className="text-text-secondary text-sm mb-4">{plan.description}</p>

                <div className="space-y-2 mb-6">
                  {plan.features.slice(0, 3).map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-text-secondary text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {feature}
                    </div>
                  ))}
                  {plan.features.length > 3 && (
                    <p className="text-accent text-xs">+{plan.features.length - 3} autres</p>
                  )}
                </div>

                <Button href="#contact" variant="outline" className="w-full" icon>
                  En savoir plus
                </Button>
              </motion.div>
            </Reveal>
          ))}

          {/* Bottom banner */}
          <Reveal delay={400} className="lg:col-span-12">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-6 rounded-2xl bg-gradient-to-r from-white/[0.03] to-white/[0.08] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <p className="text-white font-medium">Projet sur mesure ?</p>
                  <p className="text-text-secondary text-sm">Discutons de vos besoins spécifiques</p>
                </div>
              </div>
              <Button href="#contact" variant="secondary">
                Demander un devis gratuit
              </Button>
            </motion.div>
          </Reveal>
        </div>

        {/* Disclaimer */}
        <Reveal delay={500} variant="fade" className="mt-8">
          <p className="text-text-muted text-xs text-center">
            * Tarifs indicatifs HT. Devis personnalisé gratuit et sans engagement.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
