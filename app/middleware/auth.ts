export default defineNuxtRouteMiddleware((_, __) => {
  const user = useSupabaseUser()

  if (user.value) {
    return navigateTo('/')
  }
})
