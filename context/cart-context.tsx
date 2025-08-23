"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    wattage?: string;
    category?: string;
    subCategory?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: any) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalAmount: number;
    isInCart: (id: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        loadCartFromStorage();
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        saveCartToStorage();
    }, [cartItems]);

    const loadCartFromStorage = () => {
        try {
            const savedCart = localStorage.getItem('hallever-cart');
            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                setCartItems(parsedCart);
            }
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
        }
    };

    const saveCartToStorage = () => {
        try {
            localStorage.setItem('hallever-cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    };

    const addToCart = (product: any) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        
        if (existingItem) {
            // If item exists, increase quantity
            setCartItems(prev => prev.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            // Add new item to cart
            const newItem: CartItem = {
                id: String(product.id),
                name: product.name,
                price: product.price || 0,
                quantity: 1,
                image: Array.isArray(product.images) ? product.images[0] || "/placeholder.svg" : product.images || "/placeholder.svg",
                wattage: product.wattage,
                category: product.category,
                subCategory: product.subCategory
            };
            
            setCartItems(prev => [...prev, newItem]);
        }
    };

    const removeFromCart = (id: string) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return;
        setCartItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const isInCart = (id: string) => {
        return cartItems.some(item => item.id === id);
    };

    const value: CartContextType = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount,
        isInCart
    };

    return (
        <CartContext.Provider value={value}>
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
