import React from 'react'
import Navbar from './components/navbar/Navbar'
import Main from './pages/main/Main'
import Footer from './components/footer/Footer'

//E~ Added for background implementation
import Background from './components/background/Background'

const App = () => {
     return (
          <>
               <Background />
               <Navbar />
               <Main />
               <Footer />
          </>
     )
}

export default App
