import React, { useState, useEffect } from 'react';
import { Calendar, Users, CreditCard, Mail, Phone, User, CheckCircle, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../ui/Context/CartContext';
import axios from 'axios';
import {accommodationBookingService} from '../data/Service/accommodationBookingService';
import {accommodationService} from '../data/Service/accommodationService';
import {userService} from '../data/Service/userService';
import {authService} from '../data/Service/authService';
import mongoose from "mongoose";

const bottomSheetVariants = {
    hidden: { y: '100%' },
    visible: { 
        y: 0,
        transition: {
            type: 'spring',
            damping: 30,
            stiffness: 300,
        }
    }
};

const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Separate BookingContent component
const BookingContent = ({ 
    formData, 
    handleInputChange, 
    handleCountChange, 
    isSubmitting, 
    showSuccess, 
    pricing,
    price 
}) => (
    <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Select Travelers
            </h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-blue-600" />
                        <label className="text-sm font-medium text-gray-700">Adults</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            type="button"
                            onClick={() => handleCountChange('adults', -1)}
                            className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center"
                        >
                            -
                        </button>
                        <span className="w-8 text-center">{formData.adults}</span>
                        <button
                            type="button"
                            onClick={() => handleCountChange('adults', 1)}
                            className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center"
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-blue-600" />
                        <label className="text-sm font-medium text-gray-700">Children</label>
                        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">25% OFF</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            type="button"
                            onClick={() => handleCountChange('children', -1)}
                            className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center"
                        >
                            -
                        </button>
                        <span className="w-8 text-center">{formData.children}</span>
                        <button
                            type="button"
                            onClick={() => handleCountChange('children', 1)}
                            className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="space-y-4">
            <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                    Checkin Date
                </label>
                <input
                    type="date"
                    id="checkin"
                    value={formData.checkin}
                    onChange={handleInputChange}
                    min={getCurrentDate()}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                    Checkout Date
                </label>
                <input
                    type="date"
                    id="checkout"
                    value={formData.checkout}
                    onChange={handleInputChange}
                    min={getCurrentDate()}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 mr-2 text-blue-500" />
                    Full Name
                </label>
                <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 mr-2 text-blue-500" />
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 mr-2 text-blue-500" />
                    Phone
                </label>
                <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Special Requests (Optional)
                </label>
                <textarea
                    id="specialRequest"
                    value={formData.specialRequest}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center text-gray-600">
                    <span>Adults ({formData.adults} × ${price})</span>
                    <span>${pricing.adultTotal.toFixed(2)}</span>
                </div>
                {formData.children > 0 && (
                    <div className="flex justify-between items-center text-gray-600">
                        <div className="flex items-center">
                            <span>Children ({formData.children} × ${(price * 0.75).toFixed(2)})</span>
                            <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">25% OFF</span>
                        </div>
                        <span>${pricing.childTotal.toFixed(2)}</span>
                    </div>
                )}
                <div className="flex justify-between items-center text-gray-600">
                    <span>Duration</span>
                    <span>{pricing.stayDuration ? (pricing.stayDuration) : 0} Day(s)</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                    <span>Service Charge (10%)</span>
                    <span>${pricing.stayDuration ? pricing.serviceCharge.toFixed(2) : 0.00}</span>
                </div>
                <div className="pt-3 border-t">
                    <div className="flex justify-between items-center font-bold text-lg">
                        <span>Total</span>
                        <span className="text-blue-600">${pricing.stayDuration ? pricing.total.toFixed(2) : 0.00 }</span>
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg 
                    hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 
                    disabled:opacity-50 transition-all duration-200 flex items-center justify-center space-x-2"
            >
                {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                    <>
                        <Sparkles className="w-5 h-5" />
                        <span>Book Your Adventure</span>
                    </>
                )}
            </button>

            {showSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center text-green-800">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span>Booking submitted successfully! We'll contact you soon to confirm your reservation.</span>
                    </div>
                </div>
            )}
        </div>
    </div>
);

