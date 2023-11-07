import React from 'react'
import "./Card.scss"
import { Link } from 'react-router-dom'

function Card({item}) {
  return (
    <Link to={`/gigs?category=${item?.category}`}>
        <div className='card'>
            <div className="container">
                <img src={item?.img} alt="" />
                <span className='desc'>{item?.desc}</span>
                <span className='title'>{item?.title}</span>
            </div>
        </div>
    </Link>
  )
}

export default Card