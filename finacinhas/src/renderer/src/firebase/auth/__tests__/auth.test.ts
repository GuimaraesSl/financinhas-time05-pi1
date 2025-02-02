import { createUser, signIn } from '../auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'

describe('Auth Service (Firebase Server)', () => {
  it('should create a new user and save professor data', async () => {
    // Chama o método real para criar um usuário
    const user = await createUser('testuser@example.com', 'password123', 'Test User')

    expect(user.displayName).toBe('Test User')

    // Verifica se os dados foram salvos no Firestore
    const professorDoc = doc(db, 'professor', user.uid)
    const docSnapshot = await getDoc(professorDoc)

    expect(docSnapshot.exists()).toBe(true)
    expect(docSnapshot.data()?.nome).toBe('Test User')
  })

  it('should sign in an existing user', async () => {
    // Faz login com um usuário existente
    const userCredential = await signIn('testuser@example.com', 'password123')

    expect(userCredential.user.email).toBe('testuser@example.com')
  })
})
