import { defineStore } from 'pinia'
import type { Profile } from '@/types/profile.types'

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null as Profile | null
  }),

  actions: {
    setProfile(profile: Profile | null) {
      this.profile = profile
    },

    clearProfile() {
      this.profile = null
    }
  },

  getters: {
    hasProfile: state => state.profile !== null
  }
})
