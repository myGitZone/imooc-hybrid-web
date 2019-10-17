import React from 'react';

const Slide = ({ children }) => {
  return (
    <div className="swiper-slide">
      {children}
    </div>
  );
};

export default Slide;
