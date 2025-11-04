import { ref } from 'vue'

const AUTH_KEY = 'auth'

export function useAuth() {
  const isAuthenticated = ref(false)

  const checkAuth = () => {
    const authValue = localStorage.getItem(AUTH_KEY)
    isAuthenticated.value = authValue === 'true'
  }

  const login = () => {
    localStorage.setItem(AUTH_KEY, 'true')
    isAuthenticated.value = true
  }

  const logout = () => {
    localStorage.removeItem(AUTH_KEY)
    isAuthenticated.value = false
  }

  const handleStorageChange = (e) => {
    if (e.key === AUTH_KEY) {
      checkAuth()
    }
  }

  window.addEventListener('storage', handleStorageChange)
  checkAuth()

  return {
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
}
