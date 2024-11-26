import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Trash2, 
  MapPin, 
  Calendar, 
  User, 
  Users,
  CreditCard,
  X,
  Check,
  Baby
} from 'lucide-react';

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => onOpenChange(false)}
      ></div>
      <div className="relative bg-white rounded-2xl w-full max-w-md mx-4 z-50">
        {children}
      </div>
    </div>
  );
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, item }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Trash2 className="mr-3 text-red-500" size={28} />
            Remove Booking
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <p className="text-gray-600 mb-4">
          Are you sure you want to remove this {item?.type.toLowerCase()} from your cart?
        </p>
        
        <div className="bg-gray-50 p-4 rounded-xl mb-4">
          <h3 className="text-xl font-semibold text-gray-700">{item?.name}</h3>
          <div className="flex justify-between mt-2 text-gray-500">
            <p className="flex items-center">
              <MapPin className="mr-2 text-blue-500" size={16} />
              {item?.destination}
            </p>
            <p className="font-bold text-gray-700">${item?.price.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Confirm Remove
          </button>
        </div>
      </div>
    </Dialog>
  );
};

const TravelShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      type: 'Tour',
      name: 'Tropical Paradise Adventure',
      destination: 'Bali, Indonesia',
      date: 'Dec 15-22, 2024',
      guests: {
        adults: 2,
        children: 1
      },
      price: 1200,
      image: '/api/placeholder/300/200'
    },
    {
      id: 2, 
      type: 'Hotel',
      name: 'Sunset Beach Resort',
      destination: 'Maldives',
      date: 'Jan 10-17, 2025',
      guests: {
        adults: 2,
        children: 0
      },
      price: 2500,
      image: '/api/placeholder/300/200'
    }
  ]);

  const [confirmRemove, setConfirmRemove] = useState(null);

  const initiateRemoval = (item) => {
    setConfirmRemove(item);
  };

  const confirmRemoval = () => {
    if (confirmRemove) {
      setCartItems(cartItems.filter(item => item.id !== confirmRemove.id));
      setConfirmRemove(null);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const getTotalGuests = (guests) => {
    return guests.adults + guests.children;
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <ConfirmationModal 
        isOpen={!!confirmRemove}
        onClose={() => setConfirmRemove(null)}
        onConfirm={confirmRemoval}
        item={confirmRemove}
      />

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <ShoppingCart className="mr-4 text-white" size={36} />
              Travel Cart
            </h1>
            <span className="text-xl font-semibold text-blue-100">
              {cartItems.length} Items
            </span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-gray-50">
            <ShoppingCart className="mx-auto mb-6 text-gray-300" size={64} />
            <h2 className="text-2xl text-gray-500">Your cart is empty</h2>
            <p className="text-gray-400 mt-2">Explore amazing tours and hotels!</p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {cartItems.map(item => (
              <div 
                key={item.id} 
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex">
                  <div className="w-1/3 relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/80 rounded-full p-2 shadow-md">
                      <span className="text-sm font-bold text-blue-600">
                        {item.type}
                      </span>
                    </div>
                  </div>
                  <div className="w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        {item.name}
                      </h2>
                      <div className="space-y-3 text-gray-600">
                        <p className="flex items-center">
                          <MapPin className="mr-3 text-blue-500" size={20} />
                          {item.destination}
                        </p>
                        <p className="flex items-center">
                          <Calendar className="mr-3 text-green-500" size={20} />
                          {item.date}
                        </p>
                        <p className="flex items-center">
                          <User className="mr-3 text-purple-500" size={20} />
                          {item.guests.adults} Adults
                        </p>
                        <p className="flex items-center">
                          <Baby className="mr-3 text-pink-500" size={20} />
                          {item.guests.children} Children
                        </p>
                        <p className="flex items-center">
                          <Users className="mr-3 text-indigo-500" size={20} />
                          Total: {getTotalGuests(item.guests)} Guests
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                      <p className="text-3xl font-bold text-green-600">
                        ${item.price.toLocaleString()}
                      </p>
                      <button 
                        onClick={() => initiateRemoval(item)}
                        className="bg-red-50 text-red-600 px-6 py-3 rounded-full hover:bg-red-100 transition-colors flex items-center"
                      >
                        <Trash2 className="mr-2" size={18} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Total Booking Cost</h3>
                  <p className="text-blue-100">All taxes and fees included</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold mb-4">
                    ${calculateTotal().toLocaleString()}
                  </p>
                  <button className="bg-white text-blue-600 px-10 py-4 rounded-full hover:bg-blue-50 transition-colors flex items-center mx-auto">
                    <CreditCard className="mr-2" size={24} />
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelShoppingCart;