import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export const saveProfessorData = async (uid: string, name: string): Promise<void> => {
  const professorRef = doc(db, 'professor', uid)

  await setDoc(professorRef, {
    nome: name,
    createdAt: new Date()
  })

  console.log('Dados do professor salvos com sucesso no Firestore.')
}
