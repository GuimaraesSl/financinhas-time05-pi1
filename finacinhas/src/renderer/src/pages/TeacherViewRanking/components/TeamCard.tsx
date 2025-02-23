import React from 'react'
import folha from '../../../assets/teams/folha.svg'
import gato from '../../../assets/teams/gato.svg'
import maca from '../../../assets/teams/maca.svg'
import agua from '../../../assets/teams/agua.svg'
import cachorro from '../../../assets/teams/cachorro.svg'
import './TeamCard.style.css'
import Team from '../../../models/Team'

interface TeamCardProps {
  team: Team
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const teamImages = {
    'Equipe Folha': folha,
    'Equipe Água': agua,
    'Equipe Maçã': maca,
    'Equipe Gato': gato,
    'Equipe Cachorro': cachorro
  } as const

  return (
    <div className="containerTeamReviewCard">
      <div className="logoReviewTeam">
        <img src={teamImages[team.name]} alt="logo equipe" />
      </div>
      <div className="nameTeam">
        <h2 className="teamName">{team.name}</h2>
        <p className="teamScore">{team.points}</p>
      </div>
    </div>
  )
}
export default TeamCard
