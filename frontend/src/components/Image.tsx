import { useState, type ImgHTMLAttributes } from 'react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  alt: string;
  wrapperClassName?: string; // class untuk div wrapper (posisi, ukuran)
}

export default function Image({ src, alt, className, wrapperClassName, fallbackSrc, ...props }: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={wrapperClassName ?? `relative overflow-hidden ${className || ''}`}>
      {/* Skeleton Loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md"></div>
      )}

      <img
        src={hasError && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        loading="lazy"
        className={wrapperClassName
          ? `w-full h-full object-cover transition-opacity duration-300 ${className || ''} ${isLoaded ? 'opacity-100' : 'opacity-0'}`
          : `w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`
        }
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        {...props}
      />
    </div>
  );
}
