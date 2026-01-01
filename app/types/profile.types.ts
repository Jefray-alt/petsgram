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
  createdAt: string | null
  updatedAt: string | null
}
