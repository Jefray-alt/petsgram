<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

await callOnce(() => userStore.fetchProfile())
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
