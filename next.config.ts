import type { NextConfig } from "next";

const brand = process.env.NEXT_PUBLIC_BRAND || 'default';

const nextConfig: NextConfig = {
  env: {
    BRAND: brand,
    NEXT_PUBLIC_BRAND: brand,
  },
  output: 'export',
};

export default nextConfig;