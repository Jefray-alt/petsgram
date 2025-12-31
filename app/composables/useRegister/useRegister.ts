import type { RegisterPayload } from './useRegister.types'

export const useRegister = () => {
  const isSigningUp = ref(false)
  const isSignUpError = ref(false)

  const registerUser = async (data: RegisterPayload) => {
    isSigningUp.value = true

    try {
      const supabaseClient = useSupabaseClient()
      const { error } = await supabaseClient.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            username: data.username
          }
        }
      })

      if (error) throw error
    } catch (error) {
      console.log('Unexpected error registering user:', error)
      isSignUpError.value = true
    } finally {
      isSigningUp.value = false
    }
  }

  return {
    registerUser,
    isSigningUp,
    isSignUpError
  }
}
