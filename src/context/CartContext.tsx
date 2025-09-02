import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Kitten {
  id: number;
  name: string;
  breed: string;
  age: string;
  price: number;
  image: string;
  description: string;
  personality: string[];
  vaccinated: boolean;
  gender: string;
}

interface CartItem {
  kitten: Kitten;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (kitten: Kitten) => void;
  removeFromCart: (kittenId: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  console.log('CartProvider rendered with', cartItems.length, 'items');

  const addToCart = (kitten: Kitten) => {
    console.log('Adding kitten to cart:', kitten.name);
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.kitten.id === kitten.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.kitten.id === kitten.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { kitten, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (kittenId: number) => {
    console.log('Removing kitten from cart:', kittenId);
    setCartItems(prevItems => prevItems.filter(item => item.kitten.id !== kittenId));
  };

  const clearCart = () => {
    console.log('Clearing cart');
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.kitten.price * item.quantity), 0);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};