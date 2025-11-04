<template>
  <div class="products-page">
    <h1>Каталог товаров</h1>
    
    <div v-if="loading" class="loading">Загрузка товаров...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="products.length === 0" class="empty">Товары не найдены</div>
    <div v-else class="products-grid">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
      >
        <img :src="product.image" :alt="product.title" />
        <div class="product-info">
          <h3 class="product-title">{{ product.title }}</h3>
          <p class="product-category">{{ product.category }}</p>
          <p class="product-price">${{ product.price }}</p>
          <router-link
            :to="`/products/${product.id}`"
            class="btn-details"
          >
            Подробнее
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProducts } from '../composables/useProducts'

const { products, loading, error, loadProducts } = useProducts()

onMounted(() => {
  loadProducts()
})
</script>


<style scoped>
.products-page {
  padding: 20px;
  max-width: 1440px;
  margin: 0 auto;
}

.products-page h1 {
  margin-bottom: 30px;
  color: #333;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
}

.error {
  color: #dc3545;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  background: #fff;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.product-card img {
  width: 100%;
  height: 250px;
  object-fit: contain;
  background: #f9f9f9;
  margin-bottom: 15px;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-category {
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #28a745;
  margin-bottom: 15px;
}

.btn-details {
  display: inline-block;
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
  transition: background 0.3s;
}

.btn-details:hover {
  background: #0056b3;
}
</style>

