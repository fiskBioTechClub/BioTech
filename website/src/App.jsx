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
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/ourprojects" element={<OurProjects />} />
          <Route path="/ourteam" element={<OurTeam />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;