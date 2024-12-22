import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, EyeIcon, Star, X, ImagePlus, MapPin, Landmark, Clock, DollarSign, Users, FileText } from 'lucide-react';
import { transactionService } from '../../data/Service/transactionService';
import { tourService } from '../../data/Service/tourService';
import { accommodationService } from '../../data/Service/accommodationService';
import AccommodationDetailsModal from '../../ui/Admin/AccommodationDetailsModal';
import TourDetailsModal from '../../ui/Admin/TourDetailsModal';

// import TransactionDetailsModal from '../../ui/Admin/TransactionDetailsModal';
const TransactionsPanel = () => {
  const [transactions, setTransactions] = useState([]);
  const [transDetail, setTransDetail] = useState();
  const [detailsBook, setDetailsBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
//   const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState(null);
//   const [isCreatingTour, setIsCreatingTour] = useState(false);
//   const [isViewMode, setIsViewMode] = useState(false);
  const initialFormState = {
    title: '',
    country: '',
    city: '',
    photos: [],
    price: '',
    duration: '',
    maxGroupSize: '',
    desc: '',
    featured: false,
    highlights: ['']
  };
  const [formData, setFormData] = useState(initialFormState);

  // Fetch transactions on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const fetchedTransactions = await transactionService.getAllTransactions();
        setTransactions(fetchedTransactions);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch transactions');
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

//   const handleEditTour = async (tour) => {
//     try {
//       const fullTour = await tourService.getSingleTour(tour._id);
//       setSelectedBook(fullTour);
//       setFormData(fullTour);
//       setIsViewMode(false);
//       setIsCreatingTour(true);
//     } catch (err) {
//       setError('Failed to fetch tour details');
//     }
//   };

  // Delete tour handler
  // const handleDeleteTour = async (tourId) => {
  //   const confirmDelete = window.confirm("Are you sure you want to delete this tour?");
  //   if (confirmDelete) {
  //     try {
  //       await tourService.deleteTour(tourId);
  //       setBooks(books.filter(tour => tour._id !== tourId));
  //     } catch (err) {
  //       setError('Failed to delete tour');
  //     }
  //   }
  // };

  const handleViewTransaction = async (trans) => {
    try {
      setTransDetail(trans);
      if(trans.type === "Tour"){
        const tourDetail = await tourService.getSingleTour(trans.experienceId);
        setDetailsBook(tourDetail);
      } else {
        const accoDetail = await accommodationService.getSingleAccommodation(trans.experienceId);
        setDetailsBook(accoDetail);
      }
    } catch (err) {
      setError('Failed to fetch transaction details');
    }
  };

  // Form change handler
  // const handleChange = (e, index = null) => {
  //   const { name, value, files } = e.target;

  //   if (name === 'photos') {
  //     const photoFiles = Array.from(files).map(file => 
  //       URL.createObjectURL(file)
  //     );
  //     setFormData(prev => ({
  //       ...prev,
  //       photos: [...prev.photos, ...photoFiles]
  //     }));
  //   } else if (name === 'highlights') {
  //     const newHighlights = [...formData.highlights];
  //     newHighlights[index] = value;
  //     setFormData(prev => ({
  //       ...prev,
  //       highlights: newHighlights
  //     }));
  //   } else if (['price', 'duration', 'maxGroupSize'].includes(name)) {
  //     setFormData(prev => ({
  //       ...prev,
  //       [name]: value === '' ? '' : Number(value)
  //     }));
  //   } else {
  //     setFormData(prev => ({
  //       ...prev,
  //       [name]: value
  //     }));
  //   }
  // };

  // // Add highlight
  // const addHighlight = () => {
  //   setFormData(prev => ({
  //     ...prev,
  //     highlights: [...prev.highlights, '']
  //   }));
  // };

  // // Remove highlight
  // const removeHighlight = (indexToRemove) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     highlights: prev.highlights.filter((_, index) => index !== indexToRemove)
  //   }));
  // };

  // // Remove photo
  // const removePhoto = (indexToRemove) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     photos: prev.photos.filter((_, index) => index !== indexToRemove)
  //   }));
  // };

  // Submit new tour
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       let result;
//       if (selectedBook) {
//         // Update existing tour
//         result = await tourService.updateTour(selectedBook._id, formData);
//         // Update books list
//         setBooks(books.map(tour => 
//           tour._id === selectedBook._id ? result : tour
//         ));
//       } else {
//         // Create new tour
//         result = await tourService.createTour(formData);
//         setBooks([...books, result]);
//       }
      
//       // Reset form and state
//       setFormData(initialFormState);
//       setIsCreatingTour(false);
//       setSelectedBook(null);
//       setIsViewMode(false);
//     } catch (error) {
//       console.error('Error saving tour:', error);
//       setError('Failed to save tour');
//     }
//   };

//   const handleCancel = () => {
//     setIsCreatingTour(false);
//     setSelectedBook(null);
//     setIsViewMode(false);
//     setFormData(initialFormState);
//   };

  // Render loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b bg-gradient-to-r from-white to-gray-50">
          <h2 className="text-lg font-semibold">Transactions Management</h2>
        </div>
        <div className="p-4 flex justify-center items-center h-96">
          <p className="text-gray-500">Loading transactions...</p>
        </div>
      </div>
    );
  }
  function maskCardNumber(cardNumber) {
    if (!cardNumber) return '';
    const visibleDigits = 3; // Number of visible digits at the start
    const maskChar = '*'; // Character for masking
  
    const visiblePart = cardNumber.slice(0, visibleDigits);
    const maskedPart = maskChar.repeat(cardNumber.length - visibleDigits);
  
    return visiblePart + maskedPart;
  }
  // Render error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b bg-gradient-to-r from-white to-gray-50">
          <h2 className="text-lg font-semibold">Transactions Management</h2>
        </div>
        <div className="p-4 flex justify-center items-center h-96">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Panel Header */}
      <div className="bg-gradient-to-r from-blue-100 via-white to-blue-100 p-6 
                    flex justify-between items-center border-b border-blue-100">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Landmark className="mr-3 text-blue-600" size={24} />
          Transactions Table
        </h2>
        {/* {!isCreatingTour ? (
          
          <button 
            onClick={() => setIsCreatingTour(true)}
            className="group flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-lg 
            hover:bg-blue-700 transition-all duration-300 ease-in-out 
            transform hover:-translate-y-1 hover:shadow-lg"
          >
            <Plus className="mr-2 group-hover:rotate-180 transition-transform" size={20} /> Create New Tour
          </button>
        ) : (
          <button 
            onClick={() => setIsCreatingTour(false)}
            className="group flex items-center bg-red-500 text-white px-5 py-2.5 rounded-lg 
            hover:bg-red-600 transition-all duration-300 ease-in-out 
            transform hover:-translate-y-1 hover:shadow-lg"
          >
            <X className="mr-2 group-hover:rotate-180 transition-transform" size={20} /> Cancel
          </button>
        )} */}
      </div>
   
      {/* Inline Tour Creation Form */}
      {/* {isCreatingTour && (
        <div className="bg-gray-50 p-8">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6"> */}
              {/* Title Input */}
              {/* <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className="text-gray-400" size={20} />
                </div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="  Tour Title"
                  disabled={isViewMode}
                  className="w-full pl-4 px-5 py-3 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                  transition duration-300"
                  required
                />
              </div> */}
              {/* Country Input */}
              {/* <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="text-gray-400" size={20} />
                </div>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="  Country"
                  className="w-full pl-10 px-5 py-3 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                  transition duration-300"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6"> */}

              {/* City Input */}
              {/* <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Landmark className="text-gray-400" size={20} />
                </div>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="  City"
                  className="w-full pl-10 px-5 py-3 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                  transition duration-300"
                  required
                />
              </div> */}

              {/* Price Input */}
              {/* <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="text-gray-400" size={20} />
                </div>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="  Price (USD)"
                  className="w-full pl-10 px-5 py-3 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                  transition duration-300"
                  required
                  min="0"
                />
              </div> */}

              {/* Duration Input */}
              {/* <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="text-gray-400" size={20} />
                </div>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="  Duration (Days)"
                  className="w-full pl-10 px-5 py-3 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                  transition duration-300"
                  required
                  min="1"
                />
              </div>
            </div> */}

            {/* Highlights */}
            {/* <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Tour Highlights</h3>
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="flex mb-3">
                  <input
                    type="text"
                    name="highlights"
                    value={highlight}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Tour Highlight"
                    className="flex-grow px-4 py-2.5 border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                    transition duration-300 mr-3"
                    required
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeHighlight(index)}
                      className="bg-red-500 text-white px-4 py-2.5 rounded-lg 
                      hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addHighlight}
                className="bg-blue-500 text-white px-4 py-2.5 rounded-lg 
                hover:bg-blue-600 transition-colors mt-2"
              >
                Add Highlight
              </button>
            </div> */}

            {/* Photos Upload */}
            {/* <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Upload Tour Photos</h3>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer 
                hover:bg-blue-50 transition-colors group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImagePlus className="text-blue-400 group-hover:text-blue-600 mb-3" size={48} />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG, or WEBP</p>
                  </div>
                  <input 
                    type="file" 
                    name="photos" 
                    multiple 
                    accept="image/*" 
                    onChange={handleChange} 
                    className="hidden" 
                  />
                </label>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={photo} 
                      alt={`Tour ${index + 1}`} 
                      className="w-32 h-32 object-cover rounded-lg" 
                    />
                    <button 
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 
                      opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Description */}
            {/* <div className="relative">
              <textarea
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                placeholder="Tour Description"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition duration-300"
                rows="6"
                required
              />
            </div> */}

            {/* Featured and Max Group Size */}
            {/* <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      featured: e.target.checked
                    }))}
                    className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">Featured Tour</span>
                </label>
              </div> */}
              {/* Max Group Size */}
              {/* <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="text-gray-400 mb-3" size={20} />
                </div>
                <input
                  type="number"
                  name="maxGroupSize"
                  value={formData.maxGroupSize}
                  onChange={handleChange}
                  placeholder="Max Group Size"
                  className="w-full pl-10 px-5 py-3 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                  transition duration-300"
                  required
                  min="1"
                />
              </div>
            </div> */}

            {/* Submit Button */}
            {/* <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white 
                px-8 py-3.5 rounded-lg text-lg font-semibold 
                hover:from-blue-700 hover:to-blue-900 
                transition-all duration-300 ease-in-out 
                transform hover:-translate-y-1 hover:shadow-xl"
              >
                {selectedBook ? 'Update Tour' : 'Create Tour'}
              </button>
            </div>
          </form>
        </div>
      )} */}

      {/* Transactions Table */}
      {transactions.length === 0 ? (
        <div className="p-4 flex justify-center items-center h-96">
          <p className="text-gray-500">No transactions found.</p>
        </div>
      ) : (
        <div className="max-h-[600px] overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-4">User Email</th>
                <th className="p-4">Experience Title</th>
                <th className="p-4">Price</th>
                <th className="p-4">Type</th>
                <th className="p-4">Transaction Date</th>
                <th className="p-4">Card Number</th>
                <th className="p-4">Detail</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(trans => (
                <tr key={trans._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4 flex items-center">
                    {/* {trans.featured && <Star className="text-yellow-500 mr-2" size={16} />} */}
                    <span>{trans.email}</span>
                  </td>
                  <td className="p-4">{trans.experienceName}</td>
                  <td className="p-4">${trans.totalPrice}</td>
                  <td className="p-4">{trans.type}</td>
                  {/* <td className="p-4">
                    {tour.featured ? (
                      <span className="text-green-500">Yes</span>
                    ) : (
                      <span className="text-gray-500">No</span>
                    )}
                  </td> */}
                  <td className="p-4">{trans.date}</td>       
                  <td className="p-4">{maskCardNumber(trans.cardNumber)}</td>           
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewTransaction(trans)}
                        className="text-blue-500 hover:bg-blue-50 p-2 rounded-full"
                      >
                        <EyeIcon size={18} />
                      </button>
                      {/* <button 
                        onClick={() => handleEditTour(tour)}
                        className="text-green-500 hover:bg-green-50 p-2 rounded-full"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteTour(tour._id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                      >
                        <Trash2 size={18} />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {detailsBook && transDetail.type === "Tour" && (
        <TourDetailsModal 
          tour={detailsBook} 
          onClose={() => setDetailsBook(null)} 
        />
      )}
      {detailsBook && transDetail.type === "Accommodation" && (
        <AccommodationDetailsModal 
          acco={detailsBook} 
          onClose={() => setDetailsBook(null)} 
        />
      )}
    </div>
  );
};

export default TransactionsPanel;