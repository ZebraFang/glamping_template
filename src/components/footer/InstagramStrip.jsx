import { INSTAGRAM_PLACEHOLDERS } from '../../data/footerContent.js'
import styles from './InstagramStrip.module.css'

function IconInstagram() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  )
}

/**
 * Square tiles — placeholder until real Instagram assets/API are wired.
 */
export function InstagramStrip() {
  return (
    <section className={styles.section} aria-label="Farm on Instagram">
      <div className={styles.inner}>
        <div className={styles.track}>
          {INSTAGRAM_PLACEHOLDERS.map((item) => (
            <div key={item.id} className={styles.cell}>
              <a
                className={styles.link}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.alt} — Instagram (opens in a new tab)`}
              >
                {item.imageSrc ? (
                  <img
                    className={styles.img}
                    src={item.imageSrc}
                    alt={item.alt}
                    width={320}
                    height={320}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className={styles.placeholder} aria-hidden />
                )}
                <span className={styles.overlay} aria-hidden>
                  <IconInstagram />
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
