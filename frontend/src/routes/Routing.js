import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Detail from '../components/Detail'
import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/detail" element={<Detail />} />
    </Routes>
  )
}

export default Routing