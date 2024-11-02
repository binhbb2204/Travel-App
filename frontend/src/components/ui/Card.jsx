// src/components/ui/Card.js
import React from 'react';

export const Card = ({ children, className }) => (
  <div className={`rounded-lg shadow-lg ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className }) => (
  <div className={className}>
    {children}
  </div>
);

export const CardHeader = ({ children }) => (
  <div className="p-4 border-b border-gray-200">
    {children}
  </div>
);

export const CardTitle = ({ children }) => (
  <h2 className="text-lg font-semibold">{children}</h2>
);
