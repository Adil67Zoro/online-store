import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Phones from './products/Phones';
import Cart from './pages/Cart'
import Laptops from './products/Laptops';
import Profile from './pages/Profile';
import Watches from './products/Watches';
import Headphones from './products/Headphones';

function App() {
  return(
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path='/phones' element={<Phones />}/>
          <Route exact path='/laptops' element={<Laptops />}/>
          <Route exact path='/watches' element={<Watches />}/>
          <Route exact path='/headphones' element={<Headphones />}/>
          <Route exact path='/cart' element={<Cart />}/>
          <Route exact path='/profile' element={<Profile />}/>

        </Routes>
      </div>
    </Router>
  )
}

export default App;
