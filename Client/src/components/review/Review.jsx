import React from 'react'
import "./Review.scss"
import { useQuery } from "@tanstack/react-query";
import newRequest from '../../utils/newRequest';

function Review({review}) {

  const {isLoading,error,data}=useQuery({
    queryKey:[review.userId],
    queryFn:()=> newRequest.get(`/users/${review.userId}`).then(res=>{
      return res.data;
    })
  })
  return (
    <div className="review">
      {isLoading?"Loading..":error?"Something went wrong!":
              <div className="user">
                <img
                  className="pp"
                  src={data.img||"/img/noavatar.jpg"}
                  alt=""
                  />
                <div className="info">
                  <span>{data.username}</span>
                  <div className="country">
                    <span>{data.country}</span>
                  </div>
                </div>
              </div>
        }
              <div className="stars">
                {Array(review.star).fill().map((item,i)=>(
                  <img key={i} src="/img/star.png" alt="" />
                  ))}
              
                <span>{review.star}</span>
              </div>
              <p>
                {review.desc}
              </p>
          
            </div>
  )
}

export default Review