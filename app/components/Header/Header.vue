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
      <NuxtLink :to="userStore.currentUser ? '/profile' : '/login'">
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
</script>
