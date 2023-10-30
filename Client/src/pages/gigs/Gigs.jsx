import React, { useEffect, useRef, useState } from 'react'
import "./Gigs.scss"
import { gigs } from '../../../data';
import GigCard from '../../components/gig-card/GigCard'
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useLocation } from 'react-router-dom';

function Gigs() {

  const [open, setOpen]=useState(false);
  const [sort, setSort]=useState("sales");

  const minRef=useRef();
  const maxRef=useRef();

  const {search}=useLocation();

  const {isLoading,error,data,refetch}=useQuery({
      queryKey:['gigs'],
      queryFn:()=> newRequest.get(`/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`).then(res=>{
        return res.data;
      })
  })

  console.log(data)
  const resort=(type)=>{
    setSort(type)
    setOpen(false)
  }

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

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
            <input type="text" placeholder='min' ref={minRef} />
            <input type="text" placeholder='max' ref={maxRef} />
            <button onClick={apply}>Apply</button>
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
          { isLoading? "Loading.." :error?"Something went wrong":data?.map(gig=>(
            <GigCard key={gig._id} item={gig}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Gigs