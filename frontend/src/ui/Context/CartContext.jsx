import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CardProvider = ({children}) => {
    const[cartItems, setCartItems] = useState([]);

    const addToCart = (booking) => {
        if(!cartItems.some(item => item.id === booking.id)){
            setCartItems(prev => [...prev, {
                ...booking,
                quantity: 1,
                dateAdded: new Date()
            }])
        }
    }
    
    const removeFromCart = (bookingId) => {
        setCartItems(prev => prev.filter(item => item.id !== bookingId));
    }

    const updateQuantity = (bookingId, quantity) => {
        setCartItems(prev => 
            prev.map(item =>
                item.id === bookingId
                ? {...item, quantity: Math.max(1, quantity)}
                : item
            )
        );
    }

    const clearCard = () => {
        setCartItems([]);
    }

    const isInCart = (bookingId) => {
        return cartItems.some(item => item.id === bookingId)
    }

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.totalPrice * item.quantity), 0);
    }

    return(
        <CartContext.Provider
        value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCard,
            isInCart,
            getCartTotal,
            cartCount: cartItems.length

        }}
        >
           {children} 
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);