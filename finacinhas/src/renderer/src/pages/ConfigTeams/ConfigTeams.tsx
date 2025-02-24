import { FC, useState, useCallback, useEffect } from 'react'
import Header from '../../components/Header/Header'
import './ConfigTeams.style.css'
import TeamCard from './components/TeamCard/TeamCard'
import folha from '../../assets/teams/folha.svg'
import gato from '../../assets/teams/gato.svg'
import maca from '../../assets/teams/maca.svg'
import agua from '../../assets/teams/agua.svg'
import cachorro from '../../assets/teams/cachorro.svg'
import Mais from '../../assets/icon+.svg'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '@renderer/contexts/authContext'
import { createSession } from '@renderer/firebase/session/session'
import Team from '@renderer/models/Team'

const ConfigTeam: FC = () => {
  const { currentUser, logout } = useAuth()
  const { userId } = useAuth()
  const [profileName, setProfileName] = useState<string | null>(null)
  const { quizId } = useParams()

  useEffect(() => {
    if (currentUser) {
      setProfileName(currentUser.displayName || 'Usuário')
    }
  }, [currentUser])

  const defaultTeams: Team[] = [
    { name: 'Equipe Folha', points: 0, image: folha, hasAnswered: false },
    { name: 'Equipe Água', points: 0, image: agua, hasAnswered: false },
    { name: 'Equipe Maçã', points: 0, image: maca, hasAnswered: false },
    { name: 'Equipe Gato', points: 0, image: gato, hasAnswered: false },
    { name: 'Equipe Cachorro', points: 0, image: cachorro, hasAnswered: false }
  ]

  const [teams, setTeams] = useState<Team[]>(defaultTeams)
  const [availableTeams, setAvailableTeams] = useState<Team[]>(defaultTeams)

  const handleAddTeam = useCallback(() => {
    const teamsInUse = teams.map((team) => team.name)
    const available = availableTeams.filter((team) => !teamsInUse.includes(team.name))

    if (available.length === 0) {
      alert('Não há mais equipes disponíveis para adicionar!')
      return
    }

    const randomIndex = Math.floor(Math.random() * available.length)
    const selectedTeam = available[randomIndex]

    setTeams((prevTeams) => [...prevTeams, selectedTeam])
    setAvailableTeams((prevTeams) => prevTeams.filter((team, index) => index !== randomIndex))
  }, [teams, availableTeams])

  const handleDeleteTeam = useCallback(
    (index: number): void => {
      if (teams.length > 1) {
        const teamToRemove = teams[index]
        setTeams((prevTeams) => prevTeams.filter((_, i) => i !== index))
        setAvailableTeams((prevTeams) => [...prevTeams, teamToRemove])
      } else {
        alert('É necessário ter pelo menos uma equipe.')
      }
    },
    [teams]
  )

  const navigate = useNavigate()

  const handleContinue = async (): Promise<void> => {
    try {
      const session = await createSession(userId!, quizId!, teams)
      navigate(`/view-ranking/${session.code}`)
    } catch (error) {
      console.error('Erro ao criar sessão:', error)
    }
  }

  const handleLogout = async (): Promise<void> => {
    await logout()
    navigate('/')
    alert('Usuário Desconectado')
  }

  return (
    <div className="containerConfigTeam">
      <Header profileName={profileName || 'Usuário'} onExit={() => handleLogout()} />
      <main className="mainConfigTeam">
        <h1 className="titleConfigTeam">Equipes</h1>
        <div className="rankingContainer">
          <div className="rankingHeader">
            <span className="rankingTitle">RANKING GERAL</span>
            <button className="addTeamButton" onClick={handleAddTeam}>
              <img src={Mais} alt="Adicionar equipe" />
              ADICIONAR EQUIPE
            </button>
          </div>
          <div className="teamsList">
            {teams.map((team, index) => (
              <>
                <TeamCard index={index} team={team} handleDeleteTeam={handleDeleteTeam} />
              </>
            ))}
          </div>
        </div>

        <button className="startButton" onClick={handleContinue}>
          TUDO CERTO, VAMOS LÁ!
        </button>
      </main>
    </div>
  )
}

export default ConfigTeam
