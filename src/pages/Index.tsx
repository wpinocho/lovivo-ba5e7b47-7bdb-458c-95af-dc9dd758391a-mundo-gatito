import React, { useState } from 'react';
import { Header } from '@/components/Header';
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
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <Header onCartClick={() => setIsCartOpen(true)} />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              🐱 Tienda de Gatitos Adorables
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Encuentra tu compañero felino perfecto. Todos nuestros gatitos están llenos de amor y listos para un nuevo hogar.
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
        </main>

        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
};

export default Index;