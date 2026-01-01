<script setup lang="ts">
import Header from '@/components/Header/Header.vue'
</script>

<template>
  <div>
    <Header />
    <UMain>
      <slot />
    </UMain>
  </div>
</template>
