<script lang="ts" setup>
import { ref } from 'vue'
import EditModal from '@/components/Profile/EditModal.vue'

interface Props {
  id: string
  fullName: string
  username: string
  avatarUrl?: string
  bio?: string
  isOwnProfile?: boolean
}

const props = defineProps<Props>()

const isEditModalOpen = ref(false)

const openEditModal = () => {
  isEditModalOpen.value = true
}
</script>

<template>
  <div class="w-full lg:w-1/6 flex flex-col items-center lg:items-start">
    <UAvatar
      :src="avatarUrl"
      :alt="fullName"
      size="3xl"
      class="w-48 h-48 mb-4"
    />
    <div class="text-center lg:text-left">
      <h1 class="text-2xl font-bold">
        {{ fullName }}
      </h1>
      <p class="text-lg text-gray-500">
        {{ username }}
      </p>
    </div>
    <UButton
      v-if="isOwnProfile"
      block
      variant="outline"
      class="mt-4"
      @click="openEditModal"
    >
      Edit profile
    </UButton>

    <EditModal
      v-model:open="isEditModalOpen"
      :full-name="props.fullName"
      :username="props.username"
      :avatar-url="props.avatarUrl"
      :bio="props.bio"
    />
  </div>
</template>
