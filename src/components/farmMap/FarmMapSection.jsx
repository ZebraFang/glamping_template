import { useId, useMemo, useState } from 'react'
import { FARM_MAP_LOCATIONS, FARM_MAP_META } from '../../data/farmMap.js'
import { FarmMapConnectors } from './FarmMapConnectors.jsx'
import { FarmMapIllustration } from './FarmMapIllustration.jsx'
import { FarmMapInfoCard } from './FarmMapInfoCard.jsx'
import { FarmMapMarkers } from './FarmMapMarkers.jsx'
import styles from './FarmMapSection.module.css'

export function FarmMapSection() {
  const reactId = useId()
  const patternId = useMemo(() => `farm-map-paper-${reactId.replace(/:/g, '')}`, [reactId])
  const [activeId, setActiveId] = useState('peacock')

  const current =
    FARM_MAP_LOCATIONS.find((l) => l.id === activeId) ?? FARM_MAP_LOCATIONS[0]

  const headingId = `${FARM_MAP_META.sectionId}-heading`

  return (
    <section
      id={FARM_MAP_META.sectionId}
      className={styles.section}
      aria-labelledby={headingId}
    >
      <div className={styles.inner}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowRule} aria-hidden />
          <p className={styles.eyebrowLabel}>{FARM_MAP_META.eyebrow}</p>
        </div>

        <h2 id={headingId} className={styles.title}>
          {FARM_MAP_META.titleBefore}{' '}
          <span className={styles.accent}>{FARM_MAP_META.titleAccent}</span>
        </h2>
        <p className={styles.lead}>{FARM_MAP_META.lead}</p>

        <div className={styles.layout}>
          <div className={styles.mapColumn}>
            <div className={styles.mapFrame}>
              <svg
                className={styles.svg}
                viewBox="0 0 100 110"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label={FARM_MAP_META.mapAriaLabel}
              >
                <FarmMapIllustration patternId={patternId} />
                <FarmMapConnectors locations={FARM_MAP_LOCATIONS} activeId={activeId} />
              </svg>
              <FarmMapMarkers
                locations={FARM_MAP_LOCATIONS}
                activeId={activeId}
                onSelect={setActiveId}
              />
            </div>
          </div>

          <aside className={styles.sidebar} aria-label="Selected location details">
            <FarmMapInfoCard location={current} />
          </aside>
        </div>
      </div>
    </section>
  )
}

/** Re-export for consumers that build custom CTAs */
export { FARM_DIRECTIONS } from '../../data/farmMap.js'
