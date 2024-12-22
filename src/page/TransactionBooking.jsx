import React, { useState, useEffect } from 'react'
import { Calendar, CreditCard, Lock, CheckCircle, ArrowRight, Shield, Gift, Sparkles, ArrowLeft, AlertCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../ui/Context/CartContext';
import {accommodationBookingService} from '../data/Service/accommodationBookingService';
import {authService} from '../data/Service/authService';
import {accommodationService} from '../data/Service/accommodationService';
import {tourService} from '../data/Service/tourService';
import {tourBookingService} from '../data/Service/tourBookingService';
import { transactionService } from '../data/Service/transactionService';

const TransactionBooking = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const location = useLocation();
    const [cardNumber, setCardNumber] = useState("");
    // const bookingData = location.state?.bookingData || {};
    // const bookingData2 = location.state?.bookingData2 || {};
    const combinedTotalPrice = location.state?.combinedTotalPrice || 0;
    const combinedServiceCharge = location.state?.combinedServiceCharge || 0;
    const { payForAccommodation, payForTour } = location.state || {};
    // const { bookingData, bookingData2 } = location.state?.combinedBookingData || {};
    
    // const { addToCart } = useCart();
    const navigate = useNavigate();
    

    
    // const handleAddToCart = () => {
    //     const bookingForCart = {
    //         id: Date.now(),
    //         type: 'tour', 
    //         title,
    //         date,
    //         adults,
    //         children,
    //         totalPrice,
    //         pricePerPerson,
    //         serviceCharge,
    //         promoDiscount
    //     };
    //     addToCart(bookingForCart)
    //     //navigate('/cart'); // Optional: Navigate to cart page
    // };

    // const CartButton = () => (
    //     <button
    //         onClick={handleAddToCart}
    //         className="w-full mt-4 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg
    //         font-medium hover:from-green-700 hover:to-green-800 transform hover:scale-[1.02] 
    //         transition-all duration-200 flex items-center justify-center space-x-2"
    //     >
    //         <ShoppingCart className="w-5 h-5" />
    //         <span>Add to Cart</span>
    //     </button>
    // );
    const [bookingData, setBookingData] = useState({
        tour_Id : 'none',
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
        acco_Id : 'none',
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

    const [loadingData1, setLoadingData1] = useState(true);
    const [loadingData2, setLoadingData2] = useState(true);

    useEffect(() => {
        if(payForAccommodation){
            const fetchBookingData = async () => {
                try {
                    const userId = authService.getCurrentUser().userId;
                    const accoBookData = await accommodationBookingService.getUserAccoBook(userId, "Pending");
                    const accoData = await accommodationService.getSingleAccommodation(accoBookData.accommodationId);
                    if (accoBookData) {
                        setBookingData2({
                            acco_Id: accoData._id || 'none',
                            acco_title: accoBookData.accommodationName || "Unknown Accommodation",
                            acco_checkin: accoBookData.checkInDate ? new Date(accoBookData.checkInDate).toLocaleDateString() : 'none',
                            acco_checkout: accoBookData.checkOutDate ? new Date(accoBookData.checkOutDate).toLocaleDateString() : 'none',
                            acco_adults: accoBookData.adults || 1,
                            acco_children: accoBookData.children || 0,
                            acco_totalPrice: accoBookData.totalPrice || 0.00,
                            acco_pricePerPerson: accoData.price || 0.00,
                            acco_serviceCharge: accoBookData.serviceCharge || 0.00,
                            acco_fullName: accoBookData.name || 'none',
                            acco_email: accoBookData.email || 'none',
                            acco_phone: accoBookData.phone || 'none',
                            acco_specialRequest: accoBookData.specialRequest || 'none',
                            acco_type: "accommodation",
                            acco_pay: payForAccommodation ? 1 : 0, // Set acco_pay based on payForAccommodation
                        });
                    }
                    // setLoading(false);
                } catch (error) {
                    console.error("Error fetching accommodation booking data:", error);
                    // setLoading(false);
                } finally {
                    setLoadingData1(false); // Set loading to false after data is fetched
                }
            };
        
            fetchBookingData();
        } else {
            setLoadingData1(false); // Set loading to false after data is fetched
        }
    }, []);

    useEffect(() => {
        if(payForTour){
            const fetchBookingData = async () => {
                try {
                    const userId = authService.getCurrentUser().userId;
                    const tourBookData = await tourBookingService.getUserTourBook(userId, "Pending");
                    const tourData = await tourService.getSingleTour(tourBookData.tourId);
                    if (tourBookData) {
                        setBookingData({
                            tour_Id: tourData._id || 'none',
                            tour_title: tourBookData.tourName || "Unknown Title",
                            tour_date: tourBookData.date ? new Date(tourBookData.date).toLocaleDateString() : 'none',
                            tour_adults: tourBookData.adults || 1,
                            tour_children: tourBookData.children || 0,
                            tour_totalPrice: tourBookData.totalPrice || 0.00,
                            tour_pricePerPerson: tourData.price || 0.00,
                            tour_serviceCharge: tourBookData.serviceCharge || 0.00,
                            tour_fullName: tourBookData.name || 'none',
                            tour_email: tourBookData.email || 'none',
                            tour_phone: tourBookData.phone || 'none',
                            tour_specialRequest: tourBookData.specialRequest || 'none',
                            tour_type: "tour",
                            tour_pay: payForTour ? 1 : 0, 
                        });
                        if(bookingData.tour_title === "Unknown Title"){
                            bookingData.tour_type= "none";
                        }
                    }
                    // setLoading(false);
                } catch (error) {
                    console.error("Error fetching accommodation booking data:", error);
                    // setLoading(false);
                } finally {
                    setLoadingData2(false); // Set loading to false after data is fetched
                }
            };
        
            fetchBookingData();
        } else {
            setLoadingData2(false); // Set loading to false after data is fetched
        }
    }, []);

    const {
        tour_title = 'Unknown Title',
        tour_date = '',
        tour_adults = 1,
        tour_children = 0,
        tour_totalPrice = 0,
        tour_pricePerPerson = 0,
        tour_serviceCharge = 0,
        tour_pay = 0,
        tour_promoDiscount = 50
    } = bookingData || {};

    const {
        acco_title = 'Unknown Title',
        acco_checkin = '',
        acco_checkout = '',
        acco_adults = 1,
        acco_children = 0,
        acco_totalPrice = 0,
        acco_pricePerPerson = 0,
        acco_serviceCharge = 0,
        acco_pay = 0,
        acco_promoDiscount = 20
    } = bookingData2 || {};

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
        const travelers = [];
        
        if (bookingData.tour_pay) {
            const tourParts = [];
            if (bookingData.tour_adults) tourParts.push(`${bookingData.tour_adults} Adult${bookingData.tour_adults > 1 ? 's' : ''}`);
            if (bookingData.tour_children) tourParts.push(`${bookingData.tour_children} Child${bookingData.tour_children > 1 ? 'ren' : ''}`);
            travelers.push(`Tour: ${tourParts.join(', ')} • ${formatDate(bookingData.tour_date)}`);
        }

        if (bookingData2.acco_pay) {
            const accoParts = [];
            if (bookingData2.acco_adults) accoParts.push(`${bookingData2.acco_adults} Adult${bookingData2.acco_adults > 1 ? 's' : ''}`);
            if (bookingData2.acco_children) accoParts.push(`${bookingData2.acco_children} Child${bookingData2.acco_children > 1 ? 'ren' : ''}`);
            travelers.push(`Accommodation: ${accoParts.join(', ')} • ${formatDate(bookingData2.acco_checkin)} to ${formatDate(bookingData2.acco_checkout)}`);
        }

        return travelers.length ? travelers.join(' | ') : 'No travelers selected';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const userData = authService.getCurrentUser();
            if (payForAccommodation) {
                const updateData = {
                    status: "Confirmed"
                };
                await accommodationBookingService.updateUserAccoBook(userData.userId, "Pending", updateData);
                
                const transactionData = {
                    userId: userData.userId,
                    email: bookingData2.acco_email,
                    experienceId: bookingData2.acco_Id,
                    experienceName: bookingData2.acco_title,
                    type: "Accommodation",
                    totalPrice: bookingData2.acco_totalPrice,
                    cardNumber: cardNumber,
                    date: new Date().toISOString()
                };
                await transactionService.createTransaction(transactionData);
            }
    
            if (payForTour) {
                const updateData = {
                    status: "Confirmed"
                };
                await tourBookingService.updateUserTourBook(userData.userId, "Pending", updateData);
                
                const transactionData = {
                    userId: userData.userId,
                    email: bookingData.tour_email,
                    experienceId: bookingData.tour_Id,
                    experienceName: bookingData.tour_title,
                    type: "Tour",
                    totalPrice: bookingData.tour_totalPrice,
                    cardNumber: cardNumber,
                    date: new Date().toISOString()
                };
                await transactionService.createTransaction(transactionData);
            }
    
            setSuccess(true);
            setStep(3);
            
            // setTimeout(() => {
            //     navigate('/checkout');
            // }, 1500);
    
        } catch (error) {
            console.error("Transaction failed:", error);
            
            setSuccess(false);
            
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        if (step === 2) {
            setShowConfirmModal(true);
        }
    };

    const price_perPerson = (tour_pay ? tour_pricePerPerson : 0) + (acco_pay ? acco_pricePerPerson : 0);

    const subtotal = (tour_pay ? tour_totalPrice - tour_serviceCharge + tour_promoDiscount : 0) + 
                (bookingData2.acco_pay ? acco_totalPrice - acco_serviceCharge + acco_promoDiscount : 0);

    const serviceFee = (tour_pay ? tour_serviceCharge : 0) + (bookingData2.acco_pay ? acco_serviceCharge : 0);

    const promoDiscount = (tour_pay ? tour_promoDiscount : 0) + (bookingData2.acco_pay ? acco_promoDiscount : 0);

    const total = subtotal + serviceFee - promoDiscount;    

    const BookingSummary = () => (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-800">
                            {bookingData.tour_pay && bookingData2.acco_pay 
                                ? 'Multiple Bookings' 
                                : (bookingData.tour_pay ? bookingData.tour_title : bookingData2.acco_title)
                            }
                        </h3>
                        <p className="text-sm text-gray-600">{getTravelersText()}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-bold text-blue-600">${combinedTotalPrice.toFixed(2)}</p>
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
    
    if(loadingData1 && loadingData2){
        // return <div>Loading...</div>;
        return (
            <div className="flex flex-col min-h-screen">
                {/* Header Placeholder */}
                <div className="h-16 bg-transparent"></div>
    
                {/* Main Content */}
                <div className="flex-grow flex items-center justify-center bg-gray-100 bg-opacity-50">
                    <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-6">
                        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
                        <p className="text-lg font-medium text-gray-700">Loading...</p>
                    </div>
                </div>
    
                {/* Footer Placeholder */}
                <div className="h-16 bg-transparent"></div>
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
                                        <p className="font-medium text-gray-800">{tour_pay ? tour_title : acco_title}</p>
                                        <p className="text-sm text-gray-600">{getTravelersText()}</p>
                                    </div>
                                    <div className="ml-auto">
                                        <p className="font-bold text-blue-600">${price_perPerson}</p>
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
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
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
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Service Fee</span>
                                        <span>${serviceFee.toFixed(2)}</span>
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
                                            <span className="text-blue-600">${total.toFixed(2)}</span>
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