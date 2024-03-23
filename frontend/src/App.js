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
import PayForm from './components/tourpayment/paymentform';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<LandingPage/>}/>
          <Route path="/payment/:clientId/:bookingId" element={<PayForm/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
