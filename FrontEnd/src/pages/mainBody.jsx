import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './01_Home'
import SearchResult from './02_SearchResult'

function MainBody() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResult />} />
      </Routes>
    </Router>
  )
}

export default MainBody
