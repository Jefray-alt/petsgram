import type {
  Profile,
  ProfileRow,
  ProfileUpdatePayload,
  ProfileUpdatePayloadSnakeCase
} from '@/types/profile.types'

export function mapProfileToCamelCase(dbProfile: ProfileRow): Profile {
  return {
    id: dbProfile.id,
    email: dbProfile.email,
    username: dbProfile.username,
    fullName: dbProfile.full_name,
    avatarUrl: dbProfile.avatar_url,
    bio: dbProfile.bio,
    createdAt: dbProfile.created_at,
    updatedAt: dbProfile.updated_at
  }
}

export function mapProfileToSnakeCase(payload: ProfileUpdatePayload): ProfileUpdatePayloadSnakeCase {
  const result: ProfileUpdatePayloadSnakeCase = {}

  if (payload.fullName !== undefined) {
    result.full_name = payload.fullName
  }

  if (payload.bio !== undefined) {
    result.bio = payload.bio
  }

  if (payload.avatarUrl !== undefined) {
    result.avatar_url = payload.avatarUrl
  }

  return result
}
