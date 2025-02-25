import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import NumberTeamScreen from '../pages/NumberTeamScreen/NumberTeamScreen'
import MatchScreenWrapper from '@renderer/pages/MatchScreen/MatchScreenWrapper'
import EnterRoomScreen from '@renderer/pages/EnterRoomScreen/EnterRoomScreen'
import LoginScreen from '@renderer/pages/LoginScreen/LoginScreen'
import ProfileSelectScreen from '@renderer/pages/ProfileSelect/ProfileSelectScreen'
import RegisterScreen from '@renderer/pages/RegisterScreen/RegisterScreen'
import SelectTeamScreen from '@renderer/pages/SelectTeam/SelectTeamScreen'
import HomePage from '../pages/HomeScreen/HomeScreen'
import ConfigTeam from '@renderer/pages/ConfigTeams/ConfigTeams'
import ConfigTeamRoomScreen from '@renderer/pages/ConfigTeamsRoomScreen/ConfigTeamRoomScreen'
import SelectQuestionsScreen from '@renderer/pages/SelectQuestionsScreen/SelectQuestionsScreen'
import EditQuestionScreen from '@renderer/pages/EditQuestionScreen/EditQuestion'
import TeacherQuestionCreationScreen from '@renderer/pages/TeacherQuestionCreationScreen/TeacherQuestionCreationScreen'
import QuestionCreation from '@renderer/pages/AddQuestionScreen/QuestionCreation'
import TeacherViewRanking from '@renderer/pages/TeacherViewRanking/TeacherViewRankin'

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

        {/* Rota para a tela de ver as perguntas */}
        <Route path="/teacher-question/:quizId" element={<TeacherQuestionCreationScreen />} />

        {/* Rota para a tela de adição de perguntas */}
        <Route path="/question-creation/:quizId" element={<QuestionCreation />} />

        {/* Rota para a tela de cadastro */}
        <Route path="/register" element={<RegisterScreen />} />

        {/* Rota para a tela de selecionar sala */}
        <Route path="/enter" element={<EnterRoomScreen />} />

        {/* Rota para a tela de selecionar time */}
        <Route path="/select-team/:roomCode" element={<SelectTeamScreen />} />

        {/*Rota para tela de configuração do quiz*/}
        <Route path="/config/:quizId" element={<ConfigTeam />} />

        {/* Rota para tela do jogo */}
        <Route path="/match-screen/:roomCode/:teamName" element={<MatchScreenWrapper />} />

        {/* Rota para tela de seleção de perguntas */}
        <Route path="/select-questions" element={<SelectQuestionsScreen />} />

        {/* Rota para a tela edit screen */}
        <Route path="/edit-question/:enunciadoAntigo" element={<EditQuestionScreen />} />

        {/* Rota para a tela edit screen */}
        <Route path="/config-team-room" element={<ConfigTeamRoomScreen />} />

        {/* Rota para a tela de acompanhar o ranking */}
        <Route path="/view-ranking/:roomCode" element={<TeacherViewRanking />} />
      </Routes>
    </HashRouter>
  )
}

export default AppRoutes
