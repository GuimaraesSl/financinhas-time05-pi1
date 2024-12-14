import React from 'react'
import logo from '../../assets/Logo-Subtitle.svg'
import '../ProfileSelect/ProfileSelectScreen.styles.css'
import { useNavigate } from 'react-router-dom'

const ProfileSelectScreen: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="containerProfileSelectScreen">
      <header className="headerProfileSelectScreen">
        <img src={logo} className="logoProfileSelectScreen" alt="logo" />
      </header>
      <main className="mainProfileSelectScreen">
        <h2 className="titlePage">Você é um...</h2>
        <button onClick={() => navigate('W I P')} className="profileButton">
          SOU ALUNO
        </button>
        <button onClick={() => navigate('/login')} className="profileButton">
          SOU PROFESSOR
        </button>
      </main>
    </div>
  )
}

export default ProfileSelectScreen
