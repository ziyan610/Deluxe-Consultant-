import React, { useState } from 'react';
import { Building2 } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackLabel,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A0D0C] via-[#062C21] to-[#111715] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(197,160,89,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(197,160,89,0.2) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        <Building2 className="mb-3 h-8 w-8 text-[#C5A059]" />
        <span className="font-serif text-sm tracking-wide text-[#F9FAF9]">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
};
