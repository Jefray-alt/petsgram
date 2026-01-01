<template>
  <UHeader mode="drawer">
    <template #title>
      <NuxtLink
        to="/"
        class="text-xl font-bold"
      >
        Petsgram
      </NuxtLink>
    </template>

    <template #right>
      <UColorModeButton />
      <UButton
        icon="ic:baseline-account-circle"
        to="/login"
        as="NuxtLink"
      />
    </template>
  </UHeader>
</template>
