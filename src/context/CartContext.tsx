// src/context/CartContext.tsx
'use client';
import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { CartItem, Product } from '../../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  shippingCost: number;
  tax: number;
  totalCost: number;
  totalItems: number;
  placeOrder: () => {
    items: CartItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    orderNumber: string;
  };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const itemInCart = prevItems.find((item) => item.id === product.id);
      if (itemInCart) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Implement removeFromCart
  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Implement updateQuantity
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  // Implement clearCart
  const clearCart = () => setCartItems([]);

  const cartSubtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  const shippingCost = useMemo(
    () => (cartSubtotal > 500 || cartSubtotal === 0 ? 0 : 25),
    [cartSubtotal]
  );

  const tax = useMemo(() => cartSubtotal * 0.08, [cartSubtotal]);
  const totalCost = useMemo(
    () => cartSubtotal + shippingCost + tax,
    [cartSubtotal, shippingCost, tax]
  );
  const totalItems = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );
  const placeOrder = () => {
    const orderDetails = {
      items: [...cartItems],
      subtotal: cartSubtotal,
      shipping: shippingCost,
      tax: tax,
      total: totalCost,
      orderNumber: `NGS-${Date.now()}`,
    };
    clearCart(); // Call clearCart after placing the order
    return orderDetails;
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart, // Added
    updateQuantity, // Added
    clearCart,      // Added
    cartSubtotal,
    shippingCost,
    tax,
    totalCost,
    totalItems,
    placeOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
