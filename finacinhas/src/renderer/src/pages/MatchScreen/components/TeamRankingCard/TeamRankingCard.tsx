import { FC } from 'react'
import './TeamRankingCard.style.css'
import Team from '@renderer/models/Team'
import maca from '../../../../assets/teams/maca.svg'
import agua from '../../../../assets/teams/agua.svg'
import folha from '../../../../assets/teams/folha.svg'
import gato from '../../../../assets/teams/gato.svg'
import cachorro from '../../../../assets/teams/cachorro.svg'
import goldMedal from '../../../../assets/medals/first.svg'
import silverMedal from '../../../../assets/medals/second.svg'
import bronzeMedal from '../../../../assets/medals/third.svg'

const getMedalIcon = (rank: number): JSX.Element | null => {
  switch (rank) {
    case 1:
      return <img src={goldMedal} alt="Gold Medal" className="medal-icon" />
    case 2:
      return <img src={silverMedal} alt="Silver Medal" className="medal-icon" />
    case 3:
      return <img src={bronzeMedal} alt="Bronze Medal" className="medal-icon" />
    default:
      return null
  }
}

const TeamRankingCard: FC<{ className?: string; team: Team; rank: number }> = ({
  className,
  team,
  rank = 1
}) => {
  const teamImages = {
    'Equipe Folha': folha,
    'Equipe Água': agua,
    'Equipe Maçã': maca,
    'Equipe Gato': gato,
    'Equipe Cachorro': cachorro
  } as const
  return (
    <li key={team.name} className={`team ${className}`}>
      <img src={teamImages[team.name]} alt="logo equipe" />
      <div className="team-info">
        <p className="team-name">{team.name}</p>
        <p className="team-points">{team.points} pontos</p>
      </div>
      <div className="team-medal">{getMedalIcon(rank)}</div>
    </li>
  )
}

export default TeamRankingCard
