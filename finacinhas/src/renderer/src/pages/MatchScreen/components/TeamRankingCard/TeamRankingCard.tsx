import { FC } from 'react'
import './TeamRankingCard.style.css'
import Team from '@renderer/models/Team'
import macaIcon from '../../../../assets/teams/maca.svg'
import aguaIcon from '../../../../assets/teams/agua.svg'
import folhaIcon from '../../../../assets/teams/folha.svg'
import goldMedal from '../../../../assets/medals/first.svg'
import silverMedal from '../../../../assets/medals/second.svg'
import bronzeMedal from '../../../../assets/medals/third.svg'

const getTeamIcon = (teamName: string): JSX.Element => {
  switch (teamName) {
    case 'Maçã':
      return <img src={macaIcon} alt="Maçã" className="team-svg-icon" />
    case 'Água':
      return <img src={aguaIcon} alt="Água" className="team-svg-icon" />
    case 'Folha':
      return <img src={folhaIcon} alt="Folha" className="team-svg-icon" />
    default:
      return <></>
  }
}

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
  return (
    <li key={team.name} className={`team ${className}`}>
      <div className="team-icon">{getTeamIcon(team.name)}</div>
      <div className="team-info">
        <p className="team-name">Equipe {team.name}</p>
        <p className="team-points">{team.points} pontos</p>
      </div>
      <div className="team-medal">{getMedalIcon(rank)}</div>
    </li>
  )
}

export default TeamRankingCard
