import React from 'react'
import logoMaca from '../../../assets/teams/maca.svg'
import './TeamCard.style.css'

const TeamCard : React.FC = () => {
  return (
    <div className="containerTeamCard">
      <div className="logoTeam">
        <img src={logoMaca} alt="logo equipe maçã" />
      </div>
      <div className="nameTeam">
        <h2 className="teamName">Equipe Maçã</h2>
        <p className="teamScore">0 pontos</p>
      </div>
    </div>
  )
}
export default TeamCard