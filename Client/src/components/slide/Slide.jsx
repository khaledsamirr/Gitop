import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "./Slide.scss"
import ProjectCard from '../project-card/ProjectCard';
import Card from '../card/Card';
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination} from 'swiper/modules';

function Slide({cards,isProject}) {
  return (
    <div className='slide'>
        <div className="container">
        <Swiper
          breakpoints={{
          0:{
            width:220,
            slidesPerView:1,
          },
          480: {
            width: 300,
            slidesPerView: 1,
          },
          960: {
            width: 600,
            slidesPerView: 2,
            spaceBetween:2
          },
         }}
          direction='horizontal'
          
          modules={[Pagination]}
          pagination={{ clickable: true ,}}
      
          loop={true}
          slidesPerView={1}
       >{
        cards?.map(card=>(
          <div key={card.id} className="swiperCard">
              <SwiperSlide>{!isProject?<Card item={card}/>:<ProjectCard item={card}/>}</SwiperSlide>
          </div>
        ))
       }
    </Swiper>
        </div>
    </div>
  )
}

export default Slide