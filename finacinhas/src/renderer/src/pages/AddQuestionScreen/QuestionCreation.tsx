import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './QuestionCreation.style.css'
import InputField from '../../components/InputField/InputField'
import logo from '../../assets/Logo-Subtitle.svg'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { MdClose } from 'react-icons/md'
import { addQuestionToQuiz } from '@renderer/firebase/quiz/quiz'
import Pergunta from '@renderer/models/Pergunta'
import { useAuth } from '@renderer/contexts/authContext'

const QuestionCreation: React.FC = () => {
  const navigate = useNavigate()
  const professorId = useAuth().userId
  const quizId = useParams().quizId

  const [question, setQuestion] = React.useState('')
  const [answer, setAnswer] = React.useState('')
  const [wrongAnswer1, setWrongAnswer1] = React.useState('')
  const [wrongAnswer2, setWrongAnswer2] = React.useState('')
  const [wrongAnswer3, setWrongAnswer3] = React.useState('')
  const [justification, setJustification] = React.useState('')

  React.useEffect(() => {
    console.log('quizId:', quizId)
    console.log('userId:', professorId)
  }, [quizId, professorId])

  const handleBack = (): void => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="custom-ui">
          <button className="closeButton" onClick={onClose}>
            <MdClose size={32} />
          </button>
          <h1>Cancelar e voltar</h1>
          <p>
            Tem certeza?
            <br />
            As edições feitas não serão salvas.
          </p>
          <div className="buttonGroup">
            <button
              onClick={() => {
                navigate(`/teacher-question/${quizId}`)
                onClose()
              }}
            >
              CANCELAR E VOLTAR
            </button>
          </div>
        </div>
      )
    })
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (!quizId) {
      alert('ID do quiz não encontrado!')
      return
    }

    if (!question || !answer || !wrongAnswer1 || !wrongAnswer2 || !wrongAnswer3 || !justification) {
      alert('Por favor, preencha todos os campos!')
      return
    }

    const novaPergunta: Pergunta = {
      id: `${Date.now()}`, // Gerar um ID único para a pergunta
      enunciado: question,
      alternativas: [answer, wrongAnswer1, wrongAnswer2, wrongAnswer3],
      correta: answer,
      justificativa: justification
    }

    try {
      await addQuestionToQuiz(professorId!, quizId!, novaPergunta)
      alert('Pergunta criada com sucesso!')
      navigate(`/teacher-question/${quizId}`)
    } catch (error) {
      console.error('Erro ao criar pergunta:', error)
      alert('Não foi possível criar a pergunta.')
    }
  }
  return (
    <div className="containerQuestionScreen">
      <header className="headerQuestionScreen">
        <img src={logo} className="logoQuestionScreen" alt="Logo Financinhas" />
      </header>
      <main className="mainQuestionScreen">
        <h1 className="titleQuestionScreen">ADICIONAR PERGUNTA</h1>
        <form className="formQuestionScreen" onSubmit={handleSubmit}>
          <div className="inputField">
            <InputField
              id="question"
              name="question"
              label="Pergunta"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div className="inputFieldsContainer">
            <InputField
              id="answer"
              name="answer"
              label="Resposta Correta"
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <InputField
              id="wrongAnswer1"
              name="wrongAnswer1"
              label="Alternativa Errada 1"
              type="text"
              value={wrongAnswer1}
              onChange={(e) => setWrongAnswer1(e.target.value)}
            />
          </div>
          <div className="inputFieldsContainer">
            <InputField
              id="wrongAnswer2"
              name="wrongAnswer2"
              label="Alternativa Errada 2"
              type="text"
              value={wrongAnswer2}
              onChange={(e) => setWrongAnswer2(e.target.value)}
            />
            <InputField
              id="wrongAnswer3"
              name="wrongAnswer3"
              label="Alternativa Errada 3"
              type="text"
              value={wrongAnswer3}
              onChange={(e) => setWrongAnswer3(e.target.value)}
            />
          </div>
          <div className="inputField">
            <label htmlFor="justification">Justificativa</label>
            <textarea
              id="justification"
              name="justification"
              className="textareaJustification"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
            />
          </div>
          <div className="buttonContainer">
            <button className="buttonSave" type="submit">
              SALVAR EDIÇÃO
            </button>
            <button className="buttonCancel" type="button" onClick={handleBack}>
              CANCELAR E VOLTAR
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
export default QuestionCreation
