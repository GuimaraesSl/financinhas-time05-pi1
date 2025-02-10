import { FC, useState, useCallback, useEffect } from 'react'
import Header from '../../components/Header/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import './TeacherViewRanking.style.css'
import { useAuth } from '@renderer/contexts/authContext'
import Timer from '../../assets/timer.svg'
import playPause from '../../assets/playPause.svg'
import first from '../../assets/primeiro.svg'
import second from '../../assets/segundo.svg'
import third from '../../assets/terceiro.svg'
import fourth from '../../assets/quarto.svg'
import fifth from '../../assets/quinto.svg'
import TeamCard from './components/teamCard'

const TeacherViewRanking : FC = () => {

  const[profileName, setProfileName] = useState<string | null>(null)
  const { currentUser, logout } = useAuth()
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  const startGame = () =>{
    setIsGameStarted(!isGameStarted)
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      setProfileName(currentUser.displayName || 'Usuário')
    }
  }, [currentUser])


  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGameStarted) {
      timer = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isGameStarted && timeElapsed !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isGameStarted, timeElapsed]);

  const handleLogout = async (): Promise<void> => {
    await logout()
    navigate('/')
    alert('Sessão encerrada com sucesso!')
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  return (
    <div className="containerTeacherViewRanking">
      <Header profileName={profileName || 'Usuário'} onExit={() => handleLogout}></Header>
      <main className="mainTeacherViewRanking">
        <div className="infoRanking">
          <div className="codTurma">CÓDIGO DA TURMA: <strong>123ABC</strong></div>
          <div className="timerInit">
            <div> <img src={Timer} alt="ícone relógio" /> {formatTime(timeElapsed)}</div>
            <button className={`buttonStartPause ${isGameStarted ? 'pause' : 'start'}`} onClick={startGame}>
              <img src={playPause} alt="icone play e pause" />
              {isGameStarted ? "PAUSAR JOGO" : "INICIAR A PARTIDA"}</button>
          </div>
        </div>
        <div className="viewRanking">
          <h2>RANKINK EM TEMPO REAL</h2>
          <div className="cardTeams">
            <img src={first} alt="medalha de ouro" />
            <TeamCard></TeamCard>
          </div>
          <div className="cardTeams">
            <img src={second} alt="medalha de prate" />
            <TeamCard></TeamCard>
          </div>
          <div className="cardTeams">
            <img src={third} alt="medalha de bronze" />
            <TeamCard></TeamCard>
          </div>
          <div className="cardTeams">
            <img src={fourth} alt="quarto lugar" />
            <TeamCard></TeamCard>
          </div>
          <div className="cardTeams">
            <img src={fifth} alt="quinto lugar" />
            <TeamCard></TeamCard>
          </div>
        </div>
      </main>
    </div>
  )
}
export default TeacherViewRanking