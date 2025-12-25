'use client'

import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/lib/data'
import SectionTitle from '../ui/SectionTitle'
import GlassCard from '../ui/GlassCard'
import Reveal from '../ui/Reveal'

export default function Projects() {
  return (
    <section id="projets" className="py-20 md:py-32 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[128px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Reveal>
          <SectionTitle>Mes Réalisations</SectionTitle>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 100} variant="slide">
              <GlassCard className="h-full group cursor-pointer overflow-hidden">
                {/* Project image placeholder with pattern */}
                <div className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-secondary to-primary">
                  {/* Dot pattern background */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,246,255,0.3) 1px, transparent 0)',
                      backgroundSize: '24px 24px'
                    }}
                  />

                  {/* Project icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shadow-lg shadow-accent/20">
                      <span className="text-primary text-2xl font-bold">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  </div>

                  {/* Bottom gradient fade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project info */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-text-secondary text-sm mb-4">
                      {project.description}
                    </p>
                  </div>
                  <a
                    href={project.url}
                    target={project.url.startsWith('http') ? '_blank' : undefined}
                    rel={project.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="shrink-0 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/5 text-text-secondary text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
