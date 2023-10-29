import React from 'react'
import './Featured.scss'

function Featured() {
  return (
    <div className='featured'>
        <div className="container">
            <div className="left">
                <h1>Find the perfect <span style={{fontStyle:"italic",fontWeight:"400"}}>freelance</span> services for your business</h1>
                <div className="search">
                    <div className="searchInput">
                        <img src="./img/search.png" alt="" />
                        <input type="text" placeholder='Try "building mobile app"' />
                    </div>
                    <button>Search</button>
                </div>
                <div className="popular">
                    <span>Popular:</span>
                    <button>Web Design</button>
                    <button>Wordpress</button>
                    <button>Logo Design</button>
                    <button>Poster Design</button>
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