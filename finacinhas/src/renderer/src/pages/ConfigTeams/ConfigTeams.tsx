import { FC, useState, useCallback } from 'react'
import Header from '../components/Header/Header'
import './ConfigTeams.style.css'
import TeamCard from './components/TeamCard/TeamCard'
import Mais from '../../assets/icon+.svg'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate();

  // Navegar ao clicar no botão Continuar
  const handleContinue = (): void => {
    navigate('/') // Redireciona para a tela de configuração do jogo
  }

  // Navegar ao clicar no botão Sair
  const handleLogout = (): void => {
    navigate('/') // Redireciona para a página inicial
  }

  return (
    <div className="containerConfigTeam">
      <Header profileName="Jefferson" onLogout={() => handleLogout()} />
      <main className="mainConfigTeam">
        <h1 className="titleConfigTeam">Equipes</h1>
        <div className="rankingContainer">
          <div className="rankingHeader">
            <span>RANKING GERAL</span>
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
