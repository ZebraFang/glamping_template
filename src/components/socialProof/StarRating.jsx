import { useId } from 'react'

/**
 * Accessible star row — supports half-star display for aggregates (e.g. 4.5).
 * Uses CSS variable `--star-color` (defaults via gradient stops to terracotta deep).
 *
 * @param {{
 *   rating: number;
 *   maxStars?: number;
 *   size?: number;
 *   className?: string;
 *   labelledBy?: string;
 * }} props
 */
export function StarRating({ rating, maxStars = 5, size = 16, className, labelledBy }) {
  const clamped = Math.min(maxStars, Math.max(0, rating))
  const ariaLabel = `${clamped.toFixed(1)} out of ${maxStars} stars`
  const uid = useId()

  return (
    <span
      className={className}
      role="img"
      aria-label={labelledBy ? undefined : ariaLabel}
      aria-labelledby={labelledBy || undefined}
    >
      <span style={{ display: 'inline-flex', gap: 2, verticalAlign: 'middle' }} aria-hidden>
        {Array.from({ length: maxStars }, (_, i) => {
          const starIndex = i + 1
          const diff = clamped - (starIndex - 1)
          let fillFraction = 0
          if (diff >= 1) fillFraction = 1
          else if (diff >= 0.5) fillFraction = 0.5

          return (
            <StarGlyph
              key={starIndex}
              gradientId={`${uid}-s${starIndex}`}
              size={size}
              fillFraction={fillFraction}
            />
          )
        })}
      </span>
    </span>
  )
}

/**
 * @param {{ gradientId: string; size: number; fillFraction: number }} props
 */
function StarGlyph({ gradientId, size, fillFraction }) {
  const copper = 'var(--star-color, var(--color-terracotta-deep))'
  const empty = 'rgba(27, 38, 33, 0.18)'

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
          <stop offset={`${fillFraction * 100}%`} stopColor={copper} />
          <stop offset={`${fillFraction * 100}%`} stopColor={empty} />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      />
    </svg>
  )
}
