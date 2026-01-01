import type { Profile, ProfileRow } from '@/types/profile.types'

export function mapProfileToCamelCase(dbProfile: ProfileRow): Profile {
  return {
    id: dbProfile.id,
    email: dbProfile.email,
    username: dbProfile.username,
    fullName: dbProfile.full_name,
    avatarUrl: dbProfile.avatar_url,
    createdAt: dbProfile.created_at,
    updatedAt: dbProfile.updated_at
  }
}
