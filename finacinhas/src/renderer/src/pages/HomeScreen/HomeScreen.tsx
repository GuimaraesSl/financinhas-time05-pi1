import React from 'react'
import logo from '../../assets/Logo-Subtitle.svg'
import './HomeScreen.style.css'
import { useNavigate } from 'react-router-dom'

const HomePage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="container">
      <img className="logo" src={logo} alt="Financinhas" />
      <button onClick={() => navigate('/number-teams')} className="button">
        JOGAR
      </button>
    </div>
  )
}

export default HomePage
