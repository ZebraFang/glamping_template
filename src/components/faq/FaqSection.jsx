import { useMemo } from 'react'
import { FAQ_ITEMS, FAQ_SECTION_META } from '../../data/faqContent.js'
import { FaqAccordion } from './FaqAccordion.jsx'
import { PackLightToggle } from './PackLightToggle.jsx'
import styles from './FaqSection.module.css'

function buildFaqPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer.replace(/\s+/g, ' ').trim(),
      },
    })),
  }
}

/**
 * Editorial FAQ + pack-light block with FAQPage JSON-LD for SEO (rich results when Google opts in — not guaranteed).
 */
export function FaqSection() {
  const jsonLd = useMemo(() => JSON.stringify(buildFaqPageSchema()), [])
  const { id, title, subtitle } = FAQ_SECTION_META
  const headingId = `${id}-heading`

  return (
    <section id={id} className={styles.section} aria-labelledby={headingId}>
      {/* FAQPage structured data — eligible for FAQ rich results when Google chooses to show them */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <div className={styles.inner}>
        <header className={styles.headerBlock}>
          <h2 id={headingId} className={styles.title}>
            {title}
          </h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </header>

        <FaqAccordion items={FAQ_ITEMS} />
        <PackLightToggle />
      </div>
    </section>
  )
}
