<template>
  <div class="login-page">
    <div class="login-container">
      <template v-if="isAuthenticated">
        <h1>Привет, {{ username }}!</h1>
        <button @click="handleLogout" class="btn-logout">Выйти</button>
      </template>
      <template v-else>
        <h1>Вход в систему</h1>
        <form @submit.prevent="handleSubmit" class="login-form">
          <div class="form-group">
            <label for="username">Имя пользователя</label>
            <input
                id="username"
                v-model="usernameInput"
                type="text"
                required
                class="form-input"
                placeholder="Введите имя пользователя"
            />
          </div>
          <div class="form-group">
            <label for="password">Пароль</label>
            <input
                id="password"
                v-model="password"
                type="password"
                required
                class="form-input"
                placeholder="Введите пароль"
            />
          </div>
          <div v-if="error" class="error-message">{{ error }}</div>
          <button type="submit" class="btn-login">Войти</button>
        </form>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const { isAuthenticated, username } = storeToRefs(authStore)
const { login, logout, checkAuth, listenStorageChanges } = authStore

const usernameInput = ref(username.value || '')
const password = ref('')
const error = ref('')

onMounted(() => {
  checkAuth()
  listenStorageChanges()
})

const handleSubmit = () => {
  error.value = ''

  if (usernameInput.value.trim() && password.value.trim()) {
    login(usernameInput.value)

    const redirect = route.query.redirect
    if (typeof redirect === 'string') {
      router.push(redirect)
    } else {
      router.push('/')
    }
  } else {
    error.value = 'Пожалуйста, заполните все поля'
  }
}

const handleLogout = () => {
  logout()
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: 20px;
}

.login-container {
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-container h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.login-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #007bff;
}

.error-message {
  color: #dc3545;
  margin-bottom: 15px;
  padding: 10px;
  background: #f8d7da;
  border-radius: 8px;
}

.btn-login, .btn-logout {
  width: 100%;
  background: #007bff;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-login:hover {
  background: #0056b3;
}

.login-hint {
  text-align: center;
  font-size: 0.9rem;
  color: #666;
  margin-top: 20px;
}

.btn-logout:hover {
  background: #c82333;
}
</style>
