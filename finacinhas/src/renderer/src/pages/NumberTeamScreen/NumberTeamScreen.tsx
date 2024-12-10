import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom' // Importar useNavigate
import logo from '../../assets/Logo-Subtitle.svg'
import profileIcon from '../../assets/iconeProfile.svg'
import logoutIcon from '../../assets/line-md_log-out.svg'
import './NumberTeamScreen.style.css'

export const NumberTeamScreen: FC = () => {
  const [selectedTeams, setSelectedTeams] = useState<number | null>(null)
  const navigate = useNavigate() // Hook para navegação

  // Manipular mudança no Select
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedTeams(Number(event.target.value))
  }

  // Navegar ao clicar no botão Continuar
  const handleContinue = (): void => {
    if (selectedTeams) {
      navigate('/game-setup', { state: { teams: selectedTeams } }) // Passa a quantidade de times via state
    }
  }

  // Navegar ao clicar no botão Sair
  const handleLogout = (): void => {
    navigate('/') // Redireciona para a página inicial
  }

  return (
    <div className="containerNumberTeamScreen">
      <header className="headerNumberTeamScreen">
        <div className="profileContainerNumberTeamScreen">
          <img src={profileIcon} className="profileNumberTeamScreen" alt="Profile Icon" />
          <p className="profileNameNumberTeamScreen">Nome do Usuário</p>
        </div>
        <div className="logoContainerNumberTeamScreen">
          <img src={logo} className="logoNumberTeamScreen" alt="logo" />
        </div>
        <div className="logoutContainerNumberTeamScreen">
          <button className="logoutButton" onClick={handleLogout}>
            Sair
            <img src={logoutIcon} className="logoutIconNumberTeamScreen" alt="Logout Icon" />
          </button>
        </div>
      </header>

      <main className="mainNumberTeamScreen">
        <h1 className="titleNumberTeamScreen">Quantas Equipes irão jogar?</h1>
        <div className="selectContainerNumberTeamScreen">
          <label htmlFor="teamSelect" className="labelNumberTeamScreen">
            Selecione a quantidade:
          </label>
          <select id="teamSelect" className="selectNumberTeamScreen" onChange={handleSelectChange}>
            <option value="">Selecionar Quantidade</option>
            {[...Array(10)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <button
          className="continueButtonNumberTeamScreen"
          onClick={handleContinue}
          disabled={selectedTeams === null}
        >
          Continuar
        </button>
      </main>
    </div>
  )
}

export default NumberTeamScreen
