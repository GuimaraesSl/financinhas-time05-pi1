import React from 'react'
import EditIcon from '../../../assets/edit-icon.svg'
import DeleteIcon from '../../../assets/delete-icon.svg'
import irIcon from '../../../assets/ir-icon.svg'
import ribbonIcon from '../../../assets/ribbon-icon.svg'
import { useNavigate } from 'react-router-dom'
import './QuizzesCard.style.css'

interface Quizzes {
  id: string
  quizzes: string
  answer: string
}

interface QuizzesCardProps {
  quizzes: Quizzes
  onDelete?: (id: string) => void
  onEdit?: (id: string) => void
}

const QuizzesCard: React.FC<QuizzesCardProps> = ({ quizzes, onDelete }) => {
  const navigate = useNavigate()
  return (
    <div className="card">
      <div className="ribbonFAB">
        <img src={ribbonIcon} alt="Ícone de Ir para a sala" />
      </div>
      <div className="content">
        <h3 className="question">{quizzes.quizzes}</h3>
        <div className="answerContainer">
          <p className="answer">{quizzes.answer}</p>
        </div>
      </div>
      <div className="actions">
        <button className="goIcon" onClick={() => navigate(`/config/${quizzes.id}`)}>
          <img src={irIcon} alt="Ícone de Ir para a sala" />
        </button>
        <button className="editButton" onClick={() => navigate(`/teacher-question/${quizzes.id}`)}>
          <img src={EditIcon} alt="Ícone lápis" />
        </button>
        <button className="deleteButton" onClick={() => onDelete && onDelete(quizzes.id)}>
          <img src={DeleteIcon} alt="Ícone lixeira" />
        </button>
      </div>
    </div>
  )
}

export default QuizzesCard
