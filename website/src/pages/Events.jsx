import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs'; 


const isAdmin = true;


const Events = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    name: '',
    date: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get('https://biotech-backend-l58o.onrender.com/events')
      .then(res => {
        setEvents(res.data);
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
      const res = await axios.post('https://biotech-backend-l58o.onrender.com/upload', formData, {
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
    axios.post('https://biotech-backend-l58o.onrender.com/events', form)
    .then(() => {
        setForm({ name: '', date: '', description: ''});
        fetchEvents();
    })
    .catch(err => console.error(err));
  }

  return (
    <div>
      <h2>Upcoming Events</h2>
      <div className='card-container'>
        {events.filter(event => dayjs(event.date).isAfter(dayjs())).map((event, index) => (
          <div key={index}>
            <h3>{event.name}</h3>
            <p>{event.date}</p>
            <p>{event.description}</p>
            {event.image && (<img src={`https://biotech-backend-l58o.onrender.com${event.image}`} alt={event.name} width="200" />)}
          </div>
        ))}
      </div>
      

      <h2>Past Events</h2>
       <div className='card-container'>
          {events.filter(event => dayjs(event.date).isBefore(dayjs())).map((event, index) => (
            <div key={index}>
              <h3>{event.name}</h3>
              <p>{event.date}</p>
              <p>{event.description}</p>
              {event.image && (<img src={`https://biotech-backend-l58o.onrender.com${event.image}`} alt={event.name} width="200" />)}
            </div>
          ))}
       </div>
      


      {isAdmin && (
      <>
        <hr />
        <h3>Add New Event</h3>
        <form onSubmit={handleSubmit}>
        <input
            type = "text"
            name = "name"
            placeholder='Event Name'
            value={form.name}
            onChange={handleChange}
            required
        /><br/><br/>
        <input
            type = "date"
            name = "date"
            placeholder='Event date'
            value={form.date}
            onChange={handleChange}
            required
        /><br/><br/>
        <textarea
            type = "description"
            name = "description"
            placeholder='Event Description'
            value={form.description}
            onChange={handleChange}
            required
        /><br/><br/>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e.target.files[0])}
        /><br /><br />

        <button type='submit'>Add Event</button>
      </form>
      </>
      )}
    </div>
  );
};

export default Events;
