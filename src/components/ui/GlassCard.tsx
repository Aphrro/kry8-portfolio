'use client'

import { motion } from 'framer-motion'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
}: GlassCardProps) {
  return (
    <motion.div
      className={`glass-card p-6 ${className}`}
      whileHover={hover ? {
        scale: 1.02,
        borderColor: 'rgba(0, 246, 255, 0.3)',
      } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
