<script lang="ts" setup>
import EmptyState from '@/components/EmptyState.vue'
</script>

<template>
  <div>
    <USeparator
      label="Pets"
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
        title="No pets added yet."
        description="Start by adding your first pet!"
        button-text="Add a pet"
        @click="() => {}"
      />
    </div>
  </div>
</template>
