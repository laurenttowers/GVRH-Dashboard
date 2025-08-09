
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-white border border-gray-200 shadow-md rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
