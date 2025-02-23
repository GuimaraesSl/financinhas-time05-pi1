import Team from './Team'

export enum SessionStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED'
}

export interface Session {
  code: string
  quizId: string
  professorId: string
  teams: Team[]
  status: SessionStatus
}
