import { FC } from 'react'
import teamIcon from '../../../../assets/iconeProfile.svg'
import { Team } from '../../ConfigTeams'
import deleteIcon from '../../../../assets/delete-icon.svg'
import './TeamCard.style.css'

interface TeamCardProps {
  index: number
  team: Team
  handleDeleteTeam: (index: number) => void
}

export const TeamCard: FC<TeamCardProps> = ({ index, team, handleDeleteTeam }) => {
  return (
    <div key={index} className="teamCard">
      <div className="teamContent">
        <div className="teamRow">
          <img src={teamIcon} className="teamIcon" alt="Team Icon" />
          <div className="interColumn">
            <span className="teamName">{team.name}</span>
            <span className="teamPoints">{team.points} pontos</span>
          </div>
        </div>
      </div>
      <div className="deleteButtonContainer">
        <button className="deleteButton" onClick={() => handleDeleteTeam(index)}>
          <img src={deleteIcon} alt="Delete Icon" />
        </button>
      </div>
    </div>
  )
}

export default TeamCard
