
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Layout from './Pages/Layout'
import DashBoard from './Pages/DashBoard'
import WriteArticle from './Pages/WriteArticle'
import BlogTitle from './Pages/BlogTitle'
import GenerateImages from './Pages/GenerateImages'
import RemoveBackground from './Pages/RemoveBackground'
import RemoveObject from './Pages/RemoveObject'
import ReviewResume from './Pages/ReviewResume'
import Community from './Pages/Community'
function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<Layout />}>
        <Route index element={<DashBoard />} />
        <Route path="Write-Article" element={<WriteArticle />} />
        <Route path="Blog-Titles" element={<BlogTitle />} />
        <Route path="Generate-Images" element={<GenerateImages />} />
        <Route path="Remove-Background" element={<RemoveBackground />} />
        <Route path="Remove-Object" element={<RemoveObject />} />
        <Route path="Review-Resume" element={<ReviewResume />} />
        <Route path="Community" element={<Community />} />
        </Route>
      </Routes>
    </div>
  )
}


export default App
