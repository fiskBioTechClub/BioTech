import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import { useEffect, useState } from 'react';
import axios from 'axios';

const isAdmin = true;


const Projects = () => {
  const [project, setProject] = useState([]);
  const [form, setForm] = useState({
    name: '',
    link: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    axios.get('http://localhost:5050/projects')
      .then(res => {
        setProject(res.data);
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
    axios.post('http://localhost:5050/projects', form)
    .then(() => {
        setForm({ name: '', link: '', description: '', image:''});
        fetchProjects();
    })
    .catch(err => console.error(err));
  }

  return (
    <div>
      <h2>Projects</h2>

      {project.length === 0 ? (
        <p>No projects</p>
      ) : (
        project.map((project, index) => (
          <div key={index}>
            <h3>{project.name}</h3>
            <p>{project.link}</p>
            <p>{project.description}</p>
            {project.image && (<img src={`http://localhost:5050${project.image}`} alt={project.name} width="200" />)}
          </div>
        ))
      )}

      {isAdmin && (
      <>
        <hr />
        <h3>Add your projects</h3>
        <form onSubmit={handleSubmit}>
        <input
            type = "text"
            name = "name"
            placeholder='Project Name'
            value={form.name}
            onChange={handleChange}
            required
        /><br/><br/>
        <input
            type = "text"
            name = "link"
            placeholder='Project Link'
            value={form.link}
            onChange={handleChange}
            required
        /><br/><br/>
        <textarea
            name = "description"
            placeholder='Project Description'
            value={form.description}
            onChange={handleChange}
            required
        /><br/><br/>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e.target.files[0])}
        /><br /><br />

        <button type='submit'>Add Your Project</button>
      </form>
      </>
      )}
    </div>
  );
};

export default Projects;
