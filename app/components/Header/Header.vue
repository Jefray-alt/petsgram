<template>
  <UHeader
    mode="drawer"
    title="Petsgram"
  >
    <template #right>
      <UColorModeButton />
      <UDropdownMenu
        v-if="userStore.currentUser"
        :items="dropdownItems"
      >
        <UButton
          icon="lucide:circle-user"
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
          icon="lucide:circle-user"
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
