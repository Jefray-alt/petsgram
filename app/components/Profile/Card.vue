<script lang="ts" setup>
interface Props {
  id: string
  fullName: string
  username: string
  avatarUrl?: string
  isOwnProfile?: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="w-full md:w-1/6 flex flex-col items-center md:items-start">
    <UAvatar
      :src="avatarUrl"
      :alt="fullName"
      size="3xl"
      class="w-48 h-48 mb-4"
    />
    <div class="text-center md:text-left">
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
      to="/profile/edit"
    >
      Edit profile
    </UButton>
  </div>
</template>
