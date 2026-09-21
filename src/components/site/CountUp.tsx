'use client'

import React, { useEffect, useRef, useState } from 'react'

/* Animates "£310M+", "1,400+", "24hrs", "4.9/5" style values by counting the numeric part. */
export const CountUp: React.FC<{ value: string; duration?: number; className?: string }> = ({
  value,
  duration = 1600,
  className,
}) => {
  const match = value.match(/([\d,.]+)/)
  const numStr = match?.[1] ?? ''
  const target = parseFloat(numStr.replace(/,/g, '')) || 0
  const decimals = numStr.includes('.') ? (numStr.split('.')[1]?.length ?? 0) : 0
  const hasThousands = numStr.includes(',')
  const [prefix, suffix] = match ? [value.slice(0, match.index), value.slice((match.index ?? 0) + numStr.length)] : ['', value]

  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(match ? `${prefix}0${suffix}` : value)

  useEffect(() => {
    if (!match) return
    const el = ref.current
    if (!el) return
    let raf = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          const current = target * eased
          const formatted = current.toLocaleString('en-GB', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
            useGrouping: hasThousands,
          })
          setDisplay(`${prefix}${formatted}${suffix}`)
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
