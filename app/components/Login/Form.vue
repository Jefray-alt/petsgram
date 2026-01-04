<script lang="ts" setup>
import Joi from 'joi'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useLogin } from '@/composables/useLogin/useLogin'

const { isLoggingIn, isLoginError, loginErrorMessage, loginUser } = useLogin()
const router = useRouter()

const loginFormSchema = Joi.object({
  email: Joi.string().trim().email({ tlds: { allow: false } }).required().label('Email'),
  password: Joi.string().min(6).required().label('Password')
})

const loginForm = reactive({
  email: '',
  password: ''
})

const showPassword = ref(false)

const onSubmit = async (event: FormSubmitEvent<typeof loginForm>) => {
  await loginUser(event.data)

  if (isLoginError.value) return
  router.push('/')
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

      <UForm
        :schema="loginFormSchema"
        :state="loginForm"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UAlert
          v-if="isLoginError"
          :description="loginErrorMessage"
          color="error"
          title="Login Failed"
          variant="subtle"
        />
        <UFormField
          label="Email"
          name="email"
          required
        >
          <UInput
            v-model="loginForm.email"
            class="w-full"
            type="email"
            placeholder="Enter your email"
          />
        </UFormField>
        <UFormField
          label="Password"
          name="password"
          required
        >
          <UInput
            v-model="loginForm.password"
            class="w-full"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your password"
          >
            <template #trailing>
              <UButton
                :icon="showPassword ? 'lucide:eye-off' : 'lucide:eye'"
                variant="link"
                color="neutral"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormField>
        <UButton
          block
          size="lg"
          class="mt-6"
          type="submit"
          :loading="isLoggingIn"
        >
          Login
        </UButton>
        <UButton
          block
          size="lg"
          variant="outline"
          as="NuxtLink"
          to="/register"
        >
          Sign up instead
          <Icon name="ic:baseline-arrow-forward" />
        </UButton>
        <div class="text-center mt-4">
          <UButton
            variant="link"
            size="sm"
          >
            Forgot Password?
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>
