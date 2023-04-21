import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
//import Background from './components/background/Background';
import Main from './pages/main/Main';
import Footer from './components/footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AvatarPage from './pages/avatar/AvatarPage';
import MintPage from './pages/mint/MintPage';
import NFZFILPage from './pages/nfzfil/NFZFIL';
import ModulePage from './pages/module/ModulePage';
import ModuleTestPage from './pages/moduletest/ModuleTestPage';
import DevPage from './pages/dev/DevPage';

import SmartContractContext from './scripts/SmartContractContext';


const App = () => {
     let [user_address, setAddress_Context] = useState(null);
     let [user_token_ID, setTokenID_Context] = useState(null);
     let [user_balance, setBalance_Context] = useState(null);
     let [user_metadata, setMetadata_Context] = useState(null);
     let [user_avatar_URI, setAvatarURI_Context] = useState(null);
     return (
          <SmartContractContext.Provider value={{ user_address, setAddress_Context,
                                                  user_balance, setBalance_Context,
                                                  user_token_ID, setTokenID_Context,
                                                  user_metadata, setMetadata_Context,
                                                  user_avatar_URI, setAvatarURI_Context }}>
               <BrowserRouter>
                    <Navbar />
                    {/*/<Background />*/}
                    <Routes>
                         <Route exact path="/" element={<Main />} />
                         <Route exact path="/dev" element={<DevPage />} />
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
          </SmartContractContext.Provider>
     )
}

export default App
