import React from 'react'
import logo from '../../assets/Logo-Subtitle.svg'
import './SelectTeamScreen.style.css'
import { MdArrowBack } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const SelectTeamScreen: React.FC = () => {
  const navigate = useNavigate()
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
        <select name="teams" className="selectTeam" required>
          <option value="" className="optionTeamSelection">
            Selecionar Equipe
          </option>
          <option value="team2" className="optionTeamSelection">
            Equipe Maçã
          </option>
          <option value="team3" className="optionTeamSelection">
            Equipe Água
          </option>
          <option value="team4" className="optionTeamSelection">
            Equipe Folha
          </option>
          <option value="team5" className="optionTeamSelection">
            Equipe Gato
          </option>
        </select>
        <button className="SelectTeamButton">CONTINUAR</button>
      </main>
    </div>
  )
}

export default SelectTeamScreen
