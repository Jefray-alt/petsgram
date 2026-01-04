import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { mapProfileToSnakeCase } from '@/utils/mappers/profile.mapper'
import { EditProfileError } from '@/errors/EditProfileError.error'
import type { EditProfilePayload } from '@/composables/useEditProfile/useEditProfile.types'

export function useEditProfile() {
  const supabaseClient = useSupabaseClient()
  const userStore = useUserStore()

  const isUpdating = ref(false)
  const isUpdateError = ref(false)
  const updateErrorMessage = ref('')

  const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1MB
  const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

  const getFileExtension = (file: File): string => {
    const name = file.name
    const lastDot = name.lastIndexOf('.')

    if (lastDot === -1) {
      throw new EditProfileError('File must have a valid extension')
    }

    return name.substring(lastDot + 1).toLowerCase()
  }

  const validateAvatarFile = (file: File): void => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      throw new EditProfileError('Please upload a valid image file (JPEG, PNG, GIF, or WebP)')
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new EditProfileError('Image size must be less than 1MB')
    }
  }

  const uploadAvatar = async (userId: string, file: File): Promise<string> => {
    validateAvatarFile(file)

    const extension = getFileExtension(file)
    const timestamp = Date.now()
    const filePath = `${userId}/${timestamp}.${extension}`

    const { error: uploadError } = await supabaseClient.storage
      .from('profile_avatars')
      .upload(filePath, file, {
        cacheControl: '3600'
      })

    if (uploadError) {
      throw uploadError
    }

    const { data: { publicUrl } } = supabaseClient.storage
      .from('profile_avatars')
      .getPublicUrl(filePath)

    return publicUrl
  }

  const updateProfile = async (userId: string, payload: EditProfilePayload): Promise<void> => {
    isUpdating.value = true
    isUpdateError.value = false
    updateErrorMessage.value = ''

    try {
      let avatarUrl: string | undefined

      // Upload avatar if provided
      if (payload.avatarFile) {
        avatarUrl = await uploadAvatar(userId, payload.avatarFile)
      }

      // Prepare update payload
      const updatePayload = mapProfileToSnakeCase({
        fullName: payload.fullName,
        bio: payload.bio,
        avatarUrl
      })

      // Update profiles table
      const { error: updateError } = await supabaseClient
        .from('profiles')
        .update(updatePayload)
        .eq('id', userId)

      if (updateError) {
        throw updateError
      }

      // Refetch profile from server to ensure store has fresh data
      await userStore.fetchProfile(true)
    } catch (error) {
      console.error('Error updating profile:', error)
      isUpdateError.value = true

      if (error instanceof EditProfileError) {
        updateErrorMessage.value = error.message
      } else {
        updateErrorMessage.value = 'An unexpected error occurred while updating your profile'
      }
    } finally {
      isUpdating.value = false
    }
  }

  return {
    isUpdating,
    isUpdateError,
    updateErrorMessage,
    updateProfile
  }
}
