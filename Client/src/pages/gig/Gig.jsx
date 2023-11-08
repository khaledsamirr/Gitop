import React from "react";
import "./Gig.scss";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination} from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";


function Gig() {

  const {id}=useParams();

  const {isLoading,error,data}=useQuery({
    queryKey:['gig'],
    queryFn:()=> newRequest.get(`/gigs/${id}`).then(res=>{
      return res.data;
    })
  })

  const userId= data?.userId;

  const {isLoading:isLoadingUser,error:errorUser,data:dataUser}=useQuery({
    queryKey:['user'],
    queryFn:()=> newRequest.get(`/users/${userId}`).then(res=>{
      return res.data;
    }),
    enabled: !!userId
  })
  return (
    <div className="gig">
     {isLoading? "Loading..":error?"Something went wrong!":
      <div className="container">
        <div className="left">
          <span className="breadcrumbs">{"Gitop > Graphics & Design >"}</span>
          <h1>{data.title}</h1>
          {isLoadingUser?"Loading..":error?"Something went wrong!":(
            <div className="user">
            <img
              className="pp"
              src={dataUser?.img||"/img/noavatar.jpg"}
              alt=""
            />
            <span>{dataUser?.username}</span>
            {!isNaN (data.totalStars/data.starNumber)&&
                (
                <div className="stars">
                  {Array(Math.round(data.totalStars/data.starNumber)).fill().map((item,i)=>(
                      <img key={i} src="/img/star.png" alt="" />
                  ))}
                  
                  <span>{!isNaN(data.totalStars/data.starNumber)?Math.round(data.totalStars/data.starNumber):0}</span>
                </div>)}
          </div>)}
          <Swiper
              breakpoints={{

              1:{
                width:100,
                slidesPerView:1

              },
              // when window width is >= 640px
              480: {
                width: 480,
                slidesPerView: 1,
              },
              // when window width is >= 768px
              960: {
                width: 960,
                slidesPerView: 1,
              },
              1200:{
                width:900,
                slidesPerView:1,
                spaceBetween:10
              }
            }}
              direction='horizontal'
              
              modules={[Pagination]}
              pagination={{ clickable: true ,}}
            
              loop={true}
              slidesPerView={1}
          >
          {
            data?.images?.map(card=>(
              <div key={card.id} className="swiperCard">
                  <SwiperSlide> <img
                    src={card}
                    alt=""
                    /></SwiperSlide>
              </div>
            ))
          }
        </Swiper>
          
          <h2>About This Gig</h2>
          <p>
            {data.desc}
          </p>
          <div className="seller">
            <h2>About The Seller</h2>
            {isLoadingUser?"Loading..":errorUser?"Something went wrong!":(

              <div className="user">
              <img
                src={dataUser?.img||"/img/noavatar.jpg"}
                alt=""
                />
              <div className="info">
                <span>{dataUser?.username}</span>
                {!isNaN (data.totalStars/data.starNumber)&&
                (
                  <div className="stars">
                  {Array(Math.round(data.totalStars/data.starNumber)).fill().map((item,i)=>(
                    <img key={i} src="/img/star.png" alt="" />
                    ))}
                  <span>{!isNaN(data.totalStars/data.starNumber)?Math.round(data.totalStars/data.starNumber):0}</span>
                </div>)}
               
              </div>
            </div>
            )}
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">{dataUser?.country}</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">Aug 2022</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>
                {dataUser?.desc}
              </p>
            </div>
          </div>
          <Reviews gigId={id}/>
          </div>
          
        <div className="right">
          <div className="price">
            <h3>{data.shortTitle}</h3>
            <h2>${data.price}</h2>
          </div>
          <p>
              {data.shortDesc}
          </p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>{data.deliveryTime} Days Delivery</span>
            </div>
            <div className="item">
              <img src="/img/recycle.png" alt="" />
              <span>{data.revisionNumber} Revisions</span>
            </div>
          </div>
          <div className="features">
           {data.features.map(feature=>(
             <div className="item" key={feature}>
             <img src="/img/greencheck.png" alt="" />
             <span>{feature}</span>
           </div>
           ))}
          </div>
          <Link to={`/pay/${id}`}>
          <button>Continue</button>
          </Link>
        </div>
      </div>}
    </div>
  );
}

export default Gig;