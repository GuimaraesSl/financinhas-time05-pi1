import React from 'react';
import EditIcon from '../../../assets/edit-icon.svg';
import DeleteIcon from '../../../assets/delete-icon.svg';
import IconeChat from '../../../assets/icon-chat.svg';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  question: string;
  answer: string;
  justification: string;
}

interface QuestionCardProps {
  question: Question;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onDelete}) => {
  const navigate = useNavigate();
  return (
    <div style={styles.card}>
      <div style={styles.content}>
        <h3 style={styles.question}>{question.question}</h3>
        <div style={styles.answerContainer}>
          <img src={IconeChat} alt="Ícone Chat" style={styles.chatIcon} />
          <p style={styles.answer}>{question.answer}</p>
        </div>
      </div>
      <div style={styles.actions}>
        <button style={styles.editButton} onClick={() => navigate('/edit-questions')}>
          <img src={EditIcon} alt="Ícone lápis" />
        </button>
        <button style={styles.deleteButton} onClick={() => onDelete && onDelete(question.id)}>
          <img src={DeleteIcon} alt="Ícone lixeira" />
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#F3F3F3', // Aplicando a cor de fundo apenas ao conteúdo
    borderRadius: '8px',
    padding: '16px',
    flex: 1,
  },
  question: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  answerContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  answer: {
    fontSize: '14px',
    color: '#555',
    marginRight: '8px',
  },
  chatIcon: {
    width: '20px',
    height: '20px',
  },
  justification: {
    fontSize: '14px',
    color: '#777',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginLeft: '16px',
  },
  editButton: {
    backgroundColor: '#fff',
    border: '5px solid',
    borderColor: 'grey',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    border: 'none',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default QuestionCard;