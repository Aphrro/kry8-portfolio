'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  href?: string
  onClick?: () => void
  className?: string
  icon?: boolean
  ariaLabel?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  icon = false,
  ariaLabel,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'

  const variants = {
    primary: 'glow-button text-primary hover:scale-105',
    secondary: 'bg-white/10 text-white hover:bg-white/20 border border-white/10',
    outline: 'border border-accent text-accent hover:bg-accent/10',
  }

  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      onClick={onClick}
      type={href ? undefined : type}
      disabled={href ? undefined : disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      aria-label={ariaLabel}
      aria-disabled={disabled}
    >
      {children}
      {icon && <ArrowUpRight className="w-4 h-4" aria-hidden="true" />}
    </Component>
  )
}
