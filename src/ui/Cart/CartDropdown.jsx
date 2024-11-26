import React from 'react'
import {ShoppingCart, X, Arrow} from 'lucide-react'
import { useCart } from '../Context/CartContext'
import { useNavigate } from 'react-router-dom'

const CartDropdown = ({isOpen, onClose}) => {
    const { cartItems, currentBooking, removeFromCart, getCartTotal } = useCart();
    const navigate = useNavigate();
    const handleStartCheckout = () => {
        navigate('/checkout', { 
            state: { 
                booking: currentBooking 
            } 
        });
        onClose();
    };

    const renderNotificationBadge = () => {
        if (!currentBooking) return null;

        return (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full 
                            w-5 h-5 flex items-center justify-center text-xs">
                1
            </div>
        );
    };
    return (
        <div className="fixed inset-0 z-50 lg:absolute lg:inset-auto lg:right-0 lg:mt-2">
            {/* Backdrop for mobile */}
            <div 
            className="fixed inset-0 bg-black/50 lg:hidden" 
            onClick={onClose}
            />
            {/* Cart Container */}
            <div className="fixed bottom-0 left-0 right-0 
                            lg:absolute lg:w-96 bg-white rounded-t-lg 
                            lg:rounded-lg shadow-xl z-50 max-h-[90vh] 
                            lg:max-h-[80vh] flex flex-col">
                {/* Header */}
                <div className="p-4 border-b sticky top-0 bg-white z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ShoppingCart className="w-5 h-5 text-blue-600" />
                            <h3 className="font-semibold">Shopping Cart</h3>
                            {renderNotificationBadge()}
                        </div>
                        <button 
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto">
                    {cartItems.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">
                            Your cart is empty
                        </div>
                    ) : (
                        <div className="divide-y">
                            {cartItems.map((item) => (
                                <div key={`${item.type}-${item.id}`} className="p-4 hover:bg-gray-50">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-gray-900 truncate">{item.title}</h4>
                                            <p className="text-sm text-gray-500">
                                                {item.type === 'tour' ? 'Tour Package' : 'Accommodation'}
                                            </p>
                                            <div className="mt-1 text-sm flex flex-wrap gap-2">
                                                <span className="text-blue-600 font-medium">
                                                    ${item.totalPrice.toFixed(2)}
                                                </span>
                                                {item.date && (
                                                    <span className="text-gray-500">
                                                        • {new Date(item.date).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                        onClick={() => removeFromCart(item.id, item.type)}
                                        className="p-2 hover:bg-gray-100 rounded-full ml-2"
                                        aria-label="Remove item"
                                        >
                                            <X className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="p-4 bg-gray-50 border-t sticky bottom-0">
                        <div className="flex justify-between mb-4">
                            <span className="font-medium">Total</span>
                            <span className="font-bold text-blue-600">
                                ${getCartTotal().toFixed(2)}
                            </span>
                        </div>
                        <button
                        onClick={handleStartCheckout}
                        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg
                        hover:bg-blue-700 transition-colors duration-200
                        flex items-center justify-center gap-2"
                        >
                            <span>Proceed to Checkout</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartDropdown