import { React, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
//Import delle pagine del sito per l'instradamento
import Login from './pages/login/Login'
import Register from './pages/registration/Registration'
import Home from './pages/home/Home'
export default function App() {
  return (
    <Routes>
      <Route path='/registration' element={<Register />}/>
      <Route path='/' element={<Login />}/>
      <Route path='/home' element={<Home />}/>
    </Routes>
  )
}
