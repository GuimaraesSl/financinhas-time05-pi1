import { FC, useState, useEffect, useRef } from 'react'
import Header from '../../components/Header/Header'
import { useNavigate, useParams } from 'react-router-dom'
import './TeacherViewRanking.style.css'
import { useAuth } from '@renderer/contexts/authContext'
import Timer from '../../assets/timer.svg'
import playPause from '../../assets/playPause.svg'
import first from '../../assets/primeiro.svg'
import second from '../../assets/segundo.svg'
import third from '../../assets/terceiro.svg'
import fourth from '../../assets/quarto.svg'
import fifth from '../../assets/quinto.svg'
import TeamCard from './components/TeamCard'
import Team from '../../models/Team'

const TeacherViewRanking: FC = () => {
  const [profileName, setProfileName] = useState<string | null>(null)
  const { currentUser, logout } = useAuth()
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const { roomCode } = useParams()

  const teams: Team[] = [
    {
      name: 'Equipe Folha',
      points: 10
    },
    {
      name: 'Equipe Água',
      points: 30
    },
    {
      name: 'Equipe Maçã',
      points: 50
    },
    {
      name: 'Equipe Gato',
      points: 40
    },
    {
      name: 'Equipe Cachorro',
      points: 70
    }
  ]

  const sortedTeams = [...teams].sort((a, b) => b.points - a.points)

  const getMedalImage = (index: number): string => {
    switch (index) {
      case 0:
        return first
      case 1:
        return second
      case 2:
        return third
      case 3:
        return fourth
      case 4:
        return fifth
      default:
        return fifth
    }
  }

  const startGame = (): void => {
    setIsGameStarted(!isGameStarted)
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      setProfileName(currentUser.displayName || 'Usuário')
    }
  }, [currentUser])

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isGameStarted) {
      timerRef.current = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1)
      }, 1000)
    } else if (!isGameStarted && timeElapsed !== 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    return (): void => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isGameStarted, timeElapsed])

  const handleLogout = async (): Promise<void> => {
    await logout()
    navigate('/')
    alert('Sessão encerrada com sucesso!')
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  return (
    <div className="containerTeacherViewRanking">
      <Header profileName={profileName || 'Usuário'} onExit={() => handleLogout}></Header>
      <main className="mainTeacherViewRanking">
        <div className="infoRanking">
          <div className="codTurma">
            CÓDIGO DA TURMA: <strong>{roomCode}</strong>
          </div>
          <div className="timerInit">
            <div className="viewRankingTimer">
              {' '}
              <img src={Timer} alt="ícone relógio" /> {formatTime(timeElapsed)}
            </div>
            <button
              className={`buttonStartPause ${isGameStarted ? 'pause' : 'start'}`}
              onClick={startGame}
            >
              <img src={playPause} className="playIcon" alt="icone play e pause" />
              {isGameStarted ? 'PAUSAR JOGO' : 'INICIAR A PARTIDA'}
            </button>
          </div>
        </div>
        <div className="viewRanking">
          <h2>RANKING EM TEMPO REAL</h2>
          {sortedTeams.map((team, index) => (
            <div key={index} className="cardTeams">
              <img src={getMedalImage(index)} alt={`medalha ${index + 1}º lugar`} />
              <TeamCard team={team} />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
export default TeacherViewRanking
