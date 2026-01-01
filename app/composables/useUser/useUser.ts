import type { Profile, ProfileRow } from '@/types/profile.types'
import { useUserStore } from '@/stores/userStore'
import { mapProfileToCamelCase } from '@/utils/mappers/profile.mapper'

export const useUser = () => {
  const supabaseClient = useSupabaseClient()
  const userStore = useUserStore()
  const currentUser = ref<ProfileRow | null>(null)

  const fetchUserProfile = async (): Promise<ProfileRow | null> => {
    const { data: { user } } = await supabaseClient.auth.getUser()

    if (!user?.id) {
      return null
    }

    const { data, error } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      console.log('Error fetching user profile:', error)
      throw error
    }

    return data
  }

  const getUserProfile = async (): Promise<Profile | null> => {
    if (userStore.hasProfile && userStore.profile) {
      return userStore.profile
    }

    const dbProfile = await fetchUserProfile()

    if (!dbProfile) {
      return null
    }

    const profile = mapProfileToCamelCase(dbProfile)

    userStore.setProfile(profile)
    currentUser.value = dbProfile

    return profile
  }

  return {
    currentUser,
    fetchUserProfile,
    getUserProfile
  }
}
