/**
 * Post-build HTML tweaks for LCP:
 * - Async app CSS (critical hero CSS is already inlined in BaseLayout)
 * - Drop React-hoisted hero image preloads (LCP is `#hero-heading`, not the photo)
 */
export function asyncStylesheetsIntegration() {
  const blockingStylesheet =
    /<link rel="stylesheet" href="(\/_astro\/[^"]+\.css)"\s*\/?>/g
  const reactImagePreload =
    /<link rel="preload" as="image"[^>]*\/?>/g

  return {
    name: 'async-stylesheets',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const fs = await import('node:fs/promises')
        const path = await import('node:path')
        const { fileURLToPath } = await import('node:url')
        const outDir = fileURLToPath(dir)
        const indexPath = path.join(outDir, 'index.html')
        let html = await fs.readFile(indexPath, 'utf8')

        html = html.replace(blockingStylesheet, (_match, href) => {
          return [
            `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">`,
            `<noscript><link rel="stylesheet" href="${href}"></noscript>`,
          ].join('')
        })

        html = html.replace(reactImagePreload, '')

        await fs.writeFile(indexPath, html)
      },
    },
  }
}
