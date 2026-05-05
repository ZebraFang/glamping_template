import { useEffect, useId, useRef, useState } from 'react'
import { BookingSheetMobile } from './BookingSheetMobile.jsx'
import { DatesSection, GuestsSection, StaySection } from './BookingFlowContent.jsx'
import styles from './HeroBookingBar.module.css'
import { desktopNavMediaQuery } from '../constants/breakpoints.js'
import { HERO_STAYS } from '../data/heroStays.js'

export { HERO_STAYS }

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
 * — Desktop (≥900px): toggles anchored panel (full demo: stays, calendar, guests, confirm).
 * — Mobile: “Tap to plan” / “Book your escape” open the full-viewport portaled sheet (same flow).
 *
 * @param {{ bookingShell: import('../hooks/useBookingShell.js').BookingShellApi }} props
 */
export function HeroBookingBar({ bookingShell }) {
  const isDesktop = useIsDesktop()
  const {
    booking,
    mobileOpen,
    setMobileOpen,
    activeDesktopStep,
    setActiveDesktopStep,
    desktopValidationMessage,
    setDesktopValidationMessage,
  } = bookingShell
  const rootRef = useRef(null)
  const panelBaseId = useId()
  const sheetDialogId = useId()

  const staySummaryDesktop = booking.summary.stayName

  useEffect(() => {
    if (!activeDesktopStep || !isDesktop) return undefined
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setActiveDesktopStep(null)
    }
    document.addEventListener('pointerdown', onPointerDown, true)
    return () => document.removeEventListener('pointerdown', onPointerDown, true)
  }, [activeDesktopStep, isDesktop, setActiveDesktopStep])

  const toggleDesktopStep = (step) =>
    setActiveDesktopStep((current) => {
      setDesktopValidationMessage('')
      return current === step ? null : step
    })

  const openMobileBooking = () => {
    setDesktopValidationMessage('')
    setMobileOpen(true)
  }

  const onDesktopCtaSubmit = () => {
    if (booking.canConfirm) {
      setDesktopValidationMessage('Ready to confirm (demo mode).')
      return
    }
    const missing = booking.firstIncompleteStep || 'dates'
    const stepLabel =
      missing === 'stay' ? 'stay' : missing === 'guests' ? 'guest details' : 'dates'
    setDesktopValidationMessage(`Add ${stepLabel} before confirm.`)
    setActiveDesktopStep(missing)
  }

  return (
    <div id="book" className={styles.root} ref={rootRef}>
      <div className={styles.bar}>
        <div className={styles.segmentSlot}>
          <button
            type="button"
            className={`${styles.segment} ${styles.segmentStay} ${activeDesktopStep === 'stay' ? styles.segmentStayActive : ''}`}
            aria-expanded={isDesktop ? activeDesktopStep === 'stay' : mobileOpen}
            aria-controls={isDesktop ? `${panelBaseId}-stay` : sheetDialogId}
            onClick={isDesktop ? () => toggleDesktopStep('stay') : openMobileBooking}
          >
            <span className={styles.tapHint}>Tap to plan</span>
            <span className={styles.segmentLabel}>Choose your stay</span>
            <span className={styles.segmentValueDesktop} aria-hidden>
              {staySummaryDesktop}
            </span>
          </button>
          {isDesktop ? (
            <div
              id={`${panelBaseId}-stay`}
              className={`${styles.stepPopover} ${styles.stayPopover} ${activeDesktopStep === 'stay' ? styles.stepPopoverOpen : ''}`}
              aria-hidden={activeDesktopStep !== 'stay'}
            >
              <StaySection booking={booking} variant="panel" />
            </div>
          ) : null}
        </div>

        <span className={styles.divider} aria-hidden />

        <div className={styles.segmentSlot}>
          <button
            type="button"
            className={`${styles.segment} ${styles.segmentDates} ${activeDesktopStep === 'dates' ? styles.segmentStayActive : ''}`}
            aria-expanded={isDesktop ? activeDesktopStep === 'dates' : mobileOpen}
            aria-controls={isDesktop ? `${panelBaseId}-dates` : sheetDialogId}
            onClick={isDesktop ? () => toggleDesktopStep('dates') : openMobileBooking}
          >
            <span className={styles.segmentLabel}>Dates</span>
            <span className={styles.segmentValueDesktop}>{booking.summary.datesLabel}</span>
          </button>
          {isDesktop ? (
            <div
              id={`${panelBaseId}-dates`}
              className={`${styles.stepPopover} ${styles.datesPopover} ${activeDesktopStep === 'dates' ? styles.stepPopoverOpen : ''}`}
              aria-hidden={activeDesktopStep !== 'dates'}
            >
              <DatesSection booking={booking} variant="panel" />
            </div>
          ) : null}
        </div>

        <span className={styles.divider} aria-hidden />

        <div className={styles.segmentSlot}>
          <button
            type="button"
            className={`${styles.segment} ${styles.segmentGuests} ${activeDesktopStep === 'guests' ? styles.segmentStayActive : ''}`}
            aria-expanded={isDesktop ? activeDesktopStep === 'guests' : mobileOpen}
            aria-controls={isDesktop ? `${panelBaseId}-guests` : sheetDialogId}
            onClick={isDesktop ? () => toggleDesktopStep('guests') : openMobileBooking}
          >
            <span className={styles.segmentLabel}>Guests</span>
            <span className={styles.segmentValueDesktop}>{booking.summary.guestsLabel}</span>
          </button>
          {isDesktop ? (
            <div
              id={`${panelBaseId}-guests`}
              className={`${styles.stepPopover} ${styles.guestsPopover} ${activeDesktopStep === 'guests' ? styles.stepPopoverOpen : ''}`}
              aria-hidden={activeDesktopStep !== 'guests'}
            >
              <GuestsSection booking={booking} variant="panel" />
            </div>
          ) : null}
        </div>

        <button
          type="button"
          className={styles.cta}
          aria-haspopup={!isDesktop ? 'dialog' : undefined}
          aria-controls={!isDesktop ? sheetDialogId : undefined}
          onClick={isDesktop ? onDesktopCtaSubmit : openMobileBooking}
        >
          Book your escape
        </button>
      </div>

      {isDesktop && desktopValidationMessage ? (
        <p className={styles.desktopValidation} role="status">
          {desktopValidationMessage}
        </p>
      ) : null}

      {!isDesktop ? (
        <BookingSheetMobile
          open={mobileOpen}
          onClose={() => {
            setMobileOpen(false)
            setDesktopValidationMessage('')
          }}
          booking={booking}
          dialogId={sheetDialogId}
        />
      ) : null}
    </div>
  )
}
