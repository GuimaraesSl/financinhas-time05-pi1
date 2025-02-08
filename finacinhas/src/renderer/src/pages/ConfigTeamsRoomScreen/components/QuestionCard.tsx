import React from 'react'
import EditIcon from '../../../assets/edit-icon.svg'
import DeleteIcon from '../../../assets/delete-icon.svg'
import IconeChat from '../../../assets/icon-chat.svg'
import irIcon from '../../../assets/ir-icon.svg'
import ribbonIcon from '../../../assets/ribbon-icon.svg'
import { useNavigate } from 'react-router-dom'
import './QuestionCard.style.css'

interface Question {
  id: number
  question: string
  answer: string
}

interface QuestionCardProps {
  question: Question
  onDelete?: (id: number) => void
  onEdit?: (id: number) => void
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onDelete }) => {
  const navigate = useNavigate()
  return (
    <div className="card" onClick={()=> navigate('/number-teams')}>
      <div className="ribbonFAB">
      <img src={ribbonIcon} alt="Ícone de Ir para a sala" />
      </div>
      <div className="content">
        <h3 className="question">{question.question}</h3>
        <div className="answerContainer">
          <p className="answer">{question.answer}</p>
        </div>
      </div>
      <div className="actions">
      <button className="goIcon" onClick={() => navigate('/edit-questions')}>
          <img src={irIcon} alt="Ícone de Ir para a sala" />
        </button>
        <button className="editButton" onClick={() => navigate('/edit-questions')}>
          <img src={EditIcon} alt="Ícone lápis" />
        </button>
        <button className="deleteButton" onClick={() => onDelete && onDelete(question.id)}>
          <img src={DeleteIcon} alt="Ícone lixeira" />
        </button>
      </div>
    </div>
  )
}

export default QuestionCard
