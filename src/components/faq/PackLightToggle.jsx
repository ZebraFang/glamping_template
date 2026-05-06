import { useId, useState } from 'react'
import {
  FAQ_SECTION_META,
  PACK_LIGHT,
  PACK_LIGHT_LABELS,
} from '../../data/faqContent.js'
import styles from './PackLightToggle.module.css'

export function PackLightToggle() {
  const [mobileTab, setMobileTab] = useState('provided')
  const baseId = useId()
  const panelProvidedId = `${baseId}-panel-provided`
  const panelBringId = `${baseId}-panel-bring`
  const { provided, bring } = PACK_LIGHT
  const rows = Math.max(provided.length, bring.length)

  return (
    <div className={styles.block}>
      <h3 className={styles.heading}>{FAQ_SECTION_META.packLightHeading}</h3>
      <p className={styles.lead}>{FAQ_SECTION_META.packLightLead}</p>

      <div className={styles.toggleRow} role="tablist" aria-label="What to pack">
        <button
          type="button"
          role="tab"
          id={`${baseId}-tab-provided`}
          aria-selected={mobileTab === 'provided'}
          aria-controls={panelProvidedId}
          className={`${styles.toggleBtn} ${mobileTab === 'provided' ? styles.toggleBtnActive : ''}`}
          onClick={() => setMobileTab('provided')}
        >
          {PACK_LIGHT_LABELS.provided}
        </button>
        <button
          type="button"
          role="tab"
          id={`${baseId}-tab-bring`}
          aria-selected={mobileTab === 'bring'}
          aria-controls={panelBringId}
          className={`${styles.toggleBtn} ${mobileTab === 'bring' ? styles.toggleBtnActive : ''}`}
          onClick={() => setMobileTab('bring')}
        >
          {PACK_LIGHT_LABELS.bring}
        </button>
      </div>

      <ul
        id={panelProvidedId}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-provided`}
        hidden={mobileTab !== 'provided'}
        className={styles.mobileList}
      >
        {provided.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <ul
        id={panelBringId}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-bring`}
        hidden={mobileTab !== 'bring'}
        className={styles.mobileList}
      >
        {bring.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      <div className={styles.desktopGrid}>
        <div className={styles.colHead}>{PACK_LIGHT_LABELS.provided}</div>
        <div className={styles.colHead}>{PACK_LIGHT_LABELS.bring}</div>
        {Array.from({ length: rows }, (_, i) => (
          <div key={`pack-row-${i}`} className={styles.row}>
            <div className={`${styles.cell} ${!provided[i] ? styles.cellMuted : ''}`}>
              {provided[i] ?? '—'}
            </div>
            <div className={`${styles.cell} ${!bring[i] ? styles.cellMuted : ''}`}>
              {bring[i] ?? '—'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
