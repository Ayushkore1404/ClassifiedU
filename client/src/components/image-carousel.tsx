import { useState, useEffect } from "react";

interface ImageCarouselProps {
  className?: string;
}

const carouselImages = [
  {
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    alt: "Students studying together in library"
  },
  {
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    alt: "University campus with students walking"
  },
  {
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    alt: "Students collaborating on laptops"
  },
  {
    url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    alt: "Modern university classroom"
  },
  {
    url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    alt: "Students in university dormitory"
  },
  {
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    alt: "University students with books and backpacks"
  }
];

export default function ImageCarousel({ className = "" }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Auto-slide every 4 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Preload first image
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = carouselImages[0].url;
  }, []);

  return (
    <div className={`relative overflow-hidden rounded-3xl shadow-strong group ${className}`}>
      {/* Image Container */}
      <div className="relative h-48 w-full">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/60 via-transparent to-transparent"></div>
          </div>
        ))}
        
        {/* Overlay Content */}
        <div className="absolute bottom-4 left-4 text-white z-10">
          <p className="font-semibold text-sm opacity-90">Join 50,000+ Students</p>
          <p className="text-xs opacity-75">Already using ClassifiedU</p>
        </div>

        {/* Loading State */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-3xl"></div>
        )}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 right-4 flex space-x-1">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white shadow-md"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Hover Pause Indicator */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-black/20 backdrop-blur-sm rounded-full p-1">
          <div className="w-2 h-2 bg-white/80 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
