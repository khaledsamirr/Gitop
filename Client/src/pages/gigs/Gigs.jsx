import React, { useState } from 'react'
import "./Gigs.scss"
import { gigs } from '../../../data';
import GigCard from '../../components/gig-card/GigCard'

function Gigs() {

  const [open, setOpen]=useState(false);
  const [sort, setSort]=useState("sales");

  const resort=(type)=>{
    setSort(type)
    setOpen(false)
  }
  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">
          {`GITOP > GRAPHICS & DESIGN >`}
        </span>
        <h1>AI Artists</h1>
        <p>Explore the boundries of art and technology with Gitop's AI artists</p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input type="text" placeholder='min' />
            <input type="text" placeholder='max' />
            <button>Apply</button>
          </div>
          <div className="right">
            <span className='sortBy'>SortBy</span>
            <div className='sortTypeContainer' onClick={()=>setOpen(!open)} >
              <span className='sortType'>{sort==="sales"?"Best Selling":"Newest"}</span>
              <img src="./img/down.png"alt="" />
            </div>
            {
              open && (
                <div className="rightMenu">
                  {
                    sort==="sales"? (
                      <span onClick={()=>resort("createdAt")}>Newest</span>):(
                      <span onClick={()=>resort("sales")}>Best Selling</span>)
                  }
              </div>
              )
            }
          </div>
        </div>
        <div className="cards">
          {gigs.map(gig=>(
            <GigCard key={gig.id} item={gig}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Gigs