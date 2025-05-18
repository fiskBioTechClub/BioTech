import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import OurTeam from './pages/OurTeam';
import Opportunities from './pages/Opportunities';
import Events from './pages/Events';
import OurProjects from './pages/OurProjects';

function App () {
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;