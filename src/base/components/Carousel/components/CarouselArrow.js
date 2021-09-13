import React from 'react';

export default function CarouselArrow(props) {
  const { className, onClick, arrowIcon } = props;
  return (
    <div
      className={className}
      onClick={onClick}
    >
      <img src={arrowIcon} alt="" className="slick-arrow-icon" />
    </div>
  );
}
