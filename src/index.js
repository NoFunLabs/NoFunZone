import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import Navbar from './components/navbar/Navbar'
import Main from './pages/main/Main'
import Footer from './components/footer/Footer'

//E~ Added for background implementation
import Background from './components/background/Background'
import { Switch, BrowserRouter, Route, Routes } from 'react-router-dom';
import AvatarPage from './pages/avatarpage/AvatarPage';
import MintPage from './pages/mintpage/MintPage';

ReactDOM.render(
     <BrowserRouter>
          <Background />
          <Navbar />
          <Routes>
               <Route exact path="/" element={<Main />} />
               <Route exact path="/mint" element={<MintPage />} />
               <Route exact path="/avatar" element={<AvatarPage />} />
               <Route exact path="/test" element={<MintPage />} />
          </Routes>
          <Footer />
          </BrowserRouter>,
     document.getElementById('root')
)
