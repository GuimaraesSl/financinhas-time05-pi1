import React, { useState, useEffect, useMemo, useRef } from 'react'
import logo from '../../assets/Logo-Subtitle.svg'
import './MatchScreen.style.css'
import { useNavigate, useParams } from 'react-router-dom'
import ExitButton from '@renderer/components/ExitButton/ExitButton'
import TeamRankingCard from './components/TeamRankingCard/TeamRankingCard'
import { Button } from '@renderer/components/Button'
import { doc } from 'firebase/firestore'
import { db } from '@renderer/firebase/firebase'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import Quiz from '@renderer/models/Quiz'
import { getQuizById } from '@renderer/firebase/quiz/quiz'
import { updateTeamHasAnswered, updateTeamPoints } from '@renderer/firebase/session/session'
import Team from '@renderer/models/Team'

const MatchScreen: React.FC = () => {
  const navigate = useNavigate()
  const { roomCode, teamName } = useParams<{ roomCode: string; teamName: string }>()

  const sessionRef = useMemo(() => {
    if (!roomCode) return null
    return doc(db, `sessions/${roomCode}`)
  }, [roomCode])

  const [session] = useDocumentData(sessionRef)
  const teams = session?.teams || []
  const sortedTeams = [...teams].sort((a, b) => b.points - a.points) as Team[]

  const [quiz, setQuiz] = useState<Quiz>()

  const [currentTeam, setCurrentTeam] = useState<Team | null>(null)

  useEffect(() => {
    if (session && teamName) {
      const foundTeam = sortedTeams.find((team) => team.name === teamName)
      setCurrentTeam(foundTeam || null)
    }
  }, [session, teamName])

  useEffect(() => {
    const loadQuiz = async (): Promise<void> => {
      try {
        const questions = await getQuizById(session?.professorId, session?.quizId)
        if (!questions) {
          throw new Error('Quiz não encontrado')
        }
        setQuiz(questions)
      } catch (err) {
        console.error(err instanceof Error ? err.message : 'Erro ao carregar o quiz')
      }
    }

    loadQuiz()
  }, [session])

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timer, setTimer] = useState<number | null>(null)
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (timer !== null && timer > 0) {
      timeoutRef.current = setTimeout(() => {
        setTimer((prevTimer) => prevTimer! - 1)
      }, 1000)
    } else if (timer === 0) {
      handleEndOfQuestion()
    }

    return (): void => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [timer])

  useEffect(() => {
    setTimer(40)
    setSelectedAlternative(null)
  }, [currentQuestionIndex])

  const handleAnswer = async (): Promise<void> => {
    if (!selectedAlternative) return
    await updateTeamHasAnswered(roomCode!, teamName!, true)
  }

  const handleEndOfQuestion = async (): Promise<void> => {
    const currentQuestion = quiz?.perguntas[currentQuestionIndex]
    const isCorrect = selectedAlternative === currentQuestion?.correta

    if (isCorrect) {
      setCorrectAnswer(true)
      await updateTeamPoints(roomCode!, teamName!, 10)
    } else {
      setCorrectAnswer(false)
    }

    setTimer(null)
    await updateTeamHasAnswered(roomCode!, teamName!, true)
    setShowJustification(true)
    setTimer(30)

    if (currentQuestionIndex < quiz!.perguntas.length - 1) {
      setTimeout(async () => {
        setShowJustification(false)
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
        await updateTeamHasAnswered(roomCode!, teamName!, false)
        setTimer(40)
        setSelectedAlternative(null)
      }, 30000)
    } else {
      setGameOver(true)
      setTimer(null)
    }
  }
  const currentQuestion = quiz?.perguntas[currentQuestionIndex]
  const alternativeColors = ['red', 'blue', 'green', 'yellow']
  const [showJustification, setShowJustification] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  return (
    <div className="matchScreenContainer">
      <header className="header">
        <img src={logo} alt="Financinhas" className="logoMatch" />
        <ExitButton onClick={() => navigate('/')} className="exitButton" />
      </header>
      <main className="game-area">
        <aside className="rankings box">
          <h2>RANKINGS</h2>
          <ul>
            {sortedTeams?.map((team, index) => (
              <TeamRankingCard key={team.name} team={team} rank={index + 1} />
            ))}
          </ul>
        </aside>

        <div className="play-area">
          <div className="box question-div">
            {gameOver ? (
              <>
                <div className="question-box">
                  <p className="question-text">
                    <strong>Fim de Jogo</strong>
                  </p>
                  <p className="question-text">Obrigado por jogar!!</p>
                </div>
              </>
            ) : (
              <>
                {showJustification ? (
                  <div className="question-box">
                    <p className="question-text" style={{ color: correctAnswer ? 'green' : 'red' }}>
                      <strong>{correctAnswer ? 'Resposta correta!' : 'Resposta errada!'}</strong>
                    </p>
                    <p className="question-text">{currentQuestion?.justificativa}</p>
                  </div>
                ) : (
                  <p className="question-text">{currentQuestion?.enunciado}</p>
                )}
              </>
            )}
            <div className="timer box">
              <span>
                {timer !== null
                  ? `${Math.floor(timer / 60)
                      .toString()
                      .padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`
                  : '00:00'}
              </span>
            </div>
          </div>

          <section className="box alternative-area">
            <span
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: '24px',
                marginBottom: '10px'
              }}
            >
              ALTERNATIVAS
            </span>
            <div className="alternatives">
              {currentQuestion?.alternativas.map((alternative, index) => (
                <button
                  key={index}
                  className={`alternative-btn ${alternativeColors[index % alternativeColors.length]} ${
                    selectedAlternative === alternative ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedAlternative(alternative)}
                  disabled={currentTeam?.hasAnswered || timer === null}
                >
                  <span className="alt-label">{String.fromCharCode(65 + index)}.</span>{' '}
                  {alternative}
                </button>
              ))}
            </div>
            <Button
              disabled={currentTeam?.hasAnswered}
              onClick={handleAnswer}
              style={{ height: '60px', marginBottom: '20px' }}
            >
              {currentTeam?.hasAnswered ? 'RESPONDIDO!' : 'RESPONDER'}
            </Button>
          </section>
        </div>
      </main>
      <footer className="footer">
        <p>Código da sala: {roomCode}</p>
      </footer>
    </div>
  )
}

export default MatchScreen
