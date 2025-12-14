<template>
  <div class="home">
    <h1>Добро пожаловать в интернет-магазин</h1>
    <p>Начните покупки, просмотрев наш каталог товаров</p>
    <router-link to="/products" class="btn-primary">
      Перейти в каталог
    </router-link>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home {
  text-align: center;
  padding: 40px 20px;
}

.home h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
}

.home p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
}

.btn-primary {
  display: inline-block;
  background: #007bff;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.3s;
}

.btn-primary:hover {
  background: #0056b3;
}
</style>

