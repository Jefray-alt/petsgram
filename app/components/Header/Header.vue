<template>
  <UHeader
    mode="drawer"
    title="Petsgram"
  >
    <template #right>
      <UColorModeButton />
      <UButton
        v-if="userStore.currentUser"
        to="/profile/pets"
        icon="ic:baseline-pets"
        color="primary"
      />
      <UDropdownMenu
        v-if="userStore.currentUser"
        :items="dropdownItems"
      >
        <UAvatar
          icon="ic:baseline-account-circle"
        />
      </UDropdownMenu>
      <NuxtLink
        v-else
        to="/login"
      >
        <UAvatar
          icon="ic:baseline-account-circle"
        />
      </NuxtLink>
    </template>
  </UHeader>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const dropdownItems = [
  {
    label: 'Profile',
    icon: 'lucide:user',
    to: '/profile'
  },
  {
    label: 'Log out',
    icon: 'lucide:log-out'
  }
]
</script>
