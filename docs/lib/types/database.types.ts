export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      museums: {
        Row: {
          id: string
          name: string
          city: string
          description: string | null
          theme: string | null
          official_page: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          city: string
          description?: string | null
          theme?: string | null
          official_page?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          city?: string
          description?: string | null
          theme?: string | null
          official_page?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      sections: {
        Row: {
          id: string
          museum_id: string
          name: string
          floor: number
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          museum_id: string
          name: string
          floor: number
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          museum_id?: string
          name?: string
          floor?: number
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      key_objects: {
        Row: {
          id: string
          section_id: string
          name: string
          description: string | null
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          section_id: string
          name: string
          description?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          section_id?: string
          name?: string
          description?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tours: {
        Row: {
          id: string
          user_id: string
          museum_id: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          museum_id: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          museum_id?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
      }
      tour_sections: {
        Row: {
          tour_id: string
          section_id: string
          display_order: number
        }
        Insert: {
          tour_id: string
          section_id: string
          display_order: number
        }
        Update: {
          tour_id?: string
          section_id?: string
          display_order?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}