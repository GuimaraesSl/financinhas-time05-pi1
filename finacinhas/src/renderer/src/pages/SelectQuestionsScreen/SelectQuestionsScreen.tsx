import React from 'react'
import logo from '../../assets/Logo-Subtitle.svg'
import '../SelectQuestionsScreen/SelectQuestionsScreen.style.css'
import { useNavigate } from 'react-router-dom'

const SelectQuestionsScreen: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="containerSelectQuestionsScreen">
      <header className="headerSelectQuestionsScreen">
        <img src={logo} className="logoSelectQuestionsScreen" alt="logo" />
      </header>
      <main className="mainProfileSelectScreen">
        <h2 className="titlePage">Você deseja usar as nossas perguntas?</h2>
        <button onClick={() => navigate('/login')} className="profileButton">
        VER PERGUNTAS PRÉ-DEFINIDAS
        </button>
        <button onClick={() => navigate('/login')} className="profileButton">
        ADICIONAR OUTRAS PERGUNTAS
        </button>
      </main>
    </div>
  )
}

export default SelectQuestionsScreen