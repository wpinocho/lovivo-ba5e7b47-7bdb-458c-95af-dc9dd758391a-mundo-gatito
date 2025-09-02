import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { KittenCard } from '@/components/KittenCard';
import { Cart } from '@/components/Cart';
import { FilterBar } from '@/components/FilterBar';
import { kittens } from '@/data/kittens';
import { CartProvider } from '@/context/CartContext';

const Index = () => {
  const [filteredKittens, setFilteredKittens] = useState(kittens);
  const [isCartOpen, setIsCartOpen] = useState(false);

  console.log('Index component rendered with', filteredKittens.length, 'kittens');

  const handleFilter = (breed: string, priceRange: string) => {
    console.log('Filtering by breed:', breed, 'and price range:', priceRange);
    
    let filtered = kittens;
    
    if (breed !== 'all') {
      filtered = filtered.filter(kitten => kitten.breed.toLowerCase() === breed.toLowerCase());
    }
    
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(kitten => {
        if (max) {
          return kitten.price >= min && kitten.price <= max;
        } else {
          return kitten.price >= min;
        }
      });
    }
    
    setFilteredKittens(filtered);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-pink-50">
        <Header onCartClick={() => setIsCartOpen(true)} />
        
        {/* Hero Section */}
        <HeroSection />
        
        <main className="container mx-auto px-4 py-16">
          {/* Catalog Section */}
          <div className="catalog-section">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                🐱 Nuestros Gatitos Disponibles
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Cada uno de nuestros gatitos tiene una personalidad única y está esperando encontrar su hogar perfecto.
              </p>
            </div>

            <FilterBar onFilter={handleFilter} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {filteredKittens.map((kitten) => (
                <KittenCard key={kitten.id} kitten={kitten} />
              ))}
            </div>

            {filteredKittens.length === 0 && (
              <div className="text-center py-12">
                <p className="text-2xl text-gray-500">No se encontraron gatitos con esos filtros 😿</p>
                <p className="text-gray-400 mt-2">Intenta con diferentes criterios de búsqueda</p>
              </div>
            )}
          </div>

          {/* Additional Features Section */}
          <div className="mt-20 bg-white rounded-3xl shadow-lg p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">¿Por qué elegir Gatitos Adorables?</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🏥</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Salud Garantizada</h4>
                <p className="text-gray-600">Todos nuestros gatitos están completamente vacunados y han pasado revisiones veterinarias completas.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-pink-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">💝</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Apoyo Continuo</h4>
                <p className="text-gray-600">Te acompañamos durante todo el proceso de adopción y ofrecemos consejos para el cuidado de tu nuevo amigo.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-yellow-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🏠</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Hogar Perfecto</h4>
                <p className="text-gray-600">Nos aseguramos de que cada gatito encuentre la familia perfecta que se adapte a su personalidad única.</p>
              </div>
            </div>
          </div>
        </main>

        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
};

export default Index;