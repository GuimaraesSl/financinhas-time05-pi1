import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@renderer/contexts/authContext'
import { listQuizzesByProfessor } from '@renderer/firebase/quiz/quiz'
import Header from '../../components/Header/Header'
import QuizzesCard from './components/QuizzesCard'
import Quiz from '@renderer/models/Quiz'
import Mais from '../../assets/icon+.svg'
import { createQuiz } from '@renderer/firebase/quiz/quiz' // Importando a função createQuiz
import './ConfigTeamRoomScreen.style.css'
import '../ProfileSelect/ProfileSelectScreen.styles.css'

const ConfigTeamRoomScreen: React.FC = () => {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [profileName, setProfileName] = useState<string | null>(null)
  const [showCreateQuizForm, setShowCreateQuizForm] = useState(false)
  const [newQuiz, setNewQuiz] = useState<Quiz>({ id: '', titulo: '', descricao: '', perguntas: [] })
  useEffect(() => {
    const fetchQuizzes = async (): Promise<void> => {
      if (!currentUser) {
        setLoading(false)
        return
      }
      try {
        const quizzesList = await listQuizzesByProfessor(currentUser.uid)
        setQuizzes(quizzesList)
      } catch (error) {
        console.error('Erro ao listar quizzes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuizzes()
  }, [currentUser])

  useEffect(() => {
    if (currentUser) {
      setProfileName(currentUser.displayName || 'Usuário')
    }
  }, [currentUser])

  if (loading) {
    return <div>Carregando...</div>
  }

  const handleLogout = async (): Promise<void> => {
    await logout()
    navigate('/')
    alert('Usuário Desconectado')
  }

  const handleCreateQuizSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    if (!newQuiz.titulo || !newQuiz.descricao) {
      alert('Por favor, preencha todos os campos!')
      return
    }
    try {
      if (currentUser) {
        const createdQuiz = await createQuiz(currentUser.uid, newQuiz)
        setQuizzes([...quizzes, createdQuiz])
        setShowCreateQuizForm(false)
        if (createdQuiz.id) {
          navigate(`/teacher-question/${createdQuiz.id}`)
        } else {
          console.error('Erro: ID do quiz não definido.')
        }
      }
    } catch (error) {
      console.error('Erro ao criar o quiz:', error)
    }
  }

  return (
    <div className="containerConfigTeamRoomScreen">
      <Header profileName={profileName || 'Usuário'} onExit={() => handleLogout()} />
      <main className="mainConfigTeamRoomScreen">
        <div className="registeredConfigTeamRooms">
          <div className="sectionHeaderConfigTeamRoomScreen">
            <h2 className="titleRegisteredTeamRoom">SEUS JOGOS CADASTRADOS</h2>
            <button className="buttonAddTeamRoom" onClick={() => setShowCreateQuizForm(true)}>
              <img src={Mais} alt="Adicionar Jogo" />
              ADICIONAR JOGO
            </button>
          </div>

          {showCreateQuizForm && (
            <div className="modal">
              <div className="modalContent">
                <h2>Criar Novo Jogo</h2>
                <form onSubmit={handleCreateQuizSubmit} className="createQuizForm">
                  <div>
                    <label htmlFor="titulo">Título do Jogo</label>
                    <input
                      type="text"
                      id="titulo"
                      value={newQuiz.titulo}
                      onChange={(e) => setNewQuiz({ ...newQuiz, titulo: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="descricao">Descrição do Jogo</label>
                    <input
                      type="text"
                      id="descricao"
                      value={newQuiz.descricao}
                      onChange={(e) => setNewQuiz({ ...newQuiz, descricao: e.target.value })}
                      required
                    />
                  </div>
                  <div className="buttonGroup">
                    <button type="submit">Criar Jogo</button>
                    <button type="button" onClick={() => setShowCreateQuizForm(false)}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {quizzes.map((quiz) => (
            <QuizzesCard
              key={quiz.id}
              quizzes={{
                id: quiz.id || '',
                quizzes: quiz.titulo,
                answer: quiz.descricao
              }}
            />
          ))}
        </div>
      </main>
      <footer className="footerConfigTeamRoomScreen" />
    </div>
  )
}

export default ConfigTeamRoomScreen
