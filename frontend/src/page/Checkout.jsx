import React, { useEffect, useState } from 'react';
import { useCart } from '../ui/Context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Calendar, 
    CreditCard, 
    Shield, 
    MapPin, 
    User, 
    Users, 
    Check
} from 'lucide-react';

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
        const locationStateData = location.state?.bookingData;
        if (locationStateData) {
            setBookingData(locationStateData);
            localStorage.setItem('bookingData', JSON.stringify(locationStateData));
        } else {
            const savedBookingData = localStorage.getItem('bookingData');
            if (savedBookingData) {
                setBookingData(JSON.parse(savedBookingData));
            }
        }
    }, [location.state]);

    const handleProceedToPayment = () => {
        navigate("/transaction", { state: { bookingData } });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6 sm:px-10 lg:px-16 pt-24">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">
                        Confirm Your Booking
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Double-check your booking details before proceeding to payment.
                    </p>
                </div>

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Booking Details */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                                <h2 className="text-base font-medium text-gray-800">
                                    Booking Information
                                </h2>
                                <MapPin className="w-5 h-5 text-gray-500" />
                            </div>
                            <div className="p-4 space-y-6">
                                {/* Tour Details */}
                                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-blue-900 flex items-center mb-1">
                                        <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                                        {bookingData.title}
                                    </h3>
                                    <p className="text-sm flex items-center text-gray-700">
                                        <Calendar className="w-4 h-4 text-blue-500 mr-1" />
                                        {new Date(bookingData.date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>

                                {/* Travelers & Contact Details */}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {/* Travelers */}
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                        <h4 className="text-sm font-medium text-gray-800 flex items-center mb-2">
                                            <Users className="w-5 h-5 text-blue-600 mr-2" />
                                            Travelers
                                        </h4>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li className="flex justify-between">
                                                <span>Adults</span>
                                                <span className="flex items-center font-medium">
                                                    <Check className="w-4 h-4 text-green-500 mr-1" />
                                                    {bookingData.adults}
                                                </span>
                                            </li>
                                            {bookingData.children > 0 && (
                                                <li className="flex justify-between">
                                                    <span>Children</span>
                                                    <span className="flex items-center font-medium">
                                                        <Check className="w-4 h-4 text-green-500 mr-1" />
                                                        {bookingData.children}
                                                    </span>
                                                </li>
                                            )}
                                        </ul>
                                    </div>

                                    {/* Contact Details */}
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                        <h4 className="text-sm font-medium text-gray-800 flex items-center mb-2">
                                            <User className="w-5 h-5 text-blue-600 mr-2" />
                                            Contact Information
                                        </h4>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li className="flex justify-between">
                                                <span>Name</span>
                                                <span className="font-medium">{bookingData.fullName}</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Email</span>
                                                <span className="font-medium">{bookingData.email}</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Phone</span>
                                                <span className="font-medium">{bookingData.phone}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Special Requests */}
                                {bookingData.specialRequest && (
                                    <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-lg">
                                        <h4 className="text-sm font-medium text-yellow-800 mb-1">
                                            Special Requests
                                        </h4>
                                        <p className="text-sm text-gray-700 italic">
                                            {bookingData.specialRequest}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Payment Summary */}
                    <div>
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 sticky top-16">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Payment Summary
                                </h2>
                                <CreditCard className="w-6 h-6 text-gray-500" />
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-4 border-b border-gray-200 pb-4">
                                    <div className="flex justify-between text-gray-700">
                                        <span>Subtotal (includes Service Fee)</span>
                                        <span className="font-medium">${bookingData.totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500 text-sm">
                                        <span>Service Fee</span>
                                        <span>${bookingData.serviceCharge.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center font-bold text-xl text-gray-900">
                                    <span>Total</span>
                                    <span>${bookingData.totalPrice.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={handleProceedToPayment}
                                    className="w-full mt-4 py-3 bg-blue-600 text-white font-semibold rounded-lg 
                                    hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2 shadow-lg"
                                >
                                    <CreditCard className="w-5 h-5" />
                                    Proceed to Payment
                                </button>
                                <p className="mt-4 text-sm text-gray-500 text-center flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-green-500 mr-2" />
                                    Secure payment processing
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
