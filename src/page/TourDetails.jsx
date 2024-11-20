import React, { useState, useRef } from 'react'
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { MapPin, Users, Star, Clock, DollarSign, Heart, CheckCircle, Menu, X } from 'lucide-react';
import { useParams } from 'react-router-dom';
import tourData from '../data/tourData';
import ImageCarousel from '../ui/ImageCarousel/ImageCarousel';
import calculateAvgRating from '../utils/avgRating';
import '../styles/tour-details.css'
import CommentSection from '../ui/Comment/CommentSection';
import Booking from '../Booking/Booking';
const TourDetails = () => {
  const {id} = useParams();

  const tour = tourData.find(tour => tour.id === id); //This is static data will be use with mongoDB later, this is concept

  const{photo, photos, title, desc, price, reviews, city, maxGroupSize, duration, highlights} = tour;
  const{totalRating, avgRating} = calculateAvgRating(reviews);
  const [isLiked, setIsLiked] = useState(false);
  const [showBooking, setShowBooking] = useState(false);


  //This is for mobile
  const BookingPanel = () => {
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${showBooking ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-xl p-6 transition-transform transform ${showBooking ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Book Tour</h3>
          <button onClick={() => setShowBooking(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

    </div>
  }
  return (
    <>
      <section>
        <Row>
          <Col lg='8'>
            <div className="max-w-7xl mx-auto px-4 py-4 md:py-8 mt-4">
              <div className="relative mb-6 md:mb-8 rounded-xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 mt-5">
                  <ImageCarousel images={photos} autoSlideInterval={2000} />
                </div>
                <button
                onClick={() => setIsLiked(!isLiked)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg mt-5"
                >
                  <Heart 
                  className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
                  />
                  </button>
                </div>
                {/* Content Grid */}
                <div className="gap-6 md:gap-8">
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
                            : <span className="text-sm text-gray-500"> ({reviews.length})</span>}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">{desc}</p>

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
                  {reviews && <CommentSection tourId={id}/>}
                </div>
              </div>
            </div>  
          </Col>

          <Col lg='4'>
            <div className="booking-wrapper">
              <Booking tour={tour} avgRating={avgRating} />
            </div>
          </Col>
        </Row>
      </section>
    </>
  )
}

export default TourDetails