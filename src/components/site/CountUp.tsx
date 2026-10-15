'use client'

import React, { useEffect, useRef, useState } from 'react'

const NUM = /\d+(?:,\d{3})*(?:\.\d+)?/g

/* Real value is always in the server-rendered HTML (SEO / no-JS safe). Once `active` flips to true the numbers
   inside the string count up from zero to the real value; the final text always equals `value`. */
export const CountUp: React.FC<{ value: string; active: boolean; duration?: number; className?: string }> = ({
  value,
  active,
  duration = 1900,
  className,
}) => {
  const [text, setText] = useState(value)
  const started = useRef(false)

  useEffect(() => {
    if (!active || started.current) return
    started.current = true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const targets = [...value.matchAll(NUM)].map((m) => ({
      raw: m[0],
      n: parseFloat(m[0].replace(/,/g, '')),
      decimals: (m[0].split('.')[1] ?? '').length,
      comma: m[0].includes(','),
    }))
    if (targets.length === 0) return

    const t0 = performance.now()
    let raf = 0
    const frame = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 4)
      let i = 0
      setText(
        p >= 1
          ? value
          : value.replace(NUM, () => {
              const t = targets[i++]
              const v = t.n * eased
              return t.comma ? Math.round(v).toLocaleString('en-GB') : v.toFixed(t.decimals)
            }),
      )
      if (p < 1) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [active, value, duration])

  return <span className={`${className ?? ''} tabular-nums`}>{text}</span>
}
