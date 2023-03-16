import React from 'react'

import socialsIcon1 from '../../image/facebook.png'
import socialsIcon2 from '../../image/twitter.png'
import socialsIcon3 from '../../image/instagram.png'
import socialsIcon4 from '../../image/linkedin.png'
import socialsIcon5 from '../../image/youtube.png'

import footerLogo from '../../image/logo.png'


import './footer.css'

const Footer = () => {
  return (
        <div className='footer'>
          <div className='footerLeft'>
            <div className='footerBox'>
              <div className='footerSocialsContainer'>
                <a className='footerSocialsLink' href={window.location['href'] + ''}>
                  <img src={socialsIcon1} alt='Connect with NFZ on FaceBook!' className='footerSocialsIcon' />
                </a>
                <a className='footerSocialsLink' href={window.location['href'] + ''}>
                  <img src={socialsIcon2} alt='Connect with NFZ on Twitter!' className='footerSocialsIcon' />
                </a>
                <a className='footerSocialsLink' href={window.location['href'] + ''}>
                  <img src={socialsIcon3} alt='Connect with NFZ on Instagram!' className='footerSocialsIcon' />
                </a>
                <a className='footerSocialsLink' href={window.location['href'] + ''}>
                  <img src={socialsIcon4} alt='Connect with NFZ on LinkedIn!' className='footerSocialsIcon' />
                </a>
                <a className='footerSocialsLink' href={window.location['href'] + ''}>
                  <img src={socialsIcon5} alt='See our latest videos on YouTube!' className='footerSocialsIcon' />
                </a>
              </div>
              <div className='footerLogoContainer'>
                <a href={window.location['origin']}>
                  <img src={footerLogo} alt='' className='footerLogo' />
                </a>
              </div>
            </div>
          </div>
          <div className='footerRight'>
            <div className='footerBox'>
              <div className='footerTextContainer'>
                <div className='footerLinkColumn1'>
                  <div className='footerColumnTitle'>NFZ</div>
                  <a className='footerColumnItem' href={window.location['href'] + ''}>Home</a>
                  <a className='footerColumnItem' href={window.location['href'] + ''}>About Us</a>
                  <a className='footerColumnItem' href={window.location['href'] + ''}>Your NFTs</a>
                  <a className='footerColumnItem' href={window.location['href'] + ''}>Blog</a>
                </div>
                <div className='footerLinkColumn2'>
                  <div className='footerColumnTitle'>Info</div>
                  <a className='footerColumnItem' href={window.location['href'] + ''}>Terms & Conditions</a>
                  <a className='footerColumnItem' href={window.location['href'] + ''}>Privacy Policy</a>
                  <a className='footerColumnItem' href={window.location['href'] + ''}>Cookies</a>
                </div>
                <div className='footerLinkColumn3'>
                  <div className='footerColumnTitle'>Community</div>
                  <a className='footerColumnItem' href={window.location['href'] + ''}>Help Center</a>
                  <a className='footerColumnItem' href={window.location['href'] + ''}>Forum</a>
                  <a className='footerColumnItem' href={window.location['href'] + ''}>Webinars</a>
                  <a className='footerColumnItem' href={window.location['href'] + ''}>Professionals</a>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Footer
