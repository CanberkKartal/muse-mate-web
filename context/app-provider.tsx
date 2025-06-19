'use client'

import { AuthProvider } from '@context/auth-provider'
import { QueryProvider } from '@context/query-provider'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryProvider>
  )
}