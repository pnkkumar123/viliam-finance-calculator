/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // disable turbopack
  },
  swcMinify: true,
};

export default nextConfig;
