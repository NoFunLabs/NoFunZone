import React from 'react'

import team1 from '../../image/team1.png'
import team2 from '../../image/team2.png'
import team3 from '../../image/team3.png'

import './team.css'

const Team = () => {
  return (
    <div className='componentFirst teamBackGround'>
      <div className='componentSecond'>
        <div className='roadmap'>
          <div className='roadmapTitle textHighlight'>THE TEAM</div>
          <div className='roadmapSubTitle'>virtually human</div>
          <div className='teamContainer'>
            <div className='teamItem'>
              <div className='teamItemImage1'>
                <img src={team1} alt='' style={{ width: '100%' }} />
              </div>
              <a className='teamItemTitle' 
                href='https://twitter.com/EvanOnEarth_eth'
                target="_blank"
                rel="noreferrer">
                  @EvanOnEarth_eth
              </a>
              <a className='teamItemName'
                href='https://www.linkedin.com/in/evan-gottschalk/'
                target="_blank"
                rel="noreferrer">
                  Evan Gottschalk
              </a>
              <div className='teamItemPosition'>Cofounder, Lead Developer</div>
            </div>
            <div className='teamItem'>
              <div className='teamItemImage2'>
                <img src={team2} alt='' style={{ width: '94%' }} />
              </div>
              <a className='teamItemTitle'
                href='https://twitter.com/RedCashflow'
                target="_blank"
                rel="noreferrer">
                  @RedCashflow
              </a>
              <a className='teamItemName'
                href='https://www.linkedin.com/in/gregory-castro-47437767/'
                target="_blank"
                rel="noreferrer">
                  Greg Castro
              </a>
              <div className='teamItemPosition'>Cofounder, Lead Alchemist</div>
            </div>
            <div className='teamItem'>
              <div className='teamItemImage3'>
                <img src={team3} alt='' style={{ width: '90%' }} />
              </div>
              <a className='teamItemTitle'
                href='https://twitter.com/Suzie_NFT'
                target="_blank"
                rel="noreferrer">
                  @Suzie_NFT
              </a>
              <a className='teamItemName'
                href='https://www.youtube.com/watch?v=ZZ5LpwO-An4'
                target="_blank"
                rel="noreferrer">
                  Suzie Silver
              </a>
              <div className='teamItemPosition'>Lead Whore</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Team
