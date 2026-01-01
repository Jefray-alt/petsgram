import type { Profile, ProfileRow } from '@/types/profile.types'
import { useUserStore } from '@/stores/userStore'
import { mapProfileToCamelCase } from '@/utils/mappers/profile.mapper'

export const useUser = () => {
  const supabaseClient = useSupabaseClient()
  const user = useSupabaseUser()
  const userStore = useUserStore()

  const fetchUserProfile = async (): Promise<ProfileRow | null> => {
    if (!user.value) {
      return null
    }

    const { data, error } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', user.value.id)
      .single()

    if (error) {
      console.log('Error fetching user profile:', error)
      throw error
    }

    return data
  }

  const getUserProfile = async (): Promise<Profile | null> => {
    // Check if profile exists in Pinia store first
    if (userStore.hasProfile && userStore.profile) {
      return userStore.profile
    }

    // If not in store, fetch from Supabase
    const dbProfile = await fetchUserProfile()

    if (!dbProfile) {
      return null
    }

    // Map snake_case to camelCase
    const profile = mapProfileToCamelCase(dbProfile)

    // Store in Pinia for future use
    userStore.setProfile(profile)

    return profile
  }

  return {
    user,
    fetchUserProfile,
    getUserProfile
  }
}
