import { Session, SessionStatus } from '../../models/Session'
import Team from '../../models/Team'
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

export const createSession = async (
  professorId: string,
  quizId: string,
  teams: Team[]
): Promise<Session> => {
  try {
    const roomCode = Math.random().toString(36).slice(2, 8)
    const sessionsRef = collection(db, 'sessions')
    const sessionDoc = doc(sessionsRef, roomCode)
    const sessionData: Session = {
      code: roomCode,
      quizId: quizId,
      professorId: professorId,
      teams: teams,
      status: SessionStatus.PENDING
    }
    await setDoc(sessionDoc, sessionData)
    return sessionData
  } catch (error) {
    console.error('Erro ao criar sessão:', error)
    throw new Error('Não foi possível criar a sessão')
  }
}

export const getSessionByRoomCode = async (roomCode: string): Promise<Session> => {
  try {
    const sessionRef = doc(db, 'sessions', roomCode)
    const sessionSnap = await getDoc(sessionRef)

    if (!sessionSnap.exists()) {
      throw new Error('Sessão não encontrada')
    }

    return sessionSnap.data() as Session
  } catch (error) {
    console.error('Erro ao buscar sessão:', error)
    throw new Error('Não foi possível obter a sessão')
  }
}

export const getTeamsByRoomCode = async (roomCode: string): Promise<Team[]> => {
  try {
    const sessionRef = doc(db, 'sessions', roomCode)
    const sessionSnap = await getDoc(sessionRef)

    if (!sessionSnap.exists()) {
      throw new Error('Sessão não encontrada')
    }

    const sessionData = sessionSnap.data() as Session
    return sessionData.teams
  } catch (error) {
    console.error('Erro ao buscar times da sessão:', error)
    throw new Error('Não foi possível obter os times da sessão')
  }
}

export const updateTeamPoints = async (
  roomCode: string,
  teamName: string,
  points: number
): Promise<void> => {
  try {
    const sessionRef = doc(db, 'sessions', roomCode)
    const sessionSnap = await getDoc(sessionRef)
    if (!sessionSnap.exists()) {
      throw new Error('Sessão não encontrada')
    }
    const sessionData = sessionSnap.data() as Session
    const teamIndex = sessionData.teams.findIndex((team) => team.name === teamName)
    if (teamIndex === -1) {
      throw new Error('Time não encontrado')
    }
    // Adiciona os pontos à pontuação atual
    sessionData.teams[teamIndex].points += points
    await setDoc(sessionRef, sessionData)
  } catch (error) {
    console.error('Erro ao atualizar pontos do time:', error)
    throw new Error('Não foi possível atualizar os pontos do time')
  }
}

export const updateTeamHasAnswered = async (
  roomCode: string,
  teamName: string,
  hasAnswered: boolean
): Promise<void> => {
  try {
    const sessionRef = doc(db, 'sessions', roomCode)
    const sessionSnap = await getDoc(sessionRef)

    if (!sessionSnap.exists()) {
      throw new Error('Sessão não encontrada')
    }

    const sessionData = sessionSnap.data() as Session
    const teamIndex = sessionData.teams.findIndex((team) => team.name === teamName)

    if (teamIndex === -1) {
      throw new Error('Time não encontrado')
    }

    sessionData.teams[teamIndex].hasAnswered = hasAnswered
    await setDoc(sessionRef, sessionData)
  } catch (error) {
    console.error('Erro ao atualizar status de resposta do time:', error)
    throw new Error('Não foi possível atualizar o status de resposta do time')
  }
}

export const updateSessionStatus = async (
  roomCode: string,
  status: SessionStatus
): Promise<void> => {
  try {
    const sessionRef = doc(db, 'sessions', roomCode)
    const sessionSnap = await getDoc(sessionRef)

    if (!sessionSnap.exists()) {
      throw new Error('Sessão não encontrada')
    }

    await updateDoc(sessionRef, {
      status: status
    })
  } catch (error) {
    console.error('Erro ao atualizar status da sessão:', error)
    throw new Error('Não foi possível atualizar o status da sessão')
  }
}
