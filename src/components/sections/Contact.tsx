'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { z } from 'zod'
import { siteConfig } from '@/lib/data'
import SectionTitle from '../ui/SectionTitle'
import GlassCard from '../ui/GlassCard'
import Button from '../ui/Button'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

// API response validation schema
const apiResponseSchema = z.object({
  ok: z.boolean(),
  error: z.string().optional(),
})

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [honeypot, setHoneypot] = useState('')
  const timestampRef = useRef<number>(Date.now())

  // Set timestamp on mount
  useEffect(() => {
    timestampRef.current = Date.now()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          company: honeypot, // honeypot field
          ts: timestampRef.current, // timestamp
        }),
      })

      const rawData = await response.json()
      const parseResult = apiResponseSchema.safeParse(rawData)

      if (!parseResult.success) {
        console.error('Invalid API response:', parseResult.error)
        setStatus('error')
        return
      }

      const data = parseResult.data

      if (data.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        // Reset timestamp for next submission
        timestampRef.current = Date.now()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Démarrons votre projet</SectionTitle>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-text-secondary text-lg mb-12 max-w-2xl"
        >
          Une idée ? Un projet ? Discutons-en !
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="h-full" hover={false}>
              <h3 className="text-xl font-semibold text-white mb-6">
                Coordonnées
              </h3>

              <div className="space-y-6">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-4 text-text-secondary hover:text-accent transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-text-muted text-sm">Email</p>
                    <p className="text-white">{siteConfig.email}</p>
                  </div>
                </a>

                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-4 text-text-secondary hover:text-accent transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-text-muted text-sm">Téléphone</p>
                    <p className="text-white">{siteConfig.phone}</p>
                  </div>
                </a>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-text-secondary text-sm">
                  Basé en <span className="text-white">{siteConfig.location}</span>
                </p>
                <p className="text-text-muted text-sm mt-2">
                  Je travaille avec des clients dans toute l&apos;Europe francophone.
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard hover={false}>
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Message envoyé !
                  </h3>
                  <p className="text-text-secondary">
                    Je vous répondrai dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-accent hover:underline"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field - hidden from users */}
                  <input
                    type="text"
                    name="company"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="absolute -left-[9999px] opacity-0 pointer-events-none"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-text-secondary mb-2"
                    >
                      Nom
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      minLength={2}
                      maxLength={80}
                      disabled={status === 'submitting'}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-colors disabled:opacity-50"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-text-secondary mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      maxLength={254}
                      disabled={status === 'submitting'}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-colors disabled:opacity-50"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-text-secondary mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      minLength={10}
                      maxLength={2000}
                      rows={5}
                      disabled={status === 'submitting'}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-colors resize-none disabled:opacity-50"
                      placeholder="Décrivez votre projet..."
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>Une erreur est survenue. Veuillez réessayer.</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
