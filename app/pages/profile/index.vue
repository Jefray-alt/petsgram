<script lang="ts" setup>
import ProfileCard from '@/components/Profile/Card.vue'
import ProfilePets from '@/components/Profile/Pets.vue'
import ProfilePhotos from '@/components/Profile/Photos.vue'

const userStore = useUserStore()

await userStore.fetchProfile()
</script>

<template>
  <UContainer class="py-12">
    <div class="flex flex-col lg:flex-row lg:gap-20 gap-8">
      <ProfileCard
        v-if="userStore.currentUser"
        :id="userStore.currentUser.id"
        :full-name="userStore.currentUser.fullName || ''"
        :username="userStore.currentUser.username"
        :avatar-url="userStore.currentUser.avatarUrl || undefined"
        is-own-profile
      />
      <div class="flex-1">
        <ProfilePets />
        <ProfilePhotos />
      </div>
    </div>
  </UContainer>
</template>
