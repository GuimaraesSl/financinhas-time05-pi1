import React, { useState } from 'react'
import logo from '../../assets/Logo-Subtitle.svg'
import './SelectTeamScreen.style.css'
import { MdArrowBack } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const SelectTeamScreen: React.FC = () => {
  const navigate = useNavigate()
  const [selectedTeam, setSelectedTeam] = useState<string>('')

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleContinueToQuiz = () => {
    if (selectedTeam) {
      navigate(`/match-screen/${selectedTeam}`)
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
          onChange={(e) => setSelectedTeam(e.target.value)} // Atualiza o estado com o valor selecionado
        >
          <option value="" className="optionTeamSelection">
            Selecionar Equipe
          </option>
          <option value="maca" className="optionTeamSelection">
            Equipe Maçã
          </option>
          <option value="agua" className="optionTeamSelection">
            Equipe Água
          </option>
          <option value="folha" className="optionTeamSelection">
            Equipe Folha
          </option>
          <option value="gato" className="optionTeamSelection">
            Equipe Gato
          </option>
        </select>
        <button className="SelectTeamButton" onClick={handleContinueToQuiz}>
          CONTINUAR
        </button>
      </main>
    </div>
  )
}

export default SelectTeamScreen
