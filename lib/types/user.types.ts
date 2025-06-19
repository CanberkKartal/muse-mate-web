export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  full_name?: string
  avatar_url?: string
  theme_preference?: 'light' | 'dark' | 'system'
  language_preference?: string
  created_at: string
  updated_at: string
}

export interface UserWithProfile extends User {
  profile?: UserProfile
}

export type CreateUserProfileDTO = Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>
export type UpdateUserProfileDTO = Partial<CreateUserProfileDTO>