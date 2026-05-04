import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { HERO_STAYS } from '../data/heroStays.js'
import styles from './BookingSheetMobile.module.css'

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M6 6 L18 18 M18 6 L6 18" strokeLinecap="round" />
    </svg>
  )
}

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

/** Mon-first week row labels */
const DOW = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

/**
 * Static May 2026 grid (visual only). May 1 = Friday → 4 leading blanks.
 */
function CalendarPlaceholder() {
  const leading = 4
  const daysInMonth = 31
  const cells = []
  for (let i = 0; i < leading; i += 1) cells.push(null)
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  while (cells.length < 42) cells.push(null)

  const cellClass = (day) => {
    if (!day) return styles.calCell
    if (day < 4) return `${styles.calCell} ${styles.calCellMuted}`
    if (day === 12 || day === 15) return `${styles.calCell} ${styles.calCellEnd}`
    if (day === 13 || day === 14) return `${styles.calCell} ${styles.calCellRange}`
    return styles.calCell
  }

  return (
    <div className={styles.placeholderBlock}>
      <p className={styles.placeholderTitle}>May 2026</p>
      <p className={styles.placeholderNote}>
        Calendar preview — date selection will connect here in a later step.
      </p>
      <div className={styles.calGrid}>
        {DOW.map((d, i) => (
          <div key={`dow-${i}`} className={styles.calDow}>
            {d}
          </div>
        ))}
        {cells.map((day, i) => (
          <div key={i} className={day ? cellClass(day) : `${styles.calCell} ${styles.calCellMuted}`}>
            {day || ''}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Full-viewport booking surface for narrow viewports (portaled to `document.body`).
 */
export function BookingSheetMobile({ open, onClose, selectedId, onSelectStay, dialogId }) {
  const closeBtnRef = useRef(null)
  const titleId = useId()
  const hadOpenRef = useRef(false)

  const selected = HERO_STAYS.find((s) => s.id === selectedId) ?? HERO_STAYS[0]

  useEffect(() => {
    if (!open) return undefined
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow || ''
    }
  }, [open])

  useEffect(() => {
    if (!open) {
      if (hadOpenRef.current) closeBtnRef.current?.blur()
      return undefined
    }
    hadOpenRef.current = true
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 60)
    return () => window.clearTimeout(t)
  }, [open])

  if (!open) return null

  return createPortal(
    <div
      id={dialogId}
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <header className={styles.header}>
        <h2 id={titleId} className={styles.title}>
          Book your escape
        </h2>
        <button
          ref={closeBtnRef}
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close booking"
        >
          <IconClose />
        </button>
      </header>

      <div className={styles.scroll}>
        <section className={styles.section} aria-label="Choose your stay">
          <div className={styles.sectionHead}>
            <span className={styles.sectionNum} aria-hidden>
              1
            </span>
            <span className={styles.sectionLabel}>Choose your stay</span>
          </div>
          <ul className={styles.stayList}>
            {HERO_STAYS.map((stay) => {
              const isSelected = stay.id === selectedId
              return (
                <li key={stay.id}>
                  <button
                    type="button"
                    className={`${styles.stayOption} ${isSelected ? styles.stayOptionSelected : ''}`}
                    aria-pressed={isSelected}
                    onClick={() => onSelectStay(stay.id)}
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
        </section>

        <section className={styles.section} aria-label="Pick your dates">
          <div className={styles.sectionHead}>
            <span className={styles.sectionNum} aria-hidden>
              2
            </span>
            <span className={styles.sectionLabel}>Pick your dates</span>
          </div>
          <CalendarPlaceholder />
        </section>

        <section className={styles.section} aria-label="Who is coming">
          <div className={styles.sectionHead}>
            <span className={styles.sectionNum} aria-hidden>
              3
            </span>
            <span className={styles.sectionLabel}>Who&apos;s coming</span>
          </div>
          <div className={styles.placeholderBlock}>
            <div className={styles.guestRow}>
              <div>
                <span className={styles.guestLabel}>Adults</span>
                <span className={styles.guestHint}>Age 13+</span>
              </div>
              <span className={styles.guestStub}>2 · steppers later</span>
            </div>
            <div className={styles.guestRow}>
              <div>
                <span className={styles.guestLabel}>Children</span>
                <span className={styles.guestHint}>Age 2–12</span>
              </div>
              <span className={styles.guestStub}>0</span>
            </div>
            <div className={styles.guestRow}>
              <div>
                <span className={styles.guestLabel}>Dogs</span>
                <span className={styles.guestHint}>Pet-friendly stays</span>
              </div>
              <span className={styles.guestStub}>0</span>
            </div>
          </div>
          <p className={styles.policyLine}>Free cancellation up to 14 days before</p>
        </section>
      </div>

      <footer className={styles.footer}>
        <div className={styles.summary}>
          <span className={styles.summaryRate}>{selected.priceLabel}</span>
          <span className={styles.summaryLine}>3 nights · 2 guests</span>
        </div>
        <button type="button" className={styles.confirmBtn} disabled>
          Confirm
        </button>
      </footer>
    </div>,
    document.body,
  )
}
