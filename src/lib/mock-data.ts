// Mock data for static export
export const mockMuseums = [
  {
    id: '1',
    name: 'Metropolitan Museum of Art',
    city: 'New York',
    description: 'One of the world\'s largest and most comprehensive art museums.',
    theme: 'Art & Culture',
    official_page: 'https://www.metmuseum.org/',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'British Museum',
    city: 'London',
    description: 'A public museum dedicated to human history, art and culture.',
    theme: 'History',
    official_page: 'https://www.britishmuseum.org/',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Louvre Museum',
    city: 'Paris',
    description: 'The world\'s most-visited museum and a historic monument in Paris.',
    theme: 'Art & Culture',
    official_page: 'https://www.louvre.fr/',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

export const mockSections = [
  {
    id: '1',
    museum_id: '1',
    name: 'Egyptian Art',
    floor: 1,
    description: 'Ancient Egyptian artifacts and sculptures.',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    museum_id: '1',
    name: 'Medieval Art',
    floor: 2,
    description: 'European medieval art and manuscripts.',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    museum_id: '2',
    name: 'Ancient Greece',
    floor: 1,
    description: 'Greek sculptures and pottery.',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

export const mockKeyObjects = [
  {
    id: '1',
    section_id: '1',
    name: 'Rosetta Stone Replica',
    description: 'Ancient Egyptian hieroglyphic text.',
    image_url: undefined,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    section_id: '2',
    name: 'Medieval Manuscript',
    description: 'Illuminated medieval text.',
    image_url: undefined,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

export const mockTours = [
  {
    id: '1',
    user_id: 'demo-user',
    museum_id: '1',
    name: 'Ancient Civilizations Tour',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];