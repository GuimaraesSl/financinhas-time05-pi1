import React from 'react'
import logo from '../../assets/Logo-Subtitle.svg'
import '../ProfileSelect/ProfileSelectScreen.styles.css'

const ProfileSelectScreen: React.FC = () => {
  return (
    <div className="containerProfileSelectScreen">
      <header className="headerProfileSelectScreen">
        <img src={logo} className="logoProfileSelectScreen" alt="logo" />
      </header>
      <main className="mainProfileSelectScreen">
        <h2>Você é um...</h2>
        <button className="ProfileButton">SOU ALUNO</button>
        <button className="ProfileButton">SOU PROFESSOR</button>
      </main>
    </div>
  )
}

export default ProfileSelectScreen
