import { FC } from 'react'
import logo from '../../../assets/Logo-Subtitle.svg'
import profileIcon from '../../../assets/iconeProfile.svg'
import logoutIcon from '../../../assets/line-md_log-out.svg'
import './Header.style.css'

interface HeaderProps {
  profileName: string
  onLogout: () => void
}

const LogoutButton: FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    className="logoutButtonFinancinhas"
    onClick={onClick}
    aria-label="Sair do sistema"
    title="Logout"
  >
    SAIR
    <img src={logoutIcon} alt="Logout Icon" />
  </button>
)

const Header: FC<HeaderProps> = ({ profileName = 'Usuário', onLogout }) => {
  return (
    <header className="headerFinancinhas">
      <div className="profileContainerFinancinhas">
        <img src={profileIcon} className="profileIconFinancinhas" alt="Ícone do Perfil" />
        <p className="profileNameFinancinhas">Prof. {profileName}</p>
      </div>

      <img src={logo} className="logoFinancinhas" alt="Logo do Sistema Financinhas" />
      <LogoutButton onClick={onLogout} />
    </header>
  )
}

export default Header
