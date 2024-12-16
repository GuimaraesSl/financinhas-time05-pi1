import React from 'react'
import logo from '../../assets/Logo-Subtitle.svg'
import './ChoiceScreen.style.css'
import { Button } from '@renderer/components/Button/index'
import { useNavigate } from 'react-router-dom'

const ChoiceScreen: React.FC = () => {
  const navigate = useNavigate()

  const handlePlayClick = (teamName: string): void => {
    navigate(`/matchScreen/${teamName}`)
  }

  //FIX: Change route after.
  return (
    <div className="container">
      <img className="logo" src={logo} alt="Financinhas" />
      <div className="choiceContainer">
        <p className="question-text">Você é um...</p>
        <Button
          onClick={() => handlePlayClick('Maçã')}
          className="button"
          style={{ backgroundColor: '#13BB0A', borderColor: '#00570A' }}
        >
          Sou Aluno
        </Button>
        <Button
          onClick={() => handlePlayClick('Maçã')}
          className="button"
          style={{ backgroundColor: '#13BB0A', borderColor: '#00570A' }}
        >
          Sou Professor
        </Button>
      </div>
    </div>
  )
}

export default ChoiceScreen
