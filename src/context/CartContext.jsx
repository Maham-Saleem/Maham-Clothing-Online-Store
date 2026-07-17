import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('maham_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('maham_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('maham_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('maham_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Add to cart
  const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    setCart((prevCart) => {
      // Unique key based on ID, size, and color to avoid merging different variants
      const cartItemId = `${product.id}-${selectedSize || 'OS'}-${selectedColor || 'Default'}`;
      
      const existingItemIndex = prevCart.findIndex(
        (item) => item.cartItemId === cartItemId
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            ...product,
            cartItemId,
            selectedSize: selectedSize || 'OS',
            selectedColor: selectedColor || 'Default',
            quantity
          }
        ];
      }
    });
  };

  // Remove from cart
  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  };

  // Update item quantity
  const updateQuantity = (cartItemId, newQty) => {
    if (newQty < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Wishlist toggle
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isAlreadyWishlisted = prevWishlist.some((item) => item.id === product.id);
      if (isAlreadyWishlisted) {
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  // Totals calculations
  const getSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        getSubtotal,
        getCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
