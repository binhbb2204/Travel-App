import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react'; 
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
import {accommodationBookingService} from '../data/Service/accommodationBookingService';
import {authService} from '../data/Service/authService';
import { tourBookingService } from '../data/Service/tourBookingService';


const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [bookingData, setBookingData] = useState({
        tour_Id: 'none',
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
        acco_Id: 'none',
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

    const [loading1, setLoading1] = useState(true); // Track if data is loading
    const [loading2, setLoading2] = useState(true); // Track if data is loading
    const userId = authService.getCurrentUser().userId;

    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                const accoBookData = await accommodationBookingService.getUserAccoBook(userId, "Pending");
                if (accoBookData) {
                    setBookingData2({
                        acco_Id: accoBookData._id || 'none',
                        acco_title: accoBookData.accommodationName || "Unknown Accommodation 2",
                        acco_checkin: accoBookData.checkInDate ? new Date(accoBookData.checkInDate).toLocaleDateString() : 'none',
                        acco_checkout: accoBookData.checkOutDate ? new Date(accoBookData.checkOutDate).toLocaleDateString() : 'none',
                        acco_adults: accoBookData.adults || 1,
                        acco_children: accoBookData.children || 0,
                        acco_totalPrice: accoBookData.totalPrice || 0.00,
                        acco_pricePerPerson: accoBookData.price || 0.00,
                        acco_serviceCharge: accoBookData.serviceCharge || 0.00,
                        acco_fullName: accoBookData.name || 'none',
                        acco_email: accoBookData.email || 'none',
                        acco_phone: accoBookData.phone || 'none',
                        acco_specialRequest: accoBookData.specialRequest || 'none',
                        acco_type: "accommodation",
                        acco_pay: 0, 
                    });
                    if(bookingData2.acco_title === "Unknown Accommodation"){
                        bookingData2.acco_type= "none";
                    }
                }
                // setLoading(false);
            } catch (error) {
                console.error("Error fetching accommodation booking data:", error);
                // setLoading(false);
            } finally {
                setLoading1(false); // Set loading to false after data is fetched
            }
        };
        setSelectedBookings({
            tour: false,
            accommodation: false
        });
        fetchBookingData();
    }, []);

    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                const tourBookData = await tourBookingService.getUserTourBook(userId, "Pending");
                if (tourBookData) {
                    setBookingData({
                        tour_Id: tourBookData._id || 'none',
                        tour_title: tourBookData.tourName || "Unknown Title",
                        tour_date: tourBookData.date ? new Date(tourBookData.date).toLocaleDateString() : 'none',
                        tour_adults: tourBookData.adults || 1,
                        tour_children: tourBookData.children || 0,
                        tour_totalPrice: tourBookData.totalPrice || 0.00,
                        tour_pricePerPerson: tourBookData.price || 0.00,
                        tour_serviceCharge: tourBookData.serviceCharge || 0.00,
                        tour_fullName: tourBookData.name || 'none',
                        tour_email: tourBookData.email || 'none',
                        tour_phone: tourBookData.phone || 'none',
                        tour_specialRequest: tourBookData.specialRequest || 'none',
                        tour_type: "tour",
                        tour_pay: 0, 
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
                setLoading2(false); // Set loading to false after data is fetched
            }
        };
        setSelectedBookings({
            tour: false,
            accommodation: false
        });
        fetchBookingData();
    }, []);

    
    const [selectedBookings, setSelectedBookings] = useState({
        tour: false,
        accommodation: false
    });

    // useEffect(() => {
    //     console.log("Updated bookingData2:", bookingData2);
    // }, [bookingData2]);

    // useEffect(() => {
    //     const locationStateTour = location.state?.bookingData;
    //     if (locationStateTour) {
    //         setBookingData((prevData) => ({
    //             ...prevData,
    //             ...Object.keys(locationStateTour).reduce((acc, key) => {
    //                 if (locationStateTour[key] !== null && locationStateTour[key] !== 'none') {
    //                     acc[key] = locationStateTour[key];
    //                 }
    //                 return acc;
    //             }, {}),
    //         }));
    //         localStorage.setItem('bookingData', JSON.stringify(locationStateTour));
    //     } else {
    //         const savedBookingData = localStorage.getItem('bookingData');
    //         if (savedBookingData) {
    //             setBookingData(JSON.parse(savedBookingData));
    //         }
    //     }
        
    // }, [location.state]);

    useEffect(() => {
        console.log(bookingData2);
    }, []);
    // useEffect(() => {
    //     const locationStateAcco = location.state?.bookingData2;
    //     if (locationStateAcco) {
    //         setBookingData2((prevData) => ({
    //             ...prevData,
    //             ...Object.keys(locationStateAcco).reduce((acc, key) => {
    //                 if (locationStateAcco[key] !== null && locationStateAcco[key] !== 'none') {
    //                     acc[key] = locationStateAcco[key];
    //                 }
    //                 return acc;
    //             }, {}),
    //         }));
    //         localStorage.setItem('bookingData2', JSON.stringify(locationStateAcco));
    //     } else {
    //         const savedBookingData = localStorage.getItem('bookingData2');
    //         if (savedBookingData) {
    //             setBookingData2(JSON.parse(savedBookingData));
    //         }
    //     }
    // }, [location.state]);

    const handleBookingSelection = (type) => {
        setSelectedBookings(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };
    const handleProceedToPayment = () => {
        const selectedBookingData = {};
    
        if (selectedBookings.tour && bookingData.tour_type === 'tour') {
            selectedBookingData.bookingData = { 
                ...bookingData, 
                tour_pay: 1 
            };
        }
    
        if (selectedBookings.accommodation && bookingData2.acco_type === 'accommodation') {
            selectedBookingData.bookingData2 = { 
                ...bookingData2, 
                acco_pay: 1 
            };
        }
    
        if (Object.keys(selectedBookingData).length > 0) {
            navigate("/transaction", { 
                state: {
                    ...selectedBookingData,
                    combinedTotalPrice: totalPrice,
                    combinedServiceCharge: totalServiceCharge,
                    payForAccommodation: selectedBookings.accommodation,
                    payForTour: selectedBookings.tour,
                }
            });
        }
    };

    // Calculate total price and service charge
    const calculateTotal = () => {
        let totalPrice = 0;
        let totalServiceCharge = 0;

        if (selectedBookings.tour && bookingData.tour_type === 'tour') {
            totalPrice += bookingData.tour_totalPrice || 0;
            totalServiceCharge += bookingData.tour_serviceCharge || 0;
        }

        if (selectedBookings.accommodation && bookingData2.acco_type === 'accommodation') {
            totalPrice += bookingData2.acco_totalPrice || 0;
            totalServiceCharge += bookingData2.acco_serviceCharge || 0;
        }

        return { totalPrice, totalServiceCharge };
    };

    const { totalPrice, totalServiceCharge } = calculateTotal();

    
    const handleRemoveBooking = async (id, type) => {
        if(type === "Accommodation"){
            await accommodationBookingService.deleteAccoBook(id);
        }
        if(type === "Tour"){
            await tourBookingService.deleteTourBook(id);
        }
        window.location.reload();
    };

    if(loading1 && loading2){
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

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Bookings Details Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Tour Booking Details */}
                        {bookingData.tour_type === 'tour' && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                                    <h2 className="text-base font-medium text-gray-800">
                                        Tour Booking Information
                                    </h2>
                                    <Trash2
                                        className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                                        onClick={() => handleRemoveBooking(bookingData.tour_Id, "Tour")}
                                    />
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
                            
                        )}

                        {/* Accommodation Booking Details */}
                        {bookingData2.acco_type === 'accommodation' && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                                    <h2 className="text-base font-medium text-gray-800">
                                        Accommodation Booking Information
                                    </h2>
                                    <Trash2
                                        className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                                        onClick={() => handleRemoveBooking(bookingData2.acco_Id, "Accommodation")}
                                    />
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
                        )}
                    </div>

                    {/* Combined Payment Summary */}
                    <div className="lg:sticky top-16 self-start">
                        <div className="bg-white rounded-xl shadow-md border border-gray-200">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-blue-600">
                                    Payment Summary
                                </h2>
                                <CreditCard className="w-6 h-6 text-gray-500" />
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Tour Booking Selection */}
                                {bookingData.tour_type === 'tour' && (
                                    <div className="flex items-center justify-between mb-4 ">
                                        <div className="flex items-center ">
                                            <input
                                                type="checkbox"
                                                id="tourBooking"
                                                checked={selectedBookings.tour}
                                                onChange={() => handleBookingSelection('tour')}
                                                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded "
                                            />
                                            <label htmlFor="tourBooking" className="text-sm font-medium text-gray-700">
                                                {bookingData.tour_title}
                                            </label>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">
                                            ${bookingData.tour_totalPrice ? bookingData.tour_totalPrice.toFixed(2) : '0.00'}
                                        </span>
                                    </div>
                                )}

                                {/* Accommodation Booking Selection */}
                                {bookingData2.acco_type === 'accommodation' && (
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="accoBooking"
                                                checked={selectedBookings.accommodation}
                                                onChange={() => handleBookingSelection('accommodation')}
                                                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="accoBooking" className="text-sm font-medium text-gray-700">
                                                {bookingData2.acco_title}
                                            </label>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">
                                            ${bookingData2.acco_totalPrice ? bookingData2.acco_totalPrice.toFixed(2) : '0.00'}
                                        </span>
                                    </div>
                                )}

                                {/* Payment Details */}
                                <div className="space-y-4 border-b border-gray-200 pb-4">
                                    <div className="flex justify-between text-gray-700">
                                        <span>Subtotal (includes Service Fee)</span>
                                        <span className="font-medium">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500 text-sm">
                                        <span>Service Fee</span>
                                        <span>${totalServiceCharge.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between items-center font-bold text-xl text-gray-900">
                                    <span>Total</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>

                                {/* Proceed to Payment Button */}
                                <button
                                    onClick={handleProceedToPayment}
                                    disabled={!selectedBookings.tour && !selectedBookings.accommodation}
                                    className={`w-full mt-4 py-3 text-white font-semibold rounded-lg 
                                    transition duration-300 flex items-center justify-center gap-2 shadow-lg
                                    ${(!selectedBookings.tour && !selectedBookings.accommodation) 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-blue-600 hover:bg-blue-700'}`}
                                >
                                    <CreditCard className="w-5 h-5" />
                                    Proceed to Payment
                                </button>

                                {/* Secure Payment */}
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