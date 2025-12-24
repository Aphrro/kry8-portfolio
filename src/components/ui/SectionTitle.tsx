'use client'

import { motion } from 'framer-motion'

interface SectionTitleProps {
  children: React.ReactNode
  className?: string
}

export default function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${className}`}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {children}
      </h2>
      <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent-dark rounded-full" />
    </motion.div>
  )
}
