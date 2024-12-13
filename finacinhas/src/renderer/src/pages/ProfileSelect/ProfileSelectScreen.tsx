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
        <h2 className="titlePage">Você é um...</h2>
        <button className="profileButton">SOU ALUNO</button>
        <button className="profileButton">SOU PROFESSOR</button>
      </main>
    </div>
  )
}

export default ProfileSelectScreen
