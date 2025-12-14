import { defineStore } from 'pinia'
import { ref } from 'vue'

const AUTH_KEY = 'auth'
const USERNAME_KEY = 'username'

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false)
    const username = ref(localStorage.getItem(USERNAME_KEY) || '')

    const checkAuth = () => {
        const authValue = localStorage.getItem(AUTH_KEY)
        isAuthenticated.value = authValue === 'true'
        username.value = localStorage.getItem(USERNAME_KEY) || ''
    }

    const login = (user) => {
        localStorage.setItem(AUTH_KEY, 'true')
        localStorage.setItem(USERNAME_KEY, user)
        isAuthenticated.value = true
        username.value = user
    }

    const logout = () => {
        localStorage.removeItem(AUTH_KEY)
        localStorage.removeItem(USERNAME_KEY)
        isAuthenticated.value = false
        username.value = ''
    }

    const listenStorageChanges = () => {
        window.addEventListener('storage', (e) => {
            if (e.key === AUTH_KEY || e.key === USERNAME_KEY) {
                checkAuth()
            }
        })
    }

    checkAuth()
    listenStorageChanges()

    return {
        isAuthenticated,
        username,
        checkAuth,
        login,
        logout,
        listenStorageChanges,
    }
})
