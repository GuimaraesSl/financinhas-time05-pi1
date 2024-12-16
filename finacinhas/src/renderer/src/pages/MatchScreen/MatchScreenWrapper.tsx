import { useParams } from 'react-router-dom'
import MatchScreen from './MatchScreen'

const MatchScreenWrapper: React.FC = () => {
  const { teamName } = useParams<{ teamName: string }>()

  console.log(teamName)

  return <MatchScreen localTeamName={teamName} />
}

export default MatchScreenWrapper
