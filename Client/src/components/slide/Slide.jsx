import React from 'react'
import Carousel from "react-multi-carousel";
import "./slide.scss"

import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    slidesToSlide:5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1400 },
    items: 5,
    slidesToSlide:5,
  },
  tablet: {
    breakpoint: { max: 1400, min: 480 },
    items: 3,
    slidesToSlide:3,
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    slidesToSlide:1,
    items: 1
  }
};

function Slide({children}) {
  return (
    <div className='slide'>
        <div className="container">
            <Carousel itemClass="carousel-container" partialVisbile={false} responsive={responsive}  infinite={true}>
                {children}
            </Carousel>
        </div>
    </div>
  )
}

export default Slide