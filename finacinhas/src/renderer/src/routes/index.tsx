import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import NumberTeamScreen from '../pages/NumberTeamScreen/NumberTeamScreen'
import MatchScreenWrapper from '@renderer/pages/MatchScreen/MatchScreenWrapper'
import EnterRoomScreen from '@renderer/pages/EnterRoomScreen/EnterRoomScreen'
import LoginScreen from '@renderer/pages/LoginScreen/LoginScreen'
import ProfileSelectScreen from '@renderer/pages/ProfileSelect/ProfileSelectScreen'
import RegisterScreen from '@renderer/pages/RegisterScreen/RegisterScreen'
import SelectTeamScreen from '@renderer/pages/SelectTeam/SelectTeamScreen'
import HomePage from '../pages/SelectQuestionsScreen/SelectQuestionsScreen'
import ConfigTeam from '@renderer/pages/ConfigTeams/ConfigTeams'
import SelectQuestionsScreen from '@renderer/pages/SelectQuestionsScreen/SelectQuestionsScreen'

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

        {/* Rota para a tela de selecionar sala */}
        <Route path="/enter" element={<EnterRoomScreen />} />

        {/* Rota para a tela de selecionar time */}
        <Route path="/select-team" element={<SelectTeamScreen />} />

        {/*Rota para tela de configuração do quiz*/}
        <Route path="/config" element={<ConfigTeam />} />

        {/* Rota para tela do jogo */}
        <Route path="/match-screen/:teamName" element={<MatchScreenWrapper />} />

        {/* Rota para tela de seleção de perguntas */}
        <Route path="/select-questions" element={<SelectQuestionsScreen />} />
      </Routes>
    </HashRouter>
  )
}

export default AppRoutes
