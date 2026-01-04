<script lang="ts" setup>
import { ref, reactive, watch, computed } from 'vue'
import Joi from 'joi'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useEditProfile } from '@/composables/useEditProfile/useEditProfile'
import { useUserStore } from '@/stores/userStore'

interface Props {
  fullName: string
  username: string
  avatarUrl?: string
  bio?: string
}

const props = defineProps<Props>()

const userStore = useUserStore()
const { isUpdating, isUpdateError, updateErrorMessage, updateProfile } = useEditProfile()

const isOpen = defineModel<boolean>('open', { default: false })

const BIO_MAX_LENGTH = 150

const editProfileSchema = Joi.object({
  fullName: Joi.string().min(2).max(50).required().label('Full Name'),
  bio: Joi.string().max(BIO_MAX_LENGTH).allow('').label('Bio')
})

const formState = reactive({
  fullName: '',
  bio: ''
})

const avatarFile = ref<File | null>(null)
const avatarPreview = ref<string | undefined>(undefined)

const bioCharacterCount = computed(() => formState.bio?.length || 0)
const bioCharactersRemaining = computed(() => BIO_MAX_LENGTH - bioCharacterCount.value)

// Sync form state with props when modal opens
watch(isOpen, (open) => {
  if (open) {
    formState.fullName = props.fullName || ''
    formState.bio = props.bio || ''
    avatarFile.value = null
    avatarPreview.value = props.avatarUrl
    return
  }

  isUpdateError.value = false
})

const handleAvatarChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    avatarFile.value = file
    avatarPreview.value = URL.createObjectURL(file)
  }
}

const handleCancel = () => {
  isOpen.value = false
}

const onSubmit = async (_event: FormSubmitEvent<typeof formState>) => {
  const userId = userStore.profile?.id
  if (!userId) {
    return
  }

  await updateProfile(userId, {
    fullName: formState.fullName,
    bio: formState.bio,
    avatarFile: avatarFile.value ?? undefined
  })

  isOpen.value = !!isUpdateError.value
}
</script>

<template>
  <UModal v-model:open="isOpen">
    <template #content>
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold">
            Edit Profile
          </h2>
          <UButton
            icon="lucide:x"
            variant="ghost"
            color="neutral"
            size="sm"
            @click="handleCancel"
          />
        </div>

        <UForm
          :schema="editProfileSchema"
          :state="formState"
          class="space-y-4"
          @submit="onSubmit"
        >
          <!-- Avatar Upload -->
          <div class="flex flex-col items-center gap-4">
            <UAvatar
              :src="avatarPreview"
              :alt="formState.fullName"
              size="3xl"
              class="w-24 h-24"
            />
            <label class="cursor-pointer">
              <UButton
                as="span"
                variant="outline"
                size="sm"
                icon="lucide:upload"
              >
                Change Avatar
              </UButton>
              <input
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleAvatarChange"
              >
            </label>
          </div>

          <!-- Full Name -->
          <UFormField
            label="Full Name"
            name="fullName"
            required
          >
            <UInput
              v-model="formState.fullName"
              class="w-full"
              type="text"
              placeholder="Enter your full name"
            />
          </UFormField>

          <!-- Username (Read-only with tooltip) -->
          <UFormField
            label="Username"
            name="username"
          >
            <UInput
              :model-value="username"
              class="w-full"
              type="text"
              disabled
              variant="none"
              :ui="{ base: 'bg-gray-100 text-gray-500 cursor-not-allowed' }"
            >
              <template #trailing>
                <UTooltip text="Username cannot be edited for now">
                  <Icon
                    name="lucide:info"
                    class="text-gray-400 cursor-help"
                  />
                </UTooltip>
              </template>
            </UInput>
          </UFormField>

          <!-- Bio -->
          <UFormField
            label="Bio"
            name="bio"
          >
            <UTextarea
              v-model="formState.bio"
              class="w-full"
              placeholder="Tell us about yourself..."
              :maxlength="BIO_MAX_LENGTH"
              :rows="3"
            />
            <template #hint>
              <span :class="{ 'text-red-500': bioCharactersRemaining < 0 }">
                {{ bioCharactersRemaining }} characters remaining
              </span>
            </template>
          </UFormField>

          <!-- Error Message -->
          <UAlert
            v-if="isUpdateError"
            color="error"
            variant="subtle"
            icon="lucide:circle-alert"
            :title="updateErrorMessage"
          />

          <!-- Actions -->
          <div class="flex justify-end gap-3 pt-4">
            <UButton
              variant="outline"
              color="neutral"
              :disabled="isUpdating"
              @click="handleCancel"
            >
              Cancel
            </UButton>
            <UButton
              type="submit"
              color="success"
              :loading="isUpdating"
            >
              Submit
            </UButton>
          </div>
        </UForm>
      </div>
    </template>
  </UModal>
</template>
