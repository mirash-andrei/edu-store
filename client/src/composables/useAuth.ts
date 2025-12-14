import { ref, type Ref } from 'vue';

const AUTH_KEY = 'auth';

export interface UseAuthReturn {
  isAuthenticated: Ref<boolean>;
  login: () => void;
  logout: () => void;
  checkAuth: () => void;
}

export function useAuth(): UseAuthReturn {
  const isAuthenticated: Ref<boolean> = ref(false);

  const checkAuth = (): void => {
    const authValue = localStorage.getItem(AUTH_KEY);
    isAuthenticated.value = authValue === 'true';
  };

  const login = (): void => {
    localStorage.setItem(AUTH_KEY, 'true');
    isAuthenticated.value = true;
  };

  const logout = (): void => {
    localStorage.removeItem(AUTH_KEY);
    isAuthenticated.value = false;
  };

  const handleStorageChange = (e: StorageEvent): void => {
    if (e.key === AUTH_KEY) {
      checkAuth();
    }
  };

  window.addEventListener('storage', handleStorageChange);
  checkAuth();

  return {
    isAuthenticated,
    login,
    logout,
    checkAuth
  };
}

