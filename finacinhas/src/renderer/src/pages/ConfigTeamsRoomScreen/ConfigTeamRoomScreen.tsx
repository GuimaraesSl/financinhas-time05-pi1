import React from 'react'
import '../ProfileSelect/ProfileSelectScreen.styles.css'
import { useNavigate } from 'react-router-dom'
import './ConfigTeamRoomScreen.style.css'
import QuestionCard from './components/QuestionCard'
import { useState, useEffect } from 'react'
import { useAuth } from '@renderer/contexts/authContext'
import Header from '../../components/Header/Header'
import Mais from '../../assets/icon+.svg'

const ConfigTeamRoomScreen: React.FC = () => {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  const [profileName, setProfileName] = useState<string | null>(null)

  useEffect(() => {
    if (currentUser) {
      setProfileName(currentUser.displayName || 'Usuário')
    }
  }, [currentUser])

  const handleLogout = async (): Promise<void> => {
    await logout()
    navigate('/')
    alert('Usuário Desconectado')
  }

  return (
    <div className="containerConfigTeamRoomScreen">
      <Header profileName={profileName || 'Usuário'} onExit={() => handleLogout()} />
      <main className="mainConfigTeamRoomScreen">
        <div className="registeredConfigTeamRooms">
          <div className="sectionHeaderConfigTeamRoomScreen">
            <h2 className="titleRegisteredTeamRoom">SEUS JOGOS CADASTRADOS</h2>
            <button className="buttonAddTeamRoom" onClick={() => navigate('/question-creation')}>
              <img src={Mais} alt="Adicionar Jogo" />
              ADICIONAR JOGO
            </button>
          </div>
          <QuestionCard
            question={{
              id: 1,
              question: 'Quiz de Algebra',
              answer: 'Criado em 11/02/24, 13:38',
            }}
          />
          <QuestionCard
            question={{
              id: 2,
              question: 'Quiz MOEDINHAS',
              answer: 'Criado em 11/02/24, 13:38',
            }}
          />
          <QuestionCard
            question={{
              id: 3,
              question: 'Jogo Salvo',
              answer: 'Criado em 11/02/24, 13:38',
            }}
          />
        </div>
      </main>
      <footer className="footerConfigTeamRoomScreen" />
    </div>
  )
}

export default ConfigTeamRoomScreen
