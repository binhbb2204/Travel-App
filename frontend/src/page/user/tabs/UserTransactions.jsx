// user/tabs/UserTransactions.jsx
import React from 'react';
import { CreditCard } from 'lucide-react';

const UserTransactions = ({ transactions }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
                <CreditCard className="mr-2" /> Tour Bookings
            </h3>
            {transactions.tours.map((tour) => (
                <div key={tour.id} className="border-b py-2 last:border-b-0">
                    <p className="font-medium">{tour.name}</p>
                    <div className="text-sm text-gray-600 flex justify-between">
                        <span>{tour.date}</span>
                        <span className="font-semibold">{tour.price}</span>
                    </div>
                </div>
            ))}
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
                <CreditCard className="mr-2" /> Accommodation Bookings
            </h3>
            {transactions.accommodations.map((accommodation) => (
                <div key={accommodation.id} className="border-b py-2 last:border-b-0">
                    <p className="font-medium">{accommodation.name}</p>
                    <div className="text-sm text-gray-600 flex justify-between">
                        <span>{accommodation.checkIn} - {accommodation.checkOut}</span>
                        <span className="font-semibold">{accommodation.price}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default UserTransactions;