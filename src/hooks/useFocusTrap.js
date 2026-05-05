import { useEffect } from 'react'

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function listFocusable(root) {
  return Array.from(root.querySelectorAll(FOCUSABLE)).filter(
    (el) => el.getAttribute('aria-hidden') !== 'true' && !el.closest('[aria-hidden="true"]'),
  )
}

/**
 * Keeps Tab cycling inside `containerRef` while `active`.
 * @param {React.RefObject<HTMLElement | null>} containerRef
 * @param {boolean} active
 */
export function useFocusTrap(containerRef, active) {
  useEffect(() => {
    if (!active) return undefined
    const root = containerRef.current
    if (!root) return undefined

    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return
      const nodes = listFocusable(root)
      if (nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [active, containerRef])
}
