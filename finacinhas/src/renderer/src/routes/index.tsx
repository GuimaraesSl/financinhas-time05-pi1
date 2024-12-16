import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import HomeScreen from '../pages/HomeScreen/HomeScreen'
import NumberTeamScreen from '../pages/NumberTeamScreen/NumberTeamScreen'
import ChoiceScreen from '@renderer/pages/ChoiceScreen/ChoiceScreen'
import MatchScreenWrapper from '@renderer/pages/MatchScreen/MatchScreenWrapper'
import EnterRoomScreen from '@renderer/pages/EnterRoomScreen/EnterRoomScreen'
import LoginScreen from '@renderer/pages/LoginScreen/LoginScreen'
import ProfileSelectScreen from '@renderer/pages/ProfileSelect/ProfileSelectScreen'
import RegisterScreen from '@renderer/pages/RegisterScreen/RegisterScreen'
import SelectTeamScreen from '@renderer/pages/SelectTeam/SelectTeamScreen'
import HomePage from '../pages/HomeScreen/HomeScreen'

const AppRoutes: React.FC = () => {
  return (
    <HashRouter>
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

        {/* Rota para a tela de cadastro */}
        <Route path="/select-team" element={<SelectTeamScreen />} />

        <Route path="/" element={<HomeScreen />} />
        <Route path="/team" element={<NumberTeamScreen />} />
        <Route path="/choiceScreen" element={<ChoiceScreen />} />
        <Route path="/matchScreen/:teamName" element={<MatchScreenWrapper />} />
      </Routes>
    </HashRouter>
  )
}

export default AppRoutes
