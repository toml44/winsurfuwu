import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: true,
  },
  // Ajout de la configuration pour les routes de base
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  // Important pour le routage côté client
  trailingSlash: true,
  // Désactive le mode strict pour éviter les problèmes de rendu en production
  reactStrictMode: false,
}

export default nextConfig