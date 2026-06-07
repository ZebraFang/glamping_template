import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import { asyncStylesheetsIntegration } from './integrations/asyncStylesheets.js'

export default defineConfig({
  output: 'static',
  integrations: [react(), asyncStylesheetsIntegration()],
})
