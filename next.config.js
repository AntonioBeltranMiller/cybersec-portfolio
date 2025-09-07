/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Optimize for production
  swcMinify: true,
}
