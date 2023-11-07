import React from 'react'
import "./ProjectCard.scss"
import { Link } from 'react-router-dom'
import newRequest from '../../utils/newRequest';
import { useQuery } from '@tanstack/react-query';

function ProjectCard({item}) {
  
  const {isLoading,error,data}=useQuery({
    queryKey:['gigsCard'],
    queryFn:()=> newRequest.get(`/users/${item.userId}`).then(res=>{
      return res.data;
    })
})

  const selectCategory=(cat)=>{

    switch (cat){
      case 'design':
        return "Graphics & Design";
      case 'AI':
        return "AI Services";
      case 'writing':
        return "Writing & Tranlsation";
      case 'video':
        return "Video & Animation";
      case 'music':
        return "Music & Audio";
      case 'programmnig':
        return "Programming & Tech";
      case 'business':
        return "Business";
      case 'lifestyle':
        return "Lifestyle";

      default:
        return cat;
          
    }

  }
  return (
    <>
    {
      isLoading?"Loading..":error?"Something went wrong":
      <Link to={`/gig/${item._id}`}>
          <div className="projectCard">
            <div className="img">
              <img src={item?.cover} alt="" />
            </div>
              <div className='info'>
                <img src={data.img||"/img/noavatar.jpg"} alt="" />
                <div className="texts">
                  <h2>{selectCategory(item?.category)}</h2>
                  <span>{data.username}</span>
                </div>
              </div>
  
          </div>
      </Link>
    }
    </>
  )
}

export default ProjectCard