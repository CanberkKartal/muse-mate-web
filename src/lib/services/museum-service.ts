import { mockMuseums, mockSections, mockKeyObjects } from '@/lib/mock-data'
import { 
  Museum, 
  MuseumDetails, 
  Section, 
  KeyObject, 
  CreateMuseumDTO, 
  UpdateMuseumDTO 
} from '@/lib/types'

// Static export compatibility - using mock data instead of Supabase

export const museumService = {
  async findAll(): Promise<Museum[]> {
    // Return mock data for static export
    return mockMuseums.sort((a, b) => a.name.localeCompare(b.name))
  },

  async findById(id: string): Promise<Museum | null> {
    return mockMuseums.find(museum => museum.id === id) || null
  },

  async findByIdWithDetails(id: string): Promise<MuseumDetails | null> {
    const museum = mockMuseums.find(m => m.id === id)
    if (!museum) return null
    
    const sections = mockSections
      .filter(s => s.museum_id === id)
      .map(section => ({
        ...section,
        key_objects: mockKeyObjects.filter(ko => ko.section_id === section.id)
      }))
    
    return { ...museum, sections }
  },

  async findWithSections(): Promise<Museum[]> {
    return mockMuseums.map(museum => ({
      ...museum,
      sections: mockSections.filter(s => s.museum_id === museum.id)
    })).sort((a, b) => a.name.localeCompare(b.name))
  },

  async create(_museum: CreateMuseumDTO): Promise<Museum> {
    // Static export - no create functionality
    throw new Error('Create functionality not available in static export')
  },

  async update(_id: string, _updates: UpdateMuseumDTO): Promise<Museum> {
    // Static export - no update functionality
    throw new Error('Update functionality not available in static export')
  },

  async delete(_id: string): Promise<void> {
    // Static export - no delete functionality
    throw new Error('Delete functionality not available in static export')
  }
}

export const sectionService = {
  async findByMuseumId(museumId: string): Promise<Section[]> {
    return mockSections
      .filter(section => section.museum_id === museumId)
      .sort((a, b) => a.floor - b.floor || a.name.localeCompare(b.name))
  },

  async findByIdWithKeyObjects(id: string): Promise<(Section & { key_objects: KeyObject[] }) | null> {
    const section = mockSections.find(s => s.id === id)
    if (!section) return null
    
    return {
      ...section,
      key_objects: mockKeyObjects.filter(ko => ko.section_id === id)
    }
  }
}