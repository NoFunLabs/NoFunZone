import React from 'react'

import starterElementals from '../../image/starter-elementals-1.png'

import getStartedButton from '../../image/get-started-button.png'

import './getstarted.css'

const GetStarted = () => {
  return (
    <div className='componentFirst getStartedBC'>
      <div className='componentSecond'>
        <div className='getStarted'>
          <div className='getStartedLeft'>
            <div className='getStartedBox'>
              <div className='getStartedTextContainer'>
                <div className='getStartedTitle textHighlight'>
                  Start by selecting your element!
                </div>
                <div className='getStartedText'>
                  Pick an elemental warrior. You can choose between Fire, Earth, Air and Water!
                </div>
              </div>
              <div className='getStartedButtonContainer'>
                <a href={window.location['href'] + 'mint'} >
                  <img src={getStartedButton} alt='Get Started' className='getStartedButton' />
                </a>
              </div>
            </div>
          </div>
          <div className='getStartedRight'>
            <div className='getStartedBox'>
              <div className='getStartedBoxIMG'>
                <img src={starterElementals} alt='' className='starterElementals' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetStarted
