import styles from './AccordionIcon.module.css'

/**
 * Soft “+” that rotates toward “×” when expanded (visual only; button carries label).
 */
export function AccordionIcon({ expanded }) {
  return (
    <span className={`${styles.wrap} ${expanded ? styles.wrapExpanded : ''}`} aria-hidden>
      <svg className={styles.svg} viewBox="0 0 24 24" fill="none">
        <path
          className={styles.barH}
          d="M5 12h14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          className={styles.barV}
          d="M12 5v14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}
