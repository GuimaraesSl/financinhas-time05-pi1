import { useParams } from 'react-router-dom'
import MatchScreen from './MatchScreen'

const MatchScreenWrapper: React.FC = () => {
  const { teamName } = useParams<{ teamName: string }>()

  if (!teamName) {
    return <p>Nome da equipe não fornecido!</p>
  }

  return <MatchScreen localTeamName={teamName} />
}

export default MatchScreenWrapper
