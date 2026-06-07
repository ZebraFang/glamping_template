import styles from './MediaSlot.module.css'

/** @typedef {'featured' | 'standard' | 'hero'} MediaVariant */

/**
 * Fixed aspect-ratio media shell — explicit `width`/`height` on `<img>` reserve space for real photos (CLS).
 * Use `fill` when the slot sits inside a parent that already defines aspect ratio (e.g. featured mosaic tile).
 *
 * @param {{
 *   variant: MediaVariant;
 *   imageSrc?: string;
 *   imageSrcSet?: string;
 *   imageSizes?: string;
 *   imageAlt?: string;
 *   mediaCue: string;
 *   className?: string;
 *   fill?: boolean;
 * }} props
 */
export function MediaSlot({
  variant,
  imageSrc,
  imageSrcSet,
  imageSizes,
  imageAlt = '',
  mediaCue,
  className,
  fill = false,
}) {
  const hasImage = Boolean(imageSrc)

  /** Explicit dimensions match aspect ratios for layout stability when `src` is populated. */
  const dim =
    variant === 'featured'
      ? { w: 800, h: 600 }
      : variant === 'hero'
        ? { w: 1920, h: 2088 }
        : { w: 480, h: 480 }

  return (
    <div className={`${styles.root} ${styles[variant]} ${fill ? styles.fill : ''} ${className ?? ''}`}>
      {hasImage ? (
        <img
          className={styles.img}
          src={imageSrc}
          srcSet={imageSrcSet}
          sizes={imageSizes}
          alt={imageAlt}
          width={dim.w}
          height={dim.h}
          fetchPriority={variant === 'hero' ? 'high' : 'auto'}
          loading={variant === 'hero' ? 'eager' : 'lazy'}
          decoding="async"
        />
      ) : (
        <div className={styles.placeholder} role="img" aria-label={mediaCue}>
          <p className={styles.mediaCue}>{mediaCue}</p>
        </div>
      )}
    </div>
  )
}
