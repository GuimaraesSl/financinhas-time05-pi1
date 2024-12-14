import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomeScreen/HomeScreen'
import NumberTeamScreen from './pages/NumberTeamScreen/NumberTeamScreen'
import RegisterScreen from './pages/RegisterScreen/RegisterScreen'
import ProfileSelectScreen from './pages/ProfileSelect/ProfileSelectScreen'
import LoginScreen from './pages/LoginScreen/LoginScreen'
import EnterRoomScreen from './pages/EnterRoomScreen/EnterRoomScreen'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota para a tela inicial */}
        <Route path="/" element={<HomePage />} />

        {/* Rota para a tela de Select Profile */}
        <Route path="/profile-select" element={<ProfileSelectScreen />} />

        {/* Rota para a tela de Login */}
        <Route path="/login" element={<LoginScreen />} />

        {/* Rota para a tela de Login */}
        <Route path="/register" element={<RegisterScreen />} />

        {/* Rota para a tela de número de equipes */}
        <Route path="/number-teams" element={<NumberTeamScreen />} />

        {/* Rota para a tela de cadastro */}
        <Route path="/register" element={<RegisterScreen />} />

        {/* Rota para a tela de cadastro */}
        <Route path="/enter" element={<EnterRoomScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
