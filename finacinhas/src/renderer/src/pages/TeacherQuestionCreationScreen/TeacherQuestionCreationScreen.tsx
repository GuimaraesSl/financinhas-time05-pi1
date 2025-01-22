import React from 'react'
import logo from '../../assets/Logo-Subtitle.svg'
import '../ProfileSelect/ProfileSelectScreen.styles.css'
import { useNavigate } from 'react-router-dom'
import './TeacherQuestionCreationScreen.style.css'
import QuestionCard from './components/QuestionCard'
import backIcon from '../../assets/back-icon.svg'

const TeacherQuestionCreationScreen: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="containerTeacherQuestionScreen">
      <header className="headerTeacherQuestionScreen">
        <button className="backButtonQuestionScreen" onClick={() => navigate('/number-teams')}>
          <img src={backIcon} alt="icone voltar" className="backIcon" />
          VOLTAR
        </button>
        <img src={logo} className="logoTeacherQuestionScreen" alt="logo" />
      </header>
      <main className="mainTeacherQuestionScreen">
        <div className="registeredQuestions">
          <div className="sectionHeader">
            <h2 className="titleResgiteredQuestion">SUAS PERGUNTAS CADASTRADAS</h2>
            <button className="buttonAddQuestion" onClick={() => navigate('/question-creation')}>ADICIONAR PERGUNTA</button>
          </div>
          <QuestionCard
            question={{
              id: 1,
              question: 'Sample Question',
              answer: 'Sample Answer',
              justification: 'Sample Justification'
            }}
          ></QuestionCard>
          <div className="sectionHeader">
            <h2 className="titleResgisteredQuestion">PERGUNTAS PRÉ DEFINIDAS</h2>
          </div>
          <QuestionCard
              question={{
                id: 2,
                question: 'Pré definida 1',
                answer: 'Pré definida',
                justification: 'Pré definida'
              }}
            ></QuestionCard>
            <QuestionCard
              question={{
                id: 3,
                question: 'Pré definida 2',
                answer: 'Pré definida',
                justification: 'Pré definida'
              }}
            ></QuestionCard>
        </div>
      </main>
      <footer className="footerQuestionScreen">
        <button className="buttonQuestionScreen" onClick={() => navigate('/config')}>
          TUDO CERTO, CONTINUAR
        </button>
      </footer>
    </div>
  )
}

export default TeacherQuestionCreationScreen
