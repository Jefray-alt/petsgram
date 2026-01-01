<script lang="ts" setup>
import HeroBanner from '@/components/Login/HeroBanner.vue'
import LoginForm from '@/components/Login/Form.vue'

useSeoMeta({
  title: 'Login - Petsgram',
  description: 'Login to your Petsgram account and connect with fellow pet lovers.'
})

definePageMeta({
  middleware: 'auth',
  layout: false
})
</script>

<template>
  <UMain class="h-dvh flex flex-col md:flex-row">
    <HeroBanner />
    <LoginForm />
  </UMain>
</template>
