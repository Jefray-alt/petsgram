import { useUserStore } from '@/stores/userStore'

export const useLogout = () => {
  const supabaseClient = useSupabaseClient()
  const userStore = useUserStore()
  const router = useRouter()
  const isLoggingOut = ref(false)
  const isLogoutError = ref(false)
  const logoutErrorMessage = ref('')

  const logout = async () => {
    isLoggingOut.value = true
    isLogoutError.value = false
    logoutErrorMessage.value = ''

    try {
      const { error } = await supabaseClient.auth.signOut()

      if (error) throw error

      userStore.clearProfile()
      await router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      logoutErrorMessage.value = 'An error occurred while logging out'
      isLogoutError.value = true
    } finally {
      isLoggingOut.value = false
    }
  }

  return {
    logout,
    isLoggingOut,
    isLogoutError,
    logoutErrorMessage
  }
}
