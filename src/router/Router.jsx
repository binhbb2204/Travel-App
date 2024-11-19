import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../page/Home'
import About from '../page/About'
import Tours from '../page/Tours'
import TourDetails from '../page/TourDetails'
import SearchResultList from '../page/SearchResultList'
import Login from '../page/Login'
import Register from '../page/Register'
import Location from '../page/Location'
import AddTourForm from '../ui/Adder/AddTourForm'
const Routers = () => {
  const handleAddTour = async (formData) => {
    try {
      // Replace with actual API endpoint
      const response = await fetch('your-api-endpoint/tours', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to create tour');
      }
      
      const newTour = await response.json();
      // Add success notification here
      console.log('Tour created:', newTour);
      
      // You can use window.location or navigate here to redirect
      window.location.href = `/tours/${newTour._id}`;
      
    } catch (error) {
      console.error('Error creating tour:', error);
      // Add error notification here
    }
  };
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/home' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/tours' element={<Tours />} />
      <Route path='/tours/:id' element={<TourDetails />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/tours/search' element={<SearchResultList />} />
      <Route path='/exotic_tours' element={<Location />} />
      <Route path='/add-tour' element={<AddTourForm onSubmit={handleAddTour} />} />

    </Routes>
  )
}

export default Routers