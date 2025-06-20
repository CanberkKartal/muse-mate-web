'use client'

import { useQuery } from '@tanstack/react-query'
import { museumService } from '@lib/services/museum-service'
import { MuseumDetails } from '@lib/types'

export function useMuseums() {
  return useQuery({
    queryKey: ['museums'],
    queryFn: () => museumService.findAll(),
  })
}

export function useMuseum(id: string) {
  return useQuery<MuseumDetails | null>({
    queryKey: ['museums', id],
    queryFn: () => museumService.findByIdWithDetails(id),
    enabled: !!id,
  })
}