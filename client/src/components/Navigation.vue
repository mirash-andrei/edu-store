<template>
  <nav class="navigation">
    <div class="nav-container">
      <router-link to="/" class="nav-logo">
        Интернет-магазин
      </router-link>
      <ul class="nav-menu">
        <li>
          <router-link to="/" class="nav-link">Главная</router-link>
        </li>
        <li>
          <router-link to="/products" class="nav-link">Каталог</router-link>
        </li>
        <li>
          <router-link to="/cart" class="nav-link cart-link">
            Корзина
            <span v-if="cartCount > 0" class="cart-info">
              ({{ cartCount }} / ${{ total.toFixed(2) }} )
            </span>
          </router-link>
        </li>
        <li v-if="isAuthenticated">
          <router-link to="/add-product" class="nav-link">Добавить товар</router-link>
        </li>
        <li v-if="isAuthenticated">
          <span class="nav-user">Добро пожаловать, {{ username }}</span>
          <button @click="handleLogout" class="nav-link nav-btn">Выйти</button>
        </li>
        <li v-else>
          <router-link to="/login" class="nav-link">Войти</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();
const { logout } = authStore;
const { cartItems, total } = storeToRefs(cartStore);
const { isAuthenticated, username } = storeToRefs(authStore);

const cartCount: ComputedRef<number> = computed(() =>
    cartItems.value.reduce((sum: number, item) => sum + item.quantity, 0)
);

const handleLogout = (): void => {
  logout();
  router.push('/');
};
</script>

<style scoped>
.navigation {
  background: #007bff;
  color: white;
  padding: 15px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 20px;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.2);
}

.cart-link {
  position: relative;
}

.cart-info {
  font-weight: bold;
  margin-left: 4px;
  font-size: 0.95rem;
}

.nav-btn {
  background-color: #0b3664;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-family: inherit;
}

.nav-user {
  display: inline-block;
  margin-right: 8px;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 15px;
  }

  .nav-menu {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
