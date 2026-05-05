import styles from './BrandTile.module.css'

/**
 * Visual anchor in the review masonry — breakfast / livestock imagery slots in here later.
 * Empty `src` keeps CLS predictable via fixed aspect-ratio (matches Hero media placeholder pattern).
 *
 * @param {{ imageSrc?: string; imageAlt?: string; caption?: string }} props
 */
export function BrandTile({
  imageSrc,
  imageAlt = '',
  caption = 'Farm breakfast hamper — sourdough, eggs, and whatever the hedgerow is offering.',
}) {
  const hasImage = Boolean(imageSrc)

  return (
    <figure className={styles.figure}>
      <div className={styles.media}>
        {hasImage ? (
          <img
            className={styles.img}
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            width={640}
            height={480}
          />
        ) : (
          <div className={styles.placeholder} role="img" aria-label="Photography placeholder: breakfast hamper and farm produce">
            <p className={styles.mediaCue}>IMG · Breakfast hamper · Lambs in pasture</p>
          </div>
        )}
      </div>
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  )
}
