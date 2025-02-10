import { FC, useState, useCallback, useEffect } from 'react'
import Header from '../../components/Header/Header'
import './ConfigTeams.style.css'
import TeamCard from './components/TeamCard/TeamCard'
import Mais from '../../assets/icon+.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@renderer/contexts/authContext'

export interface Team {
  name: string
  points: number
}

const ConfigTeam: FC = () => {
  const { currentUser, logout } = useAuth()
  const [profileName, setProfileName] = useState<string | null>(null)
  const location = useLocation()
  const quantTeams = location.state?.teams
  const maxTeams = 5
  const [teams, setTeams] = useState<Team[]>(() => {
    return Array.from({ length: quantTeams }, (_, i) => ({
      name: `Equipe ${i + 1}`,
      points: 0
    }))
  })
  useEffect(() => {
    if (currentUser) {
      setProfileName(currentUser.displayName || 'Usuário')
    }
  }, [currentUser])

  const handleAddTeam = useCallback(() => {
    if (teams.length < maxTeams) {
      const nextTeamNumber = teams.length + 1
      const newTeamName = `Equipe ${nextTeamNumber}`
      setTeams((prevTeams) => [...prevTeams, { name: newTeamName, points: 0 }])
    } else {
      alert('O limite máximo de equipes é 5.')
    }
  }, [teams])

  const handleDeleteTeam = useCallback(
    (index: number): void => {
      if (teams.length > 1) {
        setTeams((prevTeams) => prevTeams.filter((_, i) => i !== index))
      } else {
        alert('É necessário ter pelo menos uma equipe.')
      }
    },
    [teams]
  )
  const navigate = useNavigate()

  const handleContinue = (): void => {
    navigate('/view-ranking')
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
