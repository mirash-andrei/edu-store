<template>
  <div class="product-card">
    <router-link :to="`/products/${product.id}`" class="product-link">
      <img :src="product.image" :alt="product.title" />
      <div class="product-info">
        <h3 class="product-title">{{ product.title }}</h3>
        <p class="product-category">{{ product.category }}</p>
        <p class="product-price">${{ product.price }}</p>
        <button :to="`/products/${product.id}`" class="btn-details">
          Подробнее
        </button>
      </div>
    </router-link>
  </div>
</template>

<script setup>
defineProps(['product'])
</script>

<style scoped>
.product-card {
  background: #fff;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.product-link {
  text-decoration: none;
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
  border: 0;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
  transition: background 0.3s;
  cursor: pointer;
}

.btn-details:hover {
  background: #0056b3;
}
</style>