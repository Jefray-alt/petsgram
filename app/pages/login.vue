<script lang="ts" setup>
import HeroBanner from '@/components/Login/HeroBanner.vue'
import LoginForm from '@/components/Login/Form.vue'

useSeoMeta({
  title: 'Login - Petsgram',
  description: 'Login to your Petsgram account and connect with fellow pet lovers.'
})
</script>

<template>
  <div class="h-dvh flex flex-col md:flex-row">
    <HeroBanner />
    <LoginForm />
  </div>
</template>
