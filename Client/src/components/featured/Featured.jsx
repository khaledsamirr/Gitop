import React, { useState } from 'react'
import './Featured.scss'
import {Link, useNavigate } from 'react-router-dom'

function Featured() {
    const [input,setInput]=useState("")
    const navigate=useNavigate();

    const handleSearch=()=>{
        navigate(`/gigs?search=${input}`)
    }
    const handleFeature=(search)=>{
        navigate(`/gigs?search=${search}`)
    }
  return (
    <div className='featured'>
        <div className="container">
            <div className="left">
                <h1>Find the perfect <span style={{fontStyle:"italic",fontWeight:"400"}}>freelance</span> services for your business</h1>
                <div className="search">
                    <div className="searchInput">
                        <img src="./img/search.png" alt="" />
                        <input type="text" placeholder='Try "building mobile app"' onChange={e=>setInput(e.target.value)}/>
                    </div>
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div className="popular">
                    <span>Popular:</span>
                    <Link to="/gigs?category=writing"><button  >Translation</button></Link>
                    <Link to="/gigs?category=programming"><button >Wordpress</button></Link>
                    <Link to="/gigs?category=design"><button >Logo Design</button></Link>
                    <Link to="/gigs?category=marketing"><button >Digital Marketing</button></Link>
                </div>
            </div>
            <div className="right">
                <img src="./img/featured.png" alt="" />

            </div>
        </div>

    </div>
  )
}

export default Featured