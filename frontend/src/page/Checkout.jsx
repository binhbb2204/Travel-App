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
import '../styles/check-out.css';

const Checkout = () => {
    const { addToCart, getCartTotal } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [bookingData, setBookingData] = useState({
        // acco_title: "Unknown Accommodation",
        // acco_checkin: 'none',
        // acco_checkout: 'none',
        // acco_adults: 1,
        // acco_children: 0,
        // acco_totalPrice: 0.00,
        // acco_pricePerPerson: 0.00,
        // acco_serviceCharge: 0.00,
        // acco_fullName: 'none',
        // acco_email: 'none',
        // acco_phone: 'none',
        // acco_specialRequest: 'none',
        // acco_type: "accommodation",
        tour_title: 'Unknown Title',
        tour_date: 'none',
        tour_adults: 1,
        tour_children: 0,
        tour_totalPrice: 0.00,
        tour_pricePerPerson: 0.00,
        tour_serviceCharge: 0.00,
        tour_fullName: 'none',
        tour_email: 'none',
        tour_phone: 'none',
        tour_specialRequest: 'none',
        tour_type: 'none',
        tour_pay: 0,
    });

    const [bookingData2, setBookingData2] = useState({
        acco_title: "Unknown Accommodation",
        acco_checkin: 'none',
        acco_checkout: 'none',
        acco_adults: 1,
        acco_children: 0,
        acco_totalPrice: 0.00,
        acco_pricePerPerson: 0.00,
        acco_serviceCharge: 0.00,
        acco_fullName: 'none',
        acco_email: 'none',
        acco_phone: 'none',
        acco_specialRequest: 'none',
        acco_type: "none",
        acco_pay: 0,
    });

    // useEffect(() => {
    //     const locationStateData = location.state?.bookingData;
    //     if (locationStateData) {
    //         setBookingData(locationStateData);
    //         localStorage.setItem('bookingData', JSON.stringify(locationStateData));
    //     } else {
    //         const savedBookingData = localStorage.getItem('bookingData');
    //         if (savedBookingData) {
    //             setBookingData(JSON.parse(savedBookingData));
    //         }
    //     }
    // }, [location.state]);

    useEffect(() => {
        const locationStateData = location.state?.bookingData;
        if (locationStateData) {
            // Update only non-null and non-'none' properties
            setBookingData((prevData) => ({
                ...prevData,
                ...Object.keys(locationStateData).reduce((acc, key) => {
                    if (locationStateData[key] !== null && locationStateData[key] !== 'none') {
                        acc[key] = locationStateData[key];
                    }
                    return acc;
                }, {}),
            }));
            localStorage.setItem('bookingData', JSON.stringify(locationStateData));
        } else {
            const savedBookingData = localStorage.getItem('bookingData');
            if (savedBookingData) {
                setBookingData(JSON.parse(savedBookingData));
            }
        }
        // localStorage.removeItem('bookingData');
        // setBookingData({});
    }, [location.state]);

    useEffect(() => {
        const locationStateData = location.state?.bookingData2;
        if (locationStateData) {
            // Update only non-null and non-'none' properties
            setBookingData2((prevData) => ({
                ...prevData,
                ...Object.keys(locationStateData).reduce((acc, key) => {
                    if (locationStateData[key] !== null && locationStateData[key] !== 'none') {
                        acc[key] = locationStateData[key];
                    }
                    return acc;
                }, {}),
            }));
            localStorage.setItem('bookingData2', JSON.stringify(locationStateData));
        } else {
            const savedBookingData = localStorage.getItem('bookingData2');
            if (savedBookingData) {
                setBookingData2(JSON.parse(savedBookingData));
            }
        }
        // localStorage.removeItem('bookingData2');
        // setBookingData2({});
    }, [location.state]);

    const handleProceedToPayment = () => {
        bookingData.tour_pay = 1;
        bookingData2.acco_pay = 0;
        navigate("/transaction", { state: { bookingData } });
        const combinedBookingData = {
            bookingData,
            bookingData2,
        };
        // navigate("/checkout", { state: combinedBookingData });
        // navigate("/transaction");

    };

    const handleProceedToPayment2 = () => {
        bookingData.tour_pay = 0;
        bookingData2.acco_pay = 1;
        navigate("/transaction", { state: { bookingData2 } });
        const combinedBookingData = {
            bookingData,
            bookingData2,
        };
        // navigate("/checkout", { state: combinedBookingData });
        // navigate("/transaction");

    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6 sm:px-10 lg:px-16 pt-24">
            <div className="confirm__warp max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">
                        Confirm Your Booking
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Double-check your booking details before proceeding to payment.
                    </p>
                </div>
                <>
                {bookingData.tour_type === 'tour' ? 
                ( <>
            {/* Main Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-5">
                {/* Booking Details */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-base font-medium text-gray-800">
                                Tour Booking Information
                            </h2>
                            <MapPin className="w-5 h-5 text-gray-500" />
                        </div>
                        <div className="p-4 space-y-6">
                            {/* Tour Details */}
                            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-blue-900 flex items-center mb-1">
                                    <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                                    {bookingData.tour_title}
                                </h3>
                                <p className="text-sm flex items-center text-gray-700">
                                    <Calendar className="w-4 h-4 text-blue-500 mr-1" />
                                    {new Date(bookingData.tour_date).toLocaleDateString('en-US', {
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
                                                {bookingData.tour_adults}
                                            </span>
                                        </li>
                                        {bookingData.tour_children > 0 && (
                                            <li className="flex justify-between">
                                                <span>Children</span>
                                                <span className="flex items-center font-medium">
                                                    <Check className="w-4 h-4 text-green-500 mr-1" />
                                                    {bookingData.tour_children}
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
                                            <span className="font-medium">{bookingData.tour_fullName}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>Email</span>
                                            <span className="font-medium">{bookingData.tour_email}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>Phone</span>
                                            <span className="font-medium">{bookingData.tour_phone}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Special Requests */}
                            {bookingData.tour_specialRequest && (
                                <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-lg">
                                    <h4 className="text-sm font-medium text-yellow-800 mb-1">
                                        Special Requests
                                    </h4>
                                    <p className="text-sm text-gray-700 italic">
                                        {bookingData.tour_specialRequest}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Payment Summary */}
                <div className="sticky top-16 self-start">
                    <div className="bg-white rounded-xl shadow-md border border-gray-200">
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
                                    <span className="font-medium">${bookingData.tour_totalPrice ? bookingData.tour_totalPrice.toFixed(2) : '0.00'}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 text-sm">
                                    <span>Service Fee</span>
                                    <span>${bookingData.tour_serviceCharge ? bookingData.tour_serviceCharge.toFixed(2) : '0.00'}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center font-bold text-xl text-gray-900">
                                <span>Total</span>
                                <span>${bookingData.tour_totalPrice ? bookingData.tour_totalPrice.toFixed(2) : '0.00'}</span>
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
            </>
            ) : (
                null
            )}
            </>
            <>
            {bookingData2.acco_type === 'accommodation' ? (
                <>
                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Booking Details */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                                <h2 className="text-base font-medium text-gray-800">
                                    Accommodation Booking Information
                                </h2>
                                <MapPin className="w-5 h-5 text-gray-500" />
                            </div>
                            <div className="p-4 space-y-6">
                                {/* Tour Details */}
                                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-blue-900 flex items-center mb-1">
                                        <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                                        {bookingData2.acco_title}
                                    </h3>
                                    <p className="text-sm flex items-center text-gray-700">
                                        <Calendar className="w-4 h-4 text-blue-500 mr-1" />
                                        {new Date(bookingData2.acco_checkin).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })} to {new Date(bookingData2.acco_checkout).toLocaleDateString('en-US', {
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
                                                    {bookingData2.acco_adults}
                                                </span>
                                            </li>
                                            {bookingData2.acco_children > 0 && (
                                                <li className="flex justify-between">
                                                    <span>Children</span>
                                                    <span className="flex items-center font-medium">
                                                        <Check className="w-4 h-4 text-green-500 mr-1" />
                                                        {bookingData2.acco_children}
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
                                                <span className="font-medium">{bookingData2.acco_fullName}</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Email</span>
                                                <span className="font-medium">{bookingData2.acco_email}</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Phone</span>
                                                <span className="font-medium">{bookingData2.acco_phone}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Special Requests */}
                                {bookingData2.acco_specialRequest && (
                                    <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-lg">
                                        <h4 className="text-sm font-medium text-yellow-800 mb-1">
                                            Special Requests
                                        </h4>
                                        <p className="text-sm text-gray-700 italic">
                                            {bookingData2.acco_specialRequest}
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
                                        <span className="font-medium">${bookingData2.acco_totalPrice ? bookingData2.acco_totalPrice.toFixed(2) : '0.00'}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500 text-sm">
                                        <span>Service Fee</span>
                                        <span>${bookingData2.acco_serviceCharge ? bookingData2.acco_serviceCharge.toFixed(2) : '0.00'}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center font-bold text-xl text-gray-900">
                                    <span>Total</span>
                                    <span>${bookingData2.acco_totalPrice ? bookingData2.acco_totalPrice.toFixed(2) : '0.00'}</span>
                                </div>
                                <button
                                    onClick={handleProceedToPayment2}
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
                </>
            ):(null)}
            </>
            </div>
        </div>
    );
};

export default Checkout;
