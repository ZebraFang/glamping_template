import { HERO_STAYS } from '../data/heroStays.js'
import styles from './bookingFlow.module.css'

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
        <button type="button" className={styles.monthNavBtn} onClick={() => onMoveMonth(-1)} aria-label="Previous month">
          ‹
        </button>
        <p className={styles.placeholderTitle}>
          {monthCursor.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
        </p>
        <button type="button" className={styles.monthNavBtn} onClick={() => onMoveMonth(1)} aria-label="Next month">
          ›
        </button>
      </div>
      <div className={styles.calGrid}>
        {DOW.map((d, i) => (
          <div key={`dow-${i}`} className={styles.calDow}>
            {d}
          </div>
        ))}
        {cells.map((day, i) =>
          day ? (
            (() => {
              const date = new Date(year, month, day)
              const selectable = isDateSelectable(date)
              const isStart = sameDay(checkIn, date)
              const isEnd = sameDay(checkOut, date)
              const inRange = checkIn && checkOut && date > checkIn && date < checkOut
              const className = [styles.calCellBtn, isStart || isEnd ? styles.calCellEnd : '', inRange ? styles.calCellRange : '']
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
          ),
        )}
      </div>
    </div>
  )
}

export function StaySection({ booking, variant = 'sheet' }) {
  const compactClass = variant === 'panel' ? styles.compact : ''
  return (
    <section className={`${styles.section} ${compactClass}`} aria-label="Choose your stay">
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
                  {isSelected ? <IconCheck className={styles.checkIcon} /> : <span className={styles.radioOff} />}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function DatesSection({ booking, variant = 'sheet' }) {
  const compactClass = variant === 'panel' ? styles.compact : ''
  return (
    <section className={`${styles.section} ${compactClass}`} aria-label="Pick your dates">
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
  )
}

export function GuestsSection({ booking, variant = 'sheet' }) {
  const compactClass = variant === 'panel' ? styles.compact : ''
  return (
    <section className={`${styles.section} ${compactClass}`} aria-label="Who is coming">
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
  )
}

/**
 * Stays + dates + guests (no footer) — used by mobile sheet.
 * @param {'sheet' | 'panel'} props.variant
 */
export function BookingFlowBody({ booking, variant = 'sheet' }) {
  const v = variant === 'panel' ? 'panel' : 'sheet'
  return (
    <div className={styles.flowRoot} data-variant={v}>
      <StaySection booking={booking} variant={variant} />
      <DatesSection booking={booking} variant={variant} />
      <GuestsSection booking={booking} variant={variant} />
    </div>
  )
}

/** Summary + confirm — sticky on mobile sheet, end of stack on desktop popovers */
export function BookingFlowFooter({ booking }) {
  const selected = HERO_STAYS.find((s) => s.id === booking.state.selectedStayId) ?? HERO_STAYS[0]
  return (
    <footer className={styles.footer}>
      <div className={styles.summary}>
        <span className={styles.summaryRate}>{selected.priceLabel}</span>
        <span className={styles.summaryLine}>{booking.summary.nightsLabel}</span>
      </div>
      <button type="button" className={styles.confirmBtn} disabled={!booking.canConfirm}>
        Confirm
      </button>
    </footer>
  )
}
