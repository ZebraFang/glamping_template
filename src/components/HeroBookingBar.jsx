import { useEffect, useId, useRef, useState } from 'react'
import { BookingSheetMobile } from './BookingSheetMobile.jsx'
import styles from './HeroBookingBar.module.css'
import { HERO_STAYS } from '../data/heroStays.js'
import { desktopNavMediaQuery } from '../constants/breakpoints.js'

export { HERO_STAYS }

function IconCheck({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M6 10 L9 13 L14 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(desktopNavMediaQuery).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(desktopNavMediaQuery)
    const sync = () => setIsDesktop(mq.matches)
    mq.addEventListener('change', sync)
    sync()
    return () => mq.removeEventListener('change', sync)
  }, [])

  return isDesktop
}

/**
 * Parchment booking strip.
 * — Desktop (≥900px): “Choose your stay” toggles anchored panel under the bar; CTA opens the same panel.
 * — Mobile: “Tap to plan” and “Book your escape” open a full-viewport portaled sheet (thumb-scroll layout).
 */
export function HeroBookingBar() {
  const isDesktop = useIsDesktop()
  const [bookingOpen, setBookingOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(HERO_STAYS[0].id)
  const rootRef = useRef(null)
  const panelId = useId()
  const sheetDialogId = useId()

  const selected = HERO_STAYS.find((s) => s.id === selectedId) ?? HERO_STAYS[0]
  const staySummaryDesktop = selected.name

  useEffect(() => {
    const mq = window.matchMedia(desktopNavMediaQuery)
    const closeOnBreakpointChange = () => {
      setBookingOpen(false)
    }
    mq.addEventListener('change', closeOnBreakpointChange)
    return () => mq.removeEventListener('change', closeOnBreakpointChange)
  }, [])

  useEffect(() => {
    if (!bookingOpen) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setBookingOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [bookingOpen])

  useEffect(() => {
    if (!bookingOpen || !isDesktop) return undefined
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setBookingOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown, true)
    return () => document.removeEventListener('pointerdown', onPointerDown, true)
  }, [bookingOpen, isDesktop])

  const toggleBookingFromStay = () => setBookingOpen((o) => !o)

  const openBookingFromCta = () => setBookingOpen(true)

  return (
    <div id="book" className={styles.root} ref={rootRef}>
      <div className={styles.bar}>
        <button
          type="button"
          className={`${styles.segment} ${styles.segmentStay} ${bookingOpen ? styles.segmentStayActive : ''}`}
          aria-expanded={bookingOpen}
          aria-controls={isDesktop ? panelId : sheetDialogId}
          onClick={toggleBookingFromStay}
        >
          <span className={styles.tapHint}>Tap to plan</span>
          <span className={styles.segmentLabel}>Choose your stay</span>
          <span className={styles.segmentValueDesktop} aria-hidden>
            {staySummaryDesktop}
          </span>
        </button>

        <span className={styles.divider} aria-hidden />

        <button
          type="button"
          className={`${styles.segment} ${styles.segmentMuted} ${styles.segmentDates}`}
          disabled
        >
          <span className={styles.segmentLabel}>Add dates</span>
          <span className={styles.segmentValueDesktop}>Add dates</span>
        </button>

        <span className={styles.divider} aria-hidden />

        <button
          type="button"
          className={`${styles.segment} ${styles.segmentMuted} ${styles.segmentGuests}`}
          disabled
        >
          <span className={styles.segmentLabel}>Add guests</span>
          <span className={styles.segmentValueDesktop}>2 adults</span>
        </button>

        <button
          type="button"
          className={styles.cta}
          aria-haspopup={!isDesktop ? 'dialog' : undefined}
          aria-controls={!isDesktop ? sheetDialogId : undefined}
          onClick={openBookingFromCta}
        >
          Book your escape
        </button>
      </div>

      {isDesktop ? (
        <div
          id={panelId}
          className={`${styles.panel} ${bookingOpen ? styles.panelOpen : ''}`}
          role="region"
          aria-label="Choose your stay"
          aria-hidden={!bookingOpen}
        >
          <ul className={styles.stayList}>
            {HERO_STAYS.map((stay) => {
              const isSelected = stay.id === selectedId
              return (
                <li key={stay.id}>
                  <button
                    type="button"
                    className={`${styles.stayOption} ${isSelected ? styles.stayOptionSelected : ''}`}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedId(stay.id)}
                  >
                    <span className={styles.thumb} aria-hidden>
                      <span className={styles.thumbInner}>IMG</span>
                    </span>
                    <span className={styles.stayText}>
                      <span className={styles.stayName}>{stay.name}</span>
                      <span className={styles.stayMeta}>
                        <span className={styles.stayPrice}>{stay.priceLabel}</span>
                        <span className={styles.stayDetail}>{stay.detail}</span>
                      </span>
                    </span>
                    <span className={styles.stayCheck} aria-hidden>
                      {isSelected ? (
                        <IconCheck className={styles.checkIcon} />
                      ) : (
                        <span className={styles.radioOff} />
                      )}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}

      {!isDesktop ? (
        <BookingSheetMobile
          open={bookingOpen}
          onClose={() => setBookingOpen(false)}
          selectedId={selectedId}
          onSelectStay={setSelectedId}
          dialogId={sheetDialogId}
        />
      ) : null}
    </div>
  )
}
