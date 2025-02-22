import { doc, getDoc } from 'firebase/firestore'
import {
  addQuestionToQuiz,
  createQuiz,
  editQuestionInQuiz,
  getQuestionFromQuiz,
  listQuestionsFromQuiz,
  listQuizzesByProfessor,
  removeQuestionFromQuiz
} from '../quiz'
import { db } from '../../firebase'
import Quiz from '../../../models/Quiz'
import Pergunta from '../../../models/Pergunta'

describe('Quiz Service (Firebase Server)', () => {
  const professorId = '8R6UyyD0bKbhS3C5mirVrv7e2kC3'
  const quizId = '4JDk37RzxBdOGT3b6uEw'

  it('should create a quiz and save it in Firestore', async () => {
    // Dados do quiz para teste
    const quiz1: Partial<Quiz> = {
      titulo: 'Science Quiz',
      descricao: 'A quiz about science',
      perguntas: [
        {
          enunciado: 'What planet is known as the Red Planet?',
          alternativas: ['Earth', 'Mars', 'Jupiter', 'Venus'],
          correta: 'Mars',
          justificativa:
            'Marte é conhecido como o Planeta Vermelho devido à sua superfície rica em óxidos de ferro, que dão ao planeta sua característica cor avermelhada.'
        }
      ]
    }

    const quiz2: Partial<Quiz> = {
      titulo: 'Test Quiz',
      descricao: 'A quiz for testing purposes',
      perguntas: [
        {
          enunciado: 'What is the capital of France?',
          alternativas: ['Berlin', 'Madrid', 'Paris', 'Rome'],
          correta: 'Paris',
          justificativa:
            'Paris é a capital da França desde 508 DC, quando Clóvis I estabeleceu seu reino ali. É reconhecida internacionalmente como a capital francesa por mais de 1500 anos.'
        },
        {
          enunciado: 'What is 2 + 2?',
          alternativas: ['3', '4', '5', '6'],
          correta: '4',
          justificativa:
            'Esta é uma operação matemática básica onde dois grupos de dois elementos são combinados, resultando em quatro elementos no total.'
        }
      ]
    }

    // Chama o método real para criar o quiz
    const result = await createQuiz(professorId, quiz1 as Quiz)
    await createQuiz(professorId, quiz2 as Quiz)

    // Verifica se o quiz foi salvo no Firestore
    const quizzesRef = doc(db, 'professor', professorId, 'quiz', result.id!)
    const quizSnapshot = await getDoc(quizzesRef)

    expect(quizSnapshot.exists()).toBe(true)
    expect(quizSnapshot.data()?.titulo).toBe(quiz1.titulo)
    expect(quizSnapshot.data()?.descricao).toBe(quiz1.descricao)
    expect(quizSnapshot.data()?.perguntas).toEqual(quiz1.perguntas)
    expect(quizSnapshot.data()?.id).toBe(result.id)
  })

  it('should list all quizzes for a professor', async () => {
    const quizzes = await listQuizzesByProfessor(professorId)

    expect(quizzes).toHaveLength(2)
  })

  it('should add a question to an existing quiz', async () => {
    const novaPergunta: Pergunta = {
      enunciado: 'What is the capital of Germany?',
      alternativas: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correta: 'Berlin',
      justificativa:
        'Berlim é a capital da Alemanha desde a reunificação do país em 1990. Anteriormente, foi a capital da República Democrática Alemã (Alemanha Oriental) de 1949 até 1990.'
    }

    // Adiciona a pergunta ao quiz
    await addQuestionToQuiz(professorId, quizId, novaPergunta)

    // Verifica se a pergunta foi adicionada
    const quizRef = doc(db, 'professor', professorId, 'quiz', quizId)
    const quizSnapshot = await getDoc(quizRef)

    expect(quizSnapshot.exists()).toBe(true)

    const perguntas = quizSnapshot.data()?.perguntas
    expect(perguntas).toContainEqual(novaPergunta)
  })

  it('should list all questions of a quiz', async () => {
    // Obtém as perguntas do quiz
    const perguntas = await listQuestionsFromQuiz(professorId, quizId)

    // Valida se as perguntas foram retornadas corretamente
    console.log(perguntas)
    expect(perguntas).toHaveLength(3)
  })

  it('should remove a question from a quiz', async () => {
    const enunciadoToRemove = 'What is the capital of Germany?'

    // Remove a pergunta
    await removeQuestionFromQuiz(professorId, quizId, enunciadoToRemove)

    // Verifica se a pergunta foi removida
    const quizRef = doc(db, 'professor', professorId, 'quiz', quizId)
    const quizSnapshot = await getDoc(quizRef)

    expect(quizSnapshot.exists()).toBe(true)

    const perguntas = quizSnapshot.data()?.perguntas
    expect(perguntas).not.toContainEqual(expect.objectContaining({ enunciado: enunciadoToRemove }))
    expect(perguntas).toHaveLength(2)
  })

  it('should edit a question in a quiz', async () => {
    const enunciadoAntigo = 'What is the capital of France?'
    const perguntaAtualizada: Pergunta = {
      enunciado: 'What is the capital of Italy?',
      alternativas: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correta: 'Rome',
      justificativa:
        'Roma é a capital da Itália desde 1871, quando o Reino da Itália foi estabelecido. Antes disso, foi a capital dos Estados Papais e do Império Romano.'
    }

    // Edita a pergunta
    await editQuestionInQuiz(professorId, quizId, enunciadoAntigo, perguntaAtualizada)

    // Verifica se a pergunta foi atualizada
    const quizRef = doc(db, 'professor', professorId, 'quiz', quizId)
    const quizSnapshot = await getDoc(quizRef)

    expect(quizSnapshot.exists()).toBe(true)

    const perguntas = quizSnapshot.data()?.perguntas
    expect(perguntas).toContainEqual(perguntaAtualizada)
    expect(perguntas).not.toContainEqual(expect.objectContaining({ enunciado: enunciadoAntigo }))
  })

  it('should return the correct question by its enunciado', async () => {
    const enunciado = 'What is the capital of Italy?'

    const pergunta = await getQuestionFromQuiz(professorId, quizId, enunciado)

    expect(pergunta).not.toBeNull()
    expect(pergunta?.enunciado).toBe(enunciado)
    expect(pergunta?.alternativas).toEqual(['Berlin', 'Madrid', 'Paris', 'Rome'])
    expect(pergunta?.correta).toBe('Rome')
  })
})
