import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = ({ images, autoSlideInterval = 2000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const slideContainerRef = useRef(null);

  const minSwipeDistance = 50;

  useEffect(() => {
    let timer;
    if (!isPaused) {
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, autoSlideInterval);
    }

    return () => clearInterval(timer);
  }, [images.length, autoSlideInterval, isPaused]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const onTouchStart = (e) => {
    setIsPaused(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
    setTimeout(() => setIsPaused(false), 1000);
  };

  return (
    <div className="relative w-full h-[250px] md:h-[400px] rounded-xl overflow-hidden group">
      <div 
        className="w-full h-full"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Tour image ${index + 1}`}
            className={`absolute w-full h-[250px] md:h-[400px] object-cover transition-transform duration-300 ease-out ${
              index === currentIndex 
                ? 'translate-x-0' 
                : index < currentIndex 
                  ? '-translate-x-full' 
                  : 'translate-x-full'
            }`}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>

      {/* Navigation Arrows - Always visible on hover */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg transition-opacity duration-300 hover:bg-white"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg transition-opacity duration-300 hover:bg-white"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Image counter for mobile */}
      <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-sm md:hidden">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white w-6 md:w-4' 
                : 'bg-white/50'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;