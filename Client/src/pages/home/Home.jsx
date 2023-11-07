import React from 'react'
import "./Home.scss"
import Featured from '../../components/featured/Featured'
import Slide from '../../components/slide/Slide'

import Talent from '../../components/talent-featured/Talent'
import Business from '../../components/business-featured/Business'
import ProjectCard from '../../components/project-card/ProjectCard'
import { cards} from '../../../data'

import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'

function Home() {

  const {isLoading,error,data}=useQuery({
    queryKey:['gigsHome'],
    queryFn:()=> newRequest.get(`/gigs`).then(res=>{
      return res.data;
    })
})
  return (
    <div className="home">
        <Featured/>
        <Slide cards={cards} isProject={false}/>
        <Talent/>
        <Business/>
        {
          isLoading?"Loading..":error?"Something went wrong!":
          <Slide cards={data} isProject={true}/>
        }
       
        

        

    </div>
  )    
}

export default Home