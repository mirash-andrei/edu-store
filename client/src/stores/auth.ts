import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

const AUTH_KEY = 'auth';
const USERNAME_KEY = 'username';

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated: Ref<boolean> = ref(false);
    const username: Ref<string> = ref(localStorage.getItem(USERNAME_KEY) || '');

    const checkAuth = (): void => {
        const authValue = localStorage.getItem(AUTH_KEY);
        isAuthenticated.value = authValue === 'true';
        username.value = localStorage.getItem(USERNAME_KEY) || '';
    };

    const login = (user: string): void => {
        localStorage.setItem(AUTH_KEY, 'true');
        localStorage.setItem(USERNAME_KEY, user);
        isAuthenticated.value = true;
        username.value = user;
    };

    const logout = (): void => {
        localStorage.removeItem(AUTH_KEY);
        localStorage.removeItem(USERNAME_KEY);
        isAuthenticated.value = false;
        username.value = '';
    };

    const listenStorageChanges = (): void => {
        window.addEventListener('storage', (e: StorageEvent) => {
            if (e.key === AUTH_KEY || e.key === USERNAME_KEY) {
                checkAuth();
            }
        });
    };

    checkAuth();
    listenStorageChanges();

    return {
        isAuthenticated,
        username,
        checkAuth,
        login,
        logout,
        listenStorageChanges,
    };
});

