import { FC, useState } from 'react'
import logo from "../assets/Logo-Subtitle.svg"
import profile from "../assets/iconeProfile.svg"

import '../styles/NumberTeamScreen.css'

export const NumberTeamScreen: FC = () => {
  const [selectedTeams, setSelectedTeams] = useState<number | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeams(Number(event.target.value));
  };

  return (
    <div className="containerNumberTeamScreen">
      <header className="headerNumberTeamScreen">
        <img src={logo} className="logoNumberTeamScreen" alt="logo" />
        <div className= "profileContainerNumberTeamScreen">
            <img src={profile} className="profileNumberTeamScreen" alt="profile" />
            <p className="profileNameNumberTeamScreen">Nome do Usuário</p>
        </div>
      </header>
      <main className="mainNumberTeamScreen">
        <h1 className="titleNumberTeamScreen">Quantas Equipes irão jogar?</h1>
        <div className="selectContainerNumberTeamScreen">
          <label htmlFor="teamSelect" className="labelNumberTeamScreen">Selecione a quantidade:</label>
          <select id="teamSelect" className="selectNumberTeamScreen" onChange={handleSelectChange}>
            <option value="">Selecionar Quantidade </option>
            {[...Array(10)].map((_, index) => (
              <option key={index + 1} value={index + 1}>{index + 1}</option>
            ))}
          </select>
        </div>
        <button className="continueButtonNumberTeamScreen" disabled={selectedTeams === null}>Continuar</button>
      </main>
    </div>
  )
}

export default NumberTeamScreen;