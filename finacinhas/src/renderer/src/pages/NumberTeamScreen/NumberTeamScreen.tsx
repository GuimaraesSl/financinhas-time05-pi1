import { FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import './NumberTeamScreen.style.css'
import { useAuth } from '../../contexts/authContext/index'

export const NumberTeamScreen: FC = () => {
  const [selectedTeams, setSelectedTeams] = useState<number | null>(null)
  const [profileName, setProfileName] = useState<string | null>(null)
  const navigate = useNavigate() // Hook para navegação

  const { currentUser, logout } = useAuth()

  useEffect(() => {
    if (currentUser) {
      setProfileName(currentUser.displayName || 'Usuário')
    }
  }, [currentUser])

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedTeams(Number(event.target.value))
  }

  const handleContinue = (): void => {
    if (selectedTeams) {
      navigate('/select-questions', { state: { teams: selectedTeams } }) // Redireciona para a tela de configuração do jogo
    }
  }

  const handleLogout = async (): Promise<void> => {
    await logout()
    navigate('/')
    alert('Usuário Desconectado')
  }

  return (
    <div className="containerNumberTeamScreen">
      <Header profileName={profileName || 'Usuário'} onExit={() => handleLogout()} />
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
