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
        <div class="quantity-box">
          <label for="quantity">Количество:</label>
          <input
              id="quantity"
              type="number"
              v-model.number="quantity"
              min="1"
              class="quantity-input"
          />
        </div>
        <button class="btn-cart" @click="handleAddToCart">
          Добавить в корзину
        </button>
        <router-link to="/products" class="btn-back">
          Вернуться к каталогу
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/product'
import { storeToRefs } from 'pinia'

const route = useRoute()
const cartStore = useCartStore()
const productStore = useProductStore()

const { addItem } = cartStore
const { product, loading, error } = storeToRefs(productStore)

const { loadProduct, clearProduct } = productStore

const quantity = ref(1)

const getProductId = () => {
  const id = route.params.id
  if (typeof id === 'string') return parseInt(id, 10)
  if (Array.isArray(id)) return parseInt(id[0], 10)
  return 0
}

const productId = computed(() => getProductId())

const loadProductData = () => {
  const id = productId.value
  if (id > 0) loadProduct(id)
}

const handleAddToCart = () => {
  if (!product.value) return
  for (let i = 0; i < quantity.value; i++) {
    addItem(product.value)
  }
  quantity.value = 1
  alert(`Добавлено ${quantity.value} шт. в корзину`)
}

onMounted(() => {
  loadProductData()
})

watch(() => route.params.id, () => {
  loadProductData()
})

onBeforeUnmount(() => {
  clearProduct()
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

.quantity-box {
  margin-bottom: 20px;
}

.quantity-box label {
  margin-right: 10px;
  font-weight: 600;
}

.quantity-input {
  width: 80px;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  text-align: center;
  font-size: 1rem;
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

