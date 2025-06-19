export interface Museum {
  id: string
  name: string
  city: string
  description?: string
  theme?: string
  official_page?: string
  created_at: string
  updated_at: string
}

export interface Section {
  id: string
  museum_id: string
  name: string
  floor: number
  description?: string
  created_at: string
  updated_at: string
}

export interface KeyObject {
  id: string
  section_id: string
  name: string
  description?: string
  image_url?: string
  created_at: string
  updated_at: string
}

export interface MuseumWithSections extends Museum {
  sections: Section[]
}

export interface SectionWithKeyObjects extends Section {
  key_objects: KeyObject[]
}

export interface MuseumDetails extends Museum {
  sections: SectionWithKeyObjects[]
}

export type CreateMuseumDTO = Omit<Museum, 'id' | 'created_at' | 'updated_at'>
export type UpdateMuseumDTO = Partial<CreateMuseumDTO>

export type CreateSectionDTO = Omit<Section, 'id' | 'created_at' | 'updated_at'>
export type UpdateSectionDTO = Partial<CreateSectionDTO>

export type CreateKeyObjectDTO = Omit<KeyObject, 'id' | 'created_at' | 'updated_at'>
export type UpdateKeyObjectDTO = Partial<CreateKeyObjectDTO>