import {
  createSession,
  getSessionByRoomCode,
  getTeamsByRoomCode,
  updateSessionStatus,
  updateTeamPoints
} from '../session'
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import Team from '../../../models/Team'
import { SessionStatus } from '../../../models/Session'

describe('Sessão Service (Firebase Server)', () => {
  const professorId = '8R6UyyD0bKbhS3C5mirVrv7e2kC3'
  const quizId = '4JDk37RzxBdOGT3b6uEw'

  // Mock de uma equipe para teste
  const mockTeam: Team[] = [
    {
      name: 'Teste-1',
      points: 0
    },
    {
      name: 'Teste-2',
      points: 0
    },
    {
      name: 'Teste-3',
      points: 0
    }
  ]

  // Equipes para o teste
  const teams: Team[] = mockTeam

  it('deve criar uma nova sessão e salvá-la no Firestore', async () => {
    // Executa a criação da sessão
    const result = await createSession(professorId, quizId, teams)

    // Verifica se a sessão foi criada usando o caminho correto
    const sessionRef = doc(db, 'sessions', result.code)
    const sessionSnapshot = await getDoc(sessionRef)

    // Validações
    expect(sessionSnapshot.exists()).toBe(true)
    expect(sessionSnapshot.data()?.quizId).toBe(quizId)
    expect(sessionSnapshot.data()?.teams).toEqual(teams)
    expect(sessionSnapshot.data()?.status).toBe('PENDING')
  })

  it('deve buscar uma sessão pelo código da sala', async () => {
    // Primeiro criamos uma sessão para testar
    const createdSession = await createSession(professorId, quizId, teams)

    // Agora buscamos a sessão pelo código da sala
    const retrievedSession = await getSessionByRoomCode(createdSession.code)

    // Validações
    expect(retrievedSession.code).toBe(createdSession.code)
    expect(retrievedSession.quizId).toBe(quizId)
    expect(retrievedSession.professorId).toBe(professorId)
    expect(retrievedSession.teams).toEqual(teams)
    expect(retrievedSession.status).toBe('PENDING')

    // Limpeza após o teste
    const sessionRef = doc(db, 'sessions', createdSession.code)
    await deleteDoc(sessionRef)
  })

  it('deve buscar os times de uma sessão pelo código da sala', async () => {
    // Primeiro criamos uma sessão para testar
    const createdSession = await createSession(professorId, quizId, teams)

    // Busca os times usando o método getTeamsByRoomCode
    const retrievedTeams = await getTeamsByRoomCode(createdSession.code)

    // Validações
    expect(retrievedTeams).toEqual(teams)
    expect(retrievedTeams.length).toBe(teams.length)

    // Verifica cada time individualmente
    retrievedTeams.forEach((team, index) => {
      expect(team.name).toBe(teams[index].name)
      expect(team.points).toBe(teams[index].points)
    })

    // Limpeza após o teste
    const sessionRef = doc(db, 'sessions', createdSession.code)
    await deleteDoc(sessionRef)
  })

  it('deve atualizar os pontos de uma equipe específica', async () => {
    // Primeiro criamos uma sessão para testar
    const createdSession = await createSession(professorId, quizId, teams)

    // Escolhemos um time para atualizar seus pontos
    const teamToUpdate = teams[0]
    const newPoints = 50

    // Atualizamos os pontos do time
    await updateTeamPoints(createdSession.code, teamToUpdate.name, newPoints)

    // Verificamos se a atualização funcionou
    const updatedSession = await getSessionByRoomCode(createdSession.code)

    // Encontra o time atualizado na sessão
    const updatedTeam = updatedSession.teams.find((t) => t.name === teamToUpdate.name)

    // Validações
    expect(updatedTeam).toBeDefined()
    expect(updatedTeam?.points).toBe(newPoints)

    // Verifica se os outros times não foram afetados
    updatedSession.teams.forEach((team) => {
      if (team.name !== teamToUpdate.name) {
        const originalTeam = teams.find((t) => t.name === team.name)
        expect(team.points).toBe(originalTeam?.points)
      }
    })

    // Limpeza após o teste
    const sessionRef = doc(db, 'sessions', createdSession.code)
    await deleteDoc(sessionRef)
  })

  it('deve atualizar o status de uma sessão', async () => {
    // Primeiro criamos uma sessão para testar
    const createdSession = await createSession(professorId, quizId, teams)

    // Testa cada um dos possíveis status
    const statuses: SessionStatus[] = [
      SessionStatus.PENDING,
      SessionStatus.ACTIVE,
      SessionStatus.FINISHED
    ]

    for (const status of statuses) {
      // Atualiza o status da sessão
      await updateSessionStatus(createdSession.code, status)

      // Verifica se a atualização funcionou
      const updatedSession = await getSessionByRoomCode(createdSession.code)

      // Validações
      expect(updatedSession.status).toBe(status)

      // Verifica se os outros dados não foram afetados
      expect(updatedSession.code).toBe(createdSession.code)
      expect(updatedSession.quizId).toBe(quizId)
      expect(updatedSession.professorId).toBe(professorId)
      expect(updatedSession.teams).toEqual(teams)
    }

    // Limpeza após o teste
    const sessionRef = doc(db, 'sessions', createdSession.code)
    await deleteDoc(sessionRef)
  })
})
