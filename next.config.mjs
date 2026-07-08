/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignore compiler worker crashes / type errors during build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
