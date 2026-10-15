import React from 'react'

/* Original flat illustrations in the A2Z palette. Decorative only (aria-hidden), no external assets. */

const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
    <rect width="240" height="150" fill="#eef2fa" />
    {children}
  </svg>
)

export const SceneHouse: React.FC = () => (
  <Frame>
    <circle cx="198" cy="34" r="15" fill="#fadeda" />
    <rect y="118" width="240" height="32" fill="#dde4f5" />
    <rect x="16" y="104" width="34" height="16" rx="8" fill="#c8d3ee" />
    <rect x="70" y="68" width="100" height="52" fill="#1b2a5e" />
    <polygon points="58,71 120,26 182,71" fill="#ce3a2a" />
    <rect x="148" y="32" width="11" height="24" fill="#14204a" />
    <rect x="108" y="88" width="24" height="32" rx="2" fill="#ffffff" />
    <circle cx="127" cy="105" r="1.8" fill="#ce3a2a" />
    <rect x="80" y="82" width="20" height="18" rx="1" fill="#fadeda" />
    <rect x="140" y="82" width="20" height="18" rx="1" fill="#fadeda" />
    <path d="M90 82v18M80 91h20M150 82v18M140 91h20" stroke="#1b2a5e" strokeWidth="1.5" />
    <circle cx="196" cy="100" r="6" fill="none" stroke="#ce3a2a" strokeWidth="3" />
    <path d="M196 106v14m0-6h6m-6 6h4" stroke="#ce3a2a" strokeWidth="3" strokeLinecap="round" />
  </Frame>
)

export const SceneCrane: React.FC = () => (
  <Frame>
    <rect y="120" width="240" height="30" fill="#dde4f5" />
    <rect x="48" y="62" width="82" height="58" fill="#1b2a5e" />
    <rect x="48" y="62" width="82" height="8" fill="#27397b" />
    {[0, 1, 2].map((r) =>
      [0, 1, 2, 3].map((c) => (
        <rect key={`${r}-${c}`} x={56 + c * 18} y={76 + r * 14} width="9" height="8" fill={(r + c) % 3 === 0 ? '#fadeda' : '#34489a'} />
      )),
    )}
    <rect x="164" y="22" width="6" height="98" fill="#ce3a2a" />
    <rect x="118" y="22" width="104" height="6" fill="#ce3a2a" />
    <rect x="205" y="16" width="12" height="10" fill="#14204a" />
    <polygon points="164,22 167,8 170,22" fill="#ce3a2a" />
    <path d="M132 28v28" stroke="#14204a" strokeWidth="1.5" />
    <rect x="124" y="56" width="16" height="9" fill="#27397b" />
    <path d="M160 120l-14 0M178 120l14 0" stroke="#14204a" strokeWidth="2" />
  </Frame>
)

export const SceneAuction: React.FC = () => (
  <Frame>
    <rect y="120" width="240" height="30" fill="#dde4f5" />
    {[18, 66, 114].map((x, i) => (
      <g key={x}>
        <rect x={x} y={64 - i * 6} width="42" height={56 + i * 6} fill={i === 1 ? '#27397b' : '#1b2a5e'} />
        <polygon points={`${x - 4},${66 - i * 6} ${x + 21},${44 - i * 6} ${x + 46},${66 - i * 6}`} fill="#14204a" />
        <rect x={x + 15} y={92} width="12" height="28" fill="#ffffff" />
        <rect x={x + 5} y={74 - i * 6} width="10" height="10" fill="#fadeda" />
        <rect x={x + 27} y={74 - i * 6} width="10" height="10" fill="#fadeda" />
      </g>
    ))}
    <rect x="176" y="62" width="4" height="58" fill="#14204a" />
    <rect x="160" y="52" width="48" height="26" rx="3" fill="#ce3a2a" />
    <text x="184" y="70" textAnchor="middle" fontSize="12" fontWeight="800" fill="#ffffff" fontFamily="Arial, sans-serif">
      SOLD
    </text>
    <g transform="rotate(-35 214 104)">
      <rect x="198" y="98" width="26" height="12" rx="2" fill="#14204a" />
      <rect x="208" y="108" width="6" height="24" rx="2" fill="#ce3a2a" />
    </g>
  </Frame>
)

export const SceneShop: React.FC = () => (
  <Frame>
    <rect y="120" width="240" height="30" fill="#dde4f5" />
    <rect x="44" y="46" width="152" height="74" fill="#1b2a5e" />
    <rect x="52" y="30" width="136" height="16" rx="2" fill="#14204a" />
    <text x="120" y="42" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fadeda" letterSpacing="2" fontFamily="Arial, sans-serif">
      YOUR BUSINESS
    </text>
    {Array.from({ length: 8 }).map((_, i) => (
      <rect key={i} x={44 + i * 19} y="46" width="19" height="14" fill={i % 2 ? '#ffffff' : '#ce3a2a'} />
    ))}
    <rect x="58" y="70" width="50" height="40" rx="2" fill="#fadeda" />
    <rect x="116" y="70" width="28" height="50" rx="2" fill="#ffffff" />
    <circle cx="138" cy="96" r="1.8" fill="#ce3a2a" />
    <rect x="152" y="70" width="34" height="40" rx="2" fill="#fadeda" />
    <path d="M58 90h50M170 70v40" stroke="#1b2a5e" strokeWidth="1.5" />
    <circle cx="210" cy="40" r="12" fill="#fadeda" />
  </Frame>
)
