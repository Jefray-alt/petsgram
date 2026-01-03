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
        <UButton
          icon="ic:baseline-account-circle"
          trailing-icon="lucide:chevron-down"
          color="secondary"
          variant="outline"
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
import { useLogout } from '@/composables/useLogout/useLogout'

const userStore = useUserStore()
const { logout, isLoggingOut } = useLogout()

const dropdownItems = [
  {
    label: 'Profile',
    icon: 'lucide:user',
    to: '/profile'
  },
  {
    label: 'Log out',
    icon: 'lucide:log-out',
    onSelect: logout,
    disabled: isLoggingOut.value
  }
]
</script>
