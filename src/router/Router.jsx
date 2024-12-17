import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from '../page/Home'
import About from '../page/About'
import Tours from '../page/Tours'
import TourDetails from '../page/TourDetails'
import SearchResultList from '../page/SearchResultList'
import Login from '../page/Login'
import Register from '../page/Register'
import Location from '../page/Location'
import AddTourForm from '../page/AddTourForm'
import Accommodations from '../page/Accommodations'
import Transportations from '../page/Transportations'
import TransactionBooking from '../page/TransactionBooking'
import AdminPanel from '../page/admin/AdminPanel'
import Checkout from '../page/Checkout'
import AccommodationDetails from '../page/AccommodationDetails'
import { clearRouteParams } from '../utils/queryParamManager'
import UserSettingsPanel from "../page/user/UserSettingsPanel"
import ModifyAccommodationForm from '../page/ModifyAccommodationForm'
import OTPVerify from "../page/OTPVerify"
import { authService } from "../data/Service/authService"
import Header from '../Header/Header'

const Routers = () => {
  const location = useLocation();
  const currentUser = authService.getCurrentUser();

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
    // <>
    //   {/* Render header only if the current path is not OTP verify */}
    //   {location.pathname !== '/otp-verify' && <Header />}

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
        <Route path='/add-tour' element={<AddTourForm />} />
        <Route path='/accommodations' element={<Accommodations />} />
        <Route path='/accommodations/:id' element={<AccommodationDetails />} />
        {/* <Route path='/accommodations/search' element={<SearchResultList />} /> */}
        <Route path='/transportations' element={<Transportations />} />
        <Route path='/transaction' element={<TransactionBooking />} />

        <Route path="/otp-verify" element={<OTPVerify />} />

        <Route
          path="/admin-panel"
          element={
            currentUser && currentUser.role === 'admin' ? (
              <AdminPanel />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/user-settings"
          element={
            currentUser ? <UserSettingsPanel /> : <Navigate to="/login" />
          }
        />
        <Route path='/add-accommodation' element={<ModifyAccommodationForm />} />
      </Routes>
    // </>
  )
}

export default Routers