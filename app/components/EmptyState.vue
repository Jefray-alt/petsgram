<script lang="ts" setup>
defineProps<{
  title: string
  description: string
  buttonText: string
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <UCard class="w-full flex justify-center items-center py-12 text-center">
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">
        {{ title }}
      </h3>
      <p class="text-sm text-gray-600">
        {{ description }}
      </p>
    </div>
    <UButton @click="emit('click')">
      {{ buttonText }}
    </UButton>
  </UCard>
</template>
