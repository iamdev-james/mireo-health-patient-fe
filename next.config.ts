import withBundleAnalyzer from "@next/bundle-analyzer"
import withPWAInit from "next-pwa"
import { type NextConfig } from "next"

import { env } from "./env.mjs"

const isDev = process.env.NODE_ENV === "development"

const withPWA = withPWAInit({
  dest: "public",
  register: false, // Manual registration for better control
  skipWaiting: true,
  disable: isDev, // Disable in development
  sw: "sw.js",
  scope: "/",
  buildExcludes: [/middleware-manifest\.json$/],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts-cache",
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "gstatic-fonts-cache",
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif|ico)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "images-cache",
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: /^https:\/\/res\.cloudinary\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "cloudinary-images-cache",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    {
      urlPattern: /^https?.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "offlineCache",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
        networkTimeoutSeconds: 10,
      },
    },
  ],
  publicExcludes: ["!robots.txt", "!sitemap.xml"],
})

const config: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  rewrites: async () => [
    { source: "/healthz", destination: "/api/health" },
    { source: "/api/healthz", destination: "/api/health" },
    { source: "/health", destination: "/api/health" },
    { source: "/ping", destination: "/api/health" },
  ],
  experimental: {
    optimizePackageImports: ["@iconify/react"],
  },
  // Image optimization configuration
  images: {
    formats: ["image/webp", "image/avif"],
    // Configure external image domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "fonts.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "fonts.gstatic.com",
      },
    ],
    // Allow SVG optimization
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Minimum cache TTL for optimized images (in seconds)
    minimumCacheTTL: 31536000, // 1 year
  },
}

// Apply transformations conditionally
let finalConfig = config

// Apply PWA wrapper
finalConfig = withPWA(finalConfig)

// Apply bundle analyzer if enabled
if (env.ANALYZE) {
  finalConfig = withBundleAnalyzer({ enabled: env.ANALYZE })(finalConfig)
}

export default finalConfig
