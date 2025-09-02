import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  console.log('Header rendered with', totalItems, 'items in cart');

  return (
    <header className="bg-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">🐱</span>
            <h1 className="text-2xl font-bold text-gray-800">Gatitos Adorables</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Inicio</a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Catálogo</a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Cuidados</a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Contacto</a>
          </nav>

          <button
            onClick={onCartClick}
            className="relative bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition-colors shadow-lg"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};