'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/lib/data'
import SectionTitle from '../ui/SectionTitle'
import GlassCard from '../ui/GlassCard'

export default function Projects() {
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
    <section id="projets" className="py-20 md:py-32 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[128px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle>Mes Réalisations</SectionTitle>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <GlassCard className="h-full group cursor-pointer overflow-hidden">
                {/* Project image placeholder */}
                <div className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-white/5">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-accent-dark/20 flex items-center justify-center">
                      <span className="text-accent text-2xl font-bold">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  </div>
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
