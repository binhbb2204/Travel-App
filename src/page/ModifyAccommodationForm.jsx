import React, { useState, useEffect } from 'react';
import { Plus, ImagePlus, MapPin, Globe, Calendar, Users, DollarSign, Star } from 'lucide-react';
import axios from 'axios'; 
import { useNavigate, useParams } from 'react-router-dom'; 

const  ModifyAccommodationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // For edit mode
  const isEditMode = !!id;
  const [formData, setFormData] = useState({
    title: '',
    country: '',
    city: '',
    photos: [],
    price: '',
    type: '',
    totalCapacity: '',
    description: '',
    featured: false,
    highlights: ['']
  });

  useEffect(() => {
    const fetchAccommodationForEdit = async () => {
      if (isEditMode) {
        try {
          const response = await axios.get(`/api/v1/accommodations/${id}`);
          const accoData = response.data.data;
          
          setFormData({
            title: accoData.title,
            country: accoData.country,
            city: accoData.city,
            photos: accoData.photos || [],
            price: accoData.price.toString(),
            maxGroupSize: accoData.maxGroupSize.toString(),
            description: accoData.description,
            featured: accoData.featured || false,
            highlights: accoData.highlights || ['']
          });
        } catch (error) {
          console.error('Error fetching accommodation:', error);
        }
      }
    };

    fetchAccommodationForEdit();
  }, [id, isEditMode]);

  const handleChange = (e, index = null) => {
    const { name, value, files } = e.target;

    if (name === 'photos') {
      const photoFiles = Array.from(files).map(file => {
        // If it's an edit mode and file is already a URL, return it
        if (typeof file === 'string') return file;
        return URL.createObjectURL(file);
      });
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...photoFiles]
      }));
    } else if (name === 'highlights') {
      const newHighlights = [...formData.highlights];
      newHighlights[index] = value;
      setFormData(prev => ({
        ...prev,
        highlights: newHighlights
      }));
    } else if (name === 'price' || name === 'duration' || name === 'maxGroupSize') {
      // Ensure numeric fields are handled correctly
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? '' : Number(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, '']
    }));
  };

  const removeHighlight = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, index) => index !== indexToRemove)
    }));
  };

  const removePhoto = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const submissionData = { ...formData };

      if (isEditMode) {
        const response = await axios.put(`/api/accommodations/${id}`, submissionData);
        console.log('Accommodation updated:', response.data);
        navigate(`/accommodations/${id}`); 
      } else {
        // Create new accommodation
        const response = await axios.post('/api/accommodation', submissionData);
        console.log('Accommodation created:', response.data);
        navigate('/accommodations'); // Redirect to accommodations list
      }
    } catch (error) {
      console.error('Error submitting accommodation:', error);
      // Optional: show error message to user
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-2xl mt-20">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
            Create New Accommodation
          </h2>
          <p className="text-gray-600 mt-2">Craft an unforgettable journey</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Accommodation Title */}
          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
              <Globe className="mr-2 text-blue-500" size={20} />
              Accommodation Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              placeholder="Magical Mountain Expedition"
              required
            />
          </div>

          {/* Country */}
          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
              <MapPin className="mr-2 text-green-500" size={20} />
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
              placeholder="Nepal"
              required
            />
          </div>
        </div>

        {/* City */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
              <MapPin className="mr-2 text-red-500" size={20} />
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
              placeholder="Kathmandu"
              required
            />
          </div>
          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
                <MapPin className="mr-2 text-red-500" size={20} />
                Type
            </label>
            <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
                required
            >
                <option value="" disabled>
                Select a type
                </option>
                <option value="hotel">Hotel</option>
                <option value="motel">Motel</option>
                <option value="hostel">Hostel</option>
                <option value="resort">Resort</option>
            </select>
            </div>
        </div>


        {/* Photos Upload */}
        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
            <ImagePlus className="mr-2 text-blue-600" size={20} />
            Accommodation Photos
          </label>
          <div className="flex flex-wrap gap-4">
            <label className="cursor-pointer">
              <input
                type="file"
                name="photos"
                multiple
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
              <div className="w-32 h-32 border-2 border-dashed border-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-100 transition">
                <Plus className="text-blue-600" size={40} />
              </div>
            </label>
            {formData.photos.map((photo, index) => (
              <div key={index} className="relative">
                <img 
                  src={photo} 
                  alt={`Accommodation ${index + 1}`} 
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <button 
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Price, Duration, Group Size */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
              <DollarSign className="mr-2 text-green-600" size={20} />
              Price (USD)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
              placeholder="500"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
              <Calendar className="mr-2 text-blue-600" size={20} />
              Duration (Days)
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              placeholder="7"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
              <Users className="mr-2 text-purple-600" size={20} />
              Total Capacity
            </label>
            <input
              type="number"
              name="maxGroupSize"
              value={formData.maxGroupSize}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
              placeholder="12"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Accommodation Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
            placeholder="Describe your incredible accommodation experience..."
            required
          ></textarea>
        </div>

        {/* Highlights */}
        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
            <Star className="mr-2 text-yellow-500" size={20} />
            Accommodation Highlights
          </label>
          {formData.highlights.map((highlight, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                name="highlights"
                value={highlight}
                onChange={(e) => handleChange(e, index)}
                className="flex-grow px-4 py-2 border-2 border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
                placeholder="Amazing mountain views"
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeHighlight(index)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                >
                  X
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addHighlight}
            className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <Plus className="mr-1" size={16} /> Add Highlight
          </button>
        </div>

        {/* Featured Toggle */}
        <div className="mt-6 flex items-center">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              featured: e.target.checked
            }))}
            className="mr-2 text-blue-600 focus:ring-blue-500 h-4 w-4"
          />
          <label className="text-sm text-gray-700">
            Mark as Featured Accommodation
          </label>
        </div>

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full hover:from-blue-700 hover:to-blue-800 transition transform hover:scale-105 shadow-lg"
          >
            Create Accommodation
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModifyAccommodationForm;