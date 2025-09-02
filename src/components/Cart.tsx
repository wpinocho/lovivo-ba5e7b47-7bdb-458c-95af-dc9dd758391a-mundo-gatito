import React from 'react';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, getTotalPrice, clearCart } = useCart();

  console.log('Cart rendered with', cartItems.length, 'items');

  if (!isOpen) return null;

  const handleCheckout = () => {
    alert('¡Gracias por tu interés en adoptar! Te contactaremos pronto para completar el proceso de adopción. 🐱💕');
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Carrito de Adopción</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">🛒</span>
                <p className="text-xl text-gray-500 mb-2">Tu carrito está vacío</p>
                <p className="text-gray-400">¡Agrega algunos gatitos adorables!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.kitten.id} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.kitten.image}
                        alt={item.kitten.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.kitten.name}</h3>
                        <p className="text-sm text-gray-600">{item.kitten.breed}</p>
                        <p className="text-lg font-bold text-purple-600">${item.kitten.price}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.kitten.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-6 space-y-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span className="text-purple-600">${getTotalPrice()}</span>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  Proceder con Adopción 💕
                </button>
                
                <button
                  onClick={clearCart}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};