import React, { useState, useRef, useEffect } from 'react'
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { MapPin, Users, Star, Clock, DollarSign, Heart, CheckCircle, Menu, X } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useFavorites } from '../ui/Context/FavoritesContext';
import { accommodationCommentService } from '../data/Service/accommodationCommentService';
// import accommodationData from '../data/accommodationData';
import ImageCarousel from '../ui/ImageCarousel/ImageCarousel';
import calculateAvgRating from '../utils/avgRating';
import '../styles/accommodation-details.css'
import CommentSection from '../ui/Comment/CommentSection';
import AccommodationBooking from '../Booking/AccommodationBooking';
import ChristmasParallaxBackground from '../ui/ChristmasParallaxBackground';
import axios from 'axios';
import { accommodationService } from '../data/Service/accommodationService';
const AccommodationDetails = () => {
  const {id} = useParams();
  const [acco, setAcco] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const acco = accommodationData.find(acco => acco.id === id);
  useEffect(() => {
    const fetchAccommodationDetail = async() => {
      try{
        const accoData = await accommodationService.getSingleAccommodation(id);
        setAcco(accoData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchAccommodationDetail();
  }, [id]);

  const{photos, title, desc, reviews, city, highlights, totalCapacity} = acco || {};
  const validReviews = reviews || [];
  const{totalRating, avgRating} = calculateAvgRating(reviews);
  const ratedReviews = validReviews.filter(review => review.rating !== null && review.rating > 0);

  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const isLiked = isFavorite(id, 'accommodation');
  const [showBooking, setShowBooking] = useState(false);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading accommodation details...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>Error loading accommodation details: {error.message}</p>
      </div>
    );
  }

  // No acco found
  if (!acco) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No accommodation found</p>
      </div>
    );
  }

  
  const handleFavoriteClick = () => {
    if (isLiked) {
      removeFromFavorites(id, 'accommodation');
    } else {
      addToFavorites(acco);
    }
  };

  return (
    <>
      <ChristmasParallaxBackground/>
      <section className='page-section relative z-10' style={{ marginBottom: "1rem" }}>
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
                      <h1 className="ext-2xl md:text-3xl font-bold mb-4">{title}</h1>

                      <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3 md:gap-4 mb-6">
                        <div className="flex items-center gap-2"> 
                          <MapPin className="w-5 h-5 text-blue-500" />
                          <span className="text-sm md:text-base">{city}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-blue-500" />
                          <span className="text-sm md:text-base">Available for {totalCapacity} people</span>
                        </div>

                        {/* <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-blue-500" />
                          <span className="text-sm md:text-base">{duration} Days</span>
                        </div> */}

                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-yellow-500" />
                          <span className="text-sm md:text-base"> 
                            {avgRating === 0 ? null : avgRating}
                            {totalRating === 0 || ratedReviews.length === 0 ? 
                            'Not Rated' 
                            : <span className="text-sm text-gray-500"> ({ratedReviews.length})</span>}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">{desc}</p>

                      {/* Highlight Section */}
                      <div className="space-y-4">
                        <h2 className="text-lg md:text-xl font-bold">Accommodation Highlights</h2>
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
                  {reviews && <CommentSection accoId={id} commentService={accommodationCommentService} availableUsers={['user', 'admin']}/>}
                </div>
              </div>
            </div>  
          </Col>

          <Col lg='4'>
            <div className="booking-wrapper mt-30">
              <AccommodationBooking acco={acco} accoId={id} avgRating={avgRating} />
            </div>
          </Col>
        </Row>
      </section>
    </>
  )
}

export default AccommodationDetails