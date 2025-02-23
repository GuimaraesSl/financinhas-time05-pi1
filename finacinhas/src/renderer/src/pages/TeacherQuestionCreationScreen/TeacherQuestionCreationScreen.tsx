import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { listQuestionsFromQuiz, removeQuestionFromQuiz } from '@renderer/firebase/quiz/quiz'
import QuestionCard from './components/QuestionCard'
import backIcon from '../../assets/back-icon.svg'
import logo from '../../assets/Logo-Subtitle.svg'
import './TeacherQuestionCreationScreen.style.css'
import Pergunta from '@renderer/models/Pergunta'
import { useAuth } from '@renderer/contexts/authContext'

const TeacherQuestionCreationScreen: React.FC = () => {
  const navigate = useNavigate()
  const { userId } = useAuth()
  const quizId = useParams().quizId
  const [perguntas, setPerguntas] = useState<Pergunta[]>([])

  // Função auxiliar para remover aspas simples ou duplas do início e fim da string
  const cleanText = (text: string): string => {
    return text.replace(/^['"]+|['"]+$/g, '')
  }

  useEffect(() => {
    console.log('Parâmetros recebidos:', { userId, quizId })

    if (!userId) {
      console.error('Erro: userId não está definido!')
      return
    }

    if (!quizId) {
      console.error('Erro: quizId não está definido!')
      return
    }

    const fetchQuestions = async (): Promise<void> => {
      try {
        const questionsList = await listQuestionsFromQuiz(userId, quizId)
        setPerguntas(questionsList)
        console.log('Perguntas:', questionsList)
      } catch (error) {
        console.error('Erro ao buscar perguntas:', error)
      }
    }

    fetchQuestions()
  }, [userId, quizId])

  const handleDeleteQuestion = async (enunciado: string): Promise<void> => {
    if (!userId || !quizId) {
      console.error('ID do professor ou do quiz não encontrado!')
      return
    }
    const isConfirmed = window.confirm('Tem certeza que deseja excluir esta pergunta?')
    if (!isConfirmed) return

    try {
      await removeQuestionFromQuiz(userId, quizId, enunciado)

      // Atualiza o estado para refletir a remoção sem precisar recarregar a tela
      setPerguntas((prevPerguntas) => prevPerguntas.filter((p) => p.enunciado !== enunciado))

      console.log('Pergunta removida com sucesso!')
    } catch (error) {
      console.error('Erro ao remover pergunta:', error)
    }
  }

  return (
    <div className="containerTeacherQuestionScreen">
      <header className="headerTeacherQuestionScreen">
        <button className="backButtonQuestionScreen" onClick={() => navigate('/select-questions')}>
          <img src={backIcon} alt="icone voltar" className="backIcon" />
          VOLTAR
        </button>
        <img src={logo} className="logoTeacherQuestionScreen" alt="logo" />
      </header>
      <main className="mainTeacherQuestionScreen">
        <div className="registeredQuestions">
          <div className="sectionHeader">
            <h2 className="titleRegisteredQuestion">SUAS PERGUNTAS CADASTRADAS</h2>
            <button
              className="buttonAddQuestion"
              onClick={() => navigate(`/question-creation/${quizId}`)}
            >
              ADICIONAR PERGUNTA
            </button>
          </div>
          {perguntas.length > 0 ? (
            perguntas.map((pergunta, index) => {
              const enunciado = cleanText(
                pergunta.enunciado ||
                  (pergunta as { enuciado?: string }).enuciado ||
                  'Sem enunciado'
              )
              const correta = cleanText(pergunta.correta || pergunta['correta: '] || 'Sem resposta')
              const justificativa = cleanText(pergunta.justificativa || 'Sem justificativa')
              const id = cleanText(pergunta.id || 'Sem ID')

              return (
                <QuestionCard
                  key={index}
                  question={{
                    id,
                    enunciado,
                    correta,
                    justificativa
                  }}
                  onDelete={() => handleDeleteQuestion(pergunta.enunciado)}
                />
              )
            })
          ) : (
            <p>Nenhuma pergunta cadastrada.</p>
          )}
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
