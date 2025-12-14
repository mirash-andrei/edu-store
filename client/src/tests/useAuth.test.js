import { describe, it, expect, beforeEach } from 'vitest'
import { useAuth } from '../composables/useAuth.js'

describe('useAuth composable', () => {
    beforeEach(() => {
        localStorage.clear()
        alert.mockClear()
    })

    it('initially sets isAuthenticated based on localStorage value', () => {
        localStorage.setItem('auth', 'true')
        const { isAuthenticated } = useAuth()
        expect(isAuthenticated.value).toBe(true)

        localStorage.setItem('auth', 'false')
        const { isAuthenticated: isAuth2 } = useAuth()
        expect(isAuth2.value).toBe(false)
    })

    it('login() sets auth in localStorage and updates isAuthenticated', () => {
        const { login, isAuthenticated } = useAuth()
        login()
        expect(localStorage.getItem('auth')).toBe('true')
        expect(isAuthenticated.value).toBe(true)
    })

    it('logout() removes auth from localStorage and updates isAuthenticated', () => {
        localStorage.setItem('auth', 'true')
        const { logout, isAuthenticated } = useAuth()
        logout()
        expect(localStorage.getItem('auth')).toBeNull()
        expect(isAuthenticated.value).toBe(false)
    })

    it('checkAuth() updates isAuthenticated based on localStorage', () => {
        const { checkAuth, isAuthenticated } = useAuth()

        localStorage.setItem('auth', 'true')
        checkAuth()
        expect(isAuthenticated.value).toBe(true)

        localStorage.setItem('auth', 'false')
        checkAuth()
        expect(isAuthenticated.value).toBe(false)
    })
})
