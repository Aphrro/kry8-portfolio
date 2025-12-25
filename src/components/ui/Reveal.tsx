'use client'

import { useEffect, useRef, useState, type ElementType, type ReactNode, type CSSProperties } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  as?: ElementType
  delay?: number
  once?: boolean
  threshold?: number
  variant?: 'default' | 'fade' | 'slide'
}

export default function Reveal({
  children,
  className = '',
  as: Component = 'div',
  delay = 0,
  once = true,
  threshold = 0.15,
  variant = 'default',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [once, threshold])

  const style: CSSProperties = {
    '--reveal-delay': `${delay}ms`,
  } as CSSProperties

  return (
    <Component
      ref={ref}
      className={`${className} ${isVisible ? 'is-visible' : ''}`}
      data-reveal
      data-variant={variant}
      style={style}
    >
      {children}
    </Component>
  )
}
