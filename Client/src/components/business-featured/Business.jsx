import React from 'react'
import "./Business.scss"

function Business() {
  return (
    <div className="business">
    <div className="container">
      <div className="left">
          <h1>Gitop <span style={{fontWeight:"500", fontStyle:"italic"}}>business</span></h1> 
          <h1>A business solution designed for teams</h1>
          <p>
            Upgrade to a curated experience packed with tools and benefits, dedicated to businesses
          </p> 
          <div className="title">
            <img src="./img/check.png" alt="" />
            Connect to freelancers with proven business experience
          </div>
          <div className="title">
            <img src="./img/check.png" alt="" />
            Get matched with the perfect talent by a customer success manager
          </div>
          <div className="title">
            <img src="./img/check.png" alt="" />
            Manage teamwork and boost productivity with one powerful workspace
          </div>
          <button>Explore Gitop Business</button>
      </div>
      <div className="right">
          <img src="./img/manager.png" alt=""/>
      </div>

    </div>
  </div>
  )
}

export default Business