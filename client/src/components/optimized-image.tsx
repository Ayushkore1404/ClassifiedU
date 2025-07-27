import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  placeholder?: string;
}

export default function OptimizedImage({ 
  src, 
  alt, 
  className = "", 
  loading = "lazy",
  placeholder = "bg-gray-200 dark:bg-gray-700"
}: OptimizedImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className={`${className} ${placeholder} flex items-center justify-center`}>
        <span className="text-gray-400 text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {!imageLoaded && (
        <div className={`absolute inset-0 ${placeholder} animate-pulse`}></div>
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={`${className} ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
    </div>
  );
}