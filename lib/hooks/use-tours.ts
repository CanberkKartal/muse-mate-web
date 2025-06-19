'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { tourService } from '@lib/services/tour-service'
import { CreateTourWithSectionsDTO, TourWithDetails } from '@lib/types'

export function useTours(userId?: string) {
  return useQuery({
    queryKey: ['tours', 'user', userId],
    queryFn: () => tourService.findByUserId(userId!),
    enabled: !!userId,
  })
}

export function useTour(id: string) {
  return useQuery<TourWithDetails | null>({
    queryKey: ['tours', id],
    queryFn: () => tourService.findByIdWithDetails(id),
    enabled: !!id,
  })
}

export function useCreateTour() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateTourWithSectionsDTO & { userId: string }) =>
      tourService.createWithSections(data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tours', 'user', variables.userId] })
      queryClient.invalidateQueries({ queryKey: ['tours'] })
    },
  })
}

export function useDeleteTour() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => tourService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] })
    },
  })
}