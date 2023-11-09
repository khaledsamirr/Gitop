import React from 'react'
import './Footer.scss'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
              <h2>Categories</h2>
              <Link to="/gigs?category=design"><span>Graphics & Design</span></Link>
              <Link to="/gigs?category=marketing"><span>Digital Marketing</span></Link>
              <Link to="/gigs?category=writing"><span>Writing & Translation</span></Link>
              <Link to="/gigs?category=video"><span>Video & Animation</span></Link>
              <Link to="/gigs?category=music"><span>Music & Audio</span></Link>
              <Link to="/gigs?category=programming"><span>Programming & Tech</span></Link>
              <Link to="/gigs?category=AI"><span>AI Services</span></Link>
              <Link to="/gigs?category=business"><span>Business</span></Link>
              <Link to="/gigs?category=lifestyle"><span>Photography</span></Link>
            </div>
            <div className="item">
              <h2>About</h2>
              <span>Press & News</span>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Intellectual Property Claims</span>
              <span>Investor Relations</span>
              <span>Contact Sales</span>
            </div>
            <div className="item">
              <h2>Support</h2>
              <span>Help & Support</span>
              <span>Selling on Gitop</span>
              <span>Buying on Gitop</span>
            </div>
            <div className="item">
              <h2>Community</h2>
              <span>Customer Success Stories</span>
              <span>Community hub</span>
              <span>Forum</span>
              <span>Events</span>
              <span>Invite a Friend</span>
              <span>Become a Seller</span>
              <span>Community Standards</span>
            </div>
            <div className="item">
              <h2>More From Gitop</h2>
              <Link to="/business"><span>Gitop Business</span></Link>
              <span>Gitop Pro</span>
              <span>Gitop Guides</span>
              <span>Learn</span>
            </div>
        </div>
        <hr/>
        <div className="bottom">
          <div className="left">
            <h2>Gitop</h2>
            <span>© Gitop International Ltd. 2023</span>
          </div>
          <div className="right">
            <div className="social">
                <img src="/img/facebook.png" alt="" />
                <img src="/img/linkedin.png" alt="" />
                <img src="/img/instagram.png" alt="" />
              </div>
              <div className="links">
              <div className="link">
                <img src="/img/language.png" alt="" />
                <span>English</span>
              </div>
              <img src="/img/accessibility.png" alt="" />
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer