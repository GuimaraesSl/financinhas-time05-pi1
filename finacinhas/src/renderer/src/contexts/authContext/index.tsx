/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from '../../firebase/firebase'
import { onAuthStateChanged, User, updateProfile, signOut } from 'firebase/auth'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  currentUser: User | null
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
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  const setDisplayName = async (name: string) => {
    if (currentUser) {
      try {
        await updateProfile(currentUser, { displayName: name })

        setCurrentUser({ ...currentUser, displayName: name })
      } catch (error) {
        console.error(error)
      }
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setCurrentUser(null)
      setUserLoggedIn(false)
    } catch (error) {
      console.error(error)
    }
  }

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
