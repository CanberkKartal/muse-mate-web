'use client'

import { createContext, useContext, useEffect, useState } from 'react'

// Mock user type for static export
interface MockUser {
  id: string
  email: string
  created_at: string
}

interface AuthContextType {
  user: MockUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>({ id: 'demo-user', email: 'demo@example.com', created_at: '2024-01-01T00:00:00Z' })
  const [loading, setLoading] = useState(false) // Static export - always loaded

  useEffect(() => {
    // Static export - simulate logged in user
    setUser({ id: 'demo-user', email: 'demo@example.com', created_at: '2024-01-01T00:00:00Z' })
    setLoading(false)
  }, [])

  const signIn = async (email: string, _password: string) => {
    // Static export - simulate successful login
    setUser({ id: 'demo-user', email, created_at: '2024-01-01T00:00:00Z' })
    return { error: null }
  }

  const signUp = async (email: string, _password: string) => {
    // Static export - simulate successful signup
    setUser({ id: 'demo-user', email, created_at: '2024-01-01T00:00:00Z' })
    return { error: null }
  }

  const signOut = async () => {
    // Static export - simulate logout
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}