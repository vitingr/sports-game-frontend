/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  typescript: {
      ignoreBuildErrors: true,
  },
  experimental: {
      serverComponentsExternalPackages: ["mongoose"],
  },
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
  },
  webpack(config) {
      config.experiments = {
          ...config.experiments,
          topLevelAwait: true,
      }
      return config
  }
}

module.exports = nextConfig