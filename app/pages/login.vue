<script lang="ts" setup>
</script>

<template>
  <div class="h-dvh flex flex-col md:flex-row">
    <div class="hidden md:flex bg-gradient-login md:w-2/3 h-full justify-center items-end-safe">
      <u-container class="text-white py-4">
        <h1 class="text-4xl mb-1">
          Welcome back to Petsgram!
        </h1>
        <h2 class="text-lg">
          Connect with fellow pet lovers and share the cutest moments from your furry friends' lives.
        </h2>
      </u-container>
    </div>
    <div class="flex-1 md:w-1/3 h-full flex flex-col justify-center md:bg-white bg-wheat-100  items-center p-6 md:p-0">
      <div class="w-full max-w-sm px-6 py-8 bg-white rounded-2xl shadow-lg md:rounded-none md:shadow-none">
        <div class="mb-6">
          <h3 class="text-2xl font-semibold">
            Login
          </h3>
          <h2 class="block md:hidden">
            Welcome back to Petsgram!
          </h2>
        </div>

        <u-form class="space-y-4">
          <u-form-field label="Email">
            <u-input
              class="w-full"
              type="email"
              placeholder="Enter your email"
            />
          </u-form-field>

          <u-form-field label="Password">
            <u-input
              class="w-full"
              type="password"
              placeholder="Enter your password"
            />
          </u-form-field>

          <u-button
            block
            size="lg"
            class="mt-6"
          >
            Login
          </u-button>

          <u-button
            block
            size="lg"
            variant="outline"
          >
            Register
          </u-button>

          <div class="text-center mt-4">
            <u-button
              variant="link"
              size="sm"
            >
              Forgot Password?
            </u-button>
          </div>
        </u-form>
      </div>
    </div>
  </div>
</template>
