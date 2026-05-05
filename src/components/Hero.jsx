import styles from './Hero.module.css'
import { HeroBookingBar } from './HeroBookingBar.jsx'

/**
 * Marketing hero: forest field, headline, lead link, and booking strip.
 * {@link Nav} overlays the top; this block keeps `position: relative` for stacking context.
 *
 * @param {{ bookingShell: import('../hooks/useBookingShell.js').BookingShellApi }} props
 */
export function Hero({ bookingShell }) {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      {/* Reserved full-bleed media layer — fixed min-height avoids CLS when a photo is added */}
      {/* Future: full-bleed <img> or <picture> with explicit width/height + object-fit: cover */}
      <div className={styles.heroMedia} aria-hidden />

      <div className={styles.heroScrim} aria-hidden />

      <div className={styles.heroInner}>
        <div className={styles.heroCopyBlock}>
          <div className={styles.heroStack}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowRule} aria-hidden />
              <span>North Yorkshire · Working farm · Est. 1842</span>
            </p>

            <p className={styles.mediaCue}>IMG / Hero · Smoke from chimney · Golden hour</p>

            <h1 id="hero-heading" className={styles.headline}>
              The countryside you’ve been{' '}
              <span className={styles.headlineAccent}>missing.</span>
            </h1>

            <p className={styles.intro}>
              Trade screens for skylines. Three nights on a real Yorkshire farm — yours to wake to.
            </p>
          </div>

          <a className={styles.leadLink} href="#stories">
            Get the Hidden Farm Walks guide — 10% off
          </a>
        </div>

        <HeroBookingBar bookingShell={bookingShell} />
      </div>
    </section>
  )
}
