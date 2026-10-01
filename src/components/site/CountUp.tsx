'use client'

import React, { useEffect, useRef, useState } from 'react'

/* Renders the real value immediately (SEO/no-JS safe), then fades in on scroll — no numeric count-up from zero. */
export const CountUp: React.FC<{ value: string; duration?: number; className?: string }> = ({
  value,
  className,
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setVisible(true)
        observer.disconnect()
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <span
      ref={ref}
      className={`${className ?? ''} inline-block transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      {value}
    </span>
  )
}
