import React from 'react'

import homeBanner from '../../image/banner-home.png'

import module0SyllabusBanner from '../../image/banner-module0-syllabus.png'
import module0TestBanner from '../../image/banner-module0-test.png'

import './banner.css'

var banner = homeBanner;
if (window.location['pathname'].includes('/module0')) {
  if (window.location['pathname'].includes('/test')) {
    banner = module0TestBanner;
  } else {
    banner = module0SyllabusBanner;
  }
}

const Banner = () => {
  return (
    <div className='banner'>
      <img src={banner} alt='' className='banner' />
    </div>
  )
}

export default Banner