import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import { useEffect, useState } from 'react';
import axios from 'axios';

const isAdmin = true;


const Opportunities = () => {
  const [opportunity, setOpportunity] = useState([]);
  const [form, setForm] = useState({
    name: '',
    link: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = () => {
    axios.get('http://localhost:5050/opportunities')
      .then(res => {
        setOpportunity(res.data);
      })
      .catch(err => console.log(err));
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]:e.target.value});
  }

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:5050/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setForm({ ...form, image: res.data.imageUrl });
    } catch (err) {
      console.error('Image upload failed:', err);
    }
  };


  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5050/opportunities', form)
    .then(() => {
        setForm({ name: '', link: '', description: '', image:''});
        fetchOpportunities();
    })
    .catch(err => console.error(err));
  }

  return (
    <div>
      <h2>Opportunities</h2>

      {opportunity.length === 0 ? (
        <p>No Opportunities</p>
      ) : (
        opportunity.map((opportunity, index) => (
          <div key={index}>
            <h3>{opportunity.name}</h3>
            <p>{opportunity.link}</p>
            <p>{opportunity.description}</p>
            {opportunity.image && (<img src={`http://localhost:5050${opportunity.image}`} alt={opportunity.name} width="200" />)}
          </div>
        ))
      )}

      {isAdmin && (
      <>
        <hr />
        <h3>Add an Opportunity</h3>
        <form onSubmit={handleSubmit}>
        <input
            type = "text"
            name = "name"
            placeholder='Opportunity Name'
            value={form.name}
            onChange={handleChange}
            required
        /><br/><br/>
        <input
            type = "text"
            name = "link"
            placeholder='Opportunity Link'
            value={form.link}
            onChange={handleChange}
            required
        /><br/><br/>
        <textarea
            name = "description"
            placeholder='Opportunity Description'
            value={form.description}
            onChange={handleChange}
            required
        /><br/><br/>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e.target.files[0])}
        /><br /><br />

        <button type='submit'>Add an Opportunity</button>
      </form>
      </>
      )}
    </div>
  );
};

export default Opportunities;
