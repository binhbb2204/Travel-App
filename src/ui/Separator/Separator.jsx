// src/components/ui/Separator.jsx
import React from 'react';

// Separator component for rendering a horizontal or vertical line
export const Separator = ({ orientation = 'horizontal', className = '' }) => {
  const styles = orientation === 'vertical' ? 'border-l' : 'border-b';
  return <div className={`${styles} ${className} border-gray-300`} />;
};
