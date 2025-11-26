import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Sử dụng remotePatterns thay vì domains (best practice cho Next.js 13+)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
    // Cấu hình tối ưu hóa hình ảnh
    formats: ['image/avif', 'image/webp'],
    // Chất lượng hình ảnh (1-100, mặc định 75)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Tối ưu cho production
    minimumCacheTTL: 60,
    // Bật tối ưu hóa (mặc định là true, nhưng để rõ ràng)
    unoptimized: false,
  },
};

export default nextConfig;
