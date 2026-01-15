import type { NextConfig } from "next";
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.hashnode.com',
      },
      {
        protocol: 'https',
        hostname: 'medium.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/blogs/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ];
  },
};

export default withPWA(nextConfig);
