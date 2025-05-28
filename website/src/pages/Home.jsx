import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    level: '',
    message: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://biotech-backend-l58o.onrender.com/interests', form)
      .then(() => {
        alert('Thank you for your interest!');
        setForm({ name: '', email: '', level: '', message: '' });
      })
      .catch(err => console.error(err));
  }

  return (
    <div>
      <div>
        <h2>Our Mission</h2>
        <p>
            At Fisk BioTech Club, our mission is to foster curiosity and collaboration across biology, technology, and innovation. We empower students through workshops, research, and real-world applications.
        </p>

        <h2>Our Goals</h2>
        <ul>
            <p>Promote interdisciplinary research and learning</p>
            <p>Provide hands-on experience in biotech tools</p>
            <p>Connect students with research, internships, and industry</p>
            <p>Encourage leadership and innovation in science</p>
        </ul>
        </div>
      <h3>Interested in joining? Fill the form below:</h3>
      <form onSubmit={handleSubmit}>
        <input 
            name="name" 
            placeholder="Your Name" 
            value={form.name} 
            onChange={handleChange} 
            required 
        /><br /><br />
        <input 
            name="email" 
            type="email" 
            placeholder="Your Email" 
            value={form.email} 
            onChange={handleChange} 
            required 
        /><br /><br />
        <input 
            name="level"
            placeholder="Your Class Level" 
            value={form.level} 
            onChange={handleChange} 
            required 
        /><br /><br />
        <textarea 
            name="message" 
            placeholder="Why are you interested?" 
            value={form.message} 
            onChange={handleChange} 
        /><br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Home;
