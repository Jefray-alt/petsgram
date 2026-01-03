<script lang="ts" setup>
import ProfileCard from '@/components/Profile/Card.vue'

const userStore = useUserStore()

await userStore.fetchProfile()
</script>

<template>
  <UContainer class="py-12">
    <div class="flex flex-col md:flex-row gap-8">
      <ProfileCard
        v-if="userStore.currentUser"
        :id="userStore.currentUser.id"
        :full-name="userStore.currentUser.fullName || ''"
        :username="userStore.currentUser.username"
        :avatar-url="userStore.currentUser.avatarUrl || undefined"
        is-own-profile
      />
      <div class="flex-1">
        <!-- Main content area -->
      </div>
    </div>
  </UContainer>
</template>
