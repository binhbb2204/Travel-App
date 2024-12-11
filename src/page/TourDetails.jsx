import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { MapPin, Users, Star, Clock, DollarSign, Heart, CheckCircle, Menu, X } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useFavorites } from '../ui/Context/FavoritesContext';
import { tourService } from '../data/Service/tourService';
import { commentService } from '../data/Service/commentService';
import ImageCarousel from '../ui/ImageCarousel/ImageCarousel';
import calculateAvgRating from '../utils/avgRating';
import '../styles/tour-details.css';
import CommentSection from '../ui/Comment/CommentSection';
import Booking from '../Booking/Booking';
import ChristmasParallaxBackground from '../ui/ChristmasParallaxBackground';

const TourDetails = () => {
  const { id } = useParams();

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const tourData = await tourService.getSingleTour(id);
        setTour(tourData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchTourDetails();
  }, [id]);
  

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading tour details...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>Error loading tour details: {error.message}</p>
      </div>
    );
  }

  // No tour found
  if (!tour) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No tour found</p>
      </div>
    );
  }

  const {
    photos,
    title,
    desc,
    city,
    maxGroupSize,
    duration,
    highlights,
    reviews
  } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);
  const isLiked = isFavorite(id ,'tour');
  const ratedReviews = reviews.filter(review => review.rating !== null && review.rating > 0);

  const handleFavoriteClick = () => {
    if (isLiked) {
      removeFromFavorites(id, 'tour');
    } else {
      addToFavorites(tour);
    }
  };

  return (
    <>
      <ChristmasParallaxBackground/>
      <section className='relative z-10' style={{ marginBottom: "1rem" }}>
        <Row>
          <Col lg='8'>
            <div className="max-w-7xl mx-auto px-4 py-4 md:py-8 mt-4">
              <div className="relative mb-6 md:mb-8 rounded-xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 mt-5">
                  <ImageCarousel images={photos} autoSlideInterval={5000} />
                </div>
                <button
                  onClick={handleFavoriteClick}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg mt-5"
                >
                  <Heart 
                    className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
                  />
                </button>
              </div>
              {/* Content Grid */}
              
              <div className="gap-6 md:gap-8 relative">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
                    <h1 className="text-2xl md:text-3xl font-bold mb-4">{title}</h1>

                    <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3 md:gap-4 mb-6">
                      <div className="flex items-center gap-2"> 
                        <MapPin className="w-5 h-5 text-blue-500" />
                        <span className="text-sm md:text-base">{city}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-500" />
                        <span className="text-sm md:text-base">Max {maxGroupSize} people</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-500" />
                        <span className="text-sm md:text-base">{duration} Days</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm md:text-base"> 
                          {avgRating === 0 ? null : avgRating}
                          {totalRating === 0 ? 
                          'Not Rated' 
                          : <span className="text-sm text-gray-500"> ({ratedReviews.length})</span>}
                        </span>
                      </div>
                    </div>
                    <p 
                    className="text-gray-600 text-sm md:text-base leading-relaxed mb-6" 
                    style={{ whiteSpace: 'pre-wrap' }}
                    >
                      {desc}
                    </p>

                    {/* Highlight Section */}
                    <div className="space-y-4">
                      <h2 className="text-lg md:text-xl font-bold">Tour Highlights</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {highlights.map((highlight, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-sm md:text-base">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Reviews Preview */}
                  {reviews && <CommentSection tourId={id} commentService={commentService} availableUsers={['user', 'admin']}/>}
                </div>
              </div>
            </div>  
          </Col>

          <Col lg='4'>
            <div className="booking-wrapper">
              <Booking tour={tour} tourId={id} avgRating={avgRating} />
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default TourDetails;