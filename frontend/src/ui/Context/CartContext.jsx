import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [bookings, setBookings] = useState([]); // Track confirmed bookings
    const [currentBooking, setCurrentBooking] = useState(null);

    // Persist current booking to localStorage
    useEffect(() => {
        if (currentBooking) {
            localStorage.setItem('currentBooking', JSON.stringify(currentBooking));
        }
    }, [currentBooking]);

    // Load current booking from localStorage on initial load
    useEffect(() => {
        const storedBooking = localStorage.getItem('currentBooking');
        if (storedBooking) {
            setCurrentBooking(JSON.parse(storedBooking));
        }
    }, []);

    const addToCart = (item) => {
        // Ensure the item has a type (tour, hotel, etc.)
        if (!item.type) {
            console.error('Item type is required');
            return;
        }

        // Set the current booking
        setCurrentBooking(item);

        setCartItems(prev => {
            // Check if item already exists
            const existingItem = prev.find(
                cartItem => cartItem.id === item.id && cartItem.type === item.type
            );

            if (existingItem) {
                // Update existing item if needed
                return prev.map(cartItem =>
                    cartItem.id === item.id && cartItem.type === item.type
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }

            // Add new item
            return [...prev, {
                ...item,
                quantity: 1,
                dateAdded: new Date()
            }];
        });
    };

    const clearCurrentBooking = () => {
        setCurrentBooking(null);
        localStorage.removeItem('currentBooking');
    };

    const removeFromCart = (itemId, type) => {
        setCartItems(prev => 
            prev.filter(item => !(item.id === itemId && item.type === type))
        );
    };

    const updateQuantity = (itemId, type, quantity) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === itemId && item.type === type
                    ? { ...item, quantity: Math.max(1, quantity) }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const isInCart = (itemId, type) => {
        return cartItems.some(item => item.id === itemId && item.type === type);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.totalPrice * item.quantity), 0);
    };

    const getItemsByType = (type) => {
        return cartItems.filter(item => item.type === type);
    };

    // Process checkout for all items in cart
    const processCheckout = async (paymentDetails) => {
        try {
            // Here you would typically make an API call to process payment
            // For demo purposes, we'll simulate a successful payment
            
            // Add all cart items to bookings
            const newBookings = cartItems.map(item => ({
                ...item,
                status: 'confirmed',
                confirmationNumber: generateConfirmationNumber(),
                paymentDetails: {
                    amount: item.totalPrice * item.quantity,
                    date: new Date(),
                    // Add other relevant payment details
                }
            }));

            setBookings(prev => [...prev, ...newBookings]);
            clearCart(); // Clear cart after successful checkout

            return {
                success: true,
                bookings: newBookings
            };
        } catch (error) {
            console.error('Checkout failed:', error);
            return {
                success: false,
                error: error.message
            };
        }
    };

    // Get all bookings for a user
    const getUserBookings = () => {
        return bookings;
    };

    // Get bookings by type
    const getBookingsByType = (type) => {
        return bookings.filter(booking => booking.type === type);
    };

    // Helper function to generate confirmation numbers
    const generateConfirmationNumber = () => {
        const prefix = 'BK';
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.random().toString(36).substring(2, 5).toUpperCase();
        return `${prefix}${timestamp}${random}`;
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                bookings,
                currentBooking,
                setCurrentBooking,
                clearCurrentBooking,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                isInCart,
                getCartTotal,
                cartCount: cartItems.length,
                getItemsByType,
                processCheckout,
                getUserBookings,
                getBookingsByType
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

// Helper hook for cart operations
export const useCartOperations = () => {
    const cart = useCart();

    const addTourToCart = (tourData) => {
        cart.addToCart({
            ...tourData,
            type: 'tour',
            id: tourData.id || Date.now()
        });
    };

    const addHotelToCart = (hotelData) => {
        cart.addToCart({
            ...hotelData,
            type: 'hotel',
            id: hotelData.id || Date.now(),
            // Ensure we have all necessary hotel booking details
            totalPrice: hotelData.pricePerNight * hotelData.nights,
            nights: hotelData.nights || 1,
            pricePerNight: hotelData.pricePerNight
        });
    };

    const addBookingDetails = (bookingDetails) => {
        // More generic method to add complete booking details
        cart.setCurrentBooking(bookingDetails);
    };

    return {
        ...cart,
        addTourToCart,
        addHotelToCart,
        addBookingDetails
    };
};