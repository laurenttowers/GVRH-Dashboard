
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-surface border border-surface-border shadow-card rounded-2xl p-6 transition-all duration-200 ease-in-out hover:shadow-card-hover ${className}`}>
      {children}
    </div>
  );
};

export default Card;