// Separate DesktopVersion component
const DesktopVersion = ({ price, handleSubmit, ...props }) => (
    <div className="hidden md:block w-full max-w-md mx-auto sticky top-4">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-6 space-y-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <h2 className="text-2xl font-bold text-center">Book Your Adventure</h2>
                <div className="flex justify-center items-center space-x-2">
                    <span className="text-3xl font-bold">${price}</span>
                    <span className="text-sm opacity-75">/ adult</span>
                </div>
                <div className="text-center text-sm mt-2 text-blue-100">
                    Children under 12 get 25% off
                </div>
            </div>
            <div className="p-6">
                <form onSubmit={handleSubmit}>
                    <BookingContent {...props} price={price} />
                </form>
            </div>
        </div>
    </div>
);

// Separate MobileBookButton component
const MobileBookButton = ({ price, setIsBottomSheetOpen }) => (
    <div className="fixed bottom-4 left-4 right-4 md:hidden">
        <button
            onClick={() => setIsBottomSheetOpen(true)}
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg 
                shadow-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 
                transition-all duration-200 flex items-center justify-center space-x-2"
        >
            <Sparkles className="w-5 h-5" />
            <span>Book Now - ${price}</span>
        </button>
    </div>
);

// Main Booking component
const Booking = ({ acco, accoId }) => {
    const navigate = useNavigate();
    const { price, reviews, title } = acco;
    
    const [formData, setFormData] = useState({
        checkin: '',
        checkout: '',
        adults: 1,
        children: 0,
        fullName: '',
        email: '',
        phone: '',
        specialRequest: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const { addToCart, currentBooking, setCurrentBooking } = useCart();

    
    useEffect(() => {
        if (isBottomSheetOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isBottomSheetOpen]);

    useEffect(() => {
        const checkMobile = () => {
            const isMobileView = window.innerWidth <= 768;
            setIsMobile(isMobileView);
            if (!isMobileView) {
                setIsBottomSheetOpen(false);
            }
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleInputChange = (e) => {
        const { id, name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id || name]: value
        }));
    };

    const handleCountChange = (field, increment) => {
        setFormData(prev => ({
            ...prev,
            [field]: Math.max(field === 'adults' ? 1 : 0, prev[field] + increment)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        // Validate form fields
        if (!formData.checkin || !formData.checkout || !formData.fullName || !formData.email || !formData.phone) {
            alert("Please fill in all required fields!");
            setIsSubmitting(false);
            return;
        }
    
        const pricing = calculatePricing(); // Ensure pricing is calculated correctly
        
        // Prepare booking data
        // const bookingData2 = {
        //     acco_title: acco?.title || "Unknown Accommodation",
        //     acco_checkin: formData.checkin,
        //     acco_checkout: formData.checkout,
        //     acco_adults: formData.adults,
        //     acco_children: formData.children,
        //     acco_totalPrice: pricing.total,
        //     acco_pricePerPerson: acco?.price || 0,
        //     acco_serviceCharge: pricing.serviceCharge,
        //     acco_fullName: formData.fullName,
        //     acco_email: formData.email,
        //     acco_phone: formData.phone,
        //     acco_specialRequest: formData.specialRequest,
        //     acco_type: "accommodation",
        //     acco_pay: 0,
        // };
        // addToCart(bookingData);
        // const userData = await userService.getSingleUser(authService.getCurrentUser().userId) ; 
        // const accoName = await accommodationService.getSingleAccommodation(accoId).title;
        const acco_Price = price;
        const bookingData = {
            userId: authService.getCurrentUser().userId,
            name: formData.fullName,
            accommodationId: accoId,
            accommodationName: title,
            email: formData.email,
            phone: formData.phone,
            checkInDate: new Date(formData.checkin).toISOString(),  
            checkOutDate: new Date(formData.checkout).toISOString(), 
            adults: formData.adults,
            children: formData.children,
            specialRequest: formData.specialRequest,
            totalPrice: pricing.total,
            serviceCharge: pricing.serviceCharge,
            status: "Pending",
        };

        try {
            if(await accommodationBookingService.getUserAccoBook(bookingData.userId, "Pending")){
                await accommodationBookingService.deleteUserAccoBook(bookingData.userId, "Pending");
            }
            await accommodationBookingService.createAccoBook(bookingData);
        } catch(err) {
            console.log("Error creating accommodation booking");
            console.log(bookingData.accommodationId);
            console.log(bookingData.userId);
            console.log(bookingData.name);
            console.log(bookingData.accommodationName);
            console.log(bookingData.email);
            console.log(bookingData.phone);
            console.log(bookingData.checkInDate);
            console.log(bookingData.checkOutDate);
            console.log(bookingData.adults);
            console.log(bookingData.children);
            console.log(bookingData.specialRequest);
            console.log(bookingData.totalPrice);
            console.log(bookingData.serviceCharge);
            console.log(bookingData.status);
        }

        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
    
            setTimeout(() => {
                setShowSuccess(false);
                if (isMobile) setIsBottomSheetOpen(false);
                try {
                    //navigate("/transaction", { state: { bookingData } });
                    // navigate("/checkout", { state: { acco_Price } });
                    //navigate("/checkout");
                    
                    
                } catch (error) {
                    console.error("Navigation failed:", error);
                    alert("Something went wrong. Please try again.");
                }
                
                // addToCart(bookingData);
                //navigate("/checkout");
            }, 3000);
        }, 1500);

        
    };
    
    const calculateDuration = () => {
        const checkinDate = new Date(formData.checkin);
        const checkoutDate = new Date(formData.checkout);
        const diffTime = checkoutDate - checkinDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return diffDays;
    };

    const calculatePricing = () => {
        const adultPrice = acco?.price || 0;
        const childPrice = adultPrice * 0.75;
        const adultTotal = adultPrice * formData.adults;
        const childTotal = childPrice * formData.children;
        const stayDuration =calculateDuration();
        const subtotal = (adultTotal + childTotal)*stayDuration;
        const serviceCharge = subtotal * 0.10;
        const total = subtotal + serviceCharge;

        return {
            adultTotal,
            childTotal,
            subtotal,
            serviceCharge,
            total,
            stayDuration
        };
    };

    const pricing = calculatePricing();
    const duration = calculateDuration();
    return (
        <>
            <DesktopVersion 
                price={price}
                formData={formData}
                handleInputChange={handleInputChange}
                handleCountChange={handleCountChange}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                showSuccess={showSuccess}
                pricing={pricing}
            />
            {isMobile && (
                <>
                    <MobileBookButton 
                        price={price} 
                        setIsBottomSheetOpen={setIsBottomSheetOpen} 
                    />
                    <AnimatePresence>
                        {isBottomSheetOpen && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.5 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setIsBottomSheetOpen(false)}
                                    className="fixed inset-0 bg-black z-40"
                                />
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={bottomSheetVariants}
                                    drag="y"
                                    dragConstraints={{ top: 0 }}
                                    dragElastic={0.2}
                                    onDragEnd={(event, info) => {
                                        if (info.offset.y > 200) {
                                            setIsBottomSheetOpen(false);
                                        }
                                    }}
                                    className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl"
                                    style={{ height: '85vh' }}
                                >
                                    <div className="flex flex-col h-full">
                                        {/* Header */}
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-3" />
                                            <div className="p-6 space-y-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                                                <h2 className="text-2xl font-bold text-center">Book Your Adventure</h2>
                                                <div className="flex justify-center items-center space-x-2">
                                                    <span className="text-3xl font-bold">${price}</span>
                                                    <span className="text-sm opacity-75">/ adult</span>
                                                </div>
                                                <div className="text-center text-sm mt-2 text-blue-100">
                                                    Children under 12 get 25% off
                                                </div>
                                            </div>
                                        </div>

                                        {/* Scrollable Content */}
                                        <div className="flex-1 overflow-y-auto">
                                            <div className="p-6 pb-24">
                                                <form onSubmit={handleSubmit}>
                                                    <BookingContent 
                                                        formData={formData}
                                                        handleInputChange={handleInputChange}
                                                        handleCountChange={handleCountChange}
                                                        isSubmitting={isSubmitting}
                                                        showSuccess={showSuccess}
                                                        pricing={pricing}
                                                        price={price}
                                                        duration={duration}
                                                    />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </>
            )}
        </>
    );
};

export default Booking;