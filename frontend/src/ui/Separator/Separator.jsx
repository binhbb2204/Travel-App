// src/components/ui/Separator.jsx
import React from 'react';

// Separator component for rendering a horizontal or vertical line
export const Separator = ({ orientation = 'horizontal', className = '' }) => (
  <div 
    className={`${orientation === 'vertical' ? 'h-full w-px' : 'h-px w-full'} ${className}`}
  />
);