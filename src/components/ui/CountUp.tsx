'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  end: string
  duration?: number
  className?: string
}

export default function CountUp({ end, duration = 2000, className = '' }: CountUpProps) {
  const [count, setCount] = useState('0')
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            animateCount()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnimated])

  const animateCount = () => {
    // Extract number from string (e.g., "2+" -> 2, "100%" -> 100)
    const numericMatch = end.match(/(\d+)/)
    if (!numericMatch) {
      setCount(end)
      return
    }

    const targetNumber = parseInt(numericMatch[1])
    const prefix = end.slice(0, end.indexOf(numericMatch[1]))
    const suffix = end.slice(end.indexOf(numericMatch[1]) + numericMatch[1].length)

    const startTime = performance.now()

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(easeOut * targetNumber)

      setCount(`${prefix}${current}${suffix}`)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(updateCount)
  }

  return (
    <span ref={ref} className={className}>
      {count}
    </span>
  )
}
