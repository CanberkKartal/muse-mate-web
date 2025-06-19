import { Museum, Section } from '@lib/types/museum.types'

export interface Tour {
  id: string
  user_id: string
  museum_id: string
  name: string
  created_at: string
  updated_at: string
}

export interface TourSection {
  tour_id: string
  section_id: string
  display_order: number
}

export interface TourWithDetails extends Tour {
  museum: Museum
  sections: (Section & { display_order: number })[]
}

export interface TourDetails extends Tour {
  museum: Museum
  tour_sections: (TourSection & {
    section: Section
  })[]
}

export type CreateTourDTO = Omit<Tour, 'id' | 'created_at' | 'updated_at'>
export type UpdateTourDTO = Partial<Pick<Tour, 'name'>>

export interface CreateTourWithSectionsDTO {
  name: string
  museum_id: string
  section_ids: string[]
}