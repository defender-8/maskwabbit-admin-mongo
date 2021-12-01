import React from "react";
import SlickCarousel from "react-slick";

import CarouselArrow from "./components/CarouselArrow";

import arrowRightSvg from "../../../assets/images/icons/sl-right.svg";
import arrowLeftSvg from "../../../assets/images/icons/sl-left.svg";

import "./index.less";

function Carousel({ children, ...props }) {
  return (
    <SlickCarousel
      nextArrow={<CarouselArrow arrowIcon={arrowRightSvg} />}
      prevArrow={<CarouselArrow arrowIcon={arrowLeftSvg} />}
      {...props}
    >
      {children}
    </SlickCarousel>
  );
}

export default Carousel;
