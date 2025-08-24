<script setup>
import { ref } from 'vue';
import OrderForm from './OrderForm.vue';

const props = defineProps(["product"]);

const isShowOrderForm = ref(false);

function toogleShowOrderForm(){
  isShowOrderForm.value = !isShowOrderForm.value
}


</script>

<template>
  <div class="product-card">
    <img :src="props.product.image" :alt="props.product.title" />
    <div class="product-info">
      <div>
        <div class="product-title">
          {{ props.product.title }}
        </div>
        <div class="product-category">{{ props.product.category }}</div>
        <div class="product-desc">
          {{ props.product.description }}
        </div>
      </div>
      <div>
        <div class="product-price">${{ props.product.price }}</div>
        <div class="product-rating">
          ⭐ {{ props.product.rating.rate }} ({{ props.product.rating.count }})
        </div>
        <button class="buy-btn" @click="toogleShowOrderForm">Купить</button>
      </div>
    </div>
  </div>
  <OrderForm v-if="isShowOrderForm" @close="toogleShowOrderForm" :product="props.product"/>
</template>

<style scoped>
.product-card {
  background: #fff;
  border-radius: 12px;
  padding: 15px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}
.product-card img {
  width: 100%;
  height: 250px;
  object-fit: contain;
  background: #f9f9f9;
}
.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
}
.product-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}
.product-category {
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
}
.product-desc {
  font-size: 14px;
  color: #555;
  flex: 1;
  margin-bottom: 10px;
}
.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #28a745;
  margin-bottom: 10px;
}
.product-rating {
  font-size: 14px;
  color: #ff9800;
  margin-bottom: 8px;
}
.buy-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}
.buy-btn:hover {
  background: #0056b3;
}
</style>
