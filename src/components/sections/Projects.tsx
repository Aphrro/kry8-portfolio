'use client'

import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { projects } from '@/lib/data'
import Reveal from '../ui/Reveal'

export default function Projects() {
  return (
    <section id="projets" className="py-20 md:py-32 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[128px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left content */}
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Découvrez mes
                <br />
                <span className="bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">
                  réalisations.
                </span>
              </h2>
              <p className="text-text-secondary text-lg mb-8 max-w-md">
                Des projets variés, de la simple landing page aux plateformes SaaS complexes. Chaque projet est unique et adapté aux besoins du client.
              </p>

              {/* Floating project mockup */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="hidden lg:block p-5 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 max-w-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                    <div className="w-3 h-3 rounded-full bg-green-400/60" />
                  </div>
                  <div className="flex-1 h-6 rounded bg-white/5 flex items-center px-3">
                    <span className="text-text-muted text-xs">suryoodaya.com</span>
                  </div>
                </div>
                <div className="space-y-2 p-3 rounded-lg bg-primary/50">
                  <div className="h-2 bg-accent/20 rounded w-1/3" />
                  <div className="h-2 bg-white/10 rounded w-full" />
                  <div className="h-2 bg-white/10 rounded w-4/5" />
                  <div className="h-8 bg-accent/20 rounded w-24 mt-3" />
                </div>
              </motion.div>
            </div>
          </Reveal>

          {/* Right - Project cards */}
          <div className="space-y-4">
            {projects.map((project, index) => (
              <Reveal key={project.id} delay={index * 80} variant="slide">
                <motion.a
                  href={project.url}
                  target={project.url.startsWith('http') ? '_blank' : undefined}
                  rel={project.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08] hover:border-accent/30 transition-all duration-300 block"
                  whileHover={{ x: 8, backgroundColor: 'rgba(255,255,255,0.03)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  {/* Icon */}
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center group-hover:from-accent group-hover:to-accent-dark group-hover:border-accent transition-all duration-300">
                    <span className="text-accent text-lg font-bold group-hover:text-primary transition-colors">
                      {project.title.charAt(0)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-white font-semibold group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-text-secondary text-sm mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-white/5 text-text-muted text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="shrink-0 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </motion.a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
