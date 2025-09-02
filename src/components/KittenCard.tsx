import React from 'react';
import { HeartIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useCart, Kitten } from '@/context/CartContext';
import { useState } from 'react';

interface KittenCardProps {
  kitten: Kitten;
}

export const KittenCard: React.FC<KittenCardProps> = ({ kitten }) => {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  console.log('KittenCard rendered for:', kitten.name);

  const handleAddToCart = async () => {
    console.log('Adding to cart:', kitten.name);
    setIsAdding(true);
    addToCart(kitten);
    
    // Simular un pequeño delay para mejor UX
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log('Toggled favorite for:', kitten.name);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={kitten.image}
          alt={kitten.name}
          className="w-full h-64 object-cover"
        />
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
        >
          {isFavorite ? (
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-400" />
          )}
        </button>
        
        {kitten.vaccinated && (
          <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
            <CheckCircleIcon className="h-3 w-3" />
            <span>Vacunado</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800">{kitten.name}</h3>
          <span className="text-2xl font-bold text-purple-600">${kitten.price}</span>
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Raza:</span> {kitten.breed}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Edad:</span> {kitten.age}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Género:</span> {kitten.gender}
          </p>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {kitten.description}
        </p>

        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-600 mb-2">Personalidad:</p>
          <div className="flex flex-wrap gap-1">
            {kitten.personality.map((trait, index) => (
              <span
                key={index}
                className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
            isAdding
              ? 'bg-green-500 text-white'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transform hover:scale-105'
          }`}
        >
          {isAdding ? '¡Agregado! 🎉' : 'Adoptar 💕'}
        </button>
      </div>
    </div>
  );
};