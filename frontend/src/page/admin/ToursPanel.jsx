import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, 
  Edit, 
  Trash2, 
  EyeIcon, 
  Star, 
  X, 
  ImagePlus, 
  MapPin, 
  Landmark, 
  Clock, 
  DollarSign, 
  Users, FileText, 
  Copy, 
  Menu,
  ArrowLeft } from 'lucide-react';
import { tourService } from '../../data/Service/tourService';
import TourDetailsModal from '../../ui/Admin/TourDetailsModal';
const ToursPanel = () => {
  const [tours, setTours] = useState([]);
  const [detailsTour, setDetailsTour] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTour, setSelectedTour] = useState(null);
  const [error, setError] = useState(null);
  const [isCreatingTour, setIsCreatingTour] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showFullText, setShowFullText] = useState(false);
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
    highlights: [''],
    reviews: []
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  // Fetch tours on component mount
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setIsLoading(true);
        const fetchedTours = await tourService.getAllTours();
        setTours(fetchedTours);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch tours');
        setIsLoading(false);
      }
    };

    fetchTours();
  }, []);

  const handleEditTour = async (tour) => {
    try {
      const fullTour = await tourService.getSingleTour(tour._id);
      setSelectedTour(fullTour);
      
      const editFormData = {
        ...fullTour,
        photos: []
      };
      
      setFormData(editFormData);
      setIsViewMode(false);
      setIsCreatingTour(true);
    } catch (err) {
      setError('Failed to fetch tour details');
    }
  };

  // Delete tour handler
  const handleDeleteTour = async (tourId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this tour?");
    if (confirmDelete) {
      try {
        await tourService.deleteTour(tourId);
        setTours(tours.filter(tour => tour._id !== tourId));
      } catch (err) {
        setError('Failed to delete tour');
      }
    }
  };

  const cancelTourCreation = () => {
    setIsCreatingTour(false);
    setFormData(initialFormState);
    setSelectedTour(null);
    setIsViewMode(false);
    
    // If on mobile, close any open menus
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleViewTour = async (tour) => {
    try {
      const fullTour = await tourService.getSingleTour(tour._id);
      setDetailsTour(fullTour);
    } catch (err) {
      setError('Failed to fetch tour details');
    }
  };

  // Form change handler
  const handleChange = (e, index = null) => {
    const { name, value, files } = e.target;

    if (name === 'photos') {
      const selectedFiles = Array.from(files);
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...selectedFiles],
      }));
    } else if (name === 'highlights') {
      const newHighlights = [...formData.highlights];
      newHighlights[index] = value;
      setFormData(prev => ({
        ...prev,
        highlights: newHighlights,
      }));
    } else if(name === 'desc'){
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }))
    } else if (['price', 'duration', 'maxGroupSize'].includes(name)) {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? '' : Number(value),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  

  // Add highlight
  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, '']
    }));
  };

  // Remove highlight
  const removeHighlight = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, index) => index !== indexToRemove)
    }));
  };

  // Remove photo
  const removePhoto = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, index) => index !== indexToRemove)
    }));
  };

  // Submit new tour
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formPayload = new FormData();
      
      // Append new photo files
      if (formData.photos.length > 0) {
        formData.photos.forEach((photo) => {
          formPayload.append('photos', photo);
        });
      }

        // Append existing photo URLs if updating
      if (selectedTour && selectedTour.photos) {
        selectedTour.photos.forEach(photoUrl => {
          formPayload.append('existingPhotos', photoUrl);
        });
      }
      
      // Append other form data
      Object.keys(formData).forEach(key => {
        if (key !== 'photos') {
          if (key === 'highlights') {
            const nonEmptyHighlights = formData.highlights
            .filter(highlight => highlight.trim() !== '')
            .map(highlight => highlight.trim());
                    
            nonEmptyHighlights.forEach(highlight => {
              formPayload.append('highlights', highlight);
            });
          } else if (key === 'reviews') {
            const nonEmptyReviews = formData.reviews 
            ? formData.reviews.filter(review => review.trim() !== '') 
            : [];
                    
            if (nonEmptyReviews.length > 0) {
              formPayload.append(key, JSON.stringify(nonEmptyReviews));
            }
          } else {
            formPayload.append(key, formData[key]);
          }
        }
      });
  
      let result;
      if (selectedTour) {
        result = await tourService.updateTour(selectedTour._id, formPayload);
        setTours(tours.map(tour => 
          tour._id === selectedTour._id ? result : tour
        ));
      } else {
        // Create new tour
        result = await tourService.createTour(formPayload);
        setTours([...tours, result]);
      }
  
      // Reset form and state
      setFormData(initialFormState);
      setIsCreatingTour(false);
      setSelectedTour(null);
      setIsViewMode(false);
    } catch (error) {
      console.error('Error saving tour:', error);
      setError('Failed to save tour');
    }
  };
  
  // Render loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b bg-gradient-to-r from-white to-gray-50">
          <h2 className="text-lg font-semibold">Tours Management</h2>
        </div>
        <div className="p-4 flex justify-center items-center h-96">
          <p className="text-gray-500">Loading tours...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b bg-gradient-to-r from-white to-gray-50">
          <h2 className="text-lg font-semibold">Tours Management</h2>
        </div>
        <div className="p-4 flex justify-center items-center h-96">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

      {/* Mobile Header with Hamburger Menu */}
      {isMobile && (
        <div className="bg-gradient-to-r from-blue-100 via-white to-blue-100 p-4 
                        flex justify-between items-center border-b border-blue-100">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Landmark className="mr-3 text-blue-600" size={20} />
            Tours Management
          </h2>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg"
          >
            <Menu size={24} />
          </button>
        </div>
      )}

      {/* Mobile Slide-out Menu */}
      {isMobile && isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="bg-gradient-to-r from-blue-100 via-white to-blue-100 p-4 
                          flex justify-between items-center border-b border-blue-100">
            <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-red-500 hover:bg-red-100 p-2 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-4 space-y-4">
            <button 
              onClick={() => {
                setIsCreatingTour(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-blue-600 text-white px-5 py-3 rounded-lg 
              hover:bg-blue-700 transition-all duration-300"
            >
              <Plus className="mr-2 inline" size={20} /> Create New Tour
            </button>
          </div>
        </div>
      )}

      {isMobile && isCreatingTour && (
        <div className="bg-gradient-to-r from-blue-100 via-white to-blue-100 p-4 
                        flex justify-between items-center border-b border-blue-100">
          <button 
            onClick={cancelTourCreation}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="mr-2" size={20} /> Cancel
          </button>
          <h2 className="text-xl font-bold text-gray-800">
            {selectedTour ? 'Edit Tour' : 'Create New Tour'}
          </h2>
          <div></div> {/* Spacer to center the title */}
        </div>
      )}

      {/* Desktop/Tablet Header */}
      {!isMobile && (
        <div className="bg-gradient-to-r from-blue-100 via-white to-blue-100 p-6 
                        flex justify-between items-center border-b border-blue-100">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Landmark className="mr-3 text-blue-600" size={24} />
            Tours Management
          </h2>
          {!isCreatingTour ? (
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
              onClick={cancelTourCreation}
              className="group flex items-center bg-red-500 text-white px-5 py-2.5 rounded-lg 
              hover:bg-red-600 transition-all duration-300 ease-in-out 
              transform hover:-translate-y-1 hover:shadow-lg"
            >
              <X className="mr-2 group-hover:rotate-180 transition-transform" size={20} /> Cancel
            </button>
          )}
        </div>
      )}
      

      {/* Inline Tour Creation Form */}
      {isCreatingTour && (
        <div className="bg-gray-50 p-8">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Title Input */}
              <div className="relative">
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
              </div>
              {/* Country Input */}
              <div className="relative">
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

            <div className="grid md:grid-cols-3 gap-6">

              {/* City Input */}
              <div className="relative">
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
              </div>

              {/* Price Input */}
              <div className="relative">
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
              </div>

              {/* Duration Input */}
              <div className="relative">
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
            </div>

            {/* Highlights */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Tour Highlights</h3>
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="flex flex-col sm:flex-row mb-3 space-y-2 sm:space-y-0 sm:space-x-3">
                  <div className="relative w-full">
                    <input
                      type="text"
                      name="highlights"
                      value={highlight}
                      onChange={(e) => handleChange(e, index)}
                      placeholder="Tour Highlight"
                      className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                      transition duration-300"
                      required
                    />
                    {highlight.length > 30 && (
                      <button
                        type="button"
                        onClick={() => setShowFullText(!showFullText)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 
                        text-gray-500 hover:text-blue-600 transition-colors"
                        title="Show full text"
                      >
                        {showFullText ? '✖' : '👁'}
                      </button>
                    )}
                  </div>
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
                  {highlight.length > 30 && showFullText && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                        <button
                          onClick={() => setShowFullText(false)}
                          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                        >
                          ✖
                        </button>
                        <h4 className="text-lg font-semibold mb-4">Full Highlight</h4>
                        <p className="break-words text-gray-700">{highlight}</p>
                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={() => setShowFullText(false)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div> 
              ))}
              
              <button
                type="button"
                onClick={addHighlight}
                className="mt-2 w-full bg-blue-500 text-white px-4 py-2.5 rounded-lg 
                    hover:bg-blue-600 transition-colors"
              >
                Add Highlight
              </button>
            </div>

            {/* Photos Upload */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Tour Photos</h3>
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
              
              {/* Display Existing Photos */}
              {selectedTour && selectedTour.photos && selectedTour.photos.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-md font-semibold text-gray-700 mb-2">Existing Photos</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedTour.photos.map((photoUrl, index) => (
                      <div key={`existing-${index}`} className="relative group">
                        <img 
                          src={photoUrl} 
                          alt={`Existing Tour ${index + 1}`} 
                          className="w-44 h-48 object-cover rounded-lg shadow-md" 
                        />
                        <button 
                          type="button"
                          onClick={() => {
                            // Update the tour's photos by removing the specific photo
                            const updatedPhotos = selectedTour.photos.filter((_, i) => i !== index);
                            setSelectedTour(prev => ({ ...prev, photos: updatedPhotos }));
                            setFormData(prev => ({
                              ...prev,
                              photos: prev.photos || []
                            }));
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 
                          opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}


              {/* Display New Uploaded Photos */}
              {formData.photos && formData.photos.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-md font-semibold text-gray-700 mb-2">New Photos</h4>
                  <div className="flex flex-wrap gap-3">
                    {formData.photos.map((photo, index) => (
                      <div key={`new-${index}`} className="relative group">
                        <img 
                          src={URL.createObjectURL(photo)} 
                          alt={`New Tour ${index + 1}`} 
                          className="w-44 h-48 object-cover rounded-lg shadow-md" 
                        />
                        <button 
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              photos: prev.photos.filter((_, i) => i !== index)
                            }));
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 
                          opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                        <div className="bg-gray-100 p-2 rounded-lg text-xs break-words flex items-center justify-between mt-1 w-64">
                          <span className="font-semibold mr-2">URL:</span> 
                          <span className="flex-grow truncate">{photo.name}</span>
                          <button 
                            onClick={() => navigator.clipboard.writeText(photo.name)}
                            className="ml-2 text-blue-500 hover:text-blue-700"
                          >
                            <Copy size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="relative">
              <textarea
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                placeholder="Tour Description"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition duration-300"
                style={{ whiteSpace: 'pre-wrap' }}
                rows="6"
                required
              />
            </div>

            {/* Featured and Max Group Size */}
            <div className="grid md:grid-cols-2 gap-6">
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
              </div>
              {/* Max Group Size */}
              <div className="relative">
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
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white 
                px-8 py-3.5 rounded-lg text-lg font-semibold 
                hover:from-blue-700 hover:to-blue-900 
                transition-all duration-300 ease-in-out 
                transform hover:-translate-y-1 hover:shadow-xl"
              >
                {selectedTour ? 'Update Tour' : 'Create Tour'}
              </button>
            </div>
          </form>
        </div>
      )}  
      
      
      {/* Tours Table */}
      {tours.length === 0 ? (
        <div className="p-4 flex justify-center items-center h-96">
          <p className="text-gray-500">No tours found. Create your first tour!</p>
        </div>
      ) : (
        <div className="max-h-[600px] overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-4">ID</th>
                <th className="p-4">Title</th>
                <th className="p-4">Country</th>
                <th className="p-4">Price</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Featured</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map(tour => (
                <tr key={tour._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4">{tour._id}</td>
                  <td className="p-4 flex items-center">
                    {tour.featured && <Star className="text-yellow-500 mr-2" size={16} />}
                    <span>{tour.title}</span>
                  </td>
                  <td className="p-4">{tour.country}</td>
                  <td className="p-4">${tour.price}</td>
                  <td className="p-4">{tour.duration} days</td>
                  <td className="p-4">
                    {tour.featured ? (
                      <span className="text-green-500">Yes</span>
                    ) : (
                      <span className="text-gray-500">No</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewTour(tour)}
                        className="text-blue-500 hover:bg-blue-50 p-2 rounded-full"
                      >
                        <EyeIcon size={18} />
                      </button>
                      <button 
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
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {detailsTour && (
        <TourDetailsModal 
          tour={detailsTour} 
          onClose={() => setDetailsTour(null)} 
        />
      )}
    </div>
  );
};

export default ToursPanel;