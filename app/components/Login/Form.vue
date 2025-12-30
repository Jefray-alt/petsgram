<script lang="ts" setup>
import Joi from 'joi'
import type { FormSubmitEvent } from '@nuxt/ui'

const loginFormSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
  password: Joi.string().min(6).required().label('Password')
})

const loginForm = reactive({
  email: undefined as string | undefined,
  password: undefined as string | undefined
})

const onSubmit = (event: FormSubmitEvent<typeof loginForm>) => {
  console.log('Login form submitted:', event.data)
}
</script>

<template>
  <div class="flex-1 md:w-1/3 h-full flex flex-col justify-center md:bg-white bg-wheat-100 items-center p-6 md:p-0">
    <div class="w-full max-w-sm px-6 py-8 bg-white rounded-2xl shadow-lg md:rounded-none md:shadow-none">
      <div class="mb-6">
        <h3 class="text-2xl font-semibold">
          Login
        </h3>
        <h2 class="block md:hidden">
          Welcome back to Petsgram!
        </h2>
      </div>

      <u-form
        :schema="loginFormSchema"
        :state="loginForm"
        class="space-y-4"
        @submit="onSubmit"
      >
        <u-form-field
          label="Email"
          name="email"
          required
        >
          <u-input
            v-model="loginForm.email"
            class="w-full"
            type="email"
            placeholder="Enter your email"
          />
        </u-form-field>
        <u-form-field
          label="Password"
          name="password"
          required
        >
          <u-input
            v-model="loginForm.password"
            class="w-full"
            type="password"
            placeholder="Enter your password"
          />
        </u-form-field>
        <u-button
          block
          size="lg"
          class="mt-6"
          type="submit"
        >
          Login
        </u-button>
        <u-button
          block
          size="lg"
          variant="outline"
          to="/register"
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
</template>
