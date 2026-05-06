/**
 * Decorative map layers — SVG user space 0–100 × 0–110.
 */
export function FarmMapIllustration({ patternId }) {
  const pid = patternId ?? 'farm-map-paper'

  return (
    <>
      <defs>
        <pattern id={pid} width="3" height="3" patternUnits="userSpaceOnUse">
          <rect width="3" height="3" fill="#f1ece4" />
          <circle cx="1" cy="1" r="0.15" fill="#1b2621" opacity="0.06" />
        </pattern>
      </defs>
      <rect width="100" height="110" fill={`url(#${pid})`} />

      <g stroke="#6b7a5a" strokeWidth="0.2" fill="none" opacity="0.35" aria-hidden>
        <path d="M10,25 Q30,18 55,22 T95,28" />
        <path d="M5,35 Q28,28 55,32 T100,40" />
        <path d="M0,48 Q25,40 55,44 T100,52" />
        <path d="M-5,62 Q22,55 50,58 T95,66" />
        <path d="M-5,78 Q25,72 55,75 T105,82" />
        <path d="M0,92 Q28,86 58,89 T105,96" />
      </g>

      <path
        d="M-2,55 Q15,60 25,68 T45,80 Q55,86 65,92 T100,100"
        fill="none"
        stroke="#6b7a5a"
        strokeWidth="0.8"
        opacity="0.5"
        strokeLinecap="round"
        aria-hidden
      />

      <path
        d="M8,8 L92,12 L94,98 L6,102 Z"
        fill="none"
        stroke="#1b2621"
        strokeWidth="0.3"
        strokeDasharray="1.5 1"
        opacity="0.5"
        aria-hidden
      />

      <g fill="#6b7a5a" opacity="0.4" aria-hidden>
        <circle cx="20" cy="18" r="1.2" />
        <circle cx="22" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
        <circle cx="78" cy="38" r="1.2" />
        <circle cx="80" cy="40" r="1" />
        <circle cx="76" cy="40" r="1" />
        <circle cx="82" cy="38" r="1" />
        <circle cx="15" cy="85" r="1.2" />
        <circle cx="17" cy="87" r="1" />
        <circle cx="13" cy="87" r="1" />
        <circle cx="85" cy="80" r="1.2" />
        <circle cx="87" cy="82" r="1" />
      </g>

      <path
        d="M30 5 L30 102"
        stroke="#1b2621"
        strokeWidth="0.15"
        opacity="0.2"
        strokeDasharray="0.5 0.5"
        aria-hidden
      />
      <path
        d="M70 5 L70 102"
        stroke="#1b2621"
        strokeWidth="0.15"
        opacity="0.2"
        strokeDasharray="0.5 0.5"
        aria-hidden
      />

      <g transform="translate(86,90)" aria-hidden>
        <circle r="3" fill="none" stroke="#1b2621" strokeWidth="0.2" opacity="0.6" />
        <path d="M0,-2.5 L0.6,0 L0,2.5 L-0.6,0 Z" fill="var(--color-terracotta)" />
        <text
          y="-3.6"
          fontSize="2"
          textAnchor="middle"
          fontFamily="var(--font-mono), monospace"
          fill="#1b2621"
          opacity="0.7"
        >
          N
        </text>
      </g>
    </>
  )
}
