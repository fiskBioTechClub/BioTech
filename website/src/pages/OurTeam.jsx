import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useEffect, useState } from 'react';
import axios from 'axios';

const isAdmin = true;


const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [form, setForm] = useState({
    name: '',
    date: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = () => {
    axios.get('http://localhost:5050/teams')
      .then(res => {
        setTeams(res.data);
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
    axios.post('http://localhost:5050/teams', form)
    .then(() => {
        setForm({ name: '', position: '', description: '', image:''});
        fetchTeams();
    })
    .catch(err => console.error(err));
  }

  return (
    <div>
      <h2>Team Members</h2>

      {teams.length === 0 ? (
        <p>No members</p>
      ) : (
        <div className='card-container'>
          {teams.map((team, index) => (
            <div key={index}>
              <h3>{team.name}</h3>
              <p>{team.position}</p>
              <p>{team.description}</p>
              {team.image && (<img src={`http://localhost:5050${team.image}`} alt={team.name} width="200" />)}
            </div>
          ))}
        </div>
      )}

      {isAdmin && (
      <>
        <hr />
        <h3>Member? Add your information</h3>
        <form onSubmit={handleSubmit}>
        <input
            type = "text"
            name = "name"
            placeholder='Member Name'
            value={form.name}
            onChange={handleChange}
            required
        /><br/><br/>
        <input
            type = "text"
            name = "position"
            placeholder='position'
            value={form.position}
            onChange={handleChange}
            required
        /><br/><br/>
        <textarea
            type = "description"
            name = "description"
            placeholder='Member Description'
            value={form.description}
            onChange={handleChange}
            required
        /><br/><br/>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e.target.files[0])}
        /><br /><br />

        <button type='submit'>Add Your Information</button>
      </form>
      </>
      )}
    </div>
  );
};

export default Teams;
