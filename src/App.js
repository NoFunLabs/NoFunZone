import React from 'react'
import Navbar from './components/navbar/Navbar'
import Main from './pages/main/Main'
import Footer from './components/footer/Footer'

//E~ Added for background implementation
//import Background from './components/background/Background'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AvatarPage from './pages/avatar/AvatarPage';
import MintPage from './pages/mint/MintPage';
import NFZFILPage from './pages/nfzfil/NFZFIL';
import ModulePage from './pages/module/ModulePage';
import ModuleTestPage from './pages/moduletest/ModuleTestPage';

const App = () => {
     return (
          <BrowserRouter>
          <Navbar />
          {/*/<Background />*/}
          <Routes>
               <Route exact path="/" element={<Main />} />
               <Route exact path="/mint" element={<MintPage />} />
               <Route exact path="/avatar" element={<AvatarPage />} />
               <Route exact path="/test" element={<MintPage />} />
               <Route exact path="/nfzfil" element={<NFZFILPage />} />
               <Route exact path="/module0" element={<ModulePage />} />
               <Route exact path="/module1" element={<ModulePage />} />
               <Route exact path="/module0/test" element={<ModuleTestPage />} />
               <Route exact path="/module1/test" element={<ModuleTestPage />} />
          </Routes>
          <Footer />
          </BrowserRouter>
     )
}

export default App
