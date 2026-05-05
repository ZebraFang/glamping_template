/**
 * Compact brand marks for review sources — recognizable at small sizes.
 *
 * @param {{ platform: import('../../data/reviews.js').ReviewSource; size?: number; className?: string; titleId?: string }} props
 */
export function PlatformLogo({ platform, size = 20, className, titleId }) {
  const title = platform === 'google' ? 'Google' : platform === 'tripadvisor' ? 'Tripadvisor' : 'Airbnb'

  switch (platform) {
    case 'google':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          className={className}
          role="img"
          aria-labelledby={titleId}
        >
          {titleId ? <title id={titleId}>{title}</title> : <title>{title}</title>}
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      )
    case 'tripadvisor':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          className={className}
          role="img"
          aria-labelledby={titleId}
        >
          {titleId ? <title id={titleId}>{title}</title> : <title>{title}</title>}
          {/* Stylized owl silhouette — brand-evocative without copying trademark artwork */}
          <circle cx="9" cy="10" r="4.5" fill="#00AF87" />
          <circle cx="15" cy="10" r="4.5" fill="#00AF87" />
          <circle cx="9" cy="10" r="1.8" fill="#fff" />
          <circle cx="15" cy="10" r="1.8" fill="#fff" />
          <ellipse cx="12" cy="17" rx="7" ry="4" fill="#00AF87" />
          <path fill="#FFCC00" d="M10 17h4v2h-4z" />
        </svg>
      )
    case 'airbnb':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          className={className}
          role="img"
          aria-labelledby={titleId}
        >
          {titleId ? <title id={titleId}>{title}</title> : <title>{title}</title>}
          <path
            fill="#FF385C"
            d="M12 18c-1.5-2.5-5-6.5-5-9a5 5 0 0110 0c0 2.5-3.5 6.5-5 9zm0-11a2 2 0 100 4 2 2 0 000-4z"
          />
        </svg>
      )
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
          <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.2" />
        </svg>
      )
  }
}
