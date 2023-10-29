import React, { useEffect, useState } from 'react'
import "./Navbar.scss"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';

function Navbar() {

    const navigate= useNavigate();

    const [active,setActive]=useState(false);

    const [open, setOpen]=useState(false);

    const {pathname}=useLocation();

    const isActive=()=>{
        window.scrollY>0?setActive(true):setActive(false)
    }
    useEffect(()=>{
        window.addEventListener("scroll",isActive)

        return ()=>{
            window.removeEventListener("scroll",isActive);
        }
    },[])

    const currentUser= JSON.parse(localStorage.getItem("currentUser"));

    const handleLogout =async()=>{
        try{
            await newRequest.post("/auth/logout");
            localStorage.setItem("currentUser",null)
            navigate("/")
        }catch(err){
           console.log(err) 
        }
    }
  return (
    <div className={active||pathname!=="/"?"navbar active":"navbar"}>
        <div className="container">
        <Link to="/">
            <div className="logo">
                <span className='text'>Gitop</span>
            </div>  
            </Link>
        <div className="links">
            <span>Business</span>
            <span>Explore</span>
            <span>English</span>
            <span>Sign in</span>
            {!currentUser?.isSeller && <span>Become a Seller</span>}
            {!currentUser&& <button>Join</button>}
            {currentUser && (
                <div className="user" onClick={()=>setOpen(!open)}>
                    <img src={currentUser?.img || "/img/noavatar.jpg"} alt="" />
                    <span>{currentUser?.username}</span>

                    { open&& (
                        <div className="options">
                        {currentUser?.isSeller &&(
                            <>
                                <Link className="link" to="/myGigs">Gigs</Link >
                                <Link className="link" to="/add">Add New Gig</Link>
                        
                            </>
                        )}
                        <Link className="link" to="/orders">Orders</Link>
                        <Link className="link" to="/messages">Messages</Link >
                        <Link className="link"onClick={handleLogout}>Logout</Link >
                    </div>
                    )
                    
                    }
                </div>
            )}
        </div>
    </div>
    
    {(active || pathname!=="/") && (
        <>
        <hr /> 
        <div className="menu">
            <Link className="link" to="/"> Graphics & Design</Link>
            <Link className="link" to="/"> Viedo & Animation</Link>
            <Link className="link" to="/"> Writing & Translation</Link>
            <Link className="link" to="/"> AI Services</Link>
            <Link className="link" to="/"> Digital Marketing</Link>
            <Link className="link" to="/"> Music & Audio</Link>
            <Link className="link" to="/"> Programming & Tech</Link>
            <Link className="link" to="/"> Business</Link>
            <Link className="link" to="/"> Lifestyle</Link>
            
            

        </div>
    </>
    )}
    
        
      
        
    </div>
  )
}

export default Navbar