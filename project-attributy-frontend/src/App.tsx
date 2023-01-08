import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainPage from './routes/MainPage'
import MissionDetails from './routes/MissionDetails'
import Header from './routes/Header'

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/missions" element={<MainPage/>} />
        <Route path="/missions/:id" element={<MissionDetails />} />
      </Routes>
    </div>
  )
}

export default App
