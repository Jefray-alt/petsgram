import { RegisterError } from '@/errors/RegisterError.error'
import type { RegisterPayload } from './useRegister.types'

export const useRegister = () => {
  const supabaseClient = useSupabaseClient()
  const isSigningUp = ref(false)
  const isSignUpError = ref(false)
  const signUpErrorMessage = ref('')

  const verifyIfUserExists = async (email: string, username?: string) => {
    const credentialsMatch = {
      email: false,
      username: false
    }

    let query = supabaseClient
      .from('profiles')
      .select('email, username')

    if (username) {
      query = query.or(`email.eq.${email},username.eq.${username}`)
    } else {
      query = query.eq('email', email)
    }

    const { data, error } = await query

    if (error) {
      console.log('Error checking existing user by email:', error)
      throw error
    }

    credentialsMatch.email = data?.some(profile => profile.email === email)
    credentialsMatch.username = data?.some(profile => profile.username === username)

    return credentialsMatch
  }

  const registerUser = async (data: RegisterPayload) => {
    isSigningUp.value = true

    try {
      const userExists = await verifyIfUserExists(data.email, data.username)

      if (userExists.email && userExists.username) {
        throw new RegisterError('User with this email and username already exists')
      }

      if (userExists.email) {
        throw new RegisterError('User with this email already exists')
      }

      if (userExists.username) {
        throw new RegisterError('User with this username already exists')
      }

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
      signUpErrorMessage.value = error instanceof RegisterError ? error.message : 'Registration error. Please check your details and try again.'
      isSignUpError.value = true
    } finally {
      isSigningUp.value = false
    }
  }

  return {
    registerUser,
    isSigningUp,
    isSignUpError,
    signUpErrorMessage
  }
}
