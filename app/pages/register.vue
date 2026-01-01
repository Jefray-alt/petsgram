<script lang="ts" setup>
import HeroBanner from '@/components/Register/HeroBanner.vue'
import RegisterForm from '@/components/Register/Form.vue'

useSeoMeta({
  title: 'Register - Petsgram',
  description: 'Create a new Petsgram account and join our community of pet lovers.'
})

definePageMeta({
  middleware: 'auth',
  layout: false
})
</script>

<template>
  <UMain class="h-dvh flex flex-col md:flex-row">
    <HeroBanner />
    <RegisterForm />
  </UMain>
</template>
