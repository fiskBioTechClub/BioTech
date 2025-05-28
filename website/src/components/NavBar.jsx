import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Fisk BioTech Club</div>
      <ul className="nav-links">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/events'>Events</Link></li>
        <li><Link to='/opportunities'>Opportunities</Link></li>
        <li><Link to='/ourprojects'>Our Projects</Link></li>
        <li><Link to='/ourteam'>Our Team</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
