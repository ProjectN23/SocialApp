import { React, useState, useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
//Import delle pagine del sito per l'instradamento
import Registration from './pages/registration/registration'
import Login from './pages/login/Login'



export default function App() {


  return (
    <Routes>
      <Route path='/registration' element={<Registration />}/>
      <Route path='/' element={<Login />}/>
    </Routes>
  )
}
