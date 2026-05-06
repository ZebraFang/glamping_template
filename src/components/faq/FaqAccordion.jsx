import { useId, useState } from 'react'
import { AccordionIcon } from './AccordionIcon.jsx'
import styles from './FaqAccordion.module.css'

/**
 * Single-open accordion; desktop uses a 3+2 editorial column split for five items.
 *
 * @param {{ items: import('../../data/faqContent.js').FaqItem[] }} props
 */
export function FaqAccordion({ items }) {
  const [openId, setOpenId] = useState(null)
  const baseId = useId()

  const toggle = (id) => {
    setOpenId((current) => (current === id ? null : id))
  }

  const onHeaderKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle(id)
    }
  }

  return (
    <ul className={styles.list}>
      {items.map((item) => {
        const expanded = openId === item.id
        const panelId = `${baseId}-panel-${item.id}`
        const headerId = `${baseId}-header-${item.id}`

        return (
          <li key={item.id} className={styles.item}>
            <button
              type="button"
              id={headerId}
              className={styles.header}
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => toggle(item.id)}
              onKeyDown={(e) => onHeaderKeyDown(e, item.id)}
            >
              <span>{item.question}</span>
              <AccordionIcon expanded={expanded} />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              aria-hidden={!expanded}
              className={`${styles.panelWrap} ${expanded ? styles.panelWrapOpen : ''}`}
            >
              <div className={styles.panel}>{item.answer}</div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
