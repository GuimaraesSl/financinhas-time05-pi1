import Pergunta from './Pergunta'

interface Quiz {
  id: string
  titulo: string
  descricao: string
  perguntas: Pergunta[]
}

export default Quiz
