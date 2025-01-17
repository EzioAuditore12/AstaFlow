import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './01_Home'
import SearchResult from './02_SearchResult'
import VideoPage from './03_VideoPage'
import RegisterOrLogin from './04_RegisterOrLogin'
import UserPage from './05_UserPage'

function MainBody() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchResult />} />
      <Route path="/video" element={<VideoPage/>} />
      <Route path="/user" element={<UserPage />} />
      <Route path='/signin' element={<RegisterOrLogin/>} />
    </Routes>
  )
}

export default MainBody
