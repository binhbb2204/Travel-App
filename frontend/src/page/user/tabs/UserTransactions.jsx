// // user/tabs/UserTransactions.jsx
// import React from 'react';
// import { CreditCard } from 'lucide-react';


// const UserTransactions = ({ transactions }) => {
//     const tours = transactions?.tours ?? []; // Use empty array if undefined
//     const accommodations = transactions?.accommodations ?? []; // Use empty array if undefined

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white shadow-md rounded-lg p-4">
//                 <h3 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
//                     <CreditCard className="mr-2" /> Tour Bookings
//                 </h3>
//                 {tours.length > 0 ? (
//                     tours.map((tour) => (
//                         <div key={tour._id} className="border-b py-2 last:border-b-0">
//                             <p className="font-medium">{tour.experienceName}</p>
//                             <div className="text-sm text-gray-600 flex justify-between">
//                                 <span>{tour.date}</span>
//                                 <span className="font-semibold">{tour.totalPrice}</span>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-gray-500">No tour bookings available.</p>
//                 )}
//             </div>
//             <div className="bg-white shadow-md rounded-lg p-4">
//                 <h3 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
//                     <CreditCard className="mr-2" /> Accommodation Bookings
//                 </h3>
//                 {accommodations.length > 0 ? (
//                     accommodations.map((accommodation) => (
//                         <div key={accommodation._id} className="border-b py-2 last:border-b-0">
//                             <p className="font-medium">{accommodation.experienceName}</p>
//                             <div className="text-sm text-gray-600 flex justify-between">
//                                 <span>{accommodation.date}</span>
//                                 <span className="font-semibold">{accommodation.totalPrice}</span>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-gray-500">No accommodation bookings available.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UserTransactions;

import React from 'react';
import { CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 

const UserTransactions = ({ transactions }) => {

    const tours = transactions?.tours ?? []; 
    const accommodations = transactions?.accommodations ?? []; 
    const navigate = useNavigate();

    const formatDate = (date) => {
        try {
            const options = { year: 'numeric', month: 'long', day: 'numeric' }; 
            return new Date(date).toLocaleDateString(undefined, options);
        } catch {
            return date;
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tour Bookings */}
            <div className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
                    <CreditCard className="mr-2" /> Tour Bookings
                </h3>
                {tours.length > 0 ? (
                    tours.map((tour) => (
                        <div
                            key={tour._id}
                            className="border-b py-2 last:border-b-0"
                        >
                            <p
                                className="font-medium text-blue-500 cursor-pointer hover:underline"
                                onClick={() => navigate(`/tours/${tour.experienceId}`)}
                            >
                                {tour.experienceName}
                            </p>
                            <div className="text-sm text-gray-600 flex justify-between">
                                <span>Transaction Date: {formatDate(tour.date)}</span>
                                <span className="font-semibold">${tour.totalPrice}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No tour bookings available.</p>
                )}
            </div>

            {/* Accommodation Bookings */}
            <div className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
                    <CreditCard className="mr-2" /> Accommodation Bookings
                </h3>
                {accommodations.length > 0 ? (
                    accommodations.map((accommodation) => (
                        <div
                            key={accommodation._id}
                            className="border-b py-2 last:border-b-0"
                        >
                            <p
                                className="font-medium text-blue-500 cursor-pointer hover:underline"
                                onClick={() => navigate(`/accommodations/${accommodation.experienceId}`)}
                            >
                                {accommodation.experienceName}
                            </p>
                            <div className="text-sm text-gray-600 flex justify-between">
                                <span>Transaction Date: {formatDate(accommodation.date)}</span>
                                <span className="font-semibold">${accommodation.totalPrice}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No accommodation bookings available.</p>
                )}
            </div>
        </div>
    );
};

export default UserTransactions;
