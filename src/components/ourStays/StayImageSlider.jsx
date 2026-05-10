import { useCallback, useId, useRef, useState } from 'react'
import styles from './StayImageSlider.module.css'

const SWIPE_PX = 48

function IconChevron({ dir }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === 'prev' ? 'M14 6 L8 12 L14 18' : 'M10 6 L16 12 L10 18'}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * @param {{
 *   slides: import('../../data/staysCatalog.js').StayGallerySlide[];
 *   badge: string;
 *   stayLabel: string;
 *   onOpenDetail?: () => void;
 * }} props
 */
export function StayImageSlider({ slides, badge, stayLabel, onOpenDetail }) {
  const [index, setIndex] = useState(0)
  const [loadedMap, setLoadedMap] = useState(() => ({}))
  const touchStartX = useRef(null)
  const regionId = useId()
  const labelId = useId()

  const max = slides.length - 1
  const go = useCallback(
    (delta) => {
      setIndex((i) => Math.min(max, Math.max(0, i + delta)))
    },
    [max],
  )

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null
  }

  const onTouchEnd = (e) => {
    const start = touchStartX.current
    touchStartX.current = null
    if (start == null) return
    const end = e.changedTouches[0]?.clientX ?? start
    const dx = end - start
    if (dx > SWIPE_PX) go(-1)
    else if (dx < -SWIPE_PX) go(1)
  }

  const trackTransform = `translateX(-${index * 100}%)`

  const onViewportClick = (e) => {
    if (e.target.closest('button')) return
    onOpenDetail?.()
  }

  const onViewportKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(-1)
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(1)
    }
    if ((e.key === 'Enter' || e.key === ' ') && onOpenDetail && !e.target.closest('button')) {
      e.preventDefault()
      onOpenDetail()
    }
  }

  return (
    <div className={styles.root}>
      <p id={labelId} className={styles.visuallyHiddenAssist}>
        Image gallery for {stayLabel}. Slide {index + 1} of {slides.length}.
      </p>
      <div
        className={styles.viewport}
        role="region"
        aria-roledescription="carousel"
        aria-labelledby={labelId}
        id={regionId}
        tabIndex={0}
        onKeyDown={onViewportKeyDown}
        onClick={onViewportClick}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <span className={styles.badge}>{badge}</span>

        <div className={styles.track} style={{ transform: trackTransform }}>
          {slides.map((slide, i) => {
            const hasSrc = Boolean(slide.src?.trim())
            const showSkeleton = hasSrc && !loadedMap[i]

            return (
              <div key={`${slide.alt}-${i}`} className={styles.slide} aria-hidden={i !== index}>
                {!hasSrc ? (
                  <div className={styles.placeholderLayer} aria-hidden>
                    <div className={styles.skeleton} />
                  </div>
                ) : (
                  <>
                    {showSkeleton ? <div className={styles.skeleton} aria-hidden /> : null}
                    <img
                      className={styles.img}
                      src={slide.src}
                      alt={slide.alt}
                      width={800}
                      height={1000}
                      sizes="(min-width: 900px) 33vw, 100vw"
                      decoding="async"
                      loading="lazy"
                      fetchPriority="low"
                      onLoad={() =>
                        setLoadedMap((m) => {
                          if (m[i]) return m
                          return { ...m, [i]: true }
                        })
                      }
                    />
                  </>
                )}
              </div>
            )
          })}
        </div>

        <button
          type="button"
          className={`${styles.navBtn} ${styles.navPrev}`}
          aria-controls={regionId}
          disabled={index <= 0}
          aria-label="Previous photo"
          onClick={(e) => {
            e.stopPropagation()
            go(-1)
          }}
        >
          <IconChevron dir="prev" />
        </button>
        <button
          type="button"
          className={`${styles.navBtn} ${styles.navNext}`}
          aria-controls={regionId}
          disabled={index >= max}
          aria-label="Next photo"
          onClick={(e) => {
            e.stopPropagation()
            go(1)
          }}
        >
          <IconChevron dir="next" />
        </button>
      </div>
    </div>
  )
}
