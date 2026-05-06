/**
 * Dashed curves from the active location to every other marker (SVG coordinates).
 */
export function FarmMapConnectors({ locations, activeId }) {
  const active = locations.find((l) => l.id === activeId)
  if (!active) return null

  return (
    <g
      fill="none"
      stroke="var(--color-terracotta)"
      strokeWidth="0.35"
      strokeDasharray="1 0.85"
      opacity="0.55"
      strokeLinecap="round"
      aria-hidden
    >
      {locations
        .filter((l) => l.id !== activeId)
        .map((target) => (
          <path
            key={`${active.id}-to-${target.id}`}
            d={curveBetween(active.svgX, active.svgY, target.svgX, target.svgY)}
          />
        ))}
    </g>
  )
}

function curveBetween(x1, y1, x2, y2) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1
  const ox = (-dy / len) * 6
  const oy = (dx / len) * 6
  const cx = mx + ox
  const cy = my + oy
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`
}
