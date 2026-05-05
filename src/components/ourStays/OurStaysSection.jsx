import { useState } from 'react'
import { STAYS_CATALOG } from '../../data/staysCatalog.js'
import styles from './OurStaysSection.module.css'
import { StayCard } from './StayCard.jsx'
import { StayDetailModal } from './StayDetailModal.jsx'

/**
 * @param {{ bookingShell: import('../../hooks/useBookingShell.js').BookingShellApi }} props
 */
export function OurStaysSection({ bookingShell }) {
  const [detailStayId, setDetailStayId] = useState(null)
  const detailStay = STAYS_CATALOG.find((s) => s.id === detailStayId) ?? null

  return (
    <section id="stays" className={styles.section} aria-labelledby="stays-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="stays-heading" className={styles.title}>
            Our stays
          </h2>
          <p className={styles.subtitle}>
            Three corners of the farm — each with its own view, tub or deck, and the same slow
            morning light.
          </p>
        </header>

        <ul className={styles.grid}>
          {STAYS_CATALOG.map((stay, i) => (
            <li
              key={stay.id}
              className={styles.cardSlot}
              style={{ zIndex: i + 1 }}
            >
              <StayCard
                stay={stay}
                selected={bookingShell.booking.state.selectedStayId === stay.id}
                onSelectStay={(id) => bookingShell.booking.actions.setStay(id)}
                onOpenDetail={() => setDetailStayId(stay.id)}
              />
            </li>
          ))}
        </ul>
      </div>

      <StayDetailModal
        key={detailStayId ?? 'idle'}
        stay={detailStay}
        open={Boolean(detailStay)}
        onClose={() => setDetailStayId(null)}
        bookingShell={bookingShell}
      />
    </section>
  )
}
