<template>
  <div class="products-page">
    <h1>Каталог товаров</h1>
    <div v-if="loading" class="loading">Загрузка товаров...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="!hasProducts" class="empty">Товары не найдены</div>
    <div v-else class="products-grid">
      <ProductItem
          v-for="product in products"
          :key="product.id"
          :product="product"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '../stores/products'
import ProductItem from '../components/ProductItem.vue'

const productsStore = useProductsStore()

const { products, loading, error, hasProducts } = storeToRefs(productsStore)
const { loadProducts } = productsStore

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
</style>

