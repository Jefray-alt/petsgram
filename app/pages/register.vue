<script lang="ts" setup>
import HeroBanner from '@/components/Register/HeroBanner.vue'
import RegisterForm from '@/components/Register/Form.vue'

useSeoMeta({
  title: 'Register - Petsgram',
  description: 'Create a new Petsgram account and join our community of pet lovers.'
})
</script>

<template>
  <div class="h-dvh flex flex-col md:flex-row">
    <HeroBanner />
    <RegisterForm />
  </div>
</template>
