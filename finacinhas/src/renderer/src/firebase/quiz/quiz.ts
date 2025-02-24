import {
  doc,
  setDoc,
  collection,
  updateDoc,
  arrayUnion,
  getDocs,
  getDoc,
  deleteDoc
} from 'firebase/firestore'
import { db } from '../firebase'
import Quiz from '../../models/Quiz'
import Pergunta from '../../models/Pergunta'

export const createQuiz = async (professorId: string, quiz: Quiz): Promise<Quiz> => {
  try {
    const quizzesRef = collection(doc(db, 'professor', professorId), 'quiz')
    const quizDoc = doc(quizzesRef)

    const quizComId: Quiz = { ...quiz, id: quizDoc.id }

    await setDoc(quizDoc, quizComId)

    console.log(`Quiz '${quiz.titulo}' criado com sucesso para o professor ${professorId}`)
    return quizComId
  } catch (error) {
    console.error('Erro ao criar o quiz:', error)
    throw new Error('Não foi possível criar o quiz')
  }
}

export const removeQuiz = async (professorId: string, quizId: string): Promise<void> => {
  try {
    const quizRef = doc(db, 'professor', professorId, 'quiz', quizId)
    await deleteDoc(quizRef)
    console.log(`Quiz '${quizId}' removido com sucesso!`)
  } catch (error) {
    console.error('Erro ao remover o quiz:', error)
    throw new Error('Não foi possível remover o quiz.')
  }
}

export const listQuizzesByProfessor = async (professorId: string): Promise<Quiz[]> => {
  const quizzesRef = collection(db, 'professor', professorId, 'quiz')
  const querySnapshot = await getDocs(quizzesRef)

  const quizzes: Quiz[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Quiz, 'id'>)
  }))

  return quizzes
}

export const addQuestionToQuiz = async (
  professorId: string,
  quizId: string,
  novaPergunta: Pergunta
): Promise<void> => {
  try {
    const quizRef = doc(db, 'professor', professorId, 'quiz', quizId)

    await updateDoc(quizRef, {
      perguntas: arrayUnion(novaPergunta)
    })

    console.log(`Pergunta adicionada ao quiz '${quizId}' com sucesso!`)
  } catch (error) {
    console.error('Erro ao adicionar pergunta ao quiz:', error)
    throw new Error('Não foi possível adicionar a pergunta.')
  }
}

export const listQuestionsFromQuiz = async (
  professorId: string,
  quizId: string
): Promise<Pergunta[]> => {
  try {
    const quizRef = doc(db, 'professor', professorId, 'quiz', quizId)
    const quizSnapshot = await getDoc(quizRef)

    if (!quizSnapshot.exists()) {
      throw new Error(`Quiz com ID '${quizId}' não encontrado.`)
    }

    const perguntas = quizSnapshot.data()?.perguntas as Pergunta[] | undefined
    return perguntas ?? []
  } catch (error) {
    console.error('Erro ao listar perguntas do quiz:', error)
    throw new Error('Não foi possível listar as perguntas.')
  }
}

export const removeQuestionFromQuiz = async (
  professorId: string,
  quizId: string,
  enunciado: string
): Promise<void> => {
  try {
    const quizRef = doc(db, 'professor', professorId, 'quiz', quizId)

    const quizDoc = await getDoc(quizRef)
    if (!quizDoc.exists()) {
      throw new Error(`Quiz com ID '${quizId}' não encontrado.`)
    }

    const perguntasAtualizadas = quizDoc
      .data()
      ?.perguntas.filter((p: Pergunta) => p.enunciado !== enunciado)

    await updateDoc(quizRef, { perguntas: perguntasAtualizadas })

    console.log(`Pergunta removida do quiz '${quizId}' com sucesso!`)
  } catch (error) {
    console.error('Erro ao remover pergunta do quiz:', error)
    throw new Error('Não foi possível remover a pergunta.')
  }
}

export const editQuestionInQuiz = async (
  professorId: string,
  quizId: string,
  enunciadoAntigo: string,
  perguntaAtualizada: Pergunta
): Promise<void> => {
  try {
    const quizRef = doc(db, 'professor', professorId, 'quiz', quizId)

    const quizDoc = await getDoc(quizRef)
    if (!quizDoc.exists()) {
      throw new Error(`Quiz com ID '${quizId}' não encontrado.`)
    }

    const perguntasAtualizadas = quizDoc
      .data()
      ?.perguntas.map((p: Pergunta) => (p.enunciado === enunciadoAntigo ? perguntaAtualizada : p))

    await updateDoc(quizRef, { perguntas: perguntasAtualizadas })

    console.log(`Pergunta atualizada no quiz '${quizId}' com sucesso!`)
  } catch (error) {
    console.error('Erro ao editar pergunta no quiz:', error)
    throw new Error('Não foi possível editar a pergunta.')
  }
}

export const getQuestionFromQuiz = async (
  professorId: string,
  quizId: string,
  enunciado: string
): Promise<Pergunta | null> => {
  try {
    const quizRef = doc(db, 'professor', professorId, 'quiz', quizId)
    const quizDoc = await getDoc(quizRef)

    if (!quizDoc.exists()) {
      throw new Error(`Quiz com ID '${quizId}' não encontrado.`)
    }

    const perguntas = quizDoc.data()?.perguntas as Pergunta[]
    const perguntaEncontrada = perguntas.find((p) => p.enunciado === enunciado)

    return perguntaEncontrada || null
  } catch (error) {
    console.error('Erro ao obter a pergunta do quiz:', error)
    throw new Error('Não foi possível obter a pergunta.')
  }
}

export const getQuizById = async (professorId: string, quizId: string): Promise<Quiz | null> => {
  try {
    const quizRef = doc(db, 'professor', professorId, 'quiz', quizId)
    const quizDoc = await getDoc(quizRef)

    if (!quizDoc.exists()) {
      throw new Error(`Quiz com ID '${quizId}' não encontrado.`)
    }

    const quizData = quizDoc.data()
    if (!quizData) return null

    return {
      id: quizId,
      perguntas: quizData.perguntas as Pergunta[],
      titulo: quizData.titulo,
      descricao: quizData.descricao
    }
  } catch (error) {
    console.error('Erro ao obter o quiz:', error)
    throw new Error('Não foi possível obter o quiz.')
  }
}
