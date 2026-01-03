import type { LoginPayload } from './useLogin.types'
import { useUser } from '@/composables/useUser/useUser'

export const useLogin = () => {
  const supabaseClient = useSupabaseClient()
  const isLoggingIn = ref(false)
  const isLoginError = ref(false)
  const loginErrorMessage = ref('')
  const { getUserProfile } = useUser()

  const loginUser = async (data: LoginPayload) => {
    isLoggingIn.value = true
    isLoginError.value = false
    loginErrorMessage.value = ''

    try {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email: data.email,
        password: data.password
      })

      if (error) throw error

      await getUserProfile()
    } catch (error) {
      if (error instanceof Error && error.message.includes('Invalid login credentials')) {
        loginErrorMessage.value = 'Invalid login credentials'
      } else {
        loginErrorMessage.value = 'Unexpected error occurred'
      }
      isLoginError.value = true
    } finally {
      isLoggingIn.value = false
    }
  }

  return {
    loginUser,
    isLoggingIn,
    isLoginError,
    loginErrorMessage
  }
}
