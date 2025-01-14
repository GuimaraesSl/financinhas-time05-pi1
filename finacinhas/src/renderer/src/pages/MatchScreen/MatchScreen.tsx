import React, { useState, useEffect } from 'react'
import logo from '../../assets/Logo-Subtitle.svg'
import './MatchScreen.style.css'
import { useNavigate } from 'react-router-dom'
import ExitButton from '@renderer/components/ExitButton/ExitButton'
import Team from '@renderer/models/Team'
import TeamRankingCard from './components/TeamRankingCard/TeamRankingCard'
import { Button } from '@renderer/components/Button'

interface Alternative {
  arg: string
}

interface Quest {
  quest: string
  alternatives: Alternative[]
  correctAlternative: Alternative
  timeToRespond: number
}

interface Match {
  code: string
  playingTeams: Team[]
  questions: Quest[]
}

const MatchScreen: React.FC<{ localTeamName?: string }> = ({ localTeamName }) => {
  const navigate = useNavigate()
  const [match, setMatch] = useState<Match | null>(() => ({
    code: '123abc',
    playingTeams: [
      { value: 'maca', name: 'Maçã', points: 40, hasAnswered: false },
      { value: 'agua', name: 'Água', points: 16, hasAnswered: false },
      { value: 'folha', name: 'Folha', points: 10, hasAnswered: false }
    ],
    questions: [
      {
        quest: 'Por que é importante economizar dinheiro?',
        alternatives: [
          { arg: 'Para comprar mais brinquedos.' },
          { arg: 'Para gastar com coisas que você quer, como videogames e roupas.' },
          { arg: 'Para garantir que você tenha dinheiro quando precisar no futuro.' },
          { arg: 'Para gastar todo o dinheiro de uma vez.' }
        ],
        correctAlternative: {
          arg: 'Para garantir que você tenha dinheiro quando precisar no futuro.'
        },
        timeToRespond: 90
      },
      {
        quest: 'Qual é a diferença entre necessidade e desejo?',
        alternatives: [
          { arg: 'Necessidade é o que você quer, e desejo é o que você precisa.' },
          {
            arg: 'Necessidade é algo essencial para a vida, e desejo é algo que você quer, mas não precisa.'
          },
          { arg: 'Necessidade é o que você compra, e desejo é o que você ganha de presente.' },
          { arg: 'Necessidade e desejo são a mesma coisa.' }
        ],
        correctAlternative: {
          arg: 'Necessidade é algo essencial para a vida, e desejo é algo que você quer, mas não precisa.'
        },
        timeToRespond: 90
      }
    ]
  }))
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timer, setTimer] = useState<number | null>(null)
  const [selectedAlternative, setSelectedAlternative] = useState<Alternative | null>(null) // Nova linha

  const localTeam = match?.playingTeams.find((team) => team.value === localTeamName)

  useEffect(() => {
    if (timer !== null && timer > 0) {
      const timeout = setTimeout(() => setTimer(timer - 1), 1000)
      return (): void => clearTimeout(timeout)
    } else if (timer === 0) {
      handleEndOfQuestion()
    }
  }, [timer])

  useEffect(() => {
    setTimer(match!.questions[currentQuestionIndex].timeToRespond)
    setSelectedAlternative(null)
  }, [currentQuestionIndex])

  const handleAnswer = (): void => {
    const currentQuestion = match!.questions[currentQuestionIndex]

    if (!selectedAlternative) return

    const isCorrect = selectedAlternative.arg === currentQuestion.correctAlternative.arg

    if (isCorrect) {
      alert('Resposta Correta')
    } else {
      alert('Resposta Errada')
    }

    const updatedTeams = match!.playingTeams.map((team) =>
      team.name === localTeamName
        ? { ...team, points: isCorrect ? team.points + 1 : team.points, hasAnswered: true }
        : team
    )

    setMatch({
      ...match!,
      playingTeams: updatedTeams
    })

    if (updatedTeams.every((team) => team.hasAnswered)) {
      handleEndOfQuestion()
    }
  }

  const handleEndOfQuestion = (): void => {
    setTimer(null) // Para o cronômetro

    if (currentQuestionIndex < match!.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
      setMatch({
        ...match!,
        playingTeams: match!.playingTeams.map((team) => ({ ...team, hasAnswered: false }))
      })
    }
  }

  const currentQuestion = match?.questions[currentQuestionIndex]

  const sortedTeams = match?.playingTeams.sort((a, b) => b.points - a.points)

  const alternativeColors = ['red', 'blue', 'green', 'yellow']

  return (
    <div className="matchScreenContainer">
      <header className="header">
        <img src={logo} alt="Financinhas" className="logoMatch" />
        {/* TODO: Make logic in exit button. */}
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
            <p className="question-text">{currentQuestion?.quest}</p>
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
              {currentQuestion?.alternatives.map((alternative, index) => (
                <button
                  key={index}
                  className={`alternative-btn ${alternativeColors[index % alternativeColors.length]} ${
                    selectedAlternative === alternative ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedAlternative(alternative)}
                  disabled={localTeam!.hasAnswered || timer === null}
                >
                  <span className="alt-label">{String.fromCharCode(65 + index)}.</span>{' '}
                  {alternative.arg}
                </button>
              ))}
            </div>
            <Button onClick={handleAnswer} style={{ height: '60px', marginBottom: '20px' }}>
              {localTeam!.hasAnswered ? 'RESPONDIDO!' : 'RESPONDER'}
            </Button>
          </section>
        </div>
      </main>
      <footer className="footer">
        <p>Código da sala: {match?.code}</p>
      </footer>
    </div>
  )
}

export default MatchScreen
