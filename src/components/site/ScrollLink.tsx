'use client'

import React from 'react'

/* Reliable same-page anchor scroll — works even when the URL hash is already set (native anchors no-op then). */
export const ScrollLink: React.FC<{
  targetId: string
  className?: string
  children: React.ReactNode
}> = ({ targetId, className, children }) => (
  <a
    href={`#${targetId}`}
    className={className}
    onClick={(e) => {
      e.preventDefault()
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }}
  >
    {children}
  </a>
)
