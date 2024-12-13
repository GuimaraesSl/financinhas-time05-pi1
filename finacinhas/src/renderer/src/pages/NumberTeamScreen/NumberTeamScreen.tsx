import { FC, useState } from 'react'
import logo from '../../assets/Logo-Subtitle.svg'
import profileIcon from '../../assets/iconeProfile.svg'
import logoutIcon from '../../assets/line-md_log-out.svg'
import './NumberTeamScreen.style.css'
export const NumberTeamScreen: FC = () => {
  const [selectedTeams, setSelectedTeams] = useState<number | null>(null)
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedTeams(Number(event.target.value))
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
          <button className="logoutButton">
            Sair
            <img src={logoutIcon} className="logoutIconNumberTeamScreen" alt="Logout Icon" />
          </button>
        </div>
      </header>
      <main>
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
        <button className="continueButtonNumberTeamScreen" disabled={selectedTeams === null}>
          Continuar
        </button>
      </main>
    </div>
  )
}

export default NumberTeamScreen
