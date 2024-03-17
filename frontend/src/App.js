import './App.css';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import Home from './components/home';
import LandingPage from './components/landingpage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<LandingPage/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
