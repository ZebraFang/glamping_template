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

const DOW = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

function sameDay(a, b) {
  if (!a || !b) return false
  return a.toDateString() === b.toDateString()
}

function CalendarGrid({ monthCursor, checkIn, checkOut, onSelectDate, isDateSelectable, onMoveMonth }) {
  const year = monthCursor.getFullYear()
  const month = monthCursor.getMonth()
  const first = new Date(year, month, 1)
  const leading = (first.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < leading; i += 1) cells.push(null)
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div className={styles.placeholderBlock}>
      <div className={styles.calHeader}>
        <button
          type="button"
          className={styles.monthNavBtn}
          onClick={() => onMoveMonth(-1)}
          aria-label="Previous month"
        >
          ‹
        </button>
        <p className={styles.placeholderTitle}>
          {monthCursor.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
        </p>
        <button
          type="button"
          className={styles.monthNavBtn}
          onClick={() => onMoveMonth(1)}
          aria-label="Next month"
        >
          ›
        </button>
      </div>
      <div className={styles.calGrid}>
        {DOW.map((d, i) => (
          <div key={`dow-${i}`} className={styles.calDow}>
            {d}
          </div>
        ))}
        {cells.map((day, i) => (
          day ? (
            (() => {
              const date = new Date(year, month, day)
              const selectable = isDateSelectable(date)
              const isStart = sameDay(checkIn, date)
              const isEnd = sameDay(checkOut, date)
              const inRange = checkIn && checkOut && date > checkIn && date < checkOut
              const className = [
                styles.calCellBtn,
                isStart || isEnd ? styles.calCellEnd : '',
                inRange ? styles.calCellRange : '',
              ]
                .filter(Boolean)
                .join(' ')
              return (
                <button
                  key={i}
                  type="button"
                  className={className}
                  onClick={() => onSelectDate(date)}
                  disabled={!selectable}
                  aria-pressed={Boolean(isStart || isEnd)}
                >
                  {day}
                </button>
              )
            })()
          ) : (
            <span key={i} className={`${styles.calCell} ${styles.calCellMuted}`} aria-hidden />
          )
        ))}
      </div>
    </div>
  )
}

/**
 * Full-viewport booking surface for narrow viewports (portaled to `document.body`).
 */
export function BookingSheetMobile({ open, onClose, booking, dialogId }) {
  const closeBtnRef = useRef(null)
  const titleId = useId()
  const hadOpenRef = useRef(false)

  const selected = HERO_STAYS.find((s) => s.id === booking.state.selectedStayId) ?? HERO_STAYS[0]

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
              const isSelected = stay.id === booking.state.selectedStayId
              return (
                <li key={stay.id}>
                  <button
                    type="button"
                    className={`${styles.stayOption} ${isSelected ? styles.stayOptionSelected : ''}`}
                    aria-pressed={isSelected}
                    onClick={() => booking.actions.setStay(stay.id)}
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
          <CalendarGrid
            monthCursor={booking.state.monthCursor}
            checkIn={booking.state.checkIn}
            checkOut={booking.state.checkOut}
            onSelectDate={booking.actions.selectDate}
            isDateSelectable={booking.isDateSelectable}
            onMoveMonth={booking.actions.moveMonth}
          />
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
              <div className={styles.stepper}>
                <button
                  type="button"
                  className={styles.stepperBtn}
                  onClick={() => booking.actions.nudgeGuests('adults', -1)}
                  aria-label="Decrease adults"
                >
                  -
                </button>
                <span className={styles.stepperValue}>{booking.state.guests.adults}</span>
                <button
                  type="button"
                  className={styles.stepperBtn}
                  onClick={() => booking.actions.nudgeGuests('adults', 1)}
                  aria-label="Increase adults"
                >
                  +
                </button>
              </div>
            </div>
            <div className={styles.guestRow}>
              <div>
                <span className={styles.guestLabel}>Children</span>
                <span className={styles.guestHint}>Age 2–12</span>
              </div>
              <div className={styles.stepper}>
                <button
                  type="button"
                  className={styles.stepperBtn}
                  onClick={() => booking.actions.nudgeGuests('children', -1)}
                  aria-label="Decrease children"
                >
                  -
                </button>
                <span className={styles.stepperValue}>{booking.state.guests.children}</span>
                <button
                  type="button"
                  className={styles.stepperBtn}
                  onClick={() => booking.actions.nudgeGuests('children', 1)}
                  aria-label="Increase children"
                >
                  +
                </button>
              </div>
            </div>
            <div className={styles.guestRow}>
              <div>
                <span className={styles.guestLabel}>Dogs</span>
                <span className={styles.guestHint}>Pet-friendly stays</span>
              </div>
              <div className={styles.stepper}>
                <button
                  type="button"
                  className={styles.stepperBtn}
                  onClick={() => booking.actions.nudgeGuests('dogs', -1)}
                  aria-label="Decrease dogs"
                >
                  -
                </button>
                <span className={styles.stepperValue}>{booking.state.guests.dogs}</span>
                <button
                  type="button"
                  className={styles.stepperBtn}
                  onClick={() => booking.actions.nudgeGuests('dogs', 1)}
                  aria-label="Increase dogs"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <p className={styles.policyLine}>Free cancellation up to 14 days before</p>
        </section>
      </div>

      <footer className={styles.footer}>
        <div className={styles.summary}>
          <span className={styles.summaryRate}>{selected.priceLabel}</span>
          <span className={styles.summaryLine}>{booking.summary.nightsLabel}</span>
        </div>
        <button type="button" className={styles.confirmBtn} disabled={!booking.canConfirm}>
          Confirm
        </button>
      </footer>
    </div>,
    document.body,
  )
}
