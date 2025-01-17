import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  UserCredential
} from 'firebase/auth'
import { auth } from '../firebase'
import { saveProfessorData } from '../service/service'

export const createUser = async (email: string, password: string, name: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)

  if (userCredential.user) {
    await updateProfile(userCredential.user, { displayName: name })
  }

  await saveProfessorData(userCredential.user.uid, name)

  return userCredential.user
}

export const signIn = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    console.log('User signed in successfully:', userCredential.user)
    return userCredential
  } catch (error) {
    console.error('Error during sign in:', error)
    throw error
  }
}

export const signOut = async (): Promise<void> => {
  try {
    await auth.signOut()  
    console.log('User signed out successfully')
  } catch (error) {
    console.error('Error during sign out:', error)
    throw error
  }
}
