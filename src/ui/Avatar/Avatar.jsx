// src/components/ui/Avatar.jsx
import React from 'react';

// Avatar component for displaying a user's avatar
export const Avatar = ({ src, fallback, className = '' }) => (
  <div className={`w-8 h-8 rounded-full overflow-hidden bg-gray-200 ${className}`}>
    {src ? (
      <img src={src} alt={fallback} className="w-full h-full object-cover" />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white">
        {fallback}
      </div>
    )}
  </div>
);

// AvatarImage component for showing the actual image
export const AvatarImage = ({ src, alt = 'User Avatar' }) => (
  <img src={src} alt={alt} className="w-full h-full object-cover" />
);

// AvatarFallback component for showing fallback text (initials or placeholder)
export const AvatarFallback = ({ children, className = '' }) => (
  <span className={`text-white font-semibold text-lg ${className}`}>{children}</span>
);
