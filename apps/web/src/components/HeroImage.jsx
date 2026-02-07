import React from 'react';

const HeroImage = ({ className, ...props }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`} {...props}>
      <img 
        src="https://images.unsplash.com/photo-1534882406436-6b6b0152efae" 
        alt="Artisanal homemade chips with herbs" 
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroImage;