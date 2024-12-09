/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import logo from '../../assets/Logo-Subtitle.svg'
import './HomeScreen.style.css'

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
