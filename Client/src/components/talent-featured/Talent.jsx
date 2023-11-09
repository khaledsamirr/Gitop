import React from 'react'
import "./Talent.scss"

function Talent() {
  return (
    <div className="talent">
    <div className="container">
      <div className="item">
        <h1>A whole world of freelance talent at your fingertips</h1>
        <div className="title">
          <img src="./img/check.png" alt="" />
          The best for every budget
        </div>
         <p> Find high-quality services at every price, No hourly rates, just project-pased pricing.</p>

         <div className="title">
          <img src="./img/check.png" alt="" />
          Fixed Price Jobs
        </div>
         <p> you're getting paid a fixed price for the entire gig regardless of how many hours it takes to complete the job.</p>

         <div className="title">
          <img src="./img/check.png" alt="" />
          Gitop Showcase
        </div>
         <p>  Employers can easily and quickly find the best suitable freelancers according to their project's requirements.</p>

         <div className="title">
          <img src="./img/check.png" alt="" />
          Zero fees
        </div>
         <p> For freelancers and clients "Zero Fees" benefit help both sides with no additional fees on the project price.</p>
      </div>
      <div className="item">
          <video src="./img/video.mp4" controls/>
      </div>

    </div>
  </div>

  )
}

export default Talent