export default defineNuxtRouteMiddleware((to, _) => {
  const user = useSupabaseUser()
  const guestOnlyRoutes = ['/login', '/register']
  const protectedRoutes = ['/profile', '/profile/pets']

  if (user.value && guestOnlyRoutes.includes(to.path)) {
    return navigateTo('/')
  }

  if (!user.value && protectedRoutes.includes(to.path)) {
    return navigateTo('/')
  }
})
