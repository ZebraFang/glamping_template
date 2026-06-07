/**
 * Build responsive AVIF variants for the hero LCP image.
 * Run: npm run images:hero
 */
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const input = path.join(root, 'public/images/golden-hour-yorkshire-two.avif')
const outDir = path.join(root, 'public/images')

/** Widths emitted as `-{width}.avif` (master file kept at full resolution). */
const WIDTHS = [640, 960, 1280]

const meta = await sharp(input).metadata()
const masterWidth = meta.width ?? 1920

await mkdir(outDir, { recursive: true })

for (const width of WIDTHS) {
  if (width >= masterWidth) continue
  const out = path.join(outDir, `golden-hour-yorkshire-two-${width}.avif`)
  /** Larger targets use slightly lower quality so variants stay below the master file size. */
  const quality = width >= 1280 ? 50 : width >= 960 ? 58 : 62
  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .avif({ quality, effort: 4 })
    .toFile(out)
  console.log(`Wrote ${path.relative(root, out)}`)
}

console.log(`Master unchanged: ${path.relative(root, input)} (${masterWidth}px wide)`)
