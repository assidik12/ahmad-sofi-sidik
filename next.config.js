/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Fix 3 & 4: Kurangi JS bundle size — pisahkan vendor chunks
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // Fix 2: Compress responses untuk kurangi network transfer
  compress: true,

  // Fix 3: Matikan source maps di production untuk kurangi main-thread work
  productionBrowserSourceMaps: false,

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

module.exports = nextConfig;
