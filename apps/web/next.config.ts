import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Optimize package imports for faster builds and better tree-shaking
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'echarts'],
  },
};

export default nextConfig;
