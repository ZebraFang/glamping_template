/**
 * 24×24 stroke icons for amenity rows — IDs align with {@link ../data/staysCatalog.js}.
 */
export function StayFeatureIcon({ iconId, size = 24, className }) {
  const stroke = {
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none',
  }

  switch (iconId) {
    case 'hotTub':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          className={className}
          aria-hidden
        >
          <ellipse cx="12" cy="14" rx="8" ry="3" {...stroke} />
          <path d="M6 14v3M18 14v3M9 11h.01M12 11h.01M15 11h.01" {...stroke} />
          <path d="M8 8c1-2 3-3 4-3s3 1 4 3" {...stroke} />
        </svg>
      )
    case 'kingBed':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M3 12h18v6H3z M3 16h18 M7 12V9a2 2 0 012-2h6a2 2 0 012 2v3" {...stroke} />
        </svg>
      )
    case 'ensuite':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M6 4h12v16H6z M10 8h4 M9 20v2M15 20v2" {...stroke} />
        </svg>
      )
    case 'firepit':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
          <path
            d="M12 18c-3 0-5-2-5-5 0-2 2-4 5-7 3 3 5 5 5 7 0 3-2 5-5 5z"
            {...stroke}
          />
          <path d="M10 14h4" {...stroke} />
        </svg>
      )
    case 'pets':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
          <ellipse cx="8" cy="15" rx="3" ry="4" {...stroke} />
          <ellipse cx="16" cy="15" rx="3" ry="4" {...stroke} />
          <circle cx="12" cy="8" r="3" {...stroke} />
        </svg>
      )
    case 'breakfast':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M4 10h16v2H4z M8 12v6M12 12v6M16 12v6" {...stroke} />
          <path d="M6 8h12l-1-3H7z" {...stroke} />
        </svg>
      )
    case 'views':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M3 18l6-8 4 5 3-4 5 7H3z" {...stroke} />
          <circle cx="17" cy="7" r="2" {...stroke} />
        </svg>
      )
    case 'linen':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M6 8h12v10a2 2 0 01-2 2H8a2 2 0 01-2-2V8z M6 12h12" {...stroke} />
        </svg>
      )
    case 'kitchenette':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
          <rect x="4" y="6" width="16" height="12" rx="1" {...stroke} />
          <circle cx="10" cy="12" r="1.5" {...stroke} />
          <circle cx="14" cy="12" r="1.5" {...stroke} />
        </svg>
      )
    case 'parking':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M5 4h9a4 4 0 014 4v12H5z M9 8h3a2 2 0 012 2v8" {...stroke} />
        </svg>
      )
    case 'wifi':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M5 10c4-4 10-4 14 0M8 13c3-3 5-3 8 0M11 16h2" {...stroke} />
          <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'stargaze':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M12 3l1 4 4 1-4 1-1 4-1-4-4-1 4-1z M18 14l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5z" {...stroke} />
        </svg>
      )
    case 'deck':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M4 18h16M6 18V9l6-4 6 4v9" {...stroke} />
          <path d="M9 14h6" {...stroke} />
        </svg>
      )
    case 'canvas':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M4 8l8-4 8 4v10l-8 4-8-4z" {...stroke} />
          <path d="M4 8l8 4 8-4M12 12v10" {...stroke} />
        </svg>
      )
    case 'nook':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M6 20V10l6-5 6 5v10" {...stroke} />
          <path d="M9 14h6v6H9z" {...stroke} />
        </svg>
      )
    case 'compact':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
          <rect x="7" y="7" width="10" height="12" rx="1" {...stroke} />
          <path d="M10 11h4M10 14h4" {...stroke} />
        </svg>
      )
    case 'hedgerow':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M4 18h16M6 18v-6l3-4 3 4 3-5 3 5v6" {...stroke} />
        </svg>
      )
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
          <circle cx="12" cy="12" r="8" {...stroke} />
          <path d="M12 8v8M8 12h8" {...stroke} />
        </svg>
      )
  }
}
