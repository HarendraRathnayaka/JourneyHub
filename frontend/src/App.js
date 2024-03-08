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


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/home" element={<Home/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
