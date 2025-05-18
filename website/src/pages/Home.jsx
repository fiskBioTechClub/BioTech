import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Home = () => {
    return (
        <div>
            <NavBar/>
            <h1> This is the home page</h1>
        </div>
    );
}

export default Home;