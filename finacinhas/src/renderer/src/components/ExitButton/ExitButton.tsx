import { FC } from 'react'
import logoutIcon from '../../assets/line-md_log-out.svg'
import './ExitButton.style.css'

const ExitButton: FC<{ onClick: () => void; className?: string }> = ({ onClick, className }) => (
  <button
    className={`logoutButtonFinancinhas ${className}`}
    onClick={onClick}
    aria-label="Sair do sistema"
    title="Logout"
  >
    SAIR
    <img src={logoutIcon} alt="Logout Icon" />
  </button>
)

export default ExitButton
