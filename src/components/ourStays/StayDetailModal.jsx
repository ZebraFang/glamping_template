import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './StayDetailModal.module.css'
import { StayFeatureIcon } from './StayFeatureIcon.jsx'
import { useFocusTrap } from '../../hooks/useFocusTrap.js'

const SWIPE_X = 56
const SWIPE_Y_CLOSE = 96

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M6 6 L18 18 M18 6 L6 18" strokeLinecap="round" />
    </svg>
  )
}

/**
 * @param {{
 *   stay: import('../../data/staysCatalog.js').StayCatalogEntry | null;
 *   open: boolean;
 *   onClose: () => void;
 *   bookingShell: import('../../hooks/useBookingShell.js').BookingShellApi;
 * }} props
 */
export function StayDetailModal({ stay, open, onClose, bookingShell }) {
  const closeBtnRef = useRef(null)
  const dialogRef = useRef(null)
  const prevFocusRef = useRef(null)
  const titleId = useId()
  const [slideIndex, setSlideIndex] = useState(0)
  const [loadedMap, setLoadedMap] = useState(() => ({}))
  const headerTouchY = useRef(null)
  const galleryTouchStart = useRef(null)

  useFocusTrap(dialogRef, open)

  useEffect(() => {
    if (!open) return undefined
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow || ''
    }
  }, [open])

  useEffect(() => {
    if (!open || !stay) return undefined
    prevFocusRef.current = document.activeElement
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 60)
    return () => window.clearTimeout(t)
  }, [open, stay])

  useEffect(() => {
    if (open) return undefined
    const el = prevFocusRef.current
    if (el instanceof HTMLElement) {
      window.setTimeout(() => el.focus(), 0)
      prevFocusRef.current = null
    }
    return undefined
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        onClose()
      }
    }
    document.addEventListener('keydown', onKey, true)
    return () => document.removeEventListener('keydown', onKey, true)
  }, [open, onClose])

  const onHeaderTouchStart = (e) => {
    const y = e.changedTouches[0]?.clientY
    headerTouchY.current = typeof y === 'number' ? y : null
  }

  const onHeaderTouchEnd = (e) => {
    const start = headerTouchY.current
    headerTouchY.current = null
    if (start == null) return
    const y = e.changedTouches[0]?.clientY ?? start
    if (y - start > SWIPE_Y_CLOSE) onClose()
  }

  const onGalleryTouchStart = (e) => {
    const t = e.changedTouches[0]
    galleryTouchStart.current = t ? { x: t.clientX, y: t.clientY } : null
  }

  const onGalleryTouchEnd = (e) => {
    const start = galleryTouchStart.current
    galleryTouchStart.current = null
    if (!start || !stay) return
    const t = e.changedTouches[0]
    if (!t) return
    const dx = t.clientX - start.x
    const dy = t.clientY - start.y
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_X) {
      const max = stay.gallery.length - 1
      if (dx < 0) setSlideIndex((i) => Math.min(max, i + 1))
      else setSlideIndex((i) => Math.max(0, i - 1))
    }
  }

  const checkAvailability = () => {
    if (!stay) return
    bookingShell.openBookingFlow({ stayId: stay.id, step: 'stay' })
    onClose()
  }

  if (!open || !stay) return null

  const slides = stay.gallery
  const trackTransform = `translateX(-${slideIndex * 100}%)`

  return createPortal(
    <div
      className={styles.backdrop}
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header
          className={styles.header}
          onTouchStart={onHeaderTouchStart}
          onTouchEnd={onHeaderTouchEnd}
        >
          <h2 id={titleId} className={styles.title}>
            {stay.name}
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            className={styles.closeBtn}
            aria-label="Close stay details"
            onClick={onClose}
          >
            <IconClose />
          </button>
        </header>

        <div className={styles.scroll}>
          <div className={styles.grid}>
            <div>
              <div
                className={`${styles.galleryMain} ${styles.gallerySwipe}`}
                onTouchStart={onGalleryTouchStart}
                onTouchEnd={onGalleryTouchEnd}
              >
                <div className={styles.mainAspect}>
                  <div className={styles.mainTrack} style={{ transform: trackTransform }}>
                    {slides.map((slide, i) => {
                      const hasSrc = Boolean(slide.src?.trim())
                      const showSkeleton = hasSrc && !loadedMap[i]
                      return (
                        <div key={`modal-${slide.alt}-${i}`} className={styles.mainSlide}>
                          {!hasSrc ? (
                            <div className={styles.placeholderFill} aria-hidden>
                              <div className={styles.skeleton} />
                            </div>
                          ) : (
                            <>
                              {showSkeleton ? <div className={styles.skeleton} aria-hidden /> : null}
                              <img
                                className={styles.mainImg}
                                src={slide.src}
                                alt={slide.alt}
                                width={800}
                                height={1000}
                                sizes="(min-width: 900px) 45vw, 100vw"
                                decoding="async"
                                loading={i === 0 ? 'eager' : 'lazy'}
                                fetchPriority={i === 0 ? 'high' : undefined}
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
                </div>
              </div>

              <div className={styles.dots} role="group" aria-label="Gallery photos">
                {slides.map((_, i) => (
                  <button
                    key={`dot-${stay.id}-${i}`}
                    type="button"
                    className={`${styles.dot} ${i === slideIndex ? styles.dotActive : ''}`}
                    aria-label={`Photo ${i + 1}`}
                    aria-current={i === slideIndex ? 'true' : undefined}
                    onClick={() => setSlideIndex(i)}
                  />
                ))}
              </div>
            </div>

            <aside className={styles.sidebar}>
              <p className={styles.dream}>{stay.dreamLong}</p>

              <div>
                <h3 className={styles.featureHeading}>Everything included</h3>
                <div className={styles.featureGrid}>
                  {stay.modalFeatures.map((f) => (
                    <div key={`${stay.id}-modal-${f.iconId}-${f.label}`} className={styles.featureCell}>
                      <StayFeatureIcon iconId={f.iconId} size={24} />
                      <span className="font-mono">{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.ctaRow}>
                <button type="button" className={styles.primaryBtn} onClick={checkAvailability}>
                  Check Availability
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
