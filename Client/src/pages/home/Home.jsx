import React from 'react'
import "./Home.scss"
import Featured from '../../components/featured/Featured'
import Slide from '../../components/slide/Slide'
import Card from '../../components/card/Card'
import Talent from '../../components/talent-featured/Talent'
import Business from '../../components/business-featured/Business'
import ProjectCard from '../../components/project-card/ProjectCard'
import { cards, projects } from '../../../data'

function Home() {
  return (
    <div className="home">
        <Featured/>
        <Slide>
            {cards.map(card => (
              <Card key={card.id} card={card} />
        ))}
        </Slide>
        <Talent/>
        <Business/>
        <Slide>
            {projects.map(p => (
              <ProjectCard key={p.id} card={p} />
        ))}
        </Slide>
        

        

    </div>
  )    
}

export default Home