import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from '../page/Home'
import Tours from '../page/Tours' 
import TourDetails from '../page/TourDetails' 
import SearchResultList from '../page/SearchResultList' 
import Login from '../page/Login' 
import Register from '../page/Register' 
import Location from '../page/Location'
const Routers = () => {
  return (
    <Routes>
        <Route path = '/' element = {<Navigate to = '/home'/>}/>
        <Route path = '/home' element = {<Home/>}  />
        <Route path = '/tours' element = {<Tours/>}  />
        <Route path = '/tours/:id' element = {<TourDetails/>}  />
        <Route path = '/login' element = {<Login/>}  />
        <Route path = '/register' element = {<Register/>}  />
        <Route path = '/tours/search' element = {<SearchResultList/>}  />
        <Route path = '/exotic_tours' element={<Location/>} />

    </Routes>
  )
}

export default Routers