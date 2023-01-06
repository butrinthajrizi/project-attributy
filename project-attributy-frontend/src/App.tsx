import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainPage from './routes/MainPage'
import MissionDetails from './routes/MissionDetails'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/details" element={<MissionDetails />} />
      </Routes>
    </div>
  )
}

export default App
