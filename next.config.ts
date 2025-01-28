import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_DEV_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_DEV_STRIPE_PUBLISHABLE_KEY,
  }
};

export default nextConfig;
