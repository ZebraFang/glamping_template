import styles from './LeadDemoToast.module.css'

/** Stand-in until a real lead-capture modal ships with the template. */
export function LeadDemoToast({ onDismiss }) {
  return (
    <div className={styles.wrap} role="status">
      <span>Lead popup placeholder</span>
      <button type="button" className={styles.dismiss} onClick={onDismiss}>
        Dismiss
      </button>
    </div>
  )
}
