import React, { useState, useEffect } from 'react';
import { Calendar, Users, CreditCard, Mail, Phone, User, CheckCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
const Booking = ({ tour }) => {
    const { price, reviews } = tour;
    const [formData, setFormData] = useState({
        date: '',
        adults: 1,
        children: 0,
        fullName: '',
        email: '',
        phone: '',
        specialRequest: ''
    });

    const dragY = useMotionValue(0);
    const height = 600;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [valid, setValid] = useState('');
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handlePhoneChange = (value) => {
        setPhoneNumber(value);
        setValid(validatePhoneNumber(value))
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneNumberPattern = /^\{10}$/;
        return phoneNumberPattern.test(phoneNumber);
    }

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1500);
    };

    const calculatePricing = () => {
        const adultPrice = tour?.price || 0;
        const childPrice = adultPrice * 0.75;
        const adultTotal = adultPrice * formData.adults;
        const childTotal = childPrice * formData.children;
        const subtotal = adultTotal + childTotal;
        const serviceCharge = subtotal * 0.10;
        const total = subtotal + serviceCharge;

        return {
            adultTotal,
            childTotal,
            subtotal,
            serviceCharge,
            total
        };
    };

    const pricing = calculatePricing();

    return (
        <div className="w-full max-w-md mx-auto sticky top-4">
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
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                            className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center">{formData.adults}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleCountChange('adults', 1)}
                                            className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Users className="w-5 h-5 text-blue-600" />
                                        <label className="text-sm font-medium text-gray-700">Children</label>
                                        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full font-medium">25% OFF</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            type="button"
                                            onClick={() => handleCountChange('children', -1)}
                                            className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center">{formData.children}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleCountChange('children', 1)}
                                            className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
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
                                    Tour Date
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
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
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
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
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
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
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
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
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
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
                                    <span>Service Charge (10%)</span>
                                    <span>${pricing.serviceCharge.toFixed(2)}</span>
                                </div>
                                <div className="pt-3 border-t">
                                    <div className="flex justify-between items-center font-bold text-lg">
                                        <span>Total</span>
                                        <span className="text-blue-600">${pricing.total.toFixed(2)}</span>
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
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in">
                                    <div className="flex items-center text-green-800">
                                        <CheckCircle className="w-5 h-5 mr-2" />
                                        <span>Booking submitted successfully! We'll contact you soon to confirm your reservation.</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Booking;