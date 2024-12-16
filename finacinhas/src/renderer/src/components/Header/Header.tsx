import { FC } from 'react'
import logo from '../../assets/Logo-Subtitle.svg'
import profileIcon from '../../assets/iconeProfile.svg'
import './Header.style.css'
import ExitButton from '../ExitButton/ExitButton'

interface HeaderProps {
  className?: string
  profileName?: string
  onExit: () => void
}

const Header: FC<HeaderProps> = ({ profileName = 'Usuário', onExit }) => {
  return (
    <header className="headerFinancinhas">
      <div className="profileContainerFinancinhas">
        <img src={profileIcon} className="profileIconFinancinhas" alt="Ícone do Perfil" />
        <p className="profileNameFinancinhas">Prof. {profileName}</p>
      </div>

      <img src={logo} className="logoFinancinhas" alt="Logo do Sistema Financinhas" />
      <ExitButton onClick={onExit} />
    </header>
  )
}

export default Header
