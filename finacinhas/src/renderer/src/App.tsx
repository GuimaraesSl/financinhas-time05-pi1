import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomeScreen/HomeScreen'
import NumberTeamScreen from './pages/NumberTeamScreen/NumberTeamScreen'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota para a página inicial */}
        <Route path="/" element={<HomePage />} />

        {/* Rota para a tela de número de equipes */}
        <Route path="/number-teams" element={<NumberTeamScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
