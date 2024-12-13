import React from 'react';
import {
    X, EyeIcon, MapPin, DollarSign, Clock, Users, Star,
    Tag, MessageSquareText
} from 'lucide-react';
import './accommodationdetailsmodal.css';
const AccommodationDetailsModal = ({ acco, onClose }) => {
    if (!acco) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-y-auto p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative my-8 max-h-[95vh] flex flex-col overflow-hidden">
                {/* Modal Header */}
                <div className="bg-gradient-to-r rounded-t-2xl from-blue-100 via-white to-blue-100 p-6 border-b relative flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10 
                        bg-white/70 hover:bg-white/90 rounded-full p-1 shadow-md transition-all"
                    >
                        <X size={24} />
                    </button>

                    <div className="flex items-center">
                        <EyeIcon className="mr-3 text-blue-600" size={24} />
                        <h2 className="text-2xl font-bold text-gray-800">Accommodation Details</h2>
                    </div>
                </div>

                {/* Content Container */}
                <div className="overflow-y-auto flex-grow p-6">
                    {/* Images and Basic Info Section */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        {/* Image Gallery */}
                        <div className="grid grid-cols-2 gap-4">
                            {acco.photos && acco.photos.length > 0 ? (
                                acco.photos.map((photo, index) => (
                                    <img
                                        key={index}
                                        src={photo}
                                        alt={`Accommodation ${index + 1}`}
                                        className="w-full h-48 object-cover rounded-lg shadow-md"
                                    />
                                ))
                            ) : (
                                <div className="col-span-2 text-center text-gray-500 p-4">No photos available</div>
                            )}
                        </div>

                        {/* Accommodation Details */}
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-gray-800 mb-4">{acco.title}</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2">
                                    <MapPin className="text-blue-600" size={20} />
                                    <span>{acco.country}, {acco.city}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <DollarSign className="text-blue-600" size={20} />
                                    <span>{acco.price}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Clock className="text-blue-600" size={20} />
                                    <span>{acco.type}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Users className="text-blue-600" size={20} />
                                    <span>Max {acco.maxGroupSize} People</span>
                                </div>
                            </div>

                            {acco.featured && (
                                <div className="flex items-center space-x-2 mt-4;">
                                    <Star className="text-yellow-500" size={20} />
                                    <span>Featured Accommodation</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description and Highlights */}
                    <div className="acco-modal-description-section">
                        <div className="acco-modal-description">
                            <h4 className="text-xl font-semibold mb-4 flex items-center">
                                <MessageSquareText className="mr-2 text-blue-600" size={20} />
                                Accommodation Description
                            </h4>
                            <p style={{ whiteSpace: 'pre-wrap' }}>{acco.desc}</p>
                        </div>

                        <div className="acco-modal-highlights">
                            <h4 className="text-xl font-semibold mb-4 flex items-center">
                                <Tag className="mr-2 text-blue-600" size={20} />
                                Accommodation Highlights
                            </h4>
                            <ul className="acco-modal-highlights-list">
                                {acco.highlights && acco.highlights.map((highlight, index) => (
                                    <li key={index} className="acco-modal-highlight-item">
                                        <span className="acco-modal-highlight-bullet">•</span>
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccommodationDetailsModal;