import React, { useEffect } from 'react'
import "./BusinessPage.scss"
import { useNavigate } from 'react-router-dom';
function BusinessPage() {
    
    

    const navigate= useNavigate();

    useEffect(() => {
        const redirectHome =() => {
            
            setTimeout(() => {
              navigate("/");
            }, 5000);
           
        };
    
        redirectHome();
      }, []);
  
    return (
    <div className='businessp'>
        <div className="container">
            <h1>Gitop Business</h1>
            <p>Gitop Business is not available in this time, you will be redirected automatically to home page ..</p>
        </div>
    </div>
  )
}

export default BusinessPage