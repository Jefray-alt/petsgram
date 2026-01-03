<script lang="ts" setup>
import EmptyState from '@/components/EmptyState.vue'
</script>

<template>
  <div>
    <USeparator
      label="Photos"
    />
    <div class="flex my-6 gap-4 flex-wrap">
      <!-- <UCard variant="outline" class="w-1/2">
        <UUser
          name="Chico"
          size="2xl"
          description="Maltese"
          :avatar="{
            src: 'https://i.pravatar.cc/150?u=dog'
          }"
        />
      </UCard> -->
      <EmptyState
        title="No photos added yet."
        description="Start by adding your first photo!"
        button-text="Add a photo"
        @click="() => {}"
      />
    </div>
  </div>
</template>
