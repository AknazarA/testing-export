import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

// Construct Vite HMR host from environment (for Cayu sandbox)
const instanceName = process.env.DEV_INSTANCE_NAME
const hmrHost = instanceName ? `vite-${instanceName}.sandbox.cayu.app` : 'localhost'
const hmrProtocol = instanceName ? 'wss' : 'ws'
const hmrClientPort = instanceName ? 443 : undefined

// DO NOT MODIFY - Dynamic Cayu plugin loading
async function loadCayuTagger(): Promise<Plugin | null> {
  const pluginPath = path.resolve(__dirname, '../vite-plugins/cayu-tagger/index.ts')
  if (!fs.existsSync(pluginPath)) return null
  try {
    const { cayuTagger } = await import('../vite-plugins/cayu-tagger/index.ts')
    return cayuTagger()
  } catch {
    return null
  }
}

// DO NOT MODIFY - Dynamic Cayu plugin loading
async function loadCayuBuildErrors(): Promise<Plugin | null> {
  const pluginPath = path.resolve(__dirname, '../vite-plugins/cayu-build-errors/index.ts')
  if (!fs.existsSync(pluginPath)) return null
  try {
    const { cayuBuildErrors } = await import('../vite-plugins/cayu-build-errors/index.ts')
    return cayuBuildErrors()
  } catch {
    return null
  }
}

export default defineConfig(async () => {
  const cayuTaggerPlugin = await loadCayuTagger()
  const cayuBuildErrorsPlugin = await loadCayuBuildErrors()

  return {
    plugins: [
      // DO NOT MODIFY plugin order - Cayu plugins must come first
      cayuTaggerPlugin,
      cayuBuildErrorsPlugin,
      tailwindcss(),
      TanStackRouterVite(),
      react(),
    ].filter(Boolean) as Plugin[],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
      // Allow Cayu sandbox domains and nip.io for IP-based access
      allowedHosts: ['.sandbox.cayu.app', '.nip.io'],
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
        },
      },
      hmr: {
        host: hmrHost,
        protocol: hmrProtocol,
        clientPort: hmrClientPort,
        overlay: true, // DO NOT MODIFY - needed for error capture
      },
    },
  }
})
