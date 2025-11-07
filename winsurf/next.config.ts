import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Désactive l'export statique
  output: undefined,
  
  images: {
    unoptimized: true,
    domains: ['res.cloudinary.com'],
  },
}

export default nextConfig