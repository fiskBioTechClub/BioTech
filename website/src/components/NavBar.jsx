import React from 'react';
import { Link } from 'react-router-dom';

const NavBar  = () => {
    return (
        <nav>
            <h2>Fisk BioTech CLub</h2>
            <ul>
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