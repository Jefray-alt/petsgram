import type { Database } from './database.types'

// Database profile type (snake_case)
export type ProfileRow = Database['public']['Tables']['profiles']['Row']

// Camel case version for application use
export interface Profile {
  id: string
  email: string
  username: string
  fullName: string | null
  avatarUrl: string | null
  bio: string | null
  createdAt: string | null
  updatedAt: string | null
}

// Profile update payload types
export interface ProfileUpdatePayload {
  fullName?: string
  bio?: string
  avatarUrl?: string
}

export interface ProfileUpdatePayloadSnakeCase {
  full_name?: string
  bio?: string
  avatar_url?: string
}
