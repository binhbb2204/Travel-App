import React, { useEffect, useState } from 'react';
import { useCart } from '../ui/Context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, CreditCard, Shield, Hotel, MapPin, User, Mail, Phone, Users } from 'lucide-react';

const Checkout = () => {
    const { addToCart, getCartTotal } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [bookingData, setBookingData] = useState({
        title: 'Unknown Title',
        date: '',
        adults: 1,
        children: 0,
        totalPrice: 0,
        pricePerPerson: 0,
        serviceCharge: 0,
        fullName: '',
        email: '',
        phone: '',
        specialRequest: ''
    });

    useEffect(() => {
        // First, check if there's data passed through location state
        const locationStateData = location.state?.bookingData;
        
        // If location state has data, save it to both state and localStorage
        if (locationStateData) {
            setBookingData(locationStateData);
            localStorage.setItem('bookingData', JSON.stringify(locationStateData));
        } else {
            // If no location state, try to retrieve from localStorage
            const savedBookingData = localStorage.getItem('bookingData');
            if (savedBookingData) {
                setBookingData(JSON.parse(savedBookingData));
            }
        }
    }, [location.state]);

    const handleProceedToPayment = () => {
        navigate("/transaction", { 
            state: { bookingData } 
        });
    };

    // Rest of the component remains the same as your original implementation
    return (
        <div className="min-h-screen bg-gray-50 pt-24">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold mb-8">Checkout</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Booking Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
                            
                            {/* Tour Information */}
                            <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                <div className="flex items-center mb-2">
                                    <MapPin className="w-6 h-6 text-blue-600 mr-2" />
                                    <h3 className="text-md font-medium">{bookingData.title}</h3>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <span>{new Date(bookingData.date).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* Traveler Information */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <div className="flex items-center mb-2">
                                        <Users className="w-5 h-5 text-blue-600 mr-2" />
                                        <span className="font-medium">Travelers</span>
                                    </div>
                                    <p>Adults: {bookingData.adults}</p>
                                    {bookingData.children > 0 && <p>Children: {bookingData.children}</p>}
                                </div>

                                <div>
                                    <div className="flex items-center mb-2">
                                        <User className="w-5 h-5 text-blue-600 mr-2" />
                                        <span className="font-medium">Contact Information</span>
                                    </div>
                                    <p>{bookingData.fullName}</p>
                                    <p>{bookingData.email}</p>
                                    <p>{bookingData.phone}</p>
                                </div>
                            </div>

                            {/* Special Requests */}
                            {bookingData.specialRequest && (
                                <div className="mt-4">
                                    <h4 className="font-medium mb-2">Special Requests</h4>
                                    <p className="text-gray-600">{bookingData.specialRequest}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                            <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>
                            
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${bookingData.totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Service Fee</span>
                                    <span>${bookingData.serviceCharge.toFixed(2)}</span>
                                </div>
                                <div className="pt-3 border-t">
                                    <div className="flex justify-between font-bold">
                                        <span>Total</span>
                                        <span>${bookingData.totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleProceedToPayment}
                                    className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg
                                    hover:bg-blue-700 transition-colors duration-200
                                    flex items-center justify-center gap-2"
                                >
                                    <CreditCard className="w-5 h-5" />
                                    <span>Proceed to Payment</span>
                                </button>

                                <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                                    <Shield className="w-4 h-4 mr-2" />
                                    <span>Secure payment processing</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;