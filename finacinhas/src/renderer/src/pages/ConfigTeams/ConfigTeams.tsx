import { FC, useState, useCallback } from 'react'
import logo from '../../assets/Logo-Subtitle.svg'
import profileIcon from '../../assets/iconeProfile.svg'
import logoutIcon from '../../assets/line-md_log-out.svg'
import './ConfigTeams.style.css'
import TeamCard from './components/TeamCard/TeamCard'

export interface Team {
  name: string
  points: number
}

const ConfigTeam: FC = () => {
  const maxTeams = 5
  const [teams, setTeams] = useState<Team[]>([
    { name: 'Equipe 1', points: 0 },
    { name: 'Equipe 2', points: 0 },
    { name: 'Equipe 3', points: 0 },
    { name: 'Equipe 4', points: 0 },
    { name: 'Equipe 5', points: 0 }
  ])

  // Função para adicionar uma equipe
  const handleAddTeam = useCallback(() => {
    if (teams.length < maxTeams) {
      // Determina o nome da nova equipe como "Equipe X", sendo X o próximo número disponível.
      const nextTeamNumber = teams.length + 1
      const newTeamName = `Equipe ${nextTeamNumber}`
      setTeams((prevTeams) => [...prevTeams, { name: newTeamName, points: 0 }])
    } else {
      alert('O limite máximo de equipes é 5.')
    }
  }, [teams])

  // Função para excluir uma equipe
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

  return (
    <div className="containerConfigTeam">
      <header className="headerConfigTeam">
        <div className="profileContainer">
          <img src={profileIcon} className="profileIcon" alt="Profile Icon" />
          <p className="profileName">Prof. Jeferson</p>
        </div>
        <img src={logo} className="logoConfigTeam" alt="Logo Financinhas" />
        <button className="logoutButton">
          SAIR
          <img src={logoutIcon} alt="Logout Icon" />
        </button>
      </header>

      <main className="mainConfigTeam">
        <h1 className="titleConfigTeam">Equipes</h1>
        <div className="rankingContainer">
          <div className="rankingHeader">
            <span>RANKING GERAL</span>
            <button className="addTeamButton" onClick={handleAddTeam}>
              + ADICIONAR EQUIPE
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

        <button className="startButton">TUDO CERTO, VAMOS LÁ!</button>
      </main>
    </div>
  )
}

export default ConfigTeam
