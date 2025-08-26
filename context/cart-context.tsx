"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

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
    updateCartFromServer: (serverCart: any[]) => void;
    syncCartToServer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        loadCartFromStorage();
        loadUserCartFromServer();
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        saveCartToStorage(cartItems);
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

    const saveCartToStorage = (cartToSave: CartItem[]) => {
        try {
            localStorage.setItem('hallever-cart', JSON.stringify(cartToSave));
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

    const updateCartFromServer = (serverCart: any[]) => {
        // Convert server cart format to local cart format
        const convertedCart: CartItem[] = serverCart.map(item => ({
            id: String(item.id),
            name: item.name,
            price: item.price || 0,
            quantity: item.quantity || 1,
            image: Array.isArray(item.images) ? item.images[0] || "/placeholder.svg" : item.image || "/placeholder.svg",
            wattage: item.wattage,
            category: item.category,
            subCategory: item.subCategory
        }));
        
        setCartItems(convertedCart);
        saveCartToStorage(convertedCart);
    };

    const loadUserCartFromServer = async () => {
        try {
            const userStr = localStorage.getItem("user");
            if (userStr) {
                const user = JSON.parse(userStr);
                if (user && user.email && user.cart && user.cart.length > 0) {
                    // User has cart data, update local cart
                    updateCartFromServer(user.cart);
                }
            }
        } catch (error) {
            console.error('Error loading user cart from server:', error);
        }
    };

    const syncCartToServer = useCallback(async () => {
        try {
            const userStr = localStorage.getItem("user");
            if (userStr) {
                const user = JSON.parse(userStr);
                if (user && user.email && user.uid) {
                    console.log("🔄 Syncing cart to server for user:", user.uid);
                    
                    // Update user's cart on server using PATCH method
                    const response = await fetch(`/api/routes/auth`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            uid: user.uid,
                            cart: cartItems 
                        }),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error("❌ Cart sync failed:", errorData);
                        throw new Error(errorData.errorMessage || "Failed to sync cart");
                    }

                    const result = await response.json();
                    console.log("✅ Cart synced successfully:", result);
                }
            }
        } catch (error) {
            console.error('❌ Error syncing cart to server:', error);
            // Don't throw error to prevent app crashes, just log it
        }
    }, [cartItems]);

    // Sync cart to server whenever cart changes
    useEffect(() => {
        if (cartItems.length > 0) {
            syncCartToServer();
        }
    }, [cartItems, syncCartToServer]);

    const value: CartContextType = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount,
        isInCart,
        updateCartFromServer,
        syncCartToServer
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
