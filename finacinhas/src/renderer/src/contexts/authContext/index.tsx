/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from '../../firebase/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  currentUser: User | null
  userLoggedIn: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
        setUserLoggedIn(true)
      } else {
        setCurrentUser(null)
        setUserLoggedIn(false)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value: AuthContextType = {
    currentUser,
    userLoggedIn,
    loading
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
