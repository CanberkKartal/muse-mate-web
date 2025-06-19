import { mockTours, mockMuseums } from '../mock-data'
import { 
  Tour, 
  TourWithDetails, 
  CreateTourDTO, 
  CreateTourWithSectionsDTO,
  UpdateTourDTO 
} from '../types'

// Static export compatibility - using mock data instead of Supabase

export const tourService = {
  async findByUserId(userId: string): Promise<TourWithDetails[]> {
    return mockTours
      .filter(tour => tour.user_id === userId)
      .map(tour => {
        const museum = mockMuseums.find(m => m.id === tour.museum_id)
        return {
          ...tour,
          museum: museum || mockMuseums[0],
          sections: []
        }
      })
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  },

  async findByIdWithDetails(id: string): Promise<TourWithDetails | null> {
    const tour = mockTours.find(t => t.id === id)
    if (!tour) return null
    
    const museum = mockMuseums.find(m => m.id === tour.museum_id)
    return {
      ...tour,
      museum: museum || mockMuseums[0],
      sections: []
    }
  },

  async create(_tour: CreateTourDTO): Promise<Tour> {
    // Static export - no create functionality
    throw new Error('Create functionality not available in static export')
  },

  async createWithSections(_tourData: CreateTourWithSectionsDTO & { userId: string }): Promise<Tour> {
    // Static export - no create functionality
    throw new Error('Create functionality not available in static export')
  },

  async update(_id: string, _updates: UpdateTourDTO): Promise<Tour> {
    // Static export - no update functionality
    throw new Error('Update functionality not available in static export')
  },

  async delete(_id: string): Promise<void> {
    // Static export - no delete functionality
    throw new Error('Delete functionality not available in static export')
  },

  async updateSections(_tourId: string, _sectionIds: string[]): Promise<void> {
    // Static export - no update functionality
    throw new Error('Update functionality not available in static export')
  }
}