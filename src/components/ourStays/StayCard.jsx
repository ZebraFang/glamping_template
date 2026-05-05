import styles from './StayCard.module.css'
import { StayFeatureIcon } from './StayFeatureIcon.jsx'
import { StayImageSlider } from './StayImageSlider.jsx'

/**
 * @param {{
 *   stay: import('../../data/staysCatalog.js').StayCatalogEntry;
 *   selected: boolean;
 *   onSelectStay: (id: string) => void;
 *   onOpenDetail: () => void;
 * }} props
 */
export function StayCard({ stay, selected, onSelectStay, onOpenDetail }) {
  const fromPrice = `From ${stay.priceLabel}`

  return (
    <article
      className={`${styles.article} ${selected ? styles.articleSelected : ''}`}
      aria-current={selected ? 'true' : undefined}
    >
      <StayImageSlider
        slides={stay.gallery}
        badge={stay.featureBadge}
        stayLabel={stay.name}
        onOpenDetail={() => {
          onSelectStay(stay.id)
          onOpenDetail()
        }}
      />

      <div className={styles.body} onClick={() => onSelectStay(stay.id)}>
        <h3 className="stay-title">{stay.name}</h3>
        <p className="stay-description">{stay.dreamShort}</p>

        <div className={styles.iconBar}>
          {stay.cardFeatures.map((f) => (
            <div key={`${stay.id}-${f.iconId}-${f.label}`} className={styles.iconUnit}>
              <StayFeatureIcon iconId={f.iconId} size={24} />
              <span className="font-mono">{f.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>{fromPrice}</span>
          <button
            type="button"
            className={styles.ghostBtn}
            onClick={(e) => {
              e.stopPropagation()
              onSelectStay(stay.id)
              onOpenDetail()
            }}
          >
            Explore Stay
          </button>
        </div>
      </div>
    </article>
  )
}
