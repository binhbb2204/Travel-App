import React, { useState } from 'react'
import { Calendar, CreditCard, Lock, CheckCircle, ArrowRight, Shield, Gift, Sparkles, ArrowLeft, AlertCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../ui/Context/CartContext';
const TransactionBooking = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const location = useLocation();
    const bookingData = location.state?.bookingData || {};

    const { addToCart, processCheckout } = useCart();
    const navigate = useNavigate();


    const handleAddToCart = () => {
        const bookingForCart = {
            id: Date.now(), // Generate a temporary ID if not available
            title,
            date,
            adults,
            children,
            totalPrice,
            pricePerPerson,
            serviceCharge,
            promoDiscount
        };
        addToCart(bookingForCart)
        //navigate('/cart'); // Optional: Navigate to cart page
    };

    const CartButton = () => (
        <button
            onClick={handleAddToCart}
            className="w-full mt-4 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg
            font-medium hover:from-green-700 hover:to-green-800 transform hover:scale-[1.02] 
            transition-all duration-200 flex items-center justify-center space-x-2"
        >
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
        </button>
    );

    const {
        title = 'Unknown Title',
        date = '',
        adults = 1,
        children = 0,
        totalPrice = 0,
        pricePerPerson = 0,
        serviceCharge = 0,
        promoDiscount = 50
    } = bookingData || {};

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } catch (error) {
            return 'Invalid Date';
        }
    };

    const getTravelersText = () => {
        const parts = [];
        if (adults) parts.push(`${adults} Adult${adults > 1 ? 's' : ''}`);
        if (children) parts.push(`${children} Child${children > 1 ? 'ren' : ''}`);
        return parts.length ? `${parts.join(', ')} • ${formatDate(date)}` : 'No travelers selected';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => setStep(3), 1000);
        }, 2000);
    };

    const handleBack = () => {
        if (step === 2) {
            setShowConfirmModal(true);
        }
    };

    const BookingSummary = () => (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-800">{title}</h3>
                        <p className="text-sm text-gray-600">{getTravelersText()}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-bold text-blue-600">${totalPrice.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">Total</p>
                </div>
            </div>
        </div>
    );

    const ConfirmModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
                <div className="flex items-center space-x-3 text-amber-600 mb-4">
                    <AlertCircle className="w-6 h-6" />
                    <h3 className="text-lg font-semibold">Confirm Navigation</h3>
                </div>
                <p className="text-gray-600 mb-6">
                    Going back will clear your payment information. Are you sure you want to continue?
                </p>
                <div className="flex space-x-3">
                    <button
                        onClick={() => setShowConfirmModal(false)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            setShowConfirmModal(false);
                            setStep(1);
                        }}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );

    // If no booking data is provided, show an error state
    if (!bookingData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full text-center">
                    <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">No Booking Data Found</h2>
                    <p className="text-gray-600">Please start a new booking from the tour page.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
            <div className="max-w-4xl mx-auto mt-16">
                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex justify-between relative">
                        <div className="w-full absolute top-1/2 h-0.5 bg-gray-200">
                            <div
                                className="h-full bg-blue-600 transition-all duration-500"
                                style={{ width: `${(step - 1) * 50}%` }}
                            />
                        </div>
                        {[1, 2, 3].map((number) => (
                            <div
                                key={number}
                                className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full 
                                    ${step >= number
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-400 border-2 border-gray-200'
                                    } transition-all duration-300`}
                            >
                                {step > number ? (
                                    <CheckCircle className="w-6 h-6" />
                                ) : (
                                    <span className="font-semibold">{number}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {step > 1 && step < 3 && (
                        <button
                        onClick={handleBack}
                        className="flex items-center space-x-2 p-4 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back to {step === 2 ? 'Booking Details' : 'Payment'}</span>
                        </button>
                    )}
                    {step === 1 && (
                        <div className="p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Confirm Your Booking</h2>
                            <div className="space-y-6">
                                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                                    <Calendar className="w-6 h-6 text-blue-600 mr-4" />
                                    <div>
                                        <p className="font-medium text-gray-800">{title}</p>
                                        <p className="text-sm text-gray-600">{getTravelersText()}</p>
                                    </div>
                                    <div className="ml-auto">
                                        <p className="font-bold text-blue-600">${pricePerPerson}</p>
                                        <p className="text-sm text-gray-500">Per person</p>
                                    </div>
                                </div>

                                <button
                                onClick={() => setStep(2)}
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg
                                font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] 
                                transition-all duration-200 flex items-center justify-center space-x-2"
                                >
                                    <span>Proceed to Payment</span>
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Details</h2>
                            <BookingSummary />
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 transform -skew-y-6 opacity-10 rounded-3xl" />
                                    <div className="relative p-6 border border-gray-200 rounded-xl space-y-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-2">
                                                <CreditCard className="w-6 h-6 text-blue-600" />
                                                <span className="font-medium text-gray-800">Card Information</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Lock className="w-4 h-4 text-green-600" />
                                                <span className="text-sm text-green-600">Secure Payment</span>
                                            </div>
                                        </div>

                                        <input
                                        type="text"
                                        placeholder="Card Number"
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                        />

                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                            type="text"
                                            placeholder="MM/YY"
                                            className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                            />
                                            <input
                                            type="text"
                                            placeholder="CVC"
                                            className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>${(totalPrice - serviceCharge + promoDiscount).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Service Fee</span>
                                        <span>${serviceCharge.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <div className="flex items-center">
                                            <Gift className="w-4 h-4 mr-2 text-green-600" />
                                            <span>Promotional Discount</span>
                                        </div>
                                        <span className="text-green-600">-${promoDiscount.toFixed(2)}</span>
                                    </div>
                                    <div className="pt-2 border-t mt-2">
                                        <div className="flex justify-between items-center font-bold text-lg">
                                            <span>Total</span>
                                            <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg
                                    font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] 
                                    transition-all duration-200 flex items-center justify-center space-x-2"
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Lock className="w-5 h-5" />
                                            <span>Pay Securely</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="p-6 md:p-8 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
                            <p className="text-gray-600 mb-6">
                                Your adventure awaits! Check your email for detailed information.
                            </p>
                            <div className="flex items-center justify-center space-x-4">
                                <Shield className="w-5 h-5 text-blue-600" />
                                <span className="text-sm text-gray-600">Secured by Adventure Booking</span>
                            </div>
                        </div>
                    )}
                </div>
                {/* Security Badges */}
                <div className="mt-8 flex items-center justify-center space-x-6 text-gray-500">
                    <div className="flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        <span className="text-sm">Secure Payment</span>
                    </div>
                    <div className="flex items-center">
                        <Lock className="w-5 h-5 mr-2" />
                        <span className="text-sm">SSL Encrypted</span>
                    </div>
                    <div className="flex items-center">
                        <Sparkles className="w-5 h-5 mr-2" />
                        <span className="text-sm">Best Price Guarantee</span>
                    </div>
                </div>
            </div>
            {showConfirmModal && <ConfirmModal />}
        </div>
    );
};

export default TransactionBooking;