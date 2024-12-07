import React from 'react'
import logo from '../../src/assets/Logo-Subtitle.svg'


import '../styles/HomeScreen.css'

const HomePage: React.FC = () => {
  const handlePlayClick = () => {
    console.log('Jogar!')
  }

  return (
    <div className="container">
      <img className="logo" src={logo} alt="Financinhas" />
      <button onClick={handlePlayClick} className="button">
        JOGAR
      </button>
    </div>
  )
}

export default HomePage
