import React, { useState } from 'react';
import { MapPin, Upload, X, Plus, Minus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card/Card';
const AddTourForm = ({ onSubmit }) => {
  const [tourData, setTourData] = useState({
    title: '',
    desc: '',
    city: '',
    price: '',
    maxGroupSize: '',
    duration: '',
    highlights: [''],
    photos: []
  });

  const [previewUrls, setPreviewUrls] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTourData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...tourData.highlights];
    newHighlights[index] = value;
    setTourData(prev => ({
      ...prev,
      highlights: newHighlights
    }));
  };

  const addHighlight = () => {
    setTourData(prev => ({
      ...prev,
      highlights: [...prev.highlights, '']
    }));
  };

  const removeHighlight = (index) => {
    setTourData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    setTourData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files]
    }));
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    setTourData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(tourData).forEach(key => {
      if (key === 'photos') {
        tourData.photos.forEach(photo => {
          formData.append('photos', photo);
        });
      } else if (key === 'highlights') {
        formData.append('highlights', JSON.stringify(tourData.highlights));
      } else {
        formData.append(key, tourData[key]);
      }
    });
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16 lg:py-20">
      <Card className="max-w-6xl mx-auto">
        <CardHeader className="space-y-1 pb-6 lg:pb-8">
          <CardTitle className="text-2xl lg:text-4xl font-bold text-center">Add New Tour</CardTitle>
          <p className="text-gray-500 text-sm lg:text-lg text-center">Fill in the details to create a new tour package</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Two-column layout for PC */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Basic Information */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="form-group">
                    <label className="text-sm lg:text-base font-medium text-gray-700 mb-2 block">
                      Tour Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={tourData.title}
                      onChange={handleInputChange}
                      className="w-full p-3 lg:p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 text-base"
                      placeholder="Enter tour title"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-sm lg:text-base font-medium text-gray-700 mb-2 block">
                      Description
                    </label>
                    <textarea
                      name="desc"
                      value={tourData.desc}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full p-3 lg:p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 text-base"
                      placeholder="Describe your tour"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="text-sm lg:text-base font-medium text-gray-700 mb-2 block">
                        Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                        <input
                          type="number"
                          name="price"
                          value={tourData.price}
                          onChange={handleInputChange}
                          className="w-full pl-8 p-3 lg:p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 text-base"
                          placeholder="0.00"
                          min="0"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="text-sm lg:text-base font-medium text-gray-700 mb-2 block">
                        City
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="city"
                          value={tourData.city}
                          onChange={handleInputChange}
                          className="w-full pl-10 p-3 lg:p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 text-base"
                          placeholder="Location"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="text-sm lg:text-base font-medium text-gray-700 mb-2 block">
                        Max Group
                      </label>
                      <input
                        type="number"
                        name="maxGroupSize"
                        value={tourData.maxGroupSize}
                        onChange={handleInputChange}
                        className="w-full p-3 lg:p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 text-base"
                        placeholder="Size"
                        min="1"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="text-sm lg:text-base font-medium text-gray-700 mb-2 block">
                        Duration
                      </label>
                      <input
                        type="number"
                        name="duration"
                        value={tourData.duration}
                        onChange={handleInputChange}
                        className="w-full p-3 lg:p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 text-base"
                        placeholder="Days"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Highlights and Photos */}
              <div className="space-y-6">
                {/* Highlights Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm lg:text-base font-medium text-gray-700">
                      Tour Highlights
                    </label>
                    <button
                      type="button"
                      onClick={addHighlight}
                      className="flex items-center text-sm lg:text-base text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Highlight
                    </button>
                  </div>
                  <div className="space-y-3">
                    {tourData.highlights.map((highlight, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={highlight}
                          onChange={(e) => handleHighlightChange(index, e.target.value)}
                          className="flex-1 p-3 lg:p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 text-base"
                          placeholder="Enter tour highlight"
                          required
                        />
                        {tourData.highlights.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeHighlight(index)}
                            className="p-2 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Minus className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Photos Section */}
                <div className="space-y-4">
                  <label className="text-sm lg:text-base font-medium text-gray-700 block">
                    Tour Photos
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative aspect-square">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <Upload className="w-6 h-6 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-500 text-center px-2">Add Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full lg:w-1/3 bg-blue-600 text-white py-4 rounded-full hover:bg-blue-700 transition-all text-base lg:text-lg font-medium focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mx-auto block"
            >
              Create Tour
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTourForm;