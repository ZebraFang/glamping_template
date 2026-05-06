import styles from './FarmMapMarkers.module.css'

/**
 * @param {{
 *   locations: import('../../data/farmMap.js').FarmMapLocation[];
 *   activeId: string;
 *   onSelect: (id: string) => void;
 * }} props
 */
export function FarmMapMarkers({ locations, activeId, onSelect }) {
  return (
    <>
      {locations.map((loc) => {
        const active = loc.id === activeId
        const topPct = (loc.svgY / 110) * 100

        return (
          <button
            key={loc.id}
            type="button"
            className={`${styles.hotspot} ${active ? styles.hotspotActive : ''}`}
            style={{ left: `${loc.svgX}%`, top: `${topPct}%` }}
            aria-label={loc.name}
            aria-pressed={active}
            onClick={() => onSelect(loc.id)}
          >
            <span className={styles.label}>{loc.shortLabel}</span>
          </button>
        )
      })}
    </>
  )
}
