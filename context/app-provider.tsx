'use client'

import { AuthProvider } from './auth-provider'
import { QueryProvider } from './query-provider'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryProvider>
  )
}