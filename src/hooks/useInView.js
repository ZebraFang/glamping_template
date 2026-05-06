import { useLayoutEffect, useRef, useState } from 'react'

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * One-shot intersection: becomes `true` when `ref` enters the viewport, then observer disconnects.
 * With `prefers-reduced-motion: reduce`, starts `true` so stagger is not gated off-screen.
 *
 * @param {{ rootMargin?: string }} [options]
 */
export function useInView(options = {}) {
  const { rootMargin = '0px 0px -8% 0px' } = options
  const ref = useRef(null)
  const [inView, setInView] = useState(prefersReducedMotion)

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || inView) return undefined

    const el = ref.current
    if (!el) return undefined

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { root: null, rootMargin, threshold: 0.08 },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [inView, rootMargin])

  return { ref, inView }
}
