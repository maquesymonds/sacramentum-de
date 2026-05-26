/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Image optimization ─────────────────────────────────────────────────────
  images: {
    formats:           ["image/avif", "image/webp"],
    deviceSizes:       [640, 768, 1024, 1280, 1440, 1920],
    imageSizes:        [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL:   60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },

  // ── Compiler ───────────────────────────────────────────────────────────────
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // ── Experimental ──────────────────────────────────────────────────────────
  // optimizeCss requires the 'critters' package — enable after: npm i critters
  // experimental: { optimizeCss: true },
};

export default nextConfig;
