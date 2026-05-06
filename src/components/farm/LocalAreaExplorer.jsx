import { useMemo, useState } from 'react'
import { ACTIVITIES } from '../../data/localArea.js'
import { useInView } from '../../hooks/useInView.js'
import { ActivityCard } from './ActivityCard.jsx'
import styles from './LocalAreaExplorer.module.css'

const FILTERS = [
  { id: 'all', label: 'ALL' },
  { id: 'hiking', label: 'HIKING' },
  { id: 'dining', label: 'DINING' },
  { id: 'farmLife', label: 'FARM LIFE' },
]

/**
 * Filterable asymmetric mosaic of local activities — stagger restarts when `activePillar` changes (key on list).
 */
export function LocalAreaExplorer() {
  const [activePillar, setActivePillar] = useState('all')
  const { ref, inView } = useInView({ rootMargin: '0px 0px -6% 0px' })

  const visible = useMemo(
    () => ACTIVITIES.filter((a) => activePillar === 'all' || a.pillar === activePillar),
    [activePillar],
  )

  return (
    <div ref={ref} className={styles.root}>
      <nav className={styles.filterNav} aria-label="Filter activities">
        <ul className={styles.filterList}>
          {FILTERS.map((f) => (
            <li key={f.id}>
              <button
                type="button"
                className={`${styles.filterBtn} ${activePillar === f.id ? styles.filterBtnActive : ''}`}
                aria-pressed={activePillar === f.id}
                onClick={() => setActivePillar(f.id)}
              >
                {f.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <ul
        key={activePillar}
        className={styles.mosaic}
        data-animate={inView ? 'on' : 'off'}
      >
        {visible.map((activity, i) => (
          <li
            key={activity.id}
            className={activity.featured ? styles.featuredSlot : styles.standardSlot}
            style={{ '--i': i }}
          >
            <ActivityCard activity={activity} />
          </li>
        ))}
      </ul>
    </div>
  )
}
