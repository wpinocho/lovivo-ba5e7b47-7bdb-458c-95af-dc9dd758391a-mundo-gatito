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

interface CartItem extends Kitten {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (kitten: Kitten) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  console.log('Cart items updated:', items);

  const addToCart = (kitten: Kitten) => {
    console.log('Adding kitten to cart:', kitten.name);
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === kitten.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === kitten.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...kitten, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    console.log('Removing kitten from cart:', id);
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    console.log('Updating quantity for kitten:', id, 'to:', quantity);
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    console.log('Clearing cart');
    setItems([]);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotalPrice,
      getTotalItems,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};