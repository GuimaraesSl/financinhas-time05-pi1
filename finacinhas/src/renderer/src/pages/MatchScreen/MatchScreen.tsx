import React, { useState, useEffect } from 'react'
import logo from '../../assets/Logo-Subtitle.svg'
import './MatchScreen.style.css'
import ExitIcon from './components/ExitIcon'
interface Team {
  name: string
  points: number
  hasAnswered: boolean
}

interface Alternative {
  arg: string
}

interface Answear {
  question: string
  alternatives: Alternative[]
  correctAlternative: Alternative
  timeToRespond: number
}

interface Match {
  name: string
  playingTeams: Team[]
  answears: Answear[]
}

const MatchScreen: React.FC<{ localTeamName: string }> = ({ localTeamName }) => {
  const [match, setMatch] = useState<Match | null>({
    name: '123abc',
    playingTeams: [
      { name: 'Maçã', points: 40, hasAnswered: false },
      { name: 'Água', points: 16, hasAnswered: false },
      { name: 'Folha', points: 10, hasAnswered: false }
    ],
    answears: [
      {
        question: 'Qual é a capital da França?',
        alternatives: [{ arg: 'Paris' }, { arg: 'Londres' }, { arg: 'Berlim' }, { arg: 'Roma' }],
        correctAlternative: { arg: 'Paris' },
        timeToRespond: 90 // segundos
      }
    ]
  })
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timer, setTimer] = useState<number | null>(null)
  const [selectedAlternative, setSelectedAlternative] = useState<Alternative | null>(null) // Nova linha

  const localTeam = match?.playingTeams.find((team) => team.name === localTeamName)

  useEffect(() => {
    if (timer !== null && timer > 0) {
      const timeout = setTimeout(() => setTimer(timer - 1), 1000)
      return (): void => clearTimeout(timeout)
    } else if (timer === 0) {
      handleEndOfQuestion()
    }
  }, [timer])

  useEffect(() => {
    setTimer(match!.answears[currentQuestionIndex].timeToRespond)
    setSelectedAlternative(null) // Reseta a alternativa selecionada ao mudar de pergunta
  }, [currentQuestionIndex])

  const handleAnswer = (): void => {
    const currentQuestion = match!.answears[currentQuestionIndex]

    if (!selectedAlternative) return // Proteção extra contra cliques sem seleção

    const isCorrect = selectedAlternative.arg === currentQuestion.correctAlternative.arg

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

    if (currentQuestionIndex < match!.answears.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
      setMatch({
        ...match!,
        playingTeams: match!.playingTeams.map((team) => ({ ...team, hasAnswered: false }))
      })
    }
  }

  const getTeamIcon = (teamName: string): JSX.Element => {
    switch (teamName) {
      case 'Maçã':
        return <img src="/assets/icons/apple.svg" alt="Maçã" className="team-svg-icon" />
      case 'Água':
        return <img src="/assets/icons/water.svg" alt="Água" className="team-svg-icon" />
      case 'Folha':
        return <img src="/assets/icons/leaf.svg" alt="Folha" className="team-svg-icon" />
      default:
        return <img src="/assets/icons/default.svg" alt="Desconhecido" className="team-svg-icon" />
    }
  }

  const currentQuestion = match?.answears[currentQuestionIndex]

  if (!match || !localTeam) return <p>Equipe não encontrada!</p>

  const medalTypes = ['gold', 'silver', 'bronze']
  const teamsWithMedals = match.playingTeams
    .slice()
    .sort((a, b) => b.points - a.points)
    .map((team, index) => ({
      ...team,
      medal: index < 3 ? medalTypes[index] : 'none'
    }))

  const alternativeColors = ['red', 'blue', 'green', 'yellow']

  return (
    <div className="matchScreenContainer">
      <header className="header">
        <img src={logo} alt="Financinhas" className="logo matchLogo" />
        {/* TODO: Make logic in exit button. */}
        <button className="exit-button">
          SAIR <ExitIcon color="black" width={24} height={24} />
        </button>
      </header>
      <main className="game-area">
        <aside className="rankings box">
          <h2>RANKINGS</h2>

          <ul>
            {teamsWithMedals.map((team) => (
              <li key={team.name} className={`team team-${team.medal}`}>
                <div className="team-icon">{getTeamIcon(team.name)}</div>
                <div className="team-info">
                  <p className="team-name">Equipe {team.name}</p>
                  <p className="team-points">{team.points} pontos</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        <div className="playArea">
          <div className="box question-div">
            <p className="question-text">{currentQuestion?.question}</p>
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

          <section className="box question-area">
            <span
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: '24px',
                marginBottom: '16px'
              }}
            >
              ALTERNATIVAS
            </span>
            <div className="alternatives">
              {currentQuestion?.alternatives.map((alternative, index) => (
                <button
                  key={index}
                  className={`alternative-btn ${alternativeColors[index % alternativeColors.length]} ${selectedAlternative === alternative ? 'selected' : ''
                    }`}
                  onClick={() => setSelectedAlternative(alternative)} // Define a alternativa selecionada
                  disabled={localTeam!.hasAnswered || timer === null}
                >
                  <span className="alt-label">{String.fromCharCode(65 + index)}.</span>{' '}
                  {alternative.arg}
                </button>
              ))}
            </div>
            <button
              className="submit-button"
              onClick={handleAnswer}
              disabled={!selectedAlternative || localTeam!.hasAnswered || timer === null} // Botão só habilita se algo for selecionado
            >
              {localTeam!.hasAnswered ? 'RESPONDIDO!' : 'RESPONDER'}
            </button>
          </section>
        </div>
      </main>
      <footer className="footer">
        <p>Código da sala: {match.name}</p>
      </footer>
    </div>
  )
}

export default MatchScreen
