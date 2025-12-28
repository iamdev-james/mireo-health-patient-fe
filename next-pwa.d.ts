declare module "next-pwa" {
  import { NextConfig } from "next"

  interface RuntimeCachingEntry {
    urlPattern: RegExp | string
    handler: "CacheFirst" | "NetworkFirst" | "NetworkOnly" | "CacheOnly" | "StaleWhileRevalidate"
    options?: {
      cacheName?: string
      expiration?: {
        maxEntries?: number
        maxAgeSeconds?: number
        purgeOnQuotaError?: boolean
      }
      cacheableResponse?: {
        statuses?: number[]
        headers?: Record<string, string>
      }
      backgroundSync?: {
        name: string
        options?: {
          maxRetentionTime?: number
        }
      }
      broadcastUpdate?: {
        channelName?: string
      }
      matchOptions?: {
        ignoreSearch?: boolean
        ignoreMethod?: boolean
        ignoreVary?: boolean
      }
      networkTimeoutSeconds?: number
      plugins?: any[]
    }
  }

  interface PWAConfig {
    dest?: string
    sw?: string
    register?: boolean
    skipWaiting?: boolean
    disable?: boolean
    scope?: string
    reloadOnOnline?: boolean
    cacheOnFrontEndNav?: boolean
    cacheStartUrl?: boolean
    dynamicStartUrl?: boolean
    dynamicStartUrlRedirect?: string
    buildExcludes?: (string | RegExp)[]
    publicExcludes?: string[]
    fallbacks?: Record<string, string>
    cacheOnNavigation?: boolean
    runtimeCaching?: RuntimeCachingEntry[]
    subdomainPrefix?: string
    manifestTransforms?: any[]
    modifyURLPrefix?: Record<string, string>
    additionalManifestEntries?: any[]
    [key: string]: any
  }

  function withPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig

  export = withPWA
}
