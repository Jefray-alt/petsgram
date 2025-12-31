<script lang="ts" setup>
import Joi from 'joi'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useRegister } from '@/composables/useRegister/useRegister'

const { isSigningUp, isSignUpError, signUpErrorMessage, registerUser } = useRegister()
const router = useRouter()

const registerFormSchema = Joi.object({
  username: Joi.string().min(3).max(20).required().label('Username'),
  email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
  password: Joi.string().min(6).required().label('Password')
})

const registerForm = reactive({
  username: '',
  email: '',
  password: ''
})

const onSubmit = async (event: FormSubmitEvent<typeof registerForm>) => {
  await registerUser(event.data)

  if (isSignUpError.value) return
  router.push('/')
}
</script>

<template>
  <div class="flex-1 md:w-1/3 h-full flex flex-col justify-center md:bg-white bg-wheat-100 items-center p-6 md:p-0">
    <div class="w-full max-w-sm px-6 py-8 bg-white rounded-2xl shadow-lg md:rounded-none md:shadow-none">
      <div class="mb-6">
        <h3 class="text-2xl font-semibold">
          Register
        </h3>
        <h2 class="block md:hidden">
          Join Petsgram today!
        </h2>
      </div>

      <UForm
        :schema="registerFormSchema"
        :state="registerForm"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UAlert
          v-if="isSignUpError"
          :description="signUpErrorMessage"
          color="error"
          variant="subtle"
          title="Oops!"
          icon="ic:twotone-error-outline"
        />
        <UFormField
          label="Username"
          name="username"
          required
        >
          <UInput
            v-model="registerForm.username"
            class="w-full"
            type="text"
            placeholder="Enter your username"
            autocomplete="username"
          />
        </UFormField>
        <UFormField
          label="Email"
          name="email"
          required
        >
          <UInput
            v-model="registerForm.email"
            class="w-full"
            type="email"
            placeholder="Enter your email"
            autocomplete="email"
          />
        </UFormField>
        <UFormField
          label="Password"
          name="password"
          required
        >
          <UInput
            v-model="registerForm.password"
            class="w-full"
            type="password"
            placeholder="Enter your password"
            autocomplete="new-password"
          />
        </UFormField>
        <UButton
          block
          size="lg"
          class="mt-6"
          type="submit"
          :loading="isSigningUp"
        >
          Register
        </UButton>
        <UButton
          block
          size="lg"
          variant="outline"
          to="/login"
          as="NuxtLink"
        >
          <Icon name="ic:baseline-arrow-back" />
          Log in instead
        </UButton>
      </UForm>
    </div>
  </div>
</template>
