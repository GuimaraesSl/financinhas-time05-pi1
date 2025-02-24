import React, { useEffect, useState } from 'react'
import logo from '../../assets/Logo-Subtitle.svg'
import './SelectTeamScreen.style.css'
import { MdArrowBack } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import Team from '@renderer/models/Team'
import { getTeamsByRoomCode } from '@renderer/firebase/session/session'

const SelectTeamScreen: React.FC = () => {
  const navigate = useNavigate()
  const [selectedTeam, setSelectedTeam] = useState<string>('')
  const [teams, setTeams] = useState<Team[]>([])
  const { roomCode } = useParams()

  useEffect(() => {
    const fetchTeams = async (): Promise<void> => {
      try {
        const teamsData = await getTeamsByRoomCode(roomCode!)
        setTeams(teamsData)
      } catch (error) {
        console.error('Erro ao buscar times:', error)
      }
    }

    fetchTeams()
  }, [roomCode])

  const handleContinueToQuiz = (): void => {
    if (selectedTeam) {
      navigate(`/match-screen/${roomCode}/${selectedTeam}`)
    } else {
      alert('Por favor, selecione uma equipe antes de continuar.')
    }
  }

  return (
    <div className="containerSelectTeamScreen">
      <header className="headerSelectTeamScreen">
        <MdArrowBack
          onClick={() => navigate('/enter')}
          size={45}
          color="#000"
          className="arrowIcon"
        />
        <img src={logo} className="logoEnterRoomScreen" alt="logo" />
      </header>
      <main className="mainSelectTeamScreen">
        <h2>Selecione a sua Equipe</h2>
        <select
          name="teams"
          className="selectTeam"
          required
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
        >
          <option value="" className="optionTeamSelection">
            Selecionar Equipe
          </option>
          {teams.map((team) => (
            <option key={team.name} value={team.name} className="optionTeamSelection">
              {team.name}
            </option>
          ))}
        </select>
        <button className="SelectTeamButton" onClick={handleContinueToQuiz}>
          CONTINUAR
        </button>
      </main>
    </div>
  )
}

export default SelectTeamScreen
