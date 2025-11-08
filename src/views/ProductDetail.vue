<template>
  <div class="product-detail">
    <div v-if="loading" class="loading">Загрузка товара...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="product" class="product-content">
      <div class="product-image">
        <img :src="product.image" :alt="product.title" />
      </div>
      <div class="product-info">
        <h1>{{ product.title }}</h1>
        <p class="category">{{ product.category }}</p>
        <p class="price">${{ product.price }}</p>
        <div class="rating">
          ⭐ {{ product.rating.rate }} ({{ product.rating.count }} отзывов)
        </div>
        <p class="description">{{ product.description }}</p>
        <button class="btn-cart" @click="addToCart">Добавить в корзину</button>
        <router-link to="/products" class="btn-back">
          Вернуться к каталогу
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProduct } from '../composables/useProduct'
import { addToCart } from '../utils/cart.js'

const route = useRoute()

const getProductId = () => {
  const id = route.params.id
  if (typeof id === 'string') {
    return parseInt(id, 10)
  }
  if (Array.isArray(id)) {
    return parseInt(id[0], 10)
  }
  return 0
}

const productId = computed(() => getProductId())

const { product, loading, error, loadProduct } = useProduct(productId.value)

const loadProductData = () => {
  const id = productId.value
  if (id > 0) {
    loadProduct(id)
  }
}

onMounted(() => {
  loadProductData()
})

watch(() => route.params.id, () => {
  loadProductData()
})
</script>


<style scoped>
.product-detail {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.loading,
.error {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
}

.error {
  color: #dc3545;
}

.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-top: 20px;
}

.product-image img {
  width: 100%;
  height: 500px;
  object-fit: contain;
  background: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
}

.product-info h1 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #333;
}

.category {
  font-size: 1.1rem;
  color: #888;
  margin-bottom: 20px;
}

.price {
  font-size: 2rem;
  font-weight: bold;
  color: #28a745;
  margin-bottom: 15px;
}

.rating {
  font-size: 1.1rem;
  color: #ff9800;
  margin-bottom: 20px;
}

.description {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 30px;
}

.btn-cart {
  background: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  margin-right: 15px;
}

.btn-cart:hover {
  background: #0056b3;
}

.btn-back {
  display: inline-block;
  background: #6c757d;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.3s;
}

.btn-back:hover {
  background: #5a6268;
}

@media (max-width: 768px) {
  .product-content {
    grid-template-columns: 1fr;
  }
}
</style>

