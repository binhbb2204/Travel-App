// src/components/ui/Avatar.jsx
import React from 'react';

// Avatar component for displaying a user's avatar
export const Avatar = ({ children, className = '' }) => (
  <div className={`flex items-center justify-center rounded-full overflow-hidden ${className}`}>
    {children}
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
