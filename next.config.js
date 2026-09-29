/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Old project slug renamed
      { source: '/projects/vulnerability-research', destination: '/projects/npm-supply-chain', permanent: true },
    ]
  },
}

module.exports = nextConfig
