import { FC, useState } from 'react'
import Header from '../components/Header/Header'
import './NumberTeamScreen.style.css'
export const NumberTeamScreen: FC = () => {
  const [selectedTeams, setSelectedTeams] = useState<number | null>(null)
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedTeams(Number(event.target.value))
  }
  return (
    <div className="containerNumberTeamScreen">
    <Header profileName="Jefferson" onLogout={() => console.log('Logout')} />
      <main>
        <h1 className="titleNumberTeamScreen">Quantas Equipes irão jogar?</h1>
        <div className="selectContainerNumberTeamScreen">
          <select id="teamSelect" className="selectNumberTeamScreen" onChange={handleSelectChange}>
            <option value="" className="labelNumberTeamScreen">
              Selecionar quantidade
            </option>
            {[...Array(5)].map((_, index) => (
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
