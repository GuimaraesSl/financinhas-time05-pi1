import React from 'react'
import logo from '../../assets/Logo-Subtitle.svg'
import './HomeScreen.style.css'
import { Button } from '@renderer/components/Button/index'
import { useNavigate } from 'react-router-dom'

const HomePage: React.FC = () => {
  const navigate = useNavigate()

  const handlePlayClick = (): void => {
    navigate('/profile-select')
  }

  return (
    <div className="container">
      <img className="logoHome" src={logo} alt="Financinhas" />
      <Button
        onClick={handlePlayClick}
        className="button"
        style={{ backgroundColor: '#13BB0A', borderColor: '#00570A' }}
      >
        JOGAR
      </Button>
    </div>
  )
}

export default HomePage
