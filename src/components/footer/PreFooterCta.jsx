import { PRE_FOOTER } from '../../data/footerContent.js'
import styles from './PreFooterCta.module.css'

const SCROLL_THEN_OPEN_MS = 480

/** Intrinsic dims for the asset — slot aspect-ratio handles layout; this hints decode/size to the browser. */
const PRE_FOOTER_IMG_DIM = { w: 1600, h: 900 }

/**
 * @param {{ bookingShell: import('../../hooks/useBookingShell.js').BookingShellApi }} props
 */
export function PreFooterCta({ bookingShell }) {
  const handleCta = () => {
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.setTimeout(() => {
      bookingShell.openBookingFlow({ step: 'dates' })
    }, SCROLL_THEN_OPEN_MS)
  }

  return (
    <section className={styles.section} aria-labelledby="pre-footer-heading">
      <div className={styles.inner}>
        <div className={styles.media}>
          <img
            className={styles.photo}
            src="/images/stars.jpg"
            alt="Golden-hour light over the Yorkshire countryside near Hollowfield"
            width={PRE_FOOTER_IMG_DIM.w}
            height={PRE_FOOTER_IMG_DIM.h}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
          <div className={styles.overlay}>
            <h2 id="pre-footer-heading" className={styles.headline}>
              {PRE_FOOTER.titleLine1}
              <span className={styles.accent}>{PRE_FOOTER.titleLine2}</span>
            </h2>
            <button type="button" className={styles.cta} onClick={handleCta}>
              {PRE_FOOTER.ctaLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
