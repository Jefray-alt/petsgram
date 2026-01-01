<template>
  <UHeader mode="drawer">
    <template #title>
      <NuxtLink
        to="/"
        class="text-xl font-bold"
      >
        Petsgram
      </NuxtLink>
    </template>

    <template #right>
      <UColorModeButton />
      <NuxtLink :to="currentUser ? '/profile' : '/login'">
        <UAvatar
          icon="ic:baseline-account-circle"
        />
      </NuxtLink>
    </template>
  </UHeader>
</template>

<script lang="ts" setup>
import { useUser } from '@/composables/useUser/useUser'

const { getUserProfile, currentUser } = useUser()

await getUserProfile()
</script>
