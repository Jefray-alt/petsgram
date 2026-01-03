import { defineStore } from 'pinia'
import type { Profile, ProfileRow } from '@/types/profile.types'
import { mapProfileToCamelCase } from '@/utils/mappers/profile.mapper'

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null as Profile | null,
    profileRow: null as ProfileRow | null
  }),

  actions: {
    async fetchProfile() {
      // Skip if we already have the profile
      if (this.hasProfile && this.profileRow) {
        return
      }

      const supabaseClient = useSupabaseClient()
      const { data: { user } } = await supabaseClient.auth.getUser()

      if (!user?.id) {
        this.setProfile(null, null)
        return
      }

      const { data, error } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        console.log('Error fetching user profile:', error)
        this.setProfile(null, null)
        return
      }

      const profile = mapProfileToCamelCase(data)
      this.setProfile(profile, data)
    },

    setProfile(profile: Profile | null, profileRow: ProfileRow | null = null) {
      this.profile = profile
      this.profileRow = profileRow
    },

    clearProfile() {
      this.profile = null
      this.profileRow = null
    }
  },

  getters: {
    hasProfile: state => state.profile !== null,
    currentUser: state => state.profileRow
  }
})
