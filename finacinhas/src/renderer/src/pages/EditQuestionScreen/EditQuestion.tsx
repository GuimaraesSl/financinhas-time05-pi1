import React from 'react'
import { useNavigate } from 'react-router-dom'
import './EditQuestion.style.css'
import InputField from '../../components/InputField/InputField'
import logo from '../../assets/Logo-Subtitle.svg'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { MdClose } from 'react-icons/md'

const EditQuestion: React.FC = () => {
  const navigate = useNavigate()

  const [question, setQuestion] = React.useState('')
  const [answer, setAnswer] = React.useState('')
  const [wrongAnswer1, setWrongAnswer1] = React.useState('')
  const [wrongAnswer2, setWrongAnswer2] = React.useState('')
  const [wrongAnswer3, setWrongAnswer3] = React.useState('')
  const [justification, setJustification] = React.useState('')

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
                navigate('/teacher-question')
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (!question || !answer || !wrongAnswer1 || !wrongAnswer2 || !wrongAnswer3 || !justification) {
      alert('Por favor, preencha todos os campos!')
      return
    }

    console.log('Question edited successfully')
    navigate('/teacher-question')
  }

  return (
    <div className="containerEditQuestionScreen">
      <header className="headerEditQuestionScreen">
        <img src={logo} className="logoEditQuestionScreen" alt="Logo Financinhas" />
      </header>
      <main className="mainEditQuestionScreen">
        <h1 className="titleEditQuestionScreen">EDITAR PERGUNTA</h1>
        <form className="formEditQuestionScreen" onSubmit={handleSubmit}>
          <div className="inputField">
            <InputField
              id="question"
              name="question"
              label="Pergunta"
              type="text"
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value),
                console.log('Question:', question)
              }
            }
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

export default EditQuestion