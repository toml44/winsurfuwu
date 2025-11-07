"use client";

import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Heart, Star, MapPin, Search } from 'lucide-react';
import { useState } from 'react';

const vendors = [
  {
    id: 'boutique-sport',
    name: 'Boutique Sport',
    category: 'Équipements sportifs',
    description: 'Vêtements et équipements techniques pour tous les sports',
    rating: 4.8,
    reviews: 124,
    location: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1531861184689-3f16bafaf940?q=80&w=2070',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'artisanat-local',
    name: 'Artisanat Local',
    category: 'Créations artisanales',
    description: 'Pièces uniques faites main par des artisans passionnés',
    rating: 4.9,
    reviews: 89,
    location: 'Lyon, France',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'saveurs-terroir',
    name: 'Saveurs du Terroir',
    category: 'Produits du terroir',
    description: 'Produits frais et locaux issus de nos régions',
    rating: 4.7,
    reviews: 156,
    location: 'Bordeaux, France',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'mode-ethique',
    name: 'Mode Éthique',
    category: 'Mode responsable',
    description: 'Vêtements éco-responsables et éthiques',
    rating: 4.9,
    reviews: 203,
    location: 'Nantes, France',
    image: 'https://images.unsplash.com/photo 1485462537746-965f33f7f6a7?q=80&w=2070',
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'cosmetiques-naturels',
    name: 'Cosmétiques Naturels',
    category: 'Beauté naturelle',
    description: 'Soins et cosmétiques 100% naturels et bio',
    rating: 4.8,
    reviews: 178,
    location: 'Toulouse, France',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1956',
    color: 'from-rose-500 to-fuchsia-600',
  },
  {
    id: 'decoration-interieur',
    name: 'Déco Intérieur',
    category: 'Décoration maison',
    description: 'Mobilier et objets déco pour une maison unique',
    rating: 4.7,
    reviews: 92,
    location: 'Lille, France',
    image: 'https://images.unsplash.com/photo-1616486338815-3d98d60c8bdf?q=80&w=2070',
    color: 'from-amber-400 to-orange-500',
  },
];

export default function ExplorerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b2b24] to-[#0f3a33]">
      {/* En-tête */}
      <header className="relative overflow-hidden py-12 md:py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b2b24] to-[#0f3a33]"></div>
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between space-x-4">
            <Link 
              href="/" 
              className="group inline-flex items-center text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span>Retour</span>
            </Link>
            <h1 className="text-3xl font-bold text-white">Découvrez nos vendeurs</h1>
            <div className="w-8"></div> {/* Pour l'alignement */}
          </div>
          
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un vendeur..."
                className="w-full rounded-full border-0 bg-white/10 py-4 pl-6 pr-12 text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:outline-none"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors">
                <Search className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {['Tous', 'Populaires', 'Nouveautés', 'Proches'].map((filter) => (
                <button 
                  key={filter}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    filter === 'Tous' 
                      ? 'bg-white/20 text-white' 
                      : 'bg-white/5 text-white/80 hover:bg-white/10'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0b2b24] to-transparent"></div>
      </header>

      {/* Contenu principal */}
      <main className="relative z-10 mx-auto -mt-6 max-w-7xl px-6 pb-20 sm:px-8 lg:px-10">
        {/* En-tête de section */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">Découvrez nos vendeurs</h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-300">Trouvez les meilleures boutiques locales près de chez vous</p>
        </div>

        {/* Grille des vendeurs */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {vendors.map((vendor) => (
            <div 
              key={vendor.id}
              className="group relative overflow-hidden rounded-2xl bg-[#0f3a33]/80 backdrop-blur-sm border border-[#2E86C1]/30 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-[#2E86C1]/50 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <div 
                  className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${vendor.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b2b24]/95 via-[#0b2b24]/30 to-transparent"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute right-3 top-3">
                  <button className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm shadow-md transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-lg hover:shadow-white/10">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center rounded-full bg-black/80 backdrop-blur-sm px-3 py-1.5 text-sm font-medium text-white border border-white/10 shadow-lg">
                  <Star className="mr-1 h-4 w-4 text-amber-400 fill-amber-400" />
                  {vendor.rating}
                  <span className="ml-1 text-gray-300">({vendor.reviews})</span>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-[#2E86C1]/20 px-3 py-1 text-xs font-medium text-[#2E86C1] ring-1 ring-inset ring-[#2E86C1]/30">
                    {vendor.category}
                  </span>
                  <div className="flex items-center text-xs text-gray-300">
                    <MapPin className="mr-1 h-3 w-3 text-gray-500" />
                    {vendor.location}
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-white group-hover:text-[#2E86C1] transition-colors duration-300">{vendor.name}</h2>
                <p className="text-gray-300 leading-relaxed">{vendor.description}</p>
                
                <div className="pt-2 flex items-center justify-between">
                  <Link 
                    href={`/vendor/${vendor.id}`}
                    className="group flex items-center rounded-full bg-[#2E86C1] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#1a6da8] focus:outline-none border border-[#2E86C1]/50 shadow-md hover:shadow-[#2E86C1]/30"
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Voir la boutique
                  </Link>
                  
                  <button className="group/button text-sm font-medium text-[#2E86C1] hover:text-[#4fa3e3] transition-colors flex items-center">
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#2E86C1] after:transition-all after:duration-300 group-hover/button:after:w-full">
                    En savoir plus
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="rounded-full border border-gray-300 bg-white p-2 text-gray-500 hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            {[1, 2, 3, 4, 5].map((page) => (
              <button 
                key={page}
                className={`h-10 w-10 rounded-full font-medium ${
                  page === 1 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button className="rounded-full border border-gray-300 bg-white p-2 text-gray-500 hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </main>

      {/* Pied de page */}
      <footer className="mt-24 border-t border-white/10 pt-12 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white">Rejoignez notre communauté de vendeurs</h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-400">Développez votre activité en ligne avec notre plateforme dédiée aux commerçants locaux.</p>
            <div className="mt-6">
              <a 
                href="/seller/onboarding" 
                className="inline-flex items-center rounded-full bg-white/10 px-6 py-3 text-base font-medium text-white hover:bg-white/15 transition-colors"
              >
                Devenir vendeur
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 -mr-1 h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="mt-12 border-t border-white/10 pt-8">
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} WinSurf. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
