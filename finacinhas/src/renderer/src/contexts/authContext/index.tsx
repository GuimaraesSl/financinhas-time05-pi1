/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from '../../firebase/firebase'
import { onAuthStateChanged, User, updateProfile, signOut } from 'firebase/auth'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  currentUser: User | null
  userId: string | null
  userLoggedIn: boolean
  loading: boolean
  setDisplayName: (nameUser: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  const setDisplayName = async (name: string): Promise<void> => {
    if (currentUser) {
      try {
        await updateProfile(currentUser, { displayName: name })

        setCurrentUser({ ...currentUser, displayName: name })
      } catch (error) {
        console.error(error)
      }
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth)
      setCurrentUser(null)
      setUserId(null)
      setUserLoggedIn(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
        setUserId(user.uid)
        setUserLoggedIn(true)
      } else {
        setCurrentUser(null)
        setUserId(null)
        setUserLoggedIn(false)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value: AuthContextType = {
    currentUser,
    userId,
    userLoggedIn,
    loading,
    setDisplayName,
    logout
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
